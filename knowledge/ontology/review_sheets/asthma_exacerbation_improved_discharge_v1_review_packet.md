# Asthma exacerbation improved for discharge V1 Review Packet

Phenotype ID: `asthma_exacerbation_improved_discharge`

Clinical status: reviewed_for_limited_improved_asthma_exacerbation_discharge_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-01.

## Inclusion Criteria

- Asthma flare improved after ED treatment and safe for outpatient plan.

## Exclusions

- Persistent hypoxia.
- Impending respiratory failure.
- Pneumonia or pulmonary embolism concern.
- No access to rescue medication.

## Must-Not-Miss Diagnoses

- Respiratory failure.
- Pneumonia.
- Pneumothorax.
- Pulmonary embolism mimic.

## Source Audit

- `medlineplus.asthma` supports this phenotype's reviewed concepts.
- MedlinePlus supports asthma symptoms, flare-up framing, trigger avoidance, prescribed inhaler use, and escalation for severe or life-threatening attacks.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `hypoxia`
- `poor_inhaler_access`
- `pregnancy`
- `chest_pain`
- `frequent_relapse`
- `respiratory_distress`

## Primitive List

- `asthma_exacerbation_improved_discharge.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `asthma_exacerbation_improved_discharge.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `asthma_exacerbation_improved_discharge.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `asthma_exacerbation_improved_discharge.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `asthma_exacerbation_improved_discharge.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `asthma_exacerbation_improved_discharge.home_care.home_care_4.v1` | `home_care` | audit: source_supported
- `asthma_exacerbation_improved_discharge.home_care.home_care_5.v1` | `home_care` | audit: source_supported
- `asthma_exacerbation_improved_discharge.home_care.home_care_6.v1` | `home_care` | audit: source_supported
- `asthma_exacerbation_improved_discharge.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `asthma_exacerbation_improved_discharge.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `asthma_exacerbation_improved_discharge.medications.medication_guidance_3.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `asthma_exacerbation_improved_discharge.medications.medication_guidance_4.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `asthma_exacerbation_improved_discharge.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `asthma_exacerbation_improved_discharge.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `asthma_exacerbation_improved_discharge.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `asthma_exacerbation_improved_discharge.return_precautions.return_precaution_4.v1` | `return_precautions` | audit: source_supported
- `asthma_exacerbation_improved_discharge.return_precautions.return_precaution_5.v1` | `return_precautions` | audit: source_supported
- `asthma_exacerbation_improved_discharge.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
You had an asthma flare-up that made it hard to breathe.

WHAT WE FOUND:
You came to the ED because your asthma got worse. We gave you breathing treatments that opened your airways and steroids to calm lung swelling. After treatment, you were breathing comfortably on your own and were safe to go home.

WHAT TO DO AT HOME:
- Rest for the next 1-2 days and avoid hard exercise until your breathing feels normal.
- Stay away from things that trigger your asthma, like smoke, strong smells, cold air, dust, mold, pet dander, humidity, or exercise in cold air.
- Always use a spacer with your rescue inhaler if you have one. It gets more medicine into your lungs.
- Start activity slowly as your breathing improves.
- If you have a peak flow meter, use it to track your breathing at home.
- Wash your hands and avoid sick contacts when you can.

MEDICATIONS:
- Use your rescue inhaler as prescribed.
- If you have a controller inhaler, keep taking it even when you feel better. It helps prevent the next flare.
- Take the steroid course if one was prescribed.
- Do not wait at home if your rescue inhaler is not helping.

RETURN TO ED IF:
- You need your inhaler more often than instructed.
- Your breathing gets worse or you feel short of breath at rest.
- You cannot speak in full sentences because of shortness of breath.
- Your lips or fingernails turn blue or gray.
- You have chest pain, confusion, fainting, or severe sleepiness.

FOLLOW UP:
See your primary care doctor or asthma clinician within 3-5 days, or sooner if symptoms are not improving. If you do not have a written asthma action plan, ask for one at follow-up.
```
