'use client';
import React, { useState } from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';

const TDS_SECTIONS = [
  { section: '192', label: 'Salary', threshold: 0, rate: 'Slab Rate', rateNoPan: 20 },
  { section: '194J', label: 'Professional / Technical Fees', threshold: 30000, rate: 10, rateNoPan: 20 },
  { section: '194C (Single)', label: 'Contractor Payment (Single)', threshold: 30000, rate: 1, rateNoMan: 2, rateNoMan2: 'Company', rateNoMan2val: 2, rateNoPan: 20 },
  { section: '194C (Annual)', label: 'Contractor Payment (Annual)', threshold: 100000, rate: 1, rateNoMan: 2, rateNoPan: 20 },
  { section: '194I(a)', label: 'Rent – Plant & Machinery', threshold: 240000, rate: 2, rateNoMan: 2, rateNoPan: 20 },
  { section: '194I(b)', label: 'Rent – Land, Building, Furniture', threshold: 240000, rate: 10, rateNoMan: 10, rateNoPan: 20 },
  { section: '194IB', label: 'Rent paid by Individual/HUF (>₹50K/mo)', threshold: 50000, rate: 5, rateNoMan: 5, rateNoPan: 20 },
  { section: '194A', label: 'Interest (Bank / Other)', threshold: 40000, rate: 10, rateNoMan: 10, rateNoPan: 20 },
];

export default function TdsCalculatorIndia() {
  const [sectionIdx, setSectionIdx] = useState(1);
  const [amount, setAmount] = useState('50000');
  const [hasPan, setHasPan] = useState(true);
  const [isCompany, setIsCompany] = useState(false);
  const [result, setResult] = useState<Record<string, number | boolean | string> | null>(null);

  const calc = () => {
    const sec = TDS_SECTIONS[sectionIdx];
    const amt = parseFloat(amount) || 0;
    if (amt <= sec.threshold && sec.threshold > 0) {
      setResult({ applicable: false, threshold: sec.threshold, section: sec.section });
      return;
    }
    let rate: number;
    if (!hasPan) rate = 20;
    else if (sec.section.startsWith('194C') && isCompany) rate = 2;
    else rate = typeof sec.rate === 'number' ? sec.rate : 30;
    const tds = (amt * rate) / 100;
    setResult({ applicable: true, amt, rate, tds, net: amt - tds, section: sec.section, label: sec.label });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> TDS Calculator India
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Calculate TDS deductible on salary, professional fees, rent, contractor payments, and interest.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Payment Type</label>
            <select value={sectionIdx} onChange={e => setSectionIdx(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {TDS_SECTIONS.map((s, i) => <option key={i} value={i}>Section {s.section} – {s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Payment Amount (₹)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-[14px] text-[color:var(--text)]">
              <input type="checkbox" checked={hasPan} onChange={e => setHasPan(e.target.checked)} className="w-4 h-4 rounded" />
              Deductee has PAN
            </label>
            {TDS_SECTIONS[sectionIdx].section.startsWith('194C') && (
              <label className="flex items-center gap-2 cursor-pointer text-[14px] text-[color:var(--text)]">
                <input type="checkbox" checked={isCompany} onChange={e => setIsCompany(e.target.checked)} className="w-4 h-4 rounded" />
                Deductee is a Company
              </label>
            )}
          </div>
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate TDS
        </button>
      </div>

      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          {!result.applicable ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg text-[14px] text-emerald-600 dark:text-emerald-400">
              ✓ TDS not applicable — payment (₹{parseFloat(amount).toLocaleString('en-IN')}) is below Section {result.section} threshold of ₹{(result.threshold as number).toLocaleString('en-IN')}.
            </div>
          ) : (
            <>
              <div className="space-y-2 text-[14px]">
                {[
                  { label: 'Payment Amount', val: `₹${(result.amt as number).toLocaleString('en-IN')}` },
                  { label: `TDS Rate (Sec ${result.section})`, val: `${result.rate}%` },
                  { label: 'TDS Amount to Deduct', val: `₹${(result.tds as number).toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
                  { label: 'Net Amount to Pay', val: `₹${(result.net as number).toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between border-b border-base py-1.5 last:border-0">
                    <span className="text-[color:var(--text-muted)]">{label}</span>
                    <span className="font-semibold text-[color:var(--text)]">{val}</span>
                  </div>
                ))}
              </div>
              {!hasPan && (
                <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-[13px] text-amber-700 dark:text-amber-400">
                  <strong>No PAN:</strong> TDS is deducted at 20% (or applicable rate, whichever is higher) when the deductee does not provide a valid PAN.
                </div>
              )}
            </>
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
