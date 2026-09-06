# Uncomplicated hemorrhoids without heavy bleeding or infection concern V1 Review Packet

Phenotype ID: `hemorrhoids_uncomplicated_no_heavy_bleeding`

Clinical status: reviewed_for_limited_uncomplicated_hemorrhoids_without_heavy_bleeding_or_infection_concern_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-10.

## Inclusion Criteria

- Adult with clinician diagnosis or discharge impression of hemorrhoids.
- No heavy bleeding, unstable vital signs, infection concern, severe abdominal pain, or alternate GI bleeding pathway.
- Medication and procedural instructions are clinician-entered.

## Exclusions

- Heavy bleeding, anticoagulation with bleeding, syncope, unstable vital signs, anemia concern, or bleeding disorder.
- Severe anal pain with fever, abdominal pain, diarrhea, spreading perianal redness, or abscess concern.
- Thrombosed hemorrhoid, irreducible prolapse, rectal mass, malignancy concern, inflammatory bowel disease concern, or new rectal bleeding requiring separate workup.
- Pregnancy, immunocompromise, or poor follow-up.

## Must-Not-Miss Diagnoses

- Lower GI bleeding.
- Perianal or perirectal abscess.
- Fournier gangrene.
- Thrombosed or strangulated hemorrhoid.
- Colorectal malignancy.
- Inflammatory bowel disease.

## Source Audit

- `medlineplus.hemorrhoids` supports this phenotype's reviewed concepts.
- `niddk.hemorrhoids_treatment` supports this phenotype's reviewed concepts.
- MedlinePlus and NIDDK support hemorrhoid self-care with fiber, fluids, warm baths, gentle local care, and clinician-recommended medicines. NIDDK supports urgent care for severe anal pain with rectal bleeding, especially with abdominal pain, diarrhea, or fever. Clinician-owner review on 2026-06-10 approved this narrow v1 with the current blockers for heavy bleeding, thrombosis/prolapse, anticoagulation, malignancy/IBD concern, pregnancy, and abdominal pain.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `hemorrhoid_heavy_bleeding`
- `anticoagulated`
- `bleeding_disorder`
- `anemia_concern`
- `syncope`
- `unstable_vitals`
- `gi_bleeding`
- `severe_or_focal_abdominal_pain`
- `fever`
- `perianal_sepsis_or_abscess_concern`
- `hemorrhoid_thrombosis_or_irreducible_prolapse`
- `cancer_red_flag`
- `inflammatory_bowel_disease_concern`
- `pregnancy`
- `immunocompromised`
- `poor_follow_up`

## Primitive List

- `hemorrhoids_uncomplicated_no_heavy_bleeding.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `hemorrhoids_uncomplicated_no_heavy_bleeding.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `hemorrhoids_uncomplicated_no_heavy_bleeding.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `hemorrhoids_uncomplicated_no_heavy_bleeding.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `hemorrhoids_uncomplicated_no_heavy_bleeding.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `hemorrhoids_uncomplicated_no_heavy_bleeding.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `hemorrhoids_uncomplicated_no_heavy_bleeding.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `hemorrhoids_uncomplicated_no_heavy_bleeding.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `hemorrhoids_uncomplicated_no_heavy_bleeding.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `hemorrhoids_uncomplicated_no_heavy_bleeding.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `hemorrhoids_uncomplicated_no_heavy_bleeding.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
You were treated for hemorrhoids.

WHAT WE FOUND:
Your clinician found hemorrhoids and did not find signs of heavy bleeding, infection, or another emergency cause today.

WHAT TO DO AT HOME:
- Avoid straining on the toilet.
- Drink fluids and add fiber as tolerated to keep stool soft.
- Warm sitz baths may help discomfort.

MEDICATIONS:
- Use hemorrhoid creams, suppositories, stool softeners, or pain medicine only as prescribed or recommended by your clinician.
- Do not use extra laxatives or rectal medicines unless your clinician told you to.

RETURN TO ED IF:
- Heavy rectal bleeding, dizziness, fainting, or weakness.
- Severe or worsening anal pain, fever, spreading redness, pus, or foul odor.
- Belly pain with rectal bleeding, black stool, or blood mixed throughout the stool.

FOLLOW UP:
Follow up with primary care, gastroenterology, or surgery as instructed, especially if symptoms do not improve.
```
