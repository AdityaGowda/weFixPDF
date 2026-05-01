'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const HIGH_RISK_WORDS = [
  'kill', 'die', 'suicide', 'murder', 'bomb', 'gun', 'weapon', 'drug', 'sex', 'explicit', 'nude', 'naked',
  'porn', 'hack', 'illegal', 'scam', 'piracy', 'torrent', 'crack', 'keygen', 'bet', 'gamble', 'casino',
];

const MODERATE_RISK = [
  'war', 'violence', 'blood', 'accident', 'crash', 'dead', 'death', 'controversial', 'conspiracy',
  'protest', 'riot', 'attack', 'terror', 'extremist', 'shocking', 'disturbing',
];

export default function CopyrightRiskKeyword() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{ high: string[]; moderate: string[]; score: number } | null>(null);

  const check = () => {
    const lower = text.toLowerCase();
    const words = lower.match(/\b\w+\b/g) || [];
    const high = HIGH_RISK_WORDS.filter(w => words.includes(w));
    const moderate = MODERATE_RISK.filter(w => words.includes(w));
    const score = Math.min(100, high.length * 20 + moderate.length * 8);
    setResult({ high, moderate, score });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Copyright & Demonetization Risk Scanner</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Scan your script, title, description, or article for words that may trigger YouTube or AdSense demonetization.</p>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={8}
          placeholder="Paste your video script, blog post, or description here to check for risky keywords..."
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-amber-500 text-white text-[14px] font-medium hover:bg-amber-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Scan for Risk</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`text-5xl font-bold text-center ${result.score >= 40 ? 'text-red-500' : result.score >= 15 ? 'text-amber-500' : 'text-emerald-500'}`}>{result.score}/100</div>
          <div className="text-center text-[13px] text-[color:var(--text-muted)]">{result.score >= 40 ? 'High Demonetization Risk' : result.score >= 15 ? 'Moderate Risk — Review Recommended' : 'Low Risk — Content Appears Safe'}</div>
          {result.high.length > 0 && (
            <div>
              <h3 className="text-[13px] font-semibold text-red-500 mb-2">🚫 High-Risk Keywords ({result.high.length}):</h3>
              <div className="flex flex-wrap gap-1.5">
                {result.high.map(w => <span key={w} className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[12px] text-red-600 dark:text-red-400">{w}</span>)}
              </div>
            </div>
          )}
          {result.moderate.length > 0 && (
            <div>
              <h3 className="text-[13px] font-semibold text-amber-500 mb-2">⚠ Moderate-Risk Keywords ({result.moderate.length}):</h3>
              <div className="flex flex-wrap gap-1.5">
                {result.moderate.map(w => <span key={w} className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[12px] text-amber-700 dark:text-amber-400">{w}</span>)}
              </div>
            </div>
          )}
          {result.high.length === 0 && result.moderate.length === 0 && (
            <p className="text-emerald-500 text-[14px] text-center">✓ No risky keywords detected. Content appears advertiser-friendly.</p>
          )}
          <p className="text-[12px] text-[color:var(--text-muted)]">Context matters — YouTube&apos;s system considers full context, not just isolated words. Educational and news content on sensitive topics can still be monetized with proper framing.</p>
        </div>
      )}
    
      <div className="mt-8 bg-card border border-base p-6 rounded-xl space-y-4">
        <h3 className="text-[15px] font-semibold text-[color:var(--text)]">🔒 Privacy & Safe Usage</h3>
        <p className="text-[13px] text-[color:var(--text-muted)]">
          <strong>100% Private:</strong> This tool runs entirely in your browser. No data, inputs, or files are sent to our servers or saved anywhere.
        </p>
        <p className="text-[12px] text-[color:var(--text-muted)] opacity-80 border-t border-base pt-4">
          <strong>Disclaimer:</strong> This tool provides risk indicators only, not a final judgment.
        </p>
      </div>
    </div>
  );
}
