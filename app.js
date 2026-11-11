/* WRHA NCD Academy prototype learner interactions.
   No identifiable patient data is collected. Local scores are practice-only. */
(function () {
  "use strict";
  const course = window.WRHA_COURSE;
  const modules = course.modules;
  const STORAGE_KEY = "wrha-ncd-prototype-progress-v1";
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const scorm = window.WRHA_SCORM || null;

  function loadLocal() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
    catch (_) { return {}; }
  }
  function validDone(value) {
    return Array.isArray(value) ? value.filter(n => Number.isInteger(n) && n >= 1 && n <= 9) : [];
  }
  const remote = scorm ? scorm.initialize() : {};
  const moodleSession = !!(scorm && scorm.isConnected());
  // A Moodle learner's LMS record takes precedence; never merge previous
  // users' browser-local demo progress into a different authenticated account.
  const local = moodleSession ? {} : loadLocal();
  const state = {
    completed: Array.from(new Set(moodleSession ? validDone(remote.completed) : validDone(local.completed))),
    reviewScore: moodleSession
      ? (Number.isFinite(remote.reviewScore) ? remote.reviewScore : null)
      : (Number.isFinite(local.reviewScore) ? local.reviewScore : null),
    screen: "home",
    lesson: 1,
    selected: null,
    review: null,
    libraryFilter: "all",
    selectedGuideline: "htn2024",
    pdfViewerMode: "google",
    pdfPreviewLoaded: false
  };
  const units=[
    {id:1,title:"Understanding NCD care",desc:"Chronic conditions, the meaning of adherence, and common barriers to care.",modules:[1,2,3]},
    {id:2,title:"Counselling with confidence",desc:"Supportive conversations, motivational interviewing, the 5 A's, and safe referrals.",modules:[4,5,6,7]},
    {id:3,title:"Supporting continuity of care",desc:"Practical self-management, documentation, referrals, and follow-up.",modules:[8,9]}
  ];
  function unitFor(id){return units.find(u=>u.modules.includes(Number(id)));}
  function unlocked(id){return modules.some(m=>m.id===Number(id));}
  function nextLesson(){return modules.find(m=>!state.completed.includes(m.id))||null;}
  function continueLearning(){const next=nextLesson();if(next)openModule(next.id);else nav("assessment");}
  function htmlEscape(str) { return String(str).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char])); }
  function persist() {
    const data = {completed: state.completed.slice().sort((a,b)=>a-b), reviewScore:state.reviewScore};
    if (!moodleSession) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (_) { /* storage blocked */ }
    }
    if (moodleSession) scorm.save(data);
    updateProgress();
  }
  function updateProgress() {
    const count = state.completed.length, pct = Math.round(count / 9 * 100);
    $("#hero-count").textContent = count + " of 9";
    $("#hero-percent").textContent = pct + "%";
    $("#hero-progress").style.width = pct + "%";
    $(".ring-outer").style.setProperty("--progress-angle", (pct * 3.6) + "deg");
    const next=nextLesson();
    $("#continue-course").innerHTML=next?(count===0?'Start learning <span aria-hidden="true">↗</span>':'Continue learning <span aria-hidden="true">↗</span>'):'Knowledge review ↗';
    $("#next-lesson-title").textContent=next?'Module '+next.id+' · '+next.title:'All nine modules completed';
    $("#next-lesson-description").textContent=next?next.summary:'Your official examination and observed skills evaluation are separate completion requirements.';
    $("#home-progress-caption").textContent=count+' of 9 modules completed';
    $("#home-progress-bar").style.width=pct+'%';
    $("#home-next-button").textContent=next?(count===0?'Begin Module 1 →':'Continue Module '+next.id+' →'):'Open knowledge review →';
    $("#content-continue").textContent=next?'Continue →':'Review →';
    $("#course-progress-caption").textContent=count+' of 9 activities completed';
    $("#course-progress-bar").style.width=pct+'%';
  }
  function nav(screen) {
    const target = ["home","modules","resources","lesson","assessment","certificate"].includes(screen) ? screen : "home";
    state.screen = target;
    $$(".screen").forEach(el => {el.hidden = el.id !== "screen-" + target;});
    $$(".nav-tab").forEach(el => {
      const active = el.dataset.nav === (target === "lesson" ? "modules" : target);
      el.classList.toggle("current",active);
      if (active) el.setAttribute("aria-current","page"); else el.removeAttribute("aria-current");
    });
    if (target === "home") {renderCards(); updateProgress();}
    if (target === "modules") {renderCards();updateProgress();}
    if (target === "resources") renderLibrary();
    if (target === "assessment") renderAssessments();
    if (target === "certificate") renderCertificate();
    window.scrollTo({top:0,behavior:"instant"});
    try {history.replaceState({}, "", "#" + (target === "lesson" ? "module-" + state.lesson : target));} catch (_) {}
  }
  function renderCards(){renderHomeUnits();renderCourseOutline();}
  function renderHomeUnits(){
    $("#home-unit-preview").innerHTML=units.map(unit=>{
      const done=unit.modules.filter(id=>state.completed.includes(id)).length;
      const next=unit.modules.find(id=>!state.completed.includes(id));
      return '<article class="unit-preview-card"><div class="unit-preview-top"><span class="unit-index">UNIT '+String(unit.id).padStart(2,"0")+'</span><span class="unit-preview-count">'+done+'/'+unit.modules.length+' complete</span></div>'+
        '<h3>'+htmlEscape(unit.title)+'</h3><p>'+htmlEscape(unit.desc)+'</p>'+
        '<div class="unit-preview-footer"><span>'+unit.modules.length+' interactive lessons</span>'+
        (next?'<button type="button" class="unit-preview-action" data-open-module="'+next+'">Study this unit →</button>':'<button type="button" class="unit-preview-action" data-nav="modules">View syllabus →</button>')+'</div></article>';
    }).join("");
  }
  function activityRow(module){
    const done=state.completed.includes(module.id),lock=!unlocked(module.id);
    const status=done?"Completed":lock?"Locked":"Ready to learn",cls=done?"complete":lock?"locked":"available";
    return '<div class="course-activity '+cls+'"><span class="activity-icon" aria-hidden="true">'+(done?'✓':lock?'⌑':'▤')+'</span>'+
      '<div class="activity-description"><div class="activity-kicker">MODULE '+String(module.id).padStart(2,"0")+' · INTERACTIVE LESSON</div><h3>'+htmlEscape(module.title)+'</h3><p>'+htmlEscape(module.summary)+'</p><span class="activity-duration">◷ '+htmlEscape(module.duration)+'</span></div>'+
      '<div class="activity-action"><span class="module-status '+cls+'">'+status+'</span>'+
      '<button class="activity-open" type="button" data-open-module="'+module.id+'" '+(lock?'disabled aria-label="Module '+module.id+' locked until earlier lessons are completed"':'')+'>'+
      (done?'Review lesson ↗':lock?'Locked':'Start lesson →')+'</button></div></div>';
  }
  function renderCourseOutline(){
    $("#course-sections").innerHTML=units.map(unit=>{
      const done=unit.modules.filter(id=>state.completed.includes(id)).length;
      return '<details class="unit-panel" id="unit-'+unit.id+'" open><summary class="unit-summary"><span class="unit-number">0'+unit.id+'</span><span class="unit-name"><small>UNIT '+unit.id+' · '+unit.modules.length+' LESSONS</small><strong>'+htmlEscape(unit.title)+'</strong><span>'+htmlEscape(unit.desc)+'</span></span>'+
      '<span class="unit-completion">'+done+'/'+unit.modules.length+' completed</span><span class="section-chevron" aria-hidden="true">⌄</span></summary><div class="unit-activities">'+unit.modules.map(id=>activityRow(modules.find(m=>m.id===id))).join("")+'</div></details>';
    }).join("");
    $("#course-index-links").innerHTML='<button type="button" class="index-link" data-scroll-to="course-orientation"><span>✦</span> Getting started</button>'+
      units.map(u=>'<button type="button" class="index-link" data-scroll-to="unit-'+u.id+'"><span>0'+u.id+'</span>'+htmlEscape(u.title)+'</button>').join("")+
      '<button type="button" class="index-link" data-scroll-to="course-completion"><span>✓</span> Assessment & certificate</button>';
  }
  function guidelineById(id) {
    const all=Array.isArray(window.WRHA_GUIDELINE_LIBRARY) ? window.WRHA_GUIDELINE_LIBRARY : [];
    return all.find(item=>item.id===id)||null;
  }
  function officialPdfUrl(url) {
    // Only Ministry-owned public PDF links from the authored catalogue.
    return /^https:\/\/ncdip\.moh\.gov\.jm\/download\/[0-9]+\/?$/.test(url) ? url : null;
  }
  function pdfPreviewUrl(url,mode) {
    if(mode==="direct") return url;
    // Google's public-document viewer is an alternative to direct PDF embedding;
    // users can always open/save the original MOHW document instead.
    return "https://docs.google.com/gview?embedded=1&url="+encodeURIComponent(url);
  }
  function displaySelectedGuideline() {
    const doc=guidelineById(state.selectedGuideline);
    if(!doc)return;
    const safeUrl=officialPdfUrl(doc.url);
    if(!safeUrl)return;
    $("#manual-reader-heading").textContent=doc.title;
    $("#manual-reader-edition").textContent=doc.edition+" · "+doc.type+" · "+doc.pages+" pages";
    $("#manual-reader-note").textContent=doc.note;
    $("#manual-reader-source").href=safeUrl;
    $("#manual-reader-download").href=safeUrl;
    $("#manual-reader-download").setAttribute("download",doc.id+".pdf");
    $("#manual-reader-frame").setAttribute("title","Preview: "+doc.title);
    if(state.pdfPreviewLoaded) {
      $("#manual-reader-frame").src=pdfPreviewUrl(safeUrl,state.pdfViewerMode);
      $("#manual-reader-overlay").hidden=true;
    } else {
      $("#manual-reader-frame").src="about:blank";
      $("#manual-reader-overlay").hidden=false;
    }
    $("#manual-reader-alternate").textContent=state.pdfViewerMode==="google"?"Try direct PDF viewer":"Try alternative document viewer";
  }
  function loadPdfPreview(mode){
    const doc=guidelineById(state.selectedGuideline);
    if(!doc)return;
    const safeUrl=officialPdfUrl(doc.url);
    if(!safeUrl)return;
    state.pdfPreviewLoaded=true;
    state.pdfViewerMode=mode||"google";
    $("#manual-reader-frame").src=pdfPreviewUrl(safeUrl,state.pdfViewerMode);
    $("#manual-reader-overlay").hidden=true;
    $("#manual-reader-alternate").textContent=state.pdfViewerMode==="google"?"Try direct PDF viewer":"Try alternative document viewer";
  }
  function renderLibrary() {
    const all=Array.isArray(window.WRHA_GUIDELINE_LIBRARY)?window.WRHA_GUIDELINE_LIBRARY:[];
    const selected=all.filter(item=>state.libraryFilter==="all"||item.category===state.libraryFilter);
    $("#library-total").textContent=selected.length+" of "+all.length+" documents";
    $$(".library-filter").forEach(el=>el.classList.toggle("active",el.dataset.libraryFilter===state.libraryFilter));
    if(selected.length && !selected.some(doc=>doc.id===state.selectedGuideline)) state.selectedGuideline=selected[0].id;
    $("#library-grid").innerHTML=selected.length?selected.map(doc=>{
      const safeUrl=officialPdfUrl(doc.url);
      const active=doc.id===state.selectedGuideline;
      return '<article class="manual-entry '+(active?'selected':'')+'" role="listitem">'+
        '<button type="button" class="manual-select-button" data-select-guideline="'+htmlEscape(doc.id)+'" aria-pressed="'+(active?'true':'false')+'" aria-label="Preview '+htmlEscape(doc.title)+'">'+
        '<span class="manual-entry-top"><span class="manual-entry-type">'+htmlEscape(doc.type)+'</span><span class="manual-entry-pages">'+doc.pages+' pages</span></span>'+
        '<strong>'+htmlEscape(doc.title)+'</strong><span class="manual-entry-date">'+htmlEscape(doc.edition)+'</span>'+
        '<span class="manual-entry-read">'+(active?'Selected for reading':'Read in academy')+' ↗</span></button>'+
        (safeUrl?'<a href="'+htmlEscape(safeUrl)+'" target="_blank" rel="noopener noreferrer" download class="manual-entry-save" aria-label="Download or save '+htmlEscape(doc.title)+'">↧ Save PDF</a>':'')+
        '</article>';
    }).join(""):'<p class="manual-list-empty">No documents in this category.</p>';
    if(selected.length)displaySelectedGuideline();
  }
  function renderVideoLearning(module) {
    const catalog = Array.isArray(window.WRHA_VIDEO_LIBRARY) ? window.WRHA_VIDEO_LIBRARY : [];
    const matched = catalog.filter(video => video.modules.includes(module.id))
      .sort((a,b) => Number((b.featuredFor||[]).includes(module.id)) - Number((a.featuredFor||[]).includes(module.id)));
    if(!matched.length)return "";
    // Keep the lesson focused: one primary video and no more than one optional second example.
    const shown = matched.slice(0,2);
    return '<section class="lesson-video-learning" aria-label="Video demonstrations">' +
      '<div class="video-section-heading"><div class="video-section-kicker">WATCH · OBSERVE · REFLECT</div>' +
      '<h2>See counselling in practice</h2>' +
      '<p>Watch a demonstration and reflect on how the communication techniques could be applied in a Jamaican CHA encounter. Watching is optional and never locks a lesson.</p></div>' +
      shown.map((video,i)=>'<article class="training-video-card">' +
        '<div class="training-video-top"><span class="training-video-type">'+htmlEscape(video.category)+'</span>'+
        (i===0?'<span class="training-video-tag">Suggested viewing</span>':'<span class="training-video-tag">Additional example</span>')+'</div>'+
        '<h3>'+htmlEscape(video.title)+'</h3>'+
        '<p class="training-video-provider">'+htmlEscape(video.provider)+'</p>'+
        '<div class="training-video-frame" id="training-video-'+htmlEscape(video.id)+'">'+
          '<button type="button" class="training-video-launch" data-load-video="'+htmlEscape(video.id)+'" aria-label="Play '+htmlEscape(video.title)+' from YouTube">'+
          '<span class="training-video-play" aria-hidden="true">▶</span><span>Watch demonstration</span>'+
          '<small>YouTube video · loads on request</small></button></div>'+
        '<p class="training-video-why">'+htmlEscape(video.rationale)+'</p>'+
        '<div class="training-video-reflect"><strong>After watching</strong><p>'+htmlEscape(video.prompt)+'</p></div>'+
        '<p class="training-video-note">'+htmlEscape(video.caveat)+'</p>'+
        '<div class="training-video-links"><a href="https://www.youtube.com/watch?v='+encodeURIComponent(video.videoId)+'" target="_blank" rel="noopener noreferrer">Open on YouTube ↗</a>'+
        '<a href="'+htmlEscape(video.source)+'" target="_blank" rel="noopener noreferrer">About this resource ↗</a></div>'+
      '</article>').join("")+
      '<p class="video-section-notice">These are external training demonstrations, not Jamaican clinical protocols. If YouTube does not play within Moodle, use “Open on YouTube.”</p></section>';
  }
  function loadTrainingVideo(id){
    const catalog=window.WRHA_VIDEO_LIBRARY||[];
    const video=catalog.find(v=>v.id===id);
    const frame=document.getElementById("training-video-"+id);
    if(!video||!frame)return;
    if(!/^[A-Za-z0-9_-]{11}$/.test(video.videoId))return;
    // Consent-on-click, no iframe until the learner requests playback.
    const embed=document.createElement("iframe");
    embed.setAttribute("title",video.title);
    embed.setAttribute("allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
    embed.setAttribute("allowfullscreen","");
    embed.setAttribute("referrerpolicy","strict-origin-when-cross-origin");
    embed.setAttribute("loading","lazy");
    embed.src="https://www.youtube-nocookie.com/embed/"+video.videoId+"?rel=0&playsinline=1";
    frame.replaceChildren(embed);
  }
  function renderModuleResources(module) {
    const ref = (window.WRHA_MODULE_REFERENCES || {})[module.id];
    if (!ref) return "";
    const links = Array.isArray(ref.links) ? ref.links : [];
    const docs = (window.WRHA_GUIDELINE_LIBRARY || []).filter(doc => doc.modules.includes(module.id));
    const urls = new Set(docs.map(doc => doc.url.replace(/\/$/, "")));
    const pdfRows = docs.map(doc =>
      '<li class="resource-item resource-pdf"><div class="resource-pdf-copy"><strong>' + htmlEscape(doc.title) + '</strong>' +
      '<span>' + htmlEscape(doc.edition) + ' · ' + doc.pages + '-page PDF · ' + htmlEscape(doc.category) + '</span></div>' +
      '<a class="resource-download" href="' + htmlEscape(doc.url) + '" target="_blank" rel="noopener noreferrer">↧ View / download PDF</a></li>'
    ).join("");
    const linkRows = links.filter(item => !urls.has(item.url.replace(/\/$/, ""))).map(item =>
      '<li class="resource-item"><a href="' + htmlEscape(item.url) +
      '" target="_blank" rel="noopener noreferrer" class="resource-link">' +
      htmlEscape(item.title) + ' <span aria-hidden="true">↗</span></a>' +
      '<span class="resource-type">' + htmlEscape(item.kind) + '</span></li>'
    ).join("");
    return '<section class="module-references" aria-label="Reading and source materials">' +
      '<div class="references-heading"><span class="references-icon" aria-hidden="true">▤</span><div>' +
      '<div class="references-overline">SOURCE MATERIALS & FURTHER READING</div>' +
      '<h2>Explore the reference library</h2><p>Selected material supporting this lesson, including Jamaican Ministry of Health & Wellness guidelines.</p>' +
      '</div></div>' +
      '<div class="manual-reference"><strong>From the WRHA training materials</strong><p>' +
      htmlEscape(ref.manual) + '</p>' +
      (ref.pack ? '<p>' + htmlEscape(ref.pack) + '</p>' : '') +
      '<small>The internal manuals and facilitator materials will be linked inside WRHA Moodle after the training team authorises access. They are not publicly hosted here.</small></div>' +
      '<h3 class="resource-subhead">Official MOHW manuals — downloadable PDFs</h3>' +
      '<p class="resource-help">Select View / download PDF, then use the PDF viewer’s save button if it opens in your browser.</p>' +
      '<ul class="resource-list">' + pdfRows + '</ul>' +
      '<h3 class="resource-subhead">Related courses and other supporting references</h3>' +
      '<ul class="resource-list">' + linkRows + '</ul>' +
      '<button type="button" class="library-all" data-nav="resources">Browse the full Jamaican NCD guideline library →</button>' +
      '<div class="reference-footer"><span>Clinical treatment guidelines are for clinician reference. CHAs must follow their approved scope and WRHA referral procedures.</span>' +
      '<a href="#module-' + module.id + '" class="permalink" aria-label="Link directly to module ' + module.id + '">Link to this module ↗</a></div>' +
      '</section>';
  }
  function openModule(id) {
    const module = modules.find(m => m.id === Number(id)); if (!module) return;
    state.lesson = module.id; state.selected = null;
    $("#lesson-phase").textContent = "Self-paced · Unit "+unitFor(module.id).id;
    $("#lesson-number").textContent = "MODULE " + String(module.id).padStart(2,"0") + " · " + course.theme.toUpperCase();
    $("#lesson-title").textContent = module.title;
    $("#lesson-description").textContent = module.summary;
    $("#lesson-duration").textContent = module.duration;
    $("#lesson-status").textContent = state.completed.includes(module.id) ? "Completed" : "Practice at your own pace · all lessons available";
    $("#lesson-list").innerHTML=modules.map(m=>{const locked=!unlocked(m.id);return '<button class="lesson-side-link '+(m.id===module.id?'current ':'')+(state.completed.includes(m.id)?'completed':'')+'" data-open-module="'+m.id+'" '+(locked?'disabled title="All modules available"':'')+'><span>'+(state.completed.includes(m.id)?'✓':locked?'•':m.id)+'</span>'+htmlEscape(m.title)+'</button>';}).join("");
    $("#lesson-content").innerHTML =
      '<section class="learning-objectives"><strong>After this module, you should be able to:</strong><ul>' +
      module.objectives.map(o => '<li>' + htmlEscape(o) + '</li>').join("") + '</ul></section>' +
      module.sections.map((section,i) => '<section class="lesson-section"><h2>'+String(i+1).padStart(2,"0")+'. '+htmlEscape(section.title)+'</h2><p>'+htmlEscape(section.text)+'</p><div class="lesson-points">'+ section.points.map(p=>'<div class="lesson-point">'+htmlEscape(p)+'</div>').join("")+'</div></section>').join("") + renderModuleResources(module);
    const scenario = module.scenario;
    // Resource and demonstration panels appear before the practice scenario.
    const existing=$("#lesson-content").innerHTML;
    $("#lesson-content").innerHTML=existing+renderVideoLearning(module);
    $("#scenario-block").innerHTML = '<div class="scenario-kicker">✧ '+htmlEscape(scenario.type).toUpperCase()+'</div><h2>Put it into practice</h2><p class="scenario-question">'+htmlEscape(scenario.prompt)+'</p><div class="choices" id="module-choices">'+
      scenario.choices.map((c,i)=>'<button type="button" class="choice" data-answer="'+i+'">'+htmlEscape(c.text)+'</button>').join("")+'</div><div id="module-feedback" aria-live="polite"></div>';
    $("#previous-module").disabled = module.id === 1;
    $("#next-module").textContent = module.id === 9 ? "Go to knowledge review →" : "Continue to Module "+(module.id+1)+" →";
    $("#next-module").disabled = false;
    $("#next-module").title = "Move to the next module at any time";
    nav("lesson");
  }
  function chooseModuleAnswer(index) {
    const module = modules[state.lesson-1];
    const choice = module.scenario.choices[index]; if(!choice) return;
    $$("#module-choices .choice").forEach(el => {
      el.classList.toggle("selected", Number(el.dataset.answer) === index);
      el.classList.toggle("correct", Number(el.dataset.answer) === index && choice.correct);
      el.classList.toggle("incorrect", Number(el.dataset.answer) === index && !choice.correct);
    });
    $("#module-feedback").innerHTML = '<div class="scenario-feedback ' + (choice.correct?'':'warning')+'"><strong>'+(choice.correct?'✓ Good decision':'Consider this again')+'</strong><div>'+htmlEscape(choice.feedback)+'</div></div>';
    if (choice.correct && !state.completed.includes(module.id)) {
      state.completed.push(module.id);persist();
      $("#lesson-status").textContent="Completed";
      $("#next-module").disabled=false;
      $("#next-module").title="Continue learning";
      $("#lesson-list").querySelector('[data-open-module="'+module.id+'"]').classList.add("completed");
    }
  }
  function renderAssessments() {
    const last = state.reviewScore;
    $("#start-review").disabled=false;
    $("#start-review").textContent="Start knowledge review →";
    $("#review-result").innerHTML = last === null
      ? '<small>Practice review not completed yet.</small>'
      : '<strong>Last practice score: ' + last + ' of 9 (' + Math.round(last/9*100) + '%)</strong><small>This does not replace a formal Moodle examination.</small>';
  }
  function startReview() {
    state.review = {index:0,selected:null,score:0,submitted:false};
    $("#review-panel").hidden=false;
    renderReview();
    $("#review-panel").scrollIntoView({behavior:"smooth",block:"start"});
  }
  function renderReview() {
    const r=state.review;
    if(!r) return;
    if(r.index >= modules.length) {
      state.reviewScore = r.score;persist();
      $("#review-panel").innerHTML='<div class="assessment-icon">✧</div><div class="overline">PRACTICE REVIEW COMPLETE</div><h3>You scored '+r.score+' out of 9 ('+Math.round(r.score/9*100)+'%).</h3><p>Use the feedback from each module to strengthen your counselling approach. Formal graded tests will be administered in Moodle; this is practice only.</p><button type="button" class="button button-primary" id="retry-review">Review again →</button>';
      renderAssessments();return;
    }
    const module=modules[r.index], s=module.scenario;
    $("#review-panel").innerHTML = '<div class="review-top"><span>Question '+(r.index+1)+' of '+modules.length+'</span><span>Module '+module.id+': '+htmlEscape(module.title)+'</span></div><div class="review-track"><span style="width:'+Math.round(r.index/modules.length*100)+'%"></span></div><h3>'+htmlEscape(s.prompt)+'</h3><div id="review-choices">'+s.choices.map((c,i)=>'<button class="review-choice '+(r.selected===i?'selected':'')+'" data-review-answer="'+i+'" '+(r.submitted?'disabled':'')+'>'+htmlEscape(c.text)+'</button>').join("")+'</div><div id="review-feedback" aria-live="polite"></div><div class="review-actions"><small>Practice questions · Not a formal exam</small><button id="review-next" class="button button-primary" '+(r.selected===null?'disabled':'')+'>'+(r.index===modules.length-1?'Finish review →':'Next question →')+'</button></div>';
    if (r.submitted) {
      const c=s.choices[r.selected];
      $("#review-feedback").innerHTML='<div class="scenario-feedback '+(c.correct?'':'warning')+'">'+(c.correct?'✓ Correct. ':'Not quite. ')+htmlEscape(c.feedback)+'</div>';
    }
  }
  function selectReviewAnswer(index) {
    const r=state.review;if(!r || r.submitted)return;
    const s=modules[r.index].scenario,c=s.choices[index];if(!c)return;
    r.selected=index;r.submitted=true;if(c.correct)r.score++;
    renderReview();
  }
  function nextReview() {
    const r=state.review;if(!r || !r.submitted)return;
    r.index++;r.selected=null;r.submitted=false;renderReview();
  }
  function renderCertificate() {
    const done=state.completed.length===9;
    const reqs=[
      [done,"Complete all nine learning module activities"],
      [false,"Pass the formal Moodle knowledge examination (standard pending)"],
      [false,"Pass facilitator-recorded practical competency (standard pending)"]
    ];
    $("#cert-requirements").innerHTML=reqs.map(([complete,text])=>'<div class="cert-requirement"><span class="cert-req-icon '+(complete?'done':'')+'">'+(complete?'✓':'○')+'</span>'+htmlEscape(text)+'</div>').join("");
  }
  document.addEventListener("click",ev=>{
    const navEl=ev.target.closest("[data-nav]");if(navEl){nav(navEl.dataset.nav);return;}
    const lessonEl=ev.target.closest("[data-open-module]");if(lessonEl){openModule(lessonEl.dataset.openModule);return;}
    const videoEl=ev.target.closest("[data-load-video]");if(videoEl){loadTrainingVideo(videoEl.dataset.loadVideo);return;}
    const more=ev.target.closest('[data-action="continue-learning"]');if(more){continueLearning();return;}
    const section=ev.target.closest("[data-scroll-to]");if(section){nav("modules");const dest=document.getElementById(section.dataset.scrollTo);if(dest)dest.scrollIntoView({behavior:"smooth",block:"start"});return;}
    const libEl=ev.target.closest("[data-library-filter]");if(libEl){state.libraryFilter=libEl.dataset.libraryFilter;renderLibrary();return;}
    const manualEl=ev.target.closest("[data-select-guideline]");if(manualEl){state.selectedGuideline=manualEl.dataset.selectGuideline;renderLibrary();return;}
    if(ev.target.closest("#manual-preview-start")){loadPdfPreview("google");return;}
    if(ev.target.closest("#manual-reader-alternate")){loadPdfPreview(state.pdfViewerMode==="google"?"direct":"google");return;}
    const answerEl=ev.target.closest("[data-answer]");if(answerEl){chooseModuleAnswer(Number(answerEl.dataset.answer));return;}
    const revEl=ev.target.closest("[data-review-answer]");if(revEl){selectReviewAnswer(Number(revEl.dataset.reviewAnswer));return;}
    if(ev.target.closest("#start-review") || ev.target.closest("#retry-review")) {startReview();return;}
    if(ev.target.closest("#review-next")) {nextReview();return;}
    if(ev.target.closest("#previous-module")) {openModule(state.lesson-1);return;}
    if(ev.target.closest("#next-module")) {if(state.lesson===9)nav("assessment");else openModule(state.lesson+1);return;}
  });
  $("#name-preview").addEventListener("input",ev=>{
    const clean=ev.target.value.trim().slice(0,70);
    $("#certificate-recipient").textContent=clean || "Participant Name";
  });
  updateProgress();renderCards();renderAssessments();
  const initial=decodeURIComponent(location.hash.slice(1));
  if(initial.startsWith("module-")) openModule(parseInt(initial.slice(7),10));
  else nav(["home","modules","resources","assessment","certificate"].includes(initial)?initial:"home");
  window.addEventListener("beforeunload",()=>{if(scorm)scorm.finish();});
})();
