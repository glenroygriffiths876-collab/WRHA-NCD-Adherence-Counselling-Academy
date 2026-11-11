# WRHA NCD Adherence Counselling Academy

A **development prototype** of an interactive, Moodle-compatible learning experience for Community Health Aides serving the Western Regional Health Authority (WRHA), Jamaica.

**Programme:** *Adherence Counselling for Non-Communicable Diseases: Equipping Community Health Aides to Support Better Health Outcomes*  
**Theme:** *Listen. Support. Motivate. Connect.*

## Scope
- Nine learning modules aligned to the supplied WRHA participant manual and training proposal.
- A **self-paced course interface** with an orientation section, three logical learning units, course index, automatic resume and open access to every lesson (no prerequisite locks).
- **Online teaching in all nine modules**; the in-person observed practical assessment is retained as a separate certification condition.
- The original programme proposed a phased blended schedule. The current prototype uses a fully self-paced online learning journey, while retaining facilitator-led practical competency assessment.
- Mobile-friendly lessons, interactive scenarios, module knowledge checks, feedback and progress.
- Premium institutional design in `premium.css`, with light editorial layout and accessible animation in `motion.js` (`prefers-reduced-motion` respected).
- A module-by-module reading library with exact references to the WRHA participant manual and links to public Jamaican MOHW/WHO resources.
- A standalone **Guidelines & PDFs** page linking to Ministry-hosted downloadable files, with dates, scopes and warnings about older sources.
- A written [2026 guideline alignment review](CLINICAL-GUIDELINE-ALIGNMENT-2026.md), including clinical safety items for WRHA sign-off. Private training manuals are not published here.
- A certificate design **preview**, pending formal eligibility rules and institutional sign-off.
- Preparation for SCORM 1.2 reporting to Moodle.

## Important development safeguards
This repository is currently **public**. Do not commit identifiable health information, the confidential facilitator answer key, unpublished internal manuals, learner accounts, or genuine certificate credentials. Use fictional case studies only. The included text is abbreviated prototype learning content, **not a clinical protocol**.

The existing HIV adherence counselling training is hosted on Moodle; the new platform is intended to be delivered **inside WRHA's existing Moodle**, not to replace it.

Formal pre/post exams should use Moodle Quiz, with the question bank maintained within Moodle rather than exposed in public browser-side source. Observed practical competency should be entered by an authorised facilitator and included in Moodle completion restrictions. Approved certificate issuing would ideally use the Moodle Custom Certificate activity, if installed and authorised.

## Working plan
1. Prototype interface with all nine module sections and low-stakes practice activities.
2. Review course text and emergency/referral rules with the WRHA clinical team.
3. Conduct a Moodle compatibility test using a small SCORM package.
4. Link Moodle grades, observed skills assessment, and certificate unlock rules.
5. Pilot with CHAs and revise before rollout.

## Source documents
- *WRHA Training Proposal for CHAs in Adherence Counseling* (October 2026)
- *Adherence Counselling for NCDs: CHA Participant Manual*
- *Adherence Counselling for NCDs: Facilitator Pack*

Documents were supplied for project planning and are not reproduced in full in this public repository.

## Status
**Prototype — not approved for live training or official certification.**

## Attribution
Developed as a technical prototype in collaboration with the Western Regional Health Authority training initiative. Institutional branding, content approval and rights require confirmation.

### Logo integrity
The official logo supplied by the project owner has been restored losslessly. `assets/original-logo-data.js` holds its exact PNG pixels in five encoded segments, and `logo-loader.js` displays them in the header and certificate. The earlier 16-colour `assets/wrha-logo.svg` remains as a fallback; the official colours are not filtered, recoloured or stylised. The GitHub Pages build and Moodle SCORM ZIP both include the complete image data.

See [Moodle native course blueprint](MOODLE-COURSE-BLUEPRINT.md) for implementing the course in WRHA Moodle. The current SCORM prototype presents one learning experience and is not itself a native Moodle course format.

## Video-based learning
Eight externally hosted YouTube counselling and adherence demonstration videos are curated in `video-library.js`, including NCD adherence, motivational interviewing, OARS and teach-back. Each module displays up to two relevant videos with a reflective observation prompt. These are optional, load only on click, and provide direct YouTube fallback links; their suitability for final WRHA training and embed availability must be checked by the content review team. See `VIDEO-REVIEW.md`.
