# Viral upper respiratory infection without pneumonia V1 Review Packet

Phenotype ID: `viral_uri_no_pneumonia`

Clinical status: reviewed_for_limited_viral_uri_without_pneumonia_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-01.

## Inclusion Criteria

- Symptoms are most consistent with viral upper respiratory infection, such as cough, congestion, runny nose, sore throat, or low-grade fever.
- No clinical concern for pneumonia at discharge, or chest x-ray did not show pneumonia when obtained.
- Patient is breathing comfortably enough for discharge.
- Oxygen level and vital signs are acceptable for discharge.
- No clinician concern for sepsis, airway emergency, or high-risk cardiopulmonary process.

## Exclusions

- Hypoxia, respiratory distress, or need for oxygen.
- Pneumonia, asthma or COPD exacerbation requiring a disease-specific pathway, heart failure, pulmonary embolism, or acute coronary syndrome concern.
- Severe immunocompromise or transplant status.
- Infant or high-risk pediatric patient requiring pediatric-specific instructions.
- Patient cannot maintain hydration or safe home monitoring.

## Must-Not-Miss Diagnoses

- Pneumonia.
- Asthma or COPD exacerbation.
- Sepsis.
- Myocarditis or acute coronary syndrome when chest pain or dyspnea is prominent.
- Airway compromise.

## Source Audit

- `medlineplus.common_cold` supports this phenotype's reviewed concepts.
- `ahrq.common_cold_antibiotics` supports this phenotype's reviewed concepts.
- MedlinePlus supports viral URI supportive care and escalation symptoms. AHRQ supports antibiotic stewardship for uncomplicated viral URI.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `pneumonia`
- `hypoxia`
- `respiratory_distress`
- `unstable_vitals`
- `immunocompromised`
- `sepsis`
- `chest_pain`
- `antibiotic_prescribed`
- `bacterial_infection_suspected`

## Primitive List

- `viral_uri.diagnosis.no_pneumonia.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `viral_uri.what_we_found.reassuring_breathing.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `viral_uri.home_care.fluids_rest_humidification.v1` | `home_care` | audit: source_supported, unsafe_without_modifier
- `viral_uri.home_care.infection_control.v1` | `home_care` | audit: source_supported
- `viral_uri.medications.no_antibiotics.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `viral_uri.medications.otc_caution.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `viral_uri.return_precautions.breathing_chest_confusion.v1` | `return_precautions` | audit: source_supported
- `viral_uri.return_precautions.worsening_fever_dehydration.v1` | `return_precautions` | audit: source_supported
- `viral_uri.follow_up.primary_care.v1` | `follow_up` | audit: source_supported, clinician_judgment_only
- `viral_uri_no_pneumonia.resources.source_link_1.v1` | `resources` | audit: source_supported
- `viral_uri_no_pneumonia.resources.source_link_2.v1` | `resources` | audit: source_supported
- `viral_uri_no_pneumonia.resources.followup_reminder.v1` | `resources` | audit: source_supported

## Patient-Facing Output

```text
DIAGNOSIS:
You have a viral upper respiratory infection, also called a cold. We did not find signs of pneumonia today.

WHAT WE FOUND:
Your breathing, oxygen level, and exam were reassuring enough for discharge today.

WHAT TO DO AT HOME:
- Drink fluids, rest, and use a humidifier or steam from a shower if it helps your congestion or cough.
- Wash your hands often, cover coughs, and avoid close contact with high-risk people while you have fever or feel very sick.

MEDICATIONS:
- Antibiotics do not treat cold viruses. Based on today's visit, antibiotics were not needed.
- You can use acetaminophen or ibuprofen for fever or aches if these are safe for you. Read labels carefully so you do not take the same medicine twice.

RETURN TO ED IF:
- Come back to the emergency department right away for trouble breathing, chest pain, blue lips, confusion, fainting, or feeling much worse.
- Come back if fever or cough improves and then returns worse, if fever stays high, or if you cannot drink enough fluids.

FOLLOW UP:
Call your primary care doctor's office or clinic. Say, "I was in the emergency department and was diagnosed with a viral upper respiratory infection. I need a follow-up visit within 3-7 days if symptoms are not improving."

RESOURCES:
- Bring these instructions to your follow-up visit.
- Learn more: MedlinePlus - Common Cold (https://medlineplus.gov/commoncold.html).
- Learn more: AHRQ - Upper Respiratory Tract Infection: The Common Cold (https://www.ahrq.gov/sites/default/files/wysiwyg/antibiotic-use/ambulatory-care/respiratory-one-pager.pdf).
```
