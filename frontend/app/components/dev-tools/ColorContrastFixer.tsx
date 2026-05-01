'use client';
import React, { useState } from 'react';
import { Eye } from 'lucide-react';

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '').trim();
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  return [r, g, b].reduce((acc, v, i) => {
    const s = v / 255;
    const c = s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    return acc + c * [0.2126, 0.7152, 0.0722][i];
  }, 0);
}

function contrastRatio(fg: string, bg: string): number {
  try {
    const l1 = relativeLuminance(hexToRgb(fg));
    const l2 = relativeLuminance(hexToRgb(bg));
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  } catch { return 1; }
}

export default function ColorContrastFixer() {
  const [fg, setFg] = useState('#1a1a2e');
  const [bg, setBg] = useState('#ffffff');
  const ratio = contrastRatio(fg, bg);
  const aa = ratio >= 4.5, aaa = ratio >= 7, aaLarge = ratio >= 3;

  const badge = (pass: boolean) =>
    `px-3 py-1 rounded text-[12px] font-bold border ${pass ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'}`;

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <Eye className="w-5 h-5 text-blue-500" /> Color Contrast Checker (WCAG)
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Check WCAG 2.1 AA/AAA accessibility contrast between any two colors in real-time.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[{ label: 'Text / Foreground Color', val: fg, set: setFg }, { label: 'Background Color', val: bg, set: setBg }].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1.5">{label}</label>
              <div className="flex items-center gap-3">
                <input type="color" value={val} onChange={e => set(e.target.value)}
                  className="w-10 h-10 rounded border border-base cursor-pointer bg-page" />
                <input type="text" value={val} onChange={e => set(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-base bg-page text-[14px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-base p-6 rounded-xl space-y-6">
        <div className="rounded-xl border border-base overflow-hidden" style={{ backgroundColor: bg }}>
          <div className="p-8 text-center space-y-3">
            <p className="text-3xl font-bold" style={{ color: fg }}>The quick brown fox</p>
            <p className="text-base" style={{ color: fg }}>Normal body text — 16px weight 400</p>
            <p className="text-sm" style={{ color: fg }}>Small text at 14px — needs 4.5:1 contrast</p>
            <p className="text-xl font-bold" style={{ color: fg }}>Large text 20px bold — needs 3:1 contrast</p>
          </div>
        </div>

        <div className="text-center">
          <div className="text-5xl font-bold text-[color:var(--text)]">{ratio.toFixed(2)}:1</div>
          <div className="text-[13px] text-[color:var(--text-muted)] mt-1">Contrast Ratio</div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'AA Normal (4.5:1)', pass: aa },
            { label: 'AAA Normal (7:1)', pass: aaa },
            { label: 'AA Large (3:1)', pass: aaLarge },
          ].map(({ label, pass }) => (
            <div key={label}>
              <span className={badge(pass)}>{pass ? 'PASS' : 'FAIL'}</span>
              <p className="text-[11px] text-[color:var(--text-muted)] mt-2">{label}</p>
            </div>
          ))}
        </div>

        {!aa && (
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg text-[13px] text-amber-700 dark:text-amber-400">
            <strong>Fix:</strong> Darken the text color or lighten the background. For dark themes, try a lighter text like #e2e8f0 on dark backgrounds.
          </div>
        )}
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
  );
}
