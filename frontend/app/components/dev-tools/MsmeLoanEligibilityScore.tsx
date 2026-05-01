'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function MsmeLoanEligibilityScore() {
  const [turnover, setTurnover] = useState('5000000');
  const [yearsOld, setYearsOld] = useState('3');
  const [gstFiling, setGstFiling] = useState('yes');
  const [itrFiling, setItrFiling] = useState('yes');
  const [creditScore, setCreditScore] = useState('720');
  const [existingLoans, setExistingLoans] = useState('0');
  const [result, setResult] = useState<{ score: number; eligible: boolean; maxLoan: number; tips: string[] } | null>(null);

  const calc = () => {
    let score = 0;
    const t = parseFloat(turnover) || 0;
    const y = parseFloat(yearsOld) || 0;
    const cs = parseFloat(creditScore) || 0;
    const el = parseFloat(existingLoans) || 0;
    if (t >= 10000000) score += 25; else if (t >= 5000000) score += 18; else if (t >= 1000000) score += 10;
    if (y >= 5) score += 20; else if (y >= 3) score += 15; else if (y >= 1) score += 8;
    if (gstFiling === 'yes') score += 15;
    if (itrFiling === 'yes') score += 15;
    if (cs >= 750) score += 20; else if (cs >= 700) score += 15; else if (cs >= 650) score += 8;
    if (el === 0) score += 5; else if (el > 2) score -= 5;
    score = Math.min(100, Math.max(0, score));
    const eligible = score >= 50;
    const maxLoan = t * (score / 100) * 2;
    const tips: string[] = [];
    if (!eligible || score < 70) {
      if (gstFiling !== 'yes') tips.push('File GST returns consistently for 12+ months to improve eligibility.');
      if (itrFiling !== 'yes') tips.push('File ITR for at least 2 consecutive years — mandatory for most MSME loans.');
      if (cs < 700) tips.push('Improve your credit score to 700+ by clearing existing dues and avoiding new inquiries.');
      if (y < 3) tips.push('Most banks require 2–3 years of business vintage. Continue building track record.');
    }
    setResult({ score, eligible, maxLoan, tips });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">MSME Loan Eligibility Score</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Check your MSME business loan eligibility score and maximum loan amount based on real bank parameters.</p>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Annual Turnover (₹)</label>
            <input type="number" value={turnover} onChange={e => setTurnover(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
          <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Years in Business</label>
            <input type="number" value={yearsOld} onChange={e => setYearsOld(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
          <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Credit/CIBIL Score</label>
            <input type="number" value={creditScore} onChange={e => setCreditScore(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
          <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Existing Active Loans</label>
            <input type="number" value={existingLoans} onChange={e => setExistingLoans(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
          <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Filing GST Returns Regularly?</label>
            <select value={gstFiling} onChange={e => setGstFiling(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              <option value="yes">Yes</option><option value="no">No</option></select></div>
          <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Filing ITR?</label>
            <select value={itrFiling} onChange={e => setItrFiling(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              <option value="yes">Yes</option><option value="no">No</option></select></div>
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Check Eligibility</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`text-center p-4 rounded-xl border ${result.eligible ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
            <div className={`text-4xl font-bold ${result.eligible ? 'text-emerald-500' : 'text-red-500'}`}>{result.score}/100</div>
            <div className={`text-[14px] font-semibold mt-1 ${result.eligible ? 'text-emerald-500' : 'text-red-500'}`}>{result.eligible ? '✓ Likely Eligible' : '✗ More Work Needed'}</div>
            {result.eligible && <div className="text-[13px] text-[color:var(--text-muted)] mt-1">Estimated max loan: ₹{result.maxLoan.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>}
          </div>
          {result.tips.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="text-[13px] font-semibold text-[color:var(--text)]">Improvement Tips:</h3>
              {result.tips.map(t => <p key={t} className="text-[13px] text-[color:var(--text-muted)]">• {t}</p>)}
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
