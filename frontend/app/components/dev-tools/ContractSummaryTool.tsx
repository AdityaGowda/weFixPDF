'use client';
import React, { useState } from 'react';
import { TrendingUp, FileText } from 'lucide-react';

export default function ContractSummaryTool() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{ amounts: string[]; dates: string[]; emails: string[]; words: number } | null>(null);

  const extract = () => {
    if (!text.trim()) return;
    
    // Extract currency amounts (e.g. $5,000, ₹50,000, USD 100)
    const amountRegex = /(?:₹|\$|€|£|USD|INR)\s?[\d,]+(?:\.\d{2})?/gi;
    const amounts = [...new Set((text.match(amountRegex) || []).map(a => a.trim()))];
    
    // Extract dates (e.g. 12/05/2025, Jan 15, 2024, 2024-05-12)
    const dateRegex = /\b(?:\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{4}[-/]\d{1,2}[-/]\d{1,2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? \d{4})\b/gi;
    const dates = [...new Set((text.match(dateRegex) || []).map(d => d.trim()))];
    
    // Extract emails
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = [...new Set((text.match(emailRegex) || []).map(e => e.trim()))];

    const words = text.trim().split(/\s+/).length;
    
    setResult({ amounts, dates, emails, words });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2"><FileText className="w-5 h-5 text-blue-500" /> Contract Summary Extractor</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Quickly extract all monetary values, dates, and email addresses from a legal contract or agreement text.</p>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={8}
          placeholder="Paste your contract text here to extract key data points..."
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        <button onClick={extract} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Extract Data Points</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="text-center pb-2 border-b border-base">
            <div className="text-[14px] text-[color:var(--text-muted)]">Document Length: <span className="font-bold text-[color:var(--text)]">{result.words.toLocaleString()} words</span></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <h3 className="text-[13px] font-semibold text-emerald-500 mb-2">Monetary Values ({result.amounts.length})</h3>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {result.amounts.length === 0 ? <p className="text-[12px] text-[color:var(--text-muted)]">None found</p> : 
                  result.amounts.map((a, i) => <div key={i} className="text-[12px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded">{a}</div>)}
              </div>
            </div>
            <div>
              <h3 className="text-[13px] font-semibold text-blue-500 mb-2">Dates Mentioned ({result.dates.length})</h3>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {result.dates.length === 0 ? <p className="text-[12px] text-[color:var(--text-muted)]">None found</p> : 
                  result.dates.map((d, i) => <div key={i} className="text-[12px] bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">{d}</div>)}
              </div>
            </div>
            <div>
              <h3 className="text-[13px] font-semibold text-amber-500 mb-2">Emails ({result.emails.length})</h3>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {result.emails.length === 0 ? <p className="text-[12px] text-[color:var(--text-muted)]">None found</p> : 
                  result.emails.map((e, i) => <div key={i} className="text-[12px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-1 rounded truncate" title={e}>{e}</div>)}
              </div>
            </div>
          </div>
          <p className="text-[11px] text-[color:var(--text-muted)] text-center">Data is extracted locally in your browser using Regex patterns. No data is sent to external servers.</p>
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
