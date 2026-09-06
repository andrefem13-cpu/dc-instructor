# Cerumen impaction without infection or foreign body V1 Review Packet

Phenotype ID: `cerumen_impaction_no_infection_or_foreign_body`

Clinical status: reviewed_for_limited_cerumen_impaction_without_infection_or_foreign_body_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-10.

## Inclusion Criteria

- Adult with clinician diagnosis or discharge impression of cerumen impaction or earwax blockage.
- No ear infection, foreign body, trauma, eardrum perforation, ear tube, acute hearing loss, or neurologic ear sign documented.
- Medication or removal plan is clinician-entered.

## Exclusions

- Otitis externa, otitis media, mastoiditis, malignant otitis externa risk, severe systemic illness, or immunocompromised pathway.
- Foreign body, button battery, ear trauma, cotton swab injury, bleeding, perforated eardrum, ear tube, or specialist-directed ENT plan.
- Sudden hearing loss, severe dizziness or vertigo, facial weakness, or other neurologic ear sign.

## Must-Not-Miss Diagnoses

- Sudden sensorineural hearing loss.
- Mastoiditis.
- Malignant otitis externa.
- Tympanic membrane perforation.
- Ear foreign body or button battery.
- Neurologic cause of dizziness or facial weakness.

## Source Audit

- `aao_hns.cerumen_impaction` supports this phenotype's reviewed concepts.
- AAO-HNS patient education supports earwax as usually protective, symptomatic impaction framing, clinician-directed removal options, and avoiding cotton swabs or ear candles. Autonomous Phase 1002-1500 approved this narrow v1 only for clinician-confirmed cerumen impaction without infection, foreign body, perforation, tube, acute hearing loss, neurologic ear signs, or specialist-directed ENT plan.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `otitis_externa_or_ear_canal_pathway`
- `recurrent_or_chronic_ear_infection`
- `mastoiditis_or_deep_ear_infection_concern`
- `malignant_otitis_externa_risk`
- `ear_trauma_or_foreign_body`
- `tympanic_membrane_perforation_or_tube`
- `facial_weakness_or_neurologic_ear_sign`
- `acute_hearing_loss`
- `specialist_directed_ent_plan`
- `immunocompromised`
- `severe_systemic_ear_infection`

## Primitive List

- `cerumen_impaction_no_infection_or_foreign_body.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `cerumen_impaction_no_infection_or_foreign_body.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `cerumen_impaction_no_infection_or_foreign_body.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `cerumen_impaction_no_infection_or_foreign_body.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `cerumen_impaction_no_infection_or_foreign_body.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `cerumen_impaction_no_infection_or_foreign_body.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `cerumen_impaction_no_infection_or_foreign_body.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `cerumen_impaction_no_infection_or_foreign_body.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `cerumen_impaction_no_infection_or_foreign_body.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `cerumen_impaction_no_infection_or_foreign_body.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `cerumen_impaction_no_infection_or_foreign_body.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
Your clinician found earwax blocking your ear canal.

WHAT WE FOUND:
Your exam fit earwax buildup. We did not find signs today of an ear infection, foreign body, or eardrum emergency that needs a different plan.

WHAT TO DO AT HOME:
- Do not put cotton swabs, hair pins, ear candles, or other objects into the ear canal.
- Use ear drops only if your clinician told you they are safe for you.
- Keep water out of the ear if your clinician told you to avoid irrigation or drops.

MEDICATIONS:
- Use only the ear drops your clinician recommended or prescribed.
- Do not use ear drops if you were told you may have a hole in the eardrum or an ear tube.

RETURN TO ED IF:
- New severe ear pain, fever, swelling or redness behind the ear, drainage, or feeling very ill.
- Sudden hearing loss, severe dizziness, facial weakness, or new neurologic symptoms.
- Bleeding from the ear or pain after putting something into the ear.

FOLLOW UP:
Follow up with primary care, urgent care, or ENT as instructed if hearing or fullness does not improve.
```
