import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SECTION_ORDER = [
  ['diagnosis', 'DIAGNOSIS:'],
  ['what_we_found', 'WHAT WE FOUND:'],
  ['home_care', 'WHAT TO DO AT HOME:'],
  ['medications', 'MEDICATIONS:'],
  ['return_precautions', 'RETURN TO ED IF:'],
  ['follow_up', 'FOLLOW UP:'],
  ['resources', 'RESOURCES:'],
];

const NEGATIVE_CONTEXT = ['no ', 'denies ', 'without '];
const SUPPORTED_ONTOLOGY_LANGUAGE = 'english';
// Only bridge the known adjective "retained"; do not negate across arbitrary words or clauses.
const NEGATION_PATTERN = /(?:\bno|\bdenies|\bwithout)\s+(?:retained\s+)?$/;
const NEGATION_SUFFIX_PATTERN = /^\s*(?:absent|not present|negative)\b/;
const DIAGNOSTIC_NEGATION_PREFIX =
  /(?:\bno|\bdenies|\bwithout|\bruled out|\bnot consistent with)\s+(?:\w+\s+){0,4}$/;
const DIAGNOSTIC_NEGATION_SUFFIX =
  /^\s*(?:diagnosis|phenotype|documented|confirmed|suspected|evaluation)?\s*(?:ruled out|not documented|not confirmed|not the final diagnosis|not final diagnosis)\b/;

