/* Jamaican Community Health Aide image library
 * Source: six individual scenes cropped from the collage supplied by the project team.
 * Images show illustrative, simulated training situations; no patient details are used.
 * Native source resolution is retained. No AI-generated clinical content is inferred.
 */
(function(){
  "use strict";
  const path="assets/cha-scenes/";
  const scenes={
    exercise:{
      src:path+"cha-exercise-group.webp",
      alt:"Community Health Aide in a light-blue uniform guiding older adults through gentle group exercise",
      caption:"Supporting healthy routines through community engagement."
    },
    documentation:{
      src:path+"cha-records-documentation.webp",
      alt:"Community Health Aide in a light-blue uniform reviewing and recording information in a clinic office",
      caption:"Clear documentation supports continuity of care."
    },
    outreach:{
      src:path+"cha-community-education.webp",
      alt:"Community Health Aide speaking with a mother during a Jamaican community health outreach activity",
      caption:"Respectful communication builds trust and understanding."
    },
    bp:{
      src:path+"cha-blood-pressure.webp",
      alt:"Community Health Aide demonstrating a blood-pressure check with an older woman in a clinic",
      caption:"Recognising NCD needs and supporting follow-up."
    },
    medication:{
      src:path+"cha-medication-counselling.webp",
      alt:"Community Health Aide discussing a medicine blister pack with an adult man during counselling",
      caption:"Listening first helps identify medicine-taking barriers."
    },
    home:{
      src:path+"cha-home-visit.webp",
      alt:"Community Health Aide conducting a home visit and speaking with a Jamaican family at their veranda",
      caption:"Community support helps connect clients with ongoing care."
    }
  };
  const assignments={
    1:"bp",
    2:"medication",
    3:"home",
    4:"outreach",
    5:"medication",
    6:"bp",
    7:"home",
    8:"exercise",
    9:"documentation"
  };
  window.WRHA_CHA_SCENES=scenes;
  window.WRHA_MODULE_VISUALS=Object.fromEntries(
    Object.entries(assignments).map(([id,scene])=>[id,scenes[scene]])
  );
  window.WRHA_UNIT_VISUALS={
    1:scenes.bp,
    2:scenes.medication,
    3:scenes.home
  };
})();