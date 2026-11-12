# WRHA NCD Adherence Counselling Academy

A **development prototype** of an interactive, Moodle-compatible learning experience for Community Health Aides serving the Western Regional Health Authority (WRHA), Jamaica.

**Programme:** *Adherence Counselling for Non-Communicable Diseases: Equipping Community Health Aides to Support Better Health Outcomes*  
**Theme:** *Listen. Support. Motivate. Connect.*

## Comprehensive 27-lesson curriculum — 12 November 2026
The development branch expands the existing **nine modules into 27 guided lessons** with original Jamaican examples, applied activities, 27 immediate-feedback lesson checks and an optional **18-question cross-module practice review**. Ten blank, downloadable training tools support the 5 A's, barrier assessment, home visits, consent, referral, documentation and supervision. The original concise module notes remain available for quick reference.

**Important:** Study duration is provisionally about 15 hours plus professional practice, **not yet pilot validated**. This prototype is not an approved clinical programme or official Moodle certification system. The HSTU source review was partial and no restricted course materials were copied.

See [full curriculum, change log, assessment proposal and remaining sign-offs](COMPREHENSIVE-COURSE-EXPANSION-2026.md).

## Scope
- Nine modules with 27 substantive learner-facing lessons, case applications and optional quick-reference notes, aligned to the supplied WRHA participant manual and training proposal.
- A **self-paced course interface** with an orientation section, three logical learning units, course index, automatic resume and open access to every lesson (no prerequisite locks).
- **Online teaching in all nine modules**; the in-person observed practical assessment is retained as a separate certification condition.
- The original programme proposed a phased blended schedule. The current prototype uses a fully self-paced online learning journey, while retaining facilitator-led practical competency assessment.
- Mobile-friendly lessons, interactive scenarios, module knowledge checks, feedback and progress.
- Premium institutional design in `premium.css`, with light editorial layout and accessible animation in `motion.js` (`prefers-reduced-motion` respected).
- All 12 public Jamaican MOHW NCD manuals are presented **only in the Guidelines & PDFs library**, no longer inside individual lessons.
- A dedicated **Guidelines & PDFs** page with locally hosted official-public PDFs, authentic first-page covers, PDF.js page turning and zoom, plus the original MOHW links.
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
Nine distinct primary YouTube videos, one per module, are curated in `video-library.js`. Each has a guided observation prompt and a direct YouTube fallback. Viewing is optional. Full playback, captions, rights, fit and Moodle embed behaviour still require review. See `VIDEO-REVIEW.md`.

## In-page MOHW PDF reader — HSTU-style implementation
The Guidelines & PDFs page now displays **12 Ministry documents**, with the actual first page of each PDF shown as a cover image. The import process successfully retrieved all 12 public PDFs on 11 November 2026 and rendered original-cover WebP images. The academy uses the *exact same PDF.js reader and worker files* bundled with the HSTU Research Data Repository, offering page navigation, zoom and a graceful failure state; it no longer attempts to iframe the Ministry download pages.

- Public mirrored PDFs: `documents/pdf-library/<document-id>.pdf`
- Authentic cover previews: `media/pdf-covers/<document-id>.webp`
- Reader: `manual-reader.js`, `vendor/pdfjs/pdf.min.js` and `vendor/pdfjs/pdf.worker.min.js`
- Content manifest: `manual-assets.js` (populated by the official-public document importer)
- Refresh/import workflow: `.github/workflows/import-mohw-guidelines.yml` and `scripts/sync_mohw_manuals.py`

The PDFs are public MOHW publications, reproduced with source attribution for training reference. Only WRHA-authorised material should be deployed or redistributed; rights and approval for institutional production use should be reviewed. **Private WRHA participant and facilitator documents are not included in this public library.** For every source, links to the official Ministry download remain available. The prototype still requires browser and Moodle review to confirm document navigation and any local institutional restrictions.

## Jamaican CHA illustrations
Six individual scenes were cropped from the supplied collage and placed at `assets/cha-scenes/` as locally hosted WebP images. The nine lesson headers, course-content activity rows and course-home unit previews use an appropriate scene through `module-visuals.js` and `illustrations.css`. The images are **illustrative training scenes**, not verified photos of WRHA staff or patients. They retain the original source dimensions; they have not been falsely upscaled or passed off as higher-resolution originals. All nine lessons remain freely accessible, and the existing video, guideline-library and assessment logic remains unchanged.

## Nine unique video learning demonstrations (November 2026)
The academy now has **exactly one distinct primary YouTube video per module**, with publisher references and a four-stage guided observation activity (prepare, watch, reflect, apply in Jamaica). The old overlapping eight-video mapping was replaced. YouTube loads only after a user click, and no videos gate course access or certification. See [VIDEO-REVIEW.md](VIDEO-REVIEW.md) for sourcing, clinical caveats and remaining audiovisual/Moodle/licensing approval checks.
