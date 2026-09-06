# Gastroenteritis, stable and able to hydrate V1 Review Packet

Phenotype ID: `gastroenteritis_stable_hydrating`

Clinical status: reviewed_for_limited_stable_gastroenteritis_able_to_hydrate_use.

Production status: enabled with runtime modifier gates.

Reviewer: Automated source review.

Review date: 2026-06-01.

## Inclusion Criteria

- Vomiting, diarrhea, nausea, or crampy abdominal pain is most consistent with gastroenteritis.
- Patient is stable for discharge.
- Patient can drink fluids or has improved enough after ED treatment to continue oral hydration at home.
- No clinician concern for surgical abdomen, severe dehydration, sepsis, or high-risk GI bleeding at discharge.

## Exclusions

- Severe or localized abdominal pain concerning for appendicitis, bowel obstruction, ischemia, pancreatitis, cholecystitis, or other surgical process.
- Bloody stool, black stool, or significant GI bleeding.
- Severe dehydration, syncope, shock, or inability to keep fluids down.
- High-risk pregnancy, severe immunocompromise, very young infant, or frail older adult requiring a different pathway.
- Recent high-risk travel, outbreak exposure, or antibiotic-associated diarrhea requiring specific testing or treatment instructions.

## Must-Not-Miss Diagnoses

- Appendicitis or other surgical abdomen.
- Severe dehydration.
- Sepsis.
- GI bleeding.
- C. difficile or invasive diarrhea when risk factors are present.

## Source Audit

- `medlineplus.viral_gastroenteritis` supports this phenotype's reviewed concepts.
- `medlineplus.diarrhea_self_care` supports this phenotype's reviewed concepts.
- MedlinePlus supports oral rehydration, gradual diet advancement, hygiene, and return precautions for dehydration, blood in stool, fever, and severe abdominal pain.
- Patient-facing text is locally authored. No WikEM prose is copied.

## Blocked Modifiers

- `surgical_abdomen`
- `sepsis`
- `gi_bleeding`
- `severe_dehydration`
- `unable_to_tolerate_oral_fluids`
- `unstable_vitals`
- `pregnancy`
- `immunocompromised`
- `elderly_frail`
- `c_diff_risk`

## Primitive List

- `gastroenteritis.diagnosis.stable.v1` | `diagnosis` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `gastroenteritis.what_we_found.hydrating.v1` | `what_we_found` | audit: source_supported, clinician_judgment_only, unsafe_without_modifier
- `gastroenteritis.home_care.oral_rehydration.v1` | `home_care` | audit: source_supported, unsafe_without_modifier
- `gastroenteritis.home_care.food_hygiene.v1` | `home_care` | audit: source_supported
- `gastroenteritis.medications.antiemetic_if_prescribed.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `gastroenteritis.medications.avoid_antidiarrheal_red_flags.v1` | `medications` | audit: source_supported, unsafe_without_modifier
- `gastroenteritis.return_precautions.dehydration_blood_pain.v1` | `return_precautions` | audit: source_supported
- `gastroenteritis.return_precautions.persistent_worse.v1` | `return_precautions` | audit: source_supported
- `gastroenteritis.follow_up.recheck.v1` | `follow_up` | audit: source_supported, clinician_judgment_only
- `gastroenteritis_stable_hydrating.resources.source_link_1.v1` | `resources` | audit: source_supported
- `gastroenteritis_stable_hydrating.resources.source_link_2.v1` | `resources` | audit: source_supported
- `gastroenteritis_stable_hydrating.resources.followup_reminder.v1` | `resources` | audit: source_supported

## Patient-Facing Output

```text
DIAGNOSIS:
You most likely have gastroenteritis, an infection or irritation of the stomach and intestines that can cause vomiting or diarrhea.

WHAT WE FOUND:
You were stable enough for discharge today. You can continue oral hydration at home.

WHAT TO DO AT HOME:
- Take small sips often. Water, oral rehydration solution, broth, or a sports drink can help replace fluids.
- When you feel ready, restart bland foods and advance slowly. Wash your hands well because stomach infections can spread.

MEDICATIONS:
- If you were prescribed nausea medicine, take it only as directed so you can keep fluids down.
- Do not use diarrhea-stopping medicine if you have bloody stool, high fever, or severe abdominal pain unless a doctor tells you to.

RETURN TO ED IF:
- Come back to the emergency department right away for severe abdominal pain, bloody or black stool, fainting, confusion, or signs of dehydration.
- Come back if you cannot keep fluids down, are urinating much less than usual, fever becomes high, or symptoms keep getting worse.

FOLLOW UP:
Call your primary care doctor's office or clinic. Say, "I was in the emergency department and was diagnosed with gastroenteritis. I need a follow-up visit within 1-3 days if symptoms are not improving."

RESOURCES:
- Bring these instructions to your follow-up visit.
- Learn more: MedlinePlus - Viral gastroenteritis (stomach flu) (https://medlineplus.gov/ency/article/000252.htm).
- Learn more: MedlinePlus - When you have diarrhea (https://medlineplus.gov/ency/patientinstructions/000121.htm).
```
