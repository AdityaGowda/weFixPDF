'use client';
import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';

function b64decode(s: string): string {
  try { return atob(s.replace(/-/g, '+').replace(/_/g, '/')); } catch { return ''; }
}

interface Risk { level: 'critical' | 'warn' | 'info' | 'ok'; msg: string; }

function analyzeRisks(header: Record<string,unknown>, payload: Record<string,unknown>): Risk[] {
  const r: Risk[] = [];
  if (!header?.alg || header.alg === 'none') r.push({ level: 'critical', msg: 'Algorithm is "none" — no signature validation. Tokens can be forged.' });
  if (header?.alg === 'HS256') r.push({ level: 'warn', msg: 'HS256 uses a symmetric secret. Ensure it is at least 256 bits and not a dictionary word.' });
  if (!payload?.exp) r.push({ level: 'critical', msg: 'No expiry (exp) claim — this token never expires!' });
  if (payload?.exp && (payload.exp as number) < Date.now() / 1000) r.push({ level: 'critical', msg: 'Token is EXPIRED.' });
  if (payload?.email || payload?.password || payload?.ssn) r.push({ level: 'warn', msg: 'Sensitive PII in payload. JWTs are base64-encoded, NOT encrypted — anyone can read them.' });
  if (!payload?.iss) r.push({ level: 'info', msg: 'No issuer (iss) claim. Recommended to identify who issued the token.' });
  if (!payload?.aud) r.push({ level: 'info', msg: 'No audience (aud) claim. Recommended to prevent token misuse across services.' });
  if (r.length === 0) r.push({ level: 'ok', msg: 'No major security issues detected.' });
  return r;
}

const BG: Record<string, string> = {
  critical: 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400',
  warn: 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400',
  info: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
  ok: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
};

export default function JwtDecoderRiskScan() {
  const [jwt, setJwt] = useState('');
  const [decoded, setDecoded] = useState<{ header: Record<string,unknown>; payload: Record<string,unknown>; risks: Risk[]; expDate: string | null; } | null>(null);
  const [err, setErr] = useState('');

  const decode = () => {
    setErr(''); setDecoded(null);
    const parts = jwt.trim().split('.');
    if (parts.length < 2) { setErr('Invalid JWT: needs at least 2 parts separated by dots.'); return; }
    try {
      const header = JSON.parse(b64decode(parts[0]));
      const payload = JSON.parse(b64decode(parts[1]));
      const risks = analyzeRisks(header, payload);
      const expDate = payload?.exp ? new Date((payload.exp as number) * 1000).toLocaleString() : null;
      setDecoded({ header, payload, risks, expDate });
    } catch { setErr('Could not parse token. Ensure it is a valid JWT (header.payload.signature).'); }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-500" /> JWT Decoder + Risk Scanner
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Decode and audit JWT tokens for security risks. Runs 100% in your browser — your token is never transmitted.
        </p>
        <textarea value={jwt} onChange={e => setJwt(e.target.value)} rows={4}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0In0.abc"
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[12px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-none" />
        {err && <p className="text-[13px] text-red-500">{err}</p>}
        <button onClick={decode} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors">
          Decode &amp; Audit Token
        </button>
      </div>

      {decoded && (
        <>
          <div className="bg-card border border-base p-6 rounded-xl space-y-3">
            <h3 className="text-[15px] font-semibold text-[color:var(--text)] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Security Analysis
            </h3>
            {decoded.risks.map((r, i) => (
              <div key={i} className={`border p-3 rounded-lg text-[13px] ${BG[r.level]}`}>
                <span className="font-bold uppercase mr-2">{r.level}:</span>{r.msg}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{ title: 'Header', data: decoded.header }, { title: 'Payload', data: decoded.payload }].map(({ title, data }) => (
              <div key={title} className="bg-card border border-base p-5 rounded-xl">
                <h3 className="text-[14px] font-semibold text-[color:var(--text)] mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />{title}
                </h3>
                <pre className="text-[12px] font-mono text-[color:var(--text-muted)] overflow-auto bg-page p-3 rounded-lg">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            ))}
          </div>
          {decoded.expDate && (
            <div className="bg-card border border-base p-4 rounded-xl text-[13px] text-[color:var(--text-muted)]">
              Token expires: <span className="font-medium text-[color:var(--text)]">{decoded.expDate}</span>
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
          <strong>Disclaimer:</strong> This tool provides risk indicators only, not a final judgment.
        </p>
      </div>
    </div>
  );
}
