'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function DomainAgeTrustChecker() {
  const [domain, setDomain] = useState('');
  const [regYear, setRegYear] = useState('2020');
  const [result, setResult] = useState<Record<string, number | string> | null>(null);

  const check = () => {
    const yr = parseInt(regYear) || new Date().getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - yr;
    const trustScore = Math.min(100, age * 8 + 10);
    const level = age >= 10 ? 'High Trust' : age >= 5 ? 'Medium Trust' : age >= 2 ? 'Building Trust' : 'New Domain';
    const seoAdvantage = age >= 3 ? 'Yes' : age >= 1 ? 'Partial' : 'No';
    setResult({ age, trustScore, level, seoAdvantage });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Domain Age Trust Checker</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Estimate trust signals based on domain age. Older domains generally have more trust authority in Google&apos;s eyes.</p>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Domain Name</label>
            <input value={domain} onChange={e => setDomain(e.target.value)} placeholder="example.com" className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
          <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Registration Year</label>
            <input type="number" value={regYear} onChange={e => setRegYear(e.target.value)} placeholder="2018" className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" /></div>
        </div>
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Check Trust</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold text-blue-500">{result.trustScore as string}/100</div>
            <div className="text-[15px] font-semibold text-[color:var(--text)]">{result.level as string}</div>
            <div className="text-[13px] text-[color:var(--text-muted)]">Domain Age: {result.age as string} year{(result.age as number) !== 1 ? 's' : ''}</div>
          </div>
          <div className="space-y-2 text-[14px]">
            {[{ l: 'SEO Age Advantage', v: result.seoAdvantage }, { l: 'Google Trust Level', v: result.level }].map(({ l, v }) => (
              <div key={l} className="flex justify-between border-b border-base py-1.5 last:border-0">
                <span className="text-[color:var(--text-muted)]">{l}</span><span className="font-medium text-[color:var(--text)]">{v as string}</span>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-[color:var(--text-muted)]">Domain age is one of many trust signals. Content quality, backlinks, and E-E-A-T matter far more. Use Whois lookup for exact registration dates.</p>
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
