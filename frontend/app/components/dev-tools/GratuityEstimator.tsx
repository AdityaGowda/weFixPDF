'use client';
import React, { useState } from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';

export default function GratuityEstimator() {
  const [basicDa, setBasicDa] = useState('45000');
  const [years, setYears] = useState('6');
  const [months, setMonths] = useState('4');
  const [empType, setEmpType] = useState('private');
  const [result, setResult] = useState<Record<string, number | boolean | string> | null>(null);

  const calc = () => {
    const bd = parseFloat(basicDa) || 0;
    const y = parseFloat(years) || 0;
    const m = parseFloat(months) || 0;
    const totalMonths = y * 12 + m;
    const totalYears = totalMonths / 12;

    // Eligibility: 4 years 240 days (private, 6-day week) ≈ 4.66 years
    const eligible = totalYears >= 5 || (totalYears >= 4.66);
    const roundedYears = m >= 6 ? y + 1 : y;
    const gratuity = (bd / 26) * 15 * roundedYears;
    const exemptLimit = 2000000; // ₹20 lakhs
    const taxable = empType === 'private' ? Math.max(0, gratuity - exemptLimit) : 0;
    const tds = taxable > 0 ? taxable * 0.1 : 0;

    setResult({ eligible, gratuity, roundedYears, taxable, tds, exemptLimit, bd, empType });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> Gratuity Estimator India
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Calculate your gratuity entitlement under the Payment of Gratuity Act 1972. Check eligibility and tax treatment.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Last Basic Salary + DA (₹/month)</label>
            <input type="number" value={basicDa} onChange={e => setBasicDa(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Years of Service</label>
            <input type="number" value={years} onChange={e => setYears(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Additional Months</label>
            <input type="number" value={months} onChange={e => setMonths(e.target.value)} min="0" max="11"
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
          <div className="col-span-2">
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Employment Type</label>
            <select value={empType} onChange={e => setEmpType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              <option value="private">Private Sector</option>
              <option value="govt">Government / PSU</option>
            </select>
          </div>
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate Gratuity
        </button>
      </div>

      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`p-3 rounded-lg text-[13px] font-medium border ${result.eligible ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-600'}`}>
            {result.eligible ? '✓ Eligible for Gratuity (5+ years or 4 years 240 days rule met)' : '✗ Not yet eligible. Need 5 years (or 4 years 240 days for 6-day week employers).'}
          </div>
          {result.eligible && (
            <>
              <div className="text-center p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <div className="text-4xl font-bold text-emerald-500">₹{(result.gratuity as number).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
                <div className="text-[13px] text-[color:var(--text-muted)] mt-1">Gratuity Amount (Formula: Basic×15/26×{result.roundedYears} years)</div>
              </div>
              <div className="space-y-2 text-[13px]">
                {[
                  { label: 'Exempt under Sec 10(10)', val: result.empType === 'govt' ? 'Fully Exempt (Govt)' : `₹${Math.min(result.gratuity as number, result.exemptLimit as number).toLocaleString('en-IN', { maximumFractionDigits: 0 })} (up to ₹20L)` },
                  { label: 'Taxable Portion', val: `₹${(result.taxable as number).toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
                  { label: 'Estimated TDS (10%)', val: `₹${(result.tds as number).toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between border-b border-base py-1.5 last:border-0">
                    <span className="text-[color:var(--text-muted)]">{label}</span>
                    <span className="font-medium text-[color:var(--text)]">{val}</span>
                  </div>
                ))}
              </div>
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
