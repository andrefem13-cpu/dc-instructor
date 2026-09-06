#!/usr/bin/env python3
"""Reproducible inventory, planning coverage, reading-level and approval audit.

No clinical promotion or approval occurs here. --check fails on stale artifacts.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "knowledge/ontology/scripts"))
from ontology_lib import load_primitives, load_source_cards  # noqa: E402

LEVELS = ("en_4th.md", "en_6th.md", "en_HL1.md")


def read(path):
    return json.loads((ROOT / path).read_text())


def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False,
                                     separators=(",", ":")).encode()).hexdigest()


def clinical_payload(phenotype, primitives, sources):
    """Bind approval to clinical rules, all text variants, references and exports."""
    return {
        "phenotype": {k: v for k, v in phenotype.items() if k != "review"},
        "primitives": [{k: v for k, v in primitives[pid].items() if k != "review"}
                       for pid in phenotype["primitive_ids"]],
        "sources": {sid: sources[sid] for sid in sorted(set(phenotype["source_card_ids"]) |
                    {sid for pid in phenotype["primitive_ids"] for sid in primitives[pid]["source_card_ids"]})},
        "exports": {p.name: p.read_text() for p in sorted((ROOT / "library" / phenotype["id"]).glob("*.md"))},
    }


def build():
    manifest = read("knowledge/ontology/runtime/ontology_manifest.json")
    phenotypes = {p["id"]: read(f"knowledge/ontology/phenotypes/{p['id']}.json")
                  for p in manifest["phenotypes"]}
    mapping = read("ops/coverage_map.json")["phenotype_families"]
    if set(mapping) != set(phenotypes):
        raise ValueError("Coverage map must assign every manifest phenotype exactly once")
    approvals = read("ops/review_approvals.json")["approvals"]
    primitives, sources = load_primitives(), load_source_cards()
    rows, families = [], defaultdict(list)
    for pid, p in sorted(phenotypes.items()):
        texts = [(ROOT / "library" / pid / name).read_text() for name in LEVELS
                 if (ROOT / "library" / pid / name).exists()]
        content_hash = digest(clinical_payload(p, primitives, sources))
        claims = " ".join([p.get("source_audit", {}).get("notes", ""), p.get("review", {}).get("notes", "")])
        historical = "clinician-owner review on" in claims.lower() and "approved" in claims.lower()
        row = {
            "id": pid, "family": mapping[pid], "runtime_status": p["status"],
            "english_files": len(texts),
            "identical_english_levels": len(texts) == 3 and len(set(texts)) == 1,
            "spanish_files": len(list((ROOT / "library" / pid).glob("es_*.md"))),
            "clinical_content_sha256": content_hash,
            "historical_owner_approval_narrative": historical,
            "recorded_reviewer": p.get("review", {}).get("reviewer"),
            "approval_status": "no_version_bound_approval_recorded",
        }
        rows.append(row)
        families[mapping[pid]].append(row)
    by_id = {row["id"]: row for row in rows}
    approved_ids = set()
    for a in approvals:
        required = {"phenotype_id", "clinical_content_sha256", "reviewer", "reviewed_at", "evidence_path", "decision"}
        if not required.issubset(a) or any(not a[k] for k in required) or a["decision"] != "approved":
            raise ValueError("Approval requires an explicit approved decision, person, date, evidence and content hash")
        evidence = (ROOT / a["evidence_path"]).resolve()
        if not evidence.is_relative_to(ROOT) or not evidence.is_file():
            raise ValueError(f"Missing in-repository approval evidence: {a['evidence_path']}")
        pid = a["phenotype_id"]
        if pid not in by_id or pid in approved_ids:
            raise ValueError(f"Unknown or duplicate approval: {pid}")
        if a["clinical_content_sha256"] != by_id[pid]["clinical_content_sha256"]:
            raise ValueError(f"Stale approval for changed clinical content: {pid}")
        by_id[pid]["approval_status"] = "version_bound_approval_recorded"
        approved_ids.add(pid)
    usage = read("ops/usage_baseline.json")
    js = """import { tryOntologyGeneration } from './netlify/functions/ontology-runtime.js';