const EXCLUSION_RULES = {
  airway_symptoms: ['trouble breathing', 'throat swelling', 'tongue swelling', 'drooling', 'stridor'],
  abscess_concern: ['abscess', 'pus pocket', 'needs drainage', 'incision and drainage'],
  abnormal_ecg: ['st elevation', 'new ischemia', 'abnormal ecg'],
  abnormal_troponin: ['positive troponin', 'elevated troponin'],
  age_over_50_new_headache: ['new headache over 50', 'age over 50', 'older than 50 with new headache'],
  anaphylaxis: ['anaphylaxis', 'anaphylactic', 'two system reaction'],
  anticoagulated: ['warfarin', 'eliquis', 'apixaban', 'xarelto', 'rivaroxaban', 'blood thinner'],
  antibiotic_prescribed: ['antibiotic prescribed', 'started antibiotics', 'given antibiotics'],
  antibiotic_prescribed_for_suspected_bacterial_infection: [
    'antibiotic prescribed for suspected bacterial infection',
    'antibiotics prescribed for bacterial infection',
    'started antibiotics for bacterial infection',
    'amoxicillin for bacterial bronchitis',
    'azithromycin for bacterial bronchitis',
    'bacterial bronchitis',
  ],
  antibiotic_prescribed_for_sinusitis: [
    'antibiotic prescribed for sinusitis',
    'antibiotics prescribed for sinusitis',
    'amoxicillin for sinusitis',
    'amoxicillin clavulanate for sinusitis',
    'augmentin for sinusitis',
    'doxycycline for sinusitis',
  ],
  athlete_return_to_play: ['return to play', 'same day sports', 'athlete', 'game today', 'practice today'],
  biphasic_reaction_concern: ['biphasic', 'recurrent reaction', 'symptoms returned'],
  burn_high_risk_depth_location_or_mechanism: [
    'deep burn',
    'full thickness burn',
    'partial thickness burn',
    'white burn',
    'charred skin',
    'circumferential burn',
    'hand burn',
    'face burn',
    'genital burn',
    'chemical burn',
    'electrical burn',
    'large burn',
  ],
  chemical_exposure_or_toxic_treatment: [
    'gasoline on scalp',
    'kerosene on scalp',
    'pesticide applied',
    'household chemical applied',
    'toxic lice treatment',
    'chemical burn from treatment',
  ],
  bacterial_infection_suspected: ['bacterial infection', 'strep', 'pneumonia', 'sinusitis'],
  bite_wound: ['bite wound', 'dog bite', 'cat bite', 'human bite'],
  bleeding_disorder: ['bleeding disorder', 'hemophilia', 'thrombocytopenia', 'low platelets'],
  c_diff_risk: ['c diff', 'c. diff', 'recent antibiotics', 'clostridioides'],
  cancer_red_flag: ['cancer', 'malignancy', 'weight loss', 'night sweats'],
  cauda_equina_concern: ['urinary retention', 'bowel incontinence', 'saddle anesthesia', 'saddle numbness', 'groin numbness'],
  chest_pain: ['chest pain', 'pressure in chest'],
  cardiac_or_pe_chest_pain_concern: [
    'cardiac chest pain',
    'pe concern',
    'pulmonary embolism concern',
    'pleuritic chest pain with pe concern',
    'acs concern',
    'acute coronary syndrome concern',
  ],
  complicated_uti: ['complicated uti', 'urinary obstruction', 'urologic procedure'],
  chronic_or_recurrent_sinusitis: [
    'chronic sinusitis',
    'recurrent sinusitis',
    'months of sinus symptoms',
    'multiple sinus infections this year',
  ],
  contact_lens_use: ['contact lens', 'contacts', 'contact lenses'],
  contact_dermatitis_infection_concern: [
    'cellulitis',
    'skin infection',
    'purulent',
    'pus',
    'spreading redness',
    'red streaks',
    'worsening warmth',
    'warmth and fever',
  ],
  secondary_skin_infection_concern: [
    'cellulitis',
    'skin infection',
    'secondary infection',
    'purulent',
    'pus',
    'drainage',
    'spreading redness',
    'red streaks',
    'warmth and fever',
  ],
  frail_elderly_large_bsa_contact_dermatitis: [
    'frail with large rash',
    'elderly with large rash',
    'large body surface area',
    'large bsa',
    'widespread contact dermatitis',
  ],
  occupational_recurrent_contact_dermatitis: [
    'occupational exposure',
    'workplace exposure',
    'recurrent contact dermatitis at work',
    'repeated work exposure',
    'rash returns at work',
  ],
  copd_or_asthma_exacerbation_pathway: [
    'copd exacerbation',
    'asthma exacerbation',
    'asthma flare',
    'wheezing requiring bronchodilators',
    'treated as asthma',
    'treated as copd',
  ],
  deep_space_location: ['perirectal', 'neck abscess', 'hand abscess', 'deep space', 'orbital', 'joint'],
  deep_space_swelling: ['floor of mouth', 'neck swelling', 'jaw swelling', 'facial swelling', 'submandibular', 'deep space'],
  deep_neck_or_epiglottitis_concern: [
    'deep neck infection',
    'epiglottitis',
    'retropharyngeal abscess',
    'peritonsillar abscess',
    'neck swelling',
    'cannot swallow',
  ],
  dehydration_or_unable_to_drink: ['unable to drink', 'cannot drink', 'dehydration', 'severe dehydration', 'dry mucous membranes'],
  dental_or_facial_trauma_source: ['dental source', 'tooth abscess', 'facial trauma', 'orbital fracture', 'facial fracture'],
  acute_glaucoma_mimic: ['acute glaucoma', 'angle closure', 'halos around lights', 'fixed pupil', 'mid dilated pupil'],
  chemical_eye_exposure: ['chemical splash', 'chemical exposure', 'chemical burn', 'acid in eye', 'alkali in eye'],
  corneal_ulcer_or_keratitis_concern: ['corneal ulcer', 'keratitis', 'corneal infiltrate', 'white spot on cornea'],
  eye_trauma_or_foreign_body: ['eye trauma', 'foreign body', 'metal in eye', 'scratched eye', 'corneal abrasion', 'chemical splash'],
  diabetic_foot: ['diabetic foot'],
  diabetes_general_risk: ['diabetes', 'diabetic', 'poor glycemic control', 'poorly controlled diabetes'],
  peripheral_vascular_disease: ['peripheral vascular disease', 'pvd', 'poor circulation', 'vascular insufficiency'],
  neuropathy_foot_risk: ['neuropathy', 'insensate foot', 'loss of protective sensation'],
  delayed_wound_presentation: ['delayed presentation', 'wound older than 6 hours', 'wound older than 8 hours', 'delayed wound care'],
  fracture_or_dislocation_concern: [
    'fracture concern',
    'possible fracture',
    'broken bone',
    'dislocation',
    'xray pending',
    'x-ray pending',
    'bony tenderness',
  ],
  head_lice_complicated_or_non_scalp: [
    'eyelash lice',
    'eyebrow lice',
    'body lice',
    'pubic lice',
    'crab lice',
    'lice on eyelashes',
    'lice on eyebrows',
  ],
  watchful_waiting_follow_up_unreliable: [
    'watchful waiting with unreliable follow up',
    'watchful waiting no follow up access',
    'unable to follow up for watchful waiting',
    'no reliable follow up for watchful waiting',
  ],
  dirty_wound: ['dirty wound', 'contaminated wound', 'soil', 'rusty', 'crush injury'],
  drooling: ['drooling', 'cannot handle secretions'],
  elderly_frail: ['frail', 'elderly', 'nursing home'],
  elderly: ['elderly', 'frail'],
  fever: ['fever', 'febrile', 'chills'],
  flank_pain: ['flank pain', 'cva tenderness', 'side pain'],
  focal_lung_findings_or_infiltrate: [
    'focal crackles',
    'focal rales',
    'focal lung findings',
    'localized crackles',
    'right lower lobe infiltrate',
    'left lower lobe infiltrate',
    'infiltrate',
    'consolidation',
  ],
  fracture_or_trauma_concern: ['fall', 'trauma', 'crash', 'fracture', 'midline tenderness', 'head trauma within 7 days'],
  fracture_seen: ['fracture seen', 'broken bone', 'ankle fracture', 'distal fibula fracture', 'distal tibia fracture'],
  facial_or_nasal_trauma: ['facial trauma', 'nasal trauma', 'nose injury', 'hit in nose', 'nasal fracture'],
  gi_bleeding: ['bloody stool', 'black stool', 'blood in stool', 'vomit blood', 'coffee grounds'],
  abdominal_distention: ['abdominal distention', 'distended abdomen', 'swollen belly', 'belly swelling', 'bloating with pain'],
  bowel_obstruction_or_ileus_concern: ['bowel obstruction', 'intestinal obstruction', 'ileus', 'volvulus', 'obstruction concern'],
  hemoptysis: ['coughing blood', 'hemoptysis'],
  inhalation_injury_concern: ['smoke inhalation', 'inhalation injury', 'soot in mouth', 'singed nasal hair', 'burn in enclosed space'],
  hypotension: ['hypotension', 'low blood pressure'],
  hypoxia: ['hypoxic', 'low oxygen', 'oxygen saturation 90', 'spo2 90', 'spo2 89'],
  immunocompromised: ['chemotherapy', 'transplant', 'immunocompromised', 'neutropenia'],
  indwelling_catheter: ['foley', 'catheter'],
  joint_violation: ['joint violation', 'joint capsule', 'traumatic arthrotomy', 'over joint'],
  intoxication: ['intoxicated', 'etoh'],
  kidney_transplant: ['kidney transplant', 'renal transplant'],
  loss_of_consciousness: ['loss of consciousness', 'loc'],
  lateral_sinus_thrombosis_concern: ['lateral sinus thrombosis', 'sigmoid sinus thrombosis', 'venous sinus thrombosis'],
  laceration_repair_needed: ['needs sutures', 'needs staples', 'needs glue', 'laceration repair needed', 'wound repair needed'],
  male_patient: ['male patient', 'man with uti', 'male with uti'],
  mono_complication_concern: ['mono', 'splenomegaly', 'left upper quadrant pain'],
  meningitis_or_cns_infection_concern: ['meningitis', 'stiff neck', 'neck stiffness', 'fever with headache', 'encephalitis'],
  mucosal_lesions: ['mucosal lesions', 'mouth sores', 'skin peeling', 'target lesions'],
  necrotic_spider_or_scorpion_concern: ['black widow', 'brown recluse', 'scorpion', 'necrotic spider', 'venomous spider'],
  herpes_or_zoster_eye_concern: [
    'herpes eye',
    'herpes near eye',
    'zoster eye',
    'shingles near eye',
    'vesicles near eye',
    'dendritic lesion',
  ],
  near_eye_or_genitals: ['eye', 'eyelid', 'genital', 'scrotum', 'vulva'],
  scrotal_or_testicular_pain: ['testicular pain', 'scrotal pain', 'testicle pain', 'testicular swelling', 'torsion concern'],
  severe_pain: ['severe pain', 'pain out of proportion', 'uncontrolled pain'],
  sti_or_genital_pathway: [
    'sti concern',
    'sexually transmitted infection',
    'genital ulcer',
    'penile discharge',
    'vaginal discharge',
    'pubic lice',
    'genital sores',
  ],
  orbital_or_intracranial_sinusitis_concern: [
    'orbital cellulitis',
    'eye swelling',
    'swelling around the eye',
    'pain with eye movement',
    'vision change',
    'double vision',
    'confusion',
    'altered mental status',
    'meningitis',
    'severe headache with neurologic',
  ],
  necrotizing_infection_concern: ['necrotizing', 'pain out of proportion', 'crepitus', 'bullae'],
  neurovascular_compromise: ['numb foot', 'numb toes', 'numb fingers', 'numb hand', 'no pulse', 'cold foot', 'cold hand', 'blue toes', 'blue fingers', 'pale toes', 'pale fingers', 'decreased sensation'],
  no_xray_performed: ['no xray', 'no x ray', 'no imaging', 'xray not done', 'x ray not done'],
  neurologic_deficit: ['weakness', 'numbness', 'aphasia', 'slurred speech', 'facial droop'],
  new_neurologic_deficit: ['new weakness', 'leg weakness', 'foot drop', 'new numbness', 'numb leg'],
  ongoing_pain: ['ongoing pain', 'persistent chest pain', 'active chest pain'],
  open_wound: ['open wound', 'open fracture', 'bone exposed', 'laceration over ankle'],
  open_fracture: ['open fracture', 'bone exposed'],
  wound_dehiscence: ['wound opened', 'wound dehiscence', 'edges separated', 'stitches came out', 'staples came out'],
  wound_infection_concern: ['pus', 'purulent drainage', 'spreading redness', 'red streaks', 'wound infection', 'infected wound'],
  wound_not_ready_for_suture_removal: ['not ready for suture removal', 'too early for suture removal', 'wound not healed', 'edges not healed'],
  posterior_epistaxis_or_uncontrolled_bleeding: [
    'posterior epistaxis',
    'posterior nosebleed',
    'bleeding down throat',
    'continued bleeding',
    'bleeding would not stop',
    'uncontrolled nosebleed',
    'nasal packing',
    'rhino rocket',
  ],
  packing_required: ['packing', 'packed wound', 'wick'],
  peritoneal_signs: ['rebound', 'guarding', 'peritonitis'],
  peritonsillar_abscess_concern: ['peritonsillar abscess', 'uvula deviation', 'hot potato voice', 'unilateral tonsil'],
  periorbital_or_orbital_cellulitis_concern: ['periorbital cellulitis', 'orbital cellulitis', 'eyelid swelling', 'pain with eye movement', 'proptosis'],
  pediatric_pathway: ['child', 'pediatric', 'infant', 'toddler', 'school age', 'age 12', 'age 10', 'age 8'],
  photophobia: ['photophobia', 'light sensitivity'],
  poor_follow_up: ['homeless', 'unable to follow up', 'poor follow up', 'no phone'],
  poor_inhaler_access: ['no inhaler', 'lost inhaler', 'cannot afford inhaler', 'no rescue inhaler', 'no access to inhaler'],
  persistent_vomiting: ['persistent vomiting', 'repeated vomiting', 'vomiting repeatedly'],
  fecal_impaction_procedure_plan: ['fecal impaction', 'disimpaction', 'manual disimpaction', 'enema plan', 'enema in ed'],
  no_flatus: ['no flatus', 'not passing gas', 'cannot pass gas', 'unable to pass gas'],
  nursing_home_patient: ['nursing home', 'long term care', 'skilled nursing facility'],
  opioid_induced_constipation: ['opioid induced constipation', 'opioid-induced constipation', 'constipation from opioids', 'taking oxycodone', 'taking morphine', 'taking hydromorphone'],
  pregnancy: ['is pregnant', 'patient is pregnant', 'pregnancy'],
  pneumonia: ['pneumonia', 'infiltrate', 'consolidation'],
  positive_strep_test: ['positive strep', 'strep positive', 'positive rapid strep'],
  rapid_progression: ['rapidly spreading', 'rapid progression'],
  severe_eye_pain: ['severe eye pain', 'significant eye pain', 'deep eye pain'],
  severe_or_focal_abdominal_pain: ['severe abdominal pain', 'severe belly pain', 'localized abdominal pain', 'focal abdominal pain', 'one-sided abdominal pain'],
  sepsis: ['sepsis', 'septic', 'shock'],
  specialist_directed_allergy_plan: ['allergy consulted', 'allergist directed plan', 'specialist directed allergy plan'],
  specialist_directed_podiatry_plan: ['podiatry consulted', 'podiatrist directed plan', 'specialist directed podiatry plan'],
  systemic_allergic_reaction: ['bodywide reaction', 'diffuse hives', 'vomiting after sting', 'two system reaction'],
  systemic_illness: ['fever', 'chills', 'toxic appearing', 'very ill', 'systemic illness'],
  systemic_or_recurrent_oral_ulcer_features: [
    'recurrent ulcers',
    'ulcers more than 2 weeks',
    'ulcer for 2 weeks',
    'fever with mouth ulcer',
    'rash with mouth ulcer',
    'diarrhea with mouth ulcer',
    'headache with mouth ulcer',
  ],
  genital_ulcers: ['genital ulcers', 'genital sores', 'vaginal ulcers', 'penile ulcers'],
  groin_or_foot_fungal_pathway: ['jock itch', 'tinea cruris', "athlete's foot", 'tinea pedis', 'groin rash', 'foot fungus'],
  extensive_or_recurrent_fungal_rash: ['extensive ringworm', 'widespread ringworm', 'recurrent ringworm', 'failed topical antifungal'],
  ocular_symptoms: ['eye pain', 'red eye', 'vision change', 'photophobia', 'ocular symptoms'],
  mass_red_flag_or_diagnostic_uncertainty: ['rapidly enlarging mass', 'diagnostic uncertainty', 'solid mass', 'hard fixed mass', 'cancer concern'],
  neck_mass_or_swelling: ['neck mass', 'neck swelling', 'swollen neck', 'lump in neck'],
  specialist_directed_ent_plan: ['ent consulted', 'ent directed plan', 'otolaryngology follow up', 'specialist directed ent plan'],
  specialist_directed_burn_plan: ['burn center consulted', 'burn specialist plan', 'specialist directed burn plan'],
  severe_throat_pain: ['severe throat pain', 'severe sore throat', 'throat pain out of proportion'],
  stridor_or_noisy_breathing: ['stridor', 'noisy breathing', 'high pitched breathing'],
  specialist_directed_wound_plan: ['hand surgery consulted', 'plastic surgery consulted', 'specialist directed wound plan', 'wound clinic plan'],
  severe_dehydration: ['severe dehydration', 'syncope', 'very dry', 'shock'],
  toxic_ingestion_or_overdose: ['overdose', 'toxic ingestion', 'poisoning', 'ingested pills', 'carbon monoxide'],
  travel_or_outbreak_diarrhea_pathway: ['travel diarrhea', "traveler's diarrhea", 'outbreak', 'public health notified', 'campylobacter', 'shigella'],
  toe_cellulitis_or_pus: ['toe cellulitis', 'pus from toe', 'pus coming out', 'spreading redness of toe', 'infected toe'],
  tick_borne_illness_concern: ['tick bite', 'lyme', 'erythema migrans', 'bullseye rash', 'rocky mountain spotted fever'],
  snakebite_concern: ['snake bite', 'snakebite', 'rattlesnake', 'copperhead', 'cottonmouth'],
  diabetic_emergency: ['dka', 'diabetic ketoacidosis', 'hhs', 'hyperosmolar', 'glucose 500', 'ketones'],
  severe_bacterial_sinusitis_features: [
    'fever 102',
    'fever 103',
    'high fever',
    'severe facial pain',
    'purulent nasal discharge for 4 days',
    'symptoms over 10 days',
    'symptoms for 10 days',
    'worsening after initial improvement',
    'double worsening',
  ],
  epiglottitis_concern: ['epiglottitis', 'tripod', 'stridor'],
  solitary_kidney: ['solitary kidney', 'transplant kidney'],
  spinal_infection_concern: ['ivdu', 'injection drug', 'epidural abscess', 'spinal infection', 'fever with back pain'],
  surgical_abdomen: ['appendicitis', 'obstruction', 'peritonitis', 'surgical abdomen', 'localized abdominal pain'],
  trismus: ['trismus', 'cannot open mouth'],
  unable_to_use_limb: ['unable to use limb', 'cannot use arm', 'cannot use leg', 'unable to bear weight', 'cannot bear weight'],
  unexplained_bruising_or_abuse_concern: [
    'unexplained bruising',
    'bruising without injury',
    'non accidental trauma',
    'non-accidental trauma',
    'abuse concern',
    'unsafe home',
    'assault concern',
  ],
  hand_tendon_risk: [
    'tendon injury',
    'cannot extend',
    'cannot flex',
    'cannot extend finger',
    'cannot flex fingertip',
    'finger droop',
    'mallet finger',
    'distal extensor avulsion',
    'jersey finger',
    'flexor digitorum profundus avulsion',
    'fdp avulsion',
    'hand laceration',
    'finger laceration',
  ],
  high_risk_wound_location: [
    'face wound',
    'facial wound',
    'hand wound',
    'finger wound',
    'genital wound',
    'scalp wound',
    'wound over joint',
    'high tension wound',
    'over a joint',
  ],
  burn_or_chemical_wound: ['burn', 'chemical wound', 'chemical exposure', 'chemical burn'],
  high_pressure_injection_injury: ['high pressure injection', 'paint gun injection', 'grease gun injection'],
  crush_injury: ['crush injury', 'crushed', 'crush mechanism'],
  ankle_sprain_pathway: ['ankle sprain', 'sprained ankle', 'ankle injury'],
  dislocation: ['dislocation', 'dislocated', 'subluxation'],
  acute_knee_trauma_concern: [
    'knee trauma',
    'knee injury after fall',
    'twisted knee',
    'direct blow to knee',
    'fall onto knee',
    'hit knee',
  ],
  high_energy_trauma: ['high energy trauma', 'motor vehicle crash', 'mvc', 'fall from height', 'pedestrian struck'],
  midline_cervical_tenderness: [
    'midline cervical tenderness',
    'midline neck tenderness',
    'c spine tenderness',
    'c-spine tenderness',
    'cervical spine tenderness',
  ],
  cervical_artery_dissection_concern: [
    'carotid dissection',
    'vertebral artery dissection',
    'cervical artery dissection',
    'neck pain with neurologic symptoms',
    'horner syndrome',
  ],
  specialist_directed_spine_plan: [
    'spine consulted',
    'neurosurgery consulted',
    'specialist directed spine plan',
    'spine specialist plan',
    'cervical collar until spine follow up',
  ],
  scalp_or_nail_or_beard_fungal_infection: [
    'scalp ringworm',
    'tinea capitis',
    'nail fungus',
    'onychomycosis',
    'beard ringworm',
    'tinea barbae',
  ],
  skin_peeling_or_sloughing: ['skin peeling', 'skin sloughing', 'sloughing', 'target lesions'],
  syncope_or_fainting: ['syncope', 'fainting', 'fainted', 'passed out'],
  tendon_or_ligament_rupture_concern: ['tendon rupture', 'ligament rupture', 'complete tear', 'unable to extend', 'unable to flex'],
  flexor_tenosynovitis_concern: ['flexor tenosynovitis', 'pain with passive extension', 'fusiform swelling', 'kanavel sign'],
  scaphoid_tenderness_pattern: ['snuffbox tenderness', 'scaphoid tenderness', 'scaphoid fracture concern'],
  foosh_scaphoid_risk: [
    'foosh',
    'fall on outstretched hand',
    'fell on outstretched hand',
    'thumb side wrist pain after fall',
  ],
  lisfranc_or_midfoot_concern: [
    'lisfranc',
    'midfoot instability',
    'midfoot injury concern',
    'plantar ecchymosis',
    'bruising on the bottom of the foot',
    'midfoot pain',
  ],
  acute_hemarthrosis_or_large_effusion: [
    'acute hemarthrosis',
    'hemarthrosis',
    'large knee effusion',
    'tense knee effusion',
    'rapid knee swelling',
    'large effusion',
  ],
  compartment_syndrome_concern: ['compartment syndrome', 'pain out of proportion', 'tight swelling', 'hard swelling'],
  septic_joint_or_infection_concern: ['septic joint', 'hot joint', 'joint infection', 'fever with joint pain', 'red warm joint'],
  unable_to_bear_weight_lower_extremity: ['unable to bear weight', 'cannot bear weight', 'cannot walk', 'non weight bearing'],
  cannot_ambulate_at_discharge: [
    'unable to ambulate at discharge',
    'cannot ambulate at discharge',
    'discharged non ambulatory',
    'discharged non-ambulatory',
    'left non weight bearing',
    'left non-weight-bearing',
    'non ambulatory at discharge',
    'non-ambulatory at discharge',
  ],
  acute_traumatic_elbow_mechanism: [
    'acute traumatic mechanism',
    'acute trauma',
    'direct blow',
    'fall onto elbow',
    'fell onto elbow',
    'sudden injury',
    'acute injury',
  ],
  overuse_or_repetitive_mechanism: [
    'overuse',
    'repetitive mechanism',
    'repetitive use',
    'repetitive motion',
    'chronic elbow overuse',
    'subacute elbow overuse',
    'tennis elbow',
    'golfer elbow',
    'golfers elbow',
    'lateral epicondylitis',
    'medial epicondylitis',
  ],
  elbow_instability_or_ucl_lcl_concern: [
    'elbow instability concern',
    'elbow instability',
    'unstable elbow',
    'ucl concern',
    'ucl injury',
    'ulnar collateral ligament concern',
    'lcl concern',
    'lcl injury',
    'lateral collateral ligament concern',
    'valgus instability',
    'varus instability',
    'throwing athlete ucl concern',
  ],
  distal_biceps_or_triceps_concern: [
    'distal biceps concern',
    'distal biceps tendon concern',
    'biceps tendon rupture',
    'biceps tendon tear',
    'triceps tendon concern',
    'triceps tendon rupture',
    'triceps tendon tear',
    'pop at the elbow',
    'weakness in supination',
    'weakness twisting the forearm',
    'weakness bending the elbow',
    'weakness straightening the elbow',
    'weakness pronating forearm',
    'unable to supinate',
    'unable to pronate',
    'unable to extend elbow',
    'unable to flex elbow',
  ],
  ulnar_nerve_pattern: [
    'ulnar nerve symptoms',
    'ulnar nerve pattern',
    'cubital tunnel',
    'ring finger numbness',
    'pinky numbness',
    'little finger numbness',
    'ring and little finger numbness',
    'ring and pinky numbness',
    'tingling in ring finger',
    'tingling in pinky',
    'hand intrinsic weakness',
  ],
  olecranon_bursitis_pathway: [
    'olecranon bursitis',
    'elbow bursitis',
    'swollen bursa',
    'posterior elbow swelling',
    'swelling over olecranon',
    'swollen painful bump over the back of the elbow',
    'fluid over the elbow',
  ],
  hand_motor_deficit: [
    'hand motor deficit',
    'hand weakness',
    'weak grip',
    'grip weakness',
    'cannot grip',
    'unable to grip',
    'finger weakness',
    'cannot spread fingers',
  ],
  wrist_site_pending_split: ['wrist sprain', 'wrist strain', 'wrist sprain xray negative', 'wrist strain xray negative'],
  elbow_or_foot_site_pending_split: [
    'elbow sprain',
    'elbow strain',
    'elbow sprain xray negative',
    'elbow strain xray negative',
    'foot sprain',
    'foot strain',
    'foot sprain xray negative',
    'foot strain xray negative',
  ],
  pediatric_growth_plate_pathway: ['growth plate', 'salter harris', 'pediatric injury', 'child with sprain'],
  elderly_osteoporotic_high_risk_msk: ['osteoporosis', 'osteoporotic', 'fragility fracture history', 'low bone density'],
  specialist_directed_orthopedic_plan: ['orthopedics consulted', 'orthopedic plan', 'sports medicine consulted', 'specialist directed orthopedic plan'],
  retained_foreign_body: ['foreign body', 'glass retained', 'splinter retained', 'object stuck'],
  mastoiditis_or_deep_ear_infection_concern: ['mastoiditis', 'mastoid tenderness', 'redness behind ear', 'swelling behind ear', 'protruding ear'],
  malignant_otitis_externa_risk: ['malignant otitis externa', 'diabetes', 'diabetic', 'immunocompromised', 'skull base osteomyelitis'],
  ear_trauma_or_foreign_body: ['ear trauma', 'foreign body in ear', 'object in ear', 'button battery', 'cotton swab injury'],
  tympanic_membrane_perforation_or_tube: ['perforated eardrum', 'eardrum perforation', 'ear tube', 'tympanostomy tube'],
  facial_weakness_or_neurologic_ear_sign: ['facial weakness', 'facial droop', 'cranial nerve deficit', 'vertigo', 'severe dizziness'],
  acute_hearing_loss: ['sudden hearing loss', 'acute hearing loss', 'new hearing loss'],
  otitis_externa_or_ear_canal_pathway: ['otitis externa', "swimmer's ear", 'swimmers ear', 'ear canal infection'],
  recurrent_or_chronic_ear_infection: ['recurrent ear infection', 'chronic ear infection', 'recurrent otitis media', 'chronic otitis media'],
  severe_systemic_ear_infection: ['toxic appearing', 'severe systemic illness', 'high fever with ear pain', 'sepsis'],
  uncontrolled_pain: ['uncontrolled pain', 'intractable pain'],
  uncontrolled_vomiting: ['intractable vomiting', 'cannot keep down'],
  unable_to_bear_weight: ['unable to bear weight', 'cannot bear weight', 'cannot walk at all'],
  unable_to_tolerate_oral_fluids: ['cannot keep fluids down', 'unable to tolerate oral', 'failed po challenge'],
  unable_to_walk: ['unable to walk', 'cannot walk', 'nonambulatory'],
  unstable_vitals: ['unstable vitals', 'hypotension', 'tachycardia', 'toxic appearing'],
  urinary_obstruction: ['urinary obstruction', 'obstructing stone', 'retention'],
  unknown_trigger: ['unknown trigger', 'unclear trigger', 'trigger unclear'],
  voice_change: ['voice change', 'muffled voice', 'hoarse voice', 'hot potato voice'],
  vision_change: ['vision change', 'blurred vision', 'vision loss', 'decreased vision', 'double vision'],
  vomiting_unable_to_take_meds: ['vomiting', 'cannot take pills', 'cannot keep meds down'],
  epinephrine_given: ['epinephrine given', 'epi given', 'epipen used', 'used epipen', 'received epinephrine'],
  eye_or_genital_rash_location: [
    'rash near eye',
    'eyelid rash',
    'eye involvement',
    'genital rash',
    'scrotal rash',
    'vulvar rash',
    'rash on genitals',
  ],
  bullous_or_extensive_impetigo: [
    'bullous impetigo',
    'extensive impetigo',
    'widespread impetigo',
    'rapidly spreading impetigo',
    'recurrent impetigo',
  ],
  abscess_or_boils_or_carbuncle: [
    'abscess',
    'boil',
    'furuncle',
    'carbuncle',
    'pus pocket',
    'needs drainage',
    'incision and drainage',
  ],
  crusted_scabies_or_institutional_outbreak: [
    'crusted scabies',
    'norwegian scabies',
    'institutional outbreak',
    'nursing home outbreak',
    'shelter outbreak',
    'jail outbreak',
    'public health scabies plan',
  ],
  disseminated_or_complicated_zoster: [
    'disseminated shingles',
    'disseminated zoster',
    'widespread shingles',
    'multi-dermatomal zoster',
    'pneumonia with shingles',
    'ramsay hunt',
    'hearing loss with shingles',
  ],
  ecthyma_or_deep_skin_infection: [
    'ecthyma',
    'deep impetigo',
    'deep skin infection',
    'ulcerative impetigo',
    'necrotic skin infection',
  ],
  felon_or_tenosynovitis_concern: [
    'felon',
    'tense finger pad',
    'finger pad abscess',
    'flexor tenosynovitis',
    'kanavel',
    'pain with passive extension',
    'fusiform swelling',
  ],
  heat_illness_or_dehydration: [
    'heat exhaustion',
    'heat stroke',
    'heat illness',
    'confusion after heat',
    'syncope after heat',
    'fainted from heat',
    'dehydration',
    'severe dehydration',
    'persistent vomiting',
  ],
  large_blistering_or_high_risk_burn: [
    'large blisters',
    'large blistering',
    'blistering over large area',
    'second degree burn',
    'circumferential burn',
    'face burn',
    'genital burn',
    'severe sunburn',
  ],
  molluscum_genital_eye_or_extensive: [
    'genital molluscum',
    'molluscum on genitals',
    'molluscum near eye',
    'eye involvement',
    'extensive molluscum',
    'widespread molluscum',
    'disseminated molluscum',
  ],
  recurrent_or_outbreak_folliculitis: [
    'recurrent folliculitis',
    'hot tub folliculitis',
    'outbreak folliculitis',
    'multiple people with folliculitis',
    'failed folliculitis treatment',
  ],
  recurrent_or_persistent_eyelid_mass: [
    'recurrent chalazion',
    'recurrent eyelid bump',
    'persistent chalazion',
    'persistent eyelid lump',
    'eyelid mass',
    'biopsy planned',
  ],
  tinea_pedis_extensive_or_recurrent: [
    'extensive tinea pedis',
    "widespread athlete's foot",
    'recurrent tinea pedis',
    'failed topical antifungal',
    'moccasin tinea pedis',
  ],
  eczema_severe_or_widespread: [
    'severe eczema',
    'widespread eczema',
    'diffuse eczema flare',
    'erythroderma',
    'severe atopic dermatitis',
  ],
  oral_herpes_high_risk_or_complicated: [
    'eczema herpeticum',
    'disseminated herpes',
    'widespread herpes',
    'newborn exposure',
    'neonatal exposure',
    'herpes near eye',
    'oral herpes near eye',
  ],
  plantar_wart_complicated_or_extensive: [
    'bleeding wart',
    'wart bleeding',
    'many plantar warts',
    'extensive plantar warts',
    'mucosal wart',
    'wart impairing walking',
  ],
  corn_callus_complicated_foot_risk: [
    'bleeding callus',
    'cracked callus bleeding',
    'foot ulcer',
    'black skin',
    'ischemic foot',
    'callus impairing walking',
  ],
  acne_severe_or_medication_sensitive: [
    'severe acne',
    'cystic acne',
    'nodular acne',
    'acne fulminans',
    'isotretinoin',
    'accutane',
    'teratogenic acne medication',
  ],
  dry_skin_complicated_or_systemic: [
    'bleeding cracks',
    'bleeding fissures',
    'severe itching',
    'widespread dry skin',
    'psoriasis flare',
    'systemic cause of dry skin',
  ],
  severe_cutaneous_adverse_reaction: [
    'stevens johnson',
    'sjs',
    'toxic epidermal necrolysis',
    'ten',
    'skin peeling',
    'peeling skin',
    'blistering rash',
    'target lesions',
    'mouth sores',
  ],
  zoster_eye_face_or_neuro_concern: [
    'shingles near eye',
    'zoster near eye',
    'rash near eye',
    'face shingles',
    'facial shingles',
    'ear shingles',
    'ramsay hunt',
    'eye involvement',
    'facial weakness',
    'hearing loss with shingles',
    'confusion with shingles',
    'weakness with shingles',
  ],
  specialist_directed_dermatology_plan: [
    'dermatology consulted',
    'dermatologist directed plan',
    'specialist directed dermatology plan',
    'urgent dermatology follow up',
    'biopsy planned',
  ],
  specialist_directed_ophthalmology_plan: [
    'ophthalmology consulted',
    'ophthalmologist directed plan',
    'specialist directed ophthalmology plan',
    'urgent ophthalmology follow up',
    'eye specialist plan',
  ],
  renal_failure: ['renal failure', 'kidney failure', 'aki', 'acute kidney injury', 'creatinine elevated'],
  respiratory_distress: ['respiratory distress', 'tripoding', 'unable to speak full sentences', 'accessory muscle use'],
  skull_fracture_concern: ['skull fracture', 'basilar skull', 'periorbital ecchymosis', 'csf leak'],
  syncope: ['syncope', 'fainting', 'passed out', 'near syncope'],
  altered_mental_status_not_resolved: [
    'altered mental status not fully resolved',
    'ams not resolved',
    'confusion not resolved',
    'persistent confusion',
  ],
  ct_not_performed_with_headache_concern: [
    'ct not performed with documented concern',
    'ct not done with documented concern',
    'no ct with documented concern',
    'ct deferred despite concern',
  ],
  first_lifetime_severe_headache: [
    'first lifetime headache',
    'first headache of this severity',
    'first headache this severe',
    'first severe headache',
  ],
  thunderclap_or_sah_concern: [
    'thunderclap',
    'sudden severe headache reaches worst within seconds',
    'worst headache',
    'worst headache of life',
    'subarachnoid',
    'sah concern',
  ],
  specialist_directed_neurology_plan: [
    'neurology consulted',
    'specialist directed neurology plan',
    'neurology follow up urgently',
    'headache clinic urgent plan',
  ],
  dvt_or_pe_concern: [
    'dvt concern',
    'deep vein thrombosis concern',
    'calf swelling',
    'calf tenderness',
    'pulmonary embolism concern',
    'pe concern',
  ],
  prosthetic_joint: ['prosthetic knee', 'knee replacement', 'prosthetic joint', 'total knee replacement', 'tkr'],
};

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..', '..');
// Bundling can move this module. Included data retains its project-relative path.
const ontologyRoots = [join(repoRoot, 'knowledge', 'ontology'), join(process.cwd(), 'knowledge', 'ontology')];
const ontologyRoot = ontologyRoots.find(root => existsSync(join(root, 'runtime', 'ontology_manifest.json'))) || ontologyRoots[0];
const manifestPath = join(ontologyRoot, 'runtime', 'ontology_manifest.json');

