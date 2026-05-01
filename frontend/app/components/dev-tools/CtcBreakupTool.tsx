'use client';
import React, { useState } from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';

export default function CtcBreakupTool() {
  const [ctc, setCtc] = useState('1200000');
  const [basicPct, setBasicPct] = useState('45');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const annual = parseFloat(ctc) || 0;
    const bPct = parseFloat(basicPct) / 100 || 0.45;
    const basic = annual * bPct;
    const hra = basic * 0.5;
    const empPf = basic * 0.12;
    const empPfEmployer = basic * 0.12;
    const gratuity = basic * 0.0481;
    const insurance = 15000;
    const specialAllowance = annual - basic - hra - empPfEmployer - gratuity - insurance;
    const grossMonthly = (basic + hra + Math.max(0, specialAllowance)) / 12;
    const pfDeductMonthly = empPf / 12;
    const pt = 200;
    const inHandMonthly = grossMonthly - pfDeductMonthly - pt;
    setResult({ annual, basic: basic / 12, hra: hra / 12, special: Math.max(0, specialAllowance) / 12, empPf: empPf / 12, empPfEmployer: empPfEmployer / 12, gratuity: gratuity / 12, insurance: insurance / 12, grossMonthly, pfDeductMonthly, pt, inHandMonthly });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> CTC Breakup Tool
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Break down your Cost to Company into every salary component and find your actual monthly in-hand amount.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Annual CTC (₹)</label>
            <input type="number" value={ctc} onChange={e => setCtc(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Basic Salary % of CTC</label>
            <input type="number" value={basicPct} onChange={e => setBasicPct(e.target.value)} min="30" max="70"
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate Breakup
        </button>
      </div>

      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <h3 className="text-[15px] font-semibold text-[color:var(--text)]">Monthly Breakup</h3>
          <div className="space-y-2 text-[14px]">
            {[
              { label: 'Basic Salary', val: result.basic, note: '' },
              { label: 'HRA (50% of Basic)', val: result.hra, note: '' },
              { label: 'Special Allowance', val: result.special, note: '' },
              { label: '─ Employee PF (12% of Basic)', val: -result.pfDeductMonthly, note: 'deducted from gross' },
              { label: '─ Professional Tax', val: -result.pt, note: 'deducted' },
            ].map(({ label, val, note }) => (
              <div key={label} className="flex justify-between items-center py-1.5 border-b border-base last:border-0">
                <span className="text-[color:var(--text-muted)]">{label} {note && <span className="text-[11px] text-amber-500">({note})</span>}</span>
                <span className={`font-medium ${val < 0 ? 'text-red-500' : 'text-[color:var(--text)]'}`}>₹{Math.abs(val).toFixed(0)}</span>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <div className="text-3xl font-bold text-emerald-500">₹{result.inHandMonthly.toFixed(0)}</div>
            <div className="text-[13px] text-[color:var(--text-muted)] mt-1">Monthly In-Hand (before Income Tax)</div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-[12px]">
            <div className="bg-page border border-base rounded-lg p-3">
              <div className="font-medium text-[color:var(--text)]">Employer PF (hidden cost)</div>
              <div className="text-amber-500 font-bold text-[16px] mt-1">₹{result.empPfEmployer.toFixed(0)}/mo</div>
              <div className="text-[color:var(--text-muted)]">Part of CTC but not your take-home</div>
            </div>
            <div className="bg-page border border-base rounded-lg p-3">
              <div className="font-medium text-[color:var(--text)]">Gratuity Provision</div>
              <div className="text-amber-500 font-bold text-[16px] mt-1">₹{result.gratuity.toFixed(0)}/mo</div>
              <div className="text-[color:var(--text-muted)]">Paid only after 5 years of service</div>
            </div>
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
