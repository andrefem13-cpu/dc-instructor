# Adult constipation after reassuring ED assessment without obstruction or bleeding concern V1 Review Packet

Phenotype ID: `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding`

Clinical status: reviewed_for_limited_adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-06.

## Inclusion Criteria

- Adult with clinician diagnosis or discharge impression of constipation.
- Reassuring ED assessment or benign abdominal exam.
- No obstruction concern, GI bleeding, persistent vomiting, severe focal abdominal pain, or procedure-level fecal impaction plan.
- Medication instructions are clinician-entered only.

## Exclusions

- Bowel obstruction, ileus, volvulus, no flatus, abdominal distention, severe abdominal pain, peritoneal signs, or surgical abdomen concern.
- Persistent vomiting, inability to tolerate oral intake, dehydration requiring ongoing ED care, blood in stool, melena, or rectal bleeding.
- Fecal impaction requiring disimpaction or enema-specific plan.
- Opioid-induced constipation or medication-specific constipation pathway.
- Older, frail, or nursing-home patient with new constipation.
- Pregnancy, pediatric pathway, immunocompromised host, cancer or weight-loss concern, cauda equina concern, urinary retention, or unreliable follow-up.

## Must-Not-Miss Diagnoses

- Bowel obstruction.
- Volvulus.
- Colorectal malignancy.
- Cauda equina syndrome.
- GI bleeding.
- Surgical abdomen.

## Source Audit

- `medlineplus.constipation_self_care` supports this phenotype's reviewed concepts.
- `niddk.constipation_adults` supports this phenotype's reviewed concepts.
- `medlineplus.intestinal_obstruction` supports this phenotype's reviewed concepts.
- MedlinePlus and NIDDK support constipation symptom framing, hydration, fiber, activity, bowel routine, clinician-directed laxative use, and escalation for abdominal pain, bloating, nausea or vomiting, blood in stool, or obstruction symptoms. Medication choices and dosing remain clinician-entered only.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `bowel_obstruction_or_ileus_concern`
- `no_flatus`
- `abdominal_distention`
- `severe_or_focal_abdominal_pain`
- `peritoneal_signs`
- `surgical_abdomen`
- `persistent_vomiting`
- `unable_to_tolerate_oral_fluids`
- `severe_dehydration`
- `gi_bleeding`
- `fecal_impaction_procedure_plan`
- `opioid_induced_constipation`
- `elderly_frail`
- `nursing_home_patient`
- `pregnancy`
- `pediatric_pathway`
- `immunocompromised`
- `cancer_red_flag`
- `cauda_equina_concern`
- `urinary_retention`
- `poor_follow_up`

## Primitive List

- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.diagnosis.diagnosis_summary.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only
- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.what_we_found.reassuring_ed_assessment.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.home_care.home_care_1.v1` | `home_care` | audit: source_supported
- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.home_care.home_care_2.v1` | `home_care` | audit: source_supported
- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.home_care.home_care_3.v1` | `home_care` | audit: source_supported
- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.home_care.home_care_4.v1` | `home_care` | audit: source_supported
- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.home_care.home_care_5.v1` | `home_care` | audit: source_supported
- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.medications.medication_guidance_1.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.medications.medication_guidance_2.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.medications.medication_guidance_3.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.return_precautions.return_precaution_1.v1` | `return_precautions` | audit: source_supported
- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.return_precautions.return_precaution_2.v1` | `return_precautions` | audit: source_supported
- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.return_precautions.return_precaution_3.v1` | `return_precautions` | audit: source_supported
- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.return_precautions.return_precaution_4.v1` | `return_precautions` | audit: source_supported
- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.return_precautions.return_precaution_5.v1` | `return_precautions` | audit: source_supported
- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.return_precautions.return_precaution_6.v1` | `return_precautions` | audit: source_supported
- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.return_precautions.return_precaution_7.v1` | `return_precautions` | audit: source_supported
- `adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding.follow_up.default_follow_up.v1` | `follow_up` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier

## Patient-Facing Output

```text
DIAGNOSIS:
You were treated for constipation.

WHAT WE FOUND:
Your clinician examined you and your symptoms were consistent with constipation. No signs of an emergency cause were found on exam.

WHAT TO DO AT HOME:
- Drink fluids as your clinician said is safe for you.
- Add fiber slowly with foods like fruits, vegetables, beans, or whole grains if you can tolerate them.
- Move around as tolerated. Walking can help your bowels move.
- Try to use the toilet shortly after meals when the urge is strongest.
- Most people see improvement within one to three days of starting treatment. If you are not improving by then, follow up rather than waiting longer.

MEDICATIONS:
- Take constipation medicines only as prescribed or recommended by your clinician.
- Do not add extra laxatives, stool softeners, enemas, or supplements unless your clinician told you to.
- Do not use laxatives if you develop severe abdominal pain, repeated vomiting, or a swollen belly.

RETURN TO ED IF:
- Severe or worsening abdominal pain.
- A swollen or hard belly.
- Repeated vomiting or you cannot keep fluids down.
- Blood in your stool, black stool, or rectal bleeding.
- Fever or feeling very ill.
- You cannot pass gas, especially with worsening abdominal pain or swelling.
- New back pain, leg weakness, or trouble urinating.

FOLLOW UP:
Follow up with your primary care provider or urgent care within two to three days if your symptoms are not improving. Return to the ED sooner if any of the above symptoms develop.
```