function readJSON(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function normalize(text) {
  return String(text || '').toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function hasNonNegated(text, term) {
  let start = 0;
  while (true) {
    const idx = text.indexOf(term, start);
    if (idx < 0) return false;
    const window = text.slice(Math.max(0, idx - 32), idx);
    const after = text.slice(idx + term.length, idx + term.length + 32);
    if (!NEGATION_PATTERN.test(window) && !NEGATION_SUFFIX_PATTERN.test(after)) return true;
    start = idx + term.length;
  }
}

function hasAffirmedConditionTerm(text, term) {
  let start = 0;
  while (true) {
    const idx = text.indexOf(term, start);
    if (idx < 0) return false;
    const before = text.slice(Math.max(0, idx - 48), idx);
    const after = text.slice(idx + term.length, idx + term.length + 72);
    if (!DIAGNOSTIC_NEGATION_PREFIX.test(before) && !DIAGNOSTIC_NEGATION_SUFFIX.test(after)) return true;
    start = idx + term.length;
  }
}

function modifierHits(text, modifiers = []) {
  const hits = [];
  for (const modifier of modifiers) {
    if (modifier === 'foosh_scaphoid_risk') {
      const mechanismTerms = ['foosh', 'fall on outstretched hand', 'fell on outstretched hand'];
      const scaphoidRiskTerms = [
        'snuffbox tenderness',
        'scaphoid tenderness',
        'radial sided wrist pain',
        'radial-sided wrist pain',
        'thumb side wrist pain',
        'thumb-side wrist pain',
        'pain at the base of the thumb',
        'inability to grip',
        'unable to grip',
        'cannot grip',
      ];
      if (mechanismTerms.some((term) => hasNonNegated(text, term)) && scaphoidRiskTerms.some((term) => hasNonNegated(text, term))) {
        hits.push(modifier);
      }
      continue;
    }
    const terms = EXCLUSION_RULES[modifier] || [modifier.replaceAll('_', ' ')];
    if (terms.some((term) => hasNonNegated(text, term))) hits.push(modifier);
  }
  return [...new Set(hits)].sort();
}

function outputModifierHits(text, outputModifiers = []) {
  return outputModifiers
    .filter((modifier) => {
      const terms = EXCLUSION_RULES[modifier.id] || [modifier.id.replaceAll('_', ' ')];
      return terms.some((term) => hasNonNegated(text, term));
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}

function missingRequiredContexts(text, requiredContext = []) {
  const missing = [];
  for (const item of requiredContext) {
    const terms = (item.terms || []).map((term) => normalize(term));
    if (terms.length && !terms.some((term) => hasNonNegated(text, term))) missing.push(item.id);
  }
  return [...new Set(missing)].sort();
}

function confidenceFor(text, phenotype, exclusions = []) {
  const terms = phenotype.condition_terms || [];
  const matched = terms.map((term) => normalize(term)).filter((term) => hasAffirmedConditionTerm(text, term));
  if (!matched.length) return { confidence: 0, matched };
  const score = matched.length / Math.max(terms.length, 1);
  const exactTerms = [normalize(phenotype.id), normalize(phenotype.label), ...(phenotype.high_confidence_terms || []).map((term) => normalize(term))];
  const exactMatch = exactTerms.some((term) => text.includes(term));
  const penalty = exclusions.length ? 0.15 : 0;
  const baseConfidence = exactMatch ? 0.93 : 0.55 + 0.35 * score;
  return { confidence: Math.min(0.98, baseConfidence - penalty), matched };
}

function matchSpecificity(matched = []) {
  return {
    longest: matched.reduce((longest, term) => Math.max(longest, term.length), 0),
    count: matched.length,
  };
}

function loadManifest() {
  if (!existsSync(manifestPath)) return null;
  return readJSON(manifestPath);
}

function loadPrimitives() {
  const primitiveDir = join(ontologyRoot, 'primitives');
  const primitives = {};
  for (const file of readdirSync(primitiveDir)) {
    if (!file.endsWith('.json')) continue;
    const rows = readJSON(join(primitiveDir, file));
    if (!Array.isArray(rows)) continue;
    for (const row of rows) primitives[row.id] = row;
  }
  return primitives;
}

function phenotypePrimitiveSet(phenotypeId) {
  const phenotypePath = join(ontologyRoot, 'phenotypes', `${phenotypeId}.json`);
  const phenotype = readJSON(phenotypePath);
  const primitives = loadPrimitives();
  const selected = phenotype.primitive_ids.map((id) => primitives[id]).filter(Boolean);
  return { phenotype, selected };
}

function normalizeOutputLabel(value = '') {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function ontologyTextKeyForReadingLevel(readingLevel = '6th Grade') {
  const normalized = normalizeOutputLabel(readingLevel);
  if (normalized.includes('health literacy level 1') || normalized.includes('hl 1')) return 'en_hl1';
  if (normalized.includes('4th') || normalized.includes('4 grade')) return 'en_4';
  if (normalized.includes('6th') || normalized.includes('6 grade')) return 'en_6';
  return null;
}

function ontologySupportsLanguage(language = 'English') {
  const normalized = normalizeOutputLabel(language);
  return normalized === SUPPORTED_ONTOLOGY_LANGUAGE || normalized.startsWith(`${SUPPORTED_ONTOLOGY_LANGUAGE} `);
}

function unsupportedOutputMode(result, fallbackReason, { readingLevel, language }) {
  return {
    ...result,
    mode: 'generator',
    fallback_reason: fallbackReason,
    output_format: {
      reading_level: readingLevel,
      language,
      supported: false,
    },
  };
}

function assemble(phenotypeId, textKey = 'en_6') {
  const { selected } = phenotypePrimitiveSet(phenotypeId);
  const lines = [];
  for (const [section, header] of SECTION_ORDER) {
    const items = selected.filter((item) => item.section === section);
    if (!items.length) {
      if (section === 'resources') continue;
      throw new Error(`Ontology phenotype missing ${section}`);
    }
    lines.push(header);
    for (const item of items) {
      const text = item.text?.[textKey];
      if (!text) throw new Error(`Ontology primitive ${item.id} missing ${textKey}`);
      if (['home_care', 'medications', 'return_precautions', 'resources'].includes(section)) lines.push(`- ${text}`);
      else lines.push(text);
    }
    lines.push('');
  }
  return `${lines.join('\n').trim()}\n`;
}

function normalizeChiefComplaint(value = '') {
  return String(value || '')
    .replace(/[_-]+/g, ' ')
    .replace(/["“”\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120)
    .replace(/[.!?;:,]+$/, '');
}

export function addPrimaryCareCallScript(output, condition = '') {
  const chiefComplaint = normalizeChiefComplaint(condition);
  if (!chiefComplaint) return output;

  const followUpPattern = /(FOLLOW UP:\n)([\s\S]*?)(\n\nRESOURCES:|$)/;
  const match = String(output || '').match(followUpPattern);
  if (!match) return output;

  const followUpText = match[2];
  const namesPrimaryCare = /\b(?:primary care|PCP|PMD)\b/i.test(followUpText);
  const alreadyHasCallScript = /\bSay,\s*["“]/i.test(followUpText);
  if (!namesPrimaryCare || alreadyHasCallScript) return output;

  const callScript = `Call your primary care doctor's office or clinic to make an appointment. Say, "I was seen in the emergency department for ${chiefComplaint}. I need a follow-up appointment."`;
  return output.replace(
    followUpPattern,
    (_section, header, existingFollowUp, resourcesHeader) => `${header}${callScript}\n${existingFollowUp}${resourcesHeader}`,
  );
}

export function sourceCardsForPhenotype(phenotypeId) {
  const { phenotype, selected } = phenotypePrimitiveSet(phenotypeId);
  return [...new Set([
    ...(phenotype.source_card_ids || []),
    ...selected.flatMap((primitive) => primitive.source_card_ids || []),
  ])].sort();
}

export function classifyOntology({ condition, edNoteScrubbed = '' }) {
  const manifest = loadManifest();
  if (!manifest) {
    return {
      mode: 'generator', phenotype_id: null, confidence: 0,
      exclusions: [], missing_required_context: [], modifiers: [], output_modifiers: [],
      fallback_reason: 'ontology_assets_unavailable',
    };
  }
  const text = normalize(`${condition} ${edNoteScrubbed}`);
  const scored = [];
  for (const phenotype of manifest.phenotypes || []) {
    const exclusions = modifierHits(text, phenotype.unsafe_modifiers);
    const outputModifiers = outputModifierHits(text, phenotype.output_modifiers);
    const missingContext = missingRequiredContexts(text, phenotype.required_context);
    const { confidence, matched } = confidenceFor(text, phenotype, exclusions);
    if (!matched.length) continue;
    const specificity = matchSpecificity(matched);
    scored.push({ phenotype, confidence, matched, specificity, exclusions, missingContext, outputModifiers });
  }
  scored.sort((a, b) => (
    b.confidence - a.confidence ||
    b.specificity.longest - a.specificity.longest ||
    b.specificity.count - a.specificity.count
  ));
  const best = scored[0];
  if (!best) {
    return {
      mode: 'generator',
      phenotype_id: null,
      confidence: 0,
      exclusions: [],
      missing_required_context: [],
      modifiers: [],
      output_modifiers: [],
      fallback_reason: 'no_supported_phenotype_match',
    };
  }

  let fallbackReason = null;
  if (best.exclusions.length) fallbackReason = 'unsafe_modifier_present';
  else if (best.missingContext.length) fallbackReason = 'required_runtime_context_missing';
  else if (best.phenotype.status !== 'reviewed' || best.phenotype.review_status !== 'reviewed') fallbackReason = 'phenotype_not_clinician_reviewed';
  else if (best.phenotype.source_audit?.source_needed) fallbackReason = 'source_audit_not_passed';
  else if (best.confidence < 0.86) fallbackReason = 'low_confidence';

  return {
    mode: fallbackReason ? 'generator' : 'ontology',
    phenotype_id: best.phenotype.id,
    confidence: Number(best.confidence.toFixed(3)),
    exclusions: best.exclusions,
    missing_required_context: best.missingContext,
    modifiers: best.matched,
    output_modifiers: best.outputModifiers,
    fallback_reason: fallbackReason,
  };
}

export function tryOntologyGeneration(payload) {
  const normalizedPayload = payload || {};
  const { readingLevel = '6th Grade', language = 'English' } = normalizedPayload;
  const result = classifyOntology(normalizedPayload);
  if (result.mode !== 'ontology') return result;
  if (!ontologySupportsLanguage(language)) {
    return unsupportedOutputMode(result, 'unsupported_ontology_language', { readingLevel, language });
  }
  const textKey = ontologyTextKeyForReadingLevel(readingLevel);
  if (!textKey) {
    return unsupportedOutputMode(result, 'unsupported_ontology_reading_level', { readingLevel, language });
  }
  return {
    ...result,
    output: addPrimaryCareCallScript(assemble(result.phenotype_id, textKey), normalizedPayload.condition),
    output_format: {
      reading_level: readingLevel,
      language,
      supported: true,
      ontology_text_key: textKey,
    },
    source_cards_used: sourceCardsForPhenotype(result.phenotype_id),
  };
}
