'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function MetaTagMissingScanner() {
  const [html, setHtml] = useState('');
  const [result, setResult] = useState<{ missing: string[]; present: string[]; score: number } | null>(null);

  const checks = [
    { id: 'title', label: 'Title Tag', pattern: /<title[^>]*>[^<]+<\/title>/i },
    { id: 'desc', label: 'Meta Description', pattern: /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i },
    { id: 'viewport', label: 'Viewport Meta (mobile)', pattern: /<meta[^>]+name=["']viewport["']/i },
    { id: 'charset', label: 'Charset Meta', pattern: /<meta[^>]+charset/i },
    { id: 'ogTitle', label: 'OG Title (Facebook/LinkedIn)', pattern: /<meta[^>]+property=["']og:title["']/i },
    { id: 'ogDesc', label: 'OG Description', pattern: /<meta[^>]+property=["']og:description["']/i },
    { id: 'ogImage', label: 'OG Image', pattern: /<meta[^>]+property=["']og:image["']/i },
    { id: 'twitterCard', label: 'Twitter Card', pattern: /<meta[^>]+name=["']twitter:card["']/i },
    { id: 'canonical', label: 'Canonical URL', pattern: /<link[^>]+rel=["']canonical["']/i },
    { id: 'robots', label: 'Robots Meta', pattern: /<meta[^>]+name=["']robots["']/i },
    { id: 'h1', label: 'H1 Tag', pattern: /<h1[^>]*>[^<]+<\/h1>/i },
    { id: 'lang', label: 'HTML Lang Attribute', pattern: /<html[^>]+lang=/i },
  ];

  const scan = () => {
    if (!html.trim()) return;
    const present: string[] = [];
    const missing: string[] = [];
    checks.forEach(c => {
      if (c.pattern.test(html)) present.push(c.label);
      else missing.push(c.label);
    });
    const score = Math.round((present.length / checks.length) * 100);
    setResult({ present, missing, score });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" /> Meta Tag Missing Scanner
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Paste your page&apos;s HTML source to detect missing meta tags, OG tags, and other critical SEO elements.
        </p>
        <textarea value={html} onChange={e => setHtml(e.target.value)} rows={10}
          placeholder="Paste the full HTML source of your page here (Ctrl+U in browser to view source)..."
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        <button onClick={scan} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Scan for Missing Tags
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="text-center">
            <div className={`text-4xl font-bold ${result.score >= 80 ? 'text-emerald-500' : result.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>{result.score}%</div>
            <div className="text-[13px] text-[color:var(--text-muted)]">Meta Tag Completeness ({result.present.length}/{checks.length} present)</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-[13px] font-semibold text-emerald-500 mb-2">✓ Present ({result.present.length})</h3>
              <div className="space-y-1.5">
                {result.present.map(p => <div key={p} className="text-[13px] text-[color:var(--text-muted)] bg-emerald-500/5 border border-emerald-500/10 rounded px-2 py-1">{p}</div>)}
              </div>
            </div>
            <div>
              <h3 className="text-[13px] font-semibold text-red-500 mb-2">✗ Missing ({result.missing.length})</h3>
              <div className="space-y-1.5">
                {result.missing.map(m => <div key={m} className="text-[13px] text-[color:var(--text-muted)] bg-red-500/5 border border-red-500/10 rounded px-2 py-1">{m}</div>)}
              </div>
            </div>
          </div>
          {result.missing.length > 0 && (
            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-[12px] text-amber-700 dark:text-amber-400">
              Priority fixes: Title, Meta Description, and OG Image have the highest impact on CTR and social sharing. Canonical URL prevents duplicate content issues.
            </div>
          )}
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
