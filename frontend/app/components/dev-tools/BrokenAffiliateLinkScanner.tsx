'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function BrokenAffiliateLinkScanner() {
  const [links, setLinks] = useState('');
  const [result, setResult] = useState<{ url: string; status: string; issue: string }[] | null>(null);

  const check = () => {
    const urls = links.split('\n').map(l => l.trim()).filter(Boolean);
    const analysis = urls.map(url => {
      try {
        const u = new URL(url.startsWith('http') ? url : 'https://' + url);
        const lower = url.toLowerCase();
        
        if (lower.includes('amazon.com')) {
          if (!u.searchParams.has('tag')) return { url, status: 'Broken', issue: 'Missing Amazon tracking ID (?tag=...)' };
        } else if (lower.includes('shareasale.com')) {
          if (!u.searchParams.has('u') && !u.searchParams.has('urllink')) return { url, status: 'Broken', issue: 'Missing ShareASale affiliate ID' };
        } else if (lower.includes('clickbank.net')) {
          if (!lower.includes('hop=')) return { url, status: 'Broken', issue: 'Missing ClickBank hoplink' };
        } else if (lower.includes('impact.com') || lower.includes('impactradius')) {
          if (!u.searchParams.has('subId1') && !u.searchParams.has('irclickid')) return { url, status: 'Warning', issue: 'May be missing Impact tracking parameters' };
        }
        
        if (!url.startsWith('https://')) return { url, status: 'Warning', issue: 'Not using HTTPS' };
        
        return { url, status: 'Good', issue: 'Structure looks valid' };
      } catch (e) {
        return { url, status: 'Invalid', issue: 'Invalid URL format' };
      }
    });
    setResult(analysis);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Affiliate Link Structure Scanner</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Check your affiliate links (Amazon, ShareASale, ClickBank) to ensure tracking IDs are present. Missing tags mean lost commissions.</p>
        <textarea value={links} onChange={e => setLinks(e.target.value)} rows={6}
          placeholder="https://www.amazon.com/dp/B08N5WRWNW?tag=youraffiliate-20&#10;https://www.amazon.com/dp/B08N5WRWNW (missing tag)&#10;https://shareasale.com/r.cfm?b=12345"
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Scan Links</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-3">
          <h3 className="text-[14px] font-semibold text-[color:var(--text)]">Scan Results</h3>
          <div className="space-y-2">
            {result.map((r, i) => (
              <div key={i} className={`p-3 rounded-lg border text-[13px] ${r.status === 'Good' ? 'bg-emerald-500/10 border-emerald-500/20' : r.status === 'Warning' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                <div className="flex justify-between items-start gap-4">
                  <div className="font-mono break-all text-[color:var(--text)]">{r.url}</div>
                  <div className={`font-bold shrink-0 ${r.status === 'Good' ? 'text-emerald-500' : r.status === 'Warning' ? 'text-amber-500' : 'text-red-500'}`}>{r.status}</div>
                </div>
                {r.status !== 'Good' && <div className="mt-1 text-[color:var(--text-muted)]">Reason: {r.issue}</div>}
              </div>
            ))}
          </div>
          <p className="text-[12px] text-[color:var(--text-muted)]">This tool checks structural tracking parameters locally without making external network requests. It does not verify if the affiliate account is currently active.</p>
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
