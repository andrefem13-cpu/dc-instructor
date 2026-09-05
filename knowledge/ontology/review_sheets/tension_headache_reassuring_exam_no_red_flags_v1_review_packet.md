# Tension-type headache with reassuring exam and no red flags V1 Review Packet

Phenotype ID: `tension_headache_reassuring_exam_no_red_flags`

Clinical status: reviewed_for_limited_tension_type_headache_with_reassuring_exam_no_red_flags_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-10.

## Inclusion Criteria

- Adult with clinician diagnosis or discharge impression of tension-type headache.
- Reassuring neurologic exam and structured red-flag absence documented.
- No trauma, thunderclap, neurologic deficit, infection, pregnancy, anticoagulation, new age-over-50 pattern, first-lifetime severe headache, or specialist-directed neurology plan.

## Exclusions

- Thunderclap headache, worst headache of life, first-lifetime severe headache, neurologic deficit, altered mental status, seizure, syncope, or vision loss.
- Fever, stiff neck, meningitis concern, immunocompromise, pregnancy/postpartum, head trauma, anticoagulation, age over 50 with new headache pattern, or uncontrolled vomiting.
- Migraine-specific discharge pathway, CT deferred despite documented concern, or specialist-directed neurology plan.

## Must-Not-Miss Diagnoses

- Subarachnoid hemorrhage.
- Stroke or TIA.
- Meningitis or encephalitis.
- Intracranial mass or elevated intracranial pressure.
- Cerebral venous thrombosis.
- Pre-eclampsia in pregnancy.

## Source Audit

- `ninds.headache` supports this phenotype's reviewed concepts.
- NINDS headache education supports primary versus secondary headache framing and warning-sign concepts. Autonomous Phase 1002-1500 approved this narrow v1 only for clinician-diagnosed tension-type headache with reassuring exam, documented red-flag review, symptom improvement or stable discharge, and no trauma, thunderclap, neurologic, infectious, pregnancy, anticoagulation, first-lifetime severe, age-over-50-new-pattern, or specialist-directed neurology pathway.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `thunderclap_or_sah_concern`
- `first_lifetime_severe_headache`
- `neurologic_deficit`
- `altered_mental_status_not_resolved`
- `meningitis_or_cns_infection_concern`
- `fracture_or_trauma_concern`
- `pregnancy`
- `postpartum`
- `immunocompromised`
- `age_over_50_new_headache`
- `uncontrolled_vomiting`
- `anticoagulated`
- `vision_change`
- `ct_not_performed_with_headache_concern`
- `specialist_directed_neurology_plan`
- `unstable_vitals`

## Primitive List

- `tension_headache_reassuring_exam_no_red_flags.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `tension_headache_reassuring_exam_no_red_flags.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `tension_headache_reassuring_exam_no_red_flags.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `tension_headache_reassuring_exam_no_red_flags.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `tension_headache_reassuring_exam_no_red_flags.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `tension_headache_reassuring_exam_no_red_flags.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `tension_headache_reassuring_exam_no_red_flags.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `tension_headache_reassuring_exam_no_red_flags.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `tension_headache_reassuring_exam_no_red_flags.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `tension_headache_reassuring_exam_no_red_flags.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `tension_headache_reassuring_exam_no_red_flags.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
Your clinician diagnosed a tension-type headache.

WHAT WE FOUND:
Your exam was reassuring today. We did not find warning signs of stroke, bleeding, infection, head injury, or another dangerous headache cause.

WHAT TO DO AT HOME:
- Rest in a quiet place if symptoms return.
- Drink fluids if you can.
- Avoid triggers you already know make your headaches worse.

MEDICATIONS:
- Use only the headache medicines your clinician prescribed or said are safe for you.
- Do not take extra doses or mix medicines unless your clinician told you to.

RETURN TO ED IF:
- A sudden severe headache, worst headache of your life, fainting, seizure, confusion, or trouble staying awake.
- New weakness, numbness, trouble speaking, vision loss, trouble walking, fever, stiff neck, or rash.
- Headache after injury, headache that is much worse or different than usual, or vomiting that will not stop.

FOLLOW UP:
Follow up with primary care as instructed, especially if headaches are new, changing, frequent, or not improving.
```
