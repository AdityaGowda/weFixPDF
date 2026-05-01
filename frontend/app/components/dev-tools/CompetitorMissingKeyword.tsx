'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function CompetitorMissingKeyword() {
  const [yourKeywords, setYourKeywords] = useState('');
  const [theirKeywords, setTheirKeywords] = useState('');
  const [result, setResult] = useState<{ theyHaveNotYou: string[]; youHaveNotThem: string[]; shared: string[] } | null>(null);

  const compare = () => {
    const yours = new Set(yourKeywords.split('\n').map(k => k.trim().toLowerCase()).filter(Boolean));
    const theirs = new Set(theirKeywords.split('\n').map(k => k.trim().toLowerCase()).filter(Boolean));
    const theyHaveNotYou = [...theirs].filter(k => !yours.has(k));
    const youHaveNotThem = [...yours].filter(k => !theirs.has(k));
    const shared = [...yours].filter(k => theirs.has(k));
    setResult({ theyHaveNotYou, youHaveNotThem, shared });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Competitor Keyword Gap</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Compare your ranking keywords against a competitor to discover keywords they rank for that you don&apos;t — and vice versa.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Your Keywords (one per line)</label>
            <textarea value={yourKeywords} onChange={e => setYourKeywords(e.target.value)} rows={8}
              placeholder="seo tools\nkeyword research\nbacklink checker"
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Competitor&apos;s Keywords (one per line)</label>
            <textarea value={theirKeywords} onChange={e => setTheirKeywords(e.target.value)} rows={8}
              placeholder="seo tools&#10;rank tracker&#10;site audit tool&#10;on-page seo checker"
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
          </div>
        </div>
        <button onClick={compare} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Compare Keywords</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center text-[12px]">
            {[{ l: 'They Have, You Don\'t', v: result.theyHaveNotYou.length, c: 'text-red-500' }, { l: 'You Have, They Don\'t', v: result.youHaveNotThem.length, c: 'text-blue-500' }, { l: 'Shared Keywords', v: result.shared.length, c: 'text-emerald-500' }].map(({ l, v, c }) => (
              <div key={l} className="bg-page border border-base rounded-lg p-3"><div className={`text-2xl font-bold ${c}`}>{v}</div><div className="text-[color:var(--text-muted)] mt-1">{l}</div></div>
            ))}
          </div>
          {result.theyHaveNotYou.length > 0 && (
            <div>
              <h3 className="text-[13px] font-semibold text-red-500 mb-2">🎯 Keywords to Target (They Rank, You Don&apos;t):</h3>
              <div className="flex flex-wrap gap-1.5">
                {result.theyHaveNotYou.map(k => <span key={k} className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[12px] text-red-600 dark:text-red-400">{k}</span>)}
              </div>
            </div>
          )}
          {result.youHaveNotThem.length > 0 && (
            <div>
              <h3 className="text-[13px] font-semibold text-blue-500 mb-2">💪 Your Exclusive Keywords:</h3>
              <div className="flex flex-wrap gap-1.5">
                {result.youHaveNotThem.map(k => <span key={k} className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[12px] text-blue-600 dark:text-blue-400">{k}</span>)}
              </div>
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
