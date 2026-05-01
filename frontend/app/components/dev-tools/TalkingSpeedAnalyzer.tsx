'use client';
import React, { useState } from 'react';
import { TrendingUp, Clock } from 'lucide-react';

const WPM_BY_LANGUAGE: Record<string, number> = {
  'English (Conversational)': 130, 'English (Presentation)': 120, 'English (Fast)': 160,
  'Hindi (Conversational)': 100, 'Hindi (Presentation)': 90,
};

export default function TalkingSpeedAnalyzer() {
  const [text, setText] = useState('');
  const [lang, setLang] = useState('English (Presentation)');
  const [result, setResult] = useState<Record<string, number | string> | null>(null);

  const analyze = () => {
    if (!text.trim()) return;
    const wordCount = text.trim().split(/\s+/).length;
    const charCount = text.replace(/\s/g, '').length;
    const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const avgWps = WPM_BY_LANGUAGE[lang] || 130;
    const minutes = wordCount / avgWps;
    const seconds = Math.round(minutes * 60);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const readability = Math.max(0, Math.min(100, 100 - (charCount / wordCount - 4) * 10));
    setResult({ wordCount, charCount, sentenceCount, minutes: minutes.toFixed(1), mins, secs, readability: readability.toFixed(0), avgWps });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" /> Talking Speed Analyzer
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Paste your video script to calculate speaking time and check if your word count matches your intended video length.
        </p>
        <div>
          <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Speaking Style / Language</label>
          <select value={lang} onChange={e => setLang(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
            {Object.keys(WPM_BY_LANGUAGE).map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={8}
          placeholder="Paste your script or speech text here..."
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        <button onClick={analyze} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Analyze Script
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="text-center p-5 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <div className="text-5xl font-bold text-blue-500">{result.mins}m {result.secs}s</div>
            <div className="text-[14px] text-[color:var(--text-muted)] mt-1">Estimated Speaking Time at {result.avgWps} WPM</div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-[13px]">
            {[
              { label: 'Word Count', val: result.wordCount },
              { label: 'Characters', val: result.charCount },
              { label: 'Sentences', val: result.sentenceCount },
            ].map(({ label, val }) => (
              <div key={label} className="bg-page border border-base rounded-lg p-3">
                <div className="text-xl font-bold text-[color:var(--text)]">{val as string}</div>
                <div className="text-[color:var(--text-muted)] mt-0.5">{label}</div>
              </div>
            ))}
          </div>
          <div className="bg-page border border-base rounded-lg p-4 text-[13px] space-y-1.5">
            <div className="font-medium text-[color:var(--text)]">Script Tips</div>
            <p className="text-[color:var(--text-muted)]">• For a 10-min YouTube video: aim for ~1,200–1,500 words at presentation pace</p>
            <p className="text-[color:var(--text-muted)]">• For YouTube Shorts (60s): aim for 100–150 words max</p>
            <p className="text-[color:var(--text-muted)]">• Add 10–15% buffer time for pauses, emphasis, and B-roll</p>
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
