'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function ViralTopicOpportunity() {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<{ score: number; signals: string[]; tips: string[] } | null>(null);

  const TRENDING = ['2025', 'new', 'vs', 'best', 'how to', 'earn', 'money', 'free', 'hack', 'secret', 'mistake', 'avoid', 'warning', 'fastest', 'exposed', 'truth', 'actually', 'nobody tells', 'changed'];

  const analyze = () => {
    if (!topic.trim()) return;
    const lower = topic.toLowerCase();
    const signals: string[] = [];
    let score = 20;
    TRENDING.forEach(kw => {
      if (lower.includes(kw)) { signals.push(`Has trending signal: "${kw}"`); score += 8; }
    });
    if (topic.length >= 40 && topic.length <= 70) { signals.push('Optimal length for YouTube/Google title (40–70 chars)'); score += 10; }
    if (/\d/.test(topic)) { signals.push('Contains a number — increases perceived specificity and CTR'); score += 8; }
    if (/\?$/.test(topic.trim())) { signals.push('Question format — triggers curiosity and featured snippet potential'); score += 6; }
    if (/₹|\$|money|earn|income|profit|revenue|salary/i.test(topic)) { signals.push('Financial angle — high engagement niche with strong intent'); score += 10; }
    score = Math.min(100, score);
    const tips = [];
    if (!signals.some(s => s.includes('trending'))) tips.push('Add a power word: "Best", "Secret", "Truth", "Actually"');
    if (!/\d/.test(topic)) tips.push('Include a specific number to increase credibility');
    if (topic.length < 40) tips.push('Expand your title to 40–70 characters for optimal display');
    setResult({ score, signals, tips });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Viral Topic Opportunity Finder</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Score your video or blog topic for viral potential based on trending signals, emotional hooks, and curiosity triggers.</p>
        <div className="flex gap-3">
          <input value={topic} onChange={e => setTopic(e.target.value)} onKeyDown={e => e.key === 'Enter' && analyze()}
            placeholder="e.g. The Truth About Making Money on YouTube in 2025 Nobody Tells You"
            className="flex-1 px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          <button onClick={analyze} className="px-4 py-2 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 transition-colors">Score</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {['How I Made ₹1 Lakh in 30 Days Freelancing', 'The Truth About Naukri.com in 2025', '7 Mistakes Killing Your YouTube Growth'].map(ex => (
            <button key={ex} onClick={() => setTopic(ex)} className="text-[11px] px-2 py-1 rounded border border-base text-[color:var(--text-muted)] hover:border-red-500 hover:text-red-500 transition-colors">{ex}</button>
          ))}
        </div>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`text-5xl font-bold text-center ${result.score >= 70 ? 'text-emerald-500' : result.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>{result.score}/100</div>
          <div className="text-center text-[13px] text-[color:var(--text-muted)]">{result.score >= 70 ? '🔥 Strong viral potential' : result.score >= 50 ? '📈 Good topic, needs a stronger hook' : '⚠ Low appeal — rework the angle'}</div>
          {result.signals.length > 0 && (
            <div>
              <h3 className="text-[13px] font-semibold text-emerald-500 mb-2">✓ Viral Signals Detected:</h3>
              {result.signals.map(s => <p key={s} className="text-[13px] text-[color:var(--text-muted)] mb-0.5">• {s}</p>)}
            </div>
          )}
          {result.tips.length > 0 && (
            <div>
              <h3 className="text-[13px] font-semibold text-blue-500 mb-2">💡 Improve Your Topic:</h3>
              {result.tips.map(t => <p key={t} className="text-[13px] text-[color:var(--text-muted)] mb-0.5">• {t}</p>)}
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
