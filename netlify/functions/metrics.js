// Aggregated usage metrics, computed server-side.
//
// The scheduled metrics job used to fetch SUPABASE_SERVICE_ROLE_KEY out of the
// Netlify env and query PostgREST directly. That put a production credential in
// the job's hands and made the job depend on an MCP round-trip that failed
// intermittently. This endpoint holds the key instead: the job just calls
// /api/metrics with a low-privilege bearer token and gets finished numbers.
import { createHash, timingSafeEqual } from 'node:crypto';
import { jsonResponse, normalizeReadingLevel, normalizeLanguage } from './_lib.js';

const PAGE_SIZE = 1000;

function tokenMatches(presented, expected) {
  // Digest both sides so timingSafeEqual always gets equal-length buffers.
  const a = createHash('sha256').update(presented).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}

// PostgREST caps a response at 1000 rows, so walk Range windows until short.
async function fetchAll(url, svc, path) {
  const rows = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const r = await fetch(`${url}/rest/v1/${path}`, {
      headers: {
        apikey: svc,
        Authorization: `Bearer ${svc}`,
        Range: `${offset}-${offset + PAGE_SIZE - 1}`,
      },
    });
    if (!r.ok) throw new Error(`supabase ${r.status} on ${path}`);
    const page = await r.json();
    rows.push(...page);
    if (page.length < PAGE_SIZE) return rows;
  }
}

function tally(values) {
  const counts = new Map();
  for (const v of values) counts.set(v, (counts.get(v) || 0) + 1);
  return Object.fromEntries([...counts.entries()].sort((a, b) => b[1] - a[1]));
}

export default async (req) => {
  const expected = process.env.METRICS_TOKEN;
  if (!expected) return jsonResponse(503, { error: 'METRICS_TOKEN not configured' });

  const presented = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (!presented || !tokenMatches(presented, expected)) {
    return jsonResponse(401, { error: 'unauthorized' });
  }

  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const svc = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !svc) return jsonResponse(503, { error: 'supabase env vars missing' });

  // ?days=N controls the recent-activity window; the job passes 3.
  const days = Math.min(Math.max(parseInt(new URL(req.url).searchParams.get('days') || '3', 10) || 3, 1), 365);
  const since = new Date(Date.now() - days * 86400_000);

  try {
    const [gens, ratings] = await Promise.all([
      fetchAll(url, svc, 'generations?select=condition_input,language,reading_level,created_at&order=created_at.desc'),
      fetchAll(url, svc, 'ratings?select=stars,created_at'),
    ]);

    // Normalize on read too — rows written before normalization landed are still
    // in whatever spelling the caller sent, and should group with the rest.
    const conditions = gens
      .map((g) => (g.condition_input || '').trim())
      .filter(Boolean)
      .map((c) => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase());

    const stars = ratings.map((r) => r.stars).filter((s) => typeof s === 'number');

    return jsonResponse(200, {
      generated_at: new Date().toISOString(),
      window_days: days,
      total_generations: gens.length,
      recent_generations: gens.filter((g) => new Date(g.created_at) >= since).length,
      cap: { limit: 500, used: gens.length, remaining: Math.max(0, 500 - gens.length) },
      top_conditions: Object.entries(tally(conditions))
        .slice(0, 10)
        .map(([condition, count]) => ({ condition, count })),
      languages: tally(gens.map((g) => normalizeLanguage(g.language) || 'Unknown')),
      reading_levels: tally(gens.map((g) => normalizeReadingLevel(g.reading_level) || 'Unknown')),
      ratings: {
        count: stars.length,
        average: stars.length ? Number((stars.reduce((a, b) => a + b, 0) / stars.length).toFixed(2)) : null,
        distribution: tally(stars),
      },
    });
  } catch (e) {
    return jsonResponse(502, { error: String(e.message || e) });
  }
};
