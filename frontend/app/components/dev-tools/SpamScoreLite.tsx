'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function SpamScoreLite() {
  const [url, setUrl] = useState('');
  const [checks, setChecks] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ score: number; level: string } | null>(null);

  const QUESTIONS = [
    { id: 'thin', label: 'Site has many pages with very little unique content (< 200 words)', weight: 15 },
    { id: 'exact', label: 'Site uses many exact-match anchor text links pointing to it', weight: 12 },
    { id: 'linkFarm', label: 'Site has backlinks from clearly unrelated niches (link farms)', weight: 18 },
    { id: 'noContact', label: 'Site has no contact page or privacy policy', weight: 10 },
    { id: 'highAds', label: 'Site has more ads than content above the fold', weight: 12 },
    { id: 'duplicate', label: 'Site has duplicate or scraped content from other sources', weight: 18 },
    { id: 'newDomain', label: 'Domain was registered less than 3 months ago', weight: 8 },
    { id: 'noSocial', label: 'Brand has no social media presence or all profiles are empty', weight: 7 },
  ];

  const toggle = (id: string, val: string) => setChecks(prev => ({ ...prev, [id]: val }));
  const check = () => {
    const score = Math.min(100, QUESTIONS.reduce((s, q) => s + (checks[q.id] === 'yes' ? q.weight : 0), 0));
    const level = score >= 50 ? 'High Spam Risk' : score >= 25 ? 'Moderate Risk' : 'Low Risk';
    setResult({ score, level });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Spam Score Lite</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Manually audit a site against Moz-style spam indicators. High spam score domains are toxic for backlinks.</p>
        <div className="space-y-3">
          {QUESTIONS.map(q => (
            <div key={q.id} className="bg-page border border-base rounded-lg p-3">
              <p className="text-[13px] text-[color:var(--text)] mb-2">{q.label}</p>
              <div className="flex gap-2">
                {['yes', 'no', 'unsure'].map(opt => (
                  <button key={opt} onClick={() => toggle(q.id, opt)}
                    className={`px-3 py-1 rounded text-[12px] capitalize border transition-colors ${checks[q.id] === opt ? (opt === 'yes' ? 'bg-red-500 border-red-500 text-white' : opt === 'no' ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-amber-500 border-amber-500 text-white') : 'border-base text-[color:var(--text-muted)] hover:border-blue-500'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 transition-colors">Calculate Spam Score</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl text-center space-y-3">
          <div className={`text-5xl font-bold ${result.score >= 50 ? 'text-red-500' : result.score >= 25 ? 'text-amber-500' : 'text-emerald-500'}`}>{result.score}/100</div>
          <div className={`text-[15px] font-semibold ${result.score >= 50 ? 'text-red-500' : result.score >= 25 ? 'text-amber-500' : 'text-emerald-500'}`}>{result.level}</div>
          <p className="text-[13px] text-[color:var(--text-muted)]">{result.score >= 50 ? 'Avoid building links from or to this site. Disavow existing links if needed via Google Search Console.' : result.score >= 25 ? 'Moderate caution advised. Investigate specific issues before acquiring or exchanging links.' : 'Site appears relatively clean. Always verify with Ahrefs or Semrush for data-backed scores.'}</p>
        </div>
      )}
    
      <div className="mt-8 bg-card border border-base p-6 rounded-xl space-y-4">
        <h3 className="text-[15px] font-semibold text-[color:var(--text)]">🔒 Privacy & Safe Usage</h3>
        <p className="text-[13px] text-[color:var(--text-muted)]">
          <strong>100% Private:</strong> This tool runs entirely in your browser. No data, inputs, or files are sent to our servers or saved anywhere.
        </p>
        <p className="text-[12px] text-[color:var(--text-muted)] opacity-80 border-t border-base pt-4">
          <strong>Disclaimer:</strong> This tool provides risk indicators only, not a final judgment.
        </p>
      </div>
    </div>
  );
}
