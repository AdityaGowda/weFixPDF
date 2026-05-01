'use client';
import React, { useState } from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';

const PF_RATE = 8.15;

export default function PfGrowthCalculator() {
  const [basicDa, setBasicDa] = useState('40000');
  const [years, setYears] = useState('10');
  const [currentBalance, setCurrentBalance] = useState('0');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const bd = parseFloat(basicDa) || 0;
    const y = parseFloat(years) || 0;
    const existing = parseFloat(currentBalance) || 0;
    const empContrib = bd * 0.12;
    const employerContrib = bd * 0.0367; // 3.67% goes to EPF (rest goes to EPS)
    const totalMonthly = empContrib + employerContrib;
    const monthlyRate = PF_RATE / 100 / 12;
    const months = y * 12;
    let corpus = existing * Math.pow(1 + PF_RATE / 100, y);
    for (let i = 0; i < months; i++) {
      corpus = (corpus + totalMonthly) * (1 + monthlyRate);
    }
    const totalContributions = totalMonthly * months;
    const interest = corpus - totalContributions - existing * Math.pow(1 + PF_RATE / 100, y);
    setResult({ empContrib, employerContrib, totalMonthly, corpus, totalContributions, interest, y });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> PF Growth Calculator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Estimate your EPF corpus at retirement based on current basic salary and service years. Uses current EPF rate of {PF_RATE}%.
        </p>
        <div className="space-y-4">
          {[
            { label: 'Basic Salary + DA (₹/month)', val: basicDa, set: setBasicDa },
            { label: 'Number of Years to Calculate', val: years, set: setYears },
            { label: 'Current PF Balance (₹)', val: currentBalance, set: setCurrentBalance },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate PF Growth
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="text-center p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <div className="text-4xl font-bold text-emerald-500">₹{result.corpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
            <div className="text-[13px] text-[color:var(--text-muted)] mt-1">Estimated PF Corpus after {result.y} years</div>
          </div>
          <div className="space-y-2 text-[14px]">
            {[
              { label: 'Your Monthly Contribution (12%)', val: `₹${result.empContrib.toFixed(0)}` },
              { label: 'Employer Contribution to EPF (3.67%)', val: `₹${result.employerContrib.toFixed(0)}` },
              { label: 'Total Monthly PF Deposit', val: `₹${result.totalMonthly.toFixed(0)}` },
              { label: 'Total Contributions Over Period', val: `₹${result.totalContributions.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between border-b border-base py-1.5 last:border-0">
                <span className="text-[color:var(--text-muted)]">{label}</span>
                <span className="font-medium text-[color:var(--text)]">{val}</span>
              </div>
            ))}
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-[12px] text-blue-600 dark:text-blue-400">
            EPF interest rate is {PF_RATE}% (FY 2023-24). 8.33% of employer contribution goes to EPS (pension), only 3.67% goes to EPF account.
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
