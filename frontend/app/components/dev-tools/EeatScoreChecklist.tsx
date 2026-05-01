'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const EEAT_CHECKS = [
  { cat: 'Experience', items: [
    { id: 'e1', label: 'The author has first-hand experience with the topic (stated explicitly in the content).' },
    { id: 'e2', label: 'Personal case studies, real results, or original data are included.' },
    { id: 'e3', label: 'Author bio is present with relevant real-world experience mentioned.' },
  ]},
  { cat: 'Expertise', items: [
    { id: 'x1', label: 'Author has verifiable credentials, degrees, or professional qualifications in this topic.' },
    { id: 'x2', label: 'Content contains specific, detailed insights not found on generic articles.' },
    { id: 'x3', label: 'Technical claims are accurate and up-to-date with current industry standards.' },
  ]},
  { cat: 'Authoritativeness', items: [
    { id: 'a1', label: 'The website has external backlinks from authoritative domains in this niche.' },
    { id: 'a2', label: 'The author or brand is mentioned/quoted by other reputable sites.' },
    { id: 'a3', label: 'Editorial standards and review processes are visible (e.g. "Reviewed by..." label).' },
  ]},
  { cat: 'Trustworthiness', items: [
    { id: 't1', label: 'The website has a clear Privacy Policy and Terms of Service.' },
    { id: 't2', label: 'Contact information (email, phone, address) is present and verified.' },
    { id: 't3', label: 'Sources and references are cited for factual claims.' },
    { id: 't4', label: 'No deceptive ads or misleading content on the page.' },
    { id: 't5', label: 'HTTPS is used and security certificate is valid.' },
  ]},
];

export default function EeatScoreChecklist() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<{ score: number; max: number } | null>(null);

  const toggle = (id: string) => setAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  const check = () => {
    const total = EEAT_CHECKS.flatMap(c => c.items).length;
    const checked = Object.values(answers).filter(Boolean).length;
    setResult({ score: checked, max: total });
  };

  const pct = result ? Math.round((result.score / result.max) * 100) : 0;
  const scoreColor = pct >= 80 ? 'emerald' : pct >= 50 ? 'amber' : 'red';

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" /> E-E-A-T Score Checklist
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Audit your content against Google&apos;s E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) quality signals.
        </p>
        {EEAT_CHECKS.map(section => (
          <div key={section.cat} className="space-y-2">
            <h3 className="text-[13px] font-bold text-blue-500 uppercase tracking-wide">{section.cat}</h3>
            {section.items.map(item => (
              <label key={item.id} className="flex items-start gap-3 cursor-pointer group p-2 rounded-lg hover:bg-blue-500/5 transition-colors">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input type="checkbox" checked={!!answers[item.id]} onChange={() => toggle(item.id)} className="peer sr-only" />
                  <div className="w-5 h-5 rounded border border-base bg-page peer-checked:bg-blue-500 peer-checked:border-blue-500 flex items-center justify-center transition-colors">
                    <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>
                <span className="text-[13px] text-[color:var(--text-muted)] group-hover:text-[color:var(--text)] transition-colors">{item.label}</span>
              </label>
            ))}
          </div>
        ))}
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors">
          Calculate E-E-A-T Score
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl text-center space-y-3">
          <div className={`text-5xl font-bold ${scoreColor === 'emerald' ? 'text-emerald-500' : scoreColor === 'amber' ? 'text-amber-500' : 'text-red-500'}`}>
            {result.score}/{result.max}
          </div>
          <div className="text-[14px] text-[color:var(--text-muted)]">{pct}% E-E-A-T Compliance</div>
          <p className="text-[13px] text-[color:var(--text-muted)]">
            {pct >= 80 ? 'Excellent! Your content demonstrates strong trust signals. Focus on building more external citations.' : pct >= 50 ? 'Moderate E-E-A-T. Prioritize Trust signals first (HTTPS, privacy policy, contact info) as they have the highest Google weighting.' : 'Low E-E-A-T. This content is at risk of ranking suppression. Start with adding an author bio, cite your sources, and ensure HTTPS.'}
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
