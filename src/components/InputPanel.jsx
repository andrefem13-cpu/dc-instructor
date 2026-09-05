import { useMemo, useState } from 'react';
import LanguageSearch from './LanguageSearch.jsx';
import PHIRedactionBadge from './PHIRedactionBadge.jsx';
import { redactPHI } from '../lib/phiRedact.js';

const LEVELS = ['4th', '6th', '8th', '10th', 'HL-1'];
const DEFAULT_LANGS = ['English', 'Spanish', 'Haitian Creole', 'Mandarin', 'Arabic'];

export default function InputPanel({
  condition, setCondition,
  edNote, setEdNote,
  level, setLevel,
  language, setLanguage,
  onGenerate, busy, redactionMeta,
}) {
  const [showHL1Tip, setShowHL1Tip] = useState(false);

  const localRedactions = useMemo(() => {
    if (!edNote.trim()) return [];
    return redactPHI(edNote).redactions;
  }, [edNote]);

  const merged = redactionMeta?.redactions ?? localRedactions;

  return (
    <div className="glass p-5 space-y-5">
      <div>
        <label className="label-mono">Condition / Chief Complaint</label>
        <input
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g. Ankle sprain, UTI, Chest pain rule-out"
          className="mt-1.5 w-full bg-bg/60 border border-cool/15 focus:border-accent rounded-lg px-3 py-2.5 text-sm focus:outline-none"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="label-mono">ED Note (optional)</label>
          <PHIRedactionBadge
            redactions={merged}
            verifying={redactionMeta?.verifying}
            verified={redactionMeta?.verified}
          />
        </div>
        <textarea
          value={edNote}
          onChange={(e) => setEdNote(e.target.value)}
          rows={4}
          placeholder="Paste ED note for context (optional) — not stored. PHI auto-redacted before send."
          className="mt-1.5 w-full bg-bg/60 border border-cool/15 focus:border-accent rounded-lg px-3 py-2.5 text-sm focus:outline-none resize-y"
        />
      </div>

      <div>
        <label className="label-mono">Reading Level</label>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setLevel(lvl)}
              onMouseEnter={() => lvl === 'HL-1' && setShowHL1Tip(true)}
              onMouseLeave={() => setShowHL1Tip(false)}
              className={`pill ${level === lvl ? 'pill-active' : ''}`}
            >
              {lvl === 'HL-1' ? 'HL-1' : `${lvl} Grade`}
            </button>
          ))}
        </div>
        {showHL1Tip && (
          <div className="mt-1.5 text-[11px] text-cool/60 leading-snug">
            HL-1: simplest possible language, short sentences, no jargon.
          </div>
        )}
      </div>

      <div>
        <label className="label-mono">Language</label>
        <div className="mt-1.5 flex flex-wrap gap-1.5 items-center">
          {DEFAULT_LANGS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLanguage(l)}
              className={`pill ${language === l ? 'pill-active' : ''}`}
            >
              {l}
            </button>
          ))}
          {!DEFAULT_LANGS.includes(language) && language && (
            <span className="pill pill-active">{language}</span>
          )}
          <LanguageSearch value={language} onChange={setLanguage} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="label-mono">PRN Illustration</label>
        <span className="text-[11px] text-cool/50">Temporarily unavailable</span>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        disabled={busy || !condition.trim()}
        className="btn-primary"
      >
        {busy ? 'Generating…' : '⚡ Generate Instructions'}
      </button>
    </div>
  );
}
