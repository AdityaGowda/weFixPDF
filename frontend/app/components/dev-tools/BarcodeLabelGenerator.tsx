'use client';
import React, { useState } from 'react';
import { TrendingUp, Barcode } from 'lucide-react';

export default function BarcodeLabelGenerator() {
  const [data, setData] = useState('123456789012');
  const [type, setType] = useState('CODE128');

  // Simple visual simulation of a barcode (since we can't easily import a barcode library here)
  // Real implementation would use bwip-js or react-barcode
  const generateBarcodeLines = (input: string) => {
    // Generate pseudo-random widths based on character codes
    const lines = [];
    for (let i = 0; i < input.length; i++) {
      const code = input.charCodeAt(i);
      lines.push((code % 3) + 1); // width 1 to 3
      lines.push((code % 2) + 1); // gap 1 to 2
    }
    // Add start/stop characters visual padding
    return [2, 1, 1, 2, ...lines, 2, 1, 1, 2];
  };

  const lines = generateBarcodeLines(data || '000');

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2"><Barcode className="w-5 h-5 text-blue-500" /> Barcode Label Generator Lite</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Generate a quick visual barcode representation for product mockups and wireframes.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Barcode Type</label>
            <select value={type} onChange={e => setType(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              <option value="CODE128">Code 128 (Alphanumeric)</option>
              <option value="UPC">UPC (Numeric only)</option>
              <option value="EAN13">EAN-13</option>
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Data to Encode</label>
            <input type="text" value={data} onChange={e => setData(e.target.value)} maxLength={type === 'UPC' ? 12 : type === 'EAN13' ? 13 : 20} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
        </div>
      </div>

      <div className="bg-card border border-base p-6 rounded-xl space-y-4 flex flex-col items-center justify-center min-h-[200px]">
        {data ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 inline-block">
            <div className="flex items-stretch h-24 mb-2">
              {lines.map((width, i) => (
                <div key={i} className={`${i % 2 === 0 ? 'bg-black' : 'bg-transparent'}`} style={{ width: `${width * 3}px` }}></div>
              ))}
            </div>
            <div className="text-center font-mono text-black text-sm tracking-[0.2em]">{data}</div>
          </div>
        ) : (
          <p className="text-[14px] text-[color:var(--text-muted)]">Enter data to generate barcode.</p>
        )}
        <div className="text-[11px] text-[color:var(--text-muted)] mt-4 max-w-sm text-center">
          Note: This is a structural visual simulation for mockup purposes only, not a scannable industry-standard encoded barcode.
        </div>
      </div>
    
      <div className="mt-8 bg-card border border-base p-6 rounded-xl space-y-4">
        <h3 className="text-[15px] font-semibold text-[color:var(--text)]">🔒 Privacy & Safe Usage</h3>
        <p className="text-[13px] text-[color:var(--text-muted)]">
          <strong>100% Private:</strong> This tool runs entirely in your browser. No data, inputs, or files are sent to our servers or saved anywhere.
        </p>
        <p className="text-[12px] text-[color:var(--text-muted)] opacity-80 border-t border-base pt-4">
          <strong>Disclaimer:</strong> Always review generated code before production use.
        </p>
      </div>
    </div>
  );
}
