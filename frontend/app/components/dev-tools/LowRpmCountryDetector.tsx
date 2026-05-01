'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function LowRpmCountryDetector() {
  const [trafficData, setTrafficData] = useState('');
  const [result, setResult] = useState<{ low: { country: string; pct: number }[]; high: { country: string; pct: number }[]; lowPct: number; suggestion: string } | null>(null);

  const LOW_RPM = new Set(['India', 'Pakistan', 'Bangladesh', 'Nepal', 'Sri Lanka', 'Philippines', 'Indonesia', 'Nigeria', 'Kenya', 'Ghana', 'Vietnam', 'Cambodia', 'Myanmar', 'Egypt', 'Morocco']);

  const analyze = () => {
    const lines = trafficData.split('\n').map(l => l.trim()).filter(Boolean);
    const entries: { country: string; pct: number }[] = [];
    lines.forEach(line => {
      const parts = line.split('|');
      if (parts.length < 2) return;
      const country = parts[0].trim();
      const pct = parseFloat(parts[1]);
      if (!isNaN(pct)) entries.push({ country, pct });
    });
    const low = entries.filter(e => LOW_RPM.has(e.country));
    const high = entries.filter(e => !LOW_RPM.has(e.country));
    const lowPct = low.reduce((s, e) => s + e.pct, 0);
    const suggestion = lowPct > 60 ? 'High low-RPM traffic. Focus content on US/UK/Canada/Australia topics. Target USD keywords.' : lowPct > 30 ? 'Moderate low-RPM traffic. Consider tier-1 country-focused posts for higher ad revenue.' : 'Good traffic mix. Continue targeting tier-1 countries for premium ad rates.';
    setResult({ low, high, lowPct, suggestion });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Low RPM Country Detector</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Analyze your traffic breakdown to identify how much comes from low-RPM countries that drag down your ad revenue.</p>
        <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-[12px] text-blue-600 dark:text-blue-400">
          Format: <code>Country | Percentage</code> (one per line). Get this from Google Analytics → Demographics.
        </div>
        <textarea value={trafficData} onChange={e => setTrafficData(e.target.value)} rows={8}
          placeholder={'India | 55\nUnited States | 20\nUnited Kingdom | 8\nPhilippines | 7\nIndonesia | 5\nAustralia | 5'}
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        <button onClick={analyze} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Analyze Traffic</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className={`border rounded-xl p-4 ${result.lowPct > 50 ? 'bg-red-500/10 border-red-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
              <div className={`text-4xl font-bold ${result.lowPct > 50 ? 'text-red-500' : 'text-amber-500'}`}>{result.lowPct.toFixed(0)}%</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Low-RPM Traffic</div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
              <div className="text-4xl font-bold text-emerald-500">{(100 - result.lowPct).toFixed(0)}%</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">High-RPM Traffic</div>
            </div>
          </div>
          <p className="text-[13px] text-[color:var(--text-muted)] bg-page border border-base rounded-lg p-3">{result.suggestion}</p>
          {result.low.length > 0 && (
            <div>
              <h3 className="text-[13px] font-semibold text-red-500 mb-2">Low-RPM Countries:</h3>
              <div className="flex flex-wrap gap-2">
                {result.low.map(e => <span key={e.country} className="px-2 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[12px] text-red-600 dark:text-red-400">{e.country}: {e.pct}%</span>)}
              </div>
            </div>
          )}
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
