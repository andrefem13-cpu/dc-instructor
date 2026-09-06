#!/usr/bin/env python3
"""Render the DC Instructor operational dashboard and progress map."""

from __future__ import annotations

import html
import json
import os
import re
import subprocess
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[1]
OPS_DIR = REPO_ROOT / "ops"
CANONICAL_REPO_URL = "https://github.com/BloodSweatxED/dc-instructor"
DEFAULT_VAULT_DIR = Path("/Users/andre/Desktop/Vaults/Life/11-DC instructor")
VAULT_DIR = Path(os.environ.get("DC_INSTRUCTOR_VAULT_DIR", DEFAULT_VAULT_DIR))

MANIFEST_PATH = REPO_ROOT / "knowledge/ontology/runtime/ontology_manifest.json"
GATE_PATH = REPO_ROOT / "knowledge/ontology/evals/phase21_expansion_gate/phase21_expansion_gate.json"
REVIEW_QUEUE_PATH = REPO_ROOT / "knowledge/ontology/evals/phase900_950_library_completion_review_queue.md"
LIBRARY_DIR = REPO_ROOT / "library"

READING_LEVEL_FILES = ("en_4th.md", "en_6th.md", "en_HL1.md")

DOMAIN_RULES = [
    ("respiratory", ("asthma", "bronchitis", "pneumonia", "uri", "sinusitis", "pharyngitis", "influenza", "cough")),
    ("cardiac", ("chest_pain", "blood_pressure", "hypertension")),
    ("gi", ("abdominal", "gastroenteritis", "vomiting", "constipation", "hemorrhoids", "nausea")),
    ("neuro", ("concussion", "head", "headache", "migraine", "cerumen")),
    ("msk", ("sprain", "strain", "knee", "wrist", "ankle", "elbow", "foot", "toe", "toenail", "neck", "cervical", "lumbar")),
    ("skin_soft_tissue", ("cellulitis", "abscess", "rash", "dermatitis", "tinea", "bite", "sting", "laceration", "wound", "avulsion", "abrasion", "skin")),
    ("ent_dental", ("otitis", "ear", "dental", "tooth", "aphthous", "ulcer", "mouth", "epistaxis")),
    ("gu", ("cystitis", "renal", "colic", "urinary")),
    ("allergy", ("allergic", "anaphylaxis", "urticaria")),
    ("ophtho", ("conjunctivitis", "eye")),
]

DOMAIN_LABELS = {
    "allergy": "Allergy",
    "cardiac": "Cardiac",
    "ent_dental": "ENT / Dental",
    "gi": "GI",
    "gu": "GU",
    "msk": "MSK",
    "neuro": "Neuro",
    "ophtho": "Ophtho",
    "respiratory": "Respiratory",
    "skin_soft_tissue": "Skin / Soft Tissue",
    "other": "Other",
}

COLOR_BY_STATUS = {
    "reviewed_exported": "#15803d",
    "reviewed_missing_export": "#2563eb",
    "draft": "#ca8a04",
    "review_needed": "#ea580c",
    "blocked": "#dc2626",
    "not_started": "#6b7280",
}


def run_git(args: list[str]) -> str:
    try:
        return subprocess.check_output(["git", *args], cwd=REPO_ROOT, text=True, stderr=subprocess.DEVNULL).strip()
    except subprocess.CalledProcessError:
        return ""


def load_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def latest_handoff() -> dict[str, Any] | None:
    if not VAULT_DIR.exists():
        return None
    search_dirs = [VAULT_DIR, VAULT_DIR / "handoffs"]
    handoffs = []
    for search_dir in search_dirs:
        if not search_dir.exists():
            continue
        handoffs.extend(search_dir.glob("20*-DC Instructor*Handoff*.md"))
        handoffs.extend(search_dir.glob("20*DC Instructor*Handoff*.md"))
    handoffs = sorted(
        set(handoffs),
        key=lambda path: (path.name[:10], path.stat().st_mtime),
        reverse=True,
    )
    if not handoffs:
        return None
    path = handoffs[0]
    return {
        "path": str(path),
        "name": path.name,
        "modified_at": datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc).isoformat(),
    }


