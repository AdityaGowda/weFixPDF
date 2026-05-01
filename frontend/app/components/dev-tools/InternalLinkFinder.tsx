'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function InternalLinkFinder() {
  const [content, setContent] = useState('');
  const [pages, setPages] = useState('');
  const [result, setResult] = useState<{ opportunities: { page: string; keyword: string }[]; total: number } | null>(null);

  const find = () => {
    if (!content.trim() || !pages.trim()) return;
    const pageList = pages.split('\n').map(p => p.trim()).filter(Boolean);
    const opportunities: { page: string; keyword: string }[] = [];
    pageList.forEach(page => {
      const parts = page.split('|');
      const url = parts[0]?.trim() ?? '';
      const keywords = parts[1]?.split(',').map(k => k.trim()) ?? [url.split('/').pop() ?? ''];
      keywords.forEach(kw => {
        if (kw && content.toLowerCase().includes(kw.toLowerCase())) {
          opportunities.push({ page: url, keyword: kw });
        }
      });
    });
    setResult({ opportunities, total: opportunities.length });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Internal Link Finder</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Paste your article and a list of target pages to automatically find internal linking opportunities.</p>
        <div>
          <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Target Pages (URL | keywords to match, one per line)</label>
          <textarea value={pages} onChange={e => setPages(e.target.value)} rows={5}
            placeholder={'/blog/seo-tips | SEO, search engine, ranking\n/tools/keyword-research | keywords, keyword research\n/blog/content-marketing | content, blog, marketing'}
            className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Your Article Content (paste full text)</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={6}
            placeholder="Paste your article text here to find where internal links can be added..."
            className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        </div>
        <button onClick={find} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Find Link Opportunities</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`text-center text-3xl font-bold ${result.total > 0 ? 'text-blue-500' : 'text-[color:var(--text-muted)]'}`}>{result.total} Opportunity{result.total !== 1 ? 'ies' : 'y'} Found</div>
          {result.total === 0 ? (
            <p className="text-[13px] text-[color:var(--text-muted)] text-center">No matching keywords found. Try adding more keywords per page or check your article text.</p>
          ) : (
            <div className="space-y-2">
              {result.opportunities.map((o, i) => (
                <div key={i} className="bg-page border border-base rounded-lg p-3 flex items-start justify-between gap-3 text-[13px]">
                  <div>
                    <div className="font-medium text-blue-500">{o.page}</div>
                    <div className="text-[color:var(--text-muted)]">Match: &quot;{o.keyword}&quot;</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="text-[12px] text-[color:var(--text-muted)]">Add 3–5 internal links per article. Link contextually — the keyword should naturally appear near relevant content.</p>
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
