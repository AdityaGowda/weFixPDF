'use client';
import React, { useState } from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';

export default function StartupRunwayCalculator() {
  const [cash, setCash] = useState('5000000');
  const [burn, setBurn] = useState('400000');
  const [growthRate, setGrowthRate] = useState('5');
  const [result, setResult] = useState<Record<string, number | string> | null>(null);

  const calc = () => {
    const c = parseFloat(cash) || 0;
    const b = parseFloat(burn) || 0;
    const gr = parseFloat(growthRate) / 100 || 0;
    if (b <= 0) return;
    let remaining = c, month = 0;
    let currentBurn = b;
    while (remaining > 0 && month < 120) {
      remaining -= currentBurn;
      currentBurn *= (1 + gr);
      month++;
    }
    const simpleRunway = c / b;
    const status = month >= 18 ? 'Safe' : month >= 12 ? 'Moderate' : 'Critical';
    const color = month >= 18 ? 'emerald' : month >= 12 ? 'amber' : 'red';
    setResult({ month, simpleRunway: simpleRunway.toFixed(1), status, color, cash: c, burn: b });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> Startup Runway Calculator India
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Calculate how many months your startup can survive with current cash and burn rate. Factors in month-over-month burn growth.
        </p>
        <div className="space-y-4">
          {[
            { label: 'Current Cash / Bank Balance (₹)', val: cash, set: setCash },
            { label: 'Monthly Burn Rate (₹)', val: burn, set: setBurn },
            { label: 'Monthly Burn Growth Rate (%)', val: growthRate, set: setGrowthRate },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate Runway
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4 text-center">
          <div className={`text-6xl font-bold ${result.color === 'emerald' ? 'text-emerald-500' : result.color === 'amber' ? 'text-amber-500' : 'text-red-500'}`}>
            {result.month}
          </div>
          <div className="text-[14px] text-[color:var(--text-muted)]">Months of Runway (with {growthRate}% monthly burn growth)</div>
          <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-[13px] font-semibold border ${result.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' : result.color === 'amber' ? 'bg-amber-500/10 border-amber-500/20 text-amber-700' : 'bg-red-500/10 border-red-500/20 text-red-600'}`}>
            {result.status as string}
          </div>
          <p className="text-[13px] text-[color:var(--text-muted)]">
            Simple runway (no burn growth): {result.simpleRunway as string} months &nbsp;|&nbsp; Investors want to see 18+ months post-raise.
          </p>
          {(result.month as number) < 12 && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg text-[13px] text-red-600 dark:text-red-400 text-left">
              <strong>Action needed:</strong> With less than 12 months runway, start fundraising now. It typically takes 3–6 months to close a funding round.
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
          <strong>Disclaimer:</strong> This tool is provided for informational and productivity purposes only. Please verify important results independently.
        </p>
      </div>
    </div>
  );
}
