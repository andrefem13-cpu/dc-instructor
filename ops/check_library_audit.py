#!/usr/bin/env python3
"""Synthetic approval tests; never write an approval into the real registry."""
from copy import deepcopy
from unittest.mock import patch

import build_library_audit as audit

baseline = audit.build()
row = next(r for r in baseline["phenotypes"] if r["runtime_status"] == "reviewed")
real_read = audit.read
record = {
    "phenotype_id": row["id"],
    "clinical_content_sha256": row["clinical_content_sha256"],
    "reviewer": "Synthetic test reviewer",
    "reviewed_at": "2026-09-05T00:00:00Z",
    "evidence_path": "ops/check_library_audit.py",
    "decision": "approved",
}


def with_records(records):
    def test_read(path):
        return {"approvals": records} if path == "ops/review_approvals.json" else real_read(path)
    with patch.object(audit, "read", test_read):
        return audit.build()


assert with_records([record])["summary"]["version_bound_approvals"] == 1
for records, expected in [
    ([{**record, "clinical_content_sha256": "stale"}], "Stale approval"),
    ([record, record], "duplicate approval"),
    ([{**record, "evidence_path": "ops/does-not-exist.md"}], "Missing in-repository"),
    ([{**record, "decision": "pending"}], "explicit approved decision"),
]:
    try:
        with_records(records)
    except ValueError as exc:
        assert expected in str(exc), str(exc)
    else:
        raise AssertionError(f"Expected rejection: {expected}")

p = real_read(f"knowledge/ontology/phenotypes/{row['id']}.json")
primitives, sources = audit.load_primitives(), audit.load_source_cards()
original_hash = audit.digest(audit.clinical_payload(p, primitives, sources))
metadata_only = deepcopy(p)
metadata_only["review"]["reviewer"] = "Different review metadata"
assert audit.digest(audit.clinical_payload(metadata_only, primitives, sources)) == original_hash
changed_primitives = deepcopy(primitives)
changed_primitives[p["primitive_ids"][0]]["text"]["en_6"] += " Changed clinical text."
assert audit.digest(audit.clinical_payload(p, changed_primitives, sources)) != original_hash
print("Approval audit rejects stale/duplicate/missing evidence and binds clinical content, not reviewer labels")
