'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function PackagingCostOptimizer() {
  const [unitCost, setUnitCost] = useState('45');
  const [units, setUnits] = useState('1000');
  const [weight, setWeight] = useState('200');
  const [shippingRate, setShippingRate] = useState('50');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const uc = parseFloat(unitCost) || 0;
    const u = parseInt(units) || 0;
    const w = parseFloat(weight) || 0;
    const sr = parseFloat(shippingRate) || 0;
    const totalPackagingCost = uc * u;
    const shippingCostPerUnit = (w / 1000) * sr;
    const totalShippingCost = shippingCostPerUnit * u;
    const totalCost = totalPackagingCost + totalShippingCost;
    const savedIfReducedBy10Pct = totalPackagingCost * 0.1;
    const savedIfWeight5Pct = shippingCostPerUnit * u * 0.05;
    setResult({ totalPackagingCost, shippingCostPerUnit, totalShippingCost, totalCost, perUnit: totalCost / u, savedIfReducedBy10Pct, savedIfWeight5Pct });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Packaging Cost Optimizer</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Calculate total packaging and shipping costs and find quick-win optimization opportunities.</p>
        <div className="grid grid-cols-2 gap-4">
          {[{ label: 'Packaging Cost Per Unit (₹)', val: unitCost, set: setUnitCost }, { label: 'Units Per Month', val: units, set: setUnits }, { label: 'Package Weight (grams)', val: weight, set: setWeight }, { label: 'Courier Rate Per Kg (₹)', val: shippingRate, set: setShippingRate }].map(({ label, val, set }) => (
            <div key={label}><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Optimize Costs</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">₹{result.totalCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Monthly Total Cost</div>
            </div>
            <div className="bg-page border border-base rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[color:var(--text)]">₹{result.perUnit.toFixed(2)}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Cost Per Unit</div>
            </div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl space-y-2">
            <h3 className="text-[13px] font-semibold text-emerald-600 dark:text-emerald-400">💡 Quick Win Savings</h3>
            <p className="text-[13px] text-[color:var(--text-muted)]">• Reduce packaging cost by 10%: Save ₹{result.savedIfReducedBy10Pct.toLocaleString('en-IN', { maximumFractionDigits: 0 })}/month</p>
            <p className="text-[13px] text-[color:var(--text-muted)]">• Reduce package weight by 5%: Save ₹{result.savedIfWeight5Pct.toLocaleString('en-IN', { maximumFractionDigits: 0 })}/month</p>
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
