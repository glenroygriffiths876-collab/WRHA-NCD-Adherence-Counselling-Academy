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
  const local = loadLocal();
  const remote = scorm ? scorm.initialize() : {};
  const state = {
    completed: Array.from(new Set([...validDone(local.completed), ...validDone(remote.completed)])),
    reviewScore: Number.isFinite(remote.reviewScore) ? remote.reviewScore : (Number.isFinite(local.reviewScore) ? local.reviewScore : null),
    screen: "home",
    lesson: 1,
    selected: null,
    review: null,
    filter: "all"
  };
  function htmlEscape(str) { return String(str).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char])); }
  function persist() {
    const data = {completed: state.completed.slice().sort((a,b)=>a-b), reviewScore:state.reviewScore};
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (_) { /* storage blocked */ }
    if (scorm) scorm.save(data);
    updateProgress();
  }
  function updateProgress() {
    const count = state.completed.length, pct = Math.round(count / 9 * 100);
    $("#hero-count").textContent = count + " of 9";
    $("#hero-percent").textContent = pct + "%";
    $("#hero-progress").style.width = pct + "%";
    $(".ring-outer").style.setProperty("--progress-angle", (pct * 3.6) + "deg");
  }
  function nav(screen) {
    const target = ["home","modules","lesson","assessment","certificate"].includes(screen) ? screen : "home";
    state.screen = target;
    $$(".screen").forEach(el => {el.hidden = el.id !== "screen-" + target;});
    $$(".nav-tab").forEach(el => {
      const active = el.dataset.nav === (target === "lesson" ? "modules" : target);
      el.classList.toggle("current",active);
      if (active) el.setAttribute("aria-current","page"); else el.removeAttribute("aria-current");
    });
    if (target === "home") {renderCards(); updateProgress();}
    if (target === "modules") renderCards();
    if (target === "assessment") renderAssessments();
    if (target === "certificate") renderCertificate();
    window.scrollTo({top:0,behavior:"instant"});
    try {history.replaceState({}, "", "#" + (target === "lesson" ? "module-" + state.lesson : target));} catch (_) {}
  }
  function card(module) {
    const done = state.completed.includes(module.id);
    return '<article class="module-card">' +
      '<div class="module-top"><span class="module-icon" aria-hidden="true">' + module.icon + '</span><span class="status-tag ' + (done?'done':'') + '">' + (done ? "✓ Reviewed":"Module " + String(module.id).padStart(2,"0")) + '</span></div>' +
      '<h3>' + htmlEscape(module.title) + '</h3><p>' + htmlEscape(module.summary) + '</p>' +
      '<div class="module-foot"><small>' + htmlEscape(module.phase) + '</small><button type="button" data-open-module="' + module.id + '" aria-label="Open module ' + module.id + ': ' + htmlEscape(module.title) + '">Explore ↗</button></div></article>';
  }
  function renderCards() {
    $("#home-modules").innerHTML = modules.map(card).join("");
    $("#all-modules").innerHTML = modules.filter(m => state.filter === "all" || m.phase === state.filter).map(card).join("");
    $$(".phase-filter").forEach(el => el.classList.toggle("active", el.dataset.filter === state.filter));
  }
  function openModule(id) {
    const module = modules.find(m => m.id === Number(id)); if (!module) return;
    state.lesson = module.id; state.selected = null;
    $("#lesson-phase").textContent = module.phase;
    $("#lesson-number").textContent = "MODULE " + String(module.id).padStart(2,"0") + " · " + course.theme.toUpperCase();
    $("#lesson-title").textContent = module.title;
    $("#lesson-description").textContent = module.summary;
    $("#lesson-duration").textContent = module.duration;
    $("#lesson-status").textContent = state.completed.includes(module.id) ? "Reviewed" : "Practice check required";
    $("#lesson-list").innerHTML = modules.map(m => '<button class="lesson-side-link '+(m.id===module.id?'current ':'')+(state.completed.includes(m.id)?'completed':'')+'" data-open-module="'+m.id+'"><span>' + (state.completed.includes(m.id) ? "✓" : m.id) + '</span>' + htmlEscape(m.title) + '</button>').join("");
    $("#lesson-content").innerHTML =
      '<section class="learning-objectives"><strong>After this module, you should be able to:</strong><ul>' +
      module.objectives.map(o => '<li>' + htmlEscape(o) + '</li>').join("") + '</ul></section>' +
      module.sections.map((section,i) => '<section class="lesson-section"><h2>'+String(i+1).padStart(2,"0")+'. '+htmlEscape(section.title)+'</h2><p>'+htmlEscape(section.text)+'</p><div class="lesson-points">'+ section.points.map(p=>'<div class="lesson-point">'+htmlEscape(p)+'</div>').join("")+'</div></section>').join("");
    const scenario = module.scenario;
    $("#scenario-block").innerHTML = '<div class="scenario-kicker">✧ '+htmlEscape(scenario.type).toUpperCase()+'</div><h2>Put it into practice</h2><p class="scenario-question">'+htmlEscape(scenario.prompt)+'</p><div class="choices" id="module-choices">'+
      scenario.choices.map((c,i)=>'<button type="button" class="choice" data-answer="'+i+'">'+htmlEscape(c.text)+'</button>').join("")+'</div><div id="module-feedback" aria-live="polite"></div>';
    $("#previous-module").disabled = module.id === 1;
    $("#next-module").textContent = module.id === 9 ? "Go to assessments →" : "Next module →";
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
      $("#lesson-status").textContent="Reviewed";
      $("#lesson-list").querySelector('[data-open-module="'+module.id+'"]').classList.add("completed");
    }
  }
  function renderAssessments() {
    const last = state.reviewScore;
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
    const filterEl=ev.target.closest("[data-filter]");if(filterEl){state.filter=filterEl.dataset.filter;renderCards();return;}
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
  else nav(["home","modules","assessment","certificate"].includes(initial)?initial:"home");
  window.addEventListener("beforeunload",()=>{if(scorm)scorm.finish();});
})();
