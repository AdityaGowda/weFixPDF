'use client';
import CopyButton from '../CopyButton';
import React, { useState } from 'react';

const entities = [
  { char: '&', name: '&amp;', code: '&#38;', desc: 'Ampersand' },
  { char: '<', name: '&lt;', code: '&#60;', desc: 'Less than' },
  { char: '>', name: '&gt;', code: '&#62;', desc: 'Greater than' },
  { char: '"', name: '&quot;', code: '&#34;', desc: 'Double quote' },
  { char: "'", name: '&apos;', code: '&#39;', desc: 'Single quote' },
  { char: '©', name: '&copy;', code: '&#169;', desc: 'Copyright' },
  { char: '®', name: '&reg;', code: '&#174;', desc: 'Registered trademark' },
  { char: '™', name: '&trade;', code: '&#8482;', desc: 'Trademark' },
  { char: '€', name: '&euro;', code: '&#8364;', desc: 'Euro sign' },
  { char: '£', name: '&pound;', code: '&#163;', desc: 'Pound sign' },
  { char: '¥', name: '&yen;', code: '&#165;', desc: 'Yen sign' },
  { char: '§', name: '&sect;', code: '&#167;', desc: 'Section sign' },
  { char: '±', name: '&plusmn;', code: '&#177;', desc: 'Plus-minus sign' },
  { char: '×', name: '&times;', code: '&#215;', desc: 'Multiplication sign' },
  { char: '÷', name: '&divide;', code: '&#247;', desc: 'Division sign' },
  { char: '¶', name: '&para;', code: '&#182;', desc: 'Paragraph sign' },
  { char: '•', name: '&bull;', code: '&#8226;', desc: 'Bullet' },
  { char: '…', name: '&hellip;', code: '&#8230;', desc: 'Horizontal ellipsis' },
  { char: '∞', name: '&infin;', code: '&#8734;', desc: 'Infinity' },
  { char: '≠', name: '&ne;', code: '&#8800;', desc: 'Not equal to' },
];

export default function HtmlEntities() {
  const [search, setSearch] = useState('');

  const filtered = entities.filter(e => 
    e.char.includes(search) || 
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.code.includes(search) ||
    e.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">HTML Entities & Symbols</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Find HTML entity names and codes for special characters.</p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          placeholder="Search entities (e.g. & or copy)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((e, i) => (
            <div key={i} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col items-center text-center space-y-2 hover:border-blue-500 transition-colors">
              <span className="text-3xl">{e.char}</span>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400">{e.name}</span>
              <span className="text-[10px] text-gray-400 font-mono">{e.code}</span>
              <span className="text-[11px] text-gray-500 font-medium truncate w-full">{e.desc}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full p-8 text-center text-gray-500">No matching entities found.</div>
          )}
        </div>
      </div>
    
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
