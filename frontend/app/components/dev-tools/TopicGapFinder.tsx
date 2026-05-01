'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function TopicGapFinder() {
  const [yourTopics, setYourTopics] = useState('');
  const [competitorTopics, setCompetitorTopics] = useState('');
  const [result, setResult] = useState<{ gaps: string[]; covered: string[] } | null>(null);

  const find = () => {
    const yours = new Set(yourTopics.split('\n').map(t => t.trim().toLowerCase()).filter(Boolean));
    const theirs = competitorTopics.split('\n').map(t => t.trim().toLowerCase()).filter(Boolean);
    const gaps = theirs.filter(t => !yours.has(t));
    const covered = theirs.filter(t => yours.has(t));
    setResult({ gaps, covered });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Topic Gap Finder</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Paste your topics and your competitor&apos;s topics to find content gaps you haven&apos;t covered yet.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Your Topics (one per line)</label>
            <textarea value={yourTopics} onChange={e => setYourTopics(e.target.value)} rows={8}
              placeholder={'How to start a blog\nSEO basics\nContent marketing tips'}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Competitor&apos;s Topics (one per line)</label>
            <textarea value={competitorTopics} onChange={e => setCompetitorTopics(e.target.value)} rows={8}
              placeholder={'how to start a blog\nkeyword research guide\nbacklink building strategies\ninternal linking seo'}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
          </div>
        </div>
        <button onClick={find} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Find Topic Gaps</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4"><div className="text-3xl font-bold text-red-500">{result.gaps.length}</div><div className="text-[12px] text-[color:var(--text-muted)] mt-1">Topics You&apos;re Missing</div></div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4"><div className="text-3xl font-bold text-emerald-500">{result.covered.length}</div><div className="text-[12px] text-[color:var(--text-muted)] mt-1">Topics Already Covered</div></div>
          </div>
          {result.gaps.length > 0 && (
            <div>
              <h3 className="text-[13px] font-semibold text-red-500 mb-2">🎯 Content Gaps (Your Next Article Ideas):</h3>
              <div className="space-y-1.5">
                {result.gaps.map((g, i) => (
                  <div key={g} className="flex items-center gap-2 text-[13px] bg-blue-500/5 border border-blue-500/10 rounded px-3 py-1.5">
                    <span className="text-blue-500 font-bold">{i + 1}.</span>
                    <span className="text-[color:var(--text)]">{g}</span>
                  </div>
                ))}
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
