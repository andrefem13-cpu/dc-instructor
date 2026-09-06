import assert from 'node:assert/strict';
import generate from '../../../netlify/functions/generate.js';

// Exercise the actual handler with a fake transport. No credentials or external requests.
const savedFetch = globalThis.fetch;
const savedInfo = console.info;
const keys = ['ANTHROPIC_API_KEY', 'VITE_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
const savedEnv = Object.fromEntries(keys.map(k => [k, process.env[k]]));
const asthma = {
  condition: 'asthma exacerbation improved discharge',
  edNoteScrubbed: 'Improved after nebulizers and steroids. Breathing comfortably on room air. Has rescue inhaler access.',
};
const cases = [
  ...['4th Grade', '6th Grade', 'HL-1 (Health Literacy Level 1)'].map(readingLevel => ({
    name: `reviewed ${readingLevel}`, payload: {...asthma, readingLevel, language: 'English'}, mode: 'ontology',
  })),
  {name: 'Spanish fallback', payload: {...asthma, language: 'Spanish'}, mode: 'generator', reason: 'unsupported_ontology_language'},
  {name: '8th-grade fallback', payload: {...asthma, readingLevel: '8th Grade'}, mode: 'generator', reason: 'unsupported_ontology_reading_level'},
  {name: 'unsupported condition', payload: {condition: 'dizziness', language: 'english', readingLevel: '6th'}, mode: 'generator', reason: 'no_supported_phenotype_match'},
  {name: 'upstream rejection', payload: {condition: 'dizziness'}, reject: true},
];

try {
  process.env.ANTHROPIC_API_KEY = 'test-only';
  process.env.VITE_SUPABASE_URL = 'https://example.invalid';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-only';
  for (const c of cases) {
    const rows = [], events = [];
    let upstreamCalls = 0;
    console.info = value => events.push(JSON.parse(value));
    globalThis.fetch = async (url, options = {}) => {
      if (url === 'https://example.invalid/rest/v1/generation_count?select=count') {
        return Response.json([{count: 10}]);
      }
      if (url === 'https://example.invalid/rest/v1/generations') {
        rows.push(JSON.parse(options.body));
        return Response.json([{id: 'test-generation'}]);
      }
      if (url === 'https://api.anthropic.com/v1/messages') {
        upstreamCalls++;
        if (c.reject) return new Response('rejected', {status: 503});
        return new Response('data: {"type":"content_block_delta","delta":{"type":"text_delta","text":"Test output"}}\n\ndata: [DONE]\n\n');
      }
      throw new Error(`Unexpected transport: ${url}`);
    };
    const response = await generate(new Request('https://example.invalid/api/generate', {
      method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(c.payload),
    }));
    if (c.reject) {
      assert.equal(response.status, 502, c.name);
      assert.equal(rows.length, 0, c.name);
      assert.equal(events.length, 0, c.name);
    } else {
      assert.equal(response.status, 200, c.name);
      const messages = (await response.text()).trim().split('\n').map(JSON.parse);
      assert.equal(messages[0].ontology_mode, c.mode, c.name);
      assert.equal(messages[0].generation_id, 'test-generation', c.name);
      assert.equal(messages[0].fallback_reason, c.reason || null, c.name);
      assert.equal(messages.at(-1).type, 'done', c.name);
      assert.ok(messages.some(m => m.type === 'chunk' && m.text), c.name);
      assert.equal(rows.length, 1, c.name);
      assert.equal(events.length, 1, c.name);
      assert.equal(events[0].generation_id, 'test-generation', c.name);
      assert.equal(rows[0].language, c.payload.language === 'Spanish' ? 'Spanish' : 'English', c.name);
      assert.equal(rows[0].reading_level, c.payload.readingLevel === '6th' ? '6th Grade' : c.payload.readingLevel || '6th Grade', c.name);
      assert.ok(!('edNoteScrubbed' in rows[0]), c.name);
    }
    assert.equal(upstreamCalls, c.mode === 'ontology' ? 0 : 1, c.name);
  }
} finally {
  globalThis.fetch = savedFetch;
  console.info = savedInfo;
  for (const k of keys) {
    if (savedEnv[k] === undefined) delete process.env[k]; else process.env[k] = savedEnv[k];
  }
}
console.log(`${cases.length} generation-handler routing and logging cases passed`);
