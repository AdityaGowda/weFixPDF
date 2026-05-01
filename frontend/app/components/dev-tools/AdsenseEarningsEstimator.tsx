'use client';
import React, { useState } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';

const NICHE_CPM: Record<string, number> = {
  'Finance / Insurance': 25, 'SaaS / B2B Software': 20, 'Real Estate': 18,
  'Health & Medical': 15, 'Tech / Gadgets': 12, 'Marketing / Ads': 18,
  'Education': 8, 'Gaming': 5, 'Entertainment / Vlogs': 4, 'Lifestyle': 6,
};

const COUNTRY_RPM: Record<string, number> = {
  'United States': 12, 'United Kingdom': 10, 'Canada': 9, 'Australia': 9,
  'Germany': 8, 'France': 7, 'India': 1.5, 'Brazil': 2.5, 'Philippines': 1.2, 'Pakistan': 0.9,
};

export default function AdsenseEarningsEstimator() {
  const [pageviews, setPageviews] = useState('50000');
  const [country, setCountry] = useState('India');
  const [niche, setNiche] = useState('Tech / Gadgets');
  const [pagesPerSession, setPagesPerSession] = useState('2.5');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const pv = parseFloat(pageviews) || 0;
    const pps = parseFloat(pagesPerSession) || 1;
    const sessions = pv / pps;
    const rpm = COUNTRY_RPM[country] ?? 2;
    const nicheMulti = (NICHE_CPM[niche] ?? 10) / 10;
    const adjustedRpm = rpm * nicheMulti;
    const monthlyEarnings = (pv / 1000) * adjustedRpm;
    const annualEarnings = monthlyEarnings * 12;
    const ctr = 0.02;
    const clicks = pv * ctr;
    setResult({ pv, sessions, adjustedRpm, monthlyEarnings, annualEarnings, clicks });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-500" /> AdSense Earnings Estimator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Estimate your monthly Google AdSense revenue based on pageviews, audience country, and content niche.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Monthly Pageviews', val: pageviews, set: setPageviews },
            { label: 'Pages per Session', val: pagesPerSession, set: setPagesPerSession },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Primary Audience Country</label>
            <select value={country} onChange={e => setCountry(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {Object.keys(COUNTRY_RPM).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Content Niche</label>
            <select value={niche} onChange={e => setNiche(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {Object.keys(NICHE_CPM).map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-emerald-500 text-white text-[14px] font-medium hover:bg-emerald-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Estimate Earnings
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-emerald-500">${result.monthlyEarnings.toFixed(0)}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Est. Monthly Revenue</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-500">${result.annualEarnings.toFixed(0)}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Annual Projection</div>
            </div>
          </div>
          <div className="space-y-2 text-[14px]">
            {[
              { label: 'Estimated RPM (after niche adjustment)', val: `$${result.adjustedRpm.toFixed(2)}` },
              { label: 'Monthly Sessions (pv ÷ pages/session)', val: result.sessions.toFixed(0) },
              { label: 'Est. Ad Clicks (2% CTR)', val: result.clicks.toFixed(0) },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between border-b border-base py-1.5 last:border-0">
                <span className="text-[color:var(--text-muted)]">{label}</span>
                <span className="font-medium text-[color:var(--text)]">{val}</span>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-[color:var(--text-muted)]">Estimates are approximate. Actual earnings depend on ad fill rate, viewability, and seasonal advertiser demand (Q4 earns 30–60% more).</p>
        </div>
      )}
    
      <div className="mt-8 bg-card border border-base p-6 rounded-xl space-y-4">
        <h3 className="text-[15px] font-semibold text-[color:var(--text)]">🔒 Privacy & Safe Usage</h3>
        <p className="text-[13px] text-[color:var(--text-muted)]">
          <strong>100% Private:</strong> This tool runs entirely in your browser. No data, inputs, or files are sent to our servers or saved anywhere.
        </p>
        <p className="text-[12px] text-[color:var(--text-muted)] opacity-80 border-t border-base pt-4">
          <strong>Disclaimer:</strong> Results are estimates only and should not be considered financial, tax, or legal advice.
        </p>
      </div>
    </div>
  );
}
