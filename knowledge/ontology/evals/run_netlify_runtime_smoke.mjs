import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { classifyOntology } from '../../../netlify/functions/ontology-runtime.js';

const cases = JSON.parse(
  readFileSync(join('knowledge', 'ontology', 'evals', 'phase14_checkpoint_runtime_cases.json'), 'utf8'),
)
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase20_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase23_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase31_acute_bronchitis_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase32_acute_bronchitis_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase38_acute_sinusitis_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase39_acute_sinusitis_stress_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase43_acute_sinusitis_post_promotion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase47_conjunctivitis_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase48_conjunctivitis_stress_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase52_conjunctivitis_boundary_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase58_otitis_externa_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase59_otitis_externa_stress_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase62_otitis_externa_boundary_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase68_epistaxis_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase69_epistaxis_stress_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase74_migraine_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase75_migraine_stress_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase77_migraine_boundary_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase151_broad_chief_complaint_stress_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase156_acute_otitis_media_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase157_acute_otitis_media_stress_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase163_acute_otitis_media_second_stress_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase169_broad_ear_complaint_stress_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase175_suture_wound_check_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase176_suture_wound_check_stress_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase193_broad_wound_complaint_stress_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase202_215_reviewed_revision_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase217_sprain_site_stress_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase302_350_wrist_sprain_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase371_390_elbow_overuse_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase391_420_elbow_overuse_review_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase421_450_elbow_overuse_hardening_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase481_510_foot_sprain_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase532_550_elbow_acute_traumatic_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase551_600_elbow_review_queue_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase602_650_wound_reviewed_stress_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase651_700_contact_dermatitis_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase701_750_contact_dermatitis_promotion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase801_850_urticaria_split_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase851_constipation_promotion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase1002_1500_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase1501_1550_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase1551_1600_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase1601_1650_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase1651_1700_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase1701_1750_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase1751_1800_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase1801_1850_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase1851_1900_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase1901_2000_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase2001_2100_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase2101_2200_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase2201_2300_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase2301_2400_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase2401_2500_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase2501_2600_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase2601_2700_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase2701_2800_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase2801_2900_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase2901_3000_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase3001_3250_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase3251_3500_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase3501_3750_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase3751_4000_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase4001_4250_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase4251_4500_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase4501_4750_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase4751_5000_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase5001_5250_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase5251_5500_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase5501_5750_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase5751_6000_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase6001_6250_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase6251_6500_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase6501_6750_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase6751_7000_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase7001_7250_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase7251_7500_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase7501_7750_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase7751_8000_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase8001_8250_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase8251_8500_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase8501_8750_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase8751_9000_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase9001_9250_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase9251_9500_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase9501_9750_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase9751_10000_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase10001_10250_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase10251_10500_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase10501_10750_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase10751_11000_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase11001_11250_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase11251_11500_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase11501_11750_library_expansion_runtime_cases.json'), 'utf8')))
  .concat(JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'phase11751_12000_library_expansion_runtime_cases.json'), 'utf8')))
  .filter(
    (item) =>
      item.id.startsWith('phase14_netlify_smoke_') ||
      item.id.startsWith('phase20_netlify_smoke_') ||
      item.id.startsWith('phase20_aom_') ||
      item.id.startsWith('phase20_skin_avulsion_') ||
      item.id.startsWith('phase20_suture_wound_check_') ||
      item.id.startsWith('phase20_bronchitis_') ||
      item.id.startsWith('phase20_sinusitis_') ||
      item.id.startsWith('phase20_sprain_strain_knee_or_shoulder_') ||
      item.id.startsWith('phase20_elbow_overuse_') ||
      item.id.startsWith('phase20_elbow_acute_traumatic_') ||
      item.id.startsWith('phase20_foot_sprain_') ||
      item.id.startsWith('phase20_seborrheic_dermatitis_') ||
      item.id.startsWith('phase20_tinea_corporis_') ||
      item.id.startsWith('phase20_ingrown_toenail_') ||
      item.id.startsWith('phase20_aphthous_ulcer_') ||
      item.id.startsWith('phase20_insect_bite_') ||
      item.id.startsWith('phase20_paronychia_') ||
      item.id.startsWith('phase20_scabies_') ||
      item.id.startsWith('phase20_shingles_') ||
      item.id.startsWith('phase20_stye_') ||
      item.id.startsWith('phase20_impetigo_') ||
      item.id.startsWith('phase20_folliculitis_') ||
      item.id.startsWith('phase20_sunburn_') ||
      item.id.startsWith('phase20_blepharitis_') ||
      item.id.startsWith('phase20_bedbug_bites_') ||
      item.id.startsWith('phase20_molluscum_') ||
      item.id.startsWith('phase20_chalazion_') ||
      item.id.startsWith('phase20_tinea_pedis_') ||
      item.id.startsWith('phase20_eczema_') ||
      item.id.startsWith('phase20_oral_herpes_') ||
      item.id.startsWith('phase20_heat_rash_') ||
      item.id.startsWith('phase20_allergic_rhinitis_') ||
      item.id.startsWith('phase20_plantar_wart_') ||
      item.id.startsWith('phase20_corn_callus_') ||
      item.id.startsWith('phase20_acne_') ||
      item.id.startsWith('phase20_dry_skin_') ||
      item.id.startsWith('phase20_head_lice_') ||
      item.id.startsWith('phase20_tinea_cruris_') ||
      item.id.startsWith('phase20_tinea_versicolor_') ||
      item.id.startsWith('phase20_pityriasis_rosea_') ||
      item.id.startsWith('phase20_contusion_') ||
      item.id.startsWith('phase20_diarrhea_') ||
      item.id.startsWith('phase20_laryngitis_') ||
      item.id.startsWith('phase20_plantar_fasciitis_') ||
      item.id.startsWith('phase20_minor_burn_') ||
      item.id.startsWith('phase20_muscle_strain_') ||
      item.id.startsWith('phase20_friction_blister_') ||
      item.id.startsWith('phase20_ganglion_cyst_') ||
      item.id.startsWith('phase20_bunion_') ||
      item.id.startsWith('phase20_tendinitis_') ||
      item.id.startsWith('phase20_bursitis_') ||
      item.id.startsWith('phase20_osteoarthritis_') ||
      item.id.startsWith('phase20_costochondritis_') ||
      item.id.startsWith('phase20_trigger_finger_') ||
      item.id.startsWith('phase20_minor_nail_injury_') ||
      item.id.startsWith('phase20_tmj_pain_') ||
      item.id.startsWith('phase20_finger_sprain_') ||
      item.id.startsWith('phase20_toe_sprain_') ||
      item.id.startsWith('phase20_rib_contusion_') ||
      item.id.startsWith('phase20_shoulder_tendinitis_') ||
      item.id.startsWith('phase20_wrist_tendinitis_') ||
      item.id.startsWith('phase20_puncture_wound_') ||
      item.id.startsWith('phase20_splinter_removed_') ||
      item.id.startsWith('phase20_healing_wound_') ||
      item.id.startsWith('phase20_ankle_bruise_') ||
      item.id.startsWith('phase20_shoulder_bruise_') ||
      item.id.startsWith('phase20_knee_contusion_') ||
      item.id.startsWith('phase20_elbow_contusion_') ||
      item.id.startsWith('phase20_wrist_contusion_') ||
      item.id.startsWith('phase20_foot_contusion_') ||
      item.id.startsWith('phase20_finger_contusion_') ||
      item.id.startsWith('phase20_calf_strain_') ||
      item.id.startsWith('phase20_hamstring_strain_') ||
      item.id.startsWith('phase20_quadriceps_strain_') ||
      item.id.startsWith('phase20_forearm_strain_') ||
      item.id.startsWith('phase20_upper_back_strain_') ||
      item.id.startsWith('phase20_hives_') ||
      item.id.startsWith('phase20_common_cold_') ||
      item.id.startsWith('phase20_common_wart_') ||
      item.id.startsWith('phase20_localized_common_wart_') ||
      item.id.startsWith('phase20_forearm_contusion_') ||
      item.id.startsWith('phase20_thigh_contusion_') ||
      item.id.startsWith('phase20_hand_contusion_') ||
      item.id.startsWith('phase20_upper_arm_contusion_') ||
      item.id.startsWith('phase20_lower_leg_contusion_') ||
      item.id.startsWith('phase20_hip_contusion_') ||
      item.id.startsWith('phase20_toe_contusion_') ||
      item.id.startsWith('phase20_trapezius_strain_') ||
      item.id.startsWith('phase20_hip_strain_') ||
      item.id.startsWith('phase20_groin_strain_') ||
      item.id.startsWith('phase20_abdominal_wall_strain_') ||
      item.id.startsWith('phase20_chest_wall_muscle_strain_') ||
      item.id.startsWith('phase20_peroneal_tendinitis_') ||
      item.id.startsWith('phase20_quadriceps_tendinitis_') ||
      item.id.startsWith('phase20_tibialis_anterior_tendinitis_') ||
      item.id.startsWith('phase20_achilles_tendinitis_') ||
      item.id.startsWith('phase20_patellar_tendinitis_') ||
      item.id.startsWith('phase20_thumb_sprain_') ||
      item.id.startsWith('phase20_hand_sprain_') ||
      item.id.startsWith('phase20_biceps_tendinitis_') ||
      item.id.startsWith('phase20_thumb_strain_') ||
      item.id.startsWith('phase20_hip_sprain_') ||
      item.id.startsWith('phase20_viral_conjunctivitis_') ||
      item.id.startsWith('phase20_allergic_conjunctivitis_') ||
      item.id.startsWith('phase20_anterior_epistaxis_') ||
      item.id.startsWith('phase20_triceps_tendinitis_') ||
      item.id.startsWith('phase20_ear_canal_irritation_') ||
      item.id.startsWith('phase20_phase6000_') ||
      item.id.startsWith('phase20_phase7000_') ||
      item.id.startsWith('phase20_phase8000_') ||
      item.id.startsWith('phase20_phase10000_') ||
      item.id.startsWith('phase20_phase12000_') ||
      /^phase(?:800[1-9]|80[1-9][0-9]|810[0-9]|811[0-9]|8120)_/.test(item.id) ||
      item.id.startsWith('phase25') ||
      item.id.startsWith('phase26') ||
      item.id.startsWith('phase27') ||
      item.id.startsWith('phase28') ||
      item.id.startsWith('phase29') ||
      item.id.startsWith('phase26_') ||
      item.id.startsWith('phase31_') ||
      item.id.startsWith('phase32_') ||
      item.id.startsWith('phase38_') ||
      item.id.startsWith('phase39_') ||
      item.id.startsWith('phase43_') ||
      item.id.startsWith('phase47_') ||
      item.id.startsWith('phase48_') ||
      item.id.startsWith('phase52_') ||
      item.id.startsWith('phase58_') ||
      item.id.startsWith('phase59_') ||
      item.id.startsWith('phase62_') ||
      item.id.startsWith('phase68_') ||
      item.id.startsWith('phase69_') ||
      item.id.startsWith('phase74_') ||
      item.id.startsWith('phase75_') ||
      item.id.startsWith('phase77_') ||
      item.id.startsWith('phase151_') ||
      item.id.startsWith('phase156_') ||
      item.id.startsWith('phase157_') ||
      item.id.startsWith('phase163_') ||
      item.id.startsWith('phase169_') ||
      item.id.startsWith('phase175_') ||
      item.id.startsWith('phase1751_') ||
      item.id.startsWith('phase1752_') ||
      item.id.startsWith('phase1753_') ||
      item.id.startsWith('phase1754_') ||
      item.id.startsWith('phase1755_') ||
      item.id.startsWith('phase1756_') ||
      item.id.startsWith('phase1757_') ||
      item.id.startsWith('phase1758_') ||
      item.id.startsWith('phase1759_') ||
      item.id.startsWith('phase1760_') ||
      item.id.startsWith('phase1761_') ||
      item.id.startsWith('phase1762_') ||
      item.id.startsWith('phase1763_') ||
      item.id.startsWith('phase1764_') ||
      item.id.startsWith('phase1765_') ||
      item.id.startsWith('phase1801_') ||
      item.id.startsWith('phase1802_') ||
      item.id.startsWith('phase1803_') ||
      item.id.startsWith('phase1804_') ||
      item.id.startsWith('phase1805_') ||
      item.id.startsWith('phase1806_') ||
      item.id.startsWith('phase1807_') ||
      item.id.startsWith('phase1808_') ||
      item.id.startsWith('phase1809_') ||
      item.id.startsWith('phase1810_') ||
      item.id.startsWith('phase1811_') ||
      item.id.startsWith('phase1812_') ||
      item.id.startsWith('phase1813_') ||
      item.id.startsWith('phase1814_') ||
      item.id.startsWith('phase1815_') ||
      item.id.startsWith('phase1851_') ||
      item.id.startsWith('phase1852_') ||
      item.id.startsWith('phase1853_') ||
      item.id.startsWith('phase1854_') ||
      item.id.startsWith('phase1855_') ||
      item.id.startsWith('phase1856_') ||
      item.id.startsWith('phase1857_') ||
      item.id.startsWith('phase1858_') ||
      item.id.startsWith('phase1859_') ||
      item.id.startsWith('phase1860_') ||
      item.id.startsWith('phase1861_') ||
      item.id.startsWith('phase1862_') ||
      item.id.startsWith('phase1863_') ||
      item.id.startsWith('phase1864_') ||
      item.id.startsWith('phase1865_') ||
      item.id.startsWith('phase1901_') ||
      item.id.startsWith('phase1902_') ||
      item.id.startsWith('phase1903_') ||
      item.id.startsWith('phase1904_') ||
      item.id.startsWith('phase1905_') ||
      item.id.startsWith('phase1906_') ||
      item.id.startsWith('phase1907_') ||
      item.id.startsWith('phase1908_') ||
      item.id.startsWith('phase1909_') ||
      item.id.startsWith('phase1910_') ||
      item.id.startsWith('phase1911_') ||
      item.id.startsWith('phase1912_') ||
      item.id.startsWith('phase1913_') ||
      item.id.startsWith('phase1914_') ||
      item.id.startsWith('phase1915_') ||
      item.id.startsWith('phase2001_') ||
      item.id.startsWith('phase2002_') ||
      item.id.startsWith('phase2003_') ||
      item.id.startsWith('phase2004_') ||
      item.id.startsWith('phase2005_') ||
      item.id.startsWith('phase2006_') ||
      item.id.startsWith('phase2007_') ||
      item.id.startsWith('phase2008_') ||
      item.id.startsWith('phase2009_') ||
      item.id.startsWith('phase2010_') ||
      item.id.startsWith('phase2011_') ||
      item.id.startsWith('phase2012_') ||
      item.id.startsWith('phase2013_') ||
      item.id.startsWith('phase2014_') ||
      item.id.startsWith('phase2015_') ||
      item.id.startsWith('phase2101_') ||
      item.id.startsWith('phase2102_') ||
      item.id.startsWith('phase2103_') ||
      item.id.startsWith('phase2104_') ||
      item.id.startsWith('phase2105_') ||
      item.id.startsWith('phase2106_') ||
      item.id.startsWith('phase2107_') ||
      item.id.startsWith('phase2108_') ||
      item.id.startsWith('phase2109_') ||
      item.id.startsWith('phase2110_') ||
      item.id.startsWith('phase2111_') ||
      item.id.startsWith('phase2112_') ||
      item.id.startsWith('phase2113_') ||
      item.id.startsWith('phase2114_') ||
      item.id.startsWith('phase2115_') ||
      item.id.startsWith('phase2201_') ||
      item.id.startsWith('phase2202_') ||
      item.id.startsWith('phase2203_') ||
      item.id.startsWith('phase2204_') ||
      item.id.startsWith('phase2205_') ||
      item.id.startsWith('phase2206_') ||
      item.id.startsWith('phase2207_') ||
      item.id.startsWith('phase2208_') ||
      item.id.startsWith('phase2209_') ||
      item.id.startsWith('phase2210_') ||
      item.id.startsWith('phase2211_') ||
      item.id.startsWith('phase2212_') ||
      item.id.startsWith('phase2213_') ||
      item.id.startsWith('phase2214_') ||
      item.id.startsWith('phase2215_') ||
      item.id.startsWith('phase2301_') ||
      item.id.startsWith('phase2302_') ||
      item.id.startsWith('phase2303_') ||
      item.id.startsWith('phase2304_') ||
      item.id.startsWith('phase2305_') ||
      item.id.startsWith('phase2306_') ||
      item.id.startsWith('phase2307_') ||
      item.id.startsWith('phase2308_') ||
      item.id.startsWith('phase2309_') ||
      item.id.startsWith('phase2310_') ||
      item.id.startsWith('phase2311_') ||
      item.id.startsWith('phase2312_') ||
      item.id.startsWith('phase2313_') ||
      item.id.startsWith('phase2314_') ||
      item.id.startsWith('phase2315_') ||
      item.id.startsWith('phase2401_') ||
      item.id.startsWith('phase2402_') ||
      item.id.startsWith('phase2403_') ||
      item.id.startsWith('phase2404_') ||
      item.id.startsWith('phase2405_') ||
      item.id.startsWith('phase2406_') ||
      item.id.startsWith('phase2407_') ||
      item.id.startsWith('phase2408_') ||
      item.id.startsWith('phase2409_') ||
      item.id.startsWith('phase2410_') ||
      item.id.startsWith('phase2411_') ||
      item.id.startsWith('phase2412_') ||
      item.id.startsWith('phase2413_') ||
      item.id.startsWith('phase2414_') ||
      item.id.startsWith('phase2415_') ||
      item.id.startsWith('phase176_') ||
      item.id.startsWith('phase193_') ||
      item.id.startsWith('phase202_') ||
      item.id.startsWith('phase203_') ||
      item.id.startsWith('phase204_') ||
      item.id.startsWith('phase205_') ||
      item.id.startsWith('phase217_') ||
      item.id.startsWith('phase221_') ||
      item.id.startsWith('phase302_') ||
      item.id.startsWith('phase303_') ||
      item.id.startsWith('phase304_') ||
      item.id.startsWith('phase305_') ||
      item.id.startsWith('phase306_') ||
      item.id.startsWith('phase307_') ||
      item.id.startsWith('phase308_') ||
      item.id.startsWith('phase309_') ||
      item.id.startsWith('phase310_') ||
      item.id.startsWith('phase311_') ||
      item.id.startsWith('phase312_') ||
      item.id.startsWith('phase313_') ||
      item.id.startsWith('phase314_') ||
      item.id.startsWith('phase315_') ||
      item.id.startsWith('phase316_') ||
      item.id.startsWith('phase317_') ||
      item.id.startsWith('phase318_') ||
      item.id.startsWith('phase319_') ||
      item.id.startsWith('phase320_') ||
      item.id.startsWith('phase321_') ||
      item.id.startsWith('phase322_') ||
      item.id.startsWith('phase323_') ||
      item.id.startsWith('phase324_') ||
      item.id.startsWith('phase371_') ||
      item.id.startsWith('phase372_') ||
      item.id.startsWith('phase373_') ||
      item.id.startsWith('phase374_') ||
      item.id.startsWith('phase375_') ||
      item.id.startsWith('phase376_') ||
      item.id.startsWith('phase377_') ||
      item.id.startsWith('phase378_') ||
      item.id.startsWith('phase379_') ||
      item.id.startsWith('phase380_') ||
      item.id.startsWith('phase381_') ||
      item.id.startsWith('phase382_') ||
      item.id.startsWith('phase383_') ||
      item.id.startsWith('phase384_') ||
      item.id.startsWith('phase391_') ||
      item.id.startsWith('phase392_') ||
      item.id.startsWith('phase393_') ||
      item.id.startsWith('phase394_') ||
      item.id.startsWith('phase395_') ||
      item.id.startsWith('phase396_') ||
      item.id.startsWith('phase397_') ||
      item.id.startsWith('phase398_') ||
      item.id.startsWith('phase399_') ||
      item.id.startsWith('phase400_') ||
      item.id.startsWith('phase401_') ||
      item.id.startsWith('phase402_') ||
      item.id.startsWith('phase403_') ||
      item.id.startsWith('phase404_') ||
      item.id.startsWith('phase405_') ||
      item.id.startsWith('phase406_') ||
      item.id.startsWith('phase421_') ||
      item.id.startsWith('phase422_') ||
      item.id.startsWith('phase423_') ||
      item.id.startsWith('phase424_') ||
      item.id.startsWith('phase425_') ||
      item.id.startsWith('phase426_') ||
      item.id.startsWith('phase427_') ||
      item.id.startsWith('phase428_') ||
      item.id.startsWith('phase429_') ||
      item.id.startsWith('phase430_') ||
      item.id.startsWith('phase481_') ||
      item.id.startsWith('phase482_') ||
      item.id.startsWith('phase483_') ||
      item.id.startsWith('phase484_') ||
      item.id.startsWith('phase485_') ||
      item.id.startsWith('phase486_') ||
      item.id.startsWith('phase487_') ||
      item.id.startsWith('phase488_') ||
      item.id.startsWith('phase489_') ||
      item.id.startsWith('phase490_') ||
      item.id.startsWith('phase491_') ||
      item.id.startsWith('phase492_') ||
      item.id.startsWith('phase532_') ||
      item.id.startsWith('phase533_') ||
      item.id.startsWith('phase534_') ||
      item.id.startsWith('phase535_') ||
      item.id.startsWith('phase536_') ||
      item.id.startsWith('phase537_') ||
      item.id.startsWith('phase538_') ||
      item.id.startsWith('phase539_') ||
      item.id.startsWith('phase540_') ||
      item.id.startsWith('phase541_') ||
      item.id.startsWith('phase542_') ||
      item.id.startsWith('phase543_') ||
      item.id.startsWith('phase544_') ||
      item.id.startsWith('phase545_') ||
      item.id.startsWith('phase546_') ||
      item.id.startsWith('phase551_') ||
      item.id.startsWith('phase552_') ||
      item.id.startsWith('phase553_') ||
      item.id.startsWith('phase554_') ||
      item.id.startsWith('phase555_') ||
      item.id.startsWith('phase556_') ||
      item.id.startsWith('phase557_') ||
      item.id.startsWith('phase558_') ||
      item.id.startsWith('phase559_') ||
      item.id.startsWith('phase560_') ||
      item.id.startsWith('phase602_') ||
      item.id.startsWith('phase603_') ||
      item.id.startsWith('phase604_') ||
      item.id.startsWith('phase605_') ||
      item.id.startsWith('phase606_') ||
      item.id.startsWith('phase607_') ||
      item.id.startsWith('phase608_') ||
      item.id.startsWith('phase609_') ||
      item.id.startsWith('phase610_') ||
      item.id.startsWith('phase611_') ||
      item.id.startsWith('phase651_') ||
      item.id.startsWith('phase652_') ||
      item.id.startsWith('phase653_') ||
      item.id.startsWith('phase654_') ||
      item.id.startsWith('phase655_') ||
      item.id.startsWith('phase656_') ||
      item.id.startsWith('phase657_') ||
      item.id.startsWith('phase658_') ||
      item.id.startsWith('phase659_') ||
      item.id.startsWith('phase660_') ||
      item.id.startsWith('phase661_') ||
      item.id.startsWith('phase662_') ||
      item.id.startsWith('phase701_') ||
      item.id.startsWith('phase702_') ||
      item.id.startsWith('phase703_') ||
      item.id.startsWith('phase704_') ||
      item.id.startsWith('phase705_') ||
      item.id.startsWith('phase706_') ||
      item.id.startsWith('phase707_') ||
      item.id.startsWith('phase708_') ||
      item.id.startsWith('phase709_') ||
      item.id.startsWith('phase710_') ||
      item.id.startsWith('phase711_') ||
      item.id.startsWith('phase712_') ||
      item.id.startsWith('phase801_') ||
      item.id.startsWith('phase802_') ||
      item.id.startsWith('phase803_') ||
      item.id.startsWith('phase804_') ||
      item.id.startsWith('phase805_') ||
      item.id.startsWith('phase806_') ||
      item.id.startsWith('phase807_') ||
      item.id.startsWith('phase808_') ||
      item.id.startsWith('phase809_') ||
      item.id.startsWith('phase851_') ||
      item.id.startsWith('phase852_') ||
      item.id.startsWith('phase853_') ||
      item.id.startsWith('phase854_') ||
      item.id.startsWith('phase855_') ||
      item.id.startsWith('phase856_') ||
      item.id.startsWith('phase857_') ||
      item.id.startsWith('phase858_') ||
      item.id.startsWith('phase859_') ||
      item.id.startsWith('phase860_') ||
      item.id.startsWith('phase861_') ||
      item.id.startsWith('phase862_') ||
      item.id.startsWith('phase863_') ||
      item.id.startsWith('phase864_') ||
      item.id.startsWith('phase865_') ||
      item.id.startsWith('phase866_') ||
      item.id.startsWith('phase1002_') ||
      item.id.startsWith('phase1003_') ||
      item.id.startsWith('phase1004_') ||
      item.id.startsWith('phase1005_') ||
      item.id.startsWith('phase1006_') ||
      item.id.startsWith('phase1007_') ||
      item.id.startsWith('phase1008_') ||
      item.id.startsWith('phase1009_') ||
      item.id.startsWith('phase1010_') ||
      item.id.startsWith('phase1011_') ||
      item.id.startsWith('phase1012_') ||
      item.id.startsWith('phase1013_') ||
      item.id.startsWith('phase1014_') ||
      item.id.startsWith('phase1015_') ||
      item.id.startsWith('phase1016_') ||
      item.id.startsWith('phase1501_') ||
      item.id.startsWith('phase1502_') ||
      item.id.startsWith('phase1503_') ||
      item.id.startsWith('phase1504_') ||
      item.id.startsWith('phase1505_') ||
      item.id.startsWith('phase1506_') ||
      item.id.startsWith('phase1507_') ||
      item.id.startsWith('phase1508_') ||
      item.id.startsWith('phase1509_') ||
      item.id.startsWith('phase1510_') ||
      item.id.startsWith('phase1511_') ||
      item.id.startsWith('phase1512_') ||
      item.id.startsWith('phase1513_') ||
      item.id.startsWith('phase1514_') ||
      item.id.startsWith('phase1515_') ||
      item.id.startsWith('phase20_foot_sprain_') ||
      item.id.startsWith('phase20_minor_head_injury_') ||
      item.id.startsWith('phase20_concussion_') ||
      item.id.startsWith('phase20_renal_colic_') ||
      item.id.startsWith('phase20_asthma_exacerbation_') ||
      item.id.startsWith('phase20_heel_contusion_') ||
      item.id.startsWith('phase20_palm_contusion_') ||
      item.id.startsWith('phase20_upper_arm_strain_') ||
      item.id.startsWith('phase20_lower_leg_strain_') ||
      item.id.startsWith('phase20_ankle_tendinitis_') ||
      item.id.startsWith('phase20_shin_contusion_') ||
      item.id.startsWith('phase20_heel_strain_') ||
      item.id.startsWith('phase20_mosquito_bites_') ||
      item.id.startsWith('phase20_poison_ivy_') ||
      item.id.startsWith('phase20_dry_cracked_hands_') ||
      item.id.startsWith('phase20_upper_back_contusion_') ||
      item.id.startsWith('phase20_trunk_contusion_') ||
      item.id.startsWith('phase20_shoulder_strain_') ||
      item.id.startsWith('phase20_wrist_strain_') ||
      item.id.startsWith('phase20_flea_bites_') ||
      item.id.startsWith('phase20_ankle_strain_') ||
      item.id.startsWith('phase20_foot_strain_') ||
      item.id.startsWith('phase20_elbow_strain_') ||
      item.id.startsWith('phase20_hand_strain_') ||
      item.id.startsWith('phase20_finger_strain_') ||
      item.id.startsWith('phase20_ant_bites_') ||
      item.id.startsWith('phase20_chigger_bites_') ||
      item.id.startsWith('phase20_midge_bites_') ||
      item.id.startsWith('phase20_plant_contact_dermatitis_') ||
      item.id.startsWith('phase20_soap_irritant_dermatitis_') ||
      item.id.startsWith('phase20_bee_sting_') ||
      item.id.startsWith('phase20_wasp_sting_') ||
      item.id.startsWith('phase20_hornet_sting_') ||
      item.id.startsWith('phase20_gnat_bites_') ||
      item.id.startsWith('phase20_fly_bites_') ||
      item.id.startsWith('phase3001_') ||
      item.id.startsWith('phase3002_') ||
      item.id.startsWith('phase3003_') ||
      item.id.startsWith('phase3004_') ||
      item.id.startsWith('phase3005_') ||
      item.id.startsWith('phase3006_') ||
      item.id.startsWith('phase3007_') ||
      item.id.startsWith('phase3008_') ||
      item.id.startsWith('phase3009_') ||
      item.id.startsWith('phase3010_') ||
      item.id.startsWith('phase3011_') ||
      item.id.startsWith('phase3012_') ||
      item.id.startsWith('phase3013_') ||
      item.id.startsWith('phase3014_') ||
      item.id.startsWith('phase3015_') ||
      item.id.startsWith('phase3016_') ||
      item.id.startsWith('phase3017_') ||
      item.id.startsWith('phase3018_') ||
      item.id.startsWith('phase3019_') ||
      item.id.startsWith('phase3020_') ||
      item.id.startsWith('phase3021_') ||
      item.id.startsWith('phase3022_') ||
      item.id.startsWith('phase3023_') ||
      item.id.startsWith('phase3024_') ||
      item.id.startsWith('phase3025_') ||
      item.id.startsWith('phase3026_') ||
      item.id.startsWith('phase3251_') ||
      item.id.startsWith('phase3252_') ||
      item.id.startsWith('phase3253_') ||
      item.id.startsWith('phase3254_') ||
      item.id.startsWith('phase3255_') ||
      item.id.startsWith('phase3256_') ||
      item.id.startsWith('phase3257_') ||
      item.id.startsWith('phase3258_') ||
      item.id.startsWith('phase3259_') ||
      item.id.startsWith('phase3260_') ||
      item.id.startsWith('phase3261_') ||
      item.id.startsWith('phase3262_') ||
      item.id.startsWith('phase3263_') ||
      item.id.startsWith('phase3264_') ||
      item.id.startsWith('phase3265_') ||
      item.id.startsWith('phase3501_') ||
      item.id.startsWith('phase3502_') ||
      item.id.startsWith('phase3503_') ||
      item.id.startsWith('phase3504_') ||
      item.id.startsWith('phase3505_') ||
      item.id.startsWith('phase3506_') ||
      item.id.startsWith('phase3507_') ||
      item.id.startsWith('phase3508_') ||
      item.id.startsWith('phase3509_') ||
      item.id.startsWith('phase3510_') ||
      item.id.startsWith('phase3511_') ||
      item.id.startsWith('phase3512_') ||
      item.id.startsWith('phase3513_') ||
      item.id.startsWith('phase3514_') ||
      item.id.startsWith('phase3515_') ||
      item.id.startsWith('phase3751_') ||
      item.id.startsWith('phase3752_') ||
      item.id.startsWith('phase3753_') ||
      item.id.startsWith('phase3754_') ||
      item.id.startsWith('phase3755_') ||
      item.id.startsWith('phase3756_') ||
      item.id.startsWith('phase3757_') ||
      item.id.startsWith('phase3758_') ||
      item.id.startsWith('phase3759_') ||
      item.id.startsWith('phase3760_') ||
      item.id.startsWith('phase3761_') ||
      item.id.startsWith('phase3762_') ||
      item.id.startsWith('phase3763_') ||
      item.id.startsWith('phase3764_') ||
      item.id.startsWith('phase3765_') ||
      item.id.startsWith('phase4001_') ||
      item.id.startsWith('phase4002_') ||
      item.id.startsWith('phase4003_') ||
      item.id.startsWith('phase4004_') ||
      item.id.startsWith('phase4005_') ||
      item.id.startsWith('phase4006_') ||
      item.id.startsWith('phase4007_') ||
      item.id.startsWith('phase4008_') ||
      item.id.startsWith('phase4009_') ||
      item.id.startsWith('phase4010_') ||
      item.id.startsWith('phase4011_') ||
      item.id.startsWith('phase4012_') ||
      item.id.startsWith('phase4013_') ||
      item.id.startsWith('phase4014_') ||
      item.id.startsWith('phase4015_') ||
      item.id.startsWith('phase4251_') ||
      item.id.startsWith('phase4252_') ||
      item.id.startsWith('phase4253_') ||
      item.id.startsWith('phase4254_') ||
      item.id.startsWith('phase4255_') ||
      item.id.startsWith('phase4256_') ||
      item.id.startsWith('phase4257_') ||
      item.id.startsWith('phase4258_') ||
      item.id.startsWith('phase4259_') ||
      item.id.startsWith('phase4260_') ||
      item.id.startsWith('phase4261_') ||
      item.id.startsWith('phase4262_') ||
      item.id.startsWith('phase4263_') ||
      item.id.startsWith('phase4264_') ||
      item.id.startsWith('phase4265_') ||
      item.id.startsWith('phase4501_') ||
      item.id.startsWith('phase4502_') ||
      item.id.startsWith('phase4503_') ||
      item.id.startsWith('phase4504_') ||
      item.id.startsWith('phase4505_') ||
      item.id.startsWith('phase4506_') ||
      item.id.startsWith('phase4507_') ||
      item.id.startsWith('phase4508_') ||
      item.id.startsWith('phase4509_') ||
      item.id.startsWith('phase4510_') ||
      item.id.startsWith('phase4511_') ||
      item.id.startsWith('phase4512_') ||
      item.id.startsWith('phase4513_') ||
      item.id.startsWith('phase4514_') ||
      item.id.startsWith('phase4515_') ||
      item.id.startsWith('phase4751_') ||
      item.id.startsWith('phase4752_') ||
      item.id.startsWith('phase4753_') ||
      item.id.startsWith('phase4754_') ||
      item.id.startsWith('phase4755_') ||
      item.id.startsWith('phase4756_') ||
      item.id.startsWith('phase4757_') ||
      item.id.startsWith('phase4758_') ||
      item.id.startsWith('phase4759_') ||
      item.id.startsWith('phase4760_') ||
      item.id.startsWith('phase4761_') ||
      item.id.startsWith('phase4762_') ||
      item.id.startsWith('phase4763_') ||
      item.id.startsWith('phase4764_') ||
      item.id.startsWith('phase4765_') ||
      item.id.startsWith('phase500') ||
      item.id.startsWith('phase501') ||
      item.id.startsWith('phase525') ||
      item.id.startsWith('phase526') ||
      item.id.startsWith('phase550') ||
      item.id.startsWith('phase551') ||
      item.id.startsWith('phase575') ||
      item.id.startsWith('phase576') ||
      item.id.startsWith('phase600') ||
      item.id.startsWith('phase601') ||
      item.id.startsWith('phase625') ||
      item.id.startsWith('phase626') ||
      item.id.startsWith('phase650') ||
      item.id.startsWith('phase651') ||
      item.id.startsWith('phase675') ||
      item.id.startsWith('phase676') ||
      item.id.startsWith('phase700') ||
      item.id.startsWith('phase701') ||
      item.id.startsWith('phase725') ||
      item.id.startsWith('phase726') ||
      item.id.startsWith('phase750') ||
      item.id.startsWith('phase751') ||
      item.id.startsWith('phase775') ||
      item.id.startsWith('phase776')
  );

