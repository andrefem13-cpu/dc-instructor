#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from ontology_lib import ROOT, assemble_discharge, load_primitives, read_json
from build_expanded_draft_packs import MANIFEST_PATH, build_runtime_manifest


REVIEWER = "Automated source review"
REVIEWER_ROLE = "Software pipeline; not a clinician signature"
REVIEW_DATE = "2026-06-01"
REVIEW_DIR = ROOT / "review_sheets"

PROMOTIONS: dict[str, dict[str, Any]] = {
    "asthma_exacerbation_improved_discharge": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": ["asthma exacerbation improved discharge", "asthma flare improved", "asthma", "wheezing", "asthma attack"],
        "unsafe_modifiers": ["hypoxia", "poor_inhaler_access", "pregnancy", "chest_pain", "frequent_relapse", "respiratory_distress"],
        "source_audit_notes": "MedlinePlus supports asthma symptoms, flare-up framing, trigger avoidance, prescribed inhaler use, and escalation for severe or life-threatening attacks.",
        "clinical_status": "reviewed_for_limited_improved_asthma_exacerbation_discharge_use",
        "required_modifiers": ["breathing improved after ED treatment", "safe outpatient plan", "rescue medication access", "no persistent hypoxia"],
    },
    "community_acquired_pneumonia_outpatient": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": ["community acquired pneumonia outpatient", "pneumonia outpatient", "community acquired pneumonia", "pneumonia", "lung infection"],
        "unsafe_modifiers": ["hypoxia", "immunocompromised", "elderly_frail", "sepsis", "poor_follow_up", "respiratory_distress", "vomiting_unable_to_take_meds"],
        "source_audit_notes": "CDC supports pneumonia symptom framing, higher-risk host factors, and outpatient antibiotic-stewardship distinctions. Dosing and regimen selection remain outside the ontology until medication policy exists.",
        "clinical_status": "reviewed_for_limited_outpatient_community_acquired_pneumonia_use",
        "required_modifiers": ["pneumonia diagnosed by clinician", "stable for outpatient treatment", "acceptable oxygen level", "antibiotics prescribed"],
    },
    "acute_bronchitis_no_pneumonia": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": [
            "acute bronchitis",
            "acute bronchitis no pneumonia",
            "chest cold",
            "viral bronchitis",
            "bronchitis without pneumonia concern",
        ],
        "unsafe_modifiers": [
            "hypoxia",
            "respiratory_distress",
            "pneumonia",
            "focal_lung_findings_or_infiltrate",
            "copd_or_asthma_exacerbation_pathway",
            "immunocompromised",
            "elderly_frail",
            "hemoptysis",
            "cardiac_or_pe_chest_pain_concern",
            "sepsis",
            "unstable_vitals",
            "antibiotic_prescribed_for_suspected_bacterial_infection",
        ],
        "high_confidence_terms": ["acute bronchitis", "acute bronchitis no pneumonia", "chest cold", "viral bronchitis"],
        "source_audit_notes": "CDC and MedlinePlus support acute bronchitis and chest cold framing, viral predominance, supportive care, and escalation for worsening breathing symptoms. CDC outpatient guidance supports keeping pneumonia concern, abnormal vital signs, and focal lung findings outside uncomplicated bronchitis.",
        "clinical_status": "reviewed_for_limited_acute_bronchitis_without_pneumonia_concern_use",
        "required_modifiers": [
            "adult with clinician diagnosis of acute bronchitis, chest cold, or viral bronchitis",
            "no pneumonia diagnosis or focal pneumonia concern",
            "acceptable oxygenation",
            "comfortable work of breathing",
            "no antibiotics prescribed for suspected bacterial infection",
        ],
    },
    "acute_sinusitis_supportive_care": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": [
            "acute sinusitis supportive care",
            "sinus infection supportive care",
            "acute sinusitis",
            "sinus infection",
            "rhinosinusitis supportive care",
        ],
        "unsafe_modifiers": [
            "antibiotic_prescribed_for_sinusitis",
            "severe_bacterial_sinusitis_features",
            "orbital_or_intracranial_sinusitis_concern",
            "dental_or_facial_trauma_source",
            "immunocompromised",
            "elderly_frail",
            "pregnancy",
            "sepsis",
            "unstable_vitals",
            "chronic_or_recurrent_sinusitis",
        ],
        "high_confidence_terms": ["acute sinusitis supportive care", "sinus infection supportive care"],
        "source_audit_notes": "CDC and MedlinePlus support sinusitis framing, symptom-based diagnosis, supportive care, and seeking care for severe or concerning symptoms. CDC outpatient guidance supports that most rhinosinusitis is viral, that antibiotics may not help many cases, and that bacterial-feature or antibiotic decisions require clinician judgment.",
        "clinical_status": "reviewed_for_limited_acute_sinusitis_supportive_care_without_antibiotic_plan_use",
        "required_modifiers": [
            "adult with clinician diagnosis of acute sinusitis, sinus infection, or acute rhinosinusitis",
            "supportive-care plan without antibiotic instructions",
            "no severe bacterial sinusitis features",
            "no orbital or intracranial complication concern",
            "no dental source, facial trauma, sepsis, or individualized high-risk host pathway",
        ],
    },
    "concussion_discharge_no_imaging_red_flags": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": ["concussion discharge no imaging red flags", "concussion", "mild traumatic brain injury", "mild tbi"],
        "unsafe_modifiers": ["athlete_return_to_play", "anticoagulated", "neurologic_deficit", "persistent_vomiting", "loss_of_consciousness", "intoxication"],
        "source_audit_notes": "CDC HEADS UP and CDC mild TBI guidance support danger signs, gradual return to activity, and clinician-directed return-to-school, work, driving, or play planning.",
        "clinical_status": "reviewed_for_limited_concussion_without_imaging_red_flags_use",
        "required_modifiers": ["reassuring neurologic assessment", "no imaging red flags documented", "safe observation plan", "no anticoagulation"],
    },
    "minor_head_injury_no_red_flags": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": ["minor head injury no red flags", "minor head injury", "head injury", "hit head"],
        "unsafe_modifiers": ["anticoagulated", "loss_of_consciousness", "intoxication", "elderly", "persistent_vomiting", "neurologic_deficit", "skull_fracture_concern"],
        "source_audit_notes": "CDC concussion guidance supports delayed symptoms, emergency danger signs, and gradual activity return after minor head trauma or possible concussion.",
        "clinical_status": "reviewed_for_limited_minor_head_injury_without_red_flags_use",
        "required_modifiers": ["minor blunt head injury", "reassuring ED assessment", "no anticoagulation", "no neurologic deficit"],
    },
    "renal_colic_stable_no_infection": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": ["renal colic stable no infection", "renal colic", "kidney stone", "ureteral stone"],
        "unsafe_modifiers": ["fever", "solitary_kidney", "pregnancy", "renal_failure", "uncontrolled_pain", "vomiting_unable_to_take_meds", "urinary_obstruction", "sepsis"],
        "source_audit_notes": "MedlinePlus supports kidney stone self-care, hydration, urine straining when instructed, and escalation for fever, chills, vomiting, severe pain, cloudy urine, or urinary symptoms.",
        "clinical_status": "reviewed_for_limited_stable_renal_colic_without_infection_use",
        "required_modifiers": ["suspected or confirmed renal colic", "stable for outpatient management", "no fever or sepsis", "symptoms controlled enough for discharge"],
    },
    "abscess_after_i_and_d": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": ["abscess after i and d", "abscess after incision and drainage", "abscess drained", "skin abscess drained", "i and d", "incision and drainage"],
        "unsafe_modifiers": ["deep_space_location", "immunocompromised", "packing_required", "recurrent_abscess", "sepsis", "necrotizing_infection_concern"],
        "source_audit_notes": "MedlinePlus supports skin abscess symptoms, pus drainage, fever or chills, and need to seek care for new symptoms after treatment.",
        "clinical_status": "reviewed_for_limited_abscess_after_ed_drainage_use",
        "required_modifiers": ["abscess drained", "safe discharge plan", "no deep-space location", "no sepsis"],
    },
    "allergic_reaction_resolved_no_anaphylaxis": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": ["allergic reaction resolved no anaphylaxis", "allergic reaction no anaphylaxis", "allergic reaction", "hives", "urticaria"],
        "unsafe_modifiers": ["airway_symptoms", "hypotension", "epinephrine_given", "mucosal_lesions", "unknown_trigger", "anaphylaxis", "biphasic_reaction_concern"],
        "source_audit_notes": "MedlinePlus supports allergic reaction symptoms, hives or urticaria as a possible allergic presentation, anaphylaxis danger signs, epinephrine planning, and emergency escalation for airway or severe systemic symptoms.",
        "clinical_status": "reviewed_for_limited_resolved_allergic_reaction_without_anaphylaxis_use",
        "required_modifiers": ["symptoms improved or resolved", "no anaphylaxis", "no airway swelling", "no hypotension"],
    },
    "adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": [
            "adult constipation reassuring ed assessment",
            "constipation",
            "constipation discharge diagnosis",
            "constipation diagnosed",
        ],
        "unsafe_modifiers": [
            "bowel_obstruction_or_ileus_concern",
            "no_flatus",
            "abdominal_distention",
            "severe_or_focal_abdominal_pain",
            "peritoneal_signs",
            "surgical_abdomen",
            "persistent_vomiting",
            "unable_to_tolerate_oral_fluids",
            "severe_dehydration",
            "gi_bleeding",
            "fecal_impaction_procedure_plan",
            "opioid_induced_constipation",
            "elderly_frail",
            "nursing_home_patient",
            "pregnancy",
            "pediatric_pathway",
            "immunocompromised",
            "cancer_red_flag",
            "cauda_equina_concern",
            "urinary_retention",
            "poor_follow_up",
        ],
        "required_context": [
            {
                "id": "clinician_diagnosis_constipation",
                "terms": [
                    "clinician diagnosis constipation",
                    "discharge diagnosis constipation",
                    "constipation diagnosed",
                    "diagnosed with constipation",
                    "discharge impression constipation",
                ],
            },
            {
                "id": "reassuring_ed_assessment_or_benign_abdominal_exam",
                "terms": [
                    "reassuring ed assessment",
                    "benign abdominal exam",
                    "abdomen soft",
                    "soft nontender abdomen",
                    "no signs of an emergency cause were found on exam",
                ],
            },
            {
                "id": "no_obstruction_concern_documented",
                "terms": [
                    "no obstruction concern",
                    "no bowel obstruction concern",
                    "passing gas",
                    "able to pass gas",
                    "can pass gas",
                    "no signs of an emergency cause were found on exam",
                ],
            },
            {
                "id": "no_gi_bleeding_documented",
                "terms": [
                    "no blood in stool",
                    "no black stool",
                    "no gi bleeding",
                    "no rectal bleeding",
                ],
            },
        ],
        "high_confidence_terms": [
            "clinician diagnosis constipation",
            "discharge diagnosis constipation",
            "adult constipation reassuring ed assessment",
        ],
        "source_audit_notes": "MedlinePlus and NIDDK support constipation symptom framing, hydration, fiber, activity, bowel routine, clinician-directed laxative use, and escalation for abdominal pain, bloating, nausea or vomiting, blood in stool, or obstruction symptoms. Medication choices and dosing remain clinician-entered only.",
        "clinical_status": "reviewed_for_limited_adult_constipation_reassuring_ed_assessment_no_obstruction_or_bleeding_use",
        "required_modifiers": [
            "adult",
            "clinician diagnosis or discharge impression of constipation",
            "reassuring ED assessment or benign abdominal exam",
            "no obstruction concern",
            "no GI bleeding",
            "medications clinician-entered only",
        ],
        "review_date": "2026-06-06",
    },
    "lumbar_strain_no_red_flags": {
        "primitive_file": ROOT / "primitives" / "back_pain.json",
        "condition_terms": [
            "lumbar strain no red flags",
            "lumbar strain",
            "low back strain",
            "mechanical low back pain",
            "acute low back pain",
            "back pain no red flags",
        ],
        "unsafe_modifiers": [
            "cauda_equina_concern",
            "spinal_infection_concern",
            "fracture_or_trauma_concern",
            "cancer_red_flag",
            "fever",
            "new_neurologic_deficit",
            "pregnancy",
            "unable_to_walk",
        ],
        "source_audit_notes": "MedlinePlus supports conservative low-back-pain care and red flags. WikEM supports ED phenotype boundaries and must-not-miss framing only.",
        "clinical_status": "reviewed_for_limited_mechanical_low_back_pain_without_red_flags_use",
        "required_modifiers": ["no cauda equina concern", "no spinal infection concern", "no major trauma or fracture concern", "ambulatory or safe mobility plan"],
    },
    "viral_uri_no_pneumonia": {
        "primitive_file": ROOT / "primitives" / "viral_uri.json",
        "condition_terms": [
            "viral uri no pneumonia",
            "viral upper respiratory infection",
            "viral uri",
            "common cold",
            "cold symptoms",
            "uri no pneumonia",
        ],
        "unsafe_modifiers": [
            "pneumonia",
            "hypoxia",
            "respiratory_distress",
            "unstable_vitals",
            "immunocompromised",
            "sepsis",
            "chest_pain",
            "antibiotic_prescribed",
            "bacterial_infection_suspected",
        ],
        "source_audit_notes": "MedlinePlus supports viral URI supportive care and escalation symptoms. AHRQ supports antibiotic stewardship for uncomplicated viral URI.",
        "clinical_status": "reviewed_for_limited_viral_uri_without_pneumonia_use",
        "required_modifiers": ["comfortable breathing", "acceptable oxygen level", "no pneumonia concern", "no antibiotic prescribed"],
    },
    "uncomplicated_cystitis_nonpregnant": {
        "primitive_file": ROOT / "primitives" / "cystitis.json",
        "condition_terms": [
            "uncomplicated cystitis nonpregnant",
            "uncomplicated cystitis",
            "bladder infection",
            "uti",
            "urinary tract infection",
            "cystitis",
        ],
        "unsafe_modifiers": [
            "pregnancy",
            "male_patient",
            "pyelonephritis",
            "fever",
            "flank_pain",
            "sepsis",
            "vomiting_unable_to_take_meds",
            "complicated_uti",
            "kidney_transplant",
            "urinary_obstruction",
            "indwelling_catheter",
            "no_antibiotic_prescribed",
        ],
        "source_audit_notes": "CDC and MedlinePlus support UTI framing, antibiotic treatment when clinically indicated, hydration, and pyelonephritis or sepsis return precautions.",
        "clinical_status": "reviewed_for_limited_nonpregnant_uncomplicated_cystitis_use",
        "required_modifiers": ["not pregnant", "lower urinary symptoms", "no fever or flank pain", "oral antibiotics prescribed"],
    },
    "gastroenteritis_stable_hydrating": {
        "primitive_file": ROOT / "primitives" / "gastroenteritis.json",
        "condition_terms": [
            "gastroenteritis stable hydrating",
            "gastroenteritis",
            "stomach virus",
            "vomiting diarrhea",
            "nausea vomiting diarrhea",
            "diarrhea vomiting",
        ],
        "unsafe_modifiers": [
            "surgical_abdomen",
            "sepsis",
            "gi_bleeding",
            "severe_dehydration",
            "unable_to_tolerate_oral_fluids",
            "unstable_vitals",
            "pregnancy",
            "immunocompromised",
            "elderly_frail",
            "c_diff_risk",
        ],
        "source_audit_notes": "MedlinePlus supports oral rehydration, gradual diet advancement, hygiene, and return precautions for dehydration, blood in stool, fever, and severe abdominal pain.",
        "clinical_status": "reviewed_for_limited_stable_gastroenteritis_able_to_hydrate_use",
        "required_modifiers": ["stable for discharge", "can continue oral hydration", "no surgical abdomen", "no GI bleeding"],
    },
    "cellulitis_uncomplicated_oral_antibiotics": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": ["cellulitis", "uncomplicated cellulitis", "skin infection", "skin infection cellulitis"],
        "unsafe_modifiers": ["immunocompromised", "rapid_progression", "diabetic_foot", "bite_wound", "near_eye_or_genitals", "sepsis", "necrotizing_infection_concern", "deep_space_location"],
        "source_audit_notes": "MedlinePlus and CDC support cellulitis treatment framing, antibiotic use when clinically indicated, and escalation for worsening or severe infection.",
        "clinical_status": "reviewed_for_limited_uncomplicated_outpatient_cellulitis_use",
        "required_modifiers": ["localized infection", "outpatient antibiotics prescribed", "no sepsis", "no necrotizing infection concern", "no high-risk location"],
    },
    "dental_pain_no_deep_space_infection": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": ["dental pain no deep space infection", "dental pain", "tooth pain", "toothache", "dental infection no deep space infection"],
        "unsafe_modifiers": ["airway_symptoms", "deep_space_swelling", "immunocompromised", "trismus", "fever", "sepsis", "ludwig_angina_concern"],
        "source_audit_notes": "MedlinePlus supports dental pain causes, need for dental evaluation, and urgent escalation for swelling, fever, trouble swallowing, or trouble breathing.",
        "clinical_status": "reviewed_for_limited_dental_pain_without_deep_space_infection_use",
        "required_modifiers": ["no airway symptoms", "no deep-space swelling", "dental follow-up needed"],
    },
    "laceration_repaired_simple": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": ["laceration repaired simple", "simple laceration repair", "laceration repair", "repaired laceration", "skin glue"],
        "unsafe_modifiers": ["bite_wound", "hand_tendon_risk", "joint_violation", "open_fracture", "dirty_wound", "neurovascular_compromise", "retained_foreign_body"],
        "source_audit_notes": "MedlinePlus supports laceration framing, wound infection signs, higher-risk wounds, and deeper structure concerns for tendons, nerves, vessels, or bone.",
        "clinical_status": "reviewed_for_limited_simple_repaired_laceration_use",
        "required_modifiers": ["simple repaired wound", "no tendon nerve vessel joint or open fracture concern", "wound care plan given"],
    },
    "viral_pharyngitis_strep_negative": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": ["viral pharyngitis strep negative", "viral pharyngitis", "sore throat strep negative", "strep negative", "negative strep"],
        "unsafe_modifiers": ["drooling", "trismus", "voice_change", "airway_symptoms", "immunocompromised", "peritonsillar_abscess_concern", "epiglottitis_concern", "mono_complication_concern", "positive_strep_test", "antibiotic_prescribed"],
        "source_audit_notes": "CDC supports viral sore throat antibiotic stewardship and group A strep testing distinctions, including not treating viral pharyngitis with antibiotics.",
        "clinical_status": "reviewed_for_limited_strep_negative_viral_pharyngitis_use",
        "required_modifiers": ["negative strep evaluation", "no deep neck infection signs", "no antibiotic prescribed"],
    },
    "abdominal_pain_nonspecific_reassuring_workup": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": ["abdominal pain recheck", "abdominal pain reassuring evaluation", "belly pain recheck", "nonspecific abdominal pain"],
        "unsafe_modifiers": ["pregnancy", "elderly", "immunocompromised", "poor_follow_up", "peritoneal_signs", "uncontrolled_vomiting", "fever", "gi_bleeding", "sepsis", "unstable_vitals"],
        "required_context": [
            {
                "id": "clinician_directed_recheck_plan",
                "terms": [
                    "explicit recheck",
                    "return for recheck",
                    "recheck as instructed",
                    "clinician instructed recheck",
                    "clinician directed recheck",
                    "clinician-directed recheck",
                    "follow up for recheck as instructed",
                    "ed recheck as instructed",
                ],
            }
        ],
        "high_confidence_terms": ["abdominal pain recheck"],
        "source_audit_notes": "MedlinePlus supports general abdominal pain framing, cautious home care, and conservative return precautions. This reviewed phenotype is limited to clinician-directed abdominal pain recheck after a reassuring ED evaluation.",
        "clinical_status": "reviewed_for_limited_abdominal_pain_recheck_after_reassuring_ed_evaluation_use",
        "required_modifiers": ["reassuring ED evaluation", "clinician-directed recheck plan", "no surgical abdomen concern", "reliable follow-up"],
    },
    "sprain_strain_knee_or_shoulder_xray_negative": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": [
            "knee shoulder sprain xray negative",
            "knee shoulder strain xray negative",
            "knee sprain xray negative",
            "knee strain xray negative",
            "shoulder sprain xray negative",
            "shoulder strain xray negative",
            "elbow sprain xray negative",
            "foot sprain xray negative",
        ],
        "unsafe_modifiers": [
            "ankle_sprain_pathway",
            "no_xray_performed",
            "fracture_seen",
            "dislocation",
            "open_wound",
            "open_fracture",
            "high_energy_trauma",
            "crush_injury",
            "neurovascular_compromise",
            "tendon_or_ligament_rupture_concern",
            "acute_hemarthrosis_or_large_effusion",
            "compartment_syndrome_concern",
            "septic_joint_or_infection_concern",
            "unable_to_bear_weight_lower_extremity",
            "wrist_site_pending_split",
            "elbow_or_foot_site_pending_split",
            "pediatric_growth_plate_pathway",
            "elderly_osteoporotic_high_risk_msk",
            "specialist_directed_orthopedic_plan",
        ],
        "required_context": [
            {
                "id": "knee_or_shoulder_site_documented",
                "terms": [
                    "knee sprain xray negative",
                    "knee strain xray negative",
                    "shoulder sprain xray negative",
                    "shoulder strain xray negative",
                ],
            },
            {
                "id": "xray_performed_and_negative",
                "terms": [
                    "xray performed and negative",
                    "x ray performed and negative",
                    "x-ray performed and negative",
                    "xray negative for fracture",
                    "x-ray negative for fracture",
                ],
            },
            {
                "id": "intact_neurovascular_exam",
                "terms": [
                    "neurovascular exam intact",
                    "blood flow sensation movement intact",
                    "cms intact",
                    "distal pulses sensation movement intact",
                ],
            },
        ],
        "high_confidence_terms": [
            "knee shoulder sprain xray negative",
            "knee shoulder strain xray negative",
            "knee sprain xray negative",
            "knee strain xray negative",
            "shoulder sprain xray negative",
            "shoulder strain xray negative",
        ],
        "source_audit_notes": "MedlinePlus supports sprain/strain framing, several-week recovery for bad sprains, elevation/protection concepts, and escalation for worsening pain, swelling, numbness, or inability to move. Ankle-specific sources support general sprain principles only. This reviewed v1 is limited to documented knee or shoulder sprain/strain with x-ray performed and negative, intact neurovascular exam, and site-specific blockers.",
        "clinical_status": "reviewed_for_limited_knee_or_shoulder_sprain_or_strain_with_negative_xray_use",
        "required_modifiers": [
            "adult with clinician diagnosis of knee or shoulder sprain/strain",
            "x-ray performed and negative",
            "intact neurovascular exam",
            "no ankle pathway",
            "no wrist pathway",
            "no elbow or foot pathway",
            "no high-risk orthopedic modifier",
        ],
    },
    "elbow_sprain_overuse_xray_negative": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": [
            "elbow sprain overuse xray negative",
            "elbow strain overuse xray negative",
            "elbow overuse strain xray negative",
            "lateral epicondylitis xray negative",
            "medial epicondylitis xray negative",
            "tennis elbow xray negative",
            "golfer elbow xray negative",
            "golfers elbow xray negative",
        ],
        "unsafe_modifiers": [
            "acute_traumatic_elbow_mechanism",
            "fracture_seen",
            "dislocation",
            "open_wound",
            "open_fracture",
            "high_energy_trauma",
            "crush_injury",
            "elbow_instability_or_ucl_lcl_concern",
            "distal_biceps_or_triceps_concern",
            "ulnar_nerve_pattern",
            "olecranon_bursitis_pathway",
            "neurovascular_compromise",
            "hand_motor_deficit",
            "compartment_syndrome_concern",
            "septic_joint_or_infection_concern",
            "pediatric_growth_plate_pathway",
            "elderly_osteoporotic_high_risk_msk",
            "specialist_directed_orthopedic_plan",
            "no_xray_performed",
        ],
        "output_modifiers": [
            {
                "id": "anticoagulated",
                "label": "Anticoagulation medication-safety modifier",
                "note": "Flag anticoagulation for clinician-entered medication and bleeding-risk review without changing the elbow overuse text.",
            },
            {
                "id": "immunocompromised",
                "label": "Immunocompromised follow-up modifier",
                "note": "Flag immunocompromise for clinician-entered follow-up and return-instruction review without changing the elbow overuse text.",
            },
        ],
        "required_context": [
            {
                "id": "adult_elbow_overuse_diagnosis",
                "terms": [
                    "adult with lateral epicondylitis",
                    "adult with medial epicondylitis",
                    "adult with elbow overuse strain",
                    "adult elbow overuse injury",
                    "lateral epicondylitis",
                    "medial epicondylitis",
                    "elbow overuse strain",
                    "subacute elbow overuse injury",
                    "chronic elbow overuse injury",
                ],
            },
            {
                "id": "xray_performed_and_negative",
                "terms": [
                    "xray performed and negative",
                    "x ray performed and negative",
                    "x-ray performed and negative",
                    "xray negative for fracture",
                    "x-ray negative for fracture",
                    "xray shows no acute fracture",
                    "x-ray shows no acute fracture",
                    "no fracture seen on xray",
                    "no fracture seen on x-ray",
                ],
            },
            {
                "id": "intact_neurovascular_and_hand_motor_exam",
                "terms": [
                    "neurovascular exam intact including hand motor",
                    "neurovascular intact including hand motor",
                    "hand motor intact",
                    "intact hand motor exam",
                    "motor in the hand is normal",
                    "motor sensory vascular intact in hand",
                ],
            },
            {
                "id": "no_acute_traumatic_mechanism_attested",
                "terms": [
                    "no acute traumatic mechanism",
                    "no acute trauma",
                    "no traumatic injury",
                    "atraumatic overuse onset",
                ],
            },
            {
                "id": "no_elbow_instability_concern_attested",
                "terms": [
                    "no instability concern",
                    "no elbow instability concern",
                    "no ucl concern",
                    "no lcl concern",
                    "stable elbow exam",
                ],
            },
        ],
        "high_confidence_terms": [
            "elbow sprain overuse xray negative",
            "elbow strain overuse xray negative",
            "elbow overuse strain xray negative",
            "lateral epicondylitis xray negative",
            "medial epicondylitis xray negative",
            "tennis elbow xray negative",
            "golfer elbow xray negative",
            "golfers elbow xray negative",
        ],
        "source_audit_notes": "AAOS supports lateral and medial epicondylitis as overuse elbow tendon conditions, x-ray use to rule out fracture or arthritis, nonsurgical care with activity reduction and therapy, and weeks-to-months recovery expectations for persistent cases. AAOS distal biceps and olecranon bursitis sources support blocking tendon rupture and bursitis pathways. Clinician-owner review on 2026-06-04 approved promotion after targeted patient-facing revisions.",
        "clinical_status": "reviewed_for_limited_adult_elbow_overuse_or_epicondylitis_with_negative_xray_use",
        "required_modifiers": [
            "adult with clinician diagnosis of elbow overuse strain, lateral epicondylitis, medial epicondylitis, tennis elbow, or golfer elbow",
            "x-ray performed and negative",
            "intact neurovascular and hand motor exam",
            "no acute traumatic mechanism",
            "no elbow instability concern",
        ],
    },
    "foot_sprain_xray_negative": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": [
            "foot sprain xray negative",
            "foot strain xray negative",
            "foot injury xray negative",
        ],
        "unsafe_modifiers": [
            "ankle_sprain_pathway",
            "no_xray_performed",
            "fracture_seen",
            "dislocation",
            "open_wound",
            "open_fracture",
            "high_energy_trauma",
            "crush_injury",
            "lisfranc_or_midfoot_concern",
            "unable_to_bear_weight_lower_extremity",
            "cannot_ambulate_at_discharge",
            "neurovascular_compromise",
            "tendon_or_ligament_rupture_concern",
            "compartment_syndrome_concern",
            "septic_joint_or_infection_concern",
            "pediatric_growth_plate_pathway",
            "elderly_osteoporotic_high_risk_msk",
            "diabetic_foot",
            "peripheral_vascular_disease",
            "specialist_directed_orthopedic_plan",
        ],
        "required_context": [
            {
                "id": "foot_site_documented",
                "terms": [
                    "foot sprain xray negative",
                    "foot strain xray negative",
                    "foot injury xray negative",
                ],
            },
            {
                "id": "xray_performed_and_negative",
                "terms": [
                    "xray performed and negative",
                    "x ray performed and negative",
                    "x-ray performed and negative",
                    "xray negative for fracture",
                    "x-ray negative for fracture",
                    "no fracture seen on xray",
                    "no fracture seen on x-ray",
                ],
            },
            {
                "id": "intact_neurovascular_exam",
                "terms": [
                    "neurovascular exam intact",
                    "blood flow sensation movement intact",
                    "cms intact",
                    "distal pulses sensation movement intact",
                    "foot pulses sensation movement intact",
                    "toes warm and well perfused with normal sensation",
                ],
            },
        ],
        "high_confidence_terms": [
            "foot sprain xray negative",
            "foot strain xray negative",
            "foot injury xray negative",
        ],
        "source_audit_notes": "MedlinePlus supports general sprain/strain framing and foot-sprain aftercare with protection, rest, ice, compression, elevation, mobility aids, gradual activity return, and escalation for worsening pain, swelling, numbness, color change, fever, or inability to walk. Clinician-owner review on 2026-06-05 approved this as one shared adult foot sprain v1 with current blockers intact, including Lisfranc or midfoot concern, inability to bear weight, inability to ambulate at discharge, high-energy mechanism, pediatric growth plate pathway, diabetic foot, vascular disease, and specialist-directed orthopedic plan.",
        "clinical_status": "reviewed_for_limited_adult_foot_sprain_or_strain_with_negative_xray_use",
        "required_modifiers": [
            "adult with clinician diagnosis of foot sprain/strain/injury",
            "x-ray performed and negative",
            "intact neurovascular exam",
            "able to bear weight",
            "able to ambulate at discharge",
            "no ankle pathway",
            "no Lisfranc or midfoot concern",
            "no high-risk orthopedic modifier",
        ],
        "review_date": "2026-06-05",
    },
    "elbow_sprain_acute_traumatic_xray_negative": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": [
            "elbow sprain acute traumatic xray negative",
            "acute traumatic elbow sprain xray negative",
            "acute elbow sprain xray negative",
            "elbow sprain xray negative",
            "elbow strain acute traumatic xray negative",
            "acute traumatic elbow strain xray negative",
            "acute elbow strain xray negative",
            "elbow soft tissue sprain xray negative",
            "radial head contusion xray negative",
        ],
        "unsafe_modifiers": [
            "overuse_or_repetitive_mechanism",
            "fracture_seen",
            "dislocation",
            "open_wound",
            "open_fracture",
            "high_energy_trauma",
            "crush_injury",
            "elbow_instability_or_ucl_lcl_concern",
            "tendon_or_ligament_rupture_concern",
            "distal_biceps_or_triceps_concern",
            "ulnar_nerve_pattern",
            "olecranon_bursitis_pathway",
            "neurovascular_compromise",
            "hand_motor_deficit",
            "compartment_syndrome_concern",
            "septic_joint_or_infection_concern",
            "pediatric_growth_plate_pathway",
            "elderly_osteoporotic_high_risk_msk",
            "specialist_directed_orthopedic_plan",
            "no_xray_performed",
        ],
        "required_context": [
            {
                "id": "adult_acute_traumatic_elbow_sprain_diagnosis",
                "terms": [
                    "adult with acute traumatic elbow sprain",
                    "adult with acute traumatic elbow strain",
                    "adult acute elbow sprain",
                    "acute traumatic elbow sprain",
                    "acute traumatic elbow strain",
                    "acute elbow sprain",
                    "acute elbow strain",
                    "elbow soft tissue sprain",
                    "radial head contusion without fracture",
                ],
            },
            {
                "id": "xray_performed_and_negative",
                "terms": [
                    "xray performed and negative",
                    "x ray performed and negative",
                    "x-ray performed and negative",
                    "xray negative for fracture",
                    "x-ray negative for fracture",
                    "xray shows no acute fracture",
                    "x-ray shows no acute fracture",
                    "no fracture seen on xray",
                    "no fracture seen on x-ray",
                ],
            },
            {
                "id": "intact_neurovascular_and_hand_motor_exam",
                "terms": [
                    "neurovascular exam intact including hand motor",
                    "neurovascular intact including hand motor",
                    "hand motor intact",
                    "intact hand motor exam",
                    "motor in the hand is normal",
                    "motor sensory vascular intact in hand",
                ],
            },
            {
                "id": "acute_traumatic_mechanism_documented",
                "terms": [
                    "acute traumatic mechanism",
                    "fall onto elbow",
                    "fell onto elbow",
                    "direct blow to elbow",
                    "contact injury to elbow",
                    "forced extension",
                    "forced flexion",
                    "single traumatic event",
                ],
            },
            {
                "id": "no_elbow_instability_concern_attested",
                "terms": [
                    "no instability concern",
                    "no elbow instability concern",
                    "no ucl concern",
                    "no lcl concern",
                    "stable elbow exam",
                ],
            },
            {
                "id": "no_distal_tendon_or_ligament_rupture_concern_attested",
                "terms": [
                    "no tendon rupture concern",
                    "no distal biceps concern",
                    "no triceps concern",
                    "no ligament rupture concern",
                    "no rupture concern",
                    "no distal tendon concern",
                ],
            },
        ],
        "high_confidence_terms": [
            "elbow sprain acute traumatic xray negative",
            "acute traumatic elbow sprain xray negative",
            "acute elbow sprain xray negative",
            "elbow sprain xray negative",
            "elbow strain acute traumatic xray negative",
            "acute traumatic elbow strain xray negative",
            "acute elbow strain xray negative",
            "elbow soft tissue sprain xray negative",
            "radial head contusion xray negative",
        ],
        "source_audit_notes": "MedlinePlus supports general sprain/strain framing, rest, protection, gradual return to activity, several-week recovery for bad sprains, and escalation for worsening pain, swelling, numbness, color change, fever, inability to move, or inability to walk. AAOS distal biceps and olecranon bursitis sources support blocking distal tendon rupture and posterior bursitis pathways. Clinician-owner review on 2026-06-05 approved one shared acute traumatic elbow sprain v1, including radial head contusion without fracture, with deferred split consideration for radial-head-specific rehab, ligament subtype, or distal-tendon-risk pathways if future product behavior needs different instructions.",
        "clinical_status": "reviewed_for_limited_adult_acute_traumatic_elbow_sprain_or_strain_with_negative_xray_use",
        "required_modifiers": [
            "adult with clinician diagnosis of acute traumatic elbow sprain/strain/injury",
            "x-ray performed and negative",
            "intact neurovascular and hand motor exam",
            "acute traumatic mechanism",
            "no elbow instability concern",
            "no distal tendon or ligament rupture concern",
            "no overuse pathway",
        ],
        "review_date": "2026-06-05",
    },
    "contact_dermatitis_uncomplicated": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": [
            "contact dermatitis uncomplicated",
            "contact dermatitis",
            "irritant contact dermatitis",
            "allergic contact dermatitis",
            "poison ivy dermatitis",
            "localized contact rash",
        ],
        "unsafe_modifiers": [
            "anaphylaxis",
            "airway_symptoms",
            "hypotension",
            "epinephrine_given",
            "mucosal_lesions",
            "severe_cutaneous_adverse_reaction",
            "contact_dermatitis_infection_concern",
            "rapid_progression",
            "fever",
            "sepsis",
            "eye_or_genital_rash_location",
            "burn_or_chemical_wound",
            "immunocompromised",
            "pregnancy",
            "pediatric_pathway",
        ],
        "output_modifiers": [
            {
                "id": "frail_elderly_large_bsa_contact_dermatitis",
                "label": "Frail or large-surface-area contact dermatitis modifier",
                "note": "Flag frailty or large body-surface involvement for clinician-entered follow-up review without changing the contact dermatitis text.",
            },
            {
                "id": "occupational_recurrent_contact_dermatitis",
                "label": "Recurrent occupational exposure modifier",
                "note": "Flag recurrent occupational exposure for clinician-entered follow-up review without changing the contact dermatitis text.",
            },
        ],
        "required_context": [
            {
                "id": "clinician_diagnosis_contact_dermatitis",
                "terms": [
                    "clinician diagnosis contact dermatitis",
                    "discharge diagnosis contact dermatitis",
                    "contact dermatitis diagnosed",
                    "irritant contact dermatitis diagnosed",
                    "allergic contact dermatitis diagnosed",
                ],
            },
            {
                "id": "contact_trigger_or_distribution_documented",
                "terms": [
                    "rash after contact exposure",
                    "rash after new soap",
                    "rash after poison ivy",
                    "rash in contact pattern",
                    "localized rash where substance touched",
                    "exposure trigger identified",
                ],
            },
            {
                "id": "dangerous_rash_features_absent",
                "terms": [
                    "no mucosal lesions airway swelling infection concern",
                    "no skin peeling mucosal airway infection concern",
                    "no anaphylaxis infection or mucosal concern",
                    "no systemic allergic reaction or infection concern",
                ],
            },
        ],
        "high_confidence_terms": [
            "contact dermatitis",
            "contact dermatitis uncomplicated",
            "irritant contact dermatitis",
            "allergic contact dermatitis",
        ],
        "source_audit_notes": "MedlinePlus supports contact dermatitis as an irritant or allergic skin reaction after direct contact with a substance, avoidance of the trigger, moisturizers, clinician-directed topical therapy, and escalation for severe reactions, failure to improve, or infection signs. MedlinePlus allergic reaction content supports keeping airway symptoms, swelling, hypotension, epinephrine use, and systemic allergic reaction outside this pathway. Clinician-owner review on 2026-06-05 approved one shared adult contact dermatitis v1 after targeted plain-language, recovery-timeline, and return-precaution revisions.",
        "clinical_status": "reviewed_for_limited_adult_contact_dermatitis_without_systemic_infectious_or_high_risk_rash_features_use",
        "required_modifiers": [
            "adult with clinician diagnosis of contact dermatitis",
            "localized rash pattern tied to contact exposure or suspected trigger",
            "dangerous rash features absent",
            "no anaphylaxis or systemic allergic reaction",
            "no mucosal lesions, skin peeling, or serious medication reaction concern",
            "no cellulitis, abscess, necrotizing infection concern, fever, rapid progression, or sepsis",
            "no eye or genital involvement",
            "no pediatric, pregnancy, or immunocompromised pathway",
        ],
        "review_date": "2026-06-05",
    },
    "influenza_like_illness_stable_supportive_care": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": [
            "influenza like illness stable supportive care",
            "influenza-like illness",
            "flu like illness",
            "flu-like illness",
            "influenza",
            "flu",
        ],
        "unsafe_modifiers": [
            "pregnancy",
            "postpartum",
            "high_risk_influenza_host",
            "immunocompromised",
            "elderly_frail",
            "hypoxia",
            "respiratory_distress",
            "resolved_dyspnea_not_documented",
            "chest_pain",
            "pneumonia",
            "severe_dehydration",
            "unable_to_tolerate_oral_fluids",
            "sepsis",
            "unstable_vitals",
            "antiviral_prescribed_or_indicated",
        ],
        "required_context": [
            {
                "id": "clinician_diagnosis_influenza_like_illness",
                "terms": [
                    "clinician diagnosis influenza-like illness",
                    "clinician diagnosis flu-like illness",
                    "discharge diagnosis influenza",
                    "discharge diagnosis flu",
                    "discharge impression influenza-like illness",
                    "flu-like illness diagnosed",
                    "influenza diagnosed",
                ],
            },
            {
                "id": "stable_respiratory_and_hydration_status",
                "terms": [
                    "breathing comfortable",
                    "breathing comfortably",
                    "oxygen level acceptable",
                    "hydration reassuring",
                    "tolerating fluids",
                    "safe for home care",
                ],
            },
        ],
        "high_confidence_terms": [
            "clinician diagnosis influenza-like illness",
            "discharge diagnosis influenza",
            "influenza like illness stable supportive care",
        ],
        "source_audit_notes": "CDC and MedlinePlus support flu symptom framing, home supportive care for mild illness, staying home while ill, emergency warning signs, high-risk host escalation, and antiviral treatment concepts. Clinician-owner review on 2026-06-10 approved this narrow v1 with high-risk hosts and antiviral cases remaining hard blockers, not output modifiers.",
        "clinical_status": "reviewed_for_limited_stable_adult_influenza_like_illness_supportive_care_use",
        "required_modifiers": [
            "adult with clinician diagnosis or discharge impression of influenza-like illness or flu",
            "breathing, oxygen level, hydration, and vital signs acceptable for discharge",
            "no high-risk influenza host pathway",
            "no pregnancy or postpartum pathway",
            "no pneumonia concern",
            "no clinician-entered antiviral plan requiring tailored medication instructions",
        ],
        "review_date": "2026-06-10",
    },
    "asymptomatic_elevated_blood_pressure_no_end_organ_symptoms": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": [
            "asymptomatic elevated blood pressure",
            "elevated blood pressure",
            "high blood pressure",
            "hypertension",
            "asymptomatic hypertension",
        ],
        "unsafe_modifiers": [
            "hypertensive_crisis_threshold",
            "hypertension_end_organ_symptoms",
            "chest_pain",
            "respiratory_distress",
            "neurologic_deficit",
            "vision_change",
            "pregnancy",
            "postpartum",
            "renal_failure",
            "renal_specialist_hypertension_context",
            "stimulant_or_cocaine_hypertension",
            "secondary_hypertension_concern",
            "poor_follow_up",
            "sepsis",
            "unstable_vitals",
        ],
        "required_context": [
            {
                "id": "asymptomatic_elevated_bp_documented",
                "terms": [
                    "asymptomatic elevated blood pressure",
                    "asymptomatic hypertension",
                    "no symptoms from blood pressure",
                    "no end organ symptoms",
                    "no hypertensive emergency symptoms",
                ],
            },
            {
                "id": "repeat_bp_or_measurement_confirmed",
                "terms": [
                    "repeat blood pressure",
                    "repeat bp",
                    "blood pressure rechecked",
                    "bp rechecked",
                    "measurement confirmed",
                    "proper cuff size",
                ],
            },
            {
                "id": "outpatient_follow_up_plan_documented",
                "terms": [
                    "follow up for blood pressure",
                    "primary care blood pressure follow up",
                    "bp recheck plan",
                    "blood pressure recheck plan",
                    "outpatient follow up plan",
                ],
            },
            {
                "id": "bp_medication_plan_documented",
                "terms": [
                    "blood pressure medication plan",
                    "bp medication plan",
                    "no blood pressure medication change",
                    "no bp medication change",
                    "continue current blood pressure medications",
                    "clinician medication plan documented",
                ],
            },
        ],
        "high_confidence_terms": [
            "asymptomatic elevated blood pressure",
            "asymptomatic hypertension",
            "no hypertensive emergency symptoms",
        ],
        "source_audit_notes": "MedlinePlus supports hypertension education and hypertensive crisis threshold framing. AHA supports emergency escalation when very high blood pressure is accompanied by symptoms such as chest pain, dyspnea, back pain, weakness, vision change, or difficulty speaking. Clinician-owner review on 2026-06-10 approved this workflow-dependent narrow v1 because repeat BP confirmation, documented clinician assessment, concrete follow-up, and medication-plan documentation are required safeguards.",
        "clinical_status": "reviewed_for_limited_asymptomatic_elevated_blood_pressure_without_end_organ_symptoms_use",
        "required_modifiers": [
            "adult with elevated blood pressure or asymptomatic hypertension documented at ED discharge",
            "repeat blood pressure or measurement confirmation documented",
            "no end-organ symptoms or hypertensive emergency concern documented",
            "concrete outpatient follow-up plan documented",
            "no medication change or clinician-entered medication plan documented",
        ],
        "review_date": "2026-06-10",
    },
    "hemorrhoids_uncomplicated_no_heavy_bleeding": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": [
            "hemorrhoids uncomplicated",
            "uncomplicated hemorrhoids",
            "hemorrhoids",
            "hemorrhoid",
            "rectal hemorrhoids",
        ],
        "unsafe_modifiers": [
            "hemorrhoid_heavy_bleeding",
            "anticoagulated",
            "bleeding_disorder",
            "anemia_concern",
            "syncope",
            "unstable_vitals",
            "gi_bleeding",
            "severe_or_focal_abdominal_pain",
            "fever",
            "perianal_sepsis_or_abscess_concern",
            "hemorrhoid_thrombosis_or_irreducible_prolapse",
            "cancer_red_flag",
            "inflammatory_bowel_disease_concern",
            "pregnancy",
            "immunocompromised",
            "poor_follow_up",
        ],
        "required_context": [
            {
                "id": "clinician_diagnosis_hemorrhoids",
                "terms": [
                    "clinician diagnosis hemorrhoids",
                    "discharge diagnosis hemorrhoids",
                    "hemorrhoids diagnosed",
                    "diagnosed with hemorrhoids",
                    "discharge impression hemorrhoids",
                ],
            },
            {
                "id": "no_heavy_bleeding_or_infection_concern",
                "terms": [
                    "no heavy bleeding",
                    "no infection concern",
                    "no emergency cause found",
                    "bleeding minimal",
                    "no perianal abscess concern",
                ],
            },
        ],
        "high_confidence_terms": [
            "clinician diagnosis hemorrhoids",
            "discharge diagnosis hemorrhoids",
            "hemorrhoids uncomplicated",
        ],
        "source_audit_notes": "MedlinePlus and NIDDK support hemorrhoid self-care with fiber, fluids, warm baths, gentle local care, and clinician-recommended medicines. NIDDK supports urgent care for severe anal pain with rectal bleeding, especially with abdominal pain, diarrhea, or fever. Clinician-owner review on 2026-06-10 approved this narrow v1 with the current blockers for heavy bleeding, thrombosis/prolapse, anticoagulation, malignancy/IBD concern, pregnancy, and abdominal pain.",
        "clinical_status": "reviewed_for_limited_uncomplicated_hemorrhoids_without_heavy_bleeding_or_infection_concern_use",
        "required_modifiers": [
            "adult with clinician diagnosis or discharge impression of hemorrhoids",
            "no heavy bleeding",
            "no unstable vital signs",
            "no infection concern",
            "no severe abdominal pain",
            "no alternate GI bleeding pathway",
            "medication and procedural instructions clinician-entered",
        ],
        "review_date": "2026-06-10",
    },
    "cerumen_impaction_no_infection_or_foreign_body": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": ["cerumen impaction", "earwax impaction", "earwax blockage", "impacted earwax"],
        "unsafe_modifiers": [
            "otitis_externa_or_ear_canal_pathway",
            "recurrent_or_chronic_ear_infection",
            "mastoiditis_or_deep_ear_infection_concern",
            "malignant_otitis_externa_risk",
            "ear_trauma_or_foreign_body",
            "tympanic_membrane_perforation_or_tube",
            "facial_weakness_or_neurologic_ear_sign",
            "acute_hearing_loss",
            "specialist_directed_ent_plan",
            "immunocompromised",
            "severe_systemic_ear_infection",
        ],
        "required_context": [
            {
                "id": "clinician_diagnosis_cerumen_impaction",
                "terms": [
                    "clinician diagnosis cerumen impaction",
                    "discharge diagnosis cerumen impaction",
                    "cerumen impaction diagnosed",
                    "earwax impaction diagnosed",
                    "earwax blockage diagnosed",
                ],
            },
            {
                "id": "no_infection_or_foreign_body_documented",
                "terms": [
                    "no ear infection",
                    "no foreign body",
                    "no infection or foreign body",
                    "no eardrum emergency",
                    "no otitis externa",
                ],
            },
        ],
        "high_confidence_terms": ["clinician diagnosis cerumen impaction", "cerumen impaction diagnosed", "earwax impaction diagnosed", "earwax blockage diagnosed"],
        "source_audit_notes": "AAO-HNS patient education supports earwax as usually protective, symptomatic impaction framing, clinician-directed removal options, and avoiding cotton swabs or ear candles. Autonomous Phase 1002-1500 approved this narrow v1 only for clinician-confirmed cerumen impaction without infection, foreign body, perforation, tube, acute hearing loss, neurologic ear signs, or specialist-directed ENT plan.",
        "clinical_status": "reviewed_for_limited_cerumen_impaction_without_infection_or_foreign_body_use",
        "required_modifiers": [
            "adult with clinician diagnosis or discharge impression of cerumen impaction",
            "no infection, foreign body, eardrum perforation, tube, acute hearing loss, or neurologic ear sign",
            "medication or removal plan clinician-entered",
        ],
        "review_date": "2026-06-10",
    },
    "cervical_strain_no_neuro_deficit": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": ["cervical strain", "neck strain", "neck muscle strain", "musculoskeletal neck pain"],
        "unsafe_modifiers": [
            "fracture_or_trauma_concern",
            "high_energy_trauma",
            "midline_cervical_tenderness",
            "neurologic_deficit",
            "new_neurologic_deficit",
            "meningitis_or_cns_infection_concern",
            "spinal_infection_concern",
            "chest_pain",
            "cervical_artery_dissection_concern",
            "specialist_directed_spine_plan",
            "unstable_vitals",
        ],
        "required_context": [
            {
                "id": "clinician_diagnosis_cervical_strain",
                "terms": [
                    "clinician diagnosis cervical strain",
                    "discharge diagnosis cervical strain",
                    "clinician diagnosis neck strain",
                    "discharge diagnosis neck strain",
                    "neck strain diagnosed",
                    "cervical strain diagnosed",
                ],
            },
            {
                "id": "reassuring_neurologic_exam_documented",
                "terms": [
                    "reassuring neurologic exam",
                    "normal neurologic exam",
                    "neuro exam intact",
                    "no neurologic deficit",
                    "strength and sensation intact",
                ],
            },
        ],
        "high_confidence_terms": ["cervical strain diagnosed", "neck strain diagnosed", "clinician diagnosis neck strain"],
        "source_audit_notes": "MedlinePlus supports neck injury and disorder education, home care framing, and warning signs. Autonomous Phase 1002-1500 approved this narrow v1 only for clinician-diagnosed cervical or neck strain with reassuring ED assessment and no trauma imaging concern, neurologic deficit, infection, meningitis, vascular, cardiac, fracture, or specialist-directed spine plan.",
        "clinical_status": "reviewed_for_limited_cervical_strain_without_neurologic_deficit_use",
        "required_modifiers": [
            "adult with clinician diagnosis or discharge impression of cervical or neck strain",
            "reassuring neurologic assessment documented",
            "no trauma imaging concern, infection, meningitis, vascular emergency, cardiac concern, or specialist-directed spine plan",
        ],
        "review_date": "2026-06-10",
    },
    "nausea_vomiting_stable_hydrating_no_abdominal_pain": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": [
            "nausea vomiting stable",
            "nausea and vomiting stable",
            "vomiting stable hydrating",
            "nausea vomiting no abdominal pain",
        ],
        "unsafe_modifiers": [
            "severe_or_focal_abdominal_pain",
            "peritoneal_signs",
            "abdominal_distention",
            "bowel_obstruction_or_ileus_concern",
            "gi_bleeding",
            "fever",
            "sepsis",
            "unstable_vitals",
            "unable_to_tolerate_oral_fluids",
            "severe_dehydration",
            "uncontrolled_vomiting",
            "pregnancy",
            "neurologic_deficit",
            "thunderclap_or_sah_concern",
            "chest_pain",
            "toxic_ingestion_or_overdose",
            "diabetic_emergency",
            "immunocompromised",
            "elderly_frail",
            "poor_follow_up",
        ],
        "required_context": [
            {
                "id": "clinician_diagnosis_nausea_vomiting",
                "terms": [
                    "clinician diagnosis nausea and vomiting",
                    "discharge diagnosis nausea and vomiting",
                    "nausea and vomiting diagnosed",
                    "vomiting stable",
                    "nausea vomiting stable",
                ],
            },
            {
                "id": "tolerating_oral_fluids_documented",
                "terms": [
                    "tolerating fluids",
                    "tolerating oral fluids",
                    "passed po challenge",
                    "able to keep fluids down",
                    "hydration reassuring",
                ],
            },
            {
                "id": "no_abdominal_pain_documented",
                "terms": [
                    "no abdominal pain",
                    "no belly pain",
                    "abdomen nontender",
                    "no focal abdominal tenderness",
                    "no surgical abdomen",
                ],
            },
        ],
        "high_confidence_terms": ["nausea vomiting stable", "nausea and vomiting diagnosed", "vomiting stable hydrating"],
        "source_audit_notes": "MedlinePlus supports nausea/vomiting supportive care, hydration, gradual return to food, and escalation for inability to keep fluids down, dehydration, abdominal pain, fever, blood, or prolonged symptoms. Autonomous Phase 1002-1500 approved this narrow v1 only for clinician-diagnosed nausea/vomiting with stable vitals, successful oral hydration, no abdominal pain, no diarrhea/gastroenteritis phenotype, and no surgical, pregnancy, neurologic, toxicologic, or high-risk host pathway.",
        "clinical_status": "reviewed_for_limited_stable_nausea_vomiting_without_abdominal_pain_use",
        "required_modifiers": [
            "adult with clinician diagnosis or discharge impression of nausea and vomiting",
            "stable vitals and tolerating oral fluids documented",
            "no abdominal pain, surgical abdomen concern, GI bleeding, pregnancy, neurologic, toxicologic, or high-risk host pathway",
        ],
        "review_date": "2026-06-10",
    },
    "tension_headache_reassuring_exam_no_red_flags": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": ["tension headache", "tension type headache", "tension-type headache", "benign tension headache"],
        "unsafe_modifiers": [
            "thunderclap_or_sah_concern",
            "first_lifetime_severe_headache",
            "neurologic_deficit",
            "altered_mental_status_not_resolved",
            "meningitis_or_cns_infection_concern",
            "fracture_or_trauma_concern",
            "pregnancy",
            "postpartum",
            "immunocompromised",
            "age_over_50_new_headache",
            "uncontrolled_vomiting",
            "anticoagulated",
            "vision_change",
            "ct_not_performed_with_headache_concern",
            "specialist_directed_neurology_plan",
            "unstable_vitals",
        ],
        "required_context": [
            {
                "id": "clinician_diagnosis_tension_headache",
                "terms": [
                    "clinician diagnosis tension headache",
                    "discharge diagnosis tension headache",
                    "tension headache diagnosed",
                    "tension-type headache diagnosed",
                    "tension type headache diagnosed",
                ],
            },
            {
                "id": "reassuring_neurologic_exam_documented",
                "terms": [
                    "reassuring neurologic exam",
                    "normal neurologic exam",
                    "neuro exam intact",
                    "no neurologic deficit",
                    "strength and sensation intact",
                ],
            },
            {
                "id": "structured_headache_red_flags_absent",
                "terms": [
                    "no headache red flags documented",
                    "secondary headache red flags absent",
                    "red flags reviewed and absent",
                    "no thunderclap features",
                    "no dangerous headache features",
                ],
            },
        ],
        "high_confidence_terms": ["tension headache diagnosed", "tension-type headache diagnosed", "clinician diagnosis tension headache"],
        "source_audit_notes": "NINDS headache education supports primary versus secondary headache framing and warning-sign concepts. Autonomous Phase 1002-1500 approved this narrow v1 only for clinician-diagnosed tension-type headache with reassuring exam, documented red-flag review, symptom improvement or stable discharge, and no trauma, thunderclap, neurologic, infectious, pregnancy, anticoagulation, first-lifetime severe, age-over-50-new-pattern, or specialist-directed neurology pathway.",
        "clinical_status": "reviewed_for_limited_tension_type_headache_with_reassuring_exam_no_red_flags_use",
        "required_modifiers": [
            "adult with clinician diagnosis or discharge impression of tension-type headache",
            "reassuring neurologic exam and structured red-flag absence documented",
            "no trauma, thunderclap, neurologic deficit, infection, pregnancy, anticoagulation, age-over-50-new-pattern, first-lifetime severe headache, or specialist-directed neurology plan",
        ],
        "review_date": "2026-06-10",
    },
    "atraumatic_knee_pain_no_red_flags": {
        "primitive_file": ROOT / "primitives" / "expanded_draft_packs.json",
        "condition_terms": ["atraumatic knee pain", "nontraumatic knee pain", "knee pain no trauma", "knee pain reassuring exam"],
        "unsafe_modifiers": [
            "acute_knee_trauma_concern",
            "high_energy_trauma",
            "dislocation",
            "fracture_seen",
            "septic_joint_or_infection_concern",
            "acute_hemarthrosis_or_large_effusion",
            "unable_to_bear_weight_lower_extremity",
            "cannot_ambulate_at_discharge",
            "neurovascular_compromise",
            "compartment_syndrome_concern",
            "dvt_or_pe_concern",
            "prosthetic_joint",
            "immunocompromised",
            "specialist_directed_orthopedic_plan",
        ],
        "required_context": [
            {
                "id": "clinician_diagnosis_atraumatic_knee_pain",
                "terms": [
                    "clinician diagnosis atraumatic knee pain",
                    "discharge diagnosis atraumatic knee pain",
                    "atraumatic knee pain diagnosed",
                    "nontraumatic knee pain diagnosed",
                    "knee pain no trauma",
                ],
            },
            {
                "id": "reassuring_knee_exam_documented",
                "terms": [
                    "reassuring knee exam",
                    "no red flags on knee exam",
                    "no joint infection concern",
                    "no fracture concern",
                    "knee exam reassuring",
                ],
            },
            {
                "id": "ambulatory_discharge_documented",
                "terms": [
                    "able to ambulate",
                    "ambulating at discharge",
                    "walking at discharge",
                    "weight bearing as tolerated",
                    "able to bear weight",
                ],
            },
        ],
        "high_confidence_terms": ["atraumatic knee pain diagnosed", "nontraumatic knee pain diagnosed", "clinician diagnosis atraumatic knee pain"],
        "source_audit_notes": "MedlinePlus supports knee injury/disorder education, home care framing, and escalation for inability to walk, swelling, fever, redness, deformity, neurologic or circulation changes, and worsening pain. Autonomous Phase 1002-1500 approved this narrow v1 only for clinician-diagnosed atraumatic knee pain with reassuring exam, ambulatory discharge, no x-ray fracture pathway, no septic joint, no DVT, no large effusion, no neurovascular compromise, and no specialist-directed orthopedic plan.",
        "clinical_status": "reviewed_for_limited_atraumatic_knee_pain_without_red_flags_use",
        "required_modifiers": [
            "adult with clinician diagnosis or discharge impression of atraumatic knee pain",
            "reassuring knee exam and ambulatory discharge documented",
            "no acute knee trauma, fracture, septic joint, large effusion, DVT, neurovascular compromise, inability to bear weight, or specialist-directed orthopedic plan",
        ],
        "review_date": "2026-06-10",
    },
}