def classify_domain(phenotype_id: str, label: str) -> str:
    haystack = re.sub(r"[^a-z0-9]+", " ", f"{phenotype_id} {label}".lower())
    padded_haystack = f" {haystack} "
    for domain, needles in DOMAIN_RULES:
        for needle in needles:
            normalized = re.sub(r"[^a-z0-9]+", " ", needle.lower()).strip()
            if f" {normalized} " in padded_haystack:
                return domain
    return "other"


def exported_library_status(phenotype_id: str) -> dict[str, Any]:
    path = LIBRARY_DIR / phenotype_id
    files_present = [name for name in READING_LEVEL_FILES if (path / name).exists()]
    return {
        "path": str(path.relative_to(REPO_ROOT)) if path.exists() else None,
        "exported": len(files_present) == len(READING_LEVEL_FILES),
        "files_present": files_present,
        "missing_files": [name for name in READING_LEVEL_FILES if name not in files_present],
    }


def phenotype_status(phenotype: dict[str, Any], gate: dict[str, Any], export: dict[str, Any]) -> str:
    phenotype_id = phenotype.get("id", "")
    active_drafts = set(gate.get("active_draft_phenotypes", []))
    reviewed = phenotype.get("status") == "reviewed" and phenotype.get("review_status") == "reviewed"
    source_audit = phenotype.get("source_audit", {})
    if phenotype_id in active_drafts:
        return "draft"
    if source_audit.get("source_needed") or source_audit.get("restricted_source_risk"):
        return "review_needed"
    if reviewed and export["exported"]:
        return "reviewed_exported"
    if reviewed:
        return "reviewed_missing_export"
    if phenotype.get("status") == "draft":
        return "draft"
    return "not_started"


def parse_review_queue() -> list[dict[str, str]]:
    if not REVIEW_QUEUE_PATH.exists():
        return []
    if "Status: closed" in REVIEW_QUEUE_PATH.read_text(encoding="utf-8")[:300]:
        return []
    rows: list[dict[str, str]] = []
    headers: list[str] | None = None
    for line in REVIEW_QUEUE_PATH.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped.startswith("|") or "---" in stripped:
            continue
        cells = [cell.strip() for cell in stripped.strip("|").split("|")]
        if not headers:
            headers = [cell.lower().replace(" ", "_") for cell in cells]
            continue
        if headers and len(cells) == len(headers):
            row = dict(zip(headers, cells))
            normalized_values = " ".join(row.values()).lower()
            resolved = any(term in normalized_values for term in ("promoted", "approved", "closed", "resolved"))
            if not resolved and not any(value.lower() == "none" for value in row.values()):
                rows.append(row)
    return rows


