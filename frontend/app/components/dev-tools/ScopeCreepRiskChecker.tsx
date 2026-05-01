'use client';
import React, { useState } from 'react';
import { TrendingUp, Briefcase } from 'lucide-react';

const QUESTIONS = [
  { id: 'noScope', label: 'The project scope was written in vague, non-specific terms (e.g. "build a website").', weight: 15 },
  { id: 'noRevisionLimit', label: 'There is no revision limit mentioned in the agreement.', weight: 12 },
  { id: 'newClient', label: 'This is your first project with this client and they have never hired freelancers before.', weight: 10 },
  { id: 'multipleDeciders', label: 'Multiple stakeholders are involved in approving deliverables.', weight: 12 },
  { id: 'noKillFee', label: 'There is no kill fee or cancellation clause if the project is abandoned.', weight: 10 },
  { id: 'vagueTimeline', label: 'The timeline has been described as "flexible" without fixed deadlines.', weight: 8 },
  { id: 'noBrief', label: 'No detailed creative brief, technical spec, or written requirements document exists.', weight: 14 },
  { id: 'smallUpfront', label: 'The upfront payment is less than 30% of the total project value.', weight: 10 },
  { id: 'addOn', label: 'The client has already requested "small additions" before the project even started.', weight: 18 },
  { id: 'excitedTalker', label: 'The client talks a lot about "future work" but is vague about this project\'s deliverables.', weight: 8 },
];

export default function ScopeCreepRiskChecker() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<{ score: number; level: string } | null>(null);

  const toggle = (id: string) => setAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  const check = () => {
    const score = Math.min(100, QUESTIONS.reduce((acc, q) => acc + (answers[q.id] ? q.weight : 0), 0));
    const level = score >= 50 ? 'High Risk' : score >= 25 ? 'Moderate Risk' : 'Low Risk';
    setResult({ score, level });
  };

  const colorClass = result ? (result.score >= 50 ? 'text-red-500' : result.score >= 25 ? 'text-amber-500' : 'text-emerald-500') : '';

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-500" /> Scope Creep Risk Checker
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Assess your project for scope creep vulnerability before signing. Check all statements that apply to your current project.
        </p>
        <div className="space-y-3">
          {QUESTIONS.map(q => (
            <label key={q.id} className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg hover:bg-amber-500/5 transition-colors border border-transparent hover:border-amber-500/10">
              <div className="relative flex-shrink-0 mt-0.5">
                <input type="checkbox" checked={!!answers[q.id]} onChange={() => toggle(q.id)} className="peer sr-only" />
                <div className="w-5 h-5 rounded border border-base bg-page peer-checked:bg-amber-500 peer-checked:border-amber-500 flex items-center justify-center transition-colors">
                  <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
              <span className="text-[14px] text-[color:var(--text-muted)] group-hover:text-[color:var(--text)] transition-colors">{q.label}</span>
            </label>
          ))}
        </div>
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-amber-500 text-white text-[14px] font-medium hover:bg-amber-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Assess My Risk
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl text-center space-y-4">
          <div className={`text-5xl font-bold ${colorClass}`}>{result.score}%</div>
          <div className={`text-[16px] font-semibold ${colorClass}`}>{result.level}</div>
          <div className="text-[13px] text-[color:var(--text-muted)] text-left space-y-2">
            {result.score >= 50 && <p>🔴 <strong>Do not sign without fixing the contract first.</strong> Add a numbered revision limit, define deliverables precisely, and require 50% upfront payment.</p>}
            {result.score >= 25 && result.score < 50 && <p>🟡 <strong>Negotiate protections before starting.</strong> Add a change request clause with your hourly rate, and set a revision cap in writing.</p>}
            {result.score < 25 && <p>🟢 <strong>Project looks well-scoped.</strong> Keep the signed brief accessible throughout and reference it if new requests come in.</p>}
          </div>
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
