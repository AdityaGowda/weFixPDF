'use client';

import { useState, useMemo } from 'react';
import { ToolShell, CopyButton } from './SplitEditorPane';

const SAMPLE_PATTERN = '(\\w+\\.)+\\w{2,}';
const SAMPLE_FLAGS   = { g: true, i: true, m: false, s: false };
const SAMPLE_TEXT    = `Visit https://example.com or http://sub.domain.org for info.
Email us at hello@example.com`;

interface Token { raw: string; desc: string }

const CHAR_MAP: Record<string, string> = {
  '^': 'Start of string/line',
  '$': 'End of string/line',
  '.': 'Any character (except newline)',
  '*': 'Zero or more (greedy)',
  '+': 'One or more (greedy)',
  '?': 'Zero or one — optional',
  '|': 'Alternation (OR)',
};
const ESC_MAP: Record<string, string> = {
  d: 'Any digit [0-9]', D: 'Any non-digit', w: 'Word char [a-zA-Z0-9_]', W: 'Non-word char',
  s: 'Whitespace',       S: 'Non-whitespace', b: 'Word boundary', B: 'Non-word boundary',
  n: 'Newline',          t: 'Tab',            r: 'Carriage return', '0': 'Null character',
};

function explainRegex(pattern: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < pattern.length) {
    const ch = pattern[i];

    if (ch === '\\' && i + 1 < pattern.length) {
      const next = pattern[i + 1];
      tokens.push({ raw: `\\${next}`, desc: ESC_MAP[next] ?? `Escaped literal "${next}"` });
      i += 2; continue;
    }
    if (ch === '[') {
      let j = i + 1;
      const neg = pattern[j] === '^';
      if (neg) j++;
      while (j < pattern.length && pattern[j] !== ']') { if (pattern[j] === '\\') j++; j++; }
      const cls = pattern.slice(i, j + 1);
      tokens.push({ raw: cls, desc: `Character class${neg ? ' (negated)' : ''}: ${cls}` });
      i = j + 1; continue;
    }
    if (ch === '(' ) {
      if (pattern.slice(i, i + 4) === '(?<=') { tokens.push({ raw: '(?<=', desc: 'Positive lookbehind — asserts what precedes' }); i += 4; }
      else if (pattern.slice(i, i + 4) === '(?<!') { tokens.push({ raw: '(?<!', desc: 'Negative lookbehind' }); i += 4; }
      else if (pattern.slice(i, i + 3) === '(?=') { tokens.push({ raw: '(?=', desc: 'Positive lookahead — asserts what follows' }); i += 3; }
      else if (pattern.slice(i, i + 3) === '(?!') { tokens.push({ raw: '(?!', desc: 'Negative lookahead' }); i += 3; }
      else if (pattern.slice(i, i + 3) === '(?:') { tokens.push({ raw: '(?:', desc: 'Non-capturing group — groups without capturing' }); i += 3; }
      else { tokens.push({ raw: '(', desc: 'Capturing group — captures the match' }); i++; }
      continue;
    }
    if (ch === ')') { tokens.push({ raw: ')', desc: 'End of group' }); i++; continue; }
    if (ch === '{') {
      let j = i + 1; while (j < pattern.length && pattern[j] !== '}') j++;
      const quant = pattern.slice(i, j + 1);
      const [mn, mx] = quant.slice(1, -1).split(',').map(s => s.trim());
      const desc = mx === undefined ? `Exactly ${mn} times` : mx === '' ? `At least ${mn} times` : `Between ${mn} and ${mx} times`;
      tokens.push({ raw: quant, desc }); i = j + 1; continue;
    }
    tokens.push({ raw: ch, desc: CHAR_MAP[ch] ?? `Literal character "${ch}"` });
    i++;
  }
  return tokens;
}

interface Match { index: number; match: string; groups: string[] }

function runRegex(pattern: string, flags: Record<string,boolean>, text: string): { matches: Match[]; error: string | null } {
  const flagStr = Object.entries(flags).filter(([,v]) => v).map(([k]) => k).join('');
  try {
    const re = new RegExp(pattern, flagStr);
    const matches: Match[] = [];
    if (flags.g) {
      let m: RegExpExecArray | null;
      while ((m = re.exec(text)) !== null) {
        matches.push({ index: m.index, match: m[0], groups: m.slice(1) });
        if (!flags.g) break;
      }
    } else {
      const m = re.exec(text);
      if (m) matches.push({ index: m.index, match: m[0], groups: m.slice(1) });
    }
    return { matches, error: null };
  } catch (e: any) {
    return { matches: [], error: (e as Error).message };
  }
}