def build_state() -> dict[str, Any]:
    manifest = load_json(MANIFEST_PATH, {"phenotypes": []})
    gate = load_json(GATE_PATH, {})
    handoff = latest_handoff()
    branch = run_git(["branch", "--show-current"])
    head = run_git(["rev-parse", "--short", "HEAD"])
    remote = run_git(["remote", "get-url", "origin"])
    porcelain = run_git(["status", "--short"])
    dirty_lines = [line for line in porcelain.splitlines() if line.strip()]
    phenotypes = manifest.get("phenotypes", [])

    nodes: list[dict[str, Any]] = []
    for phenotype in phenotypes:
        phenotype_id = phenotype.get("id", "")
        label = phenotype.get("label", phenotype_id)
        export = exported_library_status(phenotype_id)
        status = phenotype_status(phenotype, gate, export)
        unsafe_count = len(phenotype.get("unsafe_modifiers", []))
        source_audit = phenotype.get("source_audit", {})
        nodes.append(
            {
                "id": phenotype_id,
                "label": label,
                "domain": classify_domain(phenotype_id, label),
                "status": status,
                "color": COLOR_BY_STATUS[status],
                "size": max(8, min(28, 9 + unsafe_count)),
                "review_status": phenotype.get("review_status"),
                "manifest_status": phenotype.get("status"),
                "source_supported": source_audit.get("source_supported"),
                "unsafe_modifier_count": unsafe_count,
                "library": export,
            }
        )

    status_counts = Counter(node["status"] for node in nodes)
    domain_counts: dict[str, Counter[str]] = defaultdict(Counter)
    for node in nodes:
        domain_counts[node["domain"]][node["status"]] += 1

    library_conditions = sorted(
        path.name for path in LIBRARY_DIR.iterdir() if path.is_dir() and all((path / name).exists() for name in READING_LEVEL_FILES)
    ) if LIBRARY_DIR.exists() else []

    reviewed_count = gate.get("phase20_coverage", {}).get("reviewed_count") or status_counts["reviewed_exported"]
    audit = load_json(OPS_DIR / "library_audit.json", {}).get("summary", {})
    review_queue = parse_review_queue()

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "project": "DC Instructor",
        "canonical_repo_url": CANONICAL_REPO_URL,
        "repo": {
            "path": str(REPO_ROOT),
            "branch": branch,
            "head": head,
            "origin": remote,
            "origin_matches_canonical": remote.rstrip(".git") == CANONICAL_REPO_URL,
            "dirty_file_count": len(dirty_lines),
            "dirty_files": dirty_lines[:80],
            "dirty_files_truncated": len(dirty_lines) > 80,
        },
        "latest_handoff": handoff,
        "gate": gate,
        "review_queue": review_queue,
        "progress": {
            "reviewed_exported_count": status_counts["reviewed_exported"],
            "reviewed_count": reviewed_count,
            "library_file_count": len(library_conditions) * len(READING_LEVEL_FILES),
            "library_condition_count": len(library_conditions),
            "coverage_audit": audit,
            "status_counts": dict(status_counts),
            "domain_counts": {domain: dict(counts) for domain, counts in sorted(domain_counts.items())},
        },
        "next_action": "Read ops/library_readiness.md and satisfy scoped release gates. Do not resume phase-count expansion by default.",
        "nodes": sorted(nodes, key=lambda item: (item["domain"], item["label"])),
    }


def bar(percent: float, width: int = 24) -> str:
    filled = int(round(width * percent / 100))
    return f"{'#' * filled}{'-' * (width - filled)}"


