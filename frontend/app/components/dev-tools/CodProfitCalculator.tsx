'use client';
import React, { useState } from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';

export default function CodProfitCalculator() {
  const [sellPrice, setSellPrice] = useState('599');
  const [cogs, setCogs] = useState('200');
  const [fwdShip, setFwdShip] = useState('80');
  const [revShip, setRevShip] = useState('70');
  const [rtoRate, setRtoRate] = useState('25');
  const [orders, setOrders] = useState('100');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const sp = parseFloat(sellPrice) || 0;
    const cg = parseFloat(cogs) || 0;
    const fw = parseFloat(fwdShip) || 0;
    const rv = parseFloat(revShip) || 0;
    const rto = parseFloat(rtoRate) / 100 || 0;
    const n = parseFloat(orders) || 100;

    const delivered = n * (1 - rto);
    const returned = n * rto;
    const revenue = delivered * sp;
    const totalCogs = n * cg;
    const fwdShipCost = n * fw;
    const revShipCost = returned * rv;
    const totalCost = totalCogs + fwdShipCost + revShipCost;
    const profit = revenue - totalCost;
    const profitPerOrder = profit / n;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

    setResult({ delivered, returned, revenue, totalCogs, fwdShipCost, revShipCost, totalCost, profit, profitPerOrder, margin });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> COD Profit Calculator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Calculate your real D2C profit per 100 COD orders after RTOs, forward and reverse shipping costs.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Selling Price (₹)', val: sellPrice, set: setSellPrice },
            { label: 'Product Cost / COGS (₹)', val: cogs, set: setCogs },
            { label: 'Forward Shipping (₹)', val: fwdShip, set: setFwdShip },
            { label: 'Reverse Shipping / RTO (₹)', val: revShip, set: setRevShip },
            { label: 'RTO Rate (%)', val: rtoRate, set: setRtoRate },
            { label: 'Number of Orders', val: orders, set: setOrders },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate COD Profit
        </button>
      </div>

      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <h3 className="text-[15px] font-semibold text-[color:var(--text)]">Results (for {orders} orders)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[13px]">
            {[
              { label: 'Delivered Orders', val: result.delivered.toFixed(0), color: 'text-emerald-500' },
              { label: 'Returned (RTO)', val: result.returned.toFixed(0), color: 'text-red-500' },
              { label: 'Total Revenue', val: '₹' + result.revenue.toFixed(0), color: 'text-blue-500' },
              { label: 'Product Cost', val: '₹' + result.totalCogs.toFixed(0), color: 'text-red-500' },
              { label: 'Fwd Shipping', val: '₹' + result.fwdShipCost.toFixed(0), color: 'text-red-500' },
              { label: 'Rev Shipping', val: '₹' + result.revShipCost.toFixed(0), color: 'text-red-500' },
            ].map(({ label, val, color }) => (
              <div key={label} className="bg-page border border-base p-3 rounded-lg text-center">
                <div className={`text-xl font-bold ${color}`}>{val}</div>
                <div className="text-[color:var(--text-muted)] mt-0.5">{label}</div>
              </div>
            ))}
          </div>
          <div className={`p-5 rounded-xl text-center border ${result.profit >= 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
            <div className={`text-4xl font-bold ${result.profit >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              ₹{result.profit.toFixed(0)}
            </div>
            <div className="text-[13px] text-[color:var(--text-muted)] mt-1">
              Net Profit &nbsp;|&nbsp; ₹{result.profitPerOrder.toFixed(0)}/order &nbsp;|&nbsp; Margin {result.margin.toFixed(1)}%
            </div>
          </div>
          {result.profit < 0 && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg text-[13px] text-red-600 dark:text-red-400">
              <strong>Warning:</strong> COD is unprofitable at this RTO rate. Consider prepaid incentives or reducing RTO via address verification.
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
          <strong>Disclaimer:</strong> This tool is provided for informational and productivity purposes only. Please verify important results independently.
        </p>
      </div>
    </div>
  );
}
