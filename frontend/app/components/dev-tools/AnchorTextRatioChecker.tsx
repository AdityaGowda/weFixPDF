'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function AnchorTextRatioChecker() {
  const [links, setLinks] = useState('');
  const [result, setResult] = useState<Record<string, number | string> | null>(null);

  const analyze = () => {
    const lines = links.split('\n').map(l => l.trim()).filter(Boolean);
    let exact = 0, partial = 0, branded = 0, naked = 0, generic = 0, other = 0;
    const GENERIC = ['click here', 'read more', 'learn more', 'here', 'this', 'link', 'visit', 'check this'];
    const URL_PATTERN = /^https?:\/\//i;
    lines.forEach(line => {
      const lower = line.toLowerCase();
      if (URL_PATTERN.test(line)) naked++;
      else if (GENERIC.some(g => lower === g)) generic++;
      else if (lower.length < 20) branded++;
      else if (lower.length < 50) partial++;
      else exact++;
    });
    const total = lines.length || 1;
    const healthScore = Math.min(100,
      (branded / total * 30) + (partial / total * 25) + ((naked + generic) < total * 0.3 ? 25 : 10) + ((exact / total) < 0.2 ? 20 : 5)
    );
    setResult({ total, exact, partial, branded, naked, generic, other, healthScore: healthScore.toFixed(0) });
  };

  const types = result ? [
    { label: 'Branded / Short', val: result.branded, pct: Math.round((result.branded as number / (result.total as number)) * 100), color: 'emerald' },
    { label: 'Partial Match', val: result.partial, pct: Math.round((result.partial as number / (result.total as number)) * 100), color: 'blue' },
    { label: 'Exact Match', val: result.exact, pct: Math.round((result.exact as number / (result.total as number)) * 100), color: 'amber' },
    { label: 'Naked URL', val: result.naked, pct: Math.round((result.naked as number / (result.total as number)) * 100), color: 'purple' },
    { label: 'Generic (Click Here)', val: result.generic, pct: Math.round((result.generic as number / (result.total as number)) * 100), color: 'red' },
  ] : [];

  const colorMap: Record<string, string> = { emerald: 'bg-emerald-500', blue: 'bg-blue-500', amber: 'bg-amber-500', purple: 'bg-purple-500', red: 'bg-red-500' };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" /> Anchor Text Ratio Checker
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Paste your backlink anchor texts (one per line) to check for over-optimization. Too many exact match anchors triggers Google penalties.
        </p>
        <textarea value={links} onChange={e => setLinks(e.target.value)} rows={10}
          placeholder={`best seo tools\nhttps://example.com\nclick here\nweb design services india\nyour brand name\n...`}
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        <button onClick={analyze} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Analyze Anchor Ratio
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-[color:var(--text)]">{result.healthScore}/100</div>
            <div>
              <div className="text-[14px] font-semibold text-[color:var(--text)]">Anchor Profile Health</div>
              <div className="text-[12px] text-[color:var(--text-muted)]">Based on {result.total as string} anchor texts</div>
            </div>
          </div>
          <div className="space-y-3">
            {types.map(({ label, val, pct, color }) => (
              <div key={label}>
                <div className="flex justify-between text-[13px] mb-1">
                  <span className="text-[color:var(--text-muted)]">{label}</span>
                  <span className="font-medium text-[color:var(--text)]">{val as string} ({pct}%)</span>
                </div>
                <div className="h-2 bg-page border border-base rounded-full overflow-hidden">
                  <div className={`h-full ${colorMap[color]} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          {(result.exact as number) / (result.total as number) > 0.3 && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-[13px] text-red-600 dark:text-red-400">
              <strong>Over-optimization risk:</strong> More than 30% exact match anchors is a Google Penguin red flag. Diversify with branded, naked URL, and natural anchors.
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
