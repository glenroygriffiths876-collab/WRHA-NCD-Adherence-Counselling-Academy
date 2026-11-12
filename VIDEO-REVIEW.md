# WRHA NCD Adherence Academy — Nine-Video Curriculum Review
**Updated:** 11 November 2026
**Status:** Curated and integrated into the GitHub prototype; audiovisual playback, captions, licensing where relevant, and WRHA Moodle embedding still require hands-on verification.

## Selection decision
Exactly **one different YouTube video per module**. No repeated YouTube IDs, no secondary duplicates, and no video-based access gates. Each video has its own before/during/after and Jamaican CHA application prompts. These are *teaching examples*, not MOHW clinical guidelines or authorised CHA protocols. Selection was based on module fit and descriptions/transcripts from institutional publishers; individual YouTube audiovisual playback was not available for independent confirmation.

| WRHA module | Selected YouTube video | Institutional evidence | Strength / limitations |
|---|---|---|---|
| 1 Understanding NCDs | [HealthSketch — What is High Blood Pressure?](https://www.youtube.com/watch?v=D1bg5NSpRoI) | [HealthSketch's video collection](https://www.health-sketch.com/videos.html) | Concise foundational explanation rather than a counselling role-play. **Educational-use licence review needed** prior to authorised institutional deployment. |
| 2 What Is Adherence? | [UCSF — Medication Reconciliation](https://www.youtube.com/watch?v=3UpzjkL_aYU) | [UCSF Center for Excellence in Primary Care](https://cepc.ucsf.edu/medication-reconciliation-video) | Strong demonstration of better versus poorer discussion of how people take medication. Medication decisions stay with authorised clinicians. |
| 3 Why People Don't Adhere | [CMPA — Exploring Cultural Barriers to Adherence, Part 2](https://www.youtube.com/watch?v=UZXGYp2r9U8) | [Canadian Medical Protective Association, with transcript](https://www.cmpa-acpm.ca/en/education-events/teaching-resources/professionalism-ethics-and-wellness/exploring-cultural-barriers-to-adherence-2) | Strong hypertension consultation about beliefs and motivations. Use communication questions only; avoid stereotyping and copying physician decisions. |
| 4 Communication Skills | [Teach-Back: Improving Patient Understanding](https://www.youtube.com/watch?v=4KORO7FwqX0) | [Health Literacy Solutions](https://www.healthliteracysolutions.org/library-communication/post/teach-back-improving-patient-understanding-q9caWutGAtWJUNO) | Two contrasting patient interactions; better example starts ~5:16. |
| 5 Motivational Interviewing | [Motivational Interviewing: Obesity](https://www.youtube.com/watch?v=24NV35rKl5I) | [National Center for Health in Public Housing](https://nchph.org/2021/07/06/motivational-interviewing-in-patients-with-diabetes/) | NCD-related non-judgemental dialogue, useful for OARS and evoking change talk. External clinical advice is not local guidance. |
| 6 The 5 A's & Adherence Assessment | [CHEO/SickKids — Putting It All Together](https://www.youtube.com/watch?v=jJ2zSkX8TwE) | [Meant2Prevent 5 A's training video collection](https://meant2prevent.ca/5as-of-pediatric-obesity-management/) | **Exact proposed WRHA sequence: Ask, Assess, Advise, Agree, Assist.** However, the example concerns *paediatric obesity*, not adult CHA NCD counselling. Focus on the structure, not clinical recommendations. |
| 7 Scope, Confidentiality & Danger Signs | [Heart and Stroke Foundation of Canada — Witness Stroke Signs](https://www.youtube.com/watch?v=ZDhzCIi0_wA) | [St. Thomas Elgin General Hospital attribution and context](https://www.stegh.on.ca/hospital-services/integrated-stroke-unit/signs-and-symptons-of-stroke/) | Partial module fit: recognises stroke red flags, **does not itself teach CHA confidentiality/scope**. Video may say **call 911**, which is *not* Jamaica's emergency number. Use WRHA emergency procedure. |
| 8 Supporting Self-Management at Home | [UCSF — Action Plans](https://www.youtube.com/watch?v=pTJWtLJLOsM) | [UCSF video](https://cepc.ucsf.edu/action-plans-video) and [AHRQ action-planning guidance](https://www.ahrq.gov/health-literacy/improve/precautions/tool15.html) | High-quality demonstration of ineffective versus effective collaborative action planning. |
| 9 Referral, Documentation & Follow-Up | [AHRQ — Warm Handoffs Improve Patient Safety](https://www.youtube.com/watch?v=ZTL5ltGMUlQ) | [AHRQ video](https://www.ahrq.gov/patient-safety/reports/engage/interventions/warmhandoff-video.html) and [warm-handoff guidance](https://www.ahrq.gov/patient-safety/reports/engage/interventions/warmhandoff.html) | Practical care-transfer communication. **Not a Jamaican referral-form or documentation demonstration.** |

## Safeguards required before official WRHA launch
1. Watch the **entire** video in each module, inspect audiovisual quality, caption accuracy, clinical content, and video availability. Publisher reference pages and video IDs were checked, but no claim is made that every video was watched end-to-end.
2. Test **actual YouTube embedding inside WRHA Moodle/SCORM**. The prototype provides a privacy-enhanced click-to-load YouTube player with an external link fallback.
3. Verify that the HealthSketch embedding and educational-institution use comply with its current terms/licensing.
4. Have WRHA clinicians approve case prompts and counsel/referral safeguards. CHAs are not to diagnose, adjust medications, prescribe diet/exercise regimens or reinterpret clinician-led pathways.
5. **Module 7:** Confirm WRHA's approved urgent referral pathway and clearly distinguish foreign 911 instructions. Add local confidential-records and scope exercises beyond the video.
6. **Module 6:** Reaffirm that 5 A's overlap applies to **counselling steps**, not to paediatric obesity treatment advice for adult clients.
7. **Module 9:** Add an authorised WRHA referral-form or documentation practice activity separately, ideally with fictional records.
8. Do not upload or copy videos. Keep official YouTube embeds and original publisher credit; allow completion without watching.

## Implementation details
- `video-library.js`: one object each for Modules 1–9, unique `videoId`, rich observation/reflection and local scenarios.
- `app.js`: displays just that module's video with an optional before/watch/reflect/apply activity.
- `videos.css`: presentation with 16:9 player and legible prompts.
- `.github/workflows/build-scorm.yml`: validates nine one-to-one module IDs and distinct YouTube IDs.
- **No modifications** to certificates, questions, progression, clinical guideline PDFs or WRHA branding.

**Conclusion:** This is a stronger, nonrepeating, source-grounded selection than the previous eight-video cross-mapped collection. It is ready for **prototype review**, not yet final clinical endorsement or verified Moodle playback.
