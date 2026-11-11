/* WRHA Academy v0.7 — accessible micro-animations.
 * Pure presentation: does not change any learning, grades, SCORM or PDF state. */
(function(){
  "use strict";
  const reduced=window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduced)return;
  const header=document.querySelector(".site-header");
  if(!header)return;
  const progress=document.createElement("div");
  progress.className="reading-progress";
  progress.setAttribute("aria-hidden","true");
  header.appendChild(progress);
  let scheduled=false;
  function updateScroll(){
    scheduled=false;
    const page=document.documentElement;
    const max=Math.max(1,page.scrollHeight-window.innerHeight);
    const ratio=Math.max(0,Math.min(1,window.scrollY/max));
    progress.style.transform="scaleX("+ratio+")";
  }
  function schedule(){
    if(!scheduled){scheduled=true;window.requestAnimationFrame(updateScroll);}
  }
  window.addEventListener("scroll",schedule,{passive:true});
  window.addEventListener("resize",schedule,{passive:true});
  window.addEventListener("hashchange",schedule,{passive:true});
  document.addEventListener("click",schedule,{passive:true});
  schedule();
  document.addEventListener("pointerdown",event=>{
    const el=event.target instanceof Element
      ? event.target.closest(".button,.nav-tab,.activity-open,.manual-preview-button")
      : null;
    if(!el||el.disabled)return;
    const box=el.getBoundingClientRect();
    const ripple=document.createElement("span");
    ripple.className="ux-ripple";
    ripple.style.left=(event.clientX-box.left)+"px";
    ripple.style.top=(event.clientY-box.top)+"px";
    if(window.getComputedStyle(el).position==="static")el.style.position="relative";
    el.appendChild(ripple);
    ripple.addEventListener("animationend",()=>ripple.remove(),{once:true});
  },{passive:true});
})();