def render_dashboard(state: dict[str, Any]) -> str:
    gate = state["gate"]
    progress = state["progress"]
    repo = state["repo"]
    handoff = state["latest_handoff"]
    queue = state["review_queue"]
    dirty_suffix = " (state file lists first 80)" if repo["dirty_files_truncated"] else ""
    origin_status = "matches canonical repo" if repo["origin_matches_canonical"] else "does not match canonical repo"

    lines = [
        "# DC Instructor Ops Dashboard",
        "",
        f"Generated: `{state['generated_at']}`",
        "",
        "## Current State",
        "",
        f"- Canonical repo: [{state['canonical_repo_url']}]({state['canonical_repo_url']})",
        f"- Local repo: `{repo['path']}`",
        f"- Branch: `{repo['branch']}`",
        f"- HEAD: `{repo['head']}`",
        f"- Origin: `{repo['origin']}` ({origin_status})",
        f"- Latest handoff: `{handoff['path'] if handoff else 'not found'}`",
        f"- Gate decision: `{gate.get('decision', 'unknown')}`",
        f"- Expansion allowed: `{gate.get('phenotype_expansion_allowed', 'unknown')}`",
        f"- Active drafts: `{gate.get('active_draft_phenotype_count', 'unknown')}`",
        f"- Reviewed source gaps: `{gate.get('reviewed_source_gap_count', 'unknown')}`",
        f"- Draft source gaps: `{gate.get('draft_source_gap_count', 'unknown')}`",
        f"- Dirty working tree entries: `{repo['dirty_file_count']}`{dirty_suffix}",
        "",
        "## Release Readiness",
        "",
        "- [Coverage matrix and release gates](library_readiness.md)",
        "- [Clinical approval provenance](REVIEW_PROVENANCE.md)",
        f"- Planning families with runtime-enabled entries: `{progress['coverage_audit'].get('enabled_planning_families', 'unknown')}`",
        f"- Identical English reading-level sets: `{progress['coverage_audit'].get('identical_english_level_sets', 'unknown')}`",
        f"- Version-bound approval records: `{progress['coverage_audit'].get('version_bound_approvals', 'unknown')}`",
        "- Entry counts and expansion gates do not establish clinical release approval.",
        f"- Exported library: `{progress['library_condition_count']}` conditions, `{progress['library_file_count']}` English files",
        "",
        "## Review Queue",
        "",
    ]

    if queue:
        lines.extend([
            "| Item | Phenotype | Decision Needed | Recommendation | Blocked Action |",
            "|---|---|---|---|---|",
        ])
        for item in queue:
            lines.append(
                "| {id} | {phenotype} | {decision} | {recommendation} | {blocked} |".format(
                    id=item.get("id", "unknown"),
                    phenotype=item.get("phenotype", "unknown"),
                    decision=item.get("decision_needed", "unknown"),
                    recommendation=item.get("agent_recommendation", "unknown"),
                    blocked=item.get("blocked_action", "unknown"),
                )
            )
    else:
        lines.append("No open review queue items detected.")

    lines.extend([
        "",
        "## Domain Progress",
        "",
        "| Domain | Reviewed / Exported | Reviewed Missing Export | Draft | Review Needed | Total |",
        "|---|---:|---:|---:|---:|---:|",
    ])
    for domain, counts in progress["domain_counts"].items():
        total = sum(counts.values())
        lines.append(
            f"| {DOMAIN_LABELS.get(domain, domain)} | {counts.get('reviewed_exported', 0)} | "
            f"{counts.get('reviewed_missing_export', 0)} | {counts.get('draft', 0)} | "
            f"{counts.get('review_needed', 0)} | {total} |"
        )

    lines.extend([
        "",
        "## Next Agent Startup",
        "",
        "1. Read this dashboard.",
        "2. Read ops/library_readiness.md and ops/RELEASE_RECONCILIATION.md; consult the latest available handoff.",
        "3. Verify `git status --short --branch`, gate JSON, reviewed count, and review queue before editing.",
        "4. Work through the scoped release gates. Keep clinical approval separate from automated source checks.",
        "5. Run `npm run ops:dashboard` and `npm run check:release` after changes. Do not expand to a phase target by default.",
        "",
        "## Progress Map",
        "",
        "- [Open the static progress map](progress_map.html)",
        "- Machine state: [`state.json`](state.json)",
        "- Graph data: [`progress_map.json`](progress_map.json)",
        "",
    ])
    return "\n".join(lines)


def render_progress_json(state: dict[str, Any]) -> dict[str, Any]:
    links: list[dict[str, str]] = []
    by_domain: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for node in state["nodes"]:
        by_domain[node["domain"]].append(node)
    for domain, nodes in by_domain.items():
        for node in nodes:
            links.append({"source": domain, "target": node["id"], "type": "domain"})
    return {
        "generated_at": state["generated_at"],
        "project": state["project"],
        "canonical_repo_url": state["canonical_repo_url"],
        "summary": state["progress"],
        "domains": [
            {
                "id": domain,
                "label": DOMAIN_LABELS.get(domain, domain),
                "counts": state["progress"]["domain_counts"].get(domain, {}),
            }
            for domain in sorted(by_domain)
        ],
        "nodes": state["nodes"],
        "links": links,
        "legend": COLOR_BY_STATUS,
    }


