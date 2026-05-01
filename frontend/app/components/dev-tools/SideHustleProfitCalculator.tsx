'use client';
import React, { useState } from 'react';
import { TrendingUp, IndianRupee } from 'lucide-react';

export default function SideHustleProfitCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState('25000');
  const [hoursPerMonth, setHoursPerMonth] = useState('40');
  const [expenses, setExpenses] = useState('3000');
  const [taxRate, setTaxRate] = useState('20');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const rev = parseFloat(monthlyRevenue) || 0;
    const hrs = parseFloat(hoursPerMonth) || 1;
    const exp = parseFloat(expenses) || 0;
    const tax = parseFloat(taxRate) / 100 || 0;
    const grossProfit = rev - exp;
    const netProfit = grossProfit * (1 - tax);
    const hourlyRate = netProfit / hrs;
    const annualNet = netProfit * 12;
    setResult({ rev, exp, grossProfit, netProfit, hourlyRate, annualNet, hrs });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> Side Hustle Profit Calculator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Calculate the real hourly rate and net profit from your side hustle after expenses and taxes.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Monthly Revenue (₹)', val: monthlyRevenue, set: setMonthlyRevenue },
            { label: 'Hours Spent per Month', val: hoursPerMonth, set: setHoursPerMonth },
            { label: 'Monthly Expenses (₹)', val: expenses, set: setExpenses },
            { label: 'Estimated Tax Rate (%)', val: taxRate, set: setTaxRate },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate Real Profit
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-500">₹{result.hourlyRate.toFixed(0)}/hr</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Real Hourly Rate (after tax)</div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-emerald-500">₹{result.annualNet.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Annual Net Income</div>
            </div>
          </div>
          <div className="space-y-2 text-[14px]">
            {[
              { label: 'Monthly Revenue', val: `₹${result.rev.toFixed(0)}` },
              { label: '− Monthly Expenses', val: `-₹${result.exp.toFixed(0)}` },
              { label: 'Gross Profit', val: `₹${result.grossProfit.toFixed(0)}` },
              { label: '− Estimated Tax', val: `-₹${(result.grossProfit - result.netProfit).toFixed(0)}` },
              { label: 'Net Monthly Profit', val: `₹${result.netProfit.toFixed(0)}` },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between border-b border-base py-1.5 last:border-0">
                <span className="text-[color:var(--text-muted)]">{label}</span>
                <span className={`font-medium ${val.startsWith('-') ? 'text-red-500' : 'text-[color:var(--text)]'}`}>{val}</span>
              </div>
            ))}
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
