'use client';
import React, { useState } from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';

export default function GstInclusiveExclusive() {
  const [amount, setAmount] = useState('1180');
  const [rate, setRate] = useState('18');
  const [mode, setMode] = useState<'inclusive' | 'exclusive'>('inclusive');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const calc = () => {
    const a = parseFloat(amount) || 0;
    const r = parseFloat(rate) / 100 || 0;
    let base: number, gst: number, total: number;
    if (mode === 'inclusive') {
      base = a / (1 + r);
      gst = a - base;
      total = a;
    } else {
      base = a;
      gst = a * r;
      total = a + gst;
    }
    const cgst = gst / 2, sgst = gst / 2;
    setResult({ base, gst, total, cgst, sgst });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> GST Inclusive / Exclusive Split Tool
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Split any amount into base price and GST, or add GST to a base price. Shows CGST + SGST breakdown.
        </p>
        <div className="flex rounded-lg border border-base overflow-hidden">
          {(['inclusive', 'exclusive'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className={`flex-1 py-2 text-[14px] font-medium transition-colors capitalize ${mode === m ? 'bg-blue-500 text-white' : 'text-[color:var(--text-muted)] hover:bg-blue-500/10'}`}>
              GST {m}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">
              {mode === 'inclusive' ? 'Amount Including GST (₹)' : 'Base Amount Excluding GST (₹)'}
            </label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">GST Rate</label>
            <select value={rate} onChange={e => setRate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {['0', '5', '12', '18', '28'].map(r => <option key={r}>{r}%</option>)}
            </select>
          </div>
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Split GST
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-3">
          <h3 className="text-[15px] font-semibold text-[color:var(--text)]">GST Breakdown</h3>
          <div className="space-y-2 text-[14px]">
            {[
              { label: 'Base Amount (excl. GST)', val: result.base },
              { label: `CGST (${parseFloat(rate) / 2}%)`, val: result.cgst },
              { label: `SGST (${parseFloat(rate) / 2}%)`, val: result.sgst },
              { label: 'Total GST', val: result.gst },
              { label: 'Total Amount (incl. GST)', val: result.total },
            ].map(({ label, val }) => (
              <div key={label} className={`flex justify-between py-1.5 ${label.startsWith('Total Amount') ? 'border-t-2 border-blue-500 font-semibold mt-2 pt-2' : 'border-b border-base'}`}>
                <span className="text-[color:var(--text-muted)]">{label}</span>
                <span className="font-medium text-[color:var(--text)]">₹{val.toFixed(2)}</span>
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
