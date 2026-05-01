'use client';
import React, { useState } from 'react';
import { TrendingUp, Youtube } from 'lucide-react';

export default function ChannelGrowthCalculator() {
  const [currentSubs, setCurrentSubs] = useState('5000');
  const [weeklyGrowth, setWeeklyGrowth] = useState('150');
  const [targetSubs, setTargetSubs] = useState('100000');
  const [result, setResult] = useState<Record<string, number | string> | null>(null);

  const calc = () => {
    const current = parseInt(currentSubs) || 0;
    const weekly = parseInt(weeklyGrowth) || 1;
    const target = parseInt(targetSubs) || 100000;
    if (current >= target) { setResult({ weeks: 0, months: 0, years: 0, status: 'Already reached!' }); return; }
    const remaining = target - current;
    const weeks = remaining / weekly;
    const months = weeks / 4.33;
    const years = months / 12;
    const milestones = [1000, 10000, 100000, 1000000].filter(m => m > current && m <= target);
    const milestoneTimes = milestones.map(m => ({
      milestone: m, weeks: (m - current) / weekly
    }));
    setResult({ weeks: Math.ceil(weeks), months: months.toFixed(1), years: years.toFixed(1), weekly, target, milestones: milestoneTimes.length });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <Youtube className="w-5 h-5 text-red-500" /> Channel Growth Calculator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Estimate how long it will take to reach your subscriber goal based on your current weekly growth rate.
        </p>
        <div className="space-y-4">
          {[
            { label: 'Current Subscribers', val: currentSubs, set: setCurrentSubs },
            { label: 'Average Weekly New Subscribers', val: weeklyGrowth, set: setWeeklyGrowth },
            { label: 'Target Subscribers', val: targetSubs, set: setTargetSubs },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Project Growth
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: 'Weeks', val: result.weeks },
              { label: 'Months', val: result.months },
              { label: 'Years', val: result.years },
            ].map(({ label, val }) => (
              <div key={label} className="bg-page border border-base rounded-xl p-4">
                <div className="text-3xl font-bold text-blue-500">{val as string}</div>
                <div className="text-[12px] text-[color:var(--text-muted)] mt-1">{label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-[13px] text-[color:var(--text-muted)]">
            At {result.weekly as string} subs/week, you will reach {(parseInt(targetSubs)).toLocaleString('en-IN')} subscribers in {result.months as string} months.
          </p>
          <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-[13px] text-amber-700 dark:text-amber-400">
            Growth is rarely linear. Viral videos can 10x your weekly rate, while posting gaps can cut it in half. Consistency is the most reliable growth lever.
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
