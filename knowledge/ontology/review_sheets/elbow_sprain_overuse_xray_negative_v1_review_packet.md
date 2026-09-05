# Elbow overuse strain or epicondylitis with negative x-ray V1 Review Packet

Phenotype ID: `elbow_sprain_overuse_xray_negative`

Clinical status: reviewed_for_limited_adult_elbow_overuse_or_epicondylitis_with_negative_xray_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-01.

## Inclusion Criteria

- Adult with clinician diagnosis or discharge impression of lateral epicondylitis, medial epicondylitis, elbow overuse strain, or subacute/chronic elbow overuse injury.
- X-ray was performed and documented negative for fracture.
- Neurovascular exam documented intact, including hand motor function.
- Clinician affirmatively documented no acute traumatic mechanism and no elbow instability concern.

## Exclusions

- Acute traumatic mechanism, elbow dislocation, fracture, open wound, high-energy trauma, crush injury, or specialist-directed orthopedic plan.
- UCL/LCL injury or elbow instability concern; distal biceps or triceps tendon concern; inability to flex, extend, supinate, pronate, grip, or perform hand motor exam normally.
- Ulnar nerve pattern, hand numbness or weakness, septic joint or infection concern, compartment syndrome concern, olecranon bursitis, or large posterior elbow swelling.
- Pediatric growth plate pathway or elderly/osteoporotic high-risk elbow injury.

## Must-Not-Miss Diagnoses

- Occult fracture.
- Elbow dislocation or instability.
- UCL or LCL injury.
- Distal biceps tendon rupture.
- Triceps tendon rupture.
- Ulnar nerve compression or injury.
- Olecranon bursitis, including septic bursitis.
- Septic joint.
- Compartment syndrome.

## Source Audit

- `aaos.tennis_elbow_lateral_epicondylitis` supports this phenotype's reviewed concepts.
- `aaos.medial_epicondylitis_golfers_elbow` supports this phenotype's reviewed concepts.
- `aaos.distal_biceps_tendon_tear` supports this phenotype's reviewed concepts.
- `aaos.olecranon_bursitis` supports this phenotype's reviewed concepts.
- AAOS supports lateral and medial epicondylitis as overuse elbow tendon conditions, x-ray use to rule out fracture or arthritis, nonsurgical care with activity reduction and therapy, and weeks-to-months recovery expectations for persistent cases. AAOS distal biceps and olecranon bursitis sources support blocking tendon rupture and bursitis pathways. Clinician-owner review on 2026-06-04 approved promotion after targeted patient-facing revisions.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `acute_traumatic_elbow_mechanism`
- `fracture_seen`
- `dislocation`
- `open_wound`
- `open_fracture`
- `high_energy_trauma`
- `crush_injury`
- `elbow_instability_or_ucl_lcl_concern`
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

- `elbow_sprain_overuse_xray_negative.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `elbow_sprain_overuse_xray_negative.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `elbow_sprain_overuse_xray_negative.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `elbow_sprain_overuse_xray_negative.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `elbow_sprain_overuse_xray_negative.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `elbow_sprain_overuse_xray_negative.home_care.home_care_4.v1` | `home_care` | audit: source_supported
- `elbow_sprain_overuse_xray_negative.home_care.home_care_5.v1` | `home_care` | audit: source_supported
- `elbow_sprain_overuse_xray_negative.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `elbow_sprain_overuse_xray_negative.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `elbow_sprain_overuse_xray_negative.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `elbow_sprain_overuse_xray_negative.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `elbow_sprain_overuse_xray_negative.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `elbow_sprain_overuse_xray_negative.return_precautions.return_precaution_4.v1` | `return_precautions` | audit: source_supported
- `elbow_sprain_overuse_xray_negative.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
Your clinician diagnosed an elbow overuse injury, such as tendon irritation or strain. Your x-ray did not show a fracture.

WHAT WE FOUND:
Your x-ray did not show a fracture. Your blood flow, feeling, and hand movement were intact. This was not caused by a sudden injury, and your elbow showed no signs of instability.

WHAT TO DO AT HOME:
- Reduce or pause the activity that triggers elbow pain, especially gripping, lifting, twisting, pulling, pushing, or repetitive wrist and forearm motion.
- Keep the elbow moving gently during normal daily activity. Do not immobilize it unless your clinician gave you a brace or splint plan.
- Use ice or heat if it helps. Stop any exercise or activity that causes sharp pain, new weakness, or symptoms into the hand.
- Return to work, lifting, sports, or gym activity gradually. Start with lighter loads and shorter sessions, then increase only if pain stays controlled.
- Some symptoms may improve over days to weeks, but elbow tendon overuse can take weeks to months to fully settle down and often improves best with a rehab plan.

MEDICATIONS:
- Use only the medicines your clinician prescribed or said are safe for you.
- Do not take extra doses or combine medicines unless your clinician told you to.

RETURN TO ED IF:
- New numbness, tingling, weakness, color change, coldness, or trouble moving the hand or fingers.
- A pop, sudden worsening after an injury, new bruising, new swelling, or weakness bending or straightening the elbow.
- The elbow feels unstable, locks, cannot fully move, or pain becomes severe despite rest.
- Fever, spreading redness or warmth, pus, or a swollen painful bump over the back of the elbow.

FOLLOW UP:
Follow up with primary care, occupational medicine, sports medicine, or orthopedics in 1 to 2 weeks, especially if pain is limiting work, sports, or daily activity. Follow-up can help build a rehab and return-to-activity plan. Go sooner if pain is worsening, hand symptoms develop, or your clinician gave a specific plan.
```
