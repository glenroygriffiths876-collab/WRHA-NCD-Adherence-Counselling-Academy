/* WRHA NCD Academy · twelve real-resolution Jamaican CHA training illustrations.
 * Source: original high-resolution training image set, optimized as WebP.
 * Nine unique lesson images plus three unique unit banners. No repeated scenes.
 * Illustrations are simulated training imagery; do not depict identifiable patients.
 */
(function(){
 "use strict";
 const prefix="assets/cha-hd/cha-";
 const scene=(filename,alt,caption)=>({src:prefix+filename+".webp",alt,caption});
 const scenes={
   "ncd-overview":scene("ncd-overview","Jamaican Community Health Aide discussing an NCD care plan with a client","Building a shared understanding of long-term NCD prevention and care."),
   "adherence-conversation":scene("adherence-conversation","Community Health Aide discussing medication routines with an adult client","Supporting adherence through partnership and clear communication."),
   "barriers-home-visit":scene("barriers-home-visit","Light-blue-uniformed Jamaican Community Health Aide visiting a family outside their home","Understanding the real-life barriers clients face in remaining in care."),
   "communication-education":scene("communication-education","Male Jamaican community health educator in a four-pocket blue bush jacket leading a small group","Clear communication creates trust and understanding in community health."),
   "motivational-interviewing":scene("motivational-interviewing","Community Health Aide having an attentive one-to-one counselling conversation","Using empathetic questions and reflections to support motivation."),
   "five-as-assessment":scene("five-as-assessment","Community Health Aide talking with a client about nutrition and everyday health habits","Assess needs and work with clients on achievable behaviour changes."),
   "danger-signs-monitoring":scene("danger-signs-monitoring","Jamaican Community Health Aide helping an older client with safe physical activity outdoors","Recognise concerns within the CHA role and refer promptly when needed."),
   "self-management-activity":scene("self-management-activity","Community Health Aide working on self-care routines and health documentation","Support practical self-management and sustained healthy habits."),
   "documentation-follow-up":scene("documentation-follow-up","Community Health Aide discussing follow-up needs with a client and care-team member","Good follow-up planning and documentation help continuity of care."),
   "unit-1":scene("unit-1","Jamaican Community Health Aide explaining NCD health information","Unit 1: Understanding NCD care."),
   "unit-2":scene("unit-2","Jamaican Community Health Aide listening attentively during a counselling conversation","Unit 2: Counselling with confidence."),
   "unit-3":scene("unit-3","Community Health Aide helping a Jamaican client with an everyday health routine","Unit 3: Supporting continuity of care.")
 };
 const assignments={1:"ncd-overview",2:"adherence-conversation",3:"barriers-home-visit",4:"communication-education",5:"motivational-interviewing",6:"five-as-assessment",7:"danger-signs-monitoring",8:"self-management-activity",9:"documentation-follow-up"};
 const unitAssignments={1:"unit-1",2:"unit-2",3:"unit-3"};
 window.WRHA_CHA_SCENES=scenes;
 window.WRHA_MODULE_VISUALS=Object.fromEntries(Object.entries(assignments).map(([id,key])=>[id,scenes[key]]));
 window.WRHA_UNIT_VISUALS=Object.fromEntries(Object.entries(unitAssignments).map(([id,key])=>[id,scenes[key]]));
})();