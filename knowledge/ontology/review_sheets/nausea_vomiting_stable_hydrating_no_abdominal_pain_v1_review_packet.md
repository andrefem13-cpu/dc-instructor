# Nausea and vomiting, stable and hydrating, without abdominal pain V1 Review Packet

Phenotype ID: `nausea_vomiting_stable_hydrating_no_abdominal_pain`

Clinical status: reviewed_for_limited_stable_nausea_vomiting_without_abdominal_pain_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-10.

## Inclusion Criteria

- Adult with clinician diagnosis or discharge impression of nausea and vomiting.
- Stable vitals and tolerating oral fluids documented before discharge.
- No abdominal pain, surgical abdomen concern, GI bleeding, pregnancy, neurologic, toxicologic, or high-risk host pathway.

## Exclusions

- Any abdominal pain, focal tenderness, peritoneal signs, abdominal distention, bowel obstruction concern, GI bleeding, fever, sepsis, or unstable vital signs.
- Unable to tolerate oral fluids, failed PO challenge, severe dehydration, syncope, renal failure, or uncontrolled vomiting at discharge.
- Pregnancy, head injury, severe headache, neurologic deficit, chest pain, toxic ingestion, diabetic emergency, immunocompromise, frailty, or unreliable follow-up.

## Must-Not-Miss Diagnoses

- Bowel obstruction.
- Appendicitis or other surgical abdomen.
- GI bleeding.
- Pregnancy-related emergency.
- Intracranial process.
- Toxic ingestion or metabolic emergency.
- Sepsis or severe dehydration.

## Source Audit

- `medlineplus.nausea_vomiting_self_care` supports this phenotype's reviewed concepts.
- MedlinePlus supports nausea/vomiting supportive care, hydration, gradual return to food, and escalation for inability to keep fluids down, dehydration, abdominal pain, fever, blood, or prolonged symptoms. Autonomous Phase 1002-1500 approved this narrow v1 only for clinician-diagnosed nausea/vomiting with stable vitals, successful oral hydration, no abdominal pain, no diarrhea/gastroenteritis phenotype, and no surgical, pregnancy, neurologic, toxicologic, or high-risk host pathway.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `severe_or_focal_abdominal_pain`
- `peritoneal_signs`
- `abdominal_distention`
- `bowel_obstruction_or_ileus_concern`
- `gi_bleeding`
- `fever`
- `sepsis`
- `unstable_vitals`
- `unable_to_tolerate_oral_fluids`
- `severe_dehydration`
- `uncontrolled_vomiting`
- `pregnancy`
- `neurologic_deficit`
- `thunderclap_or_sah_concern`
- `chest_pain`
- `toxic_ingestion_or_overdose`
- `diabetic_emergency`
- `immunocompromised`
- `elderly_frail`
- `poor_follow_up`

## Primitive List

- `nausea_vomiting_stable_hydrating_no_abdominal_pain.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `nausea_vomiting_stable_hydrating_no_abdominal_pain.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `nausea_vomiting_stable_hydrating_no_abdominal_pain.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `nausea_vomiting_stable_hydrating_no_abdominal_pain.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `nausea_vomiting_stable_hydrating_no_abdominal_pain.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `nausea_vomiting_stable_hydrating_no_abdominal_pain.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `nausea_vomiting_stable_hydrating_no_abdominal_pain.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `nausea_vomiting_stable_hydrating_no_abdominal_pain.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `nausea_vomiting_stable_hydrating_no_abdominal_pain.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `nausea_vomiting_stable_hydrating_no_abdominal_pain.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `nausea_vomiting_stable_hydrating_no_abdominal_pain.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
Your clinician treated you for nausea and vomiting.

WHAT WE FOUND:
You were stable enough to go home today. You were able to keep fluids down, and your exam did not show belly pain or an emergency cause that needs a different plan.

WHAT TO DO AT HOME:
- Take small sips of fluid often.
- Start with bland foods when you feel ready.
- Avoid alcohol, heavy meals, and dehydration triggers while you are recovering.

MEDICATIONS:
- Take nausea medicine only as prescribed or recommended by your clinician.
- Do not take extra doses to force yourself to eat or drink.

RETURN TO ED IF:
- You cannot keep fluids down, you faint, you stop urinating normally, or you feel very weak or confused.
- New or worsening belly pain, swollen belly, fever, bloody vomit, black stool, or blood in stool.
- Severe headache, new weakness, chest pain, pregnancy concern, or symptoms that are getting worse.

FOLLOW UP:
Follow up with primary care or return for recheck as instructed if symptoms are not improving.
```
