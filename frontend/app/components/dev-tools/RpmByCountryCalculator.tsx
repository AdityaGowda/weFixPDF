'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const COUNTRY_RPM: Record<string, { rpm: [number, number]; tier: string }> = {
  'United States': { rpm: [8, 15], tier: '🟢 Tier 1 – Very High RPM' },
  'United Kingdom': { rpm: [7, 12], tier: '🟢 Tier 1 – Very High RPM' },
  'Canada': { rpm: [6, 11], tier: '🟢 Tier 1 – Very High RPM' },
  'Australia': { rpm: [6, 10], tier: '🟢 Tier 1 – Very High RPM' },
  'Germany': { rpm: [5, 10], tier: '🟡 Tier 1 – High RPM' },
  'France': { rpm: [4, 9], tier: '🟡 Tier 1 – High RPM' },
  'Netherlands': { rpm: [5, 9], tier: '🟡 Tier 1 – High RPM' },
  'Singapore': { rpm: [4, 8], tier: '🟡 Tier 1 – High RPM' },
  'Japan': { rpm: [3, 7], tier: '🟡 Tier 2 – Medium RPM' },
  'Brazil': { rpm: [1.5, 3.5], tier: '🟠 Tier 2 – Medium RPM' },
  'Mexico': { rpm: [1.2, 3.0], tier: '🟠 Tier 2 – Medium RPM' },
  'India': { rpm: [0.8, 2.0], tier: '🔴 Tier 3 – Low RPM' },
  'Pakistan': { rpm: [0.5, 1.2], tier: '🔴 Tier 3 – Low RPM' },
  'Bangladesh': { rpm: [0.4, 1.0], tier: '🔴 Tier 3 – Low RPM' },
  'Philippines': { rpm: [0.6, 1.5], tier: '🔴 Tier 3 – Low RPM' },
  'Nigeria': { rpm: [0.5, 1.2], tier: '🔴 Tier 3 – Low RPM' },
  'Kenya': { rpm: [0.4, 1.0], tier: '🔴 Tier 3 – Low RPM' },
  'Indonesia': { rpm: [0.6, 1.5], tier: '🔴 Tier 3 – Low RPM' },
};

export default function RpmByCountryCalculator() {
  const [visits, setVisits] = useState('50000');
  const [country, setCountry] = useState('India');

  const data = COUNTRY_RPM[country];
  const avgRpm = data ? (data.rpm[0] + data.rpm[1]) / 2 : 0;
  const lowEarnings = data ? (parseInt(visits) / 1000) * data.rpm[0] : 0;
  const highEarnings = data ? (parseInt(visits) / 1000) * data.rpm[1] : 0;

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" /> RPM by Country Calculator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Compare ad RPM rates across countries and understand why audience location dramatically impacts your ad revenue.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Monthly Pageviews from This Country</label>
            <input type="number" value={visits} onChange={e => setVisits(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Country</label>
            <select value={country} onChange={e => setCountry(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {Object.keys(COUNTRY_RPM).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        {data && (
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-page border border-base rounded-xl p-4">
              <div className="text-xl font-bold text-blue-500">${data.rpm[0]}–${data.rpm[1]}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">RPM Range</div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
              <div className="text-xl font-bold text-emerald-500">${lowEarnings.toFixed(0)}–${highEarnings.toFixed(0)}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Est. Monthly Earnings</div>
            </div>
            <div className="bg-page border border-base rounded-xl p-4">
              <div className="text-[14px] font-semibold text-amber-500">{data.tier.split(' – ')[1]}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">{data.tier.split(' – ')[0]}</div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-card border border-base p-6 rounded-xl space-y-3">
        <h3 className="text-[15px] font-semibold text-[color:var(--text)]">All Countries RPM Comparison</h3>
        <div className="space-y-1.5">
          {Object.entries(COUNTRY_RPM).map(([c, d]) => (
            <div key={c} className="flex items-center gap-3">
              <span className="text-[12px] text-[color:var(--text-muted)] w-32 flex-shrink-0">{c}</span>
              <div className="flex-1 h-2 bg-page rounded-full border border-base overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(d.rpm[1] / 15) * 100}%` }} />
              </div>
              <span className="text-[12px] font-medium text-[color:var(--text)] w-20 text-right">${d.rpm[0]}–${d.rpm[1]}</span>
            </div>
          ))}
        </div>
      </div>
    
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
