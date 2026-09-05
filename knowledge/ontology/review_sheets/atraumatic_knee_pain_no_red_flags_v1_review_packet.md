# Atraumatic knee pain without red flags V1 Review Packet

Phenotype ID: `atraumatic_knee_pain_no_red_flags`

Clinical status: reviewed_for_limited_atraumatic_knee_pain_without_red_flags_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-10.

## Inclusion Criteria

- Adult with clinician diagnosis or discharge impression of atraumatic knee pain.
- Reassuring knee exam and ambulatory discharge documented.
- No acute knee trauma, fracture, septic joint, large effusion, DVT, neurovascular compromise, inability to bear weight, or specialist-directed orthopedic plan.

## Exclusions

- Fall, twist, direct blow, crash, high-energy trauma, dislocation, fracture, or x-ray fracture pathway.
- Red hot joint, fever with joint pain, septic joint concern, large or rapidly developing effusion, acute hemarthrosis, immunocompromise, or prosthetic joint.
- Unable to walk or bear weight, neurovascular compromise, calf swelling/DVT concern, compartment syndrome concern, or specialist-directed orthopedic plan.

## Must-Not-Miss Diagnoses

- Septic arthritis.
- Fracture or dislocation.
- DVT.
- Neurovascular compromise.
- Compartment syndrome.
- Occult tendon or ligament rupture.

## Source Audit

- `medlineplus.knee_injuries_disorders` supports this phenotype's reviewed concepts.
- MedlinePlus supports knee injury/disorder education, home care framing, and escalation for inability to walk, swelling, fever, redness, deformity, neurologic or circulation changes, and worsening pain. Autonomous Phase 1002-1500 approved this narrow v1 only for clinician-diagnosed atraumatic knee pain with reassuring exam, ambulatory discharge, no x-ray fracture pathway, no septic joint, no DVT, no large effusion, no neurovascular compromise, and no specialist-directed orthopedic plan.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `acute_knee_trauma_concern`
- `high_energy_trauma`
- `dislocation`
- `fracture_seen`
- `septic_joint_or_infection_concern`
- `acute_hemarthrosis_or_large_effusion`
- `unable_to_bear_weight_lower_extremity`
- `cannot_ambulate_at_discharge`
- `neurovascular_compromise`
- `compartment_syndrome_concern`
- `dvt_or_pe_concern`
- `prosthetic_joint`
- `immunocompromised`
- `specialist_directed_orthopedic_plan`

## Primitive List

- `atraumatic_knee_pain_no_red_flags.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `atraumatic_knee_pain_no_red_flags.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `atraumatic_knee_pain_no_red_flags.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `atraumatic_knee_pain_no_red_flags.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `atraumatic_knee_pain_no_red_flags.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `atraumatic_knee_pain_no_red_flags.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `atraumatic_knee_pain_no_red_flags.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `atraumatic_knee_pain_no_red_flags.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `atraumatic_knee_pain_no_red_flags.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `atraumatic_knee_pain_no_red_flags.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `atraumatic_knee_pain_no_red_flags.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
Your clinician evaluated you for knee pain.

WHAT WE FOUND:
Your exam was reassuring today. We did not find signs of a broken bone, joint infection, blood clot, poor circulation, or another knee emergency.

WHAT TO DO AT HOME:
- Rest the knee from activities that make pain worse.
- Use ice, elevation, or gentle movement if your clinician said these are safe for you.
- Return to activity slowly as pain improves.

MEDICATIONS:
- Use only the pain medicine your clinician prescribed or said is safe for you.
- Do not take extra doses to push through worsening pain.

RETURN TO ED IF:
- Fever, a red hot swollen knee, rapidly increasing swelling, or severe pain.
- You cannot walk, cannot bear weight, the leg becomes weak or numb, or the foot becomes cold, blue, or pale.
- Calf swelling, chest pain, shortness of breath, new injury, or pain that is much worse despite the plan.

FOLLOW UP:
Follow up with primary care, orthopedics, or sports medicine as instructed if pain is not improving.
```
