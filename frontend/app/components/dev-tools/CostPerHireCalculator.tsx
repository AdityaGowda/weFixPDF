'use client';
import React, { useState } from 'react';
import { TrendingUp, IndianRupee } from 'lucide-react';

export default function CostPerHireCalculator() {
  const [jobAds, setJobAds] = useState('8000');
  const [recruiterTime, setRecruiterTime] = useState('25000');
  const [interviewTime, setInterviewTime] = useState('15000');
  const [bgVerify, setBgVerify] = useState('3000');
  const [onboarding, setOnboarding] = useState('10000');
  const [offers, setOffers] = useState('3');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const totalCost = [jobAds, recruiterTime, interviewTime, bgVerify, onboarding].reduce((s, v) => s + (parseFloat(v) || 0), 0);
    const hires = parseFloat(offers) || 1;
    const perHire = totalCost / hires;
    setResult({ totalCost, perHire, hires });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> Cost Per Hire Calculator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Calculate the total recruitment cost per hire including advertising, recruiter time, interview hours, and onboarding.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Job Advertising / Naukri / LinkedIn Ads (₹)', val: jobAds, set: setJobAds },
            { label: 'Recruiter Time Cost (₹)', val: recruiterTime, set: setRecruiterTime },
            { label: 'Interview Panel Time Cost (₹)', val: interviewTime, set: setInterviewTime },
            { label: 'Background Verification (₹)', val: bgVerify, set: setBgVerify },
            { label: 'Onboarding / Training Cost (₹)', val: onboarding, set: setOnboarding },
            { label: 'Total Positions Filled', val: offers, set: setOffers },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate Cost Per Hire
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4 text-center">
          <div className="text-5xl font-bold text-blue-500">₹{result.perHire.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          <div className="text-[14px] text-[color:var(--text-muted)]">Cost Per Hire ({result.hires} position{result.hires > 1 ? 's' : ''} filled)</div>
          <div className="text-[13px] text-[color:var(--text-muted)]">Total Recruitment Spend: <span className="font-semibold text-[color:var(--text)]">₹{result.totalCost.toLocaleString('en-IN')}</span></div>
          <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-[12px] text-blue-600 dark:text-blue-400 text-left">
            Industry benchmark: CPH in India ranges from ₹15,000 for blue-collar to ₹2–5 lakh for senior tech hires. High CPH signals inefficient sourcing channels.
          </div>
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
