'use client';
import React, { useState } from 'react';
import { TrendingUp, IndianRupee } from 'lucide-react';

export default function NoticePeriodBuyoutTool() {
  const [basicDa, setBasicDa] = useState('60000');
  const [noticeDays, setNoticeDays] = useState('90');
  const [workedDays, setWorkedDays] = useState('30');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const bd = parseFloat(basicDa) || 0;
    const nd = parseFloat(noticeDays) || 0;
    const wd = parseFloat(workedDays) || 0;
    const remainingDays = Math.max(0, nd - wd);
    const dailyRate = bd / 30;
    const buyoutAmount = dailyRate * remainingDays;
    const taxable = buyoutAmount; // Fully taxable
    setResult({ dailyRate, remainingDays, buyoutAmount, taxable, workedDays: wd, noticeDays: nd });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> Notice Period Buyout Tool
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Calculate the exact amount you need to pay to buy out your remaining notice period when resigning in India.
        </p>
        <div className="space-y-4">
          {[
            { label: 'Basic Salary + DA (₹/month)', val: basicDa, set: setBasicDa },
            { label: 'Notice Period in Contract (days)', val: noticeDays, set: setNoticeDays },
            { label: 'Days Already Served', val: workedDays, set: setWorkedDays },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate Buyout
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="text-center p-5 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <div className="text-4xl font-bold text-blue-500">₹{result.buyoutAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
            <div className="text-[13px] text-[color:var(--text-muted)] mt-1">Notice Period Buyout Amount</div>
          </div>
          <div className="space-y-2 text-[14px]">
            {[
              { label: 'Daily Rate (Basic+DA ÷ 30)', val: `₹${result.dailyRate.toFixed(2)}` },
              { label: 'Days Already Served', val: `${result.workedDays} days` },
              { label: 'Remaining Days to Buy Out', val: `${result.remainingDays} days` },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between border-b border-base py-1.5 last:border-0">
                <span className="text-[color:var(--text-muted)]">{label}</span>
                <span className="font-medium text-[color:var(--text)]">{val}</span>
              </div>
            ))}
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-[13px] text-amber-700 dark:text-amber-400">
            Notice period buyout is fully taxable. The amount is deducted from your full and final settlement, not paid separately. Always get written confirmation of F&F settlement.
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
