# Stable adult influenza-like illness with supportive-care discharge plan V1 Review Packet

Phenotype ID: `influenza_like_illness_stable_supportive_care`

Clinical status: reviewed_for_limited_stable_adult_influenza_like_illness_supportive_care_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-10.

## Inclusion Criteria

- Adult with clinician diagnosis or discharge impression of influenza-like illness or flu.
- Breathing, oxygen level, hydration, and vital signs acceptable for discharge.
- No high-risk influenza host pathway, pregnancy pathway, pneumonia concern, or clinician-entered antiviral plan requiring tailored medication instructions.

## Exclusions

- Pregnancy or recent postpartum status.
- High-risk host for influenza complications, including older age, chronic lung or heart disease, diabetes, renal or liver disease, immunocompromise, long-term care residence, or severe obesity.
- Trouble breathing, unresolved dyspnea, hypoxia, chest pain, pneumonia concern, dehydration, inability to tolerate fluids, sepsis concern, or unstable vital signs.
- Antiviral prescribed or clearly indicated, because medication-specific counseling must be clinician-entered.

## Must-Not-Miss Diagnoses

- Pneumonia.
- Hypoxic respiratory failure.
- Myocarditis or acute coronary syndrome when chest pain is present.
- Pulmonary embolism.
- Sepsis.
- Pregnancy-related influenza risk.

## Source Audit

- `medlineplus.flu` supports this phenotype's reviewed concepts.
- `cdc.flu_taking_care` supports this phenotype's reviewed concepts.
- `cdc.flu_treatment` supports this phenotype's reviewed concepts.
- CDC and MedlinePlus support flu symptom framing, home supportive care for mild illness, staying home while ill, emergency warning signs, high-risk host escalation, and antiviral treatment concepts. Clinician-owner review on 2026-06-10 approved this narrow v1 with high-risk hosts and antiviral cases remaining hard blockers, not output modifiers.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `pregnancy`
- `postpartum`
- `high_risk_influenza_host`
- `immunocompromised`
- `elderly_frail`
- `hypoxia`
- `respiratory_distress`
- `resolved_dyspnea_not_documented`
- `chest_pain`
- `pneumonia`
- `severe_dehydration`
- `unable_to_tolerate_oral_fluids`
- `sepsis`
- `unstable_vitals`
- `antiviral_prescribed_or_indicated`

## Primitive List

- `influenza_like_illness_stable_supportive_care.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `influenza_like_illness_stable_supportive_care.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `influenza_like_illness_stable_supportive_care.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `influenza_like_illness_stable_supportive_care.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `influenza_like_illness_stable_supportive_care.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `influenza_like_illness_stable_supportive_care.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `influenza_like_illness_stable_supportive_care.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `influenza_like_illness_stable_supportive_care.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `influenza_like_illness_stable_supportive_care.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `influenza_like_illness_stable_supportive_care.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `influenza_like_illness_stable_supportive_care.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
You were treated for flu-like illness.

WHAT WE FOUND:
Your symptoms fit a flu-like viral illness. Your breathing and hydration were reassuring enough for home care today.

WHAT TO DO AT HOME:
- Rest and drink fluids as tolerated.
- Stay home and avoid close contact with others while you are most contagious, as your clinician instructed.
- Wash your hands often and cover coughs to reduce spread.

MEDICATIONS:
- Take fever, pain, cough, or nausea medicines only as prescribed or recommended by your clinician.
- Do not start antibiotics or antiviral medicine unless your clinician prescribed them.

RETURN TO ED IF:
- Trouble breathing, chest pain, blue lips, confusion, fainting, seizure, or severe weakness.
- You cannot keep fluids down, you are not urinating normally, or you feel dehydrated.
- Fever or cough improves and then comes back worse.

FOLLOW UP:
Follow up with primary care or urgent care if symptoms are not improving, or sooner if your clinician gave you a specific recheck plan.
```