def render_html(progress: dict[str, Any]) -> str:
    embedded = json.dumps(progress, ensure_ascii=False).replace("</", "<\\/")
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>DC Instructor Progress Map</title>
  <style>
    :root {{
      color-scheme: light;
      --ink: #172033;
      --muted: #5b6475;
      --line: #d8dee9;
      --panel: #f7f8fb;
      --bg: #ffffff;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--ink);
      background: var(--bg);
    }}
    header {{
      padding: 24px clamp(18px, 4vw, 48px) 12px;
      border-bottom: 1px solid var(--line);
    }}
    h1 {{
      margin: 0 0 8px;
      font-size: clamp(28px, 4vw, 44px);
      line-height: 1.05;
      letter-spacing: 0;
    }}
    .meta {{
      color: var(--muted);
      font-size: 14px;
    }}
    main {{
      padding: 18px clamp(18px, 4vw, 48px) 40px;
    }}
    .summary {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
      gap: 12px;
      margin-bottom: 18px;
    }}
    .metric {{
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 14px;
      background: var(--panel);
    }}
    .metric strong {{
      display: block;
      font-size: 28px;
      line-height: 1;
      margin-bottom: 6px;
    }}
    .metric span {{
      color: var(--muted);
      font-size: 13px;
    }}
    .bar {{
      height: 10px;
      margin-top: 10px;
      background: #e5e7eb;
      border-radius: 999px;
      overflow: hidden;
    }}
    .bar > i {{
      display: block;
      height: 100%;
      background: #15803d;
    }}
    .legend {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px 14px;
      margin: 8px 0 18px;
      color: var(--muted);
      font-size: 13px;
    }}
    .legend span {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }}
    .swatch {{
      width: 11px;
      height: 11px;
      border-radius: 50%;
      display: inline-block;
    }}
    .domains {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 14px;
    }}
    section.domain {{
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 14px;
      min-height: 190px;
    }}
    section.domain h2 {{
      margin: 0 0 4px;
      font-size: 18px;
      letter-spacing: 0;
    }}
    .domain-count {{
      color: var(--muted);
      font-size: 13px;
      margin-bottom: 12px;
    }}
    .nodes {{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      min-height: 96px;
    }}
    .node {{
      display: inline-block;
      border-radius: 50%;
      border: 2px solid rgba(23, 32, 51, 0.16);
      cursor: help;
    }}
    .node:focus {{
      outline: 3px solid #93c5fd;
      outline-offset: 2px;
    }}
    .selected {{
      margin-top: 18px;
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 14px;
      background: var(--panel);
      min-height: 86px;
    }}
    .selected h2 {{
      margin: 0 0 6px;
      font-size: 18px;
      letter-spacing: 0;
    }}
    .selected p {{
      margin: 4px 0;
      color: var(--muted);
    }}
    @media (max-width: 640px) {{
      h1 {{ font-size: 30px; }}
      .domains {{ grid-template-columns: 1fr; }}
    }}
  </style>
