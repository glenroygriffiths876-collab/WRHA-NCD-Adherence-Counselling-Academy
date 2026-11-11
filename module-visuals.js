/* WRHA Academy · Non-repeating Afro-Caribbean/Jamaican CHA visual collection.
   Twelve distinct scene crops from the collage supplied 11 Nov 2026.
   Nine lesson images and three unit cards: no repeated image assignments.
   Simulated/generated scenes; do not present as real patient records.
 */
(function(){
 "use strict";
 const path="assets/cha-scenes/cha-";
 const scene=(filename,alt,caption)=>({src:path+filename+".webp",alt,caption});
 const scenes={
   "blood-pressure":scene("blood-pressure","CHA supporting an older male client with blood-pressure monitoring in a Jamaican clinic","Understanding NCD monitoring and connecting clients to ongoing care."),
   "medication-guidance":scene("medication-guidance","CHA and older male client discuss medication-taking routines at a clinic table","Explore medication-taking routines with empathy and without judgement."),
   "home-visit":scene("home-visit","Community Health Aide speaking with older adults outside their Jamaican home","Home visits reveal practical and social barriers to continued care."),
   "active-listening":scene("active-listening","CHA listens attentively during a private conversation with a female client","Listening, empathy and privacy help build counselling trust."),
   "conversation":scene("conversation","CHA discussing a client’s individual health choices","Open questions invite clients to describe their own motivations."),
   "goal-setting":scene("goal-setting","Community Health Aide supporting a client to set achievable wellbeing goals","Agree on achievable next steps in a patient-centred conversation."),
   "team-referral":scene("team-referral","Community Health Aide discussing health needs and next steps with community members","Knowing when to involve the wider care team supports safe referrals."),
   "nutrition":scene("nutrition","CHA discussing a balanced meal and fruits and vegetables with an older woman","Supporting manageable healthy routines and self-management."),
   "documentation":scene("documentation","CHA entering referral and follow-up information in a clinic office","Accurate documentation supports follow-up and continuity of care."),
   "group-education":scene("group-education","Community health educator guiding a small group in a Jamaican community setting","Learn NCD prevention and care foundations with the community."),
   "family-counselling":scene("family-counselling","CHA leading a supportive group counselling discussion in a health facility","Counselling can include families and the wider care team when appropriate."),
   "physical-activity":scene("physical-activity","Community health worker encouraging gentle movement with an older adult outdoors","Supporting wellbeing and everyday activity as part of self-management.")
 };
 const assignments={1:"blood-pressure",2:"medication-guidance",3:"home-visit",4:"active-listening",
                    5:"conversation",6:"goal-setting",7:"team-referral",8:"nutrition",9:"documentation"};
 const unitAssignments={1:"group-education",2:"family-counselling",3:"physical-activity"};
 window.WRHA_CHA_SCENES=scenes;
 window.WRHA_MODULE_VISUALS=Object.fromEntries(Object.entries(assignments).map(([id,key])=>[id,scenes[key]]));
 window.WRHA_UNIT_VISUALS=Object.fromEntries(Object.entries(unitAssignments).map(([id,key])=>[id,scenes[key]]));
})();