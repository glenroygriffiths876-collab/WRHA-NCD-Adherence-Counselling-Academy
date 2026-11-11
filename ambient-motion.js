/* WRHA Academy v0.7 — small, accessible motion enhancements.
   No learning states, SCORM values, PDF readers or form submissions are changed. */
(function(){
  'use strict';
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced) return;
  const header=document.querySelector('.site-header');
  if(!header) return;
  const progress=document.createElement('div');
  progress.className='reading-progress';
  progress.setAttribute('aria-hidden','true');
  header.appendChild(progress);
  let scheduled=false;
  function updateScroll(){
    scheduled=false;
    const page=document.documentElement;
    const max=Math.max(1,page.scrollHeight-window.innerHeight);
    const fraction=Math.max(0,Math.min(1,window.scrollY/max));
    progress.style.transform='scaleX('+fraction+')';
  }
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(updateScroll)}}
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  document.addEventListener('click',schedule,{passive:true});
  schedule();
  document.addEventListener('pointerdown',function(e){
    const target=e.target instanceof Element && e.target.closest('.button, .nav-tab, .activity-open, .manual-preview-button');
    if(!target || target.disabled || !target.getBoundingClientRect)return;
    // Pointer micro-interaction, never part of the action handling.
    const rect=target.getBoundingClientRect();
    const ripple=document.createElement('span');
    ripple.className='ux-ripple';
    ripple.style.left=(e.clientX-rect.left)+'px';
    ripple.style.top=(e.clientY-rect.top)+'px';
    const oldPosition=getComputedStyle(target).position;
    if(oldPosition==='static')target.style.position='relative';
    target.appendChild(ripple);
    ripple.addEventListener('animationend',()=>ripple.remove(),{once:true});
  },{passive:true});
})();