'use client';
import React, { useState } from 'react';
import { TrendingUp, Clock } from 'lucide-react';

const WPM_BY_STYLE: Record<string, number> = {
  'Casual / Conversational': 140, 'Presentation / YouTube': 125,
  'Podcast / Interview': 150, 'Educational / Tutorial': 115,
};

export default function ScriptTimerTool() {
  const [text, setText] = useState('');
  const [style, setStyle] = useState('Presentation / YouTube');
  const [targetMin, setTargetMin] = useState('10');
  const [result, setResult] = useState<Record<string, number | string> | null>(null);

  const analyze = () => {
    if (!text.trim()) return;
    const words = text.trim().split(/\s+/).length;
    const wpm = WPM_BY_STYLE[style] || 130;
    const actualMins = words / wpm;
    const targetMins = parseFloat(targetMin) || 10;
    const targetWords = targetMins * wpm;
    const diff = actualMins - targetMins;
    const status = Math.abs(diff) < 0.5 ? 'Perfect' : diff > 0 ? 'Too Long' : 'Too Short';
    setResult({ words, wpm, actualMins: actualMins.toFixed(1), targetWords: Math.round(targetWords), diff: Math.abs(diff).toFixed(1), status, targetMins });
  };

  const statusColor: Record<string, string> = { Perfect: 'text-emerald-500', 'Too Long': 'text-red-500', 'Too Short': 'text-amber-500' };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" /> Script Timer Tool
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Check if your video script will hit your target length. Adjust speaking style to get an accurate read time estimate.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Speaking Style</label>
            <select value={style} onChange={e => setStyle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {Object.keys(WPM_BY_STYLE).map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Target Video Length (minutes)</label>
            <input type="number" value={targetMin} onChange={e => setTargetMin(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={8}
          placeholder="Paste your script here..."
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        <button onClick={analyze} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Time My Script
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-page border border-base rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-500">{result.actualMins as string} min</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Your Script Length</div>
            </div>
            <div className="bg-page border border-base rounded-xl p-4 text-center">
              <div className={`text-3xl font-bold ${statusColor[result.status as string]}`}>{result.status as string}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">{result.diff as string} min {result.status === 'Perfect' ? 'on target' : result.status === 'Too Long' ? 'over target' : 'under target'}</div>
            </div>
          </div>
          <div className="bg-page border border-base rounded-lg p-4 text-[13px] space-y-1.5">
            <div className="flex justify-between"><span className="text-[color:var(--text-muted)]">Current word count</span><span className="font-medium">{result.words as string} words</span></div>
            <div className="flex justify-between"><span className="text-[color:var(--text-muted)]">Words needed for {result.targetMins as string}min</span><span className="font-medium">{result.targetWords as string} words</span></div>
            <div className="flex justify-between"><span className="text-[color:var(--text-muted)]">Speaking pace</span><span className="font-medium">{result.wpm as string} WPM</span></div>
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
