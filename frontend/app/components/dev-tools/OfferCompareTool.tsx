'use client';
import React, { useState } from 'react';
import { TrendingUp, Briefcase } from 'lucide-react';

interface Offer { title: string; ctc: string; basic: string; variable: string; wfh: boolean; location: string; growth: string; }

const EMPTY: Offer = { title: '', ctc: '', basic: '', variable: '', wfh: false, location: '', growth: '' };

export default function OfferCompareTool() {
  const [a, setA] = useState<Offer>({ ...EMPTY, title: 'Offer A' });
  const [b, setB] = useState<Offer>({ ...EMPTY, title: 'Offer B' });
  const [result, setResult] = useState<Record<string, number | string> | null>(null);

  const scoreOffer = (o: Offer) => {
    const ctc = parseFloat(o.ctc) || 0;
    const basic = parseFloat(o.basic) || ctc * 0.4;
    const variable = parseFloat(o.variable) || 0;
    const fixed = ctc - variable;
    const inHand = (fixed * 0.78) / 12;
    const growthScore = { 'High': 30, 'Medium': 20, 'Low': 10 }[o.growth] || 15;
    const wfhBonus = o.wfh ? 15 : 0;
    const score = (fixed / 100000) * 30 + growthScore + wfhBonus;
    return { ctc, fixed, variable, inHand, score };
  };

  const compare = () => {
    const sa = scoreOffer(a);
    const sb = scoreOffer(b);
    const winner = sa.score > sb.score ? 'A' : sb.score > sa.score ? 'B' : 'Tie';
    setResult({ scoreA: sa.score, scoreB: sb.score, inHandA: sa.inHand, inHandB: sb.inHand, fixedA: sa.fixed, fixedB: sb.fixed, winner });
  };

  const field = (label: string, val: string, set: (v: string) => void, type = 'text') => (
    <div key={label}>
      <label className="block text-[12px] text-[color:var(--text-muted)] mb-1">{label}</label>
      <input type={type} value={val} onChange={e => set(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-500" /> Job Offer Compare Tool
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Compare two job offers side-by-side on total comp, in-hand salary, growth potential, and flexibility.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[{ offer: a, set: setA, label: 'Offer A' }, { offer: b, set: setB, label: 'Offer B' }].map(({ offer, set, label }) => (
            <div key={label} className="space-y-3 bg-page border border-base rounded-xl p-4">
              <div className="text-[13px] font-semibold text-blue-500">{label}</div>
              {field('Company / Role', offer.title, v => set({ ...offer, title: v }))}
              {field('Total CTC (₹/year)', offer.ctc, v => set({ ...offer, ctc: v }), 'number')}
              {field('Variable / Bonus (₹/year)', offer.variable, v => set({ ...offer, variable: v }), 'number')}
              <div>
                <label className="block text-[12px] text-[color:var(--text-muted)] mb-1">Growth Potential</label>
                <select value={offer.growth} onChange={e => set({ ...offer, growth: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
                  <option value="">Select...</option>
                  <option value="High">High (fast-growing startup/role)</option>
                  <option value="Medium">Medium (stable company)</option>
                  <option value="Low">Low (limited scope)</option>
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[color:var(--text)]">
                <input type="checkbox" checked={offer.wfh} onChange={e => set({ ...offer, wfh: e.target.checked })} className="w-4 h-4 rounded" />
                Work from Home / Hybrid
              </label>
            </div>
          ))}
        </div>
        <button onClick={compare} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Compare Offers
        </button>
      </div>

      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <div className="text-2xl font-bold text-blue-500">
              {result.winner === 'Tie' ? 'Both offers are roughly equal' : `Offer ${result.winner} looks stronger`}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center text-[13px]">
            {[
              { label: 'Composite Score', valA: (result.scoreA as number).toFixed(1), valB: (result.scoreB as number).toFixed(1) },
              { label: 'Est. Monthly In-Hand', valA: `₹${(result.inHandA as number).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, valB: `₹${(result.inHandB as number).toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
              { label: 'Fixed Component', valA: `₹${(result.fixedA as number).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, valB: `₹${(result.fixedB as number).toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
            ].map(({ label, valA, valB }) => (
              <React.Fragment key={label}>
                <div className="bg-page border border-base rounded-lg p-3 col-span-2">
                  <div className="text-[color:var(--text-muted)] mb-2">{label}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-bold text-blue-500">{valA}</div>
                    <div className="font-bold text-emerald-500">{valB}</div>
                  </div>
                </div>
              </React.Fragment>
            ))}
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
