'use client';
import React, { useState } from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';

const COMMISSION: Record<string, number> = {
  'Electronics': 6, 'Mobile & Accessories': 6, 'Computers': 6,
  'Clothing & Fashion': 20, 'Shoes & Footwear': 20, 'Books': 15,
  'Home & Kitchen': 12, 'Furniture': 10, 'Sports & Fitness': 12,
  'Beauty & Personal Care': 15, 'Toys & Baby': 12, 'FMCG / Grocery': 8,
};

export default function FlipkartSellerMargin() {
  const [category, setCategory] = useState('Electronics');
  const [sellPrice, setSellPrice] = useState('1500');
  const [costPrice, setCostPrice] = useState('900');
  const [shipping, setShipping] = useState('50');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const sp = parseFloat(sellPrice) || 0;
    const cp = parseFloat(costPrice) || 0;
    const sh = parseFloat(shipping) || 0;
    const commPct = COMMISSION[category] || 10;
    const commission = (sp * commPct) / 100;
    const fixedFee = 30;
    const collectionFee = sp * 0.01;
    const totalFees = commission + fixedFee + collectionFee + sh;
    const netRevenue = sp - totalFees;
    const profit = netRevenue - cp;
    const margin = sp > 0 ? (profit / sp) * 100 : 0;
    setResult({ sp, cp, commPct, commission, fixedFee: fixedFee + collectionFee, sh, totalFees, netRevenue, profit, margin });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> Flipkart Seller Margin Calculator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Calculate your true net profit after Flipkart commission, fixed fees, and shipping costs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Product Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {Object.keys(COMMISSION).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          {[
            { label: 'Selling Price (₹)', val: sellPrice, set: setSellPrice },
            { label: 'Cost / COGS (₹)', val: costPrice, set: setCostPrice },
            { label: 'Shipping Origin Cost (₹)', val: shipping, set: setShipping },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate Margin
        </button>
      </div>

      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <h3 className="text-[15px] font-semibold text-[color:var(--text)]">Fee Breakdown</h3>
          <div className="space-y-2 text-[14px]">
            {[
              { label: 'Selling Price', val: result.sp, color: '' },
              { label: `Flipkart Commission (${result.commPct}%)`, val: -result.commission, color: 'text-red-500' },
              { label: 'Fixed + Collection Fee', val: -result.fixedFee, color: 'text-red-500' },
              { label: 'Shipping Cost', val: -result.sh, color: 'text-red-500' },
              { label: 'Net Revenue After Fees', val: result.netRevenue, color: 'font-semibold' },
              { label: 'Cost of Goods (COGS)', val: -result.cp, color: 'text-red-500' },
            ].map(({ label, val, color }) => (
              <div key={label} className="flex justify-between py-1.5 border-b border-base last:border-0">
                <span className="text-[color:var(--text-muted)]">{label}</span>
                <span className={`font-medium ${color || 'text-[color:var(--text)]'}`}>₹{Math.abs(val).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className={`p-4 rounded-xl text-center border ${result.profit >= 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
            <div className={`text-3xl font-bold ${result.profit >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              ₹{result.profit.toFixed(2)}
            </div>
            <div className="text-[13px] text-[color:var(--text-muted)] mt-1">
              Net Profit &nbsp;|&nbsp; Margin: {result.margin.toFixed(1)}%
            </div>
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
