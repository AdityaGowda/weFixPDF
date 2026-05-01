'use client';
import React, { useState } from 'react';
import { TrendingUp, IndianRupee } from 'lucide-react';

export default function TrafficValueCalculator() {
  const [monthlyVisits, setMonthlyVisits] = useState('50000');
  const [avgCpc, setAvgCpc] = useState('0.45');
  const [ctr, setCtr] = useState('3');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const mv = parseFloat(monthlyVisits) || 0;
    const cpc = parseFloat(avgCpc) || 0;
    const ctrPct = parseFloat(ctr) / 100 || 0.03;
    const clicks = mv * ctrPct;
    const monthlyValue = clicks * cpc;
    const annualValue = monthlyValue * 12;
    const cpmValue = mv > 0 ? (monthlyValue / mv) * 1000 : 0;
    setResult({ mv, clicks, monthlyValue, annualValue, cpmValue });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-emerald-500" /> Traffic Value Calculator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Calculate the monetary value of your organic website traffic based on average CPC and CTR. Essential for SEO ROI reporting.
        </p>
        <div className="space-y-4">
          {[
            { label: 'Monthly Organic Visits', val: monthlyVisits, set: setMonthlyVisits },
            { label: 'Average CPC for Your Keywords ($)', val: avgCpc, set: setAvgCpc },
            { label: 'Organic Click-Through Rate (%)', val: ctr, set: setCtr },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-emerald-500 text-white text-[14px] font-medium hover:bg-emerald-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate Traffic Value
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-emerald-500">${result.monthlyValue.toFixed(0)}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Monthly Traffic Value</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-500">${result.annualValue.toFixed(0)}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Annual Traffic Value</div>
            </div>
          </div>
          <div className="space-y-2 text-[14px]">
            {[
              { label: 'Organic Clicks (visits × CTR)', val: result.clicks.toFixed(0) },
              { label: 'Value per 1000 Visitors (CPM)', val: `$${result.cpmValue.toFixed(2)}` },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between border-b border-base py-1.5 last:border-0">
                <span className="text-[color:var(--text-muted)]">{label}</span>
                <span className="font-medium text-[color:var(--text)]">{val}</span>
              </div>
            ))}
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-[12px] text-blue-600 dark:text-blue-400">
            Traffic value = what you would spend on Google Ads to get the same clicks. Use this metric in client reports and SEO proposals to quantify organic ROI.
          </div>
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
