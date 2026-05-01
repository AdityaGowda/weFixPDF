'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, RefreshCw, ShieldAlert, FileText, Info } from 'lucide-react';

export default function AdsenseApprovalChecker() {
  const [url, setUrl] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [answers, setAnswers] = useState<Record<string, boolean>>({
    domainAge: false,
    essentialPages: false,
    originalContent: false,
    navigation: false,
    noBannedContent: false,
  });

  const handleAnalyze = () => {
    setAnalyzing(true);
    setScore(null);

    // Simulate analysis delay
    setTimeout(() => {
      let currentScore = 20; // Base score
      
      // Calculate based on checklist
      if (answers.domainAge) currentScore += 15;
      if (answers.essentialPages) currentScore += 25;
      if (answers.originalContent) currentScore += 30;
      if (answers.navigation) currentScore += 10;
      
      // Banned content is an instant fail or heavy penalty
      if (!answers.noBannedContent) currentScore -= 50;

      setScore(Math.max(0, Math.min(100, currentScore)));
      setAnalyzing(false);
    }, 1500);
  };

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-emerald-500';
    if (s >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreMessage = (s: number) => {
    if (s >= 80) return 'High Probability of Approval! Ensure you have continuous traffic.';
    if (s >= 50) return 'Moderate Probability. Improve your content volume or fix missing pages.';
    return 'Low Probability. Major fixes required before applying.';
  };

  const toggleAnswer = (key: string) => {
    setAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" />
          AdSense Approval Readiness
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)] leading-relaxed">
          Google AdSense has strict policies for publishers. Since we cannot scan your entire website automatically from the browser, please complete this honest self-assessment to gauge your approval probability.
        </p>

        {/* URL Input (Cosmetic for context) */}
        <div>
          <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1.5">Website URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://yourblog.com"
            className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Checklist Questionnaire */}
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h3 className="text-[16px] font-medium text-[color:var(--text)]">Self-Assessment Checklist</h3>
        <div className="space-y-3">
          {[
            { id: 'domainAge', label: 'Is your domain older than 6 months?' },
            { id: 'essentialPages', label: 'Do you have Privacy Policy, Terms, About, and Contact pages?' },
            { id: 'originalContent', label: 'Do you have at least 20-30 high-quality, 100% original articles?' },
            { id: 'navigation', label: 'Is your website navigation clear and easy to use?' },
            { id: 'noBannedContent', label: 'Is your site free of adult, illegal, or copyrighted content?' },
          ].map((item) => (
            <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  checked={answers[item.id as keyof typeof answers]}
                  onChange={() => toggleAnswer(item.id)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 rounded border border-base bg-page peer-checked:bg-blue-500 peer-checked:border-blue-500 flex items-center justify-center transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
                </div>
              </div>
              <span className="text-[14px] text-[color:var(--text-muted)] group-hover:text-[color:var(--text)] transition-colors">
                {item.label}
              </span>
            </label>
          ))}
        </div>
        
        <button
          onClick={handleAnalyze}
          disabled={analyzing || !url.trim()}
          className="w-full py-2.5 mt-4 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
        >
          {analyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
          {analyzing ? 'Calculating Score...' : 'Calculate Approval Score'}
        </button>
        {!url.trim() && <p className="text-[12px] text-red-500 text-center mt-2">Please enter your website URL first.</p>}
      </div>

      {/* Results */}
      {score !== null && (
        <div className="bg-card border border-base p-6 rounded-xl text-center space-y-3 animate-in fade-in slide-in-from-bottom-2">
          <h3 className="text-[16px] font-medium text-[color:var(--text)]">Estimated Readiness Score</h3>
          <div className="flex justify-center items-center py-4">
            <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
              {score}%
            </div>
          </div>
          <p className="text-[14px] text-[color:var(--text)] font-medium">
            {getScoreMessage(score)}
          </p>
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg mt-4 flex items-start gap-3 text-left">
            <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-[13px] text-amber-600 dark:text-amber-400">
              Note: This is an estimation based on best practices. Google's actual review process involves human reviewers and automated systems that check for traffic quality, policy compliance, and site structure.
            </p>
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
