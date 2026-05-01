'use client';
import React, { useState } from 'react';
import { TrendingUp, IndianRupee } from 'lucide-react';

export default function BrandDealRateCalculator() {
  const [subscribers, setSubscribers] = useState('100000');
  const [avgViews, setAvgViews] = useState('15000');
  const [platform, setPlatform] = useState('YouTube');
  const [niche, setNiche] = useState('Tech');
  const [result, setResult] = useState<Record<string, number | string> | null>(null);

  const NICHE_MULTI: Record<string, number> = { 'Finance': 3, 'Tech': 2, 'Business': 2.5, 'Health': 1.8, 'Gaming': 1, 'Fashion': 1.5, 'Travel': 1.3, 'Food': 1.1, 'Education': 1.5 };
  const PLATFORM_CPV: Record<string, number> = { 'YouTube': 0.08, 'Instagram': 0.05, 'LinkedIn': 0.12, 'Twitter/X': 0.03, 'Podcast': 0.15 };

  const calc = () => {
    const subs = parseInt(subscribers) || 0;
    const views = parseInt(avgViews) || 0;
    const cpv = PLATFORM_CPV[platform] ?? 0.08;
    const multi = NICHE_MULTI[niche] ?? 1.5;
    const integrationRate = views * cpv * multi;
    const dedicatedRate = integrationRate * 2.5;
    const storiesRate = views * 0.03 * multi;
    const inrConversion = 83;
    setResult({
      integrationRate: integrationRate.toFixed(0),
      dedicatedRate: dedicatedRate.toFixed(0),
      storiesRate: storiesRate.toFixed(0),
      inrIntegration: (integrationRate * inrConversion).toFixed(0),
      inrDedicated: (dedicatedRate * inrConversion).toFixed(0),
      engagementRate: views > 0 ? ((views / subs) * 100).toFixed(1) : '0',
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> Brand Deal Rate Calculator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Calculate your fair brand deal rates based on your average views, platform, and content niche.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[{ label: 'Subscribers / Followers', val: subscribers, set: setSubscribers }, { label: 'Average Views per Video/Post', val: avgViews, set: setAvgViews }].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {Object.keys(PLATFORM_CPV).map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Content Niche</label>
            <select value={niche} onChange={e => setNiche(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {Object.keys(NICHE_MULTI).map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate My Rates
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="text-[13px] text-[color:var(--text-muted)]">Engagement Rate: <span className="font-semibold text-[color:var(--text)]">{result.engagementRate as string}%</span></div>
          <div className="space-y-3">
            {[
              { label: 'Integration / Mention (30-60s in video)', usd: result.integrationRate, inr: result.inrIntegration },
              { label: 'Dedicated / Full Review Video', usd: result.dedicatedRate, inr: result.inrDedicated },
              { label: 'Story / Short-format Promo', usd: result.storiesRate, inr: result.storiesRate },
            ].map(({ label, usd, inr }) => (
              <div key={label} className="bg-page border border-base rounded-xl p-4">
                <div className="text-[13px] text-[color:var(--text-muted)] mb-2">{label}</div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-500">${usd as string}</div>
                  <div className="text-[14px] font-semibold text-emerald-500">₹{parseInt(inr as string).toLocaleString('en-IN')}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-[color:var(--text-muted)]">Rates are based on industry CPV benchmarks. Adjust upward for niche authority and audience quality. Always negotiate — most brands have 20–30% flexibility.</p>
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
