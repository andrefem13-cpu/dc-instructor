# Knee or shoulder sprain or strain with negative x-ray V1 Review Packet

Phenotype ID: `sprain_strain_knee_or_shoulder_xray_negative`

Clinical status: reviewed_for_limited_knee_or_shoulder_sprain_or_strain_with_negative_xray_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-01.

## Inclusion Criteria

- Adult with clinician diagnosis or discharge impression of knee or shoulder sprain or strain.
- X-ray was performed and documented negative for fracture.
- Neurovascular exam documented intact.
- No suspected ligament rupture, tendon rupture, occult fracture pattern, septic joint, compartment syndrome, inability to bear weight for knee injuries, or high-risk site modifier.

## Exclusions

- Ankle sprain pathway, wrist sprain pathway, no x-ray performed, positive fracture, dislocation, open wound, open fracture, high-energy trauma, or crush injury.
- Suspected tendon rupture, ligament rupture, acute hemarthrosis, compartment syndrome concern, septic joint or infection concern, neurovascular compromise, or specialist-directed orthopedic plan.
- Inability to bear weight for knee injuries, elbow or foot sprain/strain sites pending separate v1 review, pediatric growth plate pathway, or elderly/osteoporotic high-risk knee or shoulder injury.

## Must-Not-Miss Diagnoses

- Occult fracture.
- Dislocation.
- Tendon rupture.
- Ligament rupture requiring urgent follow-up.
- Septic joint.
- Compartment syndrome.
- Acute hemarthrosis or osteochondral injury.

## Source Audit

- `medlineplus.sprains_strains` supports this phenotype's reviewed concepts.
- `medlineplus.ankle_sprain_aftercare` supports this phenotype's reviewed concepts.
- `wikem.ankle_sprain` supports this phenotype's reviewed concepts.
- MedlinePlus supports sprain/strain framing, several-week recovery for bad sprains, elevation/protection concepts, and escalation for worsening pain, swelling, numbness, or inability to move. Ankle-specific sources support general sprain principles only. This reviewed v1 is limited to documented knee or shoulder sprain/strain with x-ray performed and negative, intact neurovascular exam, and site-specific blockers.
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
- `neurovascular_compromise`
- `tendon_or_ligament_rupture_concern`
- `acute_hemarthrosis_or_large_effusion`
- `compartment_syndrome_concern`
- `septic_joint_or_infection_concern`
- `unable_to_bear_weight_lower_extremity`
- `wrist_site_pending_split`
- `elbow_or_foot_site_pending_split`
- `pediatric_growth_plate_pathway`
- `elderly_osteoporotic_high_risk_msk`
- `specialist_directed_orthopedic_plan`

## Primitive List

- `sprain_strain_knee_or_shoulder_xray_negative.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `sprain_strain_knee_or_shoulder_xray_negative.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `sprain_strain_knee_or_shoulder_xray_negative.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `sprain_strain_knee_or_shoulder_xray_negative.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `sprain_strain_knee_or_shoulder_xray_negative.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `sprain_strain_knee_or_shoulder_xray_negative.home_care.home_care_4.v1` | `home_care` | audit: source_supported
- `sprain_strain_knee_or_shoulder_xray_negative.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `sprain_strain_knee_or_shoulder_xray_negative.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `sprain_strain_knee_or_shoulder_xray_negative.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `sprain_strain_knee_or_shoulder_xray_negative.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `sprain_strain_knee_or_shoulder_xray_negative.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `sprain_strain_knee_or_shoulder_xray_negative.return_precautions.return_precaution_4.v1` | `return_precautions` | audit: source_supported
- `sprain_strain_knee_or_shoulder_xray_negative.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
Your clinician diagnosed a knee or shoulder sprain or strain. Your x-ray did not show a fracture.

WHAT WE FOUND:
Your clinician documented that an x-ray was performed and did not show a fracture, and that blood flow, feeling, and movement were intact.

WHAT TO DO AT HOME:
- Protect the injured area with the brace, wrap, sling, crutches, or activity limits your clinician gave you.
- Rest from painful activity at first, then slowly return to normal movement as symptoms allow.
- Raise the injured area when you can, especially while swelling is present.
- Minor sprains and strains may improve over several days. Moderate injuries often take several weeks, and high-grade injuries need follow-up.

MEDICATIONS:
- Use only the medicines your clinician prescribed or said are safe for you.
- Do not take extra doses or combine medicines unless your clinician told you to.

RETURN TO ED IF:
- New numbness, weakness, color change, coldness, or trouble moving the injured area.
- For knee injuries, new inability to bear weight or put weight through the injured leg.
- Worsening pain out of proportion, tight or hard swelling, or pain that does not improve with rest and elevation.
- Fever, spreading redness or warmth, pus, or severe pain with movement.

FOLLOW UP:
Follow up with primary care, urgent care, sports medicine, or orthopedics in 5 to 7 days if pain, swelling, movement, or walking is not improving, or sooner if your clinician gave a specific plan.
```
