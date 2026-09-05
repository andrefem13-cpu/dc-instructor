# Minor head injury without red flags V1 Review Packet

Phenotype ID: `minor_head_injury_no_red_flags`

Clinical status: reviewed_for_limited_minor_head_injury_without_red_flags_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-01.

## Inclusion Criteria

- Minor blunt head injury judged safe for discharge.
- No anticoagulation or high-risk features requiring separate pathway.

## Exclusions

- Anticoagulated patient.
- Persistent altered mental status.
- Suspected skull fracture.
- Non-accidental trauma concern.

## Must-Not-Miss Diagnoses

- Intracranial hemorrhage.
- Cervical spine injury.
- Skull fracture.
- Non-accidental trauma.

## Source Audit

- `cdc.heads_up_concussion_symptoms` supports this phenotype's reviewed concepts.
- `cdc.mild_tbi_aftercare` supports this phenotype's reviewed concepts.
- CDC concussion guidance supports delayed symptoms, emergency danger signs, and gradual activity return after minor head trauma or possible concussion.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `anticoagulated`
- `loss_of_consciousness`
- `intoxication`
- `elderly`
- `persistent_vomiting`
- `neurologic_deficit`
- `skull_fracture_concern`

## Primitive List

- `minor_head_injury_no_red_flags.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `minor_head_injury_no_red_flags.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `minor_head_injury_no_red_flags.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `minor_head_injury_no_red_flags.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `minor_head_injury_no_red_flags.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `minor_head_injury_no_red_flags.home_care.home_care_4.v1` | `home_care` | audit: source_supported
- `minor_head_injury_no_red_flags.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `minor_head_injury_no_red_flags.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `minor_head_injury_no_red_flags.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `minor_head_injury_no_red_flags.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `minor_head_injury_no_red_flags.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `minor_head_injury_no_red_flags.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
You had a minor head injury.

WHAT WE FOUND:
Your exam was reassuring today. We did not find signs that you needed emergency treatment for bleeding around the brain.

WHAT TO DO AT HOME:
- Rest today and increase activity slowly.
- Avoid alcohol or sedating drugs unless your clinician says they are safe.
- Have a trusted person check on you if possible.
- Limit screens, loud environments, and strenuous activity if they worsen symptoms.

MEDICATIONS:
- Use acetaminophen for headache if you can take it safely and follow the label.
- Avoid medicines your clinician told you to avoid.

RETURN TO ED IF:
- Worsening severe headache, repeated vomiting, confusion, seizure, fainting, or trouble waking up.
- New weakness, numbness, trouble speaking, or vision changes.
- Clear fluid or blood from the nose or ear.

FOLLOW UP:
Follow up with primary care if symptoms are not improving or if you were told to recheck.
```