</head>
<body>
  <header>
    <h1>DC Instructor Progress Map</h1>
    <div class="meta">Generated <span id="generated"></span> from <a href="{html.escape(progress['canonical_repo_url'])}">{html.escape(progress['canonical_repo_url'])}</a></div>
  </header>
  <main>
    <div class="summary" id="summary"></div>
    <div class="legend" id="legend"></div>
    <div class="domains" id="domains"></div>
    <div class="selected" id="selected">
      <h2>Selection</h2>
      <p>Hover or focus a node to inspect status, domain, and export state.</p>
    </div>
  </main>
  <script id="progress-data" type="application/json">{embedded}</script>
  <script>
    const data = JSON.parse(document.getElementById('progress-data').textContent);
    const labels = {{
      reviewed_exported: 'Runtime enabled + exported',
      reviewed_missing_export: 'Runtime enabled, missing export',
      draft: 'Draft',
      review_needed: 'Andre review needed',
      blocked: 'Blocked',
      not_started: 'Not started'
    }};
    document.getElementById('generated').textContent = data.generated_at;
    const summary = data.summary;
    document.getElementById('summary').innerHTML = `
      <div class="metric"><strong>${{summary.reviewed_count}}</strong><span>runtime-enabled variants</span></div>
      <div class="metric"><strong>${{summary.library_condition_count}}</strong><span>exported library conditions</span></div>
      <div class="metric"><strong>${{summary.coverage_audit.enabled_planning_families ?? '?'}}</strong><span>planning families with enabled content</span></div>
      <div class="metric"><strong>${{summary.coverage_audit.identical_english_level_sets ?? '?'}}</strong><span>identical English level sets; adaptation review needed</span></div>
    `;
    document.getElementById('legend').innerHTML = Object.entries(data.legend)
      .map(([key, color]) => `<span><i class="swatch" style="background:${{color}}"></i>${{labels[key] || key}}</span>`)
      .join('');
    const selected = document.getElementById('selected');
    const byDomain = new Map(data.domains.map(domain => [domain.id, {{ ...domain, nodes: [] }}]));
    data.nodes.forEach(node => byDomain.get(node.domain)?.nodes.push(node));
    document.getElementById('domains').innerHTML = Array.from(byDomain.values()).map(domain => {{
      const reviewed = domain.counts.reviewed_exported || 0;
      const total = domain.nodes.length;
      const nodes = domain.nodes.map(node => {{
        const size = node.size;
        const title = `${{node.label}}\\n${{labels[node.status] || node.status}}`;
        return `<button class="node" aria-label="${{node.label}}" title="${{title}}" data-id="${{node.id}}" style="width:${{size}}px;height:${{size}}px;background:${{node.color}}"></button>`;
      }}).join('');
      return `<section class="domain"><h2>${{domain.label}}</h2><div class="domain-count">${{reviewed}} / ${{total}} reviewed and exported</div><div class="nodes">${{nodes}}</div></section>`;
    }}).join('');
    const nodeById = new Map(data.nodes.map(node => [node.id, node]));
    document.querySelectorAll('.node').forEach(el => {{
      const show = () => {{
        const node = nodeById.get(el.dataset.id);
        selected.innerHTML = `
          <h2>${{node.label}}</h2>
          <p><strong>ID:</strong> ${{node.id}}</p>
          <p><strong>Status:</strong> ${{labels[node.status] || node.status}}</p>
          <p><strong>Domain:</strong> ${{data.domains.find(domain => domain.id === node.domain)?.label || node.domain}}</p>
          <p><strong>Library export:</strong> ${{node.library.exported ? 'complete' : 'incomplete'}}</p>
        `;
      }};
      el.addEventListener('mouseenter', show);
      el.addEventListener('focus', show);
    }});
  </script>
</body>
</html>
"""


def render_index_html() -> str:
    return """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url=progress_map.html">
  <title>DC Instructor Ops</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #172033;
      background: #ffffff;
    }
    main {
      width: min(560px, calc(100vw - 32px));
      border: 1px solid #d8dee9;
      border-radius: 8px;
      padding: 24px;
      background: #f7f8fb;
    }
    h1 {
      margin: 0 0 8px;
      font-size: 28px;
      letter-spacing: 0;
    }
    p {
      margin: 0 0 14px;
      color: #5b6475;
    }
    a {
      color: #155e75;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <main>
    <h1>DC Instructor Ops</h1>
    <p>Opening the progress map.</p>
    <a href="progress_map.html">Open progress map</a>
  </main>
</body>
</html>
"""


def main() -> None:
    OPS_DIR.mkdir(exist_ok=True)
    state = build_state()
    progress = render_progress_json(state)
    (OPS_DIR / "state.json").write_text(json.dumps(state, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (OPS_DIR / "dashboard.md").write_text(render_dashboard(state), encoding="utf-8")
    (OPS_DIR / "progress_map.json").write_text(json.dumps(progress, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (OPS_DIR / "progress_map.html").write_text(render_html(progress), encoding="utf-8")
    (OPS_DIR / "index.html").write_text(render_index_html(), encoding="utf-8")


if __name__ == "__main__":
    main()
