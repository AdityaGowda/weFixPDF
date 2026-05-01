'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function CreatorBurnoutPlanner() {
  const [videosPerWeek, setVideosPerWeek] = useState('3');
  const [hrsPerVideo, setHrsPerVideo] = useState('8');
  const [otherWork, setOtherWork] = useState('20');
  const [sleepHrs, setSleepHrs] = useState('7');
  const [daysOff, setDaysOff] = useState('1');
  const [result, setResult] = useState<Record<string, number | string> | null>(null);

  const calc = () => {
    const vpw = parseFloat(videosPerWeek) || 0;
    const hpv = parseFloat(hrsPerVideo) || 0;
    const ow = parseFloat(otherWork) || 0;
    const sleep = parseFloat(sleepHrs) || 7;
    const days = 7 - parseFloat(daysOff);
    const contentHrs = vpw * hpv;
    const totalWorkHrs = contentHrs + ow;
    const availableHrs = days * (24 - sleep);
    const burnoutRisk = Math.min(100, Math.round((totalWorkHrs / availableHrs) * 100));
    const freeHrs = Math.max(0, availableHrs - totalWorkHrs);
    const status = burnoutRisk >= 80 ? 'High Burnout Risk' : burnoutRisk >= 60 ? 'Moderate Risk' : 'Sustainable';
    setResult({ contentHrs, totalWorkHrs, availableHrs, burnoutRisk, freeHrs, status });
  };

  const statusColor: Record<string, string> = { 'High Burnout Risk': 'text-red-500', 'Moderate Risk': 'text-amber-500', Sustainable: 'text-emerald-500' };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Creator Burnout Planner</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Calculate your weekly work hours and burnout risk. Find a sustainable content schedule that won&apos;t break you.</p>
        <div className="grid grid-cols-2 gap-4">
          {[{ label: 'Videos per Week', val: videosPerWeek, set: setVideosPerWeek }, { label: 'Hours per Video (total)', val: hrsPerVideo, set: setHrsPerVideo }, { label: 'Other Work Hours/Week', val: otherWork, set: setOtherWork }, { label: 'Sleep Hours per Night', val: sleepHrs, set: setSleepHrs }, { label: 'Days Off per Week', val: daysOff, set: setDaysOff }].map(({ label, val, set }) => (
            <div key={label}><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Analyze Schedule</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`text-center text-3xl font-bold ${statusColor[result.status as string]}`}>{result.status as string}</div>
          <div className="grid grid-cols-3 gap-3 text-center text-[12px]">
            {[{ l: 'Content Hours', v: result.contentHrs + 'h', c: 'text-blue-500' }, { l: 'Total Work Hours', v: result.totalWorkHrs + 'h', c: 'text-amber-500' }, { l: 'Free Hours', v: result.freeHrs + 'h', c: 'text-emerald-500' }].map(({ l, v, c }) => (
              <div key={l} className="bg-page border border-base rounded-lg p-3"><div className={`text-xl font-bold ${c}`}>{v as string}</div><div className="text-[color:var(--text-muted)]">{l}</div></div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[13px]"><span className="text-[color:var(--text-muted)]">Burnout Risk Score</span><span className="font-bold text-[color:var(--text)]">{result.burnoutRisk as string}%</span></div>
            <div className="h-3 bg-page border border-base rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${(result.burnoutRisk as number) >= 80 ? 'bg-red-500' : (result.burnoutRisk as number) >= 60 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: result.burnoutRisk + '%' }} />
            </div>
          </div>
          {(result.burnoutRisk as number) >= 70 && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-[13px] text-red-600 dark:text-red-400">
              <strong>Action needed:</strong> Reduce to 1–2 videos/week, batch script + film in one day, and use repurposing to extend content reach without extra effort.
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
