# Metrics collection

`snapshots.md` is an append-only log of usage snapshots, written by a scheduled
Claude Code task every three days.

## How it works now

The job calls one endpoint and formats the result:

```bash
curl -s -H "Authorization: Bearer $METRICS_TOKEN" \
  "https://dcinstructor.com/api/metrics?days=3"
```

`netlify/functions/metrics.js` holds the Supabase service role key and returns
finished aggregates. The job never touches a production credential.

`days` is a **rolling window in hours** (`days=3` means the last 72 hours), not
a calendar-day boundary. Expect it to differ slightly from a
`created_at >= <date>T00:00:00Z` query run at the same moment.

Response shape:

```json
{
  "generated_at": "2026-08-31T14:40:00.000Z",
  "window_days": 3,
  "total_generations": 158,
  "recent_generations": 27,
  "cap": { "limit": 500, "used": 158, "remaining": 342 },
  "top_conditions": [{ "condition": "Chest pain", "count": 10 }],
  "languages": { "English": 123, "Spanish": 30 },
  "reading_levels": { "6th Grade": 122, "8th Grade": 18 },
  "ratings": { "count": 27, "average": 4.93, "distribution": { "5": 26, "3": 1 } }
}
```

`METRICS_TOKEN` lives in the Netlify env (functions scope, secret). Rotate it
from *Project configuration → Environment variables*; nothing else depends on it.

## Why it was built this way

The job used to pull `SUPABASE_SERVICE_ROLE_KEY` out of the Netlify env over MCP
and query PostgREST itself. Three things went wrong repeatedly:

- **The key looked unreachable.** `manage-env-vars` sits on the Netlify MCP
  *updater* tool, not the read-only readers. Runs that probed only the readers
  concluded the key was unavailable and logged a failed snapshot.
- **A retryable 502 was treated as fatal.** The MCP gateway intermittently
  returns `502 Bad Gateway` with `retryable: true`. An immediate retry succeeds.
  Several snapshots recorded this as a hard blocker.
- **A query was simply wrong.** The job selected `ratings.rating`, but that
  column is `ratings.stars`. It failed regardless of credentials, and the
  failures were misread as schema drift.

Moving the queries server-side removes all three failure modes: no credential
fetch, no MCP dependency, and the column names live in version control next to
the schema.

## If you ever need to query Supabase directly

- Ratings are `ratings.stars` (1–5). There is no `ratings.rating`.
- `generations.rating` existed but was never written to; migration `002` drops it.
- `reading_level` and `language` are free text. `logGeneration()` normalizes
  them on write, and `metrics.js` normalizes again on read so older rows group
  correctly. Canonical forms are `"6th Grade"` and `"HL-1 (Health Literacy
  Level 1)"`, built in `src/App.jsx`.
- Anon reads of `generations` and `ratings` return zero rows — RLS allows only
  `insert` on `ratings` and `select` on the `generation_count` view.

## Note for the scheduled job

Start with an explicit `git checkout main`. The task has begun in detached HEAD
more than once, which strands the commit and needs a stash/merge to recover.
