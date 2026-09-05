# DC Instructor release reconciliation

Date: 2026-09-05

The library branch has been reconciled with main and has a reproducible coverage audit. This is engineering preparation for a scoped clinical release. The clinical library has not been expanded or newly approved.

## Reconciliation

Starting library head: `73bb84fa4c8ba62412558c827ba16275c9ee3e16`.
Main incorporated: `b59f0c61c105af0fea860001b8ce2e4daebc645b`.
Local reconciliation commit: `2147a48`.

The conflict was in `netlify/functions/generate.js`. The resolution preserves reviewed ontology routing and main's accepted-upstream logging behavior. Reviewed output creates one generation row. Accepted generator fallback creates one row. An upstream rejection creates no row. Main's metrics endpoint, normalization, schema migration, UI changes and snapshot history are retained.

## Changes

- Added a usage-driven coverage matrix and explicit mapping of all 318 manifest entries into 86 proposed planning families, 83 with runtime-enabled content.
- Replaced the 100/500-entry completion percentages and automatic expansion instructions in the ops dashboard with release gates.
- Identified 307 identical sets of English reading-level files. The five sets with distinct text are ankle sprain, gastroenteritis, lumbar strain, cystitis and viral URI. Distinct text still requires literacy review.
- Separated automated source-review attribution from version-bound clinician approval. Generator scripts no longer stamp Andre's name as reviewer. Historical approval narratives remain. The new approval registry is empty until explicit decisions tied to content hashes are recorded.
- Fixed the bounded negation case for “no/denies/without retained foreign body” in Python and JavaScript. Eight shared regression cases also retain blocking behavior for uncertain, positive, and later contradictory mentions. This is not a general clinical-language parser.
- Declared required ontology JSON assets in the Netlify function bundle and added runtime lookup from the bundle working directory. Missing manifest data now yields `ontology_assets_unavailable`, rather than appearing to be an ordinary unsupported complaint. This follows [Netlify's included-files configuration](https://docs.netlify.com/build/functions/configuration/#bundle).
- Added `npm run check:release` and a GitHub Actions engineering workflow.

The 936 exported instructions and all phenotype/primitive clinical fields were compared with the pre-change state and are unchanged. The large generated diff is review metadata, review-sheet attribution, test results and ops artifacts.

## Verification

Local verification passed:

- 1,679 Python runtime cases, including eight new negation regressions.
- Existing Netlify runtime smoke cases plus the eight new regressions.
- Seven actual-handler tests with a mocked transport: three English levels, Spanish fallback, unsupported level, unsupported condition and upstream rejection.
- Ontology validation, 936-file export validation, existing expansion and low-confidence gates, product tailoring and medication-prompt contracts.
- Audit checks for stale content hashes, missing evidence, duplicate approvals and changes to clinical content.
- Isolated esbuild runtime using only the 326 data files declared in Netlify configuration, plus explicit missing-manifest fallback. This models packaging isolation and does not substitute for a live Netlify test.
- Vite production build and whitespace checks.

The mocked handler tests do not call model providers or the production database. See PR #1 for remote checks on its current head. Production deployment and database changes are separate from this reconciliation.

## Remaining clinical release work

Use [library_readiness.md](library_readiness.md) as the work queue.

First, select a bounded adult discharge scope from the usage matrix. Assess the five existing distinct English sets as a starting batch, then prioritize high-use diagnosed pathways. Approve exact content only after review. Prepare Spanish versions for that scope and adapt the duplicated English levels.

The ten published top complaints all fall back when submitted as chief complaints alone. This is a measured input-level result, not a patient-level utilization rate. Test normal clinical notes and determine which context should be collected explicitly. Do not loosen clinical boundaries merely to increase match counts.

Before release, verify that patient-specific findings, medications and follow-up instructions survive the whole workflow. Static template assertions, broad symptom routing, retired pathways, and the generator's handling of conflicting context need dedicated clinical QA. Add route/fallback aggregation so real usage can guide subsequent work.

Do not resume phase-count expansion by default. Do not infer clinical approval from permission to continue engineering work.
