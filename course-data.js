/* WRHA NCD Adherence Academy — prototype instructional content.
   Adapted and condensed from the WRHA proposal, CHA participant manual and facilitator pack.
   For clinical review. Original high-stakes assessment keys are intentionally excluded. */
window.WRHA_COURSE = {
 title: "Adherence Counselling for Non-Communicable Diseases",
 subtitle: "Equipping Community Health Aides to Support Better Health Outcomes",
 theme: "Listen. Support. Motivate. Connect.",
 modules: [
  {
   id: 1, title: "Understanding NCDs", phase: "Online foundation", icon: "♥", duration: "20–30 min",
   summary: "Understand the NCDs affecting Jamaican families and why continuous care matters.",
   objectives: ["Name major NCDs and their effects.", "Describe modifiable risks and common complications.", "Explain why clients need continued care even when they feel well."],
   sections: [
    {title:"What are NCDs?",text:"Non-communicable diseases are long-term health conditions that require ongoing support. In the Jamaican primary-care context, major priorities include hypertension, diabetes, cardiovascular disease, cancers and chronic respiratory conditions.",points:["Hypertension and diabetes may have no obvious symptoms for years.","Regular appointments, prescribed treatment, monitoring and healthy habits all contribute to ongoing care.","The CHA connects individuals and families with their health centre."]},
    {title:"When control is lost",text:"Uncontrolled chronic conditions can affect the brain, heart, kidneys, eyes, feet and everyday functioning. Consequences often extend to income, caregivers and family wellbeing.",points:["Hypertension can contribute to stroke, cardiac and kidney complications.","Diabetes can cause eye, nerve, kidney and foot problems.","Discuss risk without frightening, blaming or diagnosing the client."]},
    {title:"Your place in the care team",text:"Community Health Aides are well placed to recognise practical barriers, reinforce information already given by clinicians, arrange support and refer problems within the established care pathway.",points:["Do not equate feeling well with being cured.","Encourage screening, attendance and follow-up.","Explain concerns in plain language and refer clinical questions."]}
   ],
   scenario:{type:"Knowledge check",prompt:"During a home visit, a man with hypertension says, “Mi feel good now, so the pressure gone.” Which is the most helpful response?",choices:[{text:"Agree that he no longer needs clinic visits.",correct:false,feedback:"Hypertension may remain present even when someone feels well."},{text:"Explain gently that pressure can remain high without symptoms, then ask about his treatment plan.",correct:true,feedback:"Correct. The response offers simple information and invites a respectful discussion."},{text:"Warn him that he is definitely about to have a stroke.",correct:false,feedback:"Avoid alarmist statements and making an individual diagnosis."}]}
  },
  {
   id:2,title:"What Is Adherence?",phase:"Online foundation",icon:"◎",duration:"20 min",
   summary:"Move from compliance to shared, person-centred treatment plans.",
   objectives:["Distinguish compliance, adherence and concordance.","Recognise that adherence involves more than medication.","Use language that respects the client's choices."],
   sections:[
    {title:"Three related ideas",text:"Compliance generally centres on obeying instructions. Adherence refers to following a treatment plan the client understands and accepts. Concordance emphasises a shared agreement between the client and health professional.",points:["Patients are partners, not people to be scolded.","Ask how the plan fits the person's daily life.","A plan is more sustainable when its barriers are addressed together."]},
    {title:"More than tablets",text:"NCD adherence may involve medication, clinic attendance, investigations, diet, physical activity, self-monitoring when taught and follow-through on referrals.",points:["Someone may take every tablet yet miss necessary tests.","An appointment may be missed for transport or employment reasons.","Explore the whole care plan, not just prescriptions."]},
    {title:"Support autonomy",text:"Use clear, non-judgmental questions and share decisions with the client and authorised clinical team. CHAs reinforce agreed plans but do not independently change treatments.",points:["Ask what already works.","Find out which part of the plan is difficult.","Refer prescription changes to the nurse or medical officer."]}
   ],
   scenario:{type:"Practice decision",prompt:"A client says she cannot visit the clinic on Fridays because she works at a hotel. What demonstrates person-centred adherence support?",choices:[{text:"Label her non-compliant.",correct:false,feedback:"Labels conceal the real barrier and undermine trust."},{text:"Explore the difficulty and refer her to the clinic team to discuss an achievable arrangement.",correct:true,feedback:"Correct. It respects circumstances while maintaining appropriate referral."},{text:"Tell her to stop treatment until her work schedule changes.",correct:false,feedback:"A CHA must not recommend stopping treatment."}]}
  },
  {
   id:3,title:"Why People Don't Adhere",phase:"Online foundation",icon:"◈",duration:"25–35 min",
   summary:"Recognise the human, treatment, social and health-system barriers behind missed care.",
   objectives:["Identify the four broad groups of adherence barriers.","Explore multiple barriers without assumptions.","Select appropriate support and referral responses."],
   sections:[
    {title:"Four barrier groups",text:"Non-adherence may relate to personal understanding and feelings, treatment effects or complexity, social and economic circumstances, and the health system.",points:["Client-related: forgetfulness, fear, low mood, beliefs or difficulty reading instructions.","Treatment-related: complex schedules or reported side effects.","Social/economic: transport costs, work hours, food insecurity or caregiver duties.","Health-system: stockouts, queues, inaccessible services and poor follow-up."]},
    {title:"Listen for more than one obstacle",text:"People may simultaneously be worried about medicines, lack transport and experience grief. A single instruction rarely solves all three issues.",points:["Ask open questions before suggesting solutions.","Avoid dismissing cultural or religious beliefs.","Use a respectful approach to herbal-remedy questions; refer medication interaction concerns to clinicians."]},
    {title:"Jamaican case discussion",text:"Consider a fictional older adult in rural Hanover who cannot afford return transport, has missed two appointments, reports adverse effects and is grieving a spouse.",points:["Which barriers are within the CHA's supportive role?","Which concerns need nurse, doctor, pharmacist or social-worker input?","How would you record the agreed next step?"]}
   ],
   scenario:{type:"Barrier identification",prompt:"A pharmacy repeatedly has no stock of a prescribed tablet. Which category best describes that barrier?",choices:[{text:"Only a client knowledge problem.",correct:false,feedback:"A medicine stockout is not caused by poor client knowledge."},{text:"A health-system barrier that should be reported through the care team.",correct:true,feedback:"Correct. Explore continuity-of-care options with authorised staff."},{text:"Proof that the treatment is unnecessary.",correct:false,feedback:"Medication supply problems do not justify discontinuation without clinical review."}]}
  },
  {
   id:4,title:"Communication Skills",phase:"In-person workshop",icon:"◌",duration:"25–35 min",
   summary:"Practise active listening, empathy, reflection and respectful questions.",
   objectives:["Use open-ended questions and non-judgmental language.","Demonstrate attentive listening and accurate reflections.","Summarise the client's barriers before planning."],
   sections:[
    {title:"Ask, listen, understand",text:"Every adherence discussion begins by understanding the client's experience. Avoid interrupting, scolding or delivering a lecture before hearing the full story.",points:["“How have you been managing your tablets?” invites a fuller answer.","“What made it difficult to get to clinic?” avoids blame.","Reflect back what you heard and check that you understood."]},
    {title:"Support, plan, follow up",text:"Once the barriers are understood, offer appropriate information, agree on one or two practical steps and schedule follow-up.",points:["Praise specific efforts and strengths.","Use language the client understands, including Jamaican speech where appropriate.","Ask before discussing a client's information with family."]},
    {title:"Workshop activity: rewrite the question",text:"In pairs, transform a judgemental statement into a supportive question. A facilitator observes the communication style and offers feedback.",points:["Replace “Why yuh careless?” with a genuine exploration of what happened.","Listen for feelings as well as facts.","Practise a brief summary before proposing a plan."]}
   ],
   scenario:{type:"Communication practice",prompt:"A CHA learns that a client missed clinic. Which response best opens the conversation?",choices:[{text:"“What made it difficult for you to attend?”",correct:true,feedback:"Correct. This invites discussion without judgement."},{text:"“You cannot keep behaving like this.”",correct:false,feedback:"This response is accusatory and may cause the client to withdraw."},{text:"“I will report you if this happens again.”",correct:false,feedback:"Threats are not person-centred counselling."}]}
  },
  {
   id:5,title:"Motivational Interviewing",phase:"In-person workshop",icon:"✧",duration:"25–35 min",
   summary:"Practise OARS, confidence rulers and change talk.",
   objectives:["Describe the spirit of motivational interviewing.","Use the OARS communication skills.","Elicit rather than impose the client's motivation."],
   sections:[
    {title:"The spirit of MI",text:"Motivational interviewing supports a collaborative conversation. Its core orientation includes partnership, acceptance, compassion and evocation.",points:["Explore what matters to the client.","Listen for reasons the client gives for change.","Avoid arguing when the person is uncertain or hesitant."]},
    {title:"OARS",text:"Use Open questions, Affirmations, Reflective listening and Summaries to support a productive conversation.",points:["Open question: “What worries you about your sugar?”","Affirmation: recognise an effort or personal strength.","Reflection: “The dizziness worries you when you go to work.”","Summary: confirm the concern and agreed next step."]},
    {title:"Readiness and confidence ruler",text:"Ask for an importance or confidence rating from 0 to 10. Follow up by asking why the person chose that number rather than a lower one, and what might increase it one point.",points:["Listen for change talk: desire, ability, reasons and needs.","Offer information in small pieces using Ask–Share–Ask.","Practise in threes: client, counsellor and observer."]}
   ],
   scenario:{type:"MI practice",prompt:"A client rates her confidence at 5/10. Which follow-up question is most consistent with motivational interviewing?",choices:[{text:"“Why only five?”",correct:false,feedback:"This may invite a defensive explanation of failure."},{text:"“Why five and not two?”",correct:true,feedback:"Correct. The client can identify existing strengths and reasons for confidence."},{text:"“You need to get to ten today.”",correct:false,feedback:"MI does not impose a required confidence rating."}]}
  },
  {
   id:6,title:"The 5 A's & Adherence Assessment",phase:"In-person workshop",icon:"⑤",duration:"25–35 min",
   summary:"Apply Ask, Assess, Advise, Agree and Assist to a realistic client encounter.",
   objectives:["Apply the WRHA manual's 5 A's in order.","Assess medication, clinic, lifestyle and barrier domains.","Agree achievable steps and appropriate follow-up."],
   sections:[
    {title:"The 5 A's",text:"The WRHA participant manual proposes a five-step structure for brief CHA adherence conversations: Ask, Assess, Advise, Agree and Assist. This is the programme's proposed teaching framework, subject to WRHA training-team approval; it is not an independent clinical treatment protocol.",points:["Ask about current behaviour and routines.","Assess obstacles and readiness to change.","Advise with correct, plain-language information within scope.","Agree on one or two realistic actions together.","Assist with support, referral and follow-up."]},
    {title:"The adherence checklist",text:"The supplied checklist covers medication knowledge, missed doses, appointment attendance, investigations, lifestyle practices, side effects, refill supply and barriers.",points:["Use teach-back instead of assuming understanding.","Ask the client to describe what they take and how they use it.","Medication discrepancies or adverse effects require clinical review."]},
    {title:"Workshop application",text:"In small groups, apply each of the 5 A's to a fictional farmer whose medication schedule does not fit his working day.",points:["Do not independently change prescriptions.","Record the client's stated barriers accurately.","Include referral and follow-up in the agreed plan."]}
   ],
   scenario:{type:"5 A's sequence",prompt:"After listening to barriers and sharing information, the CHA and client decide on a feasible reminder. Which A does that represent?",choices:[{text:"Ask",correct:false,feedback:"Ask explores current behaviour."},{text:"Agree",correct:true,feedback:"Correct. Agree means making a realistic plan together."},{text:"Assess",correct:false,feedback:"Assess identifies barriers and readiness to change."}]}
  },
  {
   id:7,title:"Scope, Confidentiality & Danger Signs",phase:"In-person workshop",icon:"⚕",duration:"25–35 min",
   summary:"Know what CHAs can do, what requires referral and when to escalate immediately.",
   objectives:["Distinguish counselling support from clinical decision-making.","Protect confidential client information.","Recognise red flags and follow WRHA escalation protocols."],
   sections:[
    {title:"Work within the CHA role",text:"CHAs can explore adherence concerns, reinforce agreed plans, provide basic education, document care and facilitate referrals. Clinical prescribing, diagnosis and medication changes remain outside CHA scope.",points:["Do not advise a client to halve, stop or switch a prescribed medicine.","Do not interpret complex laboratory results or diagnose complications.","Refer suspected adverse effects and medicine confusion."]},
    {title:"Confidentiality is essential",text:"In community work, privacy needs deliberate protection. Discuss care with authorised personnel and obtain permission before involving family or other supporters.",points:["Hold discussions in an appropriate private space.","Secure notes and referral documents.","Do not photograph patients or records using personal devices."]},
    {title:"Green, amber, red",text:"The facilitator pack uses a traffic-light exercise: green is support within scope; amber is prompt clinician review; red is an emergency requiring action under WRHA protocols.",points:["Possible stroke symptoms, severe chest pain or breathing difficulty require immediate emergency escalation according to the current WRHA protocol. Do not delay for a routine appointment.","A new or non-healing foot wound in a person with diabetes needs prompt clinician triage. Medication side effects or confusion also require clinical review; follow the approved local escalation pathway.","If uncertain, seek advice promptly rather than delaying care."]}
   ],
   scenario:{type:"Referral judgement",prompt:"A client suddenly develops one-sided arm weakness and slurred speech during a home visit. What should the CHA do?",choices:[{text:"Schedule routine counselling next week.",correct:false,feedback:"These are possible stroke symptoms and require urgent escalation."},{text:"Activate the local emergency referral procedure immediately, note onset and notify the care team.",correct:true,feedback:"Correct. This is a potential emergency. Follow the approved WRHA response pathway."},{text:"Try a different tablet dose.",correct:false,feedback:"A CHA must not change medication or delay urgent care."}]}
  },
  {
   id:8,title:"Supporting Self-Management at Home",phase:"Online continuity",icon:"⌂",duration:"20–30 min",
   summary:"Help clients make workable routines using reminders, teach-back and support networks.",
   objectives:["Practise teach-back and health-literate communication.","Identify workable reminders and refill support.","Involve family or community supports with permission."],
   sections:[
    {title:"Teach-back and everyday language",text:"Teach-back asks the client to explain in their own words what they plan to do. If the explanation is unclear, try a different explanation and check again.",points:["Use simple terms and visual aids when useful.","Keep the key messages focused.","Do not assume a client can read a medicine label easily."]},
    {title:"Build reliable routines",text:"Reminders can be linked to daily habits, phone alarms, calendar prompts and appointment cards. A pharmacist or authorised clinician should advise on the safe use of medicine organisers and storage, including which medicines must remain in original packaging.",points:["Ask which tool fits the person's routine and ability.","Check whether enough medicine is available until the next refill.","Discuss access problems with nurses, pharmacists or social workers as appropriate."]},
    {title:"Support without taking over",text:"A treatment supporter may help remind, accompany or assist with access if the client agrees. CHAs should reinforce clinician-approved diet, exercise and inhaler action plans but must not issue new prescriptions or change treatment. Low mood, food insecurity and caregiver strain may need additional professional support.",points:["Respect autonomy and confidentiality.","Use the approved health-centre and community support pathway.","Agree on a specific follow-up rather than making unsupported promises."]}
   ],
   scenario:{type:"Teach-back practice",prompt:"A client nods when you explain a new agreed routine. How can the CHA best check that the explanation was clear?",choices:[{text:"Ask, “You understand, right?”",correct:false,feedback:"Many people will agree even when the explanation was unclear."},{text:"Invite the client to describe the routine in their own words.",correct:true,feedback:"Correct. Teach-back checks your explanation without blaming the client."},{text:"Repeat the same speech faster.",correct:false,feedback:"Use plain language, demonstration and teach-back instead."}]}
  },
  {
   id:9,title:"Referral, Documentation & Follow-Up",phase:"Online continuity",icon:"↗",duration:"20–30 min",
   summary:"Close the loop: record concerns, refer appropriately and check what happened next.",
   objectives:["Write objective, non-stigmatising documentation.","Explain the referral and escalation process.","Plan follow-up and check referral completion."],
   sections:[
    {title:"Document facts, not labels",text:"Record what the client reported, barriers identified, advice given within scope, plan agreed, referrals, and follow-up date.",points:["Document promptly using approved WRHA forms.","Use clear descriptions rather than “lazy” or “non-compliant.”","Protect identifiable information in authorised systems only."]},
    {title:"Refer with a clear reason",text:"A referral should state the concern, urgency, what was done and who should review it. The timing and local criteria for a completed referral must be confirmed against current WRHA procedures. The care pathway may involve a nurse, medical officer, pharmacist, social worker or specialist.",points:["Tell the client why, where and when they are being referred.","Record whether the referral was received and acted on.","Urgent warning signs override routine queues."]},
    {title:"Close the loop",text:"Follow-up is how a supportive conversation becomes continued care. The manual suggests earlier contact for new plans, missed appointments and referrals, adapted to local protocols.",points:["Agree how and when the next contact will occur.","Check whether the referral was completed.","Include appropriate activity totals in monthly reports."]}
   ],
   scenario:{type:"Documentation practice",prompt:"Which note is best for recording a client's adherence difficulty?",choices:[{text:"“Client lazy. Counselled.”",correct:false,feedback:"This is judgemental and gives no useful actions or next steps."},{text:"“Client reports missed evening doses three times this week; agreed reminder plan; referred concern to nurse; follow-up scheduled.”",correct:true,feedback:"Correct. Objective, actionable notes support continuity of care."},{text:"“Client always fails to listen.”",correct:false,feedback:"Avoid unsupported labels and generalisations."}]}
  }
 ]
};
