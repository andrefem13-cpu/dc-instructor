# DC Instructor completion plan

Target: a clinician-supervised bilingual pilot on September 19, 2026. This is a proposed planning date, conditional on scope confirmation and content review. It is not a clinical approval or a production release commitment.

## Finish line

Five explicitly selected pathways have reviewed English and Spanish output, verified routing and fallback behavior, and passing preview tests. Every released content version has an attributable clinician approval. A larger library is future work.

Proposed first scope, pending André's confirmation:

| Pathway | Existing phenotype ID |
|---|---|
| Stable acute diarrhea | `acute_diarrhea_stable_no_blood_or_dehydration` |
| Mechanical low-back pain | `lumbar_strain_no_red_flags` |
| Strep-negative viral sore throat | `viral_pharyngitis_strep_negative` |
| Diagnosed uncomplicated contact dermatitis | `contact_dermatitis_uncomplicated` |
| Stable diagnosed renal colic | `renal_colic_stable_no_infection` |

These candidates connect existing pathways to the usage gaps in the supplied report. Each exact scope requires clinician review. A broad complaint alone does not establish eligibility. Retired pathways, undifferentiated chest pain, dizziness, and sexual-assault workflows remain outside this proposed library pilot. Existing generator fallbacks also require product validation; exclusion from the library does not imply that the application refuses generation.

## Work and acceptance gates

| Target | Work | Owner | Evidence needed |
|---|---|---|---|
| September 7 | Recover the September 5 ZIP; compare its commits against current main and the reconciliation branch. Resolve dependency findings. | Engineering | Reviewed diff, passing runtime/handler/export/build/bundling checks; no missing recovery work |
| September 8 | Confirm the five exact pathways, output settings, exclusions, and intended pilot users. | André | Explicit scope decision recorded in the repository |
| September 11 | Adapt English 4th-grade, 6th-grade, and HL-1 content for selected pathways. | Engineering drafts; André reviews | Meaning, medication instructions, return precautions, and follow-up checked across levels; automated scores used only as screening |
| September 14 | Prepare Spanish versions and complete bilingual clinical review. | Engineering drafts; qualified bilingual clinician reviews | Semantic equivalence and format checks, reviewer attribution, approvals tied to actual content hashes |
| September 17 | Exercise the deployment preview with synthetic cases and clinician edits. | Engineering and André | Ordinary wording, absent/conflicting context, medication passthrough, all selected formats, copy/print, error paths, and fallback behavior pass |
| September 18 | Validate privacy-minimized route measurement and release controls. | Engineering; André authorizes production changes | Route/fallback counters without note text; approval invalidation on content changes; defined pilot scope enforcement; rollback procedure |
| September 19 | Go/no-go for supervised pilot. | André | All gates pass for the same release commit; unresolved blockers move the date |

No recurring work has been scheduled. Dates are milestones, not unattended execution promises.

## Verified September 5

GitHub read access and repository permissions are available on this Mac. The original PR #1 still points to `73bb84f` and has a merge conflict with main `b59f0c6`. An isolated branch, `codex/release-completion-2026-09-05`, reconciles those histories at `ff124bc`.

The conflict concerned usage logging. The repaired handler logs static output once and logs generator requests only after upstream acceptance. Four mocked handler scenarios check static output, upstream acceptance, upstream rejection, and network failure. These tests make no external requests. Midstream completion accounting remains outside this change.

Fresh checks passed: 1,671 Python runtime cases, the Netlify runtime smoke suite, ontology validation, export validation of 936 files across 312 conditions, product tailoring and medication prompt checks, and the production build. Patient-facing library files were unchanged by this reconciliation.

The supplied report describes 1,679 cases and additional approval/audit/bundling work in a recovery ZIP. That ZIP was not found in the inspected local locations. Its commits and additional checks have not been recovered or independently verified. Do not mark those tasks complete from the report alone.

Dependency inspection reports one high-severity production dependency finding in `ws`. The complete dependency tree reports eight findings. Triage and repair are an engineering release gate; no automatic breaking upgrades were applied.

## Remaining blockers

1. Locate `DC-Instructor-Release-Recovery-2026-09-05.zip`. Import or reconcile it before duplicating its audit and approval tooling.
2. Obtain scope confirmation and attributable content approval. The legacy `reviewed` flag is not proof of current clinician sign-off. The supplied report lists zero version-bound approvals.
3. Complete literacy adaptation and Spanish review. The report lists 307 identical English level sets and zero Spanish library files.
4. Validate preview behavior and telemetry. Passing local tests does not establish deployment or clinical readiness.
5. Review the combined branch before updating PR #1 or merging. Main, production data, credentials, and deployed services have not been changed by this work.

## Next session handoff

Continue in the isolated checkout under this task's `work/dc-instructor` directory. Confirm the branch and clean working state. Recover the missing package first, compare its history to `ff124bc`, and preserve its tested work. Use one writer per branch.

This plan is the proposed release planning entry point. The existing generated ops dashboard is historical and still reports phenotype-count progress. Replace its completion model with the recovered readiness/approval audit before using it to judge release status.
