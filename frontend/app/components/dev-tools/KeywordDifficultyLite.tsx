'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function KeywordDifficultyLite() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState<Record<string, number | string> | null>(null);

  const estimate = () => {
    if (!keyword.trim()) return;
    const words = keyword.trim().split(/\s+/).length;
    const len = keyword.length;
    const hasBrand = /amazon|google|facebook|youtube|instagram|netflix|apple|microsoft/i.test(keyword);
    const isLong = words >= 4;
    const hasQuestion = /^(how|what|why|when|where|who|which|can|does|is|are)/i.test(keyword);
    const hasYear = /\b(202[0-9])\b/.test(keyword);
    let score = 50;
    if (isLong) score -= 15;
    if (hasQuestion) score -= 10;
    if (hasYear) score -= 8;
    if (hasBrand) score += 25;
    if (words === 1) score += 20;
    if (words === 2) score += 10;
    score = Math.min(95, Math.max(5, score));
    const level = score >= 70 ? 'Hard' : score >= 40 ? 'Medium' : 'Easy';
    const opportunity = score <= 30 ? 'High' : score <= 60 ? 'Medium' : 'Low';
    setResult({ score, level, opportunity, words, isLong, hasQuestion });
  };

  const levelColor: Record<string, string> = { Easy: 'text-emerald-500', Medium: 'text-amber-500', Hard: 'text-red-500' };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Keyword Difficulty Lite</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Get a quick structural difficulty estimate for any keyword based on length, type, and competitive signals — no API required.</p>
        <div className="flex gap-3">
          <input value={keyword} onChange={e => setKeyword(e.target.value)} onKeyDown={e => e.key === 'Enter' && estimate()}
            placeholder="e.g. best email marketing tool for small business 2025"
            className="flex-1 px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          <button onClick={estimate} className="px-5 py-2 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors">Estimate</button>
        </div>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-page border border-base rounded-xl p-4">
              <div className={`text-4xl font-bold ${levelColor[result.level as string]}`}>{result.score as string}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Difficulty Score</div>
            </div>
            <div className="bg-page border border-base rounded-xl p-4">
              <div className={`text-2xl font-bold ${levelColor[result.level as string]}`}>{result.level as string}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Level</div>
            </div>
            <div className="bg-page border border-base rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-500">{result.opportunity as string}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Opportunity</div>
            </div>
          </div>
          <div className="text-[13px] text-[color:var(--text-muted)] space-y-1">
            <p>• {result.words as string}-word keyword {result.isLong ? '— long-tail, typically easier to rank' : '— short-tail, more competitive'}</p>
            <p>• {result.hasQuestion ? 'Question-format — good for featured snippets' : 'Non-question format — standard ranking competition'}</p>
          </div>
          <p className="text-[12px] text-[color:var(--text-muted)]">This is a structural estimate only. Use Ahrefs, Semrush, or Ubersuggest for data-backed difficulty scores.</p>
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
