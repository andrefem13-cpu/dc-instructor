# Uncomplicated contact dermatitis without systemic or infectious features V1 Review Packet

Phenotype ID: `contact_dermatitis_uncomplicated`

Clinical status: reviewed_for_limited_adult_contact_dermatitis_without_systemic_infectious_or_high_risk_rash_features_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-05.

## Inclusion Criteria

- Adult with clinician diagnosis or discharge impression of contact dermatitis.
- Localized rash pattern tied to a contact exposure or suspected trigger.
- No anaphylaxis, mucosal involvement, skin peeling, infection concern, high-risk location, pregnancy-specific rash pathway, immunocompromised host, or pediatric pathway.

## Exclusions

- Anaphylaxis, angioedema, airway symptoms, hypotension, or systemic allergic reaction needing the allergic reaction pathway.
- Cellulitis, abscess, necrotizing infection concern, fever, rapidly progressive rash, or sepsis concern.
- Mucosal lesions, skin peeling, target lesions, Stevens-Johnson syndrome/toxic epidermal necrolysis concern, eye/genital involvement, chemical burn, pediatric pathway, pregnancy, or immunocompromised host.

## Must-Not-Miss Diagnoses

- Anaphylaxis.
- Stevens-Johnson syndrome or toxic epidermal necrolysis.
- Cellulitis or necrotizing infection.
- Chemical burn.
- Ocular or genital high-risk rash.

## Source Audit

- `medlineplus.contact_dermatitis` supports this phenotype's reviewed concepts.
- `medlineplus.allergic_reactions` supports this phenotype's reviewed concepts.
- MedlinePlus supports contact dermatitis as an irritant or allergic skin reaction after direct contact with a substance, avoidance of the trigger, moisturizers, clinician-directed topical therapy, and escalation for severe reactions, failure to improve, or infection signs. MedlinePlus allergic reaction content supports keeping airway symptoms, swelling, hypotension, epinephrine use, and systemic allergic reaction outside this pathway. Clinician-owner review on 2026-06-05 approved one shared adult contact dermatitis v1 after targeted plain-language, recovery-timeline, and return-precaution revisions.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `anaphylaxis`
- `airway_symptoms`
- `hypotension`
- `epinephrine_given`
- `mucosal_lesions`
- `severe_cutaneous_adverse_reaction`
- `contact_dermatitis_infection_concern`
- `rapid_progression`
- `fever`
- `sepsis`
- `eye_or_genital_rash_location`
- `burn_or_chemical_wound`
- `immunocompromised`
- `pregnancy`
- `pediatric_pathway`

## Primitive List

- `contact_dermatitis_uncomplicated.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `contact_dermatitis_uncomplicated.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `contact_dermatitis_uncomplicated.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `contact_dermatitis_uncomplicated.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `contact_dermatitis_uncomplicated.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `contact_dermatitis_uncomplicated.home_care.home_care_4.v1` | `home_care` | audit: source_supported
- `contact_dermatitis_uncomplicated.home_care.home_care_5.v1` | `home_care` | audit: source_supported
- `contact_dermatitis_uncomplicated.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `contact_dermatitis_uncomplicated.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `contact_dermatitis_uncomplicated.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `contact_dermatitis_uncomplicated.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `contact_dermatitis_uncomplicated.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `contact_dermatitis_uncomplicated.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
Your clinician diagnosed contact dermatitis, a skin reaction from something touching your skin.

WHAT WE FOUND:
Your clinician examined your rash and confirmed it is a skin reaction from contact with something, not an infection, allergic emergency, or serious medication reaction.

WHAT TO DO AT HOME:
- Avoid the suspected trigger if it is known.
- Use gentle soap and lukewarm water, and avoid scrubbing the rash.
- Keep the area protected from more irritation while the skin heals.
- Use moisturizers, wet dressings, or anti-itch care only as your clinician recommended.
- Most contact dermatitis rashes improve within a few days of avoiding the trigger and may take one to three weeks to fully clear.

MEDICATIONS:
- Use only the creams, ointments, or medicines your clinician prescribed or said are safe for you.
- Do not put antibiotic ointment, steroid cream, or other leftover medicine on the rash unless your clinician told you to.

RETURN TO ED IF:
- Trouble breathing, throat tightness, swelling of the lips or tongue, fainting, or severe vomiting.
- Skin peeling, blisters in the mouth, target-shaped rash, or rash with fever or feeling very ill.
- Spreading redness, warmth, pus, red streaks, or increasing pain around the rash.

FOLLOW UP:
Follow up with primary care, urgent care, dermatology, or the ED if the rash is not improving with the plan you were given, or sooner if symptoms are worsening.
```
