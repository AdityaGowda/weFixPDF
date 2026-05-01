'use client';
import React, { useState } from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';

export default function ChitFundReturnCalculator() {
  const [chitValue, setChitValue] = useState('100000');
  const [members, setMembers] = useState('20');
  const [commission, setCommission] = useState('5');
  const [wonMonth, setWonMonth] = useState('10');
  const [result, setResult] = useState<Record<string, number | string> | null>(null);

  const calc = () => {
    const cv = parseFloat(chitValue) || 0;
    const m = parseFloat(members) || 0;
    const comm = parseFloat(commission) / 100 || 0;
    const wm = parseFloat(wonMonth) || 0;
    const monthlySubscription = cv / m;
    const foremanCommission = cv * comm;
    const dividendPerMonth = foremanCommission / m;
    const totalPaid = monthlySubscription * m;
    const prizeReceived = cv - foremanCommission - (monthlySubscription * wm);
    const totalReceived = prizeReceived + (dividendPerMonth * (m - wm));
    const profit = totalReceived - totalPaid + (monthlySubscription * wm);
    const annualReturn = m > 0 ? (profit / totalPaid) * (12 / m) * 100 : 0;

    setResult({
      monthlySubscription, foremanCommission, dividendPerMonth,
      prizeReceived, totalPaid, profit: totalPaid - totalPaid + (cv - foremanCommission),
      annualReturn: annualReturn.toFixed(1),
      netChitAmount: cv - foremanCommission,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> Chit Fund Return Calculator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Calculate the real return on your chit fund investment. Compare against FD rates to make an informed decision.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Chit Value (₹)', val: chitValue, set: setChitValue },
            { label: 'Number of Members', val: members, set: setMembers },
            { label: 'Foreman Commission (%)', val: commission, set: setCommission },
            { label: 'Month You Win the Bid', val: wonMonth, set: setWonMonth },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate Returns
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <h3 className="text-[15px] font-semibold text-[color:var(--text)]">Chit Fund Analysis</h3>
          <div className="space-y-2 text-[14px]">
            {[
              { label: 'Monthly Subscription', val: `₹${(result.monthlySubscription as number).toFixed(0)}` },
              { label: 'Foreman Commission', val: `₹${(result.foremanCommission as number).toFixed(0)}` },
              { label: 'Net Chit Amount (after commission)', val: `₹${(result.netChitAmount as number).toFixed(0)}` },
              { label: 'Monthly Dividend per Member', val: `₹${(result.dividendPerMonth as number).toFixed(2)}` },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between border-b border-base py-1.5 last:border-0">
                <span className="text-[color:var(--text-muted)]">{label}</span>
                <span className="font-medium text-[color:var(--text)]">{val}</span>
              </div>
            ))}
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-500">{result.annualReturn as string}%</div>
            <div className="text-[13px] text-[color:var(--text-muted)] mt-1">Estimated Annualized Return</div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-[12px] text-amber-700 dark:text-amber-400">
            <strong>Note:</strong> Only join SEBI/state-registered chit funds. Unregistered chits are illegal and high-risk. Returns vary based on actual auction bids each month.
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
