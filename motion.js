/* WRHA NCD Academy — discreet motion layer.
 * Progressive enhancement only: the course stays usable without animations.
 * Accessibility: respects prefers-reduced-motion.
 */
(function(){
  "use strict";
  const reduced = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const selectors = [
    ".hero",".hero-aside",".section-title",".journey-card",".module-card",".insight-panel",
    ".page-intro",".lesson-cover",".lesson-section",".learning-objectives",".scenario-card",
    ".module-references",".library-card",".white-card",".certificate-panel",".certificate-sidebar"
  ].join(",");
  let revealObserver=null;
  if (!reduced && "IntersectionObserver" in window) {
    revealObserver=new IntersectionObserver((entries)=>{
      for(const entry of entries) {
        if(entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      }
    },{rootMargin:"0px 0px -18px 0px",threshold:.08});
  }
  function attachReveals() {
    document.querySelectorAll(selectors).forEach(el=>{
      if(el.dataset.motionAttached==="1")return;
      el.dataset.motionAttached="1";
      if(reduced || !revealObserver) return;
      const siblings=el.parentElement ? Array.from(el.parentElement.children).filter(c=>c.matches && (c.matches(".module-card")||c.matches(".journey-card")||c.matches(".library-card"))) : [];
      const index=siblings.indexOf(el);
      if(index>=0)el.style.setProperty("--reveal-delay", Math.min(index%3,2)*65+"ms");
      el.classList.add("reveal-on-scroll");
      // Hide only while JS is active, never from the static HTML baseline.
      revealObserver.observe(el);
    });
  }
  let scheduled=false;
  function scheduleAttach() {
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;attachReveals();});
  }
  const mutationWatcher=new MutationObserver((mutations)=>{
    if(mutations.some(m=>m.type==="childList"||(m.type==="attributes"&&m.attributeName==="hidden"))) scheduleAttach();
  });
  mutationWatcher.observe(document.querySelector("main")||document.body,{
    subtree:true,childList:true,attributes:true,attributeFilter:["hidden"]
  });
  attachReveals();

  // Small, optional progress count-up. The underlying course state remains authoritative.
  const percent=document.getElementById("hero-percent");
  const ring=document.querySelector(".ring-outer");
  if(percent&&ring&&!reduced){
    let shown=0, lastTarget=null, internalUpdate=false, token=0;
    const tweenProgress=()=>{
      if(internalUpdate)return;
      const target=Math.max(0,Math.min(100,Number.parseInt(percent.textContent,10)||0));
      if(target===lastTarget)return;
      lastTarget=target;
      const start=shown, begun=performance.now(), current=++token, duration=640;
      function tick(now){
        if(current!==token)return;
        const p=Math.min(1,(now-begun)/duration);
        const eased=1-Math.pow(1-p,3);
        shown=start+(target-start)*eased;
        internalUpdate=true;
        percent.textContent=Math.round(shown)+"%";
        ring.style.setProperty("--progress-angle",(shown*3.6)+"deg");
        internalUpdate=false;
        if(p<1)requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };
    const percentWatcher=new MutationObserver(tweenProgress);
    percentWatcher.observe(percent,{childList:true,characterData:true,subtree:true});
    // Progress on first load.
    requestAnimationFrame(tweenProgress);
  }
})();