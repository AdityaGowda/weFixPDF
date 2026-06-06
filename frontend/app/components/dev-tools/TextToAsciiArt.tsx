'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ToolShell, CopyButton } from './SplitEditorPane';

// prettier-ignore
const FONT5X7: Record<string, number[]> = {
  ' ': [0,0,0,0,0,0,0],
  '!': [4,4,4,4,0,0,4],
  '"': [10,10,10,0,0,0,0],
  '#': [10,10,31,10,31,10,10],
  '$': [4,14,20,14,5,14,4],
  '%': [24,25,2,4,8,19,3],
  '&': [4,10,10,4,21,18,13],
  "'": [4,4,8,0,0,0,0],
  '(': [2,4,8,8,8,4,2],
  ')': [8,4,2,2,2,4,8],
  '*': [0,4,21,14,21,4,0],
  '+': [0,4,4,31,4,4,0],
  ',': [0,0,0,0,4,4,8],
  '-': [0,0,0,31,0,0,0],
  '.': [0,0,0,0,0,0,4],
  '/': [1,1,2,4,8,16,16],
  '0': [14,17,19,21,25,17,14],
  '1': [4,12,4,4,4,4,14],
  '2': [14,17,1,2,4,8,31],
  '3': [31,2,4,2,1,17,14],
  '4': [2,6,10,18,31,2,2],
  '5': [31,16,30,1,1,17,14],
  '6': [6,8,16,30,17,17,14],
  '7': [31,1,2,4,8,8,8],
  '8': [14,17,17,14,17,17,14],
  '9': [14,17,17,15,1,2,12],
  ':': [0,0,4,0,4,0,0],
  ';': [0,0,4,0,4,4,8],
  '<': [2,4,8,16,8,4,2],
  '=': [0,0,31,0,31,0,0],
  '>': [16,8,4,2,4,8,16],
  '?': [14,17,1,2,4,0,4],
  '@': [14,17,1,13,21,21,14],
  'A': [14,17,17,31,17,17,17],
  'B': [30,17,17,30,17,17,30],
  'C': [14,17,16,16,16,17,14],
  'D': [30,17,17,17,17,17,30],
  'E': [31,16,16,30,16,16,31],
  'F': [31,16,16,30,16,16,16],
  'G': [14,17,16,23,17,17,14],
  'H': [17,17,17,31,17,17,17],
  'I': [14,4,4,4,4,4,14],
  'J': [7,2,2,2,2,18,12],
  'K': [17,18,20,24,20,18,17],
  'L': [16,16,16,16,16,16,31],
  'M': [17,27,21,21,17,17,17],
  'N': [17,25,25,21,19,19,17],
  'O': [14,17,17,17,17,17,14],
  'P': [30,17,17,30,16,16,16],
  'Q': [14,17,17,17,21,18,13],
  'R': [30,17,17,30,20,18,17],
  'S': [14,17,16,14,1,17,14],
  'T': [31,4,4,4,4,4,4],
  'U': [17,17,17,17,17,17,14],
  'V': [17,17,17,17,17,10,4],
  'W': [17,17,17,21,21,21,10],
  'X': [17,17,10,4,10,17,17],
  'Y': [17,17,10,4,4,4,4],
  'Z': [31,1,2,4,8,16,31],
  '[': [14,8,8,8,8,8,14],
  '\\': [16,16,8,4,2,1,1],
  ']': [14,2,2,2,2,2,14],
  '^': [4,10,17,0,0,0,0],
  '_': [0,0,0,0,0,0,31],
  '`': [8,4,2,0,0,0,0],
  'a': [0,0,14,1,15,17,15],
  'b': [16,16,30,17,17,17,30],
  'c': [0,0,14,16,16,17,14],
  'd': [1,1,15,17,17,17,15],
  'e': [0,0,14,17,31,16,14],
  'f': [6,8,8,28,8,8,8],
  'g': [0,0,15,17,17,15,1,14],
  'h': [16,16,30,17,17,17,17],
  'i': [4,0,12,4,4,4,14],
  'j': [2,0,6,2,2,18,12],
  'k': [16,16,18,20,24,20,18],
  'l': [12,4,4,4,4,4,14],
  'm': [0,0,26,21,21,17,17],
  'n': [0,0,30,17,17,17,17],
  'o': [0,0,14,17,17,17,14],
  'p': [0,0,30,17,17,30,16,16],
  'q': [0,0,15,17,17,15,1,1],
  'r': [0,0,22,24,16,16,16],
  's': [0,0,14,16,14,1,30],
  't': [8,8,28,8,8,9,6],
  'u': [0,0,17,17,17,17,14],
  'v': [0,0,17,17,17,10,4],
  'w': [0,0,17,17,21,21,10],
  'x': [0,0,17,10,4,10,17],
  'y': [0,0,17,17,15,1,14],
  'z': [0,0,31,2,4,8,31],
  '{': [6,8,8,24,8,8,6],
  '|': [4,4,4,4,4,4,4],
  '}': [12,2,2,3,2,2,12],
  '~': [0,8,17,1,0,0,0],
};

