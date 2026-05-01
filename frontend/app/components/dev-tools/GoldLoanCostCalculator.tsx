'use client';
import React, { useState } from 'react';
import { TrendingUp, IndianRupee } from 'lucide-react';

const GOLD_RATES: Record<string, number> = {
  '24K (999 purity)': 7200, '22K (916 purity)': 6600,
  '18K (750 purity)': 5400, '14K (585 purity)': 4200,
};

export default function GoldLoanCostCalculator() {
  const [grams, setGrams] = useState('50');
  const [purity, setPurity] = useState('22K (916 purity)');
  const [ltv, setLtv] = useState('75');
  const [rate, setRate] = useState('9.5');
  const [months, setMonths] = useState('12');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const g = parseFloat(grams) || 0;
    const goldRate = GOLD_RATES[purity] || 6600;
    const goldValue = g * goldRate;
    const loanAmount = goldValue * (parseFloat(ltv) / 100);
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const n = parseFloat(months) || 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const totalPayable = emi * n;
    const totalInterest = totalPayable - loanAmount;
    setResult({ goldValue, loanAmount, emi, totalPayable, totalInterest, ltv: parseFloat(ltv) });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-amber-500" /> Gold Loan Cost Calculator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Calculate how much loan you can get against your gold jewelry and what it will cost you in EMI and total interest.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Gold Weight (grams)</label>
            <input type="number" value={grams} onChange={e => setGrams(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Gold Purity</label>
            <select value={purity} onChange={e => setPurity(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {Object.keys(GOLD_RATES).map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          {[
            { label: 'LTV Ratio (%)', val: ltv, set: setLtv },
            { label: 'Interest Rate (% per annum)', val: rate, set: setRate },
            { label: 'Loan Tenure (months)', val: months, set: setMonths },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-amber-500 text-white text-[14px] font-medium hover:bg-amber-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate Gold Loan
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-amber-500">₹{result.goldValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Gold Market Value</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">₹{result.loanAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Loan Amount ({result.ltv}% LTV)</div>
            </div>
          </div>
          <div className="space-y-2 text-[14px]">
            {[
              { label: 'Monthly EMI', val: `₹${result.emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
              { label: 'Total Interest Cost', val: `₹${result.totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
              { label: 'Total Amount Payable', val: `₹${result.totalPayable.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between border-b border-base py-1.5 last:border-0">
                <span className="text-[color:var(--text-muted)]">{label}</span>
                <span className="font-medium text-[color:var(--text)]">{val}</span>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-[color:var(--text-muted)]">RBI caps LTV at 75% for gold loans. Rates use indicative market price — actual gold rate varies daily. Check with your lender for exact valuations.</p>
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
