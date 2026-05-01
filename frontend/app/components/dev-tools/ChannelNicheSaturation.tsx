'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function ChannelNicheSaturation() {
  const [niche, setNiche] = useState('');
  const [language, setLanguage] = useState('English');
  const [format, setFormat] = useState('Long-form');
  const [result, setResult] = useState<{ score: number; level: string; tips: string[] } | null>(null);

  const NICHE_SATURATION: Record<string, number> = {
    'finance investing': 85, 'tech gadget review': 90, 'motivation': 88, 'gaming': 92, 'cooking recipe': 78,
    'travel vlog': 80, 'fitness workout': 82, 'education tutorial': 65, 'ai tutorial': 70, 'web development': 72,
    'freelancing': 60, 'productivity': 75, 'niche startup': 45, 'regional language': 35, 'vernacular': 30,
  };

  const estimate = () => {
    const lower = niche.toLowerCase();
    let base = 50;
    Object.entries(NICHE_SATURATION).forEach(([key, val]) => {
      if (lower.includes(key.split(' ')[0])) base = val;
    });
    if (language !== 'English') base -= 20;
    if (format === 'Shorts') base += 10;
    base = Math.min(100, Math.max(10, base));
    const level = base >= 80 ? 'Highly Saturated' : base >= 60 ? 'Moderately Saturated' : base >= 40 ? 'Growing Opportunity' : 'Low Competition';
    const tips: string[] = [];
    if (base >= 70) tips.push('Go hyper-niche — instead of "fitness", try "fitness for working moms India"');
    if (language === 'English') tips.push('Consider regional/vernacular content for 5–10x less competition');
    if (base >= 60) tips.push('Differentiate with original POV — real case studies, Indian examples, data');
    tips.push(`Best format for this niche: ${base >= 70 ? 'YouTube Shorts for discovery + Long-form for depth' : 'Long-form educational content'}`);
    setResult({ score: base, level, tips });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Channel Niche Saturation Checker</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Estimate how saturated your YouTube niche is and get strategies to differentiate your channel in a crowded space.</p>
        <div className="space-y-4">
          <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Your Niche (e.g. "finance investing India")</label>
            <input value={niche} onChange={e => setNiche(e.target.value)} placeholder="Describe your niche..." className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Content Language</label>
              <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
                {['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali', 'Marathi'].map(l => <option key={l}>{l}</option>)}</select></div>
            <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Content Format</label>
              <select value={format} onChange={e => setFormat(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
                {['Long-form', 'Shorts', 'Mix of Both'].map(f => <option key={f}>{f}</option>)}</select></div>
          </div>
        </div>
        <button onClick={estimate} className="w-full py-2.5 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Check Saturation</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`text-5xl font-bold text-center ${result.score >= 70 ? 'text-red-500' : result.score >= 50 ? 'text-amber-500' : 'text-emerald-500'}`}>{result.score}/100</div>
          <div className={`text-[15px] font-semibold text-center ${result.score >= 70 ? 'text-red-500' : result.score >= 50 ? 'text-amber-500' : 'text-emerald-500'}`}>{result.level}</div>
          <div className="space-y-2">
            <h3 className="text-[13px] font-semibold text-blue-500">💡 Differentiation Strategies:</h3>
            {result.tips.map(t => <p key={t} className="text-[13px] text-[color:var(--text-muted)] bg-page border border-base rounded px-3 py-2">• {t}</p>)}
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