const STYLES: Record<string, { fill: string; empty: string; name: string }> = {
  block:    { fill: '█', empty: ' ', name: 'Block (█)' },
  hash:     { fill: '#', empty: ' ', name: 'Hash (#)' },
  at:       { fill: '@', empty: ' ', name: 'At (@)' },
  star:     { fill: '*', empty: ' ', name: 'Star (*)' },
  dot:      { fill: '.', empty: ' ', name: 'Dot (.)' },
  equals:   { fill: '=', empty: ' ', name: 'Equals (=)' },
  dollar:   { fill: '$', empty: ' ', name: 'Dollar ($)' },
  shade:    { fill: '▓', empty: '░', name: 'Shade (▓░)' },
  lines:    { fill: '|', empty: ' ', name: 'Pipes (|)' },
  slash:    { fill: '/', empty: ' ', name: 'Slash (/)' },
  zero:     { fill: '0', empty: ' ', name: 'Zeros (0)' },
  mixed:    { fill: '%', empty: ' ', name: 'Percent (%)' },
};

const SCALES = [1, 2, 3];

function renderText(
  text: string,
  styleName: string,
  scale: number,
  spacing: number,
  boxed: boolean,
  invert: boolean,
): string {
  const style = STYLES[styleName] ?? STYLES.block;
  const fillChar  = invert ? style.empty || ' ' : style.fill;
  const emptyChar = invert ? style.fill : (style.empty || ' ');

  const chars = text.toUpperCase().split('');
  const HEIGHT = 7;

  const charBitmaps: number[][] = chars.map(ch => {
    const rows = FONT5X7[ch] ?? FONT5X7['?'] ?? Array(HEIGHT).fill(0);
    return rows.slice(0, HEIGHT);
  });

  const lines: string[] = [];
  for (let row = 0; row < HEIGHT; row++) {
    let line = '';
    for (let ci = 0; ci < charBitmaps.length; ci++) {
      if (ci > 0) line += emptyChar.repeat(spacing);
      const rowBits = charBitmaps[ci][row] ?? 0;
      for (let col = 4; col >= 0; col--) {
        const pixel = (rowBits >> col) & 1;
        const ch = pixel ? fillChar : emptyChar;
        line += ch.repeat(scale);
      }
    }
    for (let s = 0; s < scale; s++) lines.push(line);
  }

  if (boxed) {
    const w = lines[0]?.length ?? 0;
    const border = '+' + '-'.repeat(w + 2) + '+';
    const boxedLines = [border, ...lines.map(l => `| ${l} |`), border];
    return boxedLines.join('\n');
  }

  return lines.join('\n');
}

const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';

export default function TextToAsciiArt() {
  const [text,    setText]    = useState('HELLO');
  const [style,   setStyle]   = useState('block');
  const [scale,   setScale]   = useState(1);
  const [spacing, setSpacing] = useState(1);
  const [boxed,   setBoxed]   = useState(false);
  const [invert,  setInvert]  = useState(false);

  const output = renderText(text, style, scale, spacing, boxed, invert);

  return (
    <ToolShell>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
          <div>
            <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Text</label>
            <input
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              maxLength={20}
              placeholder="Type here…"
              className="w-full text-[15px] font-mono px-3 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#7C3AED] transition-colors"
              style={{ color: 'var(--text)' }}
            />
            <p className="text-[10px] mt-1" style={{ color: 'var(--text-subtle)' }}>{text.length}/20 chars · uppercase rendered</p>
          </div>

          <div>
            <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>ASCII Style</label>
            <select
              value={style}
              onChange={e => setStyle(e.target.value)}
              className="w-full text-[13px] px-3 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#7C3AED] transition-colors"
              style={{ color: 'var(--text)' }}
            >
              {Object.entries(STYLES).map(([k, v]) => (
                <option key={k} value={k}>{v.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Size</span>
            <div className="flex gap-1">
              {SCALES.map(s => (
                <button key={s} onClick={() => setScale(s)}
                  className={`text-[11px] font-medium w-7 h-7 rounded-lg transition-colors ${scale === s ? 'bg-[#7C3AED] text-white' : 'bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]'}`}>
                  {s}×
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Spacing</span>
            <div className="flex gap-1">
              {[1, 2, 3].map(sp => (
                <button key={sp} onClick={() => setSpacing(sp)}
                  className={`text-[11px] font-medium w-7 h-7 rounded-lg transition-colors ${spacing === sp ? 'bg-[#7C3AED] text-white' : 'bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]'}`}>
                  {sp}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => setBoxed(b => !b)}
              className={`w-8 h-4 rounded-full transition-colors relative ${boxed ? 'bg-[#7C3AED]' : 'bg-[rgba(0,0,0,0.12)] dark:bg-[rgba(255,255,255,0.12)]'}`}
            >
              <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${boxed ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Boxed</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => setInvert(v => !v)}
              className={`w-8 h-4 rounded-full transition-colors relative ${invert ? 'bg-[#7C3AED]' : 'bg-[rgba(0,0,0,0.12)] dark:bg-[rgba(255,255,255,0.12)]'}`}
            >
              <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${invert ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Invert</span>
          </label>
        </div>

        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#163863]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>
                ASCII Art Output
              </span>
            </div>
            <div className="flex gap-1">
              <CopyButton text={output} />
            </div>
          </div>
          <div className="overflow-auto bg-[var(--bg-card)] p-4" style={{ maxHeight: 480 }}>
            {output ? (
              <pre className="font-mono text-[13px] leading-[1.2] whitespace-pre" style={{ color: 'var(--text)' }}>
                {output}
              </pre>
            ) : (
              <p className="text-[13px]" style={{ color: 'var(--text-subtle)' }}>Type something above to generate ASCII art…</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {['HI', 'HELLO', 'CODE', '2025', 'LOVE', 'DEV'].map(ex => (
            <button key={ex} onClick={() => setText(ex)} className={iconBtn}>{ex}</button>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}
