'use client';
import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

const QUESTIONS = [
  { id: 'vague', label: 'The job description is vague with no specific skills or responsibilities listed.', weight: 12 },
  { id: 'overpaid', label: 'The salary offered is 40%+ above the market rate for the role.', weight: 15 },
  { id: 'noCompany', label: 'You cannot find the company on LinkedIn, Glassdoor, or their website is new/missing.', weight: 18 },
  { id: 'upfrontFee', label: 'They asked you to pay for training, equipment, or background checks upfront.', weight: 25 },
  { id: 'noInterview', label: 'You received a job offer without a proper interview.', weight: 20 },
  { id: 'urgency', label: 'They are pressuring you to accept within 24–48 hours.', weight: 10 },
  { id: 'personalData', label: 'They asked for your Aadhaar, PAN, or bank details before any offer letter.', weight: 22 },
  { id: 'weirdEmail', label: 'The recruiter\'s email is a free Gmail/Yahoo address, not a company domain.', weight: 14 },
  { id: 'wfhEasy', label: 'The role is "work from home, just click links / process payments / resell items."', weight: 20 },
  { id: 'noLocation', label: 'There is no office address, phone number, or verifiable physical presence.', weight: 12 },
];

export default function FakeJobPostChecker() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<{ score: number; level: string } | null>(null);

  const toggle = (id: string) => setAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  const check = () => {
    const score = Math.min(100, QUESTIONS.reduce((acc, q) => acc + (answers[q.id] ? q.weight : 0), 0));
    const level = score >= 50 ? 'High Risk' : score >= 25 ? 'Moderate Risk' : 'Low Risk';
    setResult({ score, level });
  };

  const color = result ? (result.score >= 50 ? 'red' : result.score >= 25 ? 'amber' : 'emerald') : 'blue';

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" /> Fake Job Post Checker
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Assess a job posting for scam red flags. Check all statements that apply to the job you are evaluating.
        </p>
        <div className="space-y-3">
          {QUESTIONS.map(q => (
            <label key={q.id} className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg hover:bg-red-500/5 transition-colors border border-transparent hover:border-red-500/10">
              <div className="relative flex-shrink-0 mt-0.5">
                <input type="checkbox" checked={!!answers[q.id]} onChange={() => toggle(q.id)} className="peer sr-only" />
                <div className="w-5 h-5 rounded border border-base bg-page peer-checked:bg-red-500 peer-checked:border-red-500 flex items-center justify-center transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
                </div>
              </div>
              <span className="text-[14px] text-[color:var(--text-muted)] group-hover:text-[color:var(--text)] transition-colors">{q.label}</span>
            </label>
          ))}
        </div>
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-amber-500 text-white text-[14px] font-medium hover:bg-amber-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Check This Job
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl text-center space-y-4">
          <div className={`text-5xl font-bold ${color === 'red' ? 'text-red-500' : color === 'amber' ? 'text-amber-500' : 'text-emerald-500'}`}>
            {result.score}%
          </div>
          <div className={`text-[16px] font-semibold ${color === 'red' ? 'text-red-500' : color === 'amber' ? 'text-amber-500' : 'text-emerald-500'}`}>
            {result.level}
          </div>
          <p className="text-[13px] text-[color:var(--text-muted)]">
            {result.score >= 50 ? 'Do not proceed. Multiple high-risk indicators suggest this is a fraudulent job posting. Report it to the platform immediately.' : result.score >= 25 ? 'Proceed cautiously. Independently verify the company before sharing personal information or attending interviews.' : 'Appears relatively safe, but always verify the company independently and never pay any upfront fees.'}
          </p>
        </div>
      )}
    
      <div className="mt-8 bg-card border border-base p-6 rounded-xl space-y-4">
        <h3 className="text-[15px] font-semibold text-[color:var(--text)]">🔒 Privacy & Safe Usage</h3>
        <p className="text-[13px] text-[color:var(--text-muted)]">
          <strong>100% Private:</strong> This tool runs entirely in your browser. No data, inputs, or files are sent to our servers or saved anywhere.
        </p>
        <p className="text-[12px] text-[color:var(--text-muted)] opacity-80 border-t border-base pt-4">
          <strong>Disclaimer:</strong> This tool offers guidance only and does not guarantee hiring outcomes.
        </p>
      </div>
    </div>
  );
}
