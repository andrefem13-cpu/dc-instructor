# DC Instructor Ops

This directory is the repo-backed continuity layer for DC Instructor.

- `state.json` is the machine-readable current state.
- `dashboard.md` is the next-agent startup board.
- `progress_map.json` is graph data for progress visualization.
- `progress_map.html` is the static progress map.
- `index.html` redirects to the static progress map.
- `render_ops.py` regenerates all of the above from repo state, gate JSON, the reviewed manifest, exported library files, and the latest vault handoff when the vault is available.

Run:

```bash
npm run ops:dashboard
```

The release audit replaces phase-count completion targets:

- `library_readiness.md`: usage-driven coverage matrix and release gates.
- `coverage_map.json`: explicit planning-family mapping for every phenotype.
- `library_audit.json`: reproducible inventory, reading-level comparison and content hashes.
- `REVIEW_PROVENANCE.md`: separation of automated review and explicit clinician approval.
- `RELEASE_RECONCILIATION.md`: changes, verification and remaining release work.

At the end of release work:

1. Update the repository release notes and available handoff.
2. Run `npm run ops:dashboard`.
3. Run `npm run check:release` and commit updated artifacts with the work.

The canonical GitHub repo is:

```text
https://github.com/BloodSweatxED/dc-instructor
```

When GitHub Pages is enabled for the dashboard branch, the browser URLs are:

```text
https://bloodsweatxed.github.io/dc-instructor/
https://bloodsweatxed.github.io/dc-instructor/ops/progress_map.html
```
