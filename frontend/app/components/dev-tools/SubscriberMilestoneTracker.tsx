'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function SubscriberMilestoneTracker() {
  const [current, setCurrent] = useState('8500');
  const [weekly, setWeekly] = useState('200');

  const MILESTONES = [1000, 10000, 100000, 500000, 1000000, 10000000];
  const curr = parseInt(current) || 0;
  const wk = parseInt(weekly) || 1;

  const milestones = MILESTONES.map(m => {
    const remaining = m - curr;
    if (remaining <= 0) return { milestone: m, label: m >= 1000000 ? (m / 1000000) + 'M' : m >= 1000 ? (m / 1000) + 'K' : m.toString(), weeks: 0, done: true };
    const weeks = Math.ceil(remaining / wk);
    const months = (weeks / 4.33).toFixed(1);
    return { milestone: m, label: m >= 1000000 ? (m / 1000000) + 'M' : m >= 1000 ? (m / 1000) + 'K' : m.toString(), weeks, months, done: false };
  });

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Subscriber Milestone Tracker</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Track how far you are from each YouTube milestone and when you will reach them at your current growth rate.</p>
        <div className="grid grid-cols-2 gap-4">
          {[{ label: 'Current Subscribers', val: current, set: setCurrent }, { label: 'Weekly Growth', val: weekly, set: setWeekly }].map(({ label, val, set }) => (
            <div key={label}><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-base p-6 rounded-xl space-y-3">
        <h3 className="text-[14px] font-semibold text-[color:var(--text)]">Your Milestone Journey</h3>
        {milestones.map(m => (
          <div key={m.milestone} className={`flex items-center justify-between p-3 rounded-lg border ${m.done ? 'bg-emerald-500/10 border-emerald-500/20' : curr > 0 && m.milestone === milestones.find(x => !x.done)?.milestone ? 'bg-blue-500/10 border-blue-500/20' : 'bg-page border-base'}`}>
            <div className="flex items-center gap-3">
              <span className={`text-xl ${m.done ? '🏆' : '🎯'}`}></span>
              <span className={`font-bold text-[15px] ${m.done ? 'text-emerald-500' : 'text-[color:var(--text)]'}`}>{m.label}</span>
            </div>
            <div className="text-right">
              {m.done ? <span className="text-emerald-500 text-[13px] font-medium">✓ Achieved!</span> : (
                <div className="text-[13px]">
                  <div className="font-medium text-[color:var(--text)]">{m.months} months</div>
                  <div className="text-[color:var(--text-muted)]">{(m.milestone - curr).toLocaleString('en-IN')} to go</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    
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
