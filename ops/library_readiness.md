# DC Instructor library readiness

Generated from repository content by `python3 ops/build_library_audit.py`. This is a release-planning audit, not a clinical approval.

## Current inventory

| Measure | Count |
|---|---:|
| manifest phenotypes | 318 |
| runtime enabled | 312 |
| retired | 6 |
| planning families | 86 |
| enabled planning families | 83 |
| english files | 936 |
| identical english level sets | 307 |
| spanish files | 0 |
| version bound approvals | 0 |
| historical approval narratives | 7 |

Planning families group related maintenance work. They do not make variants interchangeable and are not an approved clinical taxonomy.
The legacy `reviewed` flag enables runtime use; it does not prove clinician approval. Historical approval narratives remain in the source files. None is automatically treated as approval of the current content hash.
Different filenames do not establish different reading levels. Identical text is a signal for adaptation review; nonidentical text still needs literacy assessment.

## Usage-driven coverage matrix

Baseline: [2026-09-01 snapshot](../metrics/snapshots.md), 159 requests. The ten published conditions represent 51 requests; the remaining requests are not classified here. No overall coverage percentage can be inferred.
Spanish: 30 requests. Latest partial count: 168 on 2026-09-04. These are saved snapshots, not a live database query.

The probe sends only the displayed chief complaint, with English 6th-grade output and no ED note. It measures routing for that input, not eligibility of an actual patient.

| Priority | Request | Count | Available scope | Condition-only route | Next work |
|---|---|---:|---|---|---|
| P1 | Chest pain | 10 | Broad chest-pain route retired; separate diagnosed chest-wall pathways exist | `no_supported_phenotype_match` | Design clinician-confirmed post-evaluation instructions without implying automated risk stratification |
| P1 | Rash | 8 | Many diagnosis-specific routes; undifferentiated rash is not equivalent | `no_supported_phenotype_match` | Consolidate maintenance around core care families and adapt English levels before Spanish |
| P1 | Abdominal pain | 6 | Limited to documented clinician-directed recheck | `no_supported_phenotype_match` | Review whether the recheck scope meets actual use and collect explicit evaluation and follow-up context |
| P1 | Dizziness | 6 | No dedicated reviewed route | `no_supported_phenotype_match` | Define diagnosis-specific scope and needed evidence before authoring |
| P1 | Sexual assault | 5 | No dedicated reviewed route | `no_supported_phenotype_match` | Create a specialist and local-workflow review brief; do not reuse a generic static discharge pathway |
| P2 | Diarrhea | 4 | Limited stable-adult pathways exist | `no_supported_phenotype_match` | Test ordinary clinician wording, improve English adaptations, then prepare Spanish review |
| P1 | Headache | 3 | Migraine retired; narrow tension-headache route exists | `no_supported_phenotype_match` | Separate diagnosed headache instructions from assessment of undifferentiated headache |
| P2 | Back pain | 3 | Limited mechanical low-back-pain route exists | `no_supported_phenotype_match` | Validate real wording and preserve clinician-specific activity and medication plans |
| P2 | Sore throat | 3 | Limited strep-negative viral pathway exists | `no_supported_phenotype_match` | Confirm diagnosis and testing context; adapt English and Spanish output |
| P1 | Left flank pain | 3 | Stable renal-colic route only; flank pain alone is not a diagnosis | `no_supported_phenotype_match` | Validate diagnosed stone context and explicitly retain fallback for other causes |

## Planning families

Full phenotype mapping, content fingerprints, and individual review status: [library_audit.json](library_audit.json). Editable mapping: [coverage_map.json](coverage_map.json).

