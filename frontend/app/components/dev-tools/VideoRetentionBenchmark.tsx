'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function VideoRetentionBenchmark() {
  const [niche, setNiche] = useState('Tutorial / How-to');
  const [videoLen, setVideoLen] = useState('12');
  const [yourRetention, setYourRetention] = useState('45');
  const [result, setResult] = useState<Record<string, number | string> | null>(null);

  const BENCHMARKS: Record<string, { avg: number; good: number; label: string }> = {
    'Tutorial / How-to': { avg: 45, good: 60, label: 'Viewers stick around when they need step-by-step guidance.' },
    'Entertainment / Comedy': { avg: 38, good: 52, label: 'High-energy hooks needed in first 30s.' },
    'Finance / Investing': { avg: 55, good: 70, label: 'High-intent audience stays for full analysis.' },
    'Gaming': { avg: 35, good: 48, label: 'Younger audience, fast pacing required.' },
    'Vlogs': { avg: 30, good: 45, label: 'Strong emotional story arc needed to retain viewers.' },
    'Tech Reviews': { avg: 50, good: 65, label: 'Decision-intent viewers watch through comparisons.' },
    'Motivational': { avg: 40, good: 55, label: 'First 2 minutes critical — hook + preview structure.' },
    'Documentary': { avg: 60, good: 75, label: 'Narrative pacing is the key retention driver.' },
  };

  const calc = () => {
    const bm = BENCHMARKS[niche] ?? { avg: 45, good: 60, label: '' };
    const yr = parseFloat(yourRetention) || 0;
    const vl = parseFloat(videoLen) || 0;
    const avgWatch = (vl * yr) / 100;
    const status = yr >= bm.good ? 'Above Average' : yr >= bm.avg ? 'Average' : 'Below Average';
    const gap = yr - bm.avg;
    setResult({ yr, avg: bm.avg, good: bm.good, avgWatch: avgWatch.toFixed(1), status, gap: gap.toFixed(1), label: bm.label });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Video Retention Benchmark</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Compare your YouTube video retention rate against niche-specific benchmarks to understand where you stand.</p>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Your Niche</label>
            <select value={niche} onChange={e => setNiche(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {Object.keys(BENCHMARKS).map(n => <option key={n}>{n}</option>)}</select></div>
          <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Video Length (minutes)</label>
            <input type="number" value={videoLen} onChange={e => setVideoLen(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
          <div className="col-span-2"><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Your Average View Retention (%)</label>
            <input type="number" value={yourRetention} onChange={e => setYourRetention(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Benchmark Retention</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`text-center p-4 rounded-xl border ${result.status === 'Above Average' ? 'bg-emerald-500/10 border-emerald-500/20' : result.status === 'Average' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
            <div className={`text-3xl font-bold ${result.status === 'Above Average' ? 'text-emerald-500' : result.status === 'Average' ? 'text-blue-500' : 'text-red-500'}`}>{result.status as string}</div>
            <div className="text-[13px] text-[color:var(--text-muted)] mt-1">Your {result.yr as string}% vs niche avg {result.avg as string}%</div>
          </div>
          <div className="space-y-2 text-[13px]">
            {[{ l: 'Your Avg Watch Time', v: result.avgWatch + ' min' }, { l: 'Niche Average Retention', v: result.avg + '%' }, { l: 'Good Retention Target', v: result.good + '%' }, { l: 'Your Gap vs Average', v: (result.gap as number) >= 0 ? '+' + result.gap + '%' : result.gap + '%' }].map(({ l, v }) => (
              <div key={l} className="flex justify-between border-b border-base py-1.5 last:border-0">
                <span className="text-[color:var(--text-muted)]">{l}</span><span className="font-medium text-[color:var(--text)]">{v as string}</span>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-[color:var(--text-muted)]">{result.label as string}</p>
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
