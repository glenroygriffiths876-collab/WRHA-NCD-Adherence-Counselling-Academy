/* WRHA NCD Academy — 27 original teaching lessons and non-credit formative practice.
 * Clinical, local protocol and institutional approval remain pending.
 * This renderer does not expose high-stakes assessment keys or collect patient data.
 */
(function(){
"use strict";
const escape = value => String(value==null?"":value).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function renderLesson(lesson, moduleId, index) {
 const p = (lesson.p || []).map(s=>'<p>'+escape(s)+'</p>').join("");
 const check=lesson.check;
 const options=check.a.map((choice,i)=>'<button class="deep-choice" type="button" data-deep-check="'+escape(moduleId)+'-'+index+'" data-deep-option="'+i+'">'+escape(String.fromCharCode(65+i))+'. '+escape(choice)+'</button>').join("");
 return '<article class="deep-lesson" id="deep-lesson-'+moduleId+'-'+(index+1)+'" aria-labelledby="deep-title-'+moduleId+'-'+(index+1)+'">'+
 '<div class="deep-lesson-topline"><span>LESSON '+escape(lesson.id)+'</span><span>SELF-PACED · LEARN + PRACTISE</span></div>'+
 '<h2 id="deep-title-'+moduleId+'-'+(index+1)+'">'+escape(lesson.title)+'</h2>'+
 '<div class="deep-objective"><strong>Learning objective</strong><p>'+escape(lesson.objective)+'</p></div>'+
 '<div class="deep-narrative">'+p+'</div>'+
 '<section class="deep-applied"><h3>In practice · a Jamaican case</h3><p>'+escape(lesson.case)+'</p></section>'+
 '<section class="deep-activity"><h3>Try it yourself</h3><p>'+escape(lesson.activity)+'</p><p class="deep-activity-note">Use fictional examples. Do not enter identifiable client details into this public prototype.</p></section>'+
 '<section class="deep-check" aria-label="Practice knowledge check for '+escape(lesson.id)+'"><div class="deep-check-heading"><span>KNOWLEDGE CHECK</span><span>Practice only · not graded</span></div><h3>'+escape(check.q)+'</h3>'+
 '<div class="deep-check-options" role="group" aria-label="Choose your response">'+options+'</div><div class="deep-check-feedback" id="deep-feedback-'+moduleId+'-'+index+'" aria-live="polite"></div></section>'+
 '<div class="deep-takeaway"><strong>Remember</strong><p>'+escape(lesson.takeaway)+'</p></div>'+
 '<p class="deep-reference">Further reading: '+escape(lesson.ref||"WRHA CHA Participant Manual; relevant approved MOHW guidance.")+'</p>'+
 '</article>';
}
function renderTools(moduleId) {
 const tools=Array.isArray(window.WRHA_PRACTICE_TOOLS)?window.WRHA_PRACTICE_TOOLS.filter(t=>t.modules.includes(moduleId)):[];
 if(!tools.length)return "";
 return '<section class="deep-tools" aria-labelledby="deep-tools-heading"><div class="deep-section-kicker">WORKPLACE APPLICATION</div><h2 id="deep-tools-heading">Practical learning tools</h2>'+
 '<p>Training templates to download or print. These are not approved clinical record forms, and must not be used to store identifiable patient information in this prototype.</p>'+
 '<div class="deep-tools-grid">'+tools.map(t=>'<article class="deep-tool"><div class="deep-tool-meta">TOOL '+escape(t.id)+'</div><h3>'+escape(t.title)+'</h3><p>'+escape(t.use)+'</p><details><summary>Preview fields</summary><ol>'+t.fields.map(f=>'<li>'+escape(f)+'</li>').join("")+'</ol></details><button type="button" class="deep-tool-download" data-tool-download="'+escape(t.id)+'">Download blank template (.txt)</button></article>').join("")+'</div></section>';
}
window.WRHA_renderExpandedLessons = function(module) {
 const lessons=window.WRHA_EXPANDED_LESSONS && window.WRHA_EXPANDED_LESSONS[module.id];
 if(!Array.isArray(lessons)||lessons.length!==3)return "";
 return '<div class="deep-learning-intro"><span class="deep-section-kicker">COMPREHENSIVE LEARNING</span><h2>Three lessons · one connected skill</h2><p>Read the teaching, examine the case, practise and check your understanding. You can revisit any lesson at any time. The short practice questions do not block the course or award official grades.</p>'+
 '<nav class="deep-chapter-nav" aria-label="Lessons in this module">'+lessons.map((l,i)=>'<a href="#deep-lesson-'+module.id+'-'+(i+1)+'" data-deep-jump="'+module.id+'-'+(i+1)+'"><span>'+escape(l.id)+'</span> '+escape(l.title)+'</a>').join("")+'</nav></div>'+
 lessons.map((l,i)=>renderLesson(l,module.id,i)).join("")+renderTools(module.id);
};
document.addEventListener("click",function(e){
 const target=e.target.closest("[data-deep-check]");
 if(target){
   const parts=target.dataset.deepCheck.split("-").map(Number), id=parts[0], i=parts[1], selected=Number(target.dataset.deepOption);
   const item=window.WRHA_EXPANDED_LESSONS && window.WRHA_EXPANDED_LESSONS[id] && window.WRHA_EXPANDED_LESSONS[id][i];
   if(!item||!item.check||!item.check.a[selected])return;
   const host=target.closest(".deep-check");
   if(!host)return;
   host.querySelectorAll("[data-deep-option]").forEach(btn=>{
     const n=Number(btn.dataset.deepOption);btn.classList.toggle("is-right",n===item.check.correct);btn.classList.toggle("is-wrong",n===selected && selected!==item.check.correct);btn.setAttribute("aria-pressed",String(n===selected));
   });
   const answer=item.check;
   const area=host.querySelector(".deep-check-feedback");
   const right=selected===answer.correct;
   area.className="deep-check-feedback "+(right?"is-right":"is-wrong");
   area.innerHTML='<strong>'+(right?"✓ Strong choice":"Review this decision")+'</strong><p>'+escape(answer.why[selected])+'</p>'+(right?"":'<p>Consider the explanation, then choose again. The aim is understanding, not punishment.</p>');
   return;
 }
 const download=e.target.closest("[data-tool-download]");
 if(download){
   const t=(window.WRHA_PRACTICE_TOOLS||[]).find(x=>String(x.id)===download.dataset.toolDownload);
   if(!t)return;
   const body="WRHA NCD Adherence Counselling Academy\n"+t.title+"\nDevelopment training template — NOT an approved WRHA patient record\nUse fictional or de-identified cases only.\n\nPurpose: "+t.use+"\n\n"+t.fields.map((f,i)=>(i+1)+". "+f+"\n"+"_".repeat(72)).join("\n\n")+"\n\nReference: WRHA NCD Academy development teaching package, 12 November 2026.";
   const blob=new Blob([body],{type:"text/plain;charset=utf-8"});
   const url=URL.createObjectURL(blob);
   const a=document.createElement("a");a.href=url;a.download="WRHA-NCD-training-tool-"+t.id+".txt";document.body.appendChild(a);a.click();a.remove();
   setTimeout(()=>URL.revokeObjectURL(url),500);
   return;
 }
 const jump=e.target.closest("[data-deep-jump]");
 if(jump){
   const dest=document.getElementById("deep-lesson-"+jump.dataset.deepJump);
   if(dest){e.preventDefault();dest.scrollIntoView({behavior:"smooth",block:"start"});}
 }
});
})();