# Lumbar strain without red flags V1 Review Packet

Phenotype ID: `lumbar_strain_no_red_flags`

Clinical status: reviewed_for_limited_mechanical_low_back_pain_without_red_flags_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-01.

## Inclusion Criteria

- Adult with acute mechanical low back pain or lumbar strain.
- No trauma requiring spine imaging or immobilization.
- No fever or systemic infectious concern.
- No new weakness, saddle anesthesia, urinary retention, bowel incontinence, or other cauda equina concern.
- Able to ambulate or safely mobilize at discharge.

## Exclusions

- Major trauma or suspected fracture.
- Known cancer with concerning back pain.
- Intravenous drug use with fever or spinal infection concern.
- New neurologic deficit.
- Pregnancy-specific back pain pathway.
- Post-procedure or post-operative spine patient.

## Must-Not-Miss Diagnoses

- Cauda equina syndrome.
- Spinal epidural abscess.
- Vertebral fracture.
- Aortic emergency when symptoms are atypical.
- Renal colic, pyelonephritis, or other non-MSK mimic.

## Source Audit

- `medlineplus.low_back_pain_acute` supports this phenotype's reviewed concepts.
- `wikem.low_back_pain` supports this phenotype's reviewed concepts.
- MedlinePlus supports conservative low-back-pain care and red flags. WikEM supports ED phenotype boundaries and must-not-miss framing only.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `cauda_equina_concern`
- `spinal_infection_concern`
- `fracture_or_trauma_concern`
- `cancer_red_flag`
- `fever`
- `new_neurologic_deficit`
- `pregnancy`
- `unable_to_walk`

## Primitive List

- `back_pain.diagnosis.lumbar_strain.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `back_pain.what_we_found.reassuring_exam.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `back_pain.home_care.activity.v1` | `home_care` | audit: source_supported, unsafe_without_modifier
- `back_pain.home_care.lifting.v1` | `home_care` | audit: source_supported, unsafe_without_modifier
- `back_pain.home_care.ice_heat.v1` | `home_care` | audit: source_supported, unsafe_without_modifier
- `back_pain.home_care.sleep_sitting.v1` | `home_care` | audit: source_supported
- `back_pain.medications.acetaminophen.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `back_pain.medications.nsaid_caution.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `back_pain.return_precautions.cauda_equina.v1` | `return_precautions` | audit: source_supported
- `back_pain.return_precautions.neuro_fever_trauma.v1` | `return_precautions` | audit: source_supported
- `back_pain.follow_up.primary_care.v1` | `follow_up` | audit: source_supported, clinician_judgment_only
- `lumbar_strain_no_red_flags.resources.source_link_1.v1` | `resources` | audit: source_supported
- `lumbar_strain_no_red_flags.resources.source_link_2.v1` | `resources` | audit: source_supported
- `lumbar_strain_no_red_flags.resources.followup_reminder.v1` | `resources` | audit: source_supported

## Patient-Facing Output

```text
DIAGNOSIS:
You have a lumbar strain. This means the muscles or ligaments in your lower back are irritated or stretched.

WHAT WE FOUND:
Your exam today was reassuring. You can walk, and we did not find signs of a dangerous nerve or spine problem.

WHAT TO DO AT HOME:
- Stay gently active. Avoid staying in bed all day. Short walks and light activity can help you recover.
- Use ice for the first 1 to 2 days for 15 to 20 minutes at a time. After that, you can try heat if it feels better.
- For the next few days, avoid heavy lifting, bending, and twisting. Slowly return to normal activity as your pain improves.
- Sleep in a position that feels comfortable. A pillow between your knees, or under your knees when on your back, may help.

MEDICATIONS:
- You can use acetaminophen for pain. Follow the bottle directions and do not take more than the label says.
- Ibuprofen or naproxen may help pain. Take them with food. Do not use them if you have kidney disease, stomach ulcers or bleeding, take blood thinners, or were told to avoid them.

RETURN TO ED IF:
- Come back to the emergency department right away if you cannot control your urine or bowel movements, or if your groin or buttocks feel numb.
- Come back to the emergency department right away for new leg weakness, trouble walking, fever, a new injury, or pain that becomes much worse.

FOLLOW UP:
Call your primary care doctor's office or clinic. Say, "I was in the emergency department and was diagnosed with a low back strain. I need a follow-up visit within 1-2 weeks if pain is not improving."

RESOURCES:
- Bring these instructions to your follow-up visit.
- Learn more: MedlinePlus - Low back pain - acute (https://medlineplus.gov/ency/article/007425.htm).
- Learn more: WikEM - Low back pain (https://wikem.org/wiki/Low_back_pain).
```
