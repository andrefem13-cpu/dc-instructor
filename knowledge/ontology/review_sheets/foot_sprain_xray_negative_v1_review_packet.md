# Foot sprain with negative x-ray V1 Review Packet

Phenotype ID: `foot_sprain_xray_negative`

Clinical status: reviewed_for_limited_adult_foot_sprain_or_strain_with_negative_xray_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-05.

## Inclusion Criteria

- Adult with clinician diagnosis or discharge impression of foot sprain or strain.
- X-ray was performed and documented negative for fracture.
- Neurovascular exam documented intact.
- No ankle sprain pathway, Lisfranc or midfoot concern, inability to bear weight, inability to ambulate at discharge, occult fracture concern, compartment syndrome concern, septic joint or infection concern, or specialist-directed orthopedic plan.

## Exclusions

- Ankle sprain pathway, no x-ray performed, positive fracture, dislocation, open wound, open fracture, high-energy trauma, or crush injury.
- Lisfranc or midfoot injury concern, inability to bear weight, inability to ambulate at discharge, suspected tendon or ligament rupture, compartment syndrome concern, septic joint or infection concern, neurovascular compromise, or specialist-directed orthopedic plan.
- Pediatric growth plate pathway, elderly/osteoporotic high-risk foot injury, diabetic foot pathway, or peripheral vascular disease pathway.

## Must-Not-Miss Diagnoses

- Occult foot fracture.
- Lisfranc injury.
- Dislocation.
- Tendon rupture.
- Compartment syndrome.
- Septic joint.
- Neurovascular injury.

## Source Audit

- `medlineplus.sprains_strains` supports this phenotype's reviewed concepts.
- `medlineplus.foot_sprain_aftercare` supports this phenotype's reviewed concepts.
- MedlinePlus supports general sprain/strain framing and foot-sprain aftercare with protection, rest, ice, compression, elevation, mobility aids, gradual activity return, and escalation for worsening pain, swelling, numbness, color change, fever, or inability to walk. Clinician-owner review on 2026-06-05 approved this as one shared adult foot sprain v1 with current blockers intact, including Lisfranc or midfoot concern, inability to bear weight, inability to ambulate at discharge, high-energy mechanism, pediatric growth plate pathway, diabetic foot, vascular disease, and specialist-directed orthopedic plan.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `ankle_sprain_pathway`
- `no_xray_performed`
- `fracture_seen`
- `dislocation`
- `open_wound`
- `open_fracture`
- `high_energy_trauma`
- `crush_injury`
- `lisfranc_or_midfoot_concern`
- `unable_to_bear_weight_lower_extremity`
- `cannot_ambulate_at_discharge`
- `neurovascular_compromise`
- `tendon_or_ligament_rupture_concern`
- `compartment_syndrome_concern`
- `septic_joint_or_infection_concern`
- `pediatric_growth_plate_pathway`
- `elderly_osteoporotic_high_risk_msk`
- `diabetic_foot`
- `peripheral_vascular_disease`
- `specialist_directed_orthopedic_plan`

## Primitive List

- `foot_sprain_xray_negative.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `foot_sprain_xray_negative.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `foot_sprain_xray_negative.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `foot_sprain_xray_negative.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `foot_sprain_xray_negative.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `foot_sprain_xray_negative.home_care.home_care_4.v1` | `home_care` | audit: source_supported
- `foot_sprain_xray_negative.home_care.home_care_5.v1` | `home_care` | audit: source_supported
- `foot_sprain_xray_negative.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `foot_sprain_xray_negative.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `foot_sprain_xray_negative.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `foot_sprain_xray_negative.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `foot_sprain_xray_negative.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `foot_sprain_xray_negative.return_precautions.return_precaution_4.v1` | `return_precautions` | audit: source_supported
- `foot_sprain_xray_negative.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
Your clinician diagnosed a foot sprain. Your x-ray did not show a fracture.

WHAT WE FOUND:
Your x-ray did not show a broken bone. If your pain, swelling, or walking is not improving, you may need a repeat exam or more imaging. Some foot fractures are not visible on the first x-ray. Circulation, feeling, and movement in your foot and toes were normal.

WHAT TO DO AT HOME:
- Protect your foot with the hard-soled shoe, boot, wrap, crutches, or activity limits your clinician gave you.
- Rest from painful activity at first. Return to normal walking gradually, guided by your symptoms. If weight-bearing gets significantly worse instead of better, stop and return to the ED.
- Raise the foot when you can, especially while swelling is present.
- Use ice or compression for swelling and protect your skin from direct ice.
- Minor foot sprains often improve in several days. Moderate injuries can take several weeks. Both may need follow-up.

MEDICATIONS:
- Use only the medicines your clinician prescribed or said are safe for you.
- Do not take extra doses or combine medicines unless your clinician told you to.

RETURN TO ED IF:
- New numbness, weakness, color change, coldness, or trouble moving the foot or toes.
- You lose the ability to bear weight after going home, or walking becomes significantly worse.
- Worsening midfoot pain, bruising on the bottom of the foot, or swelling that is getting tighter.
- Fever, redness, warmth, pus, pain that seems out of proportion to the injury, or severe pain with movement.

FOLLOW UP:
Follow up with your doctor, urgent care, or a foot specialist in 5 to 7 days if symptoms are not improving. Go sooner if pain or swelling is worse after 2 to 3 days. Your clinician may have given you a different plan; follow that instead.
```
