'use client';
import React, { useState } from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';

const TAX_SLABS_NEW = [
  { limit: 300000, rate: 0 }, { limit: 600000, rate: 5 }, { limit: 900000, rate: 10 },
  { limit: 1200000, rate: 15 }, { limit: 1500000, rate: 20 }, { limit: Infinity, rate: 30 },
];

function calcTax(income: number): number {
  let tax = 0; let prev = 0;
  for (const slab of TAX_SLABS_NEW) {
    if (income <= prev) break;
    const taxable = Math.min(income, slab.limit) - prev;
    tax += (taxable * slab.rate) / 100;
    prev = slab.limit;
  }
  if (income <= 700000) tax = 0;
  const cess = tax * 0.04;
  return tax + cess;
}

export default function YoutubeIncomeTaxIndia() {
  const [monthly, setMonthly] = useState('80000');
  const [tds, setTds] = useState('');
  const [regime, setRegime] = useState('new');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const annual = (parseFloat(monthly) || 0) * 12;
    const tdsDeducted = parseFloat(tds) || annual * 0.1;
    const tax = calcTax(annual);
    const balance = tax - tdsDeducted;
    setResult({ annual, tax, tdsDeducted, balance, effectiveRate: annual > 0 ? (tax / annual) * 100 : 0 });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-red-500" /> YouTube Income Tax Calculator India
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Calculate your income tax liability on YouTube AdSense earnings in India. Includes TDS deducted by Google and Section 87A rebate.
        </p>
        <div className="flex rounded-lg border border-base overflow-hidden mb-4">
          {[{ val: 'new', label: 'New Tax Regime' }, { val: 'old', label: 'Old Tax Regime' }].map(({ val, label }) => (
            <button key={val} onClick={() => setRegime(val)}
              className={`flex-1 py-2 text-[14px] font-medium transition-colors ${regime === val ? 'bg-blue-500 text-white' : 'text-[color:var(--text-muted)]'}`}>
              {label}
            </button>
          ))}
        </div>
        {regime === 'old' && <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-[13px] text-amber-700 dark:text-amber-400">Old regime calculator shown below uses New Regime rates as a baseline. For old regime with deductions, consult a CA.</div>}
        <div className="space-y-4">
          {[
            { label: 'Monthly YouTube Earnings (₹)', val: monthly, set: setMonthly },
            { label: 'TDS Already Deducted (₹, optional)', val: tds, set: setTds, placeholder: 'Leave blank to auto-calculate at 10%' },
          ].map(({ label, val, set, placeholder }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)} placeholder={placeholder}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate Tax
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="space-y-2 text-[14px]">
            {[
              { label: 'Annual Gross Income', val: `₹${result.annual.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
              { label: 'Total Tax + Cess (4%)', val: `₹${result.tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
              { label: 'TDS Already Deducted', val: `₹${result.tdsDeducted.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
              { label: 'Effective Tax Rate', val: `${result.effectiveRate.toFixed(1)}%` },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between border-b border-base py-1.5 last:border-0">
                <span className="text-[color:var(--text-muted)]">{label}</span>
                <span className="font-medium text-[color:var(--text)]">{val}</span>
              </div>
            ))}
          </div>
          <div className={`p-4 rounded-xl text-center border ${result.balance > 0 ? 'bg-red-500/10 border-red-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
            <div className={`text-3xl font-bold ${result.balance > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
              {result.balance > 0 ? `Pay ₹${result.balance.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` : `Refund ₹${Math.abs(result.balance).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`}
            </div>
            <div className="text-[13px] text-[color:var(--text-muted)] mt-1">{result.balance > 0 ? 'Additional tax due at filing' : 'Expected ITR refund'}</div>
          </div>
          {result.annual <= 700000 && result.tax === 0 && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg text-[13px] text-emerald-600 dark:text-emerald-400">
              ✓ Section 87A rebate applies — income below ₹7 lakhs is tax-free under the New Regime!
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
