'use client';
import React, { useState } from 'react';
import { TrendingUp, Search } from 'lucide-react';

const INTENT_RULES = [
  { pattern: /^(what is|what are|how does|why is|who is|when did|define|explain|meaning of)/i, intent: 'Informational', color: 'blue', desc: 'User wants to learn. Target with educational blog posts, how-to guides, and explainers.' },
  { pattern: /^(best|top|review|vs|compare|alternative|recommend)/i, intent: 'Commercial Investigation', color: 'amber', desc: 'User is researching before buying. Target with comparison articles, reviews, and listicles.' },
  { pattern: /(buy|price|cheap|discount|deal|coupon|order|purchase|shop|near me|book now)/i, intent: 'Transactional', color: 'emerald', desc: 'User is ready to buy. Target with product pages, landing pages, and strong CTAs.' },
  { pattern: /(login|sign in|account|official|website|homepage|download|app)/i, intent: 'Navigational', color: 'purple', desc: 'User is looking for a specific brand/site. Hard to compete unless it is your brand.' },
];

const DIFFICULTY = [
  { keywords: ['how to', 'what is', 'guide', 'tutorial'], difficulty: 'Low', score: 20 },
  { keywords: ['best', 'top', 'review'], difficulty: 'Medium', score: 50 },
  { keywords: ['buy', 'price', 'vs'], difficulty: 'High', score: 70 },
];

export default function SearchIntentClassifier() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState<{ intent: string; color: string; desc: string; difficulty: string; score: number } | null>(null);

  const classify = () => {
    if (!keyword.trim()) return;
    const matched = INTENT_RULES.find(r => r.pattern.test(keyword.trim()));
    const intent = matched?.intent ?? 'Informational';
    const color = matched?.color ?? 'blue';
    const desc = matched?.desc ?? 'User likely wants information. Use blog content to capture this traffic.';
    const difMatch = DIFFICULTY.find(d => d.keywords.some(k => keyword.toLowerCase().includes(k)));
    const difficulty = difMatch?.difficulty ?? 'Medium';
    const score = difMatch?.score ?? 45;
    setResult({ intent, color, desc, difficulty, score });
  };

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-500" /> Search Intent Classifier
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Classify any keyword into Informational, Commercial, Transactional, or Navigational intent to choose the right content type.
        </p>
        <div className="flex gap-3">
          <input value={keyword} onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && classify()}
            placeholder="e.g. best email marketing tool for small business"
            className="flex-1 px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          <button onClick={classify} className="px-5 py-2 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center gap-2 transition-colors">
            <TrendingUp className="w-4 h-4" /> Classify
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {['how to start a blog', 'best crm software 2025', 'buy noise cancelling headphones', 'gmail login'].map(ex => (
            <button key={ex} onClick={() => { setKeyword(ex); }}
              className="text-[11px] px-2 py-1.5 rounded border border-base text-[color:var(--text-muted)] hover:border-blue-500 hover:text-blue-500 transition-colors text-left">{ex}</button>
          ))}
        </div>
      </div>

      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`border p-5 rounded-xl ${colorMap[result.color]}`}>
            <div className="text-2xl font-bold mb-2">{result.intent}</div>
            <p className="text-[14px]">{result.desc}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-page border border-base rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[color:var(--text)]">{result.difficulty}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Estimated Difficulty</div>
            </div>
            <div className="bg-page border border-base rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[color:var(--text)]">{result.score}/100</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Competition Score</div>
            </div>
          </div>
          <div className="bg-page border border-base rounded-lg p-4 text-[13px] space-y-1.5">
            <div className="font-semibold text-[color:var(--text)] mb-2">Recommended Content Type</div>
            {result.intent === 'Informational' && <><p className="text-[color:var(--text-muted)]">✓ How-to articles and step-by-step guides</p><p className="text-[color:var(--text-muted)]">✓ Definition/explainer posts (What is X?)</p><p className="text-[color:var(--text-muted)]">✓ Video tutorials</p></>}
            {result.intent === 'Commercial Investigation' && <><p className="text-[color:var(--text-muted)]">✓ Best X for Y listicles</p><p className="text-[color:var(--text-muted)]">✓ X vs Y comparison articles</p><p className="text-[color:var(--text-muted)]">✓ Review posts with pros/cons</p></>}
            {result.intent === 'Transactional' && <><p className="text-[color:var(--text-muted)]">✓ Product or category landing pages</p><p className="text-[color:var(--text-muted)]">✓ Pricing pages with clear CTAs</p><p className="text-[color:var(--text-muted)]">✓ Free trial or demo pages</p></>}
            {result.intent === 'Navigational' && <><p className="text-[color:var(--text-muted)]">✓ Brand-specific pages (your own site)</p><p className="text-[color:var(--text-muted)]">✓ Consider paid ads to protect brand</p></>}
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
