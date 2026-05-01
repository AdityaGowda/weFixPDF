'use client';

import { useState, useMemo } from 'react';
import { ToolShell, CopyButton } from './SplitEditorPane';

// ─────────────────────────────────────────────────────────────────────────────
// Model definitions
// ─────────────────────────────────────────────────────────────────────────────
interface ModelDef {
  id: string;
  name: string;
  provider: string;
  contextWindow: number;       // tokens
  inputPricePer1M:  number;    // USD per 1M input tokens
  outputPricePer1M: number;    // USD per 1M output tokens
  avgCharsPerToken: number;    // calibration factor for approximation
}

const MODELS: ModelDef[] = [
  // OpenAI
  { id: 'gpt-4o',         name: 'GPT-4o',              provider: 'OpenAI',    contextWindow: 128_000, inputPricePer1M: 2.50,   outputPricePer1M: 10.00,  avgCharsPerToken: 4.0 },
  { id: 'gpt-4o-mini',    name: 'GPT-4o mini',         provider: 'OpenAI',    contextWindow: 128_000, inputPricePer1M: 0.15,   outputPricePer1M: 0.60,   avgCharsPerToken: 4.0 },
  { id: 'gpt-4-turbo',    name: 'GPT-4 Turbo',         provider: 'OpenAI',    contextWindow: 128_000, inputPricePer1M: 10.00,  outputPricePer1M: 30.00,  avgCharsPerToken: 4.0 },
  { id: 'gpt-3.5-turbo',  name: 'GPT-3.5 Turbo',      provider: 'OpenAI',    contextWindow: 16_385,  inputPricePer1M: 0.50,   outputPricePer1M: 1.50,   avgCharsPerToken: 4.0 },
  { id: 'o1',             name: 'o1',                  provider: 'OpenAI',    contextWindow: 128_000, inputPricePer1M: 15.00,  outputPricePer1M: 60.00,  avgCharsPerToken: 4.0 },
  { id: 'o3-mini',        name: 'o3-mini',             provider: 'OpenAI',    contextWindow: 200_000, inputPricePer1M: 1.10,   outputPricePer1M: 4.40,   avgCharsPerToken: 4.0 },
  // Anthropic
  { id: 'claude-opus-4',     name: 'Claude Opus 4',     provider: 'Anthropic', contextWindow: 200_000, inputPricePer1M: 15.00,  outputPricePer1M: 75.00,  avgCharsPerToken: 3.8 },
  { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', provider: 'Anthropic', contextWindow: 200_000, inputPricePer1M: 3.00,   outputPricePer1M: 15.00,  avgCharsPerToken: 3.8 },
  { id: 'claude-haiku-4-5',  name: 'Claude Haiku 4.5',  provider: 'Anthropic', contextWindow: 200_000, inputPricePer1M: 0.80,   outputPricePer1M: 4.00,   avgCharsPerToken: 3.8 },
  // Google
  { id: 'gemini-2.5-pro',  name: 'Gemini 2.5 Pro',    provider: 'Google',    contextWindow: 1_000_000, inputPricePer1M: 1.25,  outputPricePer1M: 10.00,  avgCharsPerToken: 4.1 },
  { id: 'gemini-2.0-flash',name: 'Gemini 2.0 Flash',  provider: 'Google',    contextWindow: 1_000_000, inputPricePer1M: 0.10,  outputPricePer1M: 0.40,   avgCharsPerToken: 4.1 },
  // Meta
  { id: 'llama-3.1-405b', name: 'Llama 3.1 405B',     provider: 'Meta',      contextWindow: 128_000, inputPricePer1M: 2.70,   outputPricePer1M: 2.70,   avgCharsPerToken: 3.9 },
  { id: 'llama-3.1-8b',   name: 'Llama 3.1 8B',       provider: 'Meta',      contextWindow: 128_000, inputPricePer1M: 0.06,   outputPricePer1M: 0.06,   avgCharsPerToken: 3.9 },
  // Mistral
  { id: 'mistral-large',  name: 'Mistral Large 2',    provider: 'Mistral',   contextWindow: 128_000, inputPricePer1M: 2.00,   outputPricePer1M: 6.00,   avgCharsPerToken: 3.9 },
  { id: 'mistral-small',  name: 'Mistral Small 3.1',  provider: 'Mistral',   contextWindow: 128_000, inputPricePer1M: 0.10,   outputPricePer1M: 0.30,   avgCharsPerToken: 3.9 },
];

const PROVIDERS = [...new Set(MODELS.map(m => m.provider))];

// ─────────────────────────────────────────────────────────────────────────────
// Tokenizer approximation
// Uses a BPE-inspired heuristic:
//  - Common short English words → 1 token
//  - Each punctuation/whitespace run → 1 token
//  - Long or uncommon words split at ~4-char boundaries
// Produces colored spans mapping approximate token chunks
// ─────────────────────────────────────────────────────────────────────────────

// 200 most common English words that are typically 1 token in GPT tokenizers
const COMMON_WORDS = new Set([
  'the','be','to','of','and','a','in','that','have','it','for','not','on','with',
  'he','as','you','do','at','this','but','his','by','from','they','we','say','her',
  'she','or','an','will','my','one','all','would','there','their','what','so','up',
  'out','if','about','who','get','which','go','me','when','make','can','like','time',
  'no','just','him','know','take','people','into','year','your','good','some','could',
  'them','see','other','than','then','now','look','only','come','its','over','think',
  'also','back','after','use','two','how','our','work','first','well','way','even',
  'new','want','because','any','these','give','day','most','us','is','was','are',
  'been','has','had','may','did','said','each','made','who','more','my','such','am',
  'were','their','what','many','much','own','before','between','need','large','often',
]);

interface Token { text: string; color: string }

const TOKEN_COLORS = [
  'rgba(124,58,237,0.15)', 'rgba(16,185,129,0.15)', 'rgba(245,158,11,0.15)',
  'rgba(37,99,235,0.15)',  'rgba(239,68,68,0.15)',  'rgba(20,184,166,0.15)',
];

function tokenize(text: string, charsPerToken: number): Token[] {
  if (!text) return [];

  const tokens: Token[] = [];
  let colorIdx = 0;
  let i = 0;
  const len = text.length;

  while (i < len) {
    const ch = text[i];

    // Whitespace run
    if (/\s/.test(ch)) {
      let j = i;
      while (j < len && /\s/.test(text[j])) j++;
      tokens.push({ text: text.slice(i, j), color: 'transparent' });
      i = j;
      continue;
    }

    // Numeric run — each group of digits is roughly 1 token
    if (/\d/.test(ch)) {
      let j = i;
      while (j < len && /\d/.test(text[j])) j++;
      const numStr = text.slice(i, j);
      // Long numbers split into pairs of digits
      const chunkSize = 2;
      for (let k = 0; k < numStr.length; k += chunkSize) {
        tokens.push({ text: numStr.slice(k, k + chunkSize), color: TOKEN_COLORS[colorIdx++ % TOKEN_COLORS.length] });
      }
      i = j;
      continue;
    }

    // Punctuation — each character is typically 1 token
    if (/[^a-zA-Z0-9\s]/.test(ch)) {
      tokens.push({ text: ch, color: TOKEN_COLORS[colorIdx++ % TOKEN_COLORS.length] });
      i++;
      continue;
    }

    // Word
    let j = i;
    while (j < len && /[a-zA-Z]/.test(text[j])) j++;
    const word = text.slice(i, j);
    const lower = word.toLowerCase();

    if (COMMON_WORDS.has(lower) || word.length <= 4) {
      // Common short word → 1 token
      tokens.push({ text: word, color: TOKEN_COLORS[colorIdx++ % TOKEN_COLORS.length] });
    } else {
      // Split long/uncommon word at charsPerToken boundaries (approximate subword tokenization)
      const chunk = Math.max(3, Math.round(charsPerToken));
      for (let k = 0; k < word.length; k += chunk) {
        tokens.push({ text: word.slice(k, k + chunk), color: TOKEN_COLORS[colorIdx++ % TOKEN_COLORS.length] });
      }
    }

    i = j;
  }

  return tokens;
}

function countTokens(tokens: Token[]): number {
  return tokens.filter(t => t.color !== 'transparent').length;
}

function formatCost(dollars: number): string {
  if (dollars < 0.000001) return '<$0.000001';
  if (dollars < 0.01) return `$${dollars.toFixed(6)}`;
  if (dollars < 1) return `$${dollars.toFixed(4)}`;
  return `$${dollars.toFixed(2)}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function LlmTokenCounter() {
  const [text,      setText]      = useState('The quick brown fox jumps over the lazy dog. Large language models tokenize text differently depending on the model and vocabulary.');
  const [modelId,   setModelId]   = useState('gpt-4o');
  const [outTokens, setOutTokens] = useState(200);
  const [provider,  setProvider]  = useState('All');

  const model = MODELS.find(m => m.id === modelId) ?? MODELS[0];

  const filteredModels = provider === 'All' ? MODELS : MODELS.filter(m => m.provider === provider);

  const tokens = useMemo(() => tokenize(text, model.avgCharsPerToken), [text, model.avgCharsPerToken]);
  const inputTokens = useMemo(() => countTokens(tokens), [tokens]);

  const ctxPct = Math.min(100, (inputTokens / model.contextWindow) * 100);

  const inputCost  = (inputTokens  / 1_000_000) * model.inputPricePer1M;
  const outputCost = (outTokens    / 1_000_000) * model.outputPricePer1M;
  const totalCost  = inputCost + outputCost;

  return (
    <ToolShell>
      <div className="space-y-4">
        {/* Provider filter + Model selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Provider</label>
            <select
              value={provider}
              onChange={e => { setProvider(e.target.value); const first = MODELS.find(m => e.target.value === 'All' || m.provider === e.target.value); if (first) setModelId(first.id); }}
              className="w-full text-[13px] px-3 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#7C3AED]"
              style={{ color: 'var(--text)' }}
            >
              <option value="All">All Providers</option>
              {PROVIDERS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Model</label>
            <select
              value={modelId}
              onChange={e => setModelId(e.target.value)}
              className="w-full text-[13px] px-3 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#7C3AED]"
              style={{ color: 'var(--text)' }}
            >
              {filteredModels.map(m => (
                <option key={m.id} value={m.id}>{m.provider} — {m.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Input tokens',  value: inputTokens.toLocaleString(),   color: '#7C3AED' },
            { label: 'Context used',  value: `${ctxPct.toFixed(1)}%`,        color: ctxPct > 90 ? '#EF4444' : ctxPct > 70 ? '#F59E0B' : '#163863' },
            { label: 'Input cost',    value: formatCost(inputCost),           color: '#2563EB' },
            { label: 'Total cost',    value: formatCost(totalCost),           color: '#059669' },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] p-3 bg-[var(--bg-card)]">
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
              <p className="text-[20px] font-bold" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Context window bar */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] p-3 bg-[var(--bg-card)]">
          <div className="flex justify-between mb-1">
            <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
              Context window — {model.name}
            </span>
            <span className="text-[11px] font-mono" style={{ color: 'var(--text)' }}>
              {inputTokens.toLocaleString()} / {model.contextWindow.toLocaleString()} tokens
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[rgba(0,0,0,0.06)] dark:bg-[rgba(255,255,255,0.06)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${ctxPct}%`,
                background: ctxPct > 90 ? '#EF4444' : ctxPct > 70 ? '#F59E0B' : '#7C3AED',
              }}
            />
          </div>
        </div>

        {/* Text input with token highlighting */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Input Text</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{text.length} chars</span>
              {text && <button onClick={() => setText('')} className="text-[11px] px-2 py-1 rounded bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]">Clear</button>}
            </div>
          </div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste text to count tokens…"
            spellCheck={false}
            className="w-full resize-none font-mono text-[13px] p-4 bg-transparent outline-none"
            style={{ minHeight: 120, color: 'var(--text)', caretColor: 'var(--text)' }}
          />
        </div>

        {/* Token visualization */}
        {tokens.length > 0 && (
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>
                  Token Visualization — each color block = ~1 token
                </span>
              </div>
              <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>approx.</span>
            </div>
            <div className="p-4 font-mono text-[13px] leading-[2]" style={{ maxHeight: 260, overflowY: 'auto' }}>
              {tokens.map((tok, i) => (
                tok.color === 'transparent' ? (
                  <span key={i}>{tok.text}</span>
                ) : (
                  <span
                    key={i}
                    className="rounded px-px"
                    style={{ background: tok.color, color: 'var(--text)' }}
                    title={`Token ~${i + 1}: "${tok.text}"`}
                  >
                    {tok.text}
                  </span>
                )
              ))}
            </div>
          </div>
        )}

        {/* Output tokens + cost breakdown */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <span className="w-2 h-2 rounded-full bg-[#163863]" />
            <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Cost Breakdown</span>
          </div>
          <div className="p-4 space-y-3">
            {/* Output tokens slider */}
            <div className="flex items-center gap-4">
              <label className="text-[11px] font-medium whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                Output tokens: <code className="text-[#7C3AED] font-mono">{outTokens.toLocaleString()}</code>
              </label>
              <input type="range" min={0} max={8000} step={50} value={outTokens}
                onChange={e => setOutTokens(parseInt(e.target.value))}
                className="flex-1 accent-[#7C3AED]" />
            </div>

            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                  {['', 'Tokens', 'Rate (per 1M)', 'Cost'].map(h => (
                    <th key={h} className="px-3 py-2 text-left font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)]">
                  <td className="px-3 py-2 text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Input</td>
                  <td className="px-3 py-2 font-mono" style={{ color: 'var(--text)' }}>{inputTokens.toLocaleString()}</td>
                  <td className="px-3 py-2 font-mono" style={{ color: 'var(--text)' }}>${model.inputPricePer1M.toFixed(2)}</td>
                  <td className="px-3 py-2 font-mono text-[#2563EB]">{formatCost(inputCost)}</td>
                </tr>
                <tr className="border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)]">
                  <td className="px-3 py-2 text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Output</td>
                  <td className="px-3 py-2 font-mono" style={{ color: 'var(--text)' }}>{outTokens.toLocaleString()}</td>
                  <td className="px-3 py-2 font-mono" style={{ color: 'var(--text)' }}>${model.outputPricePer1M.toFixed(2)}</td>
                  <td className="px-3 py-2 font-mono text-[#7C3AED]">{formatCost(outputCost)}</td>
                </tr>
                <tr className="border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] font-bold">
                  <td className="px-3 py-2 text-[11px] font-semibold" style={{ color: 'var(--text)' }}>Total</td>
                  <td className="px-3 py-2 font-mono" style={{ color: 'var(--text)' }}>{(inputTokens + outTokens).toLocaleString()}</td>
                  <td className="px-3 py-2" />
                  <td className="px-3 py-2 font-mono text-[#163863]">{formatCost(totalCost)}</td>
                </tr>
              </tbody>
            </table>
            <p className="text-[10px]" style={{ color: 'var(--text-subtle)' }}>
              Token counts are approximations using a BPE heuristic. For exact counts use the official tokenizer for each model. Prices as of Q2 2025 — verify at provider pricing pages.
            </p>
          </div>
        </div>
      
      <div className="mt-8 bg-card border border-base p-6 rounded-xl space-y-4">
        <h3 className="text-[15px] font-semibold text-[color:var(--text)]">🔒 Privacy & Safe Usage</h3>
        <p className="text-[13px] text-[color:var(--text-muted)]">
          <strong>100% Private:</strong> This tool runs entirely in your browser. No data, inputs, or files are sent to our servers or saved anywhere.
        </p>
        <p className="text-[12px] text-[color:var(--text-muted)] opacity-80 border-t border-base pt-4">
          <strong>Disclaimer:</strong> This tool is provided for informational and productivity purposes only. Please verify important results independently.
        </p>
      </div>
    </div>
    </ToolShell>
  );
}
