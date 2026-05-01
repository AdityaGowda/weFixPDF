'use client';
import React, { useState } from 'react';
import { TrendingUp, IndianRupee } from 'lucide-react';

export default function FreelancerGstNeedChecker() {
  const [turnover, setTurnover] = useState('1500000');
  const [serviceType, setServiceType] = useState('IT / Software Services');
  const [clientType, setClientType] = useState('mix');
  const [state, setState] = useState('Non-special Category');
  const [result, setResult] = useState<{ required: boolean; reason: string; type: string; benefits: string[] } | null>(null);

  const THRESHOLDS: Record<string, number> = { 'Non-special Category': 2000000, 'Special Category (NE, J&K, etc.)': 1000000 };

  const check = () => {
    const t = parseFloat(turnover) || 0;
    const threshold = THRESHOLDS[state] ?? 2000000;
    const required = t >= threshold;
    const voluntaryBenefit = !required && clientType !== 'individuals-only';
    const reason = required
      ? `Your turnover of ₹${(t / 100000).toFixed(0)}L exceeds the ₹${(threshold / 100000).toFixed(0)}L threshold for ${state}.`
      : voluntaryBenefit
      ? `Not mandatory (below ₹${(threshold / 100000).toFixed(0)}L threshold), but voluntary registration is recommended for B2B clients.`
      : `Not required. Your turnover is below the ₹${(threshold / 100000).toFixed(0)}L threshold.`;
    const type = t > 5000000 ? 'Regular GST Registration (mandatory filing)' : 'Composition Scheme or Regular (your choice)';
    const benefits = required || voluntaryBenefit
      ? ['Claim ITC on software/tools/equipment purchases', 'Issue GST invoices to B2B clients (often required by corporate clients)', 'Appear more professional and credible', 'Expand into markets that require GST compliance']
      : ['Keep your billing simple without GST', 'Avoid quarterly GSTR filings', 'No GST on your services to end consumers'];
    setResult({ required, reason, type, benefits });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> Freelancer GST Need Checker
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Check if you need to register for GST as a freelancer in India based on your turnover and client type.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Annual Turnover / Revenue (₹)</label>
            <input type="number" value={turnover} onChange={e => setTurnover(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Primary Service Type</label>
            <select value={serviceType} onChange={e => setServiceType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {['IT / Software Services', 'Design / Creative', 'Content Writing', 'Consulting / Management', 'Digital Marketing', 'Other Services'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Primary Client Type</label>
            <select value={clientType} onChange={e => setClientType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              <option value="mix">Mix of B2B and B2C</option>
              <option value="b2b">Mostly B2B (companies/startups)</option>
              <option value="individuals-only">Mostly Individuals</option>
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Your State Category</label>
            <select value={state} onChange={e => setState(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              <option>Non-special Category</option>
              <option>Special Category (NE, J&K, etc.)</option>
            </select>
          </div>
        </div>
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Check GST Requirement
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`border p-4 rounded-xl text-[14px] ${result.required ? 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'}`}>
            <div className="text-[16px] font-bold mb-1">{result.required ? '⚠ GST Registration Required' : '✓ GST Registration Optional'}</div>
            <p>{result.reason}</p>
          </div>
          <div className="space-y-2 text-[13px]">
            <div className="font-medium text-[color:var(--text)]">{result.required ? 'Recommended Registration Type:' : 'Your Benefits:'}</div>
            {result.benefits.map((b, i) => <p key={i} className="text-[color:var(--text-muted)]">• {b}</p>)}
          </div>
          {result.required && (
            <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-[13px] text-blue-600 dark:text-blue-400">
              File your GSTR-1 monthly/quarterly and GSTR-3B monthly. Missing filings attract ₹50/day late fees.
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
