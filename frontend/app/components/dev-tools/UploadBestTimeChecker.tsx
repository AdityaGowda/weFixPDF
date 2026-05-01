'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function UploadBestTimeChecker() {
  const [country, setCountry] = useState('India');
  const [niche, setNiche] = useState('Educational / Tutorial');
  const [platform, setPlatform] = useState('YouTube');

  const TIMES: Record<string, Record<string, { days: string[]; times: string; insight: string }>> = {
    India: {
      'YouTube': { days: ['Friday', 'Saturday', 'Sunday'], times: '7 PM – 10 PM IST', insight: 'Indian viewers peak after dinner (8-10 PM) and on weekends. Avoid 10 AM–3 PM weekday uploads.' },
      'Instagram': { days: ['Wednesday', 'Thursday', 'Friday'], times: '6 PM – 9 PM IST', insight: 'Engagement peaks Wed–Fri evenings. Stories perform best 9–11 AM and 7–9 PM.' },
      'LinkedIn': { days: ['Tuesday', 'Wednesday', 'Thursday'], times: '8 AM – 10 AM IST', insight: 'Professional audience engages before work and during lunch. Avoid weekends.' },
    },
    'United States': {
      'YouTube': { days: ['Thursday', 'Friday', 'Saturday'], times: '5 PM – 9 PM EST', insight: 'US viewers peak Thursday-Friday evenings and Saturday afternoons (2-4 PM).' },
      'Instagram': { days: ['Tuesday', 'Wednesday', 'Friday'], times: '11 AM – 1 PM EST', insight: 'US Instagram engagement highest during lunch breaks and early afternoons.' },
      'LinkedIn': { days: ['Tuesday', 'Wednesday', 'Thursday'], times: '7 AM – 9 AM EST', insight: 'US professionals check LinkedIn before 9 AM. Thursday posts get most weekly reach.' },
    },
  };

  const data = TIMES[country]?.[platform] ?? TIMES.India.YouTube;

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Upload Best Time Checker</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Find the optimal days and times to upload content for your platform and audience country based on engagement patterns.</p>
        <div className="grid grid-cols-3 gap-4">
          <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Audience Country</label>
            <select value={country} onChange={e => setCountry(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              <option>India</option><option>United States</option></select></div>
          <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              <option>YouTube</option><option>Instagram</option><option>LinkedIn</option></select></div>
          <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Niche</label>
            <select value={niche} onChange={e => setNiche(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {['Educational / Tutorial', 'Entertainment', 'Finance', 'Gaming', 'Tech', 'Lifestyle'].map(n => <option key={n}>{n}</option>)}</select></div>
        </div>
      </div>
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h3 className="text-[15px] font-semibold text-[color:var(--text)]">Best Upload Window: {country} — {platform}</h3>
        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
          <div className="text-2xl font-bold text-blue-500">{data.times}</div>
          <div className="text-[13px] text-[color:var(--text-muted)] mt-1">Optimal Upload Time</div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {data.days.map(d => <span key={d} className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[13px] font-medium text-emerald-600 dark:text-emerald-400">{d}</span>)}
        </div>
        <div className="bg-page border border-base rounded-lg p-4 text-[13px] text-[color:var(--text-muted)]">{data.insight}</div>
        <p className="text-[12px] text-[color:var(--text-muted)]">These are general engagement patterns. Always check your own YouTube Studio / Instagram Insights analytics for your specific audience&apos;s activity times.</p>
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
