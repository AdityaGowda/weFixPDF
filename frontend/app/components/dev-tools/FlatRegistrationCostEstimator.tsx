'use client';
import React, { useState } from 'react';
import { TrendingUp, IndianRupee } from 'lucide-react';

const STAMP_DUTY: Record<string, number> = {
  'Maharashtra': 5, 'Karnataka': 5.6, 'Delhi': 4, 'Tamil Nadu': 7,
  'Uttar Pradesh': 7, 'Gujarat': 4.9, 'Rajasthan': 6, 'Telangana': 5,
  'Andhra Pradesh': 5, 'Haryana': 5, 'Madhya Pradesh': 7.5, 'Kerala': 8,
};

export default function FlatRegistrationCostEstimator() {
  const [price, setPrice] = useState('8000000');
  const [state, setState] = useState('Maharashtra');
  const [genderBenefit, setGenderBenefit] = useState(false);
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const p = parseFloat(price) || 0;
    let stampRate = STAMP_DUTY[state] ?? 5;
    if (genderBenefit) stampRate -= 1;
    const stampDuty = (p * stampRate) / 100;
    const regFee = Math.min(30000, p * 0.01);
    const legalCharges = 15000;
    const total = stampDuty + regFee + legalCharges;
    setResult({ p, stampDuty, stampRate, regFee, legalCharges, total });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> Flat Registration Cost Estimator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Estimate stamp duty and registration charges for buying a flat in India. Rates vary by state.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Property Value (₹)</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">State</label>
            <select value={state} onChange={e => setState(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {Object.keys(STAMP_DUTY).map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-[14px] text-[color:var(--text)]">
            <input type="checkbox" checked={genderBenefit} onChange={e => setGenderBenefit(e.target.checked)} className="w-4 h-4 rounded" />
            Property registered in woman&apos;s name (1% concession in many states)
          </label>
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Estimate Registration Cost
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="space-y-2 text-[14px]">
            {[
              { label: `Stamp Duty (${result.stampRate}%)`, val: `₹${result.stampDuty.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
              { label: 'Registration Fee (1%, max ₹30K)', val: `₹${result.regFee.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
              { label: 'Legal / Documentation Charges', val: '₹15,000' },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between border-b border-base py-1.5 last:border-0">
                <span className="text-[color:var(--text-muted)]">{label}</span>
                <span className="font-medium text-[color:var(--text)]">{val}</span>
              </div>
            ))}
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-500">₹{result.total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
            <div className="text-[13px] text-[color:var(--text-muted)] mt-1">Total Registration Cost ({((result.total / result.p) * 100).toFixed(1)}% of property value)</div>
          </div>
          <p className="text-[12px] text-[color:var(--text-muted)]">Rates are indicative. Stamp duty is updated periodically. Always verify current rates with the state government or your lawyer before finalizing.</p>
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
