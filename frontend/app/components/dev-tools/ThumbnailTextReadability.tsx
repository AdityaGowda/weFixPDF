'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function ThumbnailTextReadability() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{ score: number; wordCount: number; charCount: number; issues: string[]; tips: string[] } | null>(null);

  const analyze = () => {
    if (!text.trim()) return;
    const words = text.trim().split(/\s+/).length;
    const chars = text.trim().length;
    const hasAllCaps = text === text.toUpperCase() && /[A-Z]/.test(text);
    const longWords = text.split(/\s+/).filter(w => w.length > 10).length;
    const issues: string[] = [];
    const tips: string[] = [];
    let score = 100;

    if (words > 4) { issues.push('Too many words — thumbnail text should be 1–4 words max.'); score -= 30; }
    if (chars > 30) { issues.push('Too many characters — text will appear tiny at thumbnail size.'); score -= 20; }
    if (longWords > 0) { issues.push('Long words are hard to read at small size. Use simpler vocabulary.'); score -= 15; }
    if (!hasAllCaps && words > 1) tips.push('Consider ALL CAPS for short thumbnail text — better readability at small size.');
    if (words <= 2) tips.push('Short text is great! It reads instantly even on mobile.');
    if (words >= 3 && words <= 4) score += 5;

    score = Math.min(100, Math.max(0, score));
    setResult({ score, wordCount: words, charCount: chars, issues, tips });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Thumbnail Text Readability</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Check if your thumbnail text is readable at 90px width (mobile view). Fewer, bolder words win every time.</p>
        <input value={text} onChange={e => setText(e.target.value)}
          placeholder="e.g. EARN ₹50,000 or HOW I FAILED or 5 SECRETS"
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
        {text && (
          <div className="bg-gray-900 rounded-xl flex items-center justify-center" style={{ width: 120, height: 68 }}>
            <div className="text-center p-1" style={{ fontSize: text.length > 15 ? 8 : text.length > 10 ? 11 : 14, fontWeight: 900, color: 'white', lineHeight: 1.2 }}>{text}</div>
          </div>
        )}
        <button onClick={analyze} className="w-full py-2.5 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Check Readability</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`text-5xl font-bold text-center ${result.score >= 80 ? 'text-emerald-500' : result.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>{result.score}/100</div>
          <div className="grid grid-cols-2 gap-3 text-center text-[12px]">
            <div className="bg-page border border-base rounded-lg p-3"><div className="text-2xl font-bold text-[color:var(--text)]">{result.wordCount}</div><div className="text-[color:var(--text-muted)]">Words</div></div>
            <div className="bg-page border border-base rounded-lg p-3"><div className="text-2xl font-bold text-[color:var(--text)]">{result.charCount}</div><div className="text-[color:var(--text-muted)]">Characters</div></div>
          </div>
          {result.issues.map(i => <p key={i} className="text-[13px] text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 rounded px-3 py-2">✗ {i}</p>)}
          {result.tips.map(t => <p key={t} className="text-[13px] text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded px-3 py-2">💡 {t}</p>)}
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
