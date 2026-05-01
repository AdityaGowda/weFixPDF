'use client';
import React, { useState } from 'react';
import { TrendingUp, Code } from 'lucide-react';

export default function CssUnusedDetectorLite() {
  const [css, setCss] = useState('');
  const [html, setHtml] = useState('');
  const [result, setResult] = useState<{ unused: string[]; used: string[]; total: number } | null>(null);

  const analyze = () => {
    if (!css.trim() || !html.trim()) return;
    const selectorRegex = /([.#]?[\w-]+(?:\s*[\s>~+]\s*[.#]?[\w-]+)*)\s*{/g;
    const selectors: string[] = [];
    let match;
    while ((match = selectorRegex.exec(css)) !== null) {
      const sel = match[1].trim();
      if (!sel.startsWith('@') && !sel.startsWith('from') && !sel.startsWith('to')) selectors.push(sel);
    }
    const used: string[] = [];
    const unused: string[] = [];
    selectors.forEach(sel => {
      const className = sel.replace(/^\./, '');
      const id = sel.replace(/^#/, '');
      const tag = sel;
      if (html.includes(className) || html.includes(`id="${id}"`) || html.includes(`<${tag}`) || html.includes(`<${tag} `)) used.push(sel);
      else unused.push(sel);
    });
    setResult({ unused: unused.slice(0, 20), used: used.slice(0, 20), total: selectors.length });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2"><Code className="w-5 h-5 text-blue-500" /> CSS Unused Detector Lite</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Paste your CSS and HTML to detect potentially unused CSS selectors. Removes dead weight for faster load times.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">CSS Code</label>
            <textarea value={css} onChange={e => setCss(e.target.value)} rows={8}
              placeholder={'.header { color: red; }\n.btn-primary { background: blue; }\n.unused-class { display: none; }'}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[12px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">HTML Code</label>
            <textarea value={html} onChange={e => setHtml(e.target.value)} rows={8}
              placeholder={'<div class="header">\n  <button class="btn-primary">Click</button>\n</div>'}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[12px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
          </div>
        </div>
        <button onClick={analyze} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Detect Unused CSS</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center text-[12px]">
            {[{ l: 'Total Selectors', v: result.total, c: 'text-[color:var(--text)]' }, { l: 'Likely Used', v: result.used.length, c: 'text-emerald-500' }, { l: 'Potentially Unused', v: result.unused.length, c: 'text-red-500' }].map(({ l, v, c }) => (
              <div key={l} className="bg-page border border-base rounded-lg p-3"><div className={`text-2xl font-bold ${c}`}>{v}</div><div className="text-[color:var(--text-muted)]">{l}</div></div>
            ))}
          </div>
          {result.unused.length > 0 && (
            <div>
              <h3 className="text-[13px] font-semibold text-red-500 mb-2">Potentially Unused Selectors:</h3>
              <div className="flex flex-wrap gap-1.5">
                {result.unused.map(u => <span key={u} className="px-2 py-1 rounded bg-red-500/10 border border-red-500/20 text-[12px] font-mono text-red-600 dark:text-red-400">{u}</span>)}
              </div>
            </div>
          )}
          <p className="text-[12px] text-[color:var(--text-muted)]">This is a structural analysis — for accurate results use browser DevTools Coverage tab or PurgeCSS. Dynamic class names (Tailwind, CSS-in-JS) require dedicated tools.</p>
        </div>
      )}
    
      <div className="mt-8 bg-card border border-base p-6 rounded-xl space-y-4">
        <h3 className="text-[15px] font-semibold text-[color:var(--text)]">🔒 Privacy & Safe Usage</h3>
        <p className="text-[13px] text-[color:var(--text-muted)]">
          <strong>100% Private:</strong> This tool runs entirely in your browser. No data, inputs, or files are sent to our servers or saved anywhere.
        </p>
        <p className="text-[12px] text-[color:var(--text-muted)] opacity-80 border-t border-base pt-4">
          <strong>Disclaimer:</strong> Always review generated code before production use.
        </p>
      </div>
    </div>
  );
}
