/* Minimal SCORM 1.2 adapter for WRHA NCD prototype.
   Records self-paced learning activity completion; practice-review results remain internal.
   It does NOT verify facilitator competency or issue official certificates.
   Test on the target Moodle instance before operational use. */
window.WRHA_SCORM = (function(){
  "use strict";
  let api = null, started = false, finished = false;
  const MAX_PARENT_DEPTH = 8;
  function parentApi(w) {
    for (let i=0; i<MAX_PARENT_DEPTH && w; i++) {
      try {
        if (w.API && typeof w.API.LMSInitialize === "function") return w.API;
        if (!w.parent || w.parent === w) break;
        w = w.parent;
      } catch (_) { break; }
    }
    return null;
  }
  function findApi() {
    const found=parentApi(window);if(found)return found;
    try {if(window.opener)return parentApi(window.opener);}catch(_){}
    return null;
  }
  function call(method, ...args) {
    if (!started || !api || finished) return null;
    try { if(typeof api[method] === "function")return api[method](...args); }
    catch(e){console.warn("SCORM operation failed", method);}
    return null;
  }
  function initialize() {
    api=findApi();
    if(!api)return {};
    try {started=String(api.LMSInitialize("")) === "true";} catch(_){started=false;}
    if(!started)return {};
    const raw=call("LMSGetValue","cmi.suspend_data");
    let data={};
    if(raw && String(raw).trim()){
      try {data=JSON.parse(raw);}catch(_){data={};}
    }
    const status=call("LMSGetValue","cmi.core.lesson_status");
    if(!status || status === "not attempted")call("LMSSetValue","cmi.core.lesson_status","incomplete");
    call("LMSCommit","");
    return data && typeof data === "object"?data:{};
  }
  function save(data) {
    if(!started || finished)return false;
    const compact={completed:(Array.isArray(data.completed)?data.completed:[]).slice(0,9),reviewScore:data.reviewScore};
    const serialized=JSON.stringify(compact);
    // SCORM 1.2 suspend_data has a strict 4096-character limit.
    if(serialized.length<=3900)call("LMSSetValue","cmi.suspend_data",serialized);
    call("LMSSetValue","cmi.core.lesson_location","module-"+(Math.max(0,...compact.completed)));
    call("LMSSetValue","cmi.core.lesson_status",compact.completed.length===9?"completed":"incomplete");
    // Practice quiz results are deliberately NOT written to cmi.core.score.raw:
    // Moodle must use a separate secure Quiz activity for formal assessment.
    // This SCO reports learning activity completion only.
    return String(call("LMSCommit",""))==="true";
  }
  function finish(){
    if(!started || finished)return;
    try{api.LMSCommit("");api.LMSFinish("");}catch(_){}
    finished=true;
  }
  return {initialize, save, finish, isConnected:()=>started&&!finished};
})();