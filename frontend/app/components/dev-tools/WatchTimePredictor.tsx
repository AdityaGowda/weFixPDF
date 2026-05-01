'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function WatchTimePredictor() {
  const [videoLen, setVideoLen] = useState('12');
  const [niche, setNiche] = useState('Tutorial / How-to');
  const [result, setResult] = useState<Record<string, number | string> | null>(null);

  const RETENTION: Record<string, number> = {
    'Tutorial / How-to': 55, 'Entertainment / Comedy': 45, 'Finance / Investing': 60,
    'Gaming': 40, 'Vlogs': 35, 'Tech Reviews': 50, 'Motivational / Talking Head': 42,
    'Documentary': 65, 'Shorts (< 60s)': 80,
  };

  const calc = () => {
    const len = parseFloat(videoLen) || 0;
    const r = RETENTION[niche] ?? 50;
    const avgWatch = (len * r) / 100;
    const totalViews = 10000;
    const totalWatchHrs = (avgWatch * totalViews) / 60;
    setResult({ len, retentionPct: r, avgWatch: avgWatch.toFixed(1), totalWatchHrs: totalWatchHrs.toFixed(0) });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Watch Time Predictor</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Estimate average watch time and total watch hours for your video based on niche-specific retention benchmarks.</p>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Video Length (minutes)</label>
            <input type="number" value={videoLen} onChange={e => setVideoLen(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
          <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Content Niche</label>
            <select value={niche} onChange={e => setNiche(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {Object.keys(RETENTION).map(n => <option key={n}>{n}</option>)}</select></div>
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 transition-colors">Predict Watch Time</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[{ l: 'Avg Retention', v: result.retentionPct + '%', c: 'text-blue-500' }, { l: 'Avg Watch Time', v: result.avgWatch + ' min', c: 'text-emerald-500' }, { l: 'Watch Hrs (per 10K views)', v: result.totalWatchHrs + ' hrs', c: 'text-amber-500' }].map(({ l, v, c }) => (
              <div key={l} className="bg-page border border-base rounded-xl p-4"><div className={`text-2xl font-bold ${c}`}>{v as string}</div><div className="text-[12px] text-[color:var(--text-muted)] mt-1">{l}</div></div>
            ))}
          </div>
          <p className="text-[12px] text-[color:var(--text-muted)]">YouTube needs 4,000 watch hours in 12 months for monetization. At {result.retentionPct as string}% retention, you need ~{Math.ceil(4000 / parseFloat(result.totalWatchHrs as string) * 10000).toLocaleString('en-IN')} views to qualify.</p>
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
