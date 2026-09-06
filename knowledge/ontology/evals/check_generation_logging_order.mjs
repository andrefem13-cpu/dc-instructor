import assert from 'node:assert/strict';
import handler from '../../../netlify/functions/generate.js';

// No network or real patient data: exercise the real handler with fake services.
process.env.VITE_SUPABASE_URL = 'https://database.invalid';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-only';
process.env.ANTHROPIC_API_KEY = 'test-only';
const originalFetch = globalThis.fetch;
const originalInfo = console.info;
try {
  for (const scenario of ['static', 'accepted', 'rejected', 'network-error']) {
    const calls = [];
    const events = [];
    console.info = (value) => events.push(JSON.parse(value));
    globalThis.fetch = async (url, options) => {
      if (url.includes('/generation_count')) return Response.json([{ count: 1 }]);
      if (url.endsWith('/generations')) {
        calls.push('log');
        const row = JSON.parse(options.body);
        assert.equal(row.reading_level, '6th Grade');
        assert.equal(row.language, 'English');
        assert.equal(Object.hasOwn(row, 'edNoteScrubbed'), false);
        return Response.json([{ id: 'test-generation' }]);
      }
      assert.equal(url, 'https://api.anthropic.com/v1/messages');
      calls.push('upstream');
      if (scenario === 'network-error') throw new Error('network unavailable');
      if (scenario === 'rejected') return new Response('unavailable', { status: 503 });
      return new Response('data: {"type":"content_block_delta","delta":{"type":"text_delta","text":"Test output"}}\n\n');
    };
    const body = scenario === 'static'
      ? { condition: 'asthma_exacerbation_improved_discharge', edNoteScrubbed: 'Asthma flare improved after ED treatment. Breathing comfortably. Rescue inhaler available. No hypoxia. No chest pain.' }
      : { condition: 'unsupported test condition' };
    const request = new Request('https://app.invalid/api/generate', {
      method: 'POST', body: JSON.stringify(body),
    });
    if (scenario === 'network-error') {
      await assert.rejects(() => handler(request), /network unavailable/);
    } else {
      const response = await handler(request);
      assert.equal(response.status, scenario === 'rejected' ? 502 : 200);
      if (response.status === 200) {
        const rows = (await response.text()).trim().split('\n').map(JSON.parse);
        assert.equal(rows[0].generation_id, 'test-generation');
        assert.equal(rows[0].ontology_mode, scenario === 'static' ? 'ontology' : 'generator');
        assert.equal(rows.at(-1).type, 'done');
      }
    }
    assert.deepEqual(calls, scenario === 'static' ? ['log'] : scenario === 'accepted' ? ['upstream', 'log'] : ['upstream']);
    assert.equal(events.length, ['static', 'accepted'].includes(scenario) ? 1 : 0);
    if (events.length) assert.equal(events[0].generation_id, 'test-generation');
  }
} finally {
  globalThis.fetch = originalFetch;
  console.info = originalInfo;
}
console.log('Generation logging: four handler scenarios passed.');
