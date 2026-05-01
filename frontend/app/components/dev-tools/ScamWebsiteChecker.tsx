'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const CHECKS = [
  { id: 'ssl', label: 'Site has a valid HTTPS/SSL certificate', weight: 15 },
  { id: 'noContact', label: 'No contact page, phone, or verifiable address', weight: 12 },
  { id: 'newDomain', label: 'Domain was registered less than 6 months ago', weight: 10 },
  { id: 'keywordOnly', label: 'Website name contains only generic keywords (e.g. "best-cheap-loans.com")', weight: 8 },
  { id: 'noAbout', label: 'No "About Us" page or team information', weight: 8 },
  { id: 'badGrammar', label: 'Multiple spelling/grammar errors throughout the site', weight: 7 },
  { id: 'urgency', label: 'Excessive urgency — "limited offer", countdown timers everywhere', weight: 10 },
  { id: 'noPay', label: 'No recognized payment gateway (PayPal, Razorpay, Stripe, cards)', weight: 12 },
  { id: 'noReturn', label: 'No return/refund policy or terms of service', weight: 10 },
  { id: 'socialMissing', label: 'No verifiable social media presence or all accounts are new', weight: 8 },
];

export default function ScamWebsiteChecker() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<{ score: number; level: string } | null>(null);

  const toggle = (id: string) => setAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  const check = () => {
    const score = Math.min(100, CHECKS.reduce((s, q) => s + (answers[q.id] ? q.weight : 0), 0));
    const level = score >= 40 ? 'High Risk — Likely Scam' : score >= 20 ? 'Moderate Risk' : 'Appears Legitimate';
    setResult({ score, level });
  };

  const scoreColor = result ? (result.score >= 40 ? 'red' : result.score >= 20 ? 'amber' : 'emerald') : 'blue';

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-red-500" /> Scam Website Checker
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Check any website against 10 proven scam indicators. Useful for verifying online shops, freelance platforms, or investment sites before transacting.
        </p>
        <div className="space-y-3">
          {CHECKS.map(q => (
            <label key={q.id} className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg hover:bg-red-500/5 transition-colors border border-transparent hover:border-red-500/10">
              <div className="relative flex-shrink-0 mt-0.5">
                <input type="checkbox" checked={!!answers[q.id]} onChange={() => toggle(q.id)} className="peer sr-only" />
                <div className="w-5 h-5 rounded border border-base bg-page peer-checked:bg-red-500 peer-checked:border-red-500 flex items-center justify-center transition-colors">
                  <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
              <span className="text-[14px] text-[color:var(--text-muted)] group-hover:text-[color:var(--text)] transition-colors">{q.label}</span>
            </label>
          ))}
        </div>
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Check for Scam
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl text-center space-y-4">
          <div className={`text-5xl font-bold ${scoreColor === 'red' ? 'text-red-500' : scoreColor === 'amber' ? 'text-amber-500' : 'text-emerald-500'}`}>
            {result.score}/100
          </div>
          <div className={`text-[16px] font-semibold ${scoreColor === 'red' ? 'text-red-500' : scoreColor === 'amber' ? 'text-amber-500' : 'text-emerald-500'}`}>
            {result.level}
          </div>
          <p className="text-[13px] text-[color:var(--text-muted)]">
            {result.score >= 40 ? 'Do not transact with this site. Multiple high-risk scam indicators are present. Report to cybercrime.gov.in if you have been defrauded.' : result.score >= 20 ? 'Proceed with caution. Verify the company on MCA21 or GST portal before making any payment.' : 'No major red flags detected. Still verify the company registration and use a traceable payment method.'}
          </p>
        </div>
      )}
    
      <div className="mt-8 bg-card border border-base p-6 rounded-xl space-y-4">
        <h3 className="text-[15px] font-semibold text-[color:var(--text)]">🔒 Privacy & Safe Usage</h3>
        <p className="text-[13px] text-[color:var(--text-muted)]">
          <strong>100% Private:</strong> This tool runs entirely in your browser. No data, inputs, or files are sent to our servers or saved anywhere.
        </p>
        <p className="text-[12px] text-[color:var(--text-muted)] opacity-80 border-t border-base pt-4">
          <strong>Disclaimer:</strong> This tool provides risk indicators only, not a final judgment.
        </p>
      </div>
    </div>
  );
}
