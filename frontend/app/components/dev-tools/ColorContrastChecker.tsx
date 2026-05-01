'use client';

import { useState, useMemo } from 'react';
import { Check, X } from 'lucide-react';
import { ToolShell, CopyButton } from './SplitEditorPane';

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  return [parseInt(full.slice(0,2),16), parseInt(full.slice(2,4),16), parseInt(full.slice(4,6),16)];
}

function linearize(c: number) { const s = c/255; return s<=0.04045 ? s/12.92 : Math.pow((s+0.055)/1.055, 2.4); }

function luminance(hex: string): number {
  const [r,g,b] = hexToRgb(hex);
  return 0.2126*linearize(r) + 0.7152*linearize(g) + 0.0722*linearize(b);
}

function contrastRatio(fg: string, bg: string): number {
  const l1 = luminance(fg), l2 = luminance(bg);
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

function contrastColor(hex: string): string {
  const [r,g,b] = hexToRgb(hex);
  return 0.299*r + 0.587*g + 0.114*b > 140 ? '#000000' : '#ffffff';
}

// Adjust luminance towards target to hit a contrast ratio threshold
function nearestPassing(fg: string, bg: string, threshold: number): string {
  const bgL = luminance(bg);
  // Try darkening and lightening the fg color
  const [r,g,b] = hexToRgb(fg);
  for (let step = 1; step <= 255; step++) {
    for (const dir of [1, -1]) {
      const nr = Math.max(0, Math.min(255, r - step * dir));
      const ng = Math.max(0, Math.min(255, g - step * dir));
      const nb = Math.max(0, Math.min(255, b - step * dir));
      const candidate = '#' + [nr, ng, nb].map(c => c.toString(16).padStart(2,'0')).join('');
      if (contrastRatio(candidate, bg) >= threshold) return candidate;
    }
  }
  return fg;
}

interface Level { label: string; threshold: number; description: string }

const LEVELS: Level[] = [
  { label: 'AA Normal text',  threshold: 4.5, description: 'WCAG 2.1 AA — body text, links' },
  { label: 'AA Large text',   threshold: 3.0, description: 'WCAG 2.1 AA — 18pt+ or bold 14pt+' },
  { label: 'AAA Normal text', threshold: 7.0, description: 'WCAG 2.1 AAA — enhanced contrast' },
  { label: 'AAA Large text',  threshold: 4.5, description: 'WCAG 2.1 AAA — large text enhanced' },
  { label: 'UI Components',   threshold: 3.0, description: 'WCAG 2.1 — icons, inputs, focus rings' },
];

export default function ColorContrastChecker() {
  const [fg, setFg] = useState('#1a1a2e');
  const [bg, setBg] = useState('#e0f2fe');
  const [fgText, setFgText] = useState('#1a1a2e');
  const [bgText, setBgText] = useState('#e0f2fe');

  const handleFg = (v: string) => { setFgText(v); if (/^#[0-9a-fA-F]{6}$/.test(v)) setFg(v); };
  const handleBg = (v: string) => { setBgText(v); if (/^#[0-9a-fA-F]{6}$/.test(v)) setBg(v); };

  const ratio   = useMemo(() => contrastRatio(fg, bg), [fg, bg]);
  const nearest = useMemo(() => {
    const failing = LEVELS.find(l => ratio < l.threshold);
    return failing ? nearestPassing(fg, bg, failing.threshold) : null;
  }, [fg, bg, ratio]);

  const inputClass = 'text-[13px] font-mono px-2.5 py-1.5 rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#7C3AED] transition-colors';

  return (
    <ToolShell>
      <div className="space-y-5">
        {/* Color pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Foreground', hex: fg, textVal: fgText, setHex: setFg, setTextVal: setFgText, onChange: handleFg },
            { label: 'Background', hex: bg, textVal: bgText, setHex: setBg, setTextVal: setBgText, onChange: handleBg },
          ].map(({ label, hex, textVal, setHex, onChange }) => (
            <div key={label} className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
              <div className="px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>{label}</span>
              </div>
              <div className="p-3 flex items-center gap-3">
                <input type="color" value={hex} onChange={e => { setHex(e.target.value); onChange(e.target.value); }}
                  className="w-12 h-12 rounded-xl border border-[rgba(0,0,0,0.1)] cursor-pointer p-0.5 flex-shrink-0" />
                <input type="text" value={textVal} onChange={e => onChange(e.target.value)}
                  maxLength={7} placeholder="#000000"
                  className={`flex-1 ${inputClass}`} style={{ color: 'var(--text)' }} />
                <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ background: hex, border: '1px solid rgba(0,0,0,0.1)' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Ratio + preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Ratio badge */}
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Contrast Ratio</span>
            </div>
            <div className="px-4 py-4 flex items-center gap-3">
              <span className="text-[36px] font-bold font-mono" style={{ color: ratio >= 4.5 ? '#163863' : ratio >= 3 ? '#F59E0B' : '#EF4444' }}>
                {ratio.toFixed(2)}
              </span>
              <span className="text-[18px] font-semibold" style={{ color: 'var(--text-muted)' }}>:1</span>
            </div>
          </div>

          {/* Live preview */}
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Preview</span>
            </div>
            <div className="px-4 py-4 rounded-b-xl" style={{ background: bg }}>
              <p className="text-[16px] font-bold mb-1" style={{ color: fg }}>The quick brown fox</p>
              <p className="text-[13px]" style={{ color: fg }}>Normal text sample for WCAG testing</p>
              <p className="text-[11px] mt-1 opacity-80" style={{ color: fg }}>Small text, 11px</p>
            </div>
          </div>
        </div>

        {/* WCAG levels */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
            <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>WCAG 2.1 Results</span>
          </div>
          <div className="divide-y divide-[rgba(0,0,0,0.04)] dark:divide-[rgba(255,255,255,0.04)]">
            {LEVELS.map(({ label, threshold, description }) => {
              const pass = ratio >= threshold;
              return (
                <div key={label} className="flex items-center gap-3 px-4 py-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${pass ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                    {pass
                      ? <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                      : <X className="w-3.5 h-3.5 text-red-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold" style={{ color: 'var(--text)' }}>{label}</p>
                    <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{description} — requires {threshold}:1</p>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${pass ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                    {pass ? 'PASS' : 'FAIL'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Suggestion */}
        {nearest && nearest !== fg && (
          <div className="rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ background: nearest }} />
            <div className="flex-1">
              <p className="text-[12px] font-semibold text-amber-800 dark:text-amber-300">Nearest passing foreground</p>
              <code className="text-[12px] font-mono text-amber-700 dark:text-amber-400">{nearest}</code>
              <span className="text-[11px] text-amber-600 dark:text-amber-500 ml-2">— contrast {contrastRatio(nearest, bg).toFixed(2)}:1</span>
            </div>
            <div className="flex gap-1">
              <CopyButton text={nearest} />
              <button onClick={() => { setFg(nearest); setFgText(nearest); }}
                className="text-[11px] font-medium px-2.5 py-1 rounded bg-amber-200 dark:bg-amber-800/50 text-amber-800 dark:text-amber-300 hover:bg-amber-300 transition-colors">
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}
