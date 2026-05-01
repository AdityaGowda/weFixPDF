'use client';
import React, { useState } from 'react';
import { TrendingUp, Search } from 'lucide-react';

export default function DuplicateParagraphFinder() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{ duplicates: string[]; unique: number; total: number } | null>(null);

  const find = () => {
    if (!text.trim()) return;
    const paras = text.split(/\n\n+/).map(p => p.trim()).filter(p => p.length > 30);
    const seen = new Map<string, number>();
    paras.forEach(p => {
      const key = p.toLowerCase().replace(/\s+/g, ' ');
      seen.set(key, (seen.get(key) || 0) + 1);
    });
    const duplicates = Array.from(seen.entries()).filter(([, count]) => count > 1).map(([p]) => p);
    setResult({ duplicates, unique: seen.size - duplicates.length, total: paras.length });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-500" /> Duplicate Paragraph Finder
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Paste your article or content to find repeated paragraphs. Duplicate content hurts SEO — Google prefers unique content throughout.
        </p>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={12}
          placeholder="Paste your full article or blog post here. Paragraphs should be separated by blank lines..."
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        <button onClick={find} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Find Duplicates
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center text-[13px]">
            <div className="bg-page border border-base rounded-lg p-3">
              <div className="text-2xl font-bold text-[color:var(--text)]">{result.total}</div>
              <div className="text-[color:var(--text-muted)]">Total Paragraphs</div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
              <div className="text-2xl font-bold text-emerald-500">{result.unique}</div>
              <div className="text-[color:var(--text-muted)]">Unique</div>
            </div>
            <div className={`border rounded-lg p-3 ${result.duplicates.length > 0 ? 'bg-red-500/10 border-red-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
              <div className={`text-2xl font-bold ${result.duplicates.length > 0 ? 'text-red-500' : 'text-emerald-500'}`}>{result.duplicates.length}</div>
              <div className="text-[color:var(--text-muted)]">Duplicates</div>
            </div>
          </div>
          {result.duplicates.length === 0 ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg text-[14px] text-emerald-600 dark:text-emerald-400">
              ✓ No duplicate paragraphs found! Your content appears to be unique throughout.
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-[14px] font-semibold text-red-500">Duplicate Paragraphs Found:</h3>
              {result.duplicates.map((d, i) => (
                <div key={i} className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                  <div className="text-[12px] font-semibold text-red-500 mb-1">Duplicate #{i + 1}</div>
                  <p className="text-[13px] text-[color:var(--text-muted)] line-clamp-3">{d.slice(0, 200)}...</p>
                </div>
              ))}
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
