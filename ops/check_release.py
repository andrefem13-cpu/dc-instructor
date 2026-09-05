#!/usr/bin/env python3
"""Engineering gate only. Passing does not imply clinical or deployment approval."""
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMMANDS = [
    ["python3", "knowledge/ontology/evals/run_runtime_cases.py"],
    ["node", "knowledge/ontology/evals/run_netlify_runtime_smoke.mjs"],
    ["node", "knowledge/ontology/evals/check_generation_logging.mjs"],
    ["python3", "ops/check_runtime_bundle.py"],
    ["node", "knowledge/ontology/evals/check_product_tailoring_contract.mjs"],
    ["node", "knowledge/ontology/evals/check_product_prompt_policy.mjs"],
    ["python3", "knowledge/ontology/scripts/validate_ontology.py"],
    ["python3", "knowledge/ontology/scripts/validate_reviewed_library.py"],
    ["python3", "knowledge/ontology/evals/check_phase21_expansion_gate.py"],
    ["python3", "knowledge/ontology/evals/check_low_confidence_near_misses.py"],
    ["python3", "ops/build_library_audit.py", "--check"],
    ["python3", "ops/check_library_audit.py"],
    ["npm", "run", "build"],
    ["git", "diff", "--check"],
]

for command in COMMANDS:
    print("Running " + " ".join(command), flush=True)
    result = subprocess.run(command, cwd=ROOT, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    if result.returncode:
        print(result.stdout)
        raise SystemExit(result.returncode)
    print("PASS: " + (result.stdout.strip().splitlines()[-1] if result.stdout.strip() else "clean"), flush=True)
print("Engineering release checks passed. Clinical, literacy, Spanish and live product gates remain separate.")
