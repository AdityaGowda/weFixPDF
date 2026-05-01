'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function RefundImpactCalculator() {
  const [orders, setOrders] = useState('500');
  const [refundRate, setRefundRate] = useState('5');
  const [avgOrderValue, setAvgOrderValue] = useState('1200');
  const [productCost, setProductCost] = useState('450');
  const [restockCost, setRestockCost] = useState('80');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const o = parseInt(orders) || 0;
    const rr = parseFloat(refundRate) / 100;
    const aov = parseFloat(avgOrderValue) || 0;
    const pc = parseFloat(productCost) || 0;
    const rc = parseFloat(restockCost) || 0;
    const refunds = o * rr;
    const revenueImpact = refunds * aov;
    const cogsLost = refunds * pc;
    const restockTotal = refunds * rc;
    const totalImpact = revenueImpact + cogsLost + restockTotal;
    const perRefund = refunds > 0 ? totalImpact / refunds : 0;
    setResult({ refunds, revenueImpact, cogsLost, restockTotal, totalImpact, perRefund });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Refund Impact Calculator</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Calculate the true cost of your refund rate including lost revenue, COGS, and restocking fees.</p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Total Orders per Month', val: orders, set: setOrders },
            { label: 'Refund Rate (%)', val: refundRate, set: setRefundRate },
            { label: 'Average Order Value (₹)', val: avgOrderValue, set: setAvgOrderValue },
            { label: 'Product COGS (₹)', val: productCost, set: setProductCost },
            { label: 'Restocking/Processing Cost (₹)', val: restockCost, set: setRestockCost },
          ].map(({ label, val, set }) => (
            <div key={label}><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Calculate Refund Impact</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <div className="text-4xl font-bold text-red-500">₹{result.totalImpact.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
            <div className="text-[13px] text-[color:var(--text-muted)] mt-1">Total Monthly Refund Impact ({result.refunds.toFixed(0)} refunds)</div>
          </div>
          <div className="space-y-2 text-[14px]">
            {[{ l: 'Revenue Refunded', v: result.revenueImpact }, { l: 'COGS Not Recovered', v: result.cogsLost }, { l: 'Restocking Costs', v: result.restockTotal }, { l: 'True Cost Per Refund', v: result.perRefund }].map(({ l, v }) => (
              <div key={l} className="flex justify-between border-b border-base py-1.5 last:border-0">
                <span className="text-[color:var(--text-muted)]">{l}</span><span className="font-medium text-red-500">₹{v.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
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