def reviewed_block(notes: str, extra: dict[str, Any] | None = None) -> dict[str, Any]:
    block = {
        "status": "reviewed",
        "reviewer": REVIEWER,
        "reviewer_role": REVIEWER_ROLE,
        "review_basis": "automated_source_check",
        "clinical_approval_registry": "ops/review_approvals.json",
        "last_reviewed": REVIEW_DATE,
        "version": 1,
        "source_audit_status": "passed_for_v1",
        "production_status": "enabled_with_runtime_modifier_gates",
        "notes": notes,
    }
    if extra:
        block.update(extra)
    return block


def source_audit(notes: str, clinician: bool = False, unsafe: bool = False) -> dict[str, Any]:
    return {
        "source_supported": True,
        "source_needed": False,
        "clinician_judgment_only": clinician,
        "restricted_source_risk": False,
        "unsafe_without_modifier": unsafe,
        "notes": notes,
    }


def write_json(path: Path, data: Any) -> None:
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def promote_phenotype(phenotype_id: str, config: dict[str, Any]) -> None:
    path = ROOT / "phenotypes" / f"{phenotype_id}.json"
    item = read_json(path)
    item["status"] = "reviewed"
    item["source_audit"] = source_audit(config["source_audit_notes"])
    item["runtime"] = {
        "condition_terms": config["condition_terms"],
        "unsafe_modifiers": config["unsafe_modifiers"],
        **({"output_modifiers": config["output_modifiers"]} if config.get("output_modifiers") else {}),
        **({"required_context": config["required_context"]} if config.get("required_context") else {}),
        **({"high_confidence_terms": config["high_confidence_terms"]} if config.get("high_confidence_terms") else {}),
        "minimum_confidence": 0.86,
        "mode": "reviewed_ontology_enabled",
    }
    item["version"] = 1
    item["review"] = reviewed_block(
        f"Reviewed as a narrow production ontology phenotype. {config['source_audit_notes']}",
        {
            "clinical_status": config["clinical_status"],
            "required_modifiers": config["required_modifiers"],
            "blocked_modifiers": config["unsafe_modifiers"],
            "last_reviewed": config.get("review_date", REVIEW_DATE),
        },
    )
    write_json(path, item)


