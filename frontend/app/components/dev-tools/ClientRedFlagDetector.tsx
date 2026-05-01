'use client';
import React, { useState } from 'react';
import { TrendingUp, Users } from 'lucide-react';

const RED_FLAGS = [
  { id: 'portfolio', label: '"Can you do a small test project first?" (unpaid spec work)', weight: 20 },
  { id: 'badPrev', label: '"My last developer/designer did a terrible job" (blaming always)', weight: 18 },
  { id: 'lowball', label: 'They immediately pushed back on your price with competitor rates', weight: 15 },
  { id: 'rush', label: '"I need this done by tomorrow / this weekend" (first contact)', weight: 12 },
  { id: 'noDecider', label: '"I\'ll need to show this to my partner/boss/team for approval"', weight: 14 },
  { id: 'future', label: 'Heavy emphasis on "lots of future work" but vague about current scope', weight: 12 },
  { id: 'nephew', label: '"My cousin can do this cheaper / my nephew knows this stuff"', weight: 16 },
  { id: 'freeFirst', label: 'Asked for ideas, mockups, or strategy in the sales call without payment', weight: 18 },
  { id: 'noEmail', label: 'Only communicates via phone, refuses written communication', weight: 14 },
  { id: 'smallBudget', label: '"We have a very limited budget but it\'ll be great for your portfolio"', weight: 20 },
];

export default function ClientRedFlagDetector() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<{ score: number } | null>(null);

  const toggle = (id: string) => setAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  const check = () => {
    const score = Math.min(100, RED_FLAGS.reduce((acc, q) => acc + (answers[q.id] ? q.weight : 0), 0));
    setResult({ score });
  };

  const getLevel = (s: number) => s >= 50 ? { label: 'Avoid This Client', color: 'red' } : s >= 25 ? { label: 'Proceed With Caution', color: 'amber' } : { label: 'Green Light', color: 'emerald' };

  const level = result ? getLevel(result.score) : null;

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <Users className="w-5 h-5 text-red-500" /> Client Red Flag Detector
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Score your potential client against 10 proven red flag patterns before investing time in proposals or discovery calls.
        </p>
        <div className="space-y-3">
          {RED_FLAGS.map(q => (
            <label key={q.id} className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg hover:bg-red-500/5 transition-colors border border-transparent hover:border-red-500/10">
              <div className="relative flex-shrink-0 mt-0.5">
                <input type="checkbox" checked={!!answers[q.id]} onChange={() => toggle(q.id)} className="peer sr-only" />
                <div className="w-5 h-5 rounded border border-base bg-page peer-checked:bg-red-500 peer-checked:border-red-500 flex items-center justify-center transition-colors">
                  <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
              <span className="text-[14px] text-[color:var(--text-muted)] group-hover:text-[color:var(--text)] transition-colors">{q.label}</span>
            </label>
          ))}
        </div>
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Detect Red Flags
        </button>
      </div>
      {result && level && (
        <div className="bg-card border border-base p-6 rounded-xl text-center space-y-4">
          <div className={`text-5xl font-bold ${level.color === 'red' ? 'text-red-500' : level.color === 'amber' ? 'text-amber-500' : 'text-emerald-500'}`}>
            {result.score}/100
          </div>
          <div className={`text-[16px] font-semibold ${level.color === 'red' ? 'text-red-500' : level.color === 'amber' ? 'text-amber-500' : 'text-emerald-500'}`}>
            {level.label}
          </div>
          <p className="text-[13px] text-[color:var(--text-muted)]">
            {result.score >= 50 ? 'Multiple high-risk patterns detected. Bad clients cost more than no clients — both in time and mental health.' : result.score >= 25 ? 'Some red flags present. Require 50% upfront, clear written scope, and numbered revision limits before starting.' : 'No major red flags. Still use a proper contract with revision limits and a kill fee clause.'}
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
