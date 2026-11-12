/* Optional extended learning review: 18 original formative NCD practice questions.
 * Not the institutional examination; no certificate or official grades are awarded.
 */
(function(){
"use strict";
const bank=[
  {
    "module": 1,
    "q": "A client with diagnosed hypertension has no headache. What is the safest explanation?",
    "a": [
      "Blood pressure must be normal.",
      "Feeling well does not establish control; continued assessment matters.",
      "Treatment can stop on symptom-free days."
    ],
    "correct": 1,
    "why": "Hypertension may cause no obvious symptoms. Clinical measurements and review—not absence of headache—inform management."
  },
  {
    "module": 1,
    "q": "Which action stays within a CHA's role when a client requests a new blood-pressure target?",
    "a": [
      "Set a target from one home reading.",
      "Advise doubling medicine until the reading falls.",
      "Record the concern and seek authorised clinical guidance."
    ],
    "correct": 2,
    "why": "Clinical targets and medication decisions are individualised by qualified staff. CHAs can support understanding and referral."
  },
  {
    "module": 2,
    "q": "Which statement best describes adherence in the person-centred approach?",
    "a": [
      "Following an agreed plan with appropriate partnership.",
      "Obeying without asking any questions.",
      "Being a good or bad patient."
    ],
    "correct": 0,
    "why": "Adherence concerns implementation of an understood and agreed plan across medicines, reviews, monitoring and other agreed care."
  },
  {
    "module": 2,
    "q": "A patient returns after months without collecting medication. Which is an appropriate first response?",
    "a": [
      "Scold the person for stopping.",
      "Welcome the return, explore current concerns and arrange safe clinical review.",
      "Advise restarting the old prescription immediately."
    ],
    "correct": 1,
    "why": "Return to care should be welcoming. Restart instructions and symptom assessment are clinician- or pharmacist-led."
  },
  {
    "module": 3,
    "q": "The clinic pharmacy is out of a client's prescribed medicine. What barrier is present?",
    "a": [
      "A health-system access problem.",
      "Proof of poor motivation.",
      "Only a forgetfulness problem."
    ],
    "correct": 0,
    "why": "A stockout requires system and clinical continuity support. A memory reminder does not restore supply."
  },
  {
    "module": 3,
    "q": "A client reports using bush tea alongside a prescription. Which reply opens a safe discussion?",
    "a": [
      "That is definitely safe because it is natural.",
      "Stop talking about that and take your tablets.",
      "What are you using and what have you noticed? Let's ask the pharmacist about safety."
    ],
    "correct": 2,
    "why": "Respectful questions reveal potentially important information; medication interactions require authorised review."
  },
  {
    "module": 4,
    "q": "Which question is most likely to reveal why a client missed clinic?",
    "a": [
      "You are careless, aren't you?",
      "What made it difficult to attend this time?",
      "You knew the appointment, correct?"
    ],
    "correct": 1,
    "why": "A nonjudgmental open question encourages the person to explain the actual barrier."
  },
  {
    "module": 4,
    "q": "What is the purpose of teach-back?",
    "a": [
      "To assess intelligence.",
      "To make clients repeat every sentence exactly.",
      "To check whether the explanation was clear enough to use and revise it if needed."
    ],
    "correct": 2,
    "why": "Teach-back tests communication effectiveness in the person's own words, without blame."
  },
  {
    "module": 5,
    "q": "A client values an appointment highly but has confidence 2/10. What is the next useful MI response?",
    "a": [
      "Explore what might make the step easier or smaller.",
      "Tell them that the rating is unacceptable.",
      "Argue that they should feel more confident."
    ],
    "correct": 0,
    "why": "Low confidence invites practical support; it does not necessarily mean the client lacks motivation."
  },
  {
    "module": 5,
    "q": "Which worker statement is an accurate reflection?",
    "a": [
      "Take your tablet with lunch from now on.",
      "Missing work makes clinic attendance difficult for you.",
      "Your family would be ashamed if you missed."
    ],
    "correct": 1,
    "why": "A reflection checks the worker's understanding of what the client expressed, rather than imposing instructions or guilt."
  },
  {
    "module": 6,
    "q": "Which is the proposed WRHA 5 A's sequence?",
    "a": [
      "Ask, Advise, Alter, Agree, Approve.",
      "Assess, Argue, Advise, Arrange, Audit.",
      "Ask, Assess, Advise, Agree, Assist."
    ],
    "correct": 2,
    "why": "The academy uses Ask, Assess, Advise, Agree, Assist. Agree never permits unauthorised medication changes."
  },
  {
    "module": 6,
    "q": "Which agreed action is specific and reviewable?",
    "a": [
      "Client must be better.",
      "Client will check pharmacy refill status at lunch today; CHA follows up tomorrow if unresolved.",
      "Client will use a neighbour's tablets if the pharmacy has none."
    ],
    "correct": 1,
    "why": "A workable action has an owner, an appropriate next step, a time and a review arrangement."
  },
  {
    "module": 7,
    "q": "During a home visit, a person suddenly has one-sided weakness and slurred speech. What takes priority?",
    "a": [
      "Activate approved emergency arrangements immediately.",
      "Finish the counselling checklist.",
      "Arrange routine clinic attendance next month."
    ],
    "correct": 0,
    "why": "These may be stroke symptoms. Do not delay emergency escalation for routine counselling or forms."
  },
  {
    "module": 7,
    "q": "A relative requests a client's full medicine list without permission. What should the CHA do?",
    "a": [
      "Share it because the relative provides transport.",
      "Forward the list in a family chat.",
      "Check the client's wishes and applicable authorisation first."
    ],
    "correct": 2,
    "why": "Consent is specific and family assistance does not automatically permit unrestricted disclosure."
  },
  {
    "module": 8,
    "q": "Before recommending a pill organiser, what should be established?",
    "a": [
      "That it has enough compartments.",
      "Whether the pharmacist confirms it is suitable for those medicines.",
      "That another family member prefers it."
    ],
    "correct": 1,
    "why": "Medicine-specific packaging, identification and storage needs require qualified advice."
  },
  {
    "module": 8,
    "q": "A client asks for transport help but declines family monitoring of medicines. What should happen?",
    "a": [
      "Respect the boundary and plan only the support requested.",
      "Insist on family supervision.",
      "Share all medicine details with the driver."
    ],
    "correct": 0,
    "why": "Support should fit the client's preferences and the minimum necessary information-sharing rules."
  },
  {
    "module": 9,
    "q": "A client attends a referral location but does not receive help. Is the referral resolved?",
    "a": [
      "Yes, attendance alone proves completion.",
      "Only when the concern and next responsible action are clarified and recorded.",
      "Yes, because the form was issued."
    ],
    "correct": 1,
    "why": "Closed-loop referral includes outcome confirmation and ownership of unresolved issues."
  },
  {
    "module": 9,
    "q": "A shared-phone client does not answer an agreed callback. How should the worker proceed?",
    "a": [
      "Ask neighbours why the client is in treatment.",
      "Post the diagnosis in a community chat.",
      "Follow the safe-contact agreement and approved risk/escalation procedure."
    ],
    "correct": 2,
    "why": "Unsuccessful contact does not prove refusal and must not justify privacy breaches."
  }
];
let step=0,score=0,locked=false,results=[];
const root=()=>document.getElementById("expanded-knowledge-practice");
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function draw(){
 const host=root();if(!host)return;
 if(step>=bank.length){
   const byModule=new Map();results.forEach((r,i)=>{const m=bank[i].module,old=byModule.get(m)||{right:0,total:0};old.total++;if(r)old.right++;byModule.set(m,old);});
   host.innerHTML='<div class="extended-summary"><span class="deep-section-kicker">YOUR PRACTICE REVIEW</span><h3>'+score+' of '+bank.length+' answers correct</h3><p>This is formative practice, not a WRHA pass mark or an official certificate grade. Revisit the lessons behind any missed decisions.</p><div class="extended-topic-results">'+Array.from(byModule,([m,r])=>'<span>Module '+m+': '+r.right+'/'+r.total+'</span>').join('')+'</div><button type="button" class="button button-primary" data-extended-restart>Try all 18 questions again</button></div>';
   return;
 }
 const item=bank[step];locked=false;
 host.innerHTML='<div class="extended-progress"><span>Question '+(step+1)+' of '+bank.length+'</span><span>Module '+item.module+'</span></div>'+
 '<div class="extended-track"><span style="width:'+Math.round(step/bank.length*100)+'%"></span></div>'+
 '<h3>'+esc(item.q)+'</h3>'+
 '<div class="extended-choices">'+item.a.map((x,i)=>'<button type="button" class="deep-choice" data-extended-answer="'+i+'">'+String.fromCharCode(65+i)+'. '+esc(x)+'</button>').join('')+'</div>'+
 '<div id="extended-feedback" class="deep-check-feedback" aria-live="polite"></div>'+
 '<button type="button" class="button button-primary extended-next" data-extended-next hidden>'+(step===bank.length-1?'See practice summary →':'Next practice question →')+'</button>';
}
document.addEventListener("click",function(e){
 if(e.target.closest("[data-extended-start]")||e.target.closest("[data-extended-restart]")){step=0;score=0;results=[];draw();return;}
 const choice=e.target.closest("[data-extended-answer]");
 if(choice && !locked){
   const item=bank[step],selected=Number(choice.dataset.extendedAnswer),right=selected===item.correct;locked=true;results.push(right);if(right)score++;
   root().querySelectorAll("[data-extended-answer]").forEach(btn=>{const n=Number(btn.dataset.extendedAnswer);btn.disabled=true;btn.classList.toggle("is-right",n===item.correct);btn.classList.toggle("is-wrong",n===selected&&!right);});
   const feedback=document.getElementById("extended-feedback");feedback.className="deep-check-feedback "+(right?"is-right":"is-wrong");
   feedback.innerHTML='<strong>'+(right?"✓ Correct reasoning":"Review the safe response")+'</strong><p>'+esc(item.why)+'</p>';
   root().querySelector("[data-extended-next]").hidden=false;return;
 }
 if(e.target.closest("[data-extended-next]")&&locked){step++;draw();}
});
window.WRHA_EXTENDED_PRACTICE_COUNT=bank.length;
})();