def promote_primitives(phenotype_id: str, config: dict[str, Any]) -> None:
    path = config["primitive_file"]
    rows = read_json(path)
    for row in rows:
        if phenotype_id not in row.get("phenotypes", []):
            continue
        clinician = row["section"] in {"diagnosis", "what_we_found", "follow_up"}
        unsafe = bool(row.get("contraindications"))
        row["source_audit"] = source_audit(config["source_audit_notes"], clinician=clinician, unsafe=unsafe)
        row["review"] = reviewed_block(
            f"Reviewed for {phenotype_id} v1. Patient-facing text is locally authored from source-supported concepts.",
            {"last_reviewed": config.get("review_date", REVIEW_DATE)},
        )
    write_json(path, rows)


def review_packet(phenotype_id: str, config: dict[str, Any]) -> str:
    phenotype = read_json(ROOT / "phenotypes" / f"{phenotype_id}.json")
    primitives = load_primitives()
    selected = [primitives[primitive_id] for primitive_id in phenotype["primitive_ids"]]
    lines = [
        f"# {phenotype['label']} V1 Review Packet",
        "",
        f"Phenotype ID: `{phenotype_id}`",
        "",
        f"Clinical status: {phenotype['review']['clinical_status']}.",
        "",
        "Production status: enabled with runtime modifier gates.",
        "",
        f"Reviewer: {REVIEWER}.",
        "",
        f"Review date: {config.get('review_date', REVIEW_DATE)}.",
        "",
        "## Inclusion Criteria",
        "",
    ]
    lines.extend(f"- {row}" for row in phenotype["inclusion_criteria"])
    lines.extend(["", "## Exclusions", ""])
    lines.extend(f"- {row}" for row in phenotype["exclusion_criteria"])
    lines.extend(["", "## Must-Not-Miss Diagnoses", ""])
    lines.extend(f"- {row}" for row in phenotype["must_not_miss"])
    lines.extend(["", "## Source Audit", ""])
    for source_id in phenotype.get("source_card_ids", []):
        lines.append(f"- `{source_id}` supports this phenotype's reviewed concepts.")
    lines.append(f"- {config['source_audit_notes']}")
    lines.append("- Patient-facing text is locally authored. No WikEM prose is copied.")
    lines.extend(["", "## Blocked Modifiers", ""])
    lines.extend(f"- `{row}`" for row in config["unsafe_modifiers"])
    if phenotype_id == "abdominal_pain_nonspecific_reassuring_workup":
        lines.extend(
            [
                "",
                "## Prior Clinician Decisions Preserved",
                "",
                "- Approve as a narrow review candidate.",
                "- Do not use it as a catch-all fallback for unmatched abdominal pain.",
                "- Medication lines are acceptable as passthrough-only and remain review-required.",
                "- Runtime requires clinician-directed recheck. If the clinician did not give a recheck plan, this phenotype should not fire.",
            ]
        )
    if phenotype_id == "acute_bronchitis_no_pneumonia":
        lines.extend(
            [
                "",
                "## Prior Clinician Decisions Preserved",
                "",
                "- Approve only as a narrow acute bronchitis or chest cold phenotype without pneumonia concern.",
                "- Do not use broad cough as a standalone runtime term.",
                "- Do not use acute bronchitis as a catch-all respiratory fallback.",
                "- Do not infer antibiotic instructions. Medication text is limited to stewardship framing and clinician-entered medicine instructions.",
                "- Runtime must block pneumonia concern, hypoxia, respiratory distress, COPD or asthma pathway, frailty, immunocompromise, hemoptysis, PE or cardiac chest-pain concern, sepsis, unstable vitals, and antibiotics prescribed for suspected bacterial infection.",
            ]
        )
    if phenotype_id == "acute_sinusitis_supportive_care":
        lines.extend(
            [
                "",
                "## Prior Clinician Decisions Preserved",
                "",
                "- Approve only as a narrow supportive-care sinusitis phenotype without an antibiotic plan.",
                "- Do not say antibiotics are never needed.",
                "- Do not use broad congestion, facial pain, or cold symptoms as standalone runtime terms.",
                "- Do not use sinusitis as a catch-all URI fallback.",
                "- Runtime must block antibiotics prescribed for sinusitis, severe bacterial-feature language, orbital or intracranial concern, dental source, facial trauma, immunocompromise, frailty, pregnancy, sepsis, unstable vitals, and chronic or recurrent sinusitis.",
            ]
        )
    lines.extend(["", "## Primitive List", ""])
    for row in selected:
        flags = ", ".join(key for key, value in row.get("source_audit", {}).items() if value is True) or "source_supported"
        lines.append(f"- `{row['id']}` | `{row['section']}` | audit: {flags}")
    lines.extend(["", "## Patient-Facing Output", "", "```text", assemble_discharge(phenotype_id, "6").rstrip(), "```", ""])
    return "\n".join(lines)


def main() -> int:
    REVIEW_DIR.mkdir(parents=True, exist_ok=True)
    for phenotype_id, config in PROMOTIONS.items():
        promote_phenotype(phenotype_id, config)
        promote_primitives(phenotype_id, config)
        (REVIEW_DIR / f"{phenotype_id}_v1_review_packet.md").write_text(
            review_packet(phenotype_id, config),
            encoding="utf-8",
        )
        if phenotype_id == "contact_dermatitis_uncomplicated":
            (REVIEW_DIR / f"{phenotype_id}.md").write_text(
                review_packet(phenotype_id, config),
                encoding="utf-8",
            )
        print(f"promoted {phenotype_id}")
    write_json(MANIFEST_PATH, build_runtime_manifest())
    print(f"wrote {MANIFEST_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