cases.push(...JSON.parse(readFileSync(join('knowledge', 'ontology', 'evals', 'release_negation_runtime_cases.json'), 'utf8')));

for (const item of cases) {
  const result = classifyOntology({ condition: item.condition, edNoteScrubbed: item.ed_note });
  if (result.phenotype_id !== item.expected_phenotype_id || result.fallback_reason !== item.expected_fallback_reason) {
    throw new Error(`${item.id} mismatch: ${JSON.stringify(result)}`);
  }
  for (const exclusion of item.expected_exclusions || []) {
    if (!result.exclusions.includes(exclusion)) {
      throw new Error(`${item.id} missing exclusion ${exclusion}: ${JSON.stringify(result)}`);
    }
  }
  for (const missingContext of item.expected_missing_required_context || []) {
    if (!result.missing_required_context.includes(missingContext)) {
      throw new Error(`${item.id} missing required context ${missingContext}: ${JSON.stringify(result)}`);
    }
  }
  const outputModifierIds = (result.output_modifiers || []).map((modifier) => modifier.id);
  for (const outputModifier of item.expected_output_modifiers || []) {
    if (!outputModifierIds.includes(outputModifier)) {
      throw new Error(`${item.id} missing output modifier ${outputModifier}: ${JSON.stringify(result)}`);
    }
  }
  console.log(`netlify runtime smoke passed: ${item.id}`);
}

console.log('netlify runtime smoke passed');
