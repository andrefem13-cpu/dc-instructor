# Acute bronchitis or chest cold without pneumonia concern V1 Review Packet

Phenotype ID: `acute_bronchitis_no_pneumonia`

Clinical status: reviewed_for_limited_acute_bronchitis_without_pneumonia_concern_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-01.

## Inclusion Criteria

- Adult with cough or chest cold symptoms.
- Clinician diagnosis or discharge impression is acute bronchitis, chest cold, or viral bronchitis.
- No pneumonia diagnosis or focal pneumonia concern documented at discharge.
- Oxygenation and work of breathing acceptable for discharge.
- No unstable vital signs, sepsis concern, or admission need.

## Exclusions

- Hypoxia, respiratory distress, unstable vital signs, sepsis concern, or admission need.
- Pneumonia diagnosis, infiltrate, consolidation, focal lung findings, or unresolved focal pneumonia concern.
- COPD or asthma exacerbation requiring a disease-specific pathway.
- Immunocompromised or frail elderly patient requiring individualized planning.
- Hemoptysis or chest pain concerning for cardiac disease or pulmonary embolism.
- Antibiotics prescribed for suspected bacterial infection.

## Must-Not-Miss Diagnoses

- Pneumonia.
- Hypoxic respiratory failure.
- Asthma or COPD exacerbation.
- Pulmonary embolism.
- Acute coronary syndrome.
- Sepsis.

## Source Audit

- `cdc.acute_bronchitis` supports this phenotype's reviewed concepts.
- `medlineplus.acute_bronchitis` supports this phenotype's reviewed concepts.
- `cdc.antibiotic_use_adult_outpatient` supports this phenotype's reviewed concepts.
- CDC and MedlinePlus support acute bronchitis and chest cold framing, viral predominance, supportive care, and escalation for worsening breathing symptoms. CDC outpatient guidance supports keeping pneumonia concern, abnormal vital signs, and focal lung findings outside uncomplicated bronchitis.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `hypoxia`
- `respiratory_distress`
- `pneumonia`
- `focal_lung_findings_or_infiltrate`
- `copd_or_asthma_exacerbation_pathway`
- `immunocompromised`
- `elderly_frail`
- `hemoptysis`
- `cardiac_or_pe_chest_pain_concern`
- `sepsis`
- `unstable_vitals`
- `antibiotic_prescribed_for_suspected_bacterial_infection`

## Prior Clinician Decisions Preserved

- Approve only as a narrow acute bronchitis or chest cold phenotype without pneumonia concern.
- Do not use broad cough as a standalone runtime term.
- Do not use acute bronchitis as a catch-all respiratory fallback.
- Do not infer antibiotic instructions. Medication text is limited to stewardship framing and clinician-entered medicine instructions.
- Runtime must block pneumonia concern, hypoxia, respiratory distress, COPD or asthma pathway, frailty, immunocompromise, hemoptysis, PE or cardiac chest-pain concern, sepsis, unstable vitals, and antibiotics prescribed for suspected bacterial infection.

## Primitive List

- `acute_bronchitis_no_pneumonia.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `acute_bronchitis_no_pneumonia.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `acute_bronchitis_no_pneumonia.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `acute_bronchitis_no_pneumonia.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `acute_bronchitis_no_pneumonia.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `acute_bronchitis_no_pneumonia.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `acute_bronchitis_no_pneumonia.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `acute_bronchitis_no_pneumonia.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `acute_bronchitis_no_pneumonia.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `acute_bronchitis_no_pneumonia.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `acute_bronchitis_no_pneumonia.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
Your symptoms fit acute bronchitis, also called a chest cold.

WHAT WE FOUND:
Your ED evaluation did not show a pneumonia concern that needed a separate treatment plan today.

WHAT TO DO AT HOME:
- Rest as needed and increase activity slowly as breathing feels comfortable.
- Drink fluids if you are allowed to and use warm liquids or humidified air if they ease cough.
- Avoid smoke and strong fumes while your airways are irritated.

MEDICATIONS:
- Antibiotics do not help most acute bronchitis cases unless your clinician found a bacterial infection.
- Use only the medicines your clinician prescribed or said are safe for you.

RETURN TO ED IF:
- Trouble breathing, shortness of breath at rest, blue lips, confusion, fainting, or severe weakness.
- Chest pain concerning for the heart or blood clot, coughing blood, or symptoms that feel much worse.
- Fever, worsening cough, or new pneumonia concern after discharge.

FOLLOW UP:
Follow up with primary care as instructed, especially if symptoms are not improving or you have higher-risk lung or immune problems.
```
