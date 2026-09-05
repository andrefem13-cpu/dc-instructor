# Clinical review provenance

The historical `reviewed` flag is a runtime eligibility state. It is not proof that a clinician signed off on the exact current text. Earlier generators automatically wrote Andre's name into review records. The generators now identify their output as automated source review. Existing historical decision notes are preserved.

`knowledge/clinician_review.py` retrieves sources and calls an AI model. Its output is source-review assistance, not a human clinician signature. Source matches and model confidence are not clinical approval.

## Exact-content approval

`review_approvals.json` is the separate registry for explicit clinician approval. It starts empty. This does not mean no historical review occurred. It means no historical statement has been silently converted into approval of a current version.

Run `python3 ops/build_library_audit.py`. Each phenotype in `library_audit.json` has a `clinical_content_sha256`. The hash covers phenotype rules, referenced primitive content, source cards and exported language/reading-level files. Review metadata is excluded so a provenance correction does not invalidate clinical content approval.

After explicit review, preserve the clinician's actual decision in a repository document. Add a registry record with these fields:

```json
{
  "phenotype_id": "the exact reviewed phenotype ID",
  "clinical_content_sha256": "the exact hash from the reviewed audit",
  "reviewer": "the actual approving clinician",
  "reviewed_at": "the actual approval timestamp",
  "decision": "approved",
  "evidence_path": "ops/approvals/the-recorded-decision.md"
}
```

An agent must not create a clinician decision from an automated review, a legacy reviewer label, or permission to work on the project. A clinician can approve a batch, provided the decision lists its exact phenotype IDs and hashes. The audit rejects stale hashes, missing evidence files, and duplicate records. Git history records who changed the registry; it is not a cryptographic identity system.

This registry supports the next clinical release decision. It does not silently disable or promote existing runtime content. The PR remains a draft until the separate clinical and product release gates in `library_readiness.md` are satisfied.
