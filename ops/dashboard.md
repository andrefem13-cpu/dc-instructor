# DC Instructor Ops Dashboard

Generated: `2026-09-05T21:42:20.945615+00:00`

## Current State

- Canonical repo: [https://github.com/BloodSweatxED/dc-instructor](https://github.com/BloodSweatxED/dc-instructor)
- Local repo: `/workspace/scratch/e905309c5d2a/dc-instructor`
- Branch: `codex/dc-knowledge-graph`
- HEAD: `2147a48`
- Origin: `https://github.com/BloodSweatxED/dc-instructor.git` (matches canonical repo)
- Latest handoff: `not found`
- Gate decision: `phenotype expansion allowed`
- Expansion allowed: `True`
- Active drafts: `0`
- Reviewed source gaps: `0`
- Draft source gaps: `0`
- Dirty working tree entries: `378` (state file lists first 80)

## Release Readiness

- [Coverage matrix and release gates](library_readiness.md)
- [Clinical approval provenance](REVIEW_PROVENANCE.md)
- Planning families with runtime-enabled entries: `83`
- Identical English reading-level sets: `307`
- Version-bound approval records: `0`
- Entry counts and expansion gates do not establish clinical release approval.
- Exported library: `312` conditions, `936` English files

## Review Queue

No open review queue items detected.

## Domain Progress

| Domain | Reviewed / Exported | Reviewed Missing Export | Draft | Review Needed | Total |
|---|---:|---:|---:|---:|---:|
| Allergy | 12 | 0 | 0 | 0 | 12 |
| Cardiac | 1 | 0 | 0 | 0 | 2 |
| ENT / Dental | 8 | 0 | 0 | 0 | 10 |
| GI | 7 | 0 | 0 | 0 | 7 |
| GU | 2 | 0 | 0 | 0 | 2 |
| MSK | 87 | 0 | 0 | 0 | 88 |
| Neuro | 5 | 0 | 0 | 0 | 6 |
| Ophtho | 3 | 0 | 0 | 0 | 4 |
| Other | 70 | 0 | 0 | 0 | 70 |
| Respiratory | 8 | 0 | 0 | 0 | 8 |
| Skin / Soft Tissue | 109 | 0 | 0 | 0 | 109 |

## Next Agent Startup

1. Read this dashboard.
2. Read ops/library_readiness.md and ops/RELEASE_RECONCILIATION.md; consult the latest available handoff.
3. Verify `git status --short --branch`, gate JSON, reviewed count, and review queue before editing.
4. Work through the scoped release gates. Keep clinical approval separate from automated source checks.
5. Run `npm run ops:dashboard` and `npm run check:release` after changes. Do not expand to a phase target by default.

## Progress Map

- [Open the static progress map](progress_map.html)
- Machine state: [`state.json`](state.json)
- Graph data: [`progress_map.json`](progress_map.json)
