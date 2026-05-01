'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function AdDensityChecker() {
  const [wordCount, setWordCount] = useState('1200');
  const [adCount, setAdCount] = useState('8');
  const [result, setResult] = useState<Record<string, number | string> | null>(null);

  const calc = () => {
    const w = parseInt(wordCount) || 0;
    const a = parseInt(adCount) || 0;
    const wordsPerAd = w > 0 && a > 0 ? Math.round(w / a) : 0;
    const density = w > 0 ? ((a / (w / 100)) * 100).toFixed(1) : '0';
    const status = wordsPerAd >= 300 ? 'Good' : wordsPerAd >= 150 ? 'Moderate' : 'Too Dense';
    setResult({ w, a, wordsPerAd, density, status });
  };

  const statusColor: Record<string, string> = { Good: 'text-emerald-500', Moderate: 'text-amber-500', 'Too Dense': 'text-red-500' };
  const statusBg: Record<string, string> = { Good: 'bg-emerald-500/10 border-emerald-500/20', Moderate: 'bg-amber-500/10 border-amber-500/20', 'Too Dense': 'bg-red-500/10 border-red-500/20' };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Ad Density Checker</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Check if your ad placement follows Google AdSense Better Ads Standards. Too many ads per page can trigger policy violations.</p>
        <div className="grid grid-cols-2 gap-4">
          {[{ label: 'Article Word Count', val: wordCount, set: setWordCount }, { label: 'Number of Ad Units', val: adCount, set: setAdCount }].map(({ label, val, set }) => (
            <div key={label}><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors">Check Ad Density</button>
      </div>
      {result && (
        <div className={`bg-card border p-6 rounded-xl space-y-3 ${statusBg[result.status as string]}`}>
          <div className={`text-3xl font-bold text-center ${statusColor[result.status as string]}`}>{result.status as string}</div>
          <div className="grid grid-cols-3 gap-3 text-center text-[13px]">
            {[{ l: 'Words per Ad', v: result.wordsPerAd }, { l: 'Ad Density', v: result.density + '/100 words' }, { l: 'Total Ads', v: result.a }].map(({ l, v }) => (
              <div key={l} className="bg-card/50 rounded-lg p-3"><div className="font-bold text-[color:var(--text)]">{v as string}</div><div className="text-[color:var(--text-muted)]">{l}</div></div>
            ))}
          </div>
          <p className="text-[12px] text-[color:var(--text-muted)] text-center">Google recommends at least 1 ad per 300 words. Above 1 ad per 150 words risks policy action.</p>
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
