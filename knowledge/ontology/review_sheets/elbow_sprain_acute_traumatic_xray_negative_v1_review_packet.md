# Acute traumatic elbow sprain with negative x-ray V1 Review Packet

Phenotype ID: `elbow_sprain_acute_traumatic_xray_negative`

Clinical status: reviewed_for_limited_adult_acute_traumatic_elbow_sprain_or_strain_with_negative_xray_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-05.

## Inclusion Criteria

- Adult with clinician diagnosis or discharge impression of acute traumatic elbow sprain, strain, soft tissue injury, low-grade collateral ligament sprain, or radial head contusion without fracture.
- X-ray was performed and documented negative for fracture or dislocation.
- Neurovascular exam documented intact, including hand motor function.
- Clinician documented acute traumatic mechanism, no elbow instability concern, and no distal tendon or ligament rupture concern.

## Exclusions

- Overuse or repetitive mechanism, lateral or medial epicondylitis, elbow dislocation, fracture, open wound, high-energy trauma, crush injury, or specialist-directed orthopedic plan.
- UCL/LCL rupture or instability concern; distal biceps or triceps tendon concern; inability to flex, extend, supinate, pronate, grip, or perform hand motor exam normally.
- Ulnar nerve symptoms, hand numbness or weakness, septic joint or infection concern, compartment syndrome concern, olecranon bursitis, or posterior elbow swelling pathway.
- Pediatric growth plate pathway or elderly/osteoporotic high-risk elbow injury.

## Must-Not-Miss Diagnoses

- Occult fracture.
- Elbow dislocation or instability.
- UCL or LCL rupture.
- Distal biceps tendon rupture.
- Triceps tendon rupture.
- Ulnar nerve injury.
- Olecranon bursitis, including septic bursitis.
- Septic joint.
- Compartment syndrome.
- Vascular injury.

## Source Audit

- `medlineplus.sprains_strains` supports this phenotype's reviewed concepts.
- `aaos.distal_biceps_tendon_tear` supports this phenotype's reviewed concepts.
- `aaos.olecranon_bursitis` supports this phenotype's reviewed concepts.
- MedlinePlus supports general sprain/strain framing, rest, protection, gradual return to activity, several-week recovery for bad sprains, and escalation for worsening pain, swelling, numbness, color change, fever, inability to move, or inability to walk. AAOS distal biceps and olecranon bursitis sources support blocking distal tendon rupture and posterior bursitis pathways. Clinician-owner review on 2026-06-05 approved one shared acute traumatic elbow sprain v1, including radial head contusion without fracture, with deferred split consideration for radial-head-specific rehab, ligament subtype, or distal-tendon-risk pathways if future product behavior needs different instructions.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `overuse_or_repetitive_mechanism`
- `fracture_seen`
- `dislocation`
- `open_wound`
- `open_fracture`
- `high_energy_trauma`
- `crush_injury`
- `elbow_instability_or_ucl_lcl_concern`
- `tendon_or_ligament_rupture_concern`
- `distal_biceps_or_triceps_concern`
- `ulnar_nerve_pattern`
- `olecranon_bursitis_pathway`
- `neurovascular_compromise`
- `hand_motor_deficit`
- `compartment_syndrome_concern`
- `septic_joint_or_infection_concern`
- `pediatric_growth_plate_pathway`
- `elderly_osteoporotic_high_risk_msk`
- `specialist_directed_orthopedic_plan`
- `no_xray_performed`

## Primitive List

- `elbow_sprain_acute_traumatic_xray_negative.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `elbow_sprain_acute_traumatic_xray_negative.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `elbow_sprain_acute_traumatic_xray_negative.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `elbow_sprain_acute_traumatic_xray_negative.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `elbow_sprain_acute_traumatic_xray_negative.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `elbow_sprain_acute_traumatic_xray_negative.home_care.home_care_4.v1` | `home_care` | audit: source_supported
- `elbow_sprain_acute_traumatic_xray_negative.home_care.home_care_5.v1` | `home_care` | audit: source_supported
- `elbow_sprain_acute_traumatic_xray_negative.home_care.home_care_6.v1` | `home_care` | audit: source_supported
- `elbow_sprain_acute_traumatic_xray_negative.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `elbow_sprain_acute_traumatic_xray_negative.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `elbow_sprain_acute_traumatic_xray_negative.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `elbow_sprain_acute_traumatic_xray_negative.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `elbow_sprain_acute_traumatic_xray_negative.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `elbow_sprain_acute_traumatic_xray_negative.return_precautions.return_precaution_4.v1` | `return_precautions` | audit: source_supported
- `elbow_sprain_acute_traumatic_xray_negative.return_precautions.return_precaution_5.v1` | `return_precautions` | audit: source_supported
- `elbow_sprain_acute_traumatic_xray_negative.return_precautions.return_precaution_6.v1` | `return_precautions` | audit: source_supported
- `elbow_sprain_acute_traumatic_xray_negative.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
Your clinician diagnosed an elbow sprain. Your x-ray did not show a fracture.

WHAT WE FOUND:
Your x-ray was negative for fracture. Your blood flow, feeling, and hand movement were intact. Your clinician did not find signs of elbow instability or tendon rupture.

WHAT TO DO AT HOME:
- Rest the elbow for the first 24 to 48 hours. Avoid lifting, gripping, or any motion that causes sharp pain.
- Apply ice wrapped in a cloth for 15 to 20 minutes at a time, several times a day for the first 1 to 2 days. Do not put ice directly on skin.
- Keep the elbow gently elevated when resting if it reduces swelling.
- After the first 1 to 2 days, begin gentle range of motion as pain allows. Do not force movement.
- Use the brace, sling, or wrap your clinician provided if one was given. Do not immobilize the elbow on your own unless instructed.
- Most elbow sprains improve over 1 to 3 weeks. Moderate sprains may take 4 to 6 weeks. Return to full activity gradually and only as pain allows.

MEDICATIONS:
- Use only the medicines your clinician prescribed or said are safe for you.
- Do not take extra doses or combine medicines unless your clinician told you to.

RETURN TO ED IF:
- New numbness, tingling, weakness, color change, coldness, or trouble moving the hand or fingers.
- The elbow feels unstable, gives way, locks, or you cannot fully bend or straighten it.
- Trouble rotating your forearm, turning your palm up, or turning your palm down.
- A pop or sudden worsening after the injury, new bruising spreading past the elbow, or sudden inability to bend the arm.
- Severe pain that is not controlled with rest and medication, or pain that is rapidly worsening.
- Fever, spreading redness or warmth, pus, or a new swollen bump over the back of the elbow.

FOLLOW UP:
Follow up with primary care, sports medicine, or orthopedics within 1 to 2 weeks. Go sooner if the elbow feels unstable, motion is not returning, forearm rotation is limited, or pain is worsening. Your clinician may recommend imaging or a rehab plan at that visit.
```
