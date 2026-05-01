'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function SitemapErrorChecker() {
  const [xml, setXml] = useState('');
  const [result, setResult] = useState<{ total: number; errors: string[]; warnings: string[]; score: number } | null>(null);

  const check = () => {
    if (!xml.trim()) return;
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!xml.includes('<?xml')) errors.push('Missing XML declaration (<?xml version="1.0" encoding="UTF-8"?>)');
    if (!xml.includes('<urlset') && !xml.includes('<sitemapindex')) errors.push('Missing required <urlset> or <sitemapindex> root element');
    if (!xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) warnings.push('Missing xmlns namespace declaration — may cause validation issues');

    const locs = xml.match(/<loc>(.*?)<\/loc>/g) || [];
    const total = locs.length;

    const nonHttps = locs.filter(l => !l.includes('https://')).length;
    if (nonHttps > 0) warnings.push(`${nonHttps} URL(s) using HTTP instead of HTTPS`);

    const duplicates = new Set<string>();
    const seen = new Set<string>();
    locs.forEach(l => {
      const url = l.replace(/<\/?loc>/g, '');
      if (seen.has(url)) duplicates.add(url);
      seen.add(url);
    });
    if (duplicates.size > 0) errors.push(`${duplicates.size} duplicate URL(s) found in sitemap`);

    if (total > 50000) errors.push(`Sitemap exceeds 50,000 URL limit (${total} URLs). Split into multiple sitemaps.`);
    if (total === 0) errors.push('No <loc> URLs found in the sitemap');

    const badPriority = (xml.match(/<priority>([^<]+)<\/priority>/g) || []).filter(p => {
      const val = parseFloat(p.replace(/<\/?priority>/g, ''));
      return isNaN(val) || val < 0 || val > 1;
    });
    if (badPriority.length > 0) warnings.push(`${badPriority.length} invalid <priority> value(s) — must be between 0.0 and 1.0`);

    const score = Math.max(0, 100 - errors.length * 20 - warnings.length * 8);
    setResult({ total, errors, warnings, score });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Sitemap Error Checker</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Paste your XML sitemap to validate structure, detect errors, and check for common SEO issues like duplicates and HTTP URLs.</p>
        <textarea value={xml} onChange={e => setXml(e.target.value)} rows={10}
          placeholder={'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://example.com/</loc></url>\n</urlset>'}
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Validate Sitemap</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center text-[12px]">
            {[{ l: 'URLs Found', v: result.total, c: 'text-blue-500' }, { l: 'Errors', v: result.errors.length, c: 'text-red-500' }, { l: 'Warnings', v: result.warnings.length, c: 'text-amber-500' }].map(({ l, v, c }) => (
              <div key={l} className="bg-page border border-base rounded-lg p-3"><div className={`text-2xl font-bold ${c}`}>{v}</div><div className="text-[color:var(--text-muted)]">{l}</div></div>
            ))}
          </div>
          <div className={`text-3xl font-bold text-center ${result.score >= 80 ? 'text-emerald-500' : result.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>{result.score}/100 Validity Score</div>
          {result.errors.map(e => <p key={e} className="text-[13px] text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 rounded px-3 py-2">🚫 {e}</p>)}
          {result.warnings.map(w => <p key={w} className="text-[13px] text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded px-3 py-2">⚠ {w}</p>)}
          {result.errors.length === 0 && result.warnings.length === 0 && <p className="text-emerald-500 text-[14px] text-center">✓ Sitemap looks valid!</p>}
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
