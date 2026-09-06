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
| September 7 | Recovery and reconciliation complete. Resolve dependency findings and validate the deployment preview. | Engineering | Recovery history preserved; full local release checks pass. Dependency and preview checks remain. |
| September 8 | Confirm the five exact pathways, output settings, exclusions, and intended pilot users. | André | Explicit scope decision recorded in the repository |
| September 11 | Adapt English 4th-grade, 6th-grade, and HL-1 content for selected pathways. | Engineering drafts; André reviews | Meaning, medication instructions, return precautions, and follow-up checked across levels; automated scores used only as screening |
| September 14 | Prepare Spanish versions and complete bilingual clinical review. | Engineering drafts; qualified bilingual clinician reviews | Semantic equivalence and format checks, reviewer attribution, approvals tied to actual content hashes |
| September 17 | Exercise the deployment preview with synthetic cases and clinician edits. | Engineering and André | Ordinary wording, absent/conflicting context, medication passthrough, all selected formats, copy/print, error paths, and fallback behavior pass |
| September 18 | Validate privacy-minimized route measurement and release controls. | Engineering; André authorizes production changes | Route/fallback counters without note text; approval invalidation on content changes; defined pilot scope enforcement; rollback procedure |
| September 19 | Go/no-go for supervised pilot. | André | All gates pass for the same release commit; unresolved blockers move the date |

No recurring work has been scheduled. Dates are milestones, not unattended execution promises.

## Verified September 5

The extracted recovery package was supplied and its Git bundle verified. Recovered head `f4612da` contains three commits based on main `b59f0c6` and library branch `73bb84f`. All three are preserved in the history of `codex/release-completion-2026-09-05`, alongside the earlier reconciliation and completion plan.

The recovered handler factors logging into a shared helper while retaining accepted-upstream semantics. Both handler suites are retained: seven recovery cases cover English levels, Spanish and unsupported-format fallbacks, unsupported conditions, and upstream rejection; four additional cases check call order and network failure. All use mocked services.

Fresh `npm run check:release` verification passed after reconciliation: 1,679 Python runtime cases, Netlify smoke cases, all 11 handler cases, isolated bundling with 326 declared assets, explicit missing-manifest fallback, ontology and 936-file export validation, existing boundary and prompt checks, approval integrity tests, reproducible audit checks, and the production build. All 936 patient-facing library files remain unchanged. Approval tracking is present, with zero current version-bound approvals.

The recovered work also replaces inventory-based completion percentages in the ops dashboard with release gates and removes automatically attributed clinician signatures from generated review metadata. Historical review narratives remain preserved. This is provenance correction, not new clinical approval.

Dependency inspection reports one high-severity production dependency finding in `ws`. The complete dependency tree reports eight findings. Triage and repair are an engineering release gate; no automatic breaking upgrades were applied.

## Remaining blockers

1. Recovery is complete. Resolve dependency findings before release; the full local suite is passing.
2. Obtain scope confirmation and attributable content approval. The legacy `reviewed` flag is not proof of current clinician sign-off. The supplied report lists zero version-bound approvals.
3. Complete literacy adaptation and Spanish review. The report lists 307 identical English level sets and zero Spanish library files.
4. Validate preview behavior and telemetry. Passing local tests does not establish deployment or clinical readiness.
5. Review the combined branch before updating PR #1 or merging. Main, production data, credentials, and deployed services have not been changed by this work.

## Next session handoff

Continue in the isolated checkout under this task's `work/dc-instructor` directory. Confirm the branch and clean working state. Recovery is complete; do not reimport or recreate its tooling. Next: dependency triage, scope confirmation, and a review packet for the proposed five pathways. Use one writer per branch.

This plan is the proposed release planning entry point. The recovered `ops/library_readiness.md`, `ops/library_audit.json`, and `ops/REVIEW_PROVENANCE.md` supply the detailed coverage and approval evidence. The dashboard now separates inventory from readiness. Refresh generated ops artifacts when repository or clinical content changes.
