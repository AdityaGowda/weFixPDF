'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function InvoiceNumberGenerator() {
  const [prefix, setPrefix] = useState('INV');
  const [startNum, setStartNum] = useState('1001');
  const [count, setCount] = useState('10');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [format, setFormat] = useState('PREFIX-YEAR-NUM');
  const [invoices, setInvoices] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const start = parseInt(startNum) || 1;
    const n = Math.min(parseInt(count) || 10, 50);
    const list = Array.from({ length: n }, (_, i) => {
      const num = (start + i).toString().padStart(4, '0');
      switch (format) {
        case 'PREFIX-YEAR-NUM': return `${prefix}-${year}-${num}`;
        case 'PREFIX-NUM': return `${prefix}-${num}`;
        case 'YEAR/NUM': return `${year}/${num}`;
        case 'PREFIX/YEAR/NUM': return `${prefix}/${year}/${num}`;
        default: return `${prefix}-${year}-${num}`;
      }
    });
    setInvoices(list);
  };

  const copyAll = () => { navigator.clipboard.writeText(invoices.join('\n')); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Invoice Number Generator</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Generate sequential, professionally formatted invoice numbers for your freelance or business billing.</p>
        <div className="grid grid-cols-2 gap-4">
          {[{ label: 'Prefix (e.g. INV, BILL)', val: prefix, set: setPrefix }, { label: 'Financial Year', val: year, set: setYear }, { label: 'Starting Number', val: startNum, set: setStartNum }, { label: 'How Many to Generate', val: count, set: setCount }].map(({ label, val, set }) => (
            <div key={label}><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input value={val} onChange={e => set(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
          ))}
          <div className="col-span-2"><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Format</label>
            <select value={format} onChange={e => setFormat(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {['PREFIX-YEAR-NUM', 'PREFIX-NUM', 'YEAR/NUM', 'PREFIX/YEAR/NUM'].map(f => <option key={f}>{f}</option>)}</select></div>
        </div>
        <button onClick={generate} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors">Generate Invoice Numbers</button>
      </div>
      {invoices.length > 0 && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-[color:var(--text)]">{invoices.length} Invoice Numbers Generated</h3>
            <button onClick={copyAll} className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-[12px] hover:bg-blue-600 transition-colors">{copied ? '✓ Copied!' : 'Copy All'}</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {invoices.map(inv => (
              <div key={inv} className="bg-page border border-base rounded-lg px-3 py-2 text-[13px] font-mono text-[color:var(--text)]">{inv}</div>
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
