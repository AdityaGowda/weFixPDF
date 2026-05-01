'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const SCHEMA_TYPES = [
  { id: 'faq', label: 'FAQ Schema', desc: 'Q&A content on the page', high: true },
  { id: 'article', label: 'Article / BlogPosting Schema', desc: 'Blog posts and news articles', high: true },
  { id: 'breadcrumb', label: 'Breadcrumb Schema', desc: 'Navigation path shown in SERP', high: true },
  { id: 'product', label: 'Product Schema', desc: 'E-commerce product pages with price and rating', high: false },
  { id: 'review', label: 'Review Schema', desc: 'User or editorial reviews with star rating', high: false },
  { id: 'howto', label: 'HowTo Schema', desc: 'Step-by-step instructional content', high: false },
  { id: 'event', label: 'Event Schema', desc: 'Events, webinars, conferences', high: false },
  { id: 'localBusiness', label: 'LocalBusiness Schema', desc: 'Physical store or service area business', high: false },
  { id: 'video', label: 'VideoObject Schema', desc: 'Pages with embedded video content', high: false },
  { id: 'organization', label: 'Organization Schema', desc: 'Homepage or About page', high: false },
];

export default function SchemaMissingChecker() {
  const [present, setPresent] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<{ missing: string[]; score: number } | null>(null);

  const toggle = (id: string) => setPresent(prev => ({ ...prev, [id]: !prev[id] }));
  const check = () => {
    const missing = SCHEMA_TYPES.filter(s => !present[s.id]).map(s => s.label);
    const score = Math.round((Object.values(present).filter(Boolean).length / SCHEMA_TYPES.length) * 100);
    setResult({ missing, score });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Schema Missing Checker</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Check which structured data schemas are implemented on your site. Schema markup enables rich results in Google Search.</p>
        <p className="text-[13px] text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 p-2 rounded-lg">Check all schemas currently implemented on your site:</p>
        <div className="space-y-2">
          {SCHEMA_TYPES.map(s => (
            <label key={s.id} className="flex items-start gap-3 cursor-pointer p-2.5 rounded-lg hover:bg-blue-500/5 transition-colors">
              <div className="relative flex-shrink-0 mt-0.5">
                <input type="checkbox" checked={!!present[s.id]} onChange={() => toggle(s.id)} className="peer sr-only" />
                <div className="w-5 h-5 rounded border border-base bg-page peer-checked:bg-emerald-500 peer-checked:border-emerald-500 flex items-center justify-center transition-colors">
                  <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
              <div>
                <div className="text-[13px] font-medium text-[color:var(--text)]">{s.label} {s.high && <span className="text-[11px] text-blue-500 ml-1">High Impact</span>}</div>
                <div className="text-[12px] text-[color:var(--text-muted)]">{s.desc}</div>
              </div>
            </label>
          ))}
        </div>
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors">Check Missing Schemas</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="text-center">
            <div className={`text-4xl font-bold ${result.score >= 80 ? 'text-emerald-500' : result.score >= 40 ? 'text-amber-500' : 'text-red-500'}`}>{result.score}%</div>
            <div className="text-[13px] text-[color:var(--text-muted)]">Schema Implementation Rate</div>
          </div>
          {result.missing.length > 0 && (
            <div>
              <h3 className="text-[13px] font-semibold text-red-500 mb-2">Missing Schemas ({result.missing.length}):</h3>
              {result.missing.map(m => <div key={m} className="text-[13px] text-[color:var(--text-muted)] bg-red-500/5 border border-red-500/10 rounded px-3 py-1.5 mb-1">{m}</div>)}
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
