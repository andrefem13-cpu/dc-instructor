#!/usr/bin/env python3
"""Check an isolated esbuild bundle using only data declared in netlify.toml.

This models filesystem isolation. Netlify deploy-preview validation is separate.
"""
import json
import shutil
import subprocess
import tempfile
import tomllib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
config = tomllib.loads((ROOT / "netlify.toml").read_text())
patterns = config["functions"]["generate"]["included_files"]
with tempfile.TemporaryDirectory(prefix="dci-bundle-") as temp:
    dest = Path(temp)
    count = 0
    for pattern in patterns:
        for source in ROOT.glob(pattern):
            if source.is_file():
                target = dest / source.relative_to(ROOT)
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(source, target)
                count += 1
    # esbuild is already installed by the Vite toolchain in the lockfile.
    subprocess.run(["node", "--input-type=module", "-e", """
import {build} from 'esbuild';
await build({entryPoints:['netlify/functions/ontology-runtime.js'], bundle:true,
 platform:'node', format:'esm', outfile:process.argv[1]});
""", str(dest / "runtime.mjs")], cwd=ROOT, check=True)
    probe = """
import assert from 'node:assert/strict';
import {tryOntologyGeneration} from './runtime.mjs';
const result = tryOntologyGeneration({condition:'asthma exacerbation improved discharge',
 edNoteScrubbed:'Improved after nebulizers and steroids. Breathing comfortably on room air. Has rescue inhaler access.',
 readingLevel:'6th Grade', language:'English'});
if (process.argv[1] === 'missing') {
 assert.equal(result.fallback_reason, 'ontology_assets_unavailable');
} else {
 assert.equal(result.mode, 'ontology');
 assert.match(result.output, /DIAGNOSIS:/);
 assert.ok(result.source_cards_used.length);
}
"""
    subprocess.run(["node", "--input-type=module", "-e", probe, "present"], cwd=dest, check=True)
    (dest / "knowledge/ontology/runtime/ontology_manifest.json").unlink()
    subprocess.run(["node", "--input-type=module", "-e", probe, "missing"], cwd=dest, check=True)
print(f"Isolated bundle loads {count} declared assets; missing manifest produces explicit fallback")
