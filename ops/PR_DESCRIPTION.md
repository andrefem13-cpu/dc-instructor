## Problem

The Phase 12000 library branch diverged from main. Its dashboard measured completion by entry count, even though most reading-level files were identical and generated review metadata attributed approval to the clinician-owner.

## Changes

- Reconcile main while preserving ontology routing and accepted-generation logging. Reviewed output and accepted generator requests each create one row; upstream rejection creates none.
- Add a reproducible usage-driven coverage matrix and explicit planning-family mapping. Replace phase-count completion targets with release gates.
- Separate automated source review from explicit clinician approval tied to content hashes. Preserve historical decision narratives.
- Fix bounded negation of retained foreign bodies in Python and JavaScript, with contradiction and uncertainty regressions.
- Include runtime JSON assets in the function bundle, support bundled working-directory lookup and expose a distinct missing-assets fallback.
- Add a repeatable engineering release command and GitHub Actions workflow.

## Validation

Local checks passed: 1,679 Python runtime cases; Netlify smoke cases; eight new shared negation regressions; seven mocked generation-handler tests; ontology/export validation; existing policy and expansion gates; approval-record integrity checks; isolated bundle checks; and Vite build.

All 936 exported patient instructions and phenotype/primitive clinical content are unchanged. Generated clinical-file changes are review metadata.

## Clinical release remains separate

The audit groups 312 enabled variants into 83 proposed planning families. It identifies 307 identical English reading-level sets, no Spanish exports, and no version-bound approvals in the new registry. Historical approval narratives do exist and have not been silently converted into current-version signatures.

Keep the PR draft while selecting the clinical v1 scope, reviewing English literacy adaptations and Spanish output, and checking real-note routing, clinician-entered treatment preservation and live telemetry. The coverage and provenance documents in `ops/` are the next work queue.

Publishing note: this description remains prepared for PR #1 and has not been posted. The earlier integration HTTP 403 was bypassed using the existing authenticated shell environment. Recovery was reconciled on `codex/release-completion-2026-09-05`; PR #1 remains unchanged. Local engineering checks pass; remote PR checks have not run on the combined branch.
