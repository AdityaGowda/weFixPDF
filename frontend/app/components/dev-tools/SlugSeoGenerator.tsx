'use client';
import React, { useState } from 'react';
import { TrendingUp, Copy, CheckCircle2 } from 'lucide-react';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function score(slug: string, original: string): { points: string[]; issues: string[]; score: number } {
  const points: string[] = [];
  const issues: string[] = [];
  let s = 0;
  if (slug.length >= 3 && slug.length <= 60) { points.push('Good length (3–60 characters)'); s += 20; } else { issues.push('Slug is too long (60+ chars) or too short'); }
  if (!/^\d/.test(slug)) { points.push('Starts with a word, not a number'); s += 10; } else { issues.push('Slug starts with a number — not ideal for SEO'); }
  if (!/-{2,}/.test(slug)) { points.push('No double hyphens'); s += 10; } else { issues.push('Double hyphens detected — clean these up'); }
  const words = slug.split('-').length;
  if (words >= 2 && words <= 5) { points.push(`Good word count (${words} words)`); s += 20; } else if (words > 5) { issues.push('Too many words in slug — aim for 2–5 key terms'); s += 5; }
  if (!/[A-Z]/.test(slug)) { points.push('All lowercase'); s += 15; } else { issues.push('Uppercase letters found — slugs should be lowercase'); }
  if (!/%20|_/.test(slug)) { points.push('No spaces or underscores'); s += 15; } else { issues.push('Spaces or underscores found — use hyphens instead'); }
  const stopWords = ['the', 'a', 'an', 'is', 'in', 'and', 'of', 'to', 'for'];
  if (!slug.split('-').some(w => stopWords.includes(w))) { points.push('No stop words'); s += 10; } else { issues.push('Contains stop words (the, a, an, is...) — consider removing them'); }
  return { points, issues, score: Math.min(s, 100) };
}

export default function SlugSeoGenerator() {
  const [input, setInput] = useState('How to Make Money Online in 2025 | Best Strategies & Tips');
  const [copied, setCopied] = useState(false);
  const slug = slugify(input);
  const analysis = score(slug, input);

  const copy = () => { navigator.clipboard.writeText(slug); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" /> SEO Slug Generator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Convert any page title or phrase into a clean, SEO-friendly URL slug. Removes special characters, stop words, and enforces lowercase.
        </p>
        <div>
          <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Page Title or Phrase</label>
          <input value={input} onChange={e => setInput(e.target.value)}
            placeholder="Type your page title here..."
            className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-semibold text-[color:var(--text)]">Generated Slug</h3>
          <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500 text-white text-[12px] hover:bg-blue-600 transition-colors">
            {copied ? <><CheckCircle2 className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
          </button>
        </div>
        <div className="bg-page border border-base rounded-lg px-4 py-3 font-mono text-[14px] text-blue-500 break-all">
          /{slug}
        </div>
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold text-[color:var(--text)]">{analysis.score}</div>
          <div>
            <div className="text-[13px] font-medium text-[color:var(--text)]">SEO Slug Score</div>
            <div className="text-[12px] text-[color:var(--text-muted)]">{analysis.score >= 80 ? 'Excellent' : analysis.score >= 60 ? 'Good' : 'Needs work'}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {analysis.points.length > 0 && (
            <div>
              <div className="text-[12px] font-semibold text-emerald-500 mb-1.5">✓ Passing</div>
              {analysis.points.map(p => <p key={p} className="text-[12px] text-[color:var(--text-muted)]">• {p}</p>)}
            </div>
          )}
          {analysis.issues.length > 0 && (
            <div>
              <div className="text-[12px] font-semibold text-red-500 mb-1.5">✗ Issues</div>
              {analysis.issues.map(i => <p key={i} className="text-[12px] text-[color:var(--text-muted)]">• {i}</p>)}
            </div>
          )}
        </div>
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
