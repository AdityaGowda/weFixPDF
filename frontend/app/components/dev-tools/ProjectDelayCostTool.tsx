'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function ProjectDelayCostTool() {
  const [teamSize, setTeamSize] = useState('5');
  const [avgSalary, setAvgSalary] = useState('80000');
  const [delayDays, setDelayDays] = useState('14');
  const [revenuePerDay, setRevenuePerDay] = useState('25000');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const ts = parseInt(teamSize) || 0;
    const as = parseFloat(avgSalary) || 0;
    const dd = parseInt(delayDays) || 0;
    const rpd = parseFloat(revenuePerDay) || 0;
    const dailySalaryCost = (ts * as) / 22;
    const laborCost = dailySalaryCost * dd;
    const revenueLost = rpd * dd;
    const overheadCost = laborCost * 0.2;
    const totalCost = laborCost + revenueLost + overheadCost;
    setResult({ laborCost, revenueLost, overheadCost, totalCost, dailySalaryCost, dd });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Project Delay Cost Tool</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Calculate the financial cost of project delays including team salary burn, lost revenue, and overhead.</p>
        <div className="grid grid-cols-2 gap-4">
          {[{ label: 'Team Size', val: teamSize, set: setTeamSize }, { label: 'Avg Monthly Salary (₹)', val: avgSalary, set: setAvgSalary }, { label: 'Delay (Working Days)', val: delayDays, set: setDelayDays }, { label: 'Expected Revenue Per Day (₹)', val: revenuePerDay, set: setRevenuePerDay }].map(({ label, val, set }) => (
            <div key={label}><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Calculate Delay Cost</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <div className="text-4xl font-bold text-red-500">₹{result.totalCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
            <div className="text-[13px] text-[color:var(--text-muted)] mt-1">Total Cost of {result.dd}-Day Delay</div>
          </div>
          <div className="space-y-2 text-[13px]">
            {[{ l: 'Team Labor Cost', v: result.laborCost }, { l: 'Revenue Opportunity Lost', v: result.revenueLost }, { l: 'Overhead & Infra (20% est.)', v: result.overheadCost }, { l: 'Daily Salary Burn Rate', v: result.dailySalaryCost }].map(({ l, v }) => (
              <div key={l} className="flex justify-between border-b border-base py-1.5 last:border-0">
                <span className="text-[color:var(--text-muted)]">{l}</span><span className="font-medium text-[color:var(--text)]">₹{v.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-[color:var(--text-muted)]">Use this in sprint planning to justify buffer time. Prevent delays with weekly check-ins, clear Definition of Done, and dependency tracking.</p>
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
