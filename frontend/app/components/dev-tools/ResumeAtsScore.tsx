'use client';
import React, { useState } from 'react';
import { TrendingUp, FileText } from 'lucide-react';

export default function ResumeAtsScore() {
  const [resume, setResume] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState<{ score: number; matched: string[]; missing: string[]; issues: string[] } | null>(null);

  const tokenize = (text: string) =>
    text.toLowerCase().match(/\b[a-z][a-z\d\+\#\.]{2,}\b/g)?.filter((w, i, a) => a.indexOf(w) === i) ?? [];

  const check = () => {
    if (!resume.trim() || !jobDesc.trim()) return;
    const jdTokens = tokenize(jobDesc);
    const resumeText = resume.toLowerCase();
    const matched = jdTokens.filter(t => resumeText.includes(t));
    const missing = jdTokens.filter(t => !resumeText.includes(t)).slice(0, 15);
    const issues: string[] = [];
    if (/\btable\b|\bcolumn\b/i.test(resume)) issues.push('Possible table layout detected — ATS parsers often misread multi-column formats.');
    if (!/experience|work history|employment/i.test(resume)) issues.push('No standard "Experience" section header found — ATS may not categorize your work history.');
    if (!/education|degree|university|college/i.test(resume)) issues.push('No "Education" section detected.');
    if (resume.split(/\n/).length < 10) issues.push('Resume appears very short. Add more detail to improve keyword density.');
    const score = Math.min(98, Math.round((matched.length / Math.max(jdTokens.length, 1)) * 100));
    setResult({ score, matched: matched.slice(0, 20), missing, issues });
  };

  const scoreColor = result ? (result.score >= 70 ? 'text-emerald-500' : result.score >= 40 ? 'text-amber-500' : 'text-red-500') : '';

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" /> Resume ATS Score
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Paste your resume and the job description to check keyword match rate and ATS compatibility issues.
        </p>
        <div>
          <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Your Resume (paste as plain text)</label>
          <textarea value={resume} onChange={e => setResume(e.target.value)} rows={8}
            placeholder="Paste your resume here as plain text. Remove any tables or columns first..."
            className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Target Job Description</label>
          <textarea value={jobDesc} onChange={e => setJobDesc(e.target.value)} rows={6}
            placeholder="Paste the full job description here..."
            className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        </div>
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Check ATS Score
        </button>
      </div>

      {result && (
        <>
          <div className="bg-card border border-base p-6 rounded-xl text-center space-y-2">
            <div className={`text-6xl font-bold ${scoreColor}`}>{result.score}%</div>
            <div className="text-[14px] text-[color:var(--text-muted)]">Keyword Match Rate</div>
            <p className="text-[13px] text-[color:var(--text-muted)]">
              {result.score >= 70 ? 'Good match! Your resume covers most key terms from the job description.' : result.score >= 40 ? 'Moderate match. Add more of the missing keywords in context.' : 'Low match. Tailor your resume specifically to this job description.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-card border border-base p-5 rounded-xl">
              <h3 className="text-[14px] font-semibold text-emerald-500 mb-3">✓ Matched Keywords ({result.matched.length})</h3>
              <div className="flex flex-wrap gap-1.5">
                {result.matched.map(k => <span key={k} className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[12px] text-emerald-600 dark:text-emerald-400">{k}</span>)}
              </div>
            </div>
            <div className="bg-card border border-base p-5 rounded-xl">
              <h3 className="text-[14px] font-semibold text-red-500 mb-3">✗ Missing Keywords ({result.missing.length})</h3>
              <div className="flex flex-wrap gap-1.5">
                {result.missing.map(k => <span key={k} className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[12px] text-red-600 dark:text-red-400">{k}</span>)}
              </div>
            </div>
          </div>
          {result.issues.length > 0 && (
            <div className="bg-card border border-base p-5 rounded-xl space-y-2">
              <h3 className="text-[14px] font-semibold text-amber-500">⚠ Formatting Issues</h3>
              {result.issues.map((issue, i) => <p key={i} className="text-[13px] text-[color:var(--text-muted)]">• {issue}</p>)}
            </div>
          )}
        </>
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
