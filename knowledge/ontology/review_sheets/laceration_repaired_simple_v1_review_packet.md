# Simple laceration repair V1 Review Packet

Phenotype ID: `laceration_repaired_simple`

Clinical status: reviewed_for_limited_simple_repaired_laceration_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-01.

## Inclusion Criteria

- Simple repaired laceration with no tendon, nerve, vessel, joint, or open fracture concern.

## Exclusions

- Bite wounds requiring special counseling.
- Open fracture, tendon injury, nerve injury, joint violation, or high-pressure injection injury.

## Must-Not-Miss Diagnoses

- Tendon injury.
- Nerve or vascular injury.
- Open fracture.
- Joint violation.
- Infection.

## Source Audit

- `medlineplus.cuts_puncture_wounds` supports this phenotype's reviewed concepts.
- MedlinePlus supports laceration framing, wound infection signs, higher-risk wounds, and deeper structure concerns for tendons, nerves, vessels, or bone.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `bite_wound`
- `hand_tendon_risk`
- `joint_violation`
- `open_fracture`
- `dirty_wound`
- `neurovascular_compromise`
- `retained_foreign_body`

## Primitive List

- `laceration_repaired_simple.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `laceration_repaired_simple.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `laceration_repaired_simple.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `laceration_repaired_simple.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `laceration_repaired_simple.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `laceration_repaired_simple.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `laceration_repaired_simple.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `laceration_repaired_simple.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `laceration_repaired_simple.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `laceration_repaired_simple.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `laceration_repaired_simple.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
Your cut was cleaned and repaired today.

WHAT WE FOUND:
We checked the wound and repaired it because it was safe to close. No emergency complication was found during today's exam.

WHAT TO DO AT HOME:
- Keep the wound clean and dry today.
- After the first day, gentle soap and water is usually okay unless told otherwise.
- Do not soak the wound until it is healed.

MEDICATIONS:
- Take antibiotics only if they were prescribed.
- Use acetaminophen or ibuprofen only if you can take it safely and follow the label.

RETURN TO ED IF:
- Fever, pus, spreading redness, red streaks, or worsening swelling.
- Bleeding that will not stop with firm pressure.
- New numbness, weakness, color change, or the wound opens.

FOLLOW UP:
Follow up for wound check or suture removal on the schedule your clinician gave you.
```
