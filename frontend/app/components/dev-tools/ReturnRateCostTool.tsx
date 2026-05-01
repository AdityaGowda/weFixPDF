'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function ReturnRateCostTool() {
  const [revenue, setRevenue] = useState('500000');
  const [returnRate, setReturnRate] = useState('8');
  const [avgValue, setAvgValue] = useState('1500');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const rev = parseFloat(revenue) || 0;
    const rr = parseFloat(returnRate) / 100;
    const av = parseFloat(avgValue) || 0;
    const returns = (rev / av) * rr;
    const revLost = returns * av;
    const processingCost = returns * 120;
    const warehouseCost = returns * 50;
    const totalCost = revLost + processingCost + warehouseCost;
    const impactPct = rev > 0 ? (totalCost / rev) * 100 : 0;
    setResult({ returns: Math.round(returns), revLost, processingCost, warehouseCost, totalCost, impactPct });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Return Rate Cost Tool</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Quantify the hidden cost of your product return rate including logistics, processing, and inventory impact.</p>
        <div className="space-y-4">
          {[{ label: 'Monthly Revenue (₹)', val: revenue, set: setRevenue }, { label: 'Return Rate (%)', val: returnRate, set: setReturnRate }, { label: 'Average Order Value (₹)', val: avgValue, set: setAvgValue }].map(({ label, val, set }) => (
            <div key={label}><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Calculate Return Cost</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-500">₹{result.totalCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Monthly Return Cost</div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-amber-500">{result.impactPct.toFixed(1)}%</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">of Revenue Lost</div>
            </div>
          </div>
          <div className="space-y-2 text-[13px]">
            {[{ l: 'Returns per Month', v: result.returns.toString() + ' items' }, { l: 'Revenue Refunded', v: '₹' + result.revLost.toLocaleString('en-IN', { maximumFractionDigits: 0 }) }, { l: 'Processing Cost (est.)', v: '₹' + result.processingCost.toLocaleString('en-IN', { maximumFractionDigits: 0 }) }, { l: 'Warehouse/Handling Cost', v: '₹' + result.warehouseCost.toLocaleString('en-IN', { maximumFractionDigits: 0 }) }].map(({ l, v }) => (
              <div key={l} className="flex justify-between border-b border-base py-1.5 last:border-0">
                <span className="text-[color:var(--text-muted)]">{l}</span><span className="font-medium text-[color:var(--text)]">{v}</span>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-[color:var(--text-muted)]">Industry standard return rates: 5–8% for D2C fashion, 2–3% for electronics, 15–30% for ecommerce apparel. Reducing returns by 1% typically saves more than a 5% revenue increase.</p>
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
