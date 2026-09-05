export function jsonResponse(status, body, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}

// The UI builds these labels in App.jsx before calling /api/generate, but direct
// API calls bypass that, which is how a handful of bare "6th" rows got stored.
// Normalizing here keeps one canonical spelling per level regardless of caller.
const LEVEL_LABELS = {
  '4th': '4th Grade',
  '6th': '6th Grade',
  '8th': '8th Grade',
  '10th': '10th Grade',
  'hl-1': 'HL-1 (Health Literacy Level 1)',
  'hl1': 'HL-1 (Health Literacy Level 1)',
};

export function normalizeReadingLevel(value) {
  const raw = (value || '').trim();
  if (!raw) return null;
  const key = raw.toLowerCase().replace(/\s+grade$/, '').replace(/\s*\(.*\)$/, '').trim();
  return LEVEL_LABELS[key] || raw;
}

// `language` comes from a free-text search field, so casing is whatever the user
// typed ("wolof", "french"). Title-case each word so it groups in the metrics.
export function normalizeLanguage(value) {
  const raw = (value || '').trim();
  if (!raw) return null;
  return raw
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

export async function checkLimits() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const svc = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && svc) {
    try {
      const r = await fetch(`${url}/rest/v1/generation_count?select=count`, {
        headers: { apikey: svc, Authorization: `Bearer ${svc}` },
      });
      const rows = await r.json();
      const count = Array.isArray(rows) ? (rows[0]?.count ?? 0) : 0;
      if (count >= 500) return { blocked: true, reason: 'limit', count };
      return { blocked: false, count, warning: count >= 400 };
    } catch {
      return { blocked: false, count: 0 };
    }
  }
  return { blocked: false, count: 0 };
}

export async function logGeneration({ reading_level, language, condition_input, has_image_request }) {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const svc = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !svc) return null;
  try {
    const r = await fetch(`${url}/rest/v1/generations`, {
      method: 'POST',
      headers: {
        apikey: svc,
        Authorization: `Bearer ${svc}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        reading_level: normalizeReadingLevel(reading_level),
        language: normalizeLanguage(language),
        condition_input: (condition_input || '').slice(0, 200),
        has_image_request: !!has_image_request,
      }),
    });
    const rows = await r.json();
    return Array.isArray(rows) ? rows[0]?.id : null;
  } catch {
    return null;
  }
}