| Family | Runtime enabled | Retired |
|---|---:|---:|
| Abdominal pain recheck after reassuring ED evaluation | 1 | 0 |
| Abscess after incision and drainage | 1 | 0 |
| Acute bronchitis or chest cold without pneumonia concern | 1 | 0 |
| Acute sinusitis supportive care without antibiotic plan | 1 | 0 |
| Adult constipation after reassuring ED assessment without obstruction or bleeding concern | 1 | 0 |
| Asthma exacerbation improved for discharge | 1 | 0 |
| Asymptomatic elevated blood pressure without end-organ symptoms | 1 | 0 |
| Atraumatic knee pain without red flags | 1 | 0 |
| Cerumen impaction without infection or foreign body | 1 | 0 |
| Chafing | 5 | 0 |
| Community-acquired pneumonia, outpatient | 1 | 0 |
| Concussion discharge without imaging red flags | 1 | 0 |
| Conjunctivitis | 2 | 1 |
| Contact and irritant dermatitis | 68 | 0 |
| Contusions and bruises | 35 | 0 |
| Dental pain without deep-space infection | 1 | 0 |
| Dry skin | 10 | 0 |
| Ear canal irritation after swimming without otitis externa or foreign body red flags | 1 | 0 |
| Epistaxis | 1 | 1 |
| Friction blisters | 8 | 0 |
| Gastroenteritis and acute diarrhea | 2 | 0 |
| Healing wound without infection or dehiscence | 1 | 0 |
| Hives and resolved allergic reactions | 2 | 0 |
| Ingrown toenail without abscess or cellulitis | 1 | 0 |
| Joint sprains | 11 | 0 |
| Localized impetigo without cellulitis or systemic symptoms | 1 | 0 |
| Localized insect bites and stings | 13 | 0 |
| Localized molluscum contagiosum without genital or immunocompromised-host features | 1 | 0 |
| Localized oral herpes labialis without eye involvement or immunocompromised host | 1 | 0 |
| Localized shingles without eye or neurologic complication | 1 | 0 |
| Low-risk chest pain after negative ED workup | 0 | 1 |
| Migraine improved after ED treatment | 0 | 1 |
| Mild acne without abscess or medication red flags | 1 | 0 |
| Mild allergic rhinitis without wheeze or anaphylaxis | 1 | 0 |
| Mild eczema flare without infection or systemic symptoms | 1 | 0 |
| Mild eyelid skin irritation without eye or infection red flags | 1 | 0 |
| Minor head injury without red flags | 1 | 0 |
| Minor nail injury without fracture, nail-bed laceration, or infection | 1 | 0 |
| Minor oral irritation | 5 | 0 |
| Minor splinter removed without retained foreign body or infection | 1 | 0 |
| Minor superficial burn, small area, without high-risk features | 1 | 0 |
| Minor superficial cut without deep wound or infection red flags | 1 | 0 |
| Muscle strains | 34 | 1 |
| Nasal dryness without epistaxis or infection red flags | 1 | 0 |
| Nausea and vomiting, stable and hydrating, without abdominal pain | 1 | 0 |
| Noninfectious bursitis | 7 | 0 |
| Renal colic, stable, no infection concern | 1 | 0 |
| Seborrheic dermatitis or dandruff without secondary infection | 1 | 0 |
| Shaving and grooming irritation | 4 | 0 |
| Simple canker sore without systemic symptoms | 1 | 0 |
| Simple chalazion without vision or orbital red flags | 1 | 0 |
| Simple laceration repair | 1 | 0 |
| Simple paronychia without abscess or felon | 1 | 0 |
| Simple stye without orbital or vision red flags | 1 | 0 |
| Sore nostril skin irritation without cellulitis or epistaxis red flags | 1 | 0 |
| Stable adult influenza-like illness with supportive-care discharge plan | 1 | 0 |
| Superficial abrasions | 13 | 0 |
| Superficial fungal infection | 4 | 0 |
| Superficial puncture wound without retained foreign body or infection | 1 | 0 |
| Superficial sunburn without heat illness or large blistering | 1 | 0 |
| Suture removal or wound check without infection concern | 1 | 0 |
| Tendinopathy and epicondylitis | 21 | 0 |
| Tension-type headache with reassuring exam and no red flags | 1 | 0 |
| Uncomplicated TMJ pain without dental, deep-space, or neurologic red flags | 1 | 0 |
| Uncomplicated acute otitis media without mastoiditis concern | 1 | 0 |
| Uncomplicated blepharitis without vision or orbital red flags | 1 | 0 |
| Uncomplicated bunion without infection or diabetic-foot risk | 1 | 0 |
| Uncomplicated cellulitis treated as outpatient | 1 | 0 |
| Uncomplicated corn or callus without diabetic foot or infection | 1 | 0 |
| Uncomplicated costochondritis without cardiopulmonary red flags | 1 | 0 |
| Uncomplicated cystitis in a nonpregnant patient | 1 | 0 |
| Uncomplicated folliculitis without abscess or cellulitis | 1 | 0 |
| Uncomplicated ganglion cyst without neurovascular symptoms or infection | 1 | 0 |
| Uncomplicated head lice without secondary infection | 1 | 0 |
| Uncomplicated heat rash without heat illness or infection | 1 | 0 |
| Uncomplicated hemorrhoids without heavy bleeding or infection concern | 1 | 0 |
| Uncomplicated laryngitis without airway or deep-neck red flags | 1 | 0 |
| Uncomplicated osteoarthritis flare without septic-joint or trauma concern | 1 | 0 |
| Uncomplicated otitis externa without mastoiditis concern | 0 | 1 |
| Uncomplicated pityriasis rosea without systemic symptoms | 1 | 0 |
| Uncomplicated plantar fasciitis without trauma or neurovascular red flags | 1 | 0 |
| Uncomplicated scabies without crusted disease or secondary infection | 1 | 0 |
| Uncomplicated trigger finger without infection or neurovascular symptoms | 1 | 0 |
| Viral pharyngitis, strep negative | 1 | 0 |
| Viral upper respiratory infection | 2 | 0 |
| Warts | 2 | 0 |

## Release gates

1. Engineering: reconcile main, pass Python/Netlify cases, handler logging tests, ontology/export checks, and production build.
2. Clinical scope: clinician-owner confirms v1 families and intended exclusions. Rebuild retired pathways only after specific review.
3. Approval: record explicit clinician approval tied to each selected family's actual phenotype content hashes. See [REVIEW_PROVENANCE.md](REVIEW_PROVENANCE.md).
4. Literacy: adapt the identical English variants, then assess meaning and reading level. Prioritize usage and supported diagnoses.
5. Spanish: prepare and clinically review translations for the chosen first-release scope, then add output-format and semantic QA.
6. Product validation: test ordinary notes, missing and conflicting context, medication passthrough, clinician edits, copy/print, and fallbacks in the deployment preview.
7. Measurement: persist or aggregate route and fallback metadata without ED-note text. Current generation rows do not establish a reviewed-library utilization rate.

Do not resume phase-count expansion by default. Completion is the signed-off scope passing these gates, not a target number of variants.