const cases = JSON.parse(process.argv[1]);
console.log(JSON.stringify(cases.map(condition => {
 const r = tryOntologyGeneration({condition, readingLevel:'6th Grade', language:'English'});
 return {condition, mode:r.mode, phenotype_id:r.phenotype_id, fallback_reason:r.fallback_reason};
})));"""
    result = subprocess.run(["node", "--input-type=module", "-e", js,
                             json.dumps([x["condition"] for x in usage["conditions"]])],
                            cwd=ROOT, text=True, check=True, capture_output=True)
    probes = json.loads(result.stdout)
    for item, probe in zip(usage["conditions"], probes):
        related = item.get("related_ids", [r["id"] for r in rows if r["family"] == item.get("related_family")])
        if not set(related).issubset(phenotypes):
            raise ValueError(f"Unknown usage mapping for {item['condition']}")
        item["related_ids"] = related
        item["condition_only_probe"] = probe
    enabled = [r for r in rows if r["runtime_status"] == "reviewed"]
    summary = {
        "manifest_phenotypes": len(rows), "runtime_enabled": len(enabled),
        "retired": len(rows) - len(enabled), "planning_families": len(families),
        "enabled_planning_families": len({r["family"] for r in enabled}),
        "english_files": sum(r["english_files"] for r in rows),
        "identical_english_level_sets": sum(r["identical_english_levels"] for r in enabled),
        "spanish_files": sum(r["spanish_files"] for r in rows),
        "version_bound_approvals": len(approved_ids),
        "historical_approval_narratives": sum(r["historical_owner_approval_narrative"] for r in enabled),
    }
    return {"schema_version": 1, "summary": summary, "usage": usage, "phenotypes": rows,
            "families": {name: {"enabled": sum(r["runtime_status"] == "reviewed" for r in members),
                                  "retired": sum(r["runtime_status"] != "reviewed" for r in members),
                                  "phenotype_ids": [r["id"] for r in members]}
                         for name, members in sorted(families.items())}}


def render(audit):
    s, usage = audit["summary"], audit["usage"]
    lines = ["# DC Instructor library readiness", "",
             "Generated from repository content by `python3 ops/build_library_audit.py`. This is a release-planning audit, not a clinical approval.", "",
             "## Current inventory", "", "| Measure | Count |", "|---|---:|"]
    lines.extend(f"| {k.replace('_', ' ')} | {v} |" for k, v in s.items())
    lines += ["", "Planning families group related maintenance work. They do not make variants interchangeable and are not an approved clinical taxonomy.",
              "The legacy `reviewed` flag enables runtime use; it does not prove clinician approval. Historical approval narratives remain in the source files. None is automatically treated as approval of the current content hash.",
              "Different filenames do not establish different reading levels. Identical text is a signal for adaptation review; nonidentical text still needs literacy assessment.", "",
              "## Usage-driven coverage matrix", "",
              f"Baseline: [{usage['snapshot_date']} snapshot](../metrics/snapshots.md), {usage['total_generations']} requests. The ten published conditions represent {sum(x['count'] for x in usage['conditions'])} requests; the remaining requests are not classified here. No overall coverage percentage can be inferred.",
              f"Spanish: {usage['spanish_requests']} requests. Latest partial count: {usage['latest_count']} on {usage['latest_count_snapshot_date']}. These are saved snapshots, not a live database query.", "",
              "The probe sends only the displayed chief complaint, with English 6th-grade output and no ED note. It measures routing for that input, not eligibility of an actual patient.", "",
              "| Priority | Request | Count | Available scope | Condition-only route | Next work |",
              "|---|---|---:|---|---|---|"]
    for x in usage["conditions"]:
        p = x["condition_only_probe"]
        route = p["fallback_reason"] or "ontology"
        lines.append(f"| {x['priority']} | {x['condition']} | {x['count']} | {x['coverage']} | `{route}` | {x['next_action']} |")
    lines += ["", "## Planning families", "",
              "Full phenotype mapping, content fingerprints, and individual review status: [library_audit.json](library_audit.json). Editable mapping: [coverage_map.json](coverage_map.json).",
              "", "| Family | Runtime enabled | Retired |", "|---|---:|---:|"]
    for name, group in audit["families"].items():
        lines.append(f"| {name} | {group['enabled']} | {group['retired']} |")
    lines += ["", "## Release gates", "",
              "1. Engineering: reconcile main, pass Python/Netlify cases, handler logging tests, ontology/export checks, and production build.",
              "2. Clinical scope: clinician-owner confirms v1 families and intended exclusions. Rebuild retired pathways only after specific review.",
              "3. Approval: record explicit clinician approval tied to each selected family's actual phenotype content hashes. See [REVIEW_PROVENANCE.md](REVIEW_PROVENANCE.md).",
              "4. Literacy: adapt the identical English variants, then assess meaning and reading level. Prioritize usage and supported diagnoses.",
              "5. Spanish: prepare and clinically review translations for the chosen first-release scope, then add output-format and semantic QA.",
              "6. Product validation: test ordinary notes, missing and conflicting context, medication passthrough, clinician edits, copy/print, and fallbacks in the deployment preview.",
              "7. Measurement: persist or aggregate route and fallback metadata without ED-note text. Current generation rows do not establish a reviewed-library utilization rate.",
              "", "Do not resume phase-count expansion by default. Completion is the signed-off scope passing these gates, not a target number of variants.", ""]
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    audit = build()
    outputs = {"ops/library_audit.json": json.dumps(audit, indent=2, ensure_ascii=False) + "\n",
               "ops/library_readiness.md": render(audit)}
    for path, content in outputs.items():
        target = ROOT / path
        if args.check:
            if not target.exists() or target.read_text() != content:
                raise ValueError(f"Stale audit artifact: {path}. Run python3 ops/build_library_audit.py")
        else:
            target.write_text(content)
    print(json.dumps(audit["summary"]))


if __name__ == "__main__":
    main()
