# Community-acquired pneumonia, outpatient V1 Review Packet

Phenotype ID: `community_acquired_pneumonia_outpatient`

Clinical status: reviewed_for_limited_outpatient_community_acquired_pneumonia_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-01.

## Inclusion Criteria

- Pneumonia judged stable for outpatient treatment.
- No hypoxia, sepsis, or admission need at discharge.

## Exclusions

- Hypoxia.
- Sepsis.
- Immunocompromised host.
- High-risk comorbidity or unreliable outpatient plan.

## Must-Not-Miss Diagnoses

- Sepsis.
- Pulmonary embolism mimic.
- Heart failure mimic.
- Empyema.
- Hypoxic respiratory failure.

## Source Audit

- `cdc.pneumonia_about` supports this phenotype's reviewed concepts.
- `cdc.antibiotic_use_adult_outpatient` supports this phenotype's reviewed concepts.
- CDC supports pneumonia symptom framing, higher-risk host factors, and outpatient antibiotic-stewardship distinctions. Dosing and regimen selection remain outside the ontology until medication policy exists.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `hypoxia`
- `immunocompromised`
- `elderly_frail`
- `sepsis`
- `poor_follow_up`
- `respiratory_distress`
- `vomiting_unable_to_take_meds`

## Primitive List

- `community_acquired_pneumonia_outpatient.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `community_acquired_pneumonia_outpatient.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `community_acquired_pneumonia_outpatient.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `community_acquired_pneumonia_outpatient.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `community_acquired_pneumonia_outpatient.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `community_acquired_pneumonia_outpatient.home_care.home_care_4.v1` | `home_care` | audit: source_supported
- `community_acquired_pneumonia_outpatient.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `community_acquired_pneumonia_outpatient.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `community_acquired_pneumonia_outpatient.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `community_acquired_pneumonia_outpatient.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `community_acquired_pneumonia_outpatient.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `community_acquired_pneumonia_outpatient.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
You were treated for pneumonia.

WHAT WE FOUND:
Your ED evaluation found a lung infection that was safe to treat at home today. Your oxygen level and overall condition were reassuring enough for discharge.

WHAT TO DO AT HOME:
- Rest and increase activity slowly.
- Drink fluids if you are allowed.
- Use warm liquids or steam if they help cough or mucus.
- Avoid smoking and smoke exposure.

MEDICATIONS:
- Take antibiotics exactly as prescribed.
- Use fever or pain medicine only if you can take it safely and follow the label.

RETURN TO ED IF:
- Worse trouble breathing, blue lips, confusion, fainting, or chest pain.
- Fever or symptoms worsen after starting treatment.
- You cannot keep medicines or fluids down.

FOLLOW UP:
Follow up with primary care as instructed.
```
