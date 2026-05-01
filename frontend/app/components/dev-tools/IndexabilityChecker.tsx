'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const INDEXABILITY_ISSUES = [
  { id: 'noindex', label: 'Page has "noindex" meta tag or X-Robots-Tag header', critical: true },
  { id: 'robotsBlocked', label: 'URL is blocked by robots.txt (Disallow rule)', critical: true },
  { id: 'canonical', label: 'Page has a canonical tag pointing to a different URL', critical: true },
  { id: 'redirect', label: 'Page redirects to another URL (3xx)', critical: false },
  { id: 'noFollow', label: 'All internal links to this page use rel="nofollow"', critical: false },
  { id: 'lowContent', label: 'Page has less than 150 words of unique content', critical: false },
  { id: 'duplicate', label: 'Page content is nearly identical to another page on the site', critical: true },
  { id: 'orphaned', label: 'Page has no internal links pointing to it (orphaned page)', critical: false },
  { id: 'slow', label: 'Page takes more than 5 seconds to load', critical: false },
  { id: 'notInSitemap', label: 'Page is not included in the XML sitemap', critical: false },
];

export default function IndexabilityChecker() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<{ score: number; blocking: string[]; warnings: string[] } | null>(null);

  const toggle = (id: string) => setAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  const check = () => {
    const critical = INDEXABILITY_ISSUES.filter(i => i.critical && answers[i.id]);
    const warn = INDEXABILITY_ISSUES.filter(i => !i.critical && answers[i.id]);
    const score = Math.max(0, 100 - critical.length * 25 - warn.length * 10);
    setResult({ score, blocking: critical.map(c => c.label), warnings: warn.map(w => w.label) });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Indexability Checker</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Check if your page is likely being prevented from indexing by Google. Select all issues that apply to your target URL.</p>
        <div className="space-y-2">
          {INDEXABILITY_ISSUES.map(q => (
            <label key={q.id} className="flex items-start gap-3 cursor-pointer p-2.5 rounded-lg hover:bg-blue-500/5 transition-colors">
              <div className="relative flex-shrink-0 mt-0.5">
                <input type="checkbox" checked={!!answers[q.id]} onChange={() => toggle(q.id)} className="peer sr-only" />
                <div className="w-5 h-5 rounded border border-base bg-page peer-checked:bg-red-500 peer-checked:border-red-500 flex items-center justify-center transition-colors">
                  <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
              <div>
                <span className="text-[13px] text-[color:var(--text-muted)]">{q.label}</span>
                {q.critical && <span className="ml-2 text-[11px] font-semibold text-red-500">CRITICAL</span>}
              </div>
            </label>
          ))}
        </div>
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors">Check Indexability</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`text-5xl font-bold text-center ${result.score >= 80 ? 'text-emerald-500' : result.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>{result.score}/100</div>
          {result.blocking.length > 0 && (
            <div>
              <h3 className="text-[13px] font-semibold text-red-500 mb-2">🚫 Blocking Issues (Fix Immediately):</h3>
              {result.blocking.map(b => <p key={b} className="text-[13px] text-[color:var(--text-muted)] mb-1">• {b}</p>)}
            </div>
          )}
          {result.warnings.length > 0 && (
            <div>
              <h3 className="text-[13px] font-semibold text-amber-500 mb-2">⚠ Warnings:</h3>
              {result.warnings.map(w => <p key={w} className="text-[13px] text-[color:var(--text-muted)] mb-1">• {w}</p>)}
            </div>
          )}
          {result.blocking.length === 0 && result.warnings.length === 0 && (
            <p className="text-emerald-500 text-[14px] text-center">✓ No indexability issues detected! Page should be crawlable and indexable.</p>
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
