import { jsonResponse } from './_lib.js';

const PROMPT_PREFIX = 'Medical illustration, clean line art, anatomical diagram, clinical education style, black and white sketch, no text labels: ';

// Illustration generation is disabled to halt Stability credit usage.
// To re-enable: remove the early return below and restore the UI toggle in InputPanel.jsx.
const IMAGE_GENERATION_DISABLED = true;

export default async (req) => {
  if (IMAGE_GENERATION_DISABLED) return jsonResponse(503, { error: 'disabled', detail: 'Illustration generation is temporarily disabled.' });
  if (req.method !== 'POST') return jsonResponse(405, { error: 'Method not allowed' });
  const apiKey = process.env.STABILITY_API_KEY;
  if (!apiKey) return jsonResponse(500, { error: 'Server not configured' });

  let body;
  try { body = await req.json(); } catch { return jsonResponse(400, { error: 'Invalid JSON' }); }
  const userPrompt = (body?.prompt || '').toString().slice(0, 500);
  if (!userPrompt.trim()) return jsonResponse(400, { error: 'prompt required' });

  const form = new FormData();
  form.append('prompt', PROMPT_PREFIX + userPrompt);
  form.append('output_format', 'png');
  form.append('aspect_ratio', '1:1');

  const r = await fetch('https://api.stability.ai/v2beta/stable-image/generate/ultra', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: 'image/*',
    },
    body: form,
  });

  if (!r.ok) {
    const detail = await r.text().catch(() => '');
    return jsonResponse(502, { error: 'image_upstream', detail: detail.slice(0, 300) });
  }

  const buf = await r.arrayBuffer();
  const b64 = Buffer.from(buf).toString('base64');
  return jsonResponse(200, { image: `data:image/png;base64,${b64}` });
};
