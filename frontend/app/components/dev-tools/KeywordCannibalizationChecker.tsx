'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function KeywordCannibalizationChecker() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ groups: Record<string, string[]>; total: number } | null>(null);

  const check = () => {
    const lines = input.split('\n').map(l => l.trim()).filter(Boolean);
    const groups: Record<string, string[]> = {};
    lines.forEach(line => {
      const [kw, url] = line.split('|').map(s => s.trim());
      if (!kw || !url) return;
      if (!groups[kw.toLowerCase()]) groups[kw.toLowerCase()] = [];
      if (!groups[kw.toLowerCase()].includes(url)) groups[kw.toLowerCase()].push(url);
    });
    const cannibalizing = Object.fromEntries(Object.entries(groups).filter(([, urls]) => urls.length > 1));
    setResult({ groups: cannibalizing, total: Object.keys(cannibalizing).length });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Keyword Cannibalization Checker</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Paste your keywords and URLs to detect where multiple pages are competing for the same keyword.</p>
        <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-[12px] text-blue-600 dark:text-blue-400">
          Format: <code>keyword | page-url</code> (one per line). Export from Google Search Console and paste here.
        </div>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={8}
          placeholder={'best seo tools | /blog/seo-tools\nbest seo tools | /tools/seo-checker\nkeyword research | /blog/keyword-research\nkeyword research | /tools/keyword-finder'}
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-amber-500 text-white text-[14px] font-medium hover:bg-amber-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Find Cannibalization</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`text-3xl font-bold text-center ${result.total > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
            {result.total === 0 ? '✓ No Cannibalization Found' : `${result.total} Cannibalized Keyword${result.total > 1 ? 's' : ''}`}
          </div>
          {result.total > 0 && (
            <div className="space-y-3">
              {Object.entries(result.groups).map(([kw, urls]) => (
                <div key={kw} className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <div className="text-[13px] font-bold text-red-500 mb-2">Keyword: &quot;{kw}&quot;</div>
                  <div className="space-y-1">
                    {urls.map(url => <div key={url} className="text-[12px] font-mono text-[color:var(--text-muted)]">→ {url}</div>)}
                  </div>
                  <div className="mt-2 text-[12px] text-[color:var(--text-muted)]">Fix: Merge these pages, add a canonical from weak to strong, or differentiate the content focus.</div>
                </div>
              ))}
            </div>
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
  );
}
