'use client';
import React, { useState } from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';

export default function EmiVsRentCalculator() {
  const [propPrice, setPropPrice] = useState('8000000');
  const [downPayment, setDownPayment] = useState('1600000');
  const [loanRate, setLoanRate] = useState('9');
  const [tenure, setTenure] = useState('20');
  const [monthlyRent, setMonthlyRent] = useState('25000');
  const [rentGrowth, setRentGrowth] = useState('5');
  const [investReturn, setInvestReturn] = useState('12');
  const [result, setResult] = useState<Record<string, number | string> | null>(null);

  const calc = () => {
    const P = parseFloat(propPrice) - parseFloat(downPayment);
    const r = parseFloat(loanRate) / 100 / 12;
    const n = parseFloat(tenure) * 12;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = emi * n + parseFloat(downPayment);
    const totalInterest = totalPaid - parseFloat(propPrice);

    // What if you rented and invested the difference?
    const monthlyInvest = emi - parseFloat(monthlyRent);
    const monthlyReturn = parseFloat(investReturn) / 100 / 12;
    let corpus = 0;
    let currentRent = parseFloat(monthlyRent);
    const rentGr = parseFloat(rentGrowth) / 100 / 12;
    for (let i = 0; i < n; i++) {
      const investAmt = emi - currentRent;
      if (investAmt > 0) corpus = (corpus + investAmt) * (1 + monthlyReturn);
      currentRent *= (1 + rentGr);
    }

    const propAppreciation = parseFloat(propPrice) * Math.pow(1.06, parseFloat(tenure));
    const buyNetWealth = propAppreciation - totalInterest;
    const rentNetWealth = corpus;
    const verdict = buyNetWealth > rentNetWealth ? 'Buy' : 'Rent + Invest';

    setResult({
      emi: emi.toFixed(0), totalPaid: totalPaid.toFixed(0), totalInterest: totalInterest.toFixed(0),
      corpus: corpus.toFixed(0), propAppreciation: propAppreciation.toFixed(0),
      buyNetWealth: buyNetWealth.toFixed(0), rentNetWealth: rentNetWealth.toFixed(0), verdict,
      monthlyInvest: monthlyInvest.toFixed(0),
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> EMI vs Rent Calculator India
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Compare the true long-term wealth impact of buying a home with EMI versus renting and investing the difference.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Property Price (₹)', val: propPrice, set: setPropPrice },
            { label: 'Down Payment (₹)', val: downPayment, set: setDownPayment },
            { label: 'Home Loan Rate (%)', val: loanRate, set: setLoanRate },
            { label: 'Loan Tenure (years)', val: tenure, set: setTenure },
            { label: 'Current Monthly Rent (₹)', val: monthlyRent, set: setMonthlyRent },
            { label: 'Annual Rent Growth (%)', val: rentGrowth, set: setRentGrowth },
            { label: 'Investment Return if Renting (%)', val: investReturn, set: setInvestReturn },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Compare Buy vs Rent
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`p-5 rounded-xl text-center border ${result.verdict === 'Buy' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
            <div className={`text-3xl font-bold ${result.verdict === 'Buy' ? 'text-blue-500' : 'text-emerald-500'}`}>
              {result.verdict as string} wins
            </div>
            <div className="text-[13px] text-[color:var(--text-muted)] mt-1">Based on {tenure}-year projection with 6% property appreciation</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-page border border-base rounded-xl p-4">
              <div className="text-[13px] font-semibold text-blue-500 mb-3">🏠 If You Buy</div>
              <div className="space-y-1.5 text-[13px]">
                <div className="flex justify-between"><span className="text-[color:var(--text-muted)]">Monthly EMI</span><span className="font-medium">₹{(result.emi as string)}</span></div>
                <div className="flex justify-between"><span className="text-[color:var(--text-muted)]">Total Interest</span><span className="text-red-500 font-medium">₹{parseInt(result.totalInterest as string).toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span className="text-[color:var(--text-muted)]">Property Value</span><span className="text-emerald-500 font-medium">₹{parseInt(result.propAppreciation as string).toLocaleString('en-IN')}</span></div>
              </div>
            </div>
            <div className="bg-page border border-base rounded-xl p-4">
              <div className="text-[13px] font-semibold text-emerald-500 mb-3">🏢 If You Rent</div>
              <div className="space-y-1.5 text-[13px]">
                <div className="flex justify-between"><span className="text-[color:var(--text-muted)]">Monthly Invest</span><span className="font-medium">₹{(result.monthlyInvest as string)}</span></div>
                <div className="flex justify-between"><span className="text-[color:var(--text-muted)]">Investment Corpus</span><span className="text-emerald-500 font-medium">₹{parseInt(result.corpus as string).toLocaleString('en-IN')}</span></div>
              </div>
            </div>
          </div>
          <p className="text-[12px] text-[color:var(--text-muted)]">Assumes 6% annual property appreciation. Results vary significantly by city, loan rate, and actual investment returns.</p>
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