function Highlighted({ text, matches }: { text: string; matches: Match[] }) {
  if (!matches.length) return <span style={{ color: 'var(--text)' }}>{text}</span>;
  const ranges = matches.map(m => [m.index, m.index + m.match.length] as [number, number]);
  const parts: { str: string; hit: boolean }[] = [];
  let last = 0;
  for (const [s, e] of ranges) {
    if (s > last) parts.push({ str: text.slice(last, s), hit: false });
    parts.push({ str: text.slice(s, e), hit: true });
    last = e;
  }
  if (last < text.length) parts.push({ str: text.slice(last), hit: false });
  return (
    <>
      {parts.map((p, i) =>
        p.hit
          ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-600/40 text-inherit rounded-sm px-0.5">{p.str}</mark>
          : <span key={i} style={{ color: 'var(--text)' }}>{p.str}</span>
      )}
    </>
  );
}

export default function RegexTester() {
  const [pattern, setPattern] = useState(SAMPLE_PATTERN);
  const [flags,   setFlags]   = useState(SAMPLE_FLAGS);
  const [text,    setText]    = useState(SAMPLE_TEXT);

  const { matches, error } = useMemo(() => runRegex(pattern, flags, text), [pattern, flags, text]);
  const tokens = useMemo(() => { try { return explainRegex(pattern); } catch { return []; } }, [pattern]);

  const toggleFlag = (f: string) => setFlags(p => ({ ...p, [f]: !p[f as keyof typeof p] }));

  const inputClass = 'text-[13px] font-mono px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#7C3AED] transition-colors';

  return (
    <ToolShell>
      <div className="space-y-4">
        {/* Pattern + flags */}
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-0">
            <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Pattern</label>
            <input type="text" value={pattern} onChange={e => setPattern(e.target.value)} spellCheck={false}
              placeholder="Enter regex pattern…"
              className={`w-full ${inputClass}`} style={{ color: error ? '#ef4444' : 'var(--text)' }} />
          </div>
          <div>
            <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Flags</label>
            <div className="flex gap-1">
              {Object.keys(flags).map(f => (
                <button key={f} onClick={() => toggleFlag(f)}
                  className={`w-8 h-8 rounded-lg text-[12px] font-mono font-bold border transition-colors ${flags[f as keyof typeof flags] ? 'bg-[#7C3AED] text-white border-transparent' : 'border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[var(--text-muted)]'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && <p className="text-[12px] text-red-500 px-1">{error}</p>}

        {/* Test string with highlights */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Test String</span>
            </div>
            <span className="text-[11px] font-medium" style={{ color: matches.length ? '#163863' : 'var(--text-muted)' }}>
              {matches.length} match{matches.length !== 1 ? 'es' : ''}
            </span>
          </div>
          <div className="relative">
            <textarea value={text} onChange={e => setText(e.target.value)} spellCheck={false}
              className="w-full resize-none font-mono text-[13px] p-4 bg-transparent outline-none opacity-0 absolute inset-0 z-10"
              style={{ minHeight: 160, color: 'transparent', caretColor: 'var(--text)' }} />
            <pre className="w-full font-mono text-[13px] p-4 leading-[1.6] whitespace-pre-wrap break-words pointer-events-none"
              style={{ minHeight: 160, color: 'var(--text)' }}>
              {text ? <Highlighted text={text} matches={matches} /> : <span style={{ color: 'var(--text-subtle)' }}>Test string appears here…</span>}
            </pre>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Match table */}
          {matches.length > 0 && (
            <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                <span className="w-2 h-2 rounded-full bg-[#163863]" />
                <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Matches</span>
              </div>
              <div className="overflow-auto" style={{ maxHeight: 220 }}>
                <table className="w-full text-[11px]">
                  <thead><tr className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                    {['#', 'Index', 'Match', 'Groups'].map(h => <th key={h} className="px-3 py-2 text-left font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>)}
                  </tr></thead>
                  <tbody>{matches.map((m, i) => (
                    <tr key={i} className="border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)]">
                      <td className="px-3 py-2 font-bold" style={{ color: '#7C3AED' }}>{i + 1}</td>
                      <td className="px-3 py-2 font-mono" style={{ color: 'var(--text-muted)' }}>{m.index}</td>
                      <td className="px-3 py-2"><code className="font-mono bg-yellow-100 dark:bg-yellow-600/20 px-1 rounded" style={{ color: 'var(--text)' }}>{m.match}</code></td>
                      <td className="px-3 py-2 font-mono" style={{ color: 'var(--text-muted)' }}>{m.groups.length ? m.groups.join(', ') : '—'}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}

          {/* Explainer */}
          {tokens.length > 0 && (
            <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Pattern breakdown</span>
              </div>
              <div className="overflow-auto" style={{ maxHeight: 220 }}>
                <table className="w-full text-[11px]">
                  <tbody>{tokens.map((t, i) => (
                    <tr key={i} className="border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] first:border-0">
                      <td className="px-3 py-2 w-20"><code className="font-mono font-bold text-[12px]" style={{ color: '#7C3AED' }}>{t.raw}</code></td>
                      <td className="px-3 py-2" style={{ color: 'var(--text-muted)' }}>{t.desc}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
