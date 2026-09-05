# Uncomplicated cystitis in a nonpregnant patient V1 Review Packet

Phenotype ID: `uncomplicated_cystitis_nonpregnant`

Clinical status: reviewed_for_limited_nonpregnant_uncomplicated_cystitis_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-01.

## Inclusion Criteria

- Lower urinary tract symptoms are most consistent with bladder infection, such as burning with urination, frequency, urgency, or suprapubic discomfort.
- Patient is not pregnant.
- No fever, flank pain, vomiting, sepsis concern, or clinician concern for kidney infection.
- Patient can take oral medicines and maintain hydration.
- No urologic procedure, catheter-associated infection, or complicated UTI pathway is needed at discharge.

## Exclusions

- Pregnancy.
- Male patient or patient requiring sex-specific complicated UTI pathway.
- Fever, flank pain, rigors, vomiting, or concern for pyelonephritis.
- Sepsis, immunocompromise, kidney transplant, urinary obstruction, or indwelling catheter.
- Pelvic inflammatory disease, sexually transmitted infection, kidney stone, or abdominal emergency concern.

## Must-Not-Miss Diagnoses

- Pyelonephritis.
- Sepsis.
- Pregnancy-related UTI risk.
- Obstructing infected stone.
- Pelvic infection or STI when symptoms suggest it.

## Source Audit

- `cdc.uti_basics` supports this phenotype's reviewed concepts.
- `medlineplus.uti_self_care` supports this phenotype's reviewed concepts.
- CDC and MedlinePlus support UTI framing, antibiotic treatment when clinically indicated, hydration, and pyelonephritis or sepsis return precautions.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `pregnancy`
- `male_patient`
- `pyelonephritis`
- `fever`
- `flank_pain`
- `sepsis`
- `vomiting_unable_to_take_meds`
- `complicated_uti`
- `kidney_transplant`
- `urinary_obstruction`
- `indwelling_catheter`
- `no_antibiotic_prescribed`

## Primitive List

- `cystitis.diagnosis.uncomplicated.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `cystitis.what_we_found.no_kidney_infection.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `cystitis.home_care.fluids_irritants.v1` | `home_care` | audit: source_supported, unsafe_without_modifier
- `cystitis.home_care.culture_callback.v1` | `home_care` | audit: source_supported, unsafe_without_modifier
- `cystitis.medications.antibiotics_complete.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `cystitis.medications.symptom_medicine_caution.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `cystitis.return_precautions.pyelo_sepsis.v1` | `return_precautions` | audit: source_supported
- `cystitis.return_precautions.not_improving.v1` | `return_precautions` | audit: source_supported, unsafe_without_modifier
- `cystitis.follow_up.recheck.v1` | `follow_up` | audit: source_supported, clinician_judgment_only
- `uncomplicated_cystitis_nonpregnant.resources.source_link_1.v1` | `resources` | audit: source_supported
- `uncomplicated_cystitis_nonpregnant.resources.source_link_2.v1` | `resources` | audit: source_supported
- `uncomplicated_cystitis_nonpregnant.resources.followup_reminder.v1` | `resources` | audit: source_supported

## Patient-Facing Output

```text
DIAGNOSIS:
You have a bladder infection, also called an uncomplicated UTI.

WHAT WE FOUND:
Today we did not find signs of a kidney infection, sepsis, or another emergency cause of your symptoms.

WHAT TO DO AT HOME:
- Drink fluids if you are allowed to. Avoid alcohol or drinks that worsen burning until symptoms improve.
- If a urine culture was sent, the hospital may contact you if the antibiotic needs to be changed.

MEDICATIONS:
- Take the antibiotic exactly as prescribed. Finish the course unless a doctor or pharmacist tells you to stop.
- If you were prescribed medicine for urinary burning, use it only as directed. It may turn your urine bright orange.

RETURN TO ED IF:
- Get checked again if burning or urgency is not starting to improve after 2 days of antibiotics, or if symptoms worsen.
- Come back to the emergency department right away for fever, chills, back or side pain, vomiting, weakness, confusion, or feeling very sick.

FOLLOW UP:
Call your primary care doctor's office or clinic. Say, "I was in the emergency department and was diagnosed with a urinary tract infection. I need a follow-up visit within 1 week, or sooner if symptoms are not improving."

RESOURCES:
- Bring these instructions to your follow-up visit.
- Learn more: CDC - Urinary Tract Infection Basics (https://www.cdc.gov/uti/about/index.html).
- Learn more: MedlinePlus - Urinary tract infection in women - self-care (https://medlineplus.gov/ency/patientinstructions/000391.htm).
```
