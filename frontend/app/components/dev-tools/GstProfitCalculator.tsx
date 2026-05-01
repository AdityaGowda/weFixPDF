'use client';
import React, { useState } from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';

export default function GstProfitCalculator() {
  const [revenue, setRevenue] = useState('100000');
  const [inputCost, setInputCost] = useState('40000');
  const [gstRate, setGstRate] = useState('18');
  const [inputGstRate, setInputGstRate] = useState('18');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const rev = parseFloat(revenue) || 0;
    const cost = parseFloat(inputCost) || 0;
    const gr = parseFloat(gstRate) / 100 || 0;
    const igr = parseFloat(inputGstRate) / 100 || 0;
    const gstCollected = rev * gr;
    const gstPaid = cost * igr;
    const itc = Math.min(gstPaid, gstCollected);
    const netGstPayable = gstCollected - itc;
    const actualRevenue = rev;
    const actualCost = cost;
    const grossProfit = actualRevenue - actualCost;
    const netProfit = grossProfit - netGstPayable;
    const margin = rev > 0 ? (netProfit / rev) * 100 : 0;
    setResult({ rev, cost, gstCollected, gstPaid, itc, netGstPayable, grossProfit, netProfit, margin });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> GST Profit Calculator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Calculate your actual net profit after GST payable, using Input Tax Credit (ITC) to offset your liability.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Total Revenue (excl. GST) ₹', val: revenue, set: setRevenue },
            { label: 'Input/Purchase Cost (excl. GST) ₹', val: inputCost, set: setInputCost },
          ].map(({ label, val, set }) => (
            <div key={label} className="col-span-2 sm:col-span-1">
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
          {[
            { label: 'GST Rate on Sales (%)', val: gstRate, set: setGstRate },
            { label: 'GST Rate on Purchases (%)', val: inputGstRate, set: setInputGstRate },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <select value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
                {['0', '5', '12', '18', '28'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate GST Profit
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <h3 className="text-[15px] font-semibold text-[color:var(--text)]">GST & Profit Breakdown</h3>
          <div className="space-y-2 text-[14px]">
            {[
              { label: 'GST Collected from Customers', val: result.gstCollected, red: false },
              { label: 'GST Paid on Purchases (ITC)', val: result.itc, red: false },
              { label: 'Net GST Payable to Govt', val: result.netGstPayable, red: true },
              { label: 'Gross Profit (Revenue − Cost)', val: result.grossProfit, red: false },
              { label: '− Net GST Payable', val: -result.netGstPayable, red: true },
            ].map(({ label, val, red }) => (
              <div key={label} className="flex justify-between border-b border-base py-1.5 last:border-0">
                <span className="text-[color:var(--text-muted)]">{label}</span>
                <span className={`font-medium ${red && val > 0 ? 'text-red-500' : 'text-[color:var(--text)]'}`}>₹{Math.abs(val).toFixed(0)}</span>
              </div>
            ))}
          </div>
          <div className={`p-4 rounded-xl text-center border ${result.netProfit >= 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
            <div className={`text-3xl font-bold ${result.netProfit >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>₹{result.netProfit.toFixed(0)}</div>
            <div className="text-[13px] text-[color:var(--text-muted)] mt-1">Net Profit After GST &nbsp;|&nbsp; Margin: {result.margin.toFixed(1)}%</div>
          </div>
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
