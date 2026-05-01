'use client';

import { useState, useMemo } from 'react';
import { ToolShell } from './SplitEditorPane';

// ── Analysis logic ────────────────────────────────────────────────────────────

interface Stats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTime: string;
  speakingTime: string;
  uniqueWords: number;
  avgWordLength: number;
  longestWord: string;
}

const READING_WPM  = 238;
const SPEAKING_WPM = 130;

function formatTime(minutes: number): string {
  if (minutes < 1) return '< 1 min';
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h === 0) return `${m} min`;
  return `${h}h ${m}m`;
}

function analyze(text: string): Stats {
  const characters         = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const wordMatches        = text.match(/\b\w+\b/g) ?? [];
  const words              = wordMatches.length;
  const sentences          = (text.match(/[.!?]+/g) ?? []).length;
  const paragraphs         = text.split(/\n{2,}/).filter(p => p.trim().length > 0).length || (text.trim() ? 1 : 0);
  const lines              = text === '' ? 0 : text.split('\n').length;
  const uniqueWords        = new Set(wordMatches.map(w => w.toLowerCase())).size;
  const avgWordLength      = words > 0 ? Math.round((wordMatches.join('').length / words) * 10) / 10 : 0;
  const longestWord        = wordMatches.reduce((a, b) => b.length > a.length ? b : a, '');
  const readingTime        = formatTime(words / READING_WPM);
  const speakingTime       = formatTime(words / SPEAKING_WPM);

  return { characters, charactersNoSpaces, words, sentences, paragraphs, lines, readingTime, speakingTime, uniqueWords, avgWordLength, longestWord };
}

// ── Frequency analysis ────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  'a','an','the','and','or','but','in','on','at','to','for','of','with','by',
  'is','are','was','were','be','been','being','have','has','had','do','does',
  'did','will','would','could','should','may','might','shall','can','need',
  'from','as','this','that','these','those','it','its','i','you','he','she',
  'we','they','my','your','his','her','our','their','me','him','us','them',
  'not','no','nor','so','yet','both','either','neither','whether','though',
  'although','while','because','since','if','unless','until','when','where',
  'who','which','what','how','why',
]);

function topWords(text: string, n = 10): Array<{ word: string; count: number }> {
  const freq: Record<string, number> = {};
  const matches = text.match(/\b[a-zA-Z]{3,}\b/g) ?? [];
  for (const w of matches) {
    const lower = w.toLowerCase();
    if (!STOP_WORDS.has(lower)) freq[lower] = (freq[lower] ?? 0) + 1;
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([word, count]) => ({ word, count }));
}

// ── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div
      className="rounded-lg px-4 py-3 space-y-0.5"
      style={{ background: 'var(--surface)', border: '1px solid rgba(0,0,0,0.06)' }}
    >
      <div className="text-[22px] font-bold font-mono" style={{ color: '#7C3AED' }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>{label}</div>
      {sub && <div className="text-[10px]" style={{ color: 'var(--text-subtle)' }}>{sub}</div>}
    </div>
  );
}

export default function WordCounter() {
  const [text, setText] = useState('');
  const [showFreq, setShowFreq] = useState(false);

  const stats  = useMemo(() => analyze(text), [text]);
  const freqList = useMemo(() => showFreq ? topWords(text) : [], [text, showFreq]);

  const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';
  const maxCount = freqList[0]?.count ?? 1;

  return (
    <ToolShell>
      <div className="space-y-4">
        {/* Input */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Your Text</span>
            </div>
            {text && (
              <button onClick={() => setText('')} className={iconBtn}>Clear</button>
            )}
          </div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste or type your text here — statistics update in real time…"
            className="w-full resize-none font-sans text-[13px] leading-[1.7] p-4 bg-transparent outline-none"
            style={{ minHeight: 160, color: 'var(--text)', caretColor: 'var(--text)' }}
          />
        </div>

        {/* Primary stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <StatCard label="Words"          value={stats.words} />
          <StatCard label="Characters"     value={stats.characters} sub={`${stats.charactersNoSpaces.toLocaleString()} without spaces`} />
          <StatCard label="Sentences"      value={stats.sentences} />
          <StatCard label="Paragraphs"     value={stats.paragraphs} />
        </div>

        {/* Secondary stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <StatCard label="Lines"          value={stats.lines} />
          <StatCard label="Unique words"   value={stats.uniqueWords} />
          <StatCard label="Reading time"   value={stats.readingTime} sub={`at ${READING_WPM} wpm`} />
          <StatCard label="Speaking time"  value={stats.speakingTime} sub={`at ${SPEAKING_WPM} wpm`} />
        </div>

        {/* Word info row */}
        {text.trim() && (
          <div className="grid grid-cols-2 gap-2">
            <StatCard label="Avg word length" value={`${stats.avgWordLength} chars`} />
            <StatCard label="Longest word"    value={stats.longestWord || '—'} sub={stats.longestWord ? `${stats.longestWord.length} chars` : ''} />
          </div>
        )}

        {/* Word frequency toggle */}
        {text.trim() && (
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#163863]" />
                <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Top words</span>
                <span className="text-[10px]" style={{ color: 'var(--text-subtle)' }}>stop words excluded</span>
              </div>
              <button onClick={() => setShowFreq(f => !f)} className={iconBtn}>
                {showFreq ? 'Hide' : 'Show'}
              </button>
            </div>
            {showFreq && freqList.length > 0 && (
              <div className="p-3 space-y-1.5">
                {freqList.map(({ word, count }) => (
                  <div key={word} className="flex items-center gap-3">
                    <span className="text-[12px] font-mono w-32 flex-shrink-0" style={{ color: 'var(--text)' }}>{word}</span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(count / maxCount) * 100}%`, background: '#7C3AED' }}
                      />
                    </div>
                    <span className="text-[11px] font-mono w-8 text-right" style={{ color: 'var(--text-muted)' }}>{count}</span>
                  </div>
                ))}
              </div>
            )}
            {showFreq && freqList.length === 0 && (
              <p className="p-4 text-[12px]" style={{ color: 'var(--text-subtle)' }}>
                No significant words found yet.
              </p>
            )}
          </div>
        )}
      
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
