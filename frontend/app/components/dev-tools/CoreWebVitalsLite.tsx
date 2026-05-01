'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function CoreWebVitalsLite() {
  const [url, setUrl] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ lcp: string; fid: string; cls: string; score: number } | null>(null);

  const questions = [
    { id: 'imgOptimized', label: 'Are hero images WebP/AVIF and properly sized with width/height attributes?', metric: 'LCP', pos: true },
    { id: 'lazyLoad', label: 'Are off-screen images lazy-loaded?', metric: 'LCP', pos: true },
    { id: 'fontPreload', label: 'Are fonts preloaded and do you use font-display: swap?', metric: 'LCP', pos: true },
    { id: 'adsOnLoad', label: 'Do ads or third-party scripts inject content at the top on page load?', metric: 'CLS', pos: false },
    { id: 'noImgDims', label: 'Do you have images without explicit width/height that shift on load?', metric: 'CLS', pos: false },
    { id: 'animationsJank', label: 'Are CSS animations or transitions causing layout reflow?', metric: 'CLS', pos: false },
    { id: 'unusedJs', label: 'Does your page load more than 300KB of JavaScript?', metric: 'FID', pos: false },
    { id: 'longTasks', label: 'Do analytics/chat/ads scripts load synchronously in <head>?', metric: 'FID', pos: false },
  ];

  const toggle = (id: string, val: string) => setAnswers(prev => ({ ...prev, [id]: val }));

  const check = () => {
    let lcpScore = 0, clsScore = 0, fidScore = 0;
    questions.forEach(q => {
      const ans = answers[q.id];
      if (!ans) return;
      const good = (q.pos && ans === 'yes') || (!q.pos && ans === 'no');
      if (q.metric === 'LCP') lcpScore += good ? 1 : 0;
      if (q.metric === 'CLS') clsScore += good ? 1 : 0;
      if (q.metric === 'FID') fidScore += good ? 1 : 0;
    });
    const lcp = lcpScore >= 3 ? 'Good' : lcpScore >= 1 ? 'Needs Improvement' : 'Poor';
    const cls = clsScore >= 3 ? 'Good' : clsScore >= 1 ? 'Needs Improvement' : 'Poor';
    const fid = fidScore >= 2 ? 'Good' : fidScore >= 1 ? 'Needs Improvement' : 'Poor';
    const score = Math.round(((lcpScore + clsScore + fidScore) / 8) * 100);
    setResult({ lcp, fid, cls, score });
  };

  const statusColor: Record<string, string> = { 'Good': 'text-emerald-500', 'Needs Improvement': 'text-amber-500', 'Poor': 'text-red-500' };
  const statusBg: Record<string, string> = { 'Good': 'bg-emerald-500/10 border-emerald-500/20', 'Needs Improvement': 'bg-amber-500/10 border-amber-500/20', 'Poor': 'bg-red-500/10 border-red-500/20' };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" /> Core Web Vitals Lite Checker
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Self-assess your site against Core Web Vitals signals — LCP, CLS, and FID — without any external API. Answer honestly about your implementation.
        </p>
        <div className="space-y-4">
          {questions.map(q => (
            <div key={q.id} className="bg-page border border-base rounded-lg p-4 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] text-[color:var(--text)]">{q.label}</p>
                <span className="text-[11px] font-bold text-blue-500 flex-shrink-0">{q.metric}</span>
              </div>
              <div className="flex gap-2">
                {['yes', 'no', 'unsure'].map(opt => (
                  <button key={opt} onClick={() => toggle(q.id, opt)}
                    className={`px-3 py-1 rounded text-[12px] capitalize transition-colors border ${answers[q.id] === opt ? 'bg-blue-500 border-blue-500 text-white' : 'border-base text-[color:var(--text-muted)] hover:border-blue-500 hover:text-blue-500'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors">
          Check Core Web Vitals
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[{ label: 'LCP', val: result.lcp }, { label: 'CLS', val: result.cls }, { label: 'FID / INP', val: result.fid }].map(({ label, val }) => (
              <div key={label} className={`border rounded-xl p-4 text-center ${statusBg[val]}`}>
                <div className={`text-[13px] font-bold ${statusColor[val]}`}>{val}</div>
                <div className="text-[11px] text-[color:var(--text-muted)] mt-1">{label}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[color:var(--text)]">{result.score}%</div>
            <div className="text-[13px] text-[color:var(--text-muted)]">Overall CWV Readiness Score</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-[12px] text-blue-600 dark:text-blue-400">
            For real measurements, use PageSpeed Insights (pagespeed.web.dev) or Google Search Console&apos;s Core Web Vitals report for field data.
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
