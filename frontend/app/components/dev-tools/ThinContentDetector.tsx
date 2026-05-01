'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function ThinContentDetector() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<Record<string, number | string | boolean> | null>(null);

  const analyze = () => {
    if (!text.trim()) return;
    const words = text.trim().split(/\s+/).length;
    const chars = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
    const avgSentenceLen = sentences > 0 ? Math.round(words / sentences) : 0;
    const headings = (text.match(/^#{1,3} .+/gm) || []).length;
    const isThin = words < 300;
    const isLow = words < 600;
    const grade = words >= 1500 ? 'Excellent' : words >= 1000 ? 'Good' : words >= 600 ? 'Moderate' : words >= 300 ? 'Thin' : 'Very Thin';
    const score = Math.min(100, Math.round((words / 1500) * 100));
    setResult({ words, chars, sentences, paragraphs, avgSentenceLen, headings, isThin, isLow, grade, score });
  };

  const gradeColor: Record<string, string> = { Excellent: 'text-emerald-500', Good: 'text-blue-500', Moderate: 'text-amber-500', Thin: 'text-orange-500', 'Very Thin': 'text-red-500' };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" /> Thin Content Detector
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Paste your article to check for thin content signals. Google penalizes pages under 300 words or those lacking substance.
        </p>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={10}
          placeholder="Paste your full article text here..."
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        <button onClick={analyze} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Analyze Content
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="text-center space-y-1">
            <div className={`text-5xl font-bold ${gradeColor[result.grade as string]}`}>{result.grade as string}</div>
            <div className="text-[14px] text-[color:var(--text-muted)]">{result.words as string} words — {result.score as string}% content depth score</div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-[12px]">
            {[
              { label: 'Words', val: result.words },
              { label: 'Sentences', val: result.sentences },
              { label: 'Paragraphs', val: result.paragraphs },
              { label: 'Avg Sentence', val: `${result.avgSentenceLen} words` },
              { label: 'Characters', val: result.chars },
              { label: 'Headings', val: result.headings },
            ].map(({ label, val }) => (
              <div key={label} className="bg-page border border-base rounded-lg p-2.5">
                <div className="font-bold text-[color:var(--text)]">{val as string}</div>
                <div className="text-[color:var(--text-muted)]">{label}</div>
              </div>
            ))}
          </div>
          {(result.isThin as boolean) && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg text-[13px] text-red-600 dark:text-red-400">
              <strong>Thin Content Warning:</strong> Pages below 300 words rarely rank. Google's Helpful Content Update specifically targets low-depth content. Expand with expert insights, examples, and actionable steps.
            </div>
          )}
          {!(result.isThin as boolean) && (result.isLow as boolean) && (
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg text-[13px] text-amber-700 dark:text-amber-400">
              For competitive keywords, aim for 1,000–2,000 words. Add FAQs, how-to steps, or a comparison section to increase depth.
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
