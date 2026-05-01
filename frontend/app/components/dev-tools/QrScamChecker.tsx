'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const RED_FLAGS = [
  { id: 'urgency', label: 'QR code shown with excessive urgency — "Scan NOW or miss out!"', weight: 20 },
  { id: 'unknown', label: 'QR code source is unknown (physical sticker over original)', weight: 25 },
  { id: 'shortUrl', label: 'QR code resolves to a URL shortener (bit.ly, t.co) that hides destination', weight: 18 },
  { id: 'noHttps', label: 'Destination URL uses HTTP, not HTTPS', weight: 20 },
  { id: 'personalInfo', label: 'Destination page asks for Aadhaar, PAN, bank details, or OTP', weight: 30 },
  { id: 'paymentFirst', label: 'QR code asks you to PAY money (not receive it) — fake refund scam', weight: 35 },
  { id: 'prize', label: 'QR code promises a prize, reward, or lottery win', weight: 28 },
  { id: 'appInstall', label: 'Destination asks you to install an APK or unknown app', weight: 25 },
];

export default function QrScamChecker() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<{ score: number; verdict: string } | null>(null);

  const toggle = (id: string) => setAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  const check = () => {
    const score = Math.min(100, RED_FLAGS.reduce((s, q) => s + (answers[q.id] ? q.weight : 0), 0));
    const verdict = score >= 40 ? 'High Risk — Likely Scam' : score >= 20 ? 'Suspicious — Proceed with Caution' : 'Appears Safe';
    setResult({ score, verdict });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">QR Code Scam Checker</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Check a QR code against known Indian QR scam patterns (quishing attacks). Never scan unverified QR codes from strangers.</p>
        <div className="space-y-2">
          {RED_FLAGS.map(q => (
            <label key={q.id} className="flex items-start gap-3 cursor-pointer p-2.5 rounded-lg hover:bg-red-500/5 transition-colors">
              <div className="relative flex-shrink-0 mt-0.5">
                <input type="checkbox" checked={!!answers[q.id]} onChange={() => toggle(q.id)} className="peer sr-only" />
                <div className="w-5 h-5 rounded border border-base bg-page peer-checked:bg-red-500 peer-checked:border-red-500 flex items-center justify-center transition-colors">
                  <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
              <span className="text-[13px] text-[color:var(--text-muted)]">{q.label}</span>
            </label>
          ))}
        </div>
        <button onClick={check} className="w-full py-2.5 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Check QR Safety</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl text-center space-y-4">
          <div className={`text-5xl font-bold ${result.score >= 40 ? 'text-red-500' : result.score >= 20 ? 'text-amber-500' : 'text-emerald-500'}`}>{result.score}/100</div>
          <div className={`text-[15px] font-semibold ${result.score >= 40 ? 'text-red-500' : result.score >= 20 ? 'text-amber-500' : 'text-emerald-500'}`}>{result.verdict}</div>
          <p className="text-[13px] text-[color:var(--text-muted)]">{result.score >= 40 ? '🚫 Do NOT proceed. Report to cybercrime.gov.in or call 1930.' : result.score >= 20 ? '⚠ Verify the source before proceeding. Call the organization directly using their official number.' : '✓ No major red flags detected. Still verify the URL before entering any personal details.'}</p>
          <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-[12px] text-blue-600 dark:text-blue-400 text-left">
            <strong>Remember:</strong> In India, legitimate banks, NPCI, and government portals will NEVER ask you to scan a QR code to receive a refund or prize. Scanning a QR to pay is legitimate; being asked to scan to RECEIVE money is always a scam.
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
