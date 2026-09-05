# DC Instructor

Plain-language ED discharge instruction generator for clinicians. Picks reading level (4th–10th grade or HL-1) and language, optionally generates a clean medical illustration, and auto-redacts PHI from any pasted ED note before it leaves the browser.

Built by [@BloodSweatxED](https://x.com/BloodSweatxED) — EM physician, clinician-developer.

## Stack
- React + Vite + Tailwind
- Netlify Functions (serverless API proxy — keys never reach the browser)
- Anthropic Claude (`claude-sonnet-4-5` for generation, `claude-haiku-4-5` for PHI verify)
- Stability AI for medical line-art
- Supabase for usage counter + ratings

## Setup

```bash
git clone https://github.com/BloodSweatxED/dc-instructor.git dc-instructor
cd dc-instructor
npm install
cp .env.example .env
# fill in env values
npx netlify dev   # runs Vite + Functions together
```

## Release completion

Start with [the release completion plan](ops/RELEASE_COMPLETION.md) for the proposed pilot scope, dated gates, current verification, and recovery blockers. The older generated dashboard measures inventory, not release readiness.

## Ops dashboard

The repo includes a generated continuity dashboard for long-running DC Instructor work:

```bash
npm run ops:dashboard
```

This updates:

- `ops/state.json`
- `ops/dashboard.md`
- `ops/progress_map.json`
- `ops/progress_map.html`
- `ops/index.html`

Use `ops/dashboard.md` as the next-agent startup board, then verify the latest Obsidian handoff and live repo state before editing.

When GitHub Pages is enabled for the dashboard branch, the browser-clickable map lives at:

```text
https://bloodsweatxed.github.io/dc-instructor/ops/progress_map.html
```

### Supabase
1. Create a Supabase project.
2. In SQL editor, run `supabase/migrations/001_initial_schema.sql`.
3. Copy the project URL and anon key into `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
4. Copy the **service role key** (Settings → API) into `SUPABASE_SERVICE_ROLE_KEY` — server-side only, do **not** prefix with `VITE_`.

### Netlify deploy
1. Push to GitHub.
2. Connect the repo in Netlify (build cmd `npm run build`, publish `dist`).
3. Set env vars in Netlify dashboard:
   - `ANTHROPIC_API_KEY`
   - `STABILITY_API_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
   - `LAUNCH_DATE` (ISO date — drives the 30-day trial cutoff)
4. Point `dcinstructor.com` at the Netlify site.

## PHI redaction

Two layers, runs only when the optional ED note field has content:

1. **Client-side regex** (`src/lib/phiRedact.js`) — HIPAA Safe Harbor 18 identifiers (names, MRNs, dates, phone, address, SSN, age >89, email, URL). Replaces matches with typed tokens (`[NAME]`, `[MRN]`, …). Original strings never leave the browser.
2. **LLM verify** (`netlify/functions/redact-verify.js`) — fast Haiku pass on the already-scrubbed text catches contextual identifiers regex misses (employer, public role, rare condition, geography).

The `PHIRedactionBadge` shows what was removed; the verified state is shown once the second pass returns.

## Trial limits

- Hard wall at 500 total generations OR 30 days past `LAUNCH_DATE`, whichever fires first.
- Banner at 400 generations.
- After cutoff, the app shows a contact card; no further API calls fire.

## Privacy
- ED note content is never written to the DB. Only `condition_input` (chief complaint) is stored, and only the first 200 chars.
- All Anthropic / Stability calls go through Netlify Functions; the browser bundle contains no third-party API keys.
