'use client';
import React, { useState } from 'react';
import { Youtube, TrendingUp } from 'lucide-react';

const RPM: Record<string, [number, number]> = {
  'United States': [8, 15], 'United Kingdom': [7, 12], 'Canada': [6, 11],
  'Australia': [6, 10], 'Germany': [5, 10], 'France': [4, 9],
  'India': [0.8, 2.0], 'Pakistan': [0.5, 1.2], 'Philippines': [0.6, 1.5], 'Brazil': [1.5, 3.5],
};
const NICHE: Record<string, number> = {
  'Finance / Investing': 2.5, 'Tech / SaaS': 2.0, 'Business': 1.8,
  'Health': 1.6, 'Education': 1.2, 'Gaming': 0.8, 'Entertainment': 0.7, 'Vlogs': 0.6,
};

export default function YouTubeRpmCalculator() {
  const [views, setViews] = useState('100000');
  const [country, setCountry] = useState('India');
  const [niche, setNiche] = useState('Tech / SaaS');
  const [result, setResult] = useState<{ rpm: string; low: string; high: string } | null>(null);

  const calc = () => {
    const v = parseInt(views) || 0;
    const [lo, hi] = RPM[country] ?? [1, 3];
    const n = NICHE[niche] ?? 1;
    const rpm = ((lo + hi) / 2) * n;
    setResult({ rpm: rpm.toFixed(2), low: ((lo * n * v) / 1000).toFixed(0), high: ((hi * n * v) / 1000).toFixed(0) });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <Youtube className="w-5 h-5 text-red-500" /> YouTube RPM Calculator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Estimate your monthly YouTube ad revenue based on audience country and content niche.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Monthly Views</label>
            <input type="number" value={views} onChange={e => setViews(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Primary Audience Country</label>
            <select value={country} onChange={e => setCountry(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {Object.keys(RPM).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Content Niche</label>
            <select value={niche} onChange={e => setNiche(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {Object.keys(NICHE).map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate Earnings
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl text-center space-y-4">
          <h3 className="text-[16px] font-medium text-[color:var(--text)]">Estimated Monthly Revenue</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-500">${result.rpm}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Est. RPM</div>
            </div>
            <div className="bg-emerald-500/10 p-4 rounded-lg">
              <div className="text-2xl font-bold text-emerald-500">${result.low}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Low Estimate</div>
            </div>
            <div className="bg-amber-500/10 p-4 rounded-lg">
              <div className="text-2xl font-bold text-amber-500">${result.high}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">High Estimate</div>
            </div>
          </div>
          <p className="text-[12px] text-[color:var(--text-muted)]">RPM varies with ad inventory, seasonality, and audience behavior. December typically yields 30–50% higher RPM.</p>
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
