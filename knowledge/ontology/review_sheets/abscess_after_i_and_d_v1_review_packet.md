# Abscess after incision and drainage V1 Review Packet

Phenotype ID: `abscess_after_i_and_d`

Clinical status: reviewed_for_limited_abscess_after_ed_drainage_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-01.

## Inclusion Criteria

- Abscess drained in the ED and patient discharged.
- No deep-space infection or sepsis concern.

## Exclusions

- Deep hand, face, neck, breast, genital, or perirectal abscess pathway.
- Sepsis or immunocompromised host needing separate planning.

## Must-Not-Miss Diagnoses

- Necrotizing infection.
- Deep-space infection.
- Sepsis.
- Retained foreign body.

## Source Audit

- `medlineplus.skin_abscess` supports this phenotype's reviewed concepts.
- MedlinePlus supports skin abscess symptoms, pus drainage, fever or chills, and need to seek care for new symptoms after treatment.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `deep_space_location`
- `immunocompromised`
- `packing_required`
- `recurrent_abscess`
- `sepsis`
- `necrotizing_infection_concern`

## Primitive List

- `abscess_after_i_and_d.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `abscess_after_i_and_d.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `abscess_after_i_and_d.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `abscess_after_i_and_d.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `abscess_after_i_and_d.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `abscess_after_i_and_d.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `abscess_after_i_and_d.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `abscess_after_i_and_d.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `abscess_after_i_and_d.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `abscess_after_i_and_d.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `abscess_after_i_and_d.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
You had an abscess drained today.

WHAT WE FOUND:
The painful swollen area had pus inside. It was opened and drained, which is the main treatment.

WHAT TO DO AT HOME:
- Keep the dressing clean and dry.
- Wash your hands before and after wound care.
- Do not squeeze or dig into the wound.

MEDICATIONS:
- Take antibiotics only if they were prescribed.
- Use acetaminophen or ibuprofen only if you can take it safely and follow the label.

RETURN TO ED IF:
- Fever, spreading redness, red streaks, or worsening swelling.
- Severe pain, numbness, or bleeding that will not stop.
- Packing falls out early and you were told it must stay in.

FOLLOW UP:
Return or follow up for wound check as instructed.
```
