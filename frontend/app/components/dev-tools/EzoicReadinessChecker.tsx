'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const EZOIC_CHECKS = [
  { id: 'ga', label: 'Google Analytics is installed and verified on your site', weight: 15 },
  { id: 'traffic', label: 'Your site receives at least 10,000 monthly pageviews', weight: 20 },
  { id: 'original', label: 'All content is original and not AI-generated or copied', weight: 15 },
  { id: 'niche', label: 'Your site has a clear, consistent niche (not a general blog)', weight: 10 },
  { id: 'speed', label: 'Page speed score is above 60 on Google PageSpeed Insights', weight: 10 },
  { id: 'mobile', label: 'Site is mobile responsive on all screen sizes', weight: 10 },
  { id: 'adsense', label: 'You have been approved for Google AdSense previously (preferred)', weight: 8 },
  { id: 'noViolations', label: 'No Google policy violations or manual actions on your site', weight: 12 },
];

export default function EzoicReadinessChecker() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<{ score: number } | null>(null);

  const toggle = (id: string) => setAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  const check = () => {
    const score = Math.min(100, EZOIC_CHECKS.reduce((s, q) => s + (answers[q.id] ? q.weight : 0), 0));
    setResult({ score });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Ezoic Readiness Checker</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Check if your site meets Ezoic's requirements and best-practice signals before applying for monetization.</p>
        <div className="space-y-2">
          {EZOIC_CHECKS.map(q => (
            <label key={q.id} className="flex items-start gap-3 cursor-pointer p-2.5 rounded-lg hover:bg-blue-500/5 transition-colors">
              <div className="relative flex-shrink-0 mt-0.5">
                <input type="checkbox" checked={!!answers[q.id]} onChange={() => toggle(q.id)} className="peer sr-only" />
                <div className="w-5 h-5 rounded border border-base bg-page peer-checked:bg-blue-500 peer-checked:border-blue-500 flex items-center justify-center transition-colors">
                  <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
              <span className="text-[13px] text-[color:var(--text-muted)]">{q.label}</span>
            </label>
          ))}
        </div>
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors">Check Ezoic Readiness</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl text-center space-y-3">
          <div className={`text-5xl font-bold ${result.score >= 80 ? 'text-emerald-500' : result.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>{result.score}%</div>
          <p className="text-[14px] text-[color:var(--text-muted)]">
            {result.score >= 80 ? 'Ready to apply! Your site meets the key Ezoic requirements.' : result.score >= 50 ? 'Almost there. Focus on traffic (10K+ pageviews) and content quality first.' : 'Not ready yet. Build organic traffic to 10K+/month before applying to avoid rejection.'}
          </p>
          {!answers.traffic && <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-[13px] text-amber-700 dark:text-amber-400">The 10K pageview requirement is the #1 rejection reason. Focus on this first.</div>}
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
