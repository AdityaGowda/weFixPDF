'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const ITEMS = [
  { id: 'faceVisible', label: 'Your face is clearly visible and well-lit', weight: 20 },
  { id: 'highContrast', label: 'Background and subject have high contrast (pops visually)', weight: 15 },
  { id: 'bigText', label: 'Text is large (≥ 40pt) and readable at thumbnail size (120×90px)', weight: 18 },
  { id: 'maxWords', label: '3 words or fewer in the thumbnail text', weight: 12 },
  { id: 'emotion', label: 'Subject shows a strong emotion (surprise, curiosity, excitement)', weight: 15 },
  { id: 'brandColor', label: 'Consistent brand color palette used across all thumbnails', weight: 8 },
  { id: 'noClutter', label: 'Thumbnail is clean — not overcrowded with text or objects', weight: 10 },
  { id: 'numberUsed', label: 'A specific number is prominently featured (builds curiosity)', weight: 7 },
  { id: 'mobileClear', label: 'Thumbnail is readable on a small mobile screen', weight: 15 },
];

export default function ThumbnailCtrScore() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<{ score: number } | null>(null);

  const toggle = (id: string) => setAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  const check = () => {
    const score = Math.min(100, ITEMS.reduce((s, q) => s + (answers[q.id] ? q.weight : 0), 0));
    setResult({ score });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Thumbnail CTR Score Checker</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Self-audit your thumbnail against proven high-CTR design principles. Check all that apply to your current thumbnail.</p>
        <div className="space-y-2">
          {ITEMS.map(q => (
            <label key={q.id} className="flex items-start gap-3 cursor-pointer group p-2.5 rounded-lg hover:bg-blue-500/5 transition-colors">
              <div className="relative flex-shrink-0 mt-0.5">
                <input type="checkbox" checked={!!answers[q.id]} onChange={() => toggle(q.id)} className="peer sr-only" />
                <div className="w-5 h-5 rounded border border-base bg-page peer-checked:bg-red-500 peer-checked:border-red-500 flex items-center justify-center transition-colors">
                  <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
              <span className="text-[13px] text-[color:var(--text-muted)] group-hover:text-[color:var(--text)] transition-colors">{q.label}</span>
            </label>
          ))}
        </div>
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 transition-colors">Score My Thumbnail</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl text-center space-y-3">
          <div className={`text-6xl font-bold ${result.score >= 80 ? 'text-emerald-500' : result.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>{result.score}/100</div>
          <p className="text-[14px] text-[color:var(--text-muted)]">
            {result.score >= 80 ? 'Excellent thumbnail! Expect above-average CTR. A/B test against a simpler version.' : result.score >= 50 ? 'Good foundation. Focus on face emotion and text size for quick wins.' : 'Low CTR potential. Prioritize: high contrast, large readable text, and visible emotion.'}
          </p>
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
