# WRHA NCD Adherence Academy — Moodle course blueprint
**Prototype version:** v0.3 · **11 November 2026**
**Status:** Proposed learning design for WRHA approval. Not yet deployed to the institution's Moodle.

## Design decision: a self-paced course
The academy is now designed as **nine independent online learning activities in a clear linear pathway**, rather than a website organised around the original delivery dates. Learners can sign in, resume from their next unfinished lesson, complete a short knowledge check, and see activity-completion indicators. The proposed practical workshop remains part of **formal competency assessment**, not a reason to make Modules 4–7 unavailable online.

This changes the proposed delivery format from Dr. Johnson-Campbell's 10 November 2026 email. **WRHA must approve the revised approach before deployment.**

## What a learner should see in WRHA Moodle
Use the built-in **Custom sections** course format (called Topics on older Moodle versions), with one section displayed per page if the administrator wishes. Moodle provides the actual learner accounts, enrolment, activity completion and restrictions. A refined SCORM activity runs within each section.

### Section 0 — Welcome and orientation
- Course title: *Adherence Counselling for Non-Communicable Diseases: Equipping Community Health Aides to Support Better Health Outcomes*
- Welcome, learning outcomes, instructional expectations, CHA scope-of-practice and patient privacy statement
- A short introductory Moodle Page or Book
- Baseline knowledge **pre-test** (Moodle Quiz, for assessment of prior knowledge; not used to deny entry)
- PDF links to authorised CHA Participant Manual and downloadable public MOHW guidelines

### Section 1 — Understanding NCD care
- Module 1: Understanding NCDs
- Module 2: What Is Adherence?
- Module 3: Why People Don't Adhere?
- Each as a separate interactive SCORM 1.2 activity when production packaging is ready
- Completion restriction: open the next activity after the current one returns `completed`

### Section 2 — Counselling with confidence
- Module 4: Communication Skills
- Module 5: Motivational Interviewing
- Module 6: The 5 A's and Adherence Assessment
- Module 7: Scope, Confidentiality and Danger Signs
- **All are available for online self-study as their predecessors are completed**
- In-person role play and observed competency sit alongside the online curriculum as a separate attendance/assessment activity; exact scheduling remains under WRHA

### Section 3 — Supporting continuity of care
- Module 8: Supporting Self-Management at Home
- Module 9: Referral, Documentation and Follow-Up
- Complete the modules online after the preceding units

### Section 4 — Assessment and recognition
- Formal **post-test**: Moodle Quiz, secure question bank, pass standard and retake rules approved by training team
- **Practical competency**: Moodle Assignment or manual grade item, scored by authorised facilitator against the approved 40-point checklist
- Required workshop participation/attendance, if approved
- **Certificate**: Moodle Custom Certificate plugin, if installed and approved; otherwise an authorised institutional certificate method
- Moodle **Restrict access** / **Activity completion**: certificate appears only after all required activity-completion, formal quiz grade, practical competency grade and attendance conditions are satisfied

## The code currently available
The GitHub prototype includes an interactive self-paced course home, course index, three units, nine lessons, scenario checks, progress indicators, a resume button, knowledge-practice review and certificate preview. It has a **single SCO / single activity SCORM 1.2 manifest**, which is sufficient for testing its internal navigation and course completion, **not equivalent to nine separately graded Moodle activities**.

For real native Moodle delivery, a follow-up packaging task will produce separate SCORM packages for the modules or other units, then map them to Moodle's activity completion and restriction settings. **Do not claim that the current GitHub prototype is already a deployed Moodle course.**

## Required technical checks
1. Confirm Moodle version, enabled SCORM activity, upload limit, mobile/browser behaviour and SCORM appearance.
2. Confirm course format: Custom sections (Topics on older versions). Use course index where supported.
3. Confirm editing rights, Moodle completion tracking, restrict access, course completion and assessment gradebook permissions.
4. Confirm certificate issuance method and approved signatories.
5. Upload the prototype SCORM to a sandbox course, test completion and resume, then test individual-module package architecture before launch.
6. Verify browser practice answers do **not** appear as formal exam scores in the Moodle gradebook.
7. Use separate logins to verify no training progress is inherited from another learner using the same browser.
8. Confirm safe fallback for inaccessible public PDF references when learners have restricted internet access.

## Academic and clinical sign-off
The supplied materials contain nine modules and the observed counselling skills checklist; the curriculum and revised self-paced structure need review by the WRHA clinical training team. The team's provisional 30/40 practical pass suggestion is not a signed-off certification standard. Emergency referral algorithms, medication advice, CHA scope, approved Ministry editions and documentation workflows need specific clinical sign-off.

## Production change control
- Keep formal examination questions and facilitator keys in the authorised Moodle question bank, not public GitHub.
- Keep actual learner information and marks within Moodle only.
- Official certificates must be server-side verified; the browser certificate remains marked SAMPLE.
- Do not quietly impose the previous December/January release dates once the course is approved for self-study. WRHA controls enrolment and course availability.
