'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function BlogMonetizationScore() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<{ score: number; monthly: number; streams: string[] } | null>(null);

  const ITEMS = [
    { id: 'adsense', label: 'Google AdSense or premium ad network (Ezoic, Mediavine, Raptive)', monthly: 500 },
    { id: 'affiliate', label: 'Affiliate marketing links (Amazon, ShareASale, etc.)', monthly: 800 },
    { id: 'digitalProduct', label: 'Own digital product (ebook, template, course)', monthly: 1500 },
    { id: 'sponsorship', label: 'Sponsored posts or brand partnerships', monthly: 600 },
    { id: 'email', label: 'Email list (500+ subscribers) for promotions', monthly: 400 },
    { id: 'membership', label: 'Paid membership or subscription content', monthly: 1200 },
    { id: 'service', label: 'Consulting or freelance services promoted via blog', monthly: 2000 },
    { id: 'seoTraffic', label: '10,000+ monthly organic visitors from Google', monthly: 300 },
  ];

  const toggle = (id: string) => setChecks(prev => ({ ...prev, [id]: !prev[id] }));
  const check = () => {
    const active = ITEMS.filter(i => checks[i.id]);
    const score = Math.min(100, Math.round((active.length / ITEMS.length) * 100));
    const monthly = active.reduce((s, i) => s + i.monthly, 0);
    const streams = active.map(i => i.label);
    setResult({ score, monthly, streams });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Blog Monetization Score</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Check which monetization streams you have active and estimate your earning potential based on your active channels.</p>
        <div className="space-y-2">
          {ITEMS.map(q => (
            <label key={q.id} className="flex items-start gap-3 cursor-pointer p-2.5 rounded-lg hover:bg-emerald-500/5 transition-colors">
              <div className="relative flex-shrink-0 mt-0.5">
                <input type="checkbox" checked={!!checks[q.id]} onChange={() => toggle(q.id)} className="peer sr-only" />
                <div className="w-5 h-5 rounded border border-base bg-page peer-checked:bg-emerald-500 peer-checked:border-emerald-500 flex items-center justify-center transition-colors">
                  <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
              <div>
                <span className="text-[13px] text-[color:var(--text-muted)]">{q.label}</span>
                <span className="ml-2 text-[11px] text-emerald-500 font-medium">~${q.monthly}/mo avg</span>
              </div>
            </label>
          ))}
        </div>
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-emerald-500 text-white text-[14px] font-medium hover:bg-emerald-600 transition-colors">Calculate Score</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
              <div className="text-4xl font-bold text-emerald-500">{result.score}%</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Monetization Score</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">${result.monthly.toLocaleString()}/mo</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Potential Monthly Income</div>
            </div>
          </div>
          {result.streams.length === 0 ? (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-[13px] text-red-600 dark:text-red-400">No active monetization streams. Start with Google AdSense and one affiliate program.</div>
          ) : (
            <p className="text-[13px] text-[color:var(--text-muted)]">Active streams: {result.streams.length}. Add digital products and email marketing to unlock the highest-earning channels.</p>
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
