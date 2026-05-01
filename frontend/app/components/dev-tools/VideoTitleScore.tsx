'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function VideoTitleScore() {
  const [title, setTitle] = useState('');
  const [result, setResult] = useState<{ score: number; checks: { label: string; pass: boolean; tip: string }[] } | null>(null);

  const analyze = () => {
    if (!title.trim()) return;
    const checks = [
      { label: 'Length 40–70 characters', pass: title.length >= 40 && title.length <= 70, tip: `Current: ${title.length} chars. Ideal range: 40–70.` },
      { label: 'Contains a number', pass: /\d/.test(title), tip: 'Numbers boost CTR (e.g. "5 Ways", "2025", "10X").' },
      { label: 'Has power word (Best, Secret, Free, Easy, etc.)', pass: /\b(best|secret|free|easy|fast|simple|top|powerful|ultimate|proven|new)\b/i.test(title), tip: 'Power words trigger emotional clicks.' },
      { label: 'Contains a keyword (question or target phrase)', pass: /how|what|why|best|vs|review|tutorial|tips|guide|learn/i.test(title), tip: 'Include your main keyword early.' },
      { label: 'No ALL CAPS or excessive punctuation', pass: !/[A-Z]{5,}|[!?]{2,}/.test(title), tip: 'Clickbait titles with ALL CAPS reduce trust.' },
      { label: 'Not too generic (avoids "Video", "Check This Out")', pass: !/^(video|check this out|watch this|this is|new video)/i.test(title), tip: 'Be specific — generic titles get skipped.' },
    ];
    const score = Math.round((checks.filter(c => c.pass).length / checks.length) * 100);
    setResult({ score, checks });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Video Title Score Tool</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Score your YouTube video title for CTR potential, SEO strength, and engagement signals.</p>
        <input value={title} onChange={e => setTitle(e.target.value)}
          placeholder="e.g. I Made ₹50,000 in 30 Days Selling Digital Products - Here's How"
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
        <div className="text-[12px] text-[color:var(--text-muted)]">{title.length} / 70 characters</div>
        <button onClick={analyze} className="w-full py-2.5 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 transition-colors">Score My Title</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`text-5xl font-bold text-center ${result.score >= 80 ? 'text-emerald-500' : result.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>{result.score}/100</div>
          <div className="space-y-2">
            {result.checks.map(c => (
              <div key={c.label} className={`flex items-start gap-3 p-3 rounded-lg border text-[13px] ${c.pass ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                <span className={c.pass ? 'text-emerald-500' : 'text-red-500'}>{c.pass ? '✓' : '✗'}</span>
                <div><div className={`font-medium ${c.pass ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>{c.label}</div>
                  {!c.pass && <div className="text-[color:var(--text-muted)] mt-0.5">{c.tip}</div>}</div>
              </div>
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
