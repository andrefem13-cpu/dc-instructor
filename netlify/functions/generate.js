import { checkLimits, logGeneration, jsonResponse } from './_lib.js';
import { tryOntologyGeneration } from './ontology-runtime.js';

const EXPLICIT_MEDICATION_TERMS = [
  'acetaminophen',
  'albuterol',
  'amoxicillin',
  'amoxicillin clavulanate',
  'amoxicillin-clavulanate',
  'augmentin',
  'azithromycin',
  'bactrim',
  'budesonide',
  'cephalexin',
  'ciprofloxacin',
  'clindamycin',
  'doxycycline',
  'flomax',
  'fluticasone',
  'ibuprofen',
  'keflex',
  'macrobid',
  'nitrofurantoin',
  'ondansetron',
  'prednisone',
  'tamsulosin',
  'trimethoprim',
  'tylenol',
  'zofran',
];

const MED_DETAIL_PATTERN = /\b(?:\d+(?:\.\d+)?\s?(?:mg|mcg|g|ml)|q\d+\s?h?|q\s?\d+\s?h?|bid|tid|qid|daily|twice daily|three times daily|every\s+\d+\s+(?:hours?|days?)|for\s+\d+\s+days?)\b/i;

function normalizeMedicationWindow(text) {
  return String(text || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

export function classifyMedicationProvenance({ edNoteScrubbed = '', ontologyMode = 'generator' } = {}) {
  if (ontologyMode === 'ontology') {
    return {
      mode: 'ontology_general',
      label: 'ontology general guidance',
      passthrough_only: true,
      inference_allowed: false,
      clinician_stated_medications_present: false,
      review_required: true,
    };
  }

  const note = normalizeMedicationWindow(edNoteScrubbed);
  const medicationTerm = EXPLICIT_MEDICATION_TERMS.find((term) => note.includes(term));
  const medicationIndex = medicationTerm ? note.indexOf(medicationTerm) : -1;
  const medicationWindow = medicationIndex >= 0
    ? note.slice(Math.max(0, medicationIndex - 80), medicationIndex + medicationTerm.length + 120)
    : '';
  const hasExplicitDetail = Boolean(medicationTerm && MED_DETAIL_PATTERN.test(medicationWindow));
  const hasGeneralMedicationMention = /\b(?:antibiotics?|pain medicine|steroids?|inhaler|prescription|prescribed)\b/i.test(note);

  if (hasExplicitDetail) {
    return {
      mode: 'clinician_stated_present',
      label: 'clinician-stated med details present',
      passthrough_only: true,
      inference_allowed: false,
      clinician_stated_medications_present: true,
      review_required: true,
    };
  }

  return {
    mode: hasGeneralMedicationMention ? 'general_medication_mention_only' : 'no_clinician_med_details',
    label: hasGeneralMedicationMention ? 'general med mention only' : 'no clinician med details detected',
    passthrough_only: true,
    inference_allowed: false,
    clinician_stated_medications_present: false,
    review_required: true,
  };
}

export const SYSTEM = ({ readingLevel, language }) => `You are a board-certified Emergency Medicine clinician writing discharge instructions for a patient you just saw and treated.

Reading level: ${readingLevel} — enforce strictly. Match vocabulary, sentence length, and sentence complexity to this reading level.
Language: ${language} — write the entire output in this language. Translate medical terms appropriately; do not leave English fragments.

VOICE:
Write as the clinician who evaluated this patient. Be specific, actionable, and human. Never templated, never generic. Reassure where reassurance is warranted; escalate where escalation is warranted. Use "you" — never "the patient." Active voice only.

HL-1 SPECIAL RULES (apply only if reading level is HL-1):
- Sentences under 10 words.
- No medical terms — translate everything ("infection" → "germs", "hypertension" → "high blood pressure").
- One idea per sentence.

OUTPUT FORMAT — produce exactly these 7 sections, in this order, using these exact headers:

DIAGNOSIS:
One sentence naming the condition in plain language a patient understands.

WHAT WE FOUND:
2-3 sentences. What was evaluated in the ED (history, exam, key tests/imaging if relevant), the main findings, and why this is the diagnosis. Connect findings to symptoms the patient experienced.

WHAT TO DO AT HOME:
Bullet points (max 7) covering whichever apply: activity restrictions and progression, diet, hydration, wound/incision/dressing care, hygiene, sleep position, ice/heat, sick-day rules. Be specific (e.g., "no lifting more than 10 lbs for 2 weeks" not "take it easy").

MEDICATIONS:
Use medication details as passthrough only. If the ED note explicitly states a medication, dose, route, frequency, or duration, you may format that exact clinician-entered medication instruction in plain language. Do not infer, invent, or complete missing medication details. If the note says only "antibiotics" or "pain medicine," do not choose a drug, dose, route, frequency, or duration. For static or unsupported medication advice, use general wording such as "Take the antibiotic as listed on your prescription" or "Use acetaminophen or ibuprofen only if these are safe for you and follow the label." If no new medications are stated, write exactly: "No new medications. Continue your home medications as before."

RETURN TO ED IF:
Bullet points (max 6), condition-specific red flags. Tie each to this diagnosis — not generic "if you feel worse." Examples for chest pain workup: "chest pain that lasts more than 15 minutes or spreads to your arm, jaw, or back"; "shortness of breath at rest or when lying flat." Use concrete thresholds (temperature, duration, severity) where possible.

FOLLOW UP:
2-4 sentences specifying who (primary care, a specific specialty, or urgent care), when (a condition-appropriate concrete timeframe such as "within 3-5 days" or "in 1-2 weeks"), and how (call the office, use a provided referral, or visit a walk-in clinic). If primary care is a follow-up destination, include a concrete phone script tailored to the CONDITION/chief complaint: "I was seen in the emergency department for [condition or chief complaint]. I need a follow-up appointment." Translate the script with the rest of the output. Do not default every condition to a one-week timeframe. If a referral is being placed, say so.

RESOURCES:
1-2 short bullets for additional learning or next-step support. Prefer patient-friendly source names or practical reminders. Do not paste article text. If no specific resource is available, include: "- Bring these instructions to your follow-up visit."

CONTEXT HANDLING:
If an ED note is provided, use it for clinical context (vitals, exam findings, labs, imaging, treatment given) but never reproduce it verbatim and never include any patient identifiers. If the ED note conflicts with the stated condition, prioritize the stated condition.

OUTPUT RULES:
Output the discharge instructions only. No preamble, no closing remarks, no meta-commentary. Begin directly with "DIAGNOSIS:". The final section must be "RESOURCES:".`;

export default async (req) => {
  if (req.method !== 'POST') return jsonResponse(405, { error: 'Method not allowed' });

  const limits = await checkLimits();
  if (limits.blocked) return jsonResponse(429, { error: 'limit', reason: limits.reason });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return jsonResponse(500, { error: 'Server not configured' });

  let body;
  try { body = await req.json(); } catch { return jsonResponse(400, { error: 'Invalid JSON' }); }
  const { condition, edNoteScrubbed, readingLevel = '6th Grade', language = 'English', hasImage = false } = body || {};
  if (!condition || typeof condition !== 'string') {
    return jsonResponse(400, { error: 'condition required' });
  }

  const userMessage = edNoteScrubbed
    ? `CONDITION: ${condition}\n\nED NOTE CONTEXT (PHI redacted):\n${edNoteScrubbed}`
    : `CONDITION: ${condition}`;

  const ontology = tryOntologyGeneration({ condition, edNoteScrubbed, readingLevel, language });
  const medicationProvenance = classifyMedicationProvenance({
    edNoteScrubbed,
    ontologyMode: ontology.mode,
  });
  const tailoringMode = ontology.mode === 'ontology'
    ? 'reviewed_ontology_static'
    : 'llm_tailored_with_policy';
  const recordGeneration = async () => {
    const generationId = await logGeneration({
      reading_level: readingLevel,
      language,
      condition_input: condition,
      has_image_request: hasImage,
    });
    console.info(JSON.stringify({
    event: 'generation_mode',
    generation_id: generationId,
    mode: ontology.mode,
    phenotype_id: ontology.phenotype_id,
    confidence: ontology.confidence,
    fallback_reason: ontology.fallback_reason,
    output_format: ontology.output_format || null,
    output_modifiers: ontology.output_modifiers || [],
    medication_provenance: medicationProvenance.mode,
    }));
    return generationId;
  };

  if (ontology.mode === 'ontology' && ontology.output) {
    const generationId = await recordGeneration();
    const stream = new ReadableStream({
      start(controller) {
        const enc = new TextEncoder();
        controller.enqueue(enc.encode(JSON.stringify({
          type: 'meta',
          generation_id: generationId,
          warning: limits.warning ? 'approaching_limit' : null,
          count: limits.count,
          ontology_mode: ontology.mode,
          phenotype_id: ontology.phenotype_id,
          ontology_confidence: ontology.confidence,
          fallback_reason: null,
          output_format: ontology.output_format || null,
          output_modifiers: ontology.output_modifiers || [],
          tailoring_mode: tailoringMode,
          medication_provenance: medicationProvenance,
          source_cards_used: ontology.source_cards_used || [],
        }) + '\n'));
        controller.enqueue(enc.encode(JSON.stringify({ type: 'chunk', text: ontology.output }) + '\n'));
        controller.enqueue(enc.encode(JSON.stringify({ type: 'done' }) + '\n'));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'application/x-ndjson', 'Cache-Control': 'no-store' },
    });
  }

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 2000,
      stream: true,
      system: SYSTEM({ readingLevel, language }),
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text().catch(() => '');
    return jsonResponse(502, { error: 'upstream', detail: errText.slice(0, 500) });
  }

  // Log only after the upstream request is accepted, so failed generations
  // don't inflate the usage data.
  const generationId = await recordGeneration();

  const stream = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder();
      controller.enqueue(enc.encode(JSON.stringify({
        type: 'meta',
        generation_id: generationId,
        warning: limits.warning ? 'approaching_limit' : null,
        count: limits.count,
        ontology_mode: ontology.mode,
        phenotype_id: ontology.phenotype_id,
        ontology_confidence: ontology.confidence,
        fallback_reason: ontology.fallback_reason,
        output_format: ontology.output_format || null,
        output_modifiers: ontology.output_modifiers || [],
        tailoring_mode: tailoringMode,
        medication_provenance: medicationProvenance,
        source_cards_used: ontology.source_cards_used || [],
      }) + '\n'));

      const reader = upstream.body.getReader();
      const dec = new TextDecoder();
      let buf = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop() || '';
        for (const line of lines) {
          if (!line.startsWith('data:')) continue;
          const data = line.slice(5).trim();
          if (!data || data === '[DONE]') continue;
          try {
            const evt = JSON.parse(data);
            if (evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta') {
              controller.enqueue(enc.encode(JSON.stringify({ type: 'chunk', text: evt.delta.text }) + '\n'));
            }
          } catch {}
        }
      }
      controller.enqueue(enc.encode(JSON.stringify({ type: 'done' }) + '\n'));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'application/x-ndjson', 'Cache-Control': 'no-store' },
  });
};
