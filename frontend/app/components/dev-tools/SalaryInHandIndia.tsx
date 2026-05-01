'use client';

import React, { useState } from 'react';
import { IndianRupee, Calculator, Info } from 'lucide-react';

export default function SalaryInHandIndia() {
  const [ctc, setCtc] = useState<number | ''>(600000);
  const [basicPercent, setBasicPercent] = useState<number>(50);
  const [pfEnabled, setPfEnabled] = useState<boolean>(true);
  const [ptEnabled, setPtEnabled] = useState<boolean>(true);
  const [taxRegime, setTaxRegime] = useState<'new' | 'old'>('new');

  const calculateSalary = () => {
    const annualCTC = Number(ctc) || 0;
    const basic = (annualCTC * basicPercent) / 100;
    
    // Monthly calculations
    const monthlyGross = annualCTC / 12;
    const monthlyBasic = basic / 12;

    // Deductions
    // PF is usually 12% of Basic
    const employeePF = pfEnabled ? (monthlyBasic * 0.12) : 0;
    // Employer PF is part of CTC in most Indian companies, so we deduct it from Gross to get Monthly Gross available
    const employerPF = pfEnabled ? (monthlyBasic * 0.12) : 0;
    
    // Professional Tax (Standard 200/month approx in most states)
    const professionalTax = ptEnabled ? 200 : 0;

    // Approximate Income Tax (simplified for demonstration)
    // New Regime has standard deduction of 50k
    let taxableIncome = annualCTC - 50000;
    if (taxRegime === 'old') {
      // Very basic old regime assumption (1.5L 80C + 50k SD)
      taxableIncome = annualCTC - 200000;
    }
    
    let annualTax = 0;
    if (taxableIncome > 700000 && taxRegime === 'new') {
      // Extremely simplified tax bracket calculation
      annualTax = (taxableIncome - 700000) * 0.1 + 25000; 
    } else if (taxableIncome > 500000 && taxRegime === 'old') {
      annualTax = (taxableIncome - 500000) * 0.2 + 12500;
    }
    
    const monthlyTax = Math.max(0, annualTax / 12);

    // Final in-hand
    // Note: CTC = Gross + Employer PF. So Gross = CTC - Employer PF
    const actualMonthlyGross = monthlyGross - employerPF;
    const totalDeductions = employeePF + professionalTax + monthlyTax;
    const inHand = actualMonthlyGross - totalDeductions;

    return {
      monthlyGross: actualMonthlyGross,
      employeePF,
      employerPF,
      professionalTax,
      monthlyTax,
      totalDeductions,
      inHand,
    };
  };

  const results = calculateSalary();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="bg-card border border-base p-6 rounded-xl space-y-5">
          <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-500" />
            Salary Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1.5">Annual CTC (₹)</label>
              <input
                type="number"
                value={ctc}
                onChange={(e) => setCtc(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1.5">
                Basic Salary (% of CTC) : {basicPercent}%
              </label>
              <input
                type="range"
                min="30"
                max="60"
                value={basicPercent}
                onChange={(e) => setBasicPercent(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-[14px] text-[color:var(--text)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={pfEnabled}
                  onChange={(e) => setPfEnabled(e.target.checked)}
                  className="accent-emerald-500"
                />
                Include EPF (12%)
              </label>
              <label className="flex items-center gap-2 text-[14px] text-[color:var(--text)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={ptEnabled}
                  onChange={(e) => setPtEnabled(e.target.checked)}
                  className="accent-emerald-500"
                />
                Include PT (₹200/mo)
              </label>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1.5">Tax Regime Estimation</label>
              <select
                value={taxRegime}
                onChange={(e) => setTaxRegime(e.target.value as 'new' | 'old')}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-emerald-500"
              >
                <option value="new">New Tax Regime (Default)</option>
                <option value="old">Old Tax Regime (Est. 1.5L 80C)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-card border border-base p-6 rounded-xl space-y-5">
          <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-emerald-500" />
            Monthly Breakdown
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-base">
              <span className="text-[14px] text-[color:var(--text-muted)]">Monthly Gross (Pre-Tax)</span>
              <span className="text-[15px] font-medium text-[color:var(--text)]">
                ₹{Math.round(results.monthlyGross).toLocaleString('en-IN')}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-base">
              <span className="text-[14px] text-[color:var(--text-muted)]">Employee PF Deduction</span>
              <span className="text-[15px] font-medium text-red-500">
                - ₹{Math.round(results.employeePF).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-base">
              <span className="text-[14px] text-[color:var(--text-muted)]">Professional Tax (PT)</span>
              <span className="text-[15px] font-medium text-red-500">
                - ₹{Math.round(results.professionalTax).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-base">
              <span className="text-[14px] text-[color:var(--text-muted)]">Estimated Income Tax / mo</span>
              <span className="text-[15px] font-medium text-red-500">
                - ₹{Math.round(results.monthlyTax).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <span className="text-[16px] font-semibold text-[color:var(--text)]">In-Hand Salary</span>
              <span className="text-[24px] font-bold text-emerald-500">
                ₹{Math.round(results.inHand).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg mt-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-emerald-700 dark:text-emerald-400">
              Disclaimer: This is an estimation. Actual salary may vary based on your company's specific CTC structure, LTA, medical allowances, and exact tax declarations.
            </p>
          </div>
        </div>
      </div>
    
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
