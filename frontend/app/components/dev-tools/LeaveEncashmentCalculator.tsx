'use client';
import React, { useState } from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';

export default function LeaveEncashmentCalculator() {
  const [basicDa, setBasicDa] = useState('50000');
  const [leaveDays, setLeaveDays] = useState('45');
  const [empType, setEmpType] = useState('private');
  const [result, setResult] = useState<Record<string, number | string | boolean> | null>(null);

  const calc = () => {
    const bd = parseFloat(basicDa) || 0;
    const ld = parseFloat(leaveDays) || 0;
    const daily = bd / 26;
    const encashment = daily * ld;
    const exemptLimit = 2500000; // ₹25L updated Budget 2023
    const exempt = empType === 'govt' ? encashment : Math.min(encashment, exemptLimit);
    const taxable = Math.max(0, encashment - exempt);
    setResult({ bd, ld, daily, encashment, exempt, taxable, empType, formula: `₹${bd.toLocaleString('en-IN')} ÷ 26 × ${ld} days` });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> Leave Encashment Calculator India
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Calculate your earned leave encashment payout on resignation or retirement. Includes Section 10(10AA) tax exemption.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-full">
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Last Basic Salary + DA (₹/month)</label>
            <input type="number" value={basicDa} onChange={e => setBasicDa(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Accumulated Earned Leaves (days)</label>
            <input type="number" value={leaveDays} onChange={e => setLeaveDays(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Employment Type</label>
            <select value={empType} onChange={e => setEmpType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              <option value="private">Private Sector</option>
              <option value="govt">Government / PSU</option>
            </select>
          </div>
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate Payout
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="text-center p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <div className="text-4xl font-bold text-emerald-500">₹{(result.encashment as number).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
            <div className="text-[13px] text-[color:var(--text-muted)] mt-1">Leave Encashment Amount</div>
            <div className="text-[12px] text-[color:var(--text-muted)] mt-0.5">Formula: {result.formula as string}</div>
          </div>
          <div className="space-y-2 text-[14px]">
            {[
              { label: 'Daily Rate (Basic+DA ÷ 26)', val: `₹${(result.daily as number).toFixed(2)}` },
              { label: 'Tax Exempt (Sec 10(10AA))', val: result.empType === 'govt' ? 'Fully Exempt' : `₹${(result.exempt as number).toLocaleString('en-IN', { maximumFractionDigits: 0 })} (up to ₹25L)` },
              { label: 'Taxable Amount', val: `₹${(result.taxable as number).toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between border-b border-base py-1.5 last:border-0">
                <span className="text-[color:var(--text-muted)]">{label}</span>
                <span className="font-medium text-[color:var(--text)]">{val}</span>
              </div>
            ))}
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-[12px] text-blue-600 dark:text-blue-400">
            Budget 2023 raised the private sector tax-free limit from ₹3 lakhs to ₹25 lakhs. Most employees will now receive their full leave encashment tax-free.
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
