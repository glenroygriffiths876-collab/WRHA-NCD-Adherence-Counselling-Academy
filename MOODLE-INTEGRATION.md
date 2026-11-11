# Moodle Integration Plan — WRHA NCD Adherence Academy

**Status:** Technical proof of concept, pending approval from WRHA Moodle administrator and clinical training team.

## 1. Existing environment
The WRHA HIV Adherence Counsellors course already runs on Moodle. Reuse that institutional environment where permitted. Do not buy separate hosting before a Moodle compatibility test.

## 2. Proposed course structure

| Moodle item | Material | Completion logic |
|---|---|---|
| Orientation | Course instructions and consent/safety guidance | Viewed |
| Pre-test | Moodle Quiz (secure item bank) | Attempted; not pass-gated |
| SCORM module(s) 1–3 | Online NCD foundations | SCORM activity completed |
| In-person workshop / Modules 4–7 | Facilitated communication, MI, 5 A's, scope and referrals | Attendance and observed competency recorded by an authorised assessor |
| SCORM module(s) 8–9 | Self-management and continuity of care | SCORM activity completed |
| Post-test | Moodle Quiz (secure item bank) | Meets approved threshold |
| Practical assessment | Moodle Assignment, grade item or approved equivalent | Meets approved 40-point threshold |
| Certificate | Custom Certificate activity or other institution-approved certificate method | Restricted by all required completion and grade rules |

**Current code limitation:** The initial SCORM manifest packages all nine prototype lessons as one SCO. A production implementation may split the lessons into separate SCO packages so Moodle can gate each phase independently, instead of treating all nine as one learning activity.

## 3. Certificate unlock
Do not let browser-side localStorage values determine official certification. Require **server-side Moodle** conditions:
1. All required SCORM learning activities complete.
2. Official Moodle post-test grade meets the training team's approved pass mark.
3. An authorised facilitator records a satisfactory observed counselling skills result.
4. Any additional mandatory attendance/participation conditions are met.

The prototype certificate is intentionally watermarked **SAMPLE · NOT ISSUED**. Actual recipient names, issue dates, authorising signatories and verification must be generated or authenticated by Moodle and approved by WRHA.

The existing facilitator pack suggests 30/40 on the observation checklist **for discussion**, explicitly not as an approved threshold. The training team must decide the threshold. No knowledge-test pass mark is set in the supplied source documents.

## 4. SCORM trial
The repository has a GitHub Actions workflow that validates JavaScript and packages the prototype into a SCORM 1.2 ZIP artifact. In GitHub, open **Actions → Validate and package WRHA Moodle prototype → latest successful run → Artifacts** to obtain the ZIP.

Ask the Moodle administrator to:
- Confirm SCORM 1.2 activity support and maximum upload size.
- Upload the ZIP into a non-production course.
- Test on desktop and mobile browsers.
- Verify tracking for all nine module scenario checks, completion status, practice review score, browser reload and resume.
- Verify that the course does **not** grant a certificate merely from SCORM practice completion.
- Confirm the certificate plugin or alternative approved certificate mechanism.

## 5. Course quality and security
- Use the Ministry of Health & Wellness's current Jamaican NCD clinical protocols, approved by the clinical team.
- Confirm that emergency escalation, referral timing, medication advice, confidentiality and CHA scope reflect WRHA policy.
- Protect the confidential facilitator answer key. Keep graded questions in Moodle's item bank, not this public repository.
- Never store real patient information in SCORM, localStorage, code examples, GitHub Issues or learner practice forms.
- Maintain accessible interactions and test within the institution's Moodle theme and navigation layout.
- Do not publish a live learner course until formal content and technical sign-off are complete.

## 6. Institutional decisions required
- Named course owner, Moodle administrator and approved content reviewers.
- Certificate signatory/authorisation and whether Custom Certificate is available.
- Practical assessment recording workflow, competency threshold and exceptions/reassessment.
- Formal post-test length, pass mark, retake limits and question-bank security.
- Whether the three online phases are separate graded SCORM activities.
- Ownership and maintenance arrangements for the code and instructional materials.

## 7. Useful GitHub paths
- `index.html` — learner-facing academy
- `course-data.js` — prototype module content
- `module-resources.js` — verified public reading links and internal WRHA participant-manual page references
- `app.js` — navigation, progress and interactive checks
- `styles.css` — responsive branded interface
- `scorm.js` — SCORM 1.2 browser adapter
- `imsmanifest.xml` — SCORM packaging manifest
- `assets/wrha-logo.svg` — supplied WRHA logo embedded in a text-compatible SVG container
- `.github/workflows/build-scorm.yml` — automatic build/test workflow
