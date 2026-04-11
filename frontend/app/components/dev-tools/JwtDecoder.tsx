'use client';

import { useState, useEffect } from 'react';
import { Clock, Shield, AlertTriangle, Check } from 'lucide-react';
import { CopyButton, ToolShell, EditorTextarea } from './SplitEditorPane';
import { decodeJwt, type JwtParts } from './converters';

const SAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

function ClaimBadge({ label, value }: { label: string; value: unknown }) {
  const formatted =
    (label === 'exp' || label === 'iat' || label === 'nbf') && typeof value === 'number'
      ? `${value} (${new Date(value * 1000).toLocaleString()})`
      : JSON.stringify(value);
  return (
    <div className="flex gap-3 items-start py-2 border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)] last:border-0">
      <span className="text-[11px] font-mono font-medium px-1.5 py-0.5 rounded bg-[rgba(124,58,237,0.1)] text-[#7C3AED] dark:text-[#a78bfa] min-w-[60px] text-center flex-shrink-0">{label}</span>
      <span className="text-[13px] font-mono break-all" style={{ color: 'var(--text)' }}>{formatted}</span>
    </div>
  );
}

function SectionCard({ title, accent, icon: Icon, children, raw }: {
  title: string; accent: string; icon: React.ElementType;
  children: React.ReactNode; raw: string;
}) {
  return (
    <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden bg-[var(--bg-card)]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] bg-[var(--surface)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
          <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
          <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>{title}</span>
        </div>
        <CopyButton text={raw} />
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [parts, setParts] = useState<JwtParts | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token.trim()) { setParts(null); setError(null); return; }
    try {
      setParts(decodeJwt(token.trim()));
      setError(null);
    } catch (e) {
      setParts(null);
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [token]);

  return (
    <ToolShell>
      {/* Token input */}
      <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden bg-[var(--bg-card)] mb-4">
        <div className="flex items-center justify-between px-3 py-2 border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] bg-[var(--surface)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
            <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>JWT Token</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)]" style={{ color: 'var(--text-muted)' }}>
              never sent to server · browser-only
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setToken(SAMPLE_JWT)}
              className="text-[11px] font-medium px-2.5 py-1 rounded bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              Sample
            </button>
            {token && (
              <button
                onClick={() => { setToken(''); setParts(null); }}
                className="text-[11px] font-medium px-2.5 py-1 rounded bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <EditorTextarea
          value={token}
          onChange={setToken}
          placeholder="Paste your JWT here — eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."
          hasError={!!error && !!token}
          minHeight={80}
        />
        {error && token && (
          <div className="px-3 py-2 text-[11px] text-red-500 bg-red-50 dark:bg-red-900/20 border-t border-red-100 dark:border-red-800/30 flex items-center gap-1.5">
            <AlertTriangle className="w-3 h-3 flex-shrink-0" /> {error}
          </div>
        )}
      </div>

      {/* Expiry status banner */}
      {parts && (
        <div className={`flex items-center gap-2 rounded-lg px-3 py-2 mb-4 text-[12px] font-medium ${
          parts.isExpired === true
            ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
            : parts.isExpired === false
            ? 'bg-[#EAF3DE] dark:bg-emerald-900/20 text-[#3B6D11] dark:text-emerald-400'
            : 'bg-[var(--surface)] text-[var(--text-muted)]'
        }`}>
          {parts.isExpired === true && <><AlertTriangle className="w-3.5 h-3.5" /> Token is EXPIRED</>}
          {parts.isExpired === false && <><Check className="w-3.5 h-3.5" /> Token is VALID</>}
          {parts.isExpired === null && <><Clock className="w-3.5 h-3.5" /> No expiry claim (exp)</>}
          {parts.expiresAt && (
            <span className="ml-auto font-normal opacity-75">
              Expires: {parts.expiresAt.toLocaleString()}
            </span>
          )}
          {parts.issuedAt && !parts.expiresAt && (
            <span className="ml-auto font-normal opacity-75">
              Issued: {parts.issuedAt.toLocaleString()}
            </span>
          )}
        </div>
      )}

      {/* Decoded sections */}
      {parts && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Header */}
          <SectionCard
            title="Header"
            accent="#7C3AED"
            icon={Shield}
            raw={JSON.stringify(parts.header, null, 2)}
          >
            {Object.entries(parts.header).map(([k, v]) => <ClaimBadge key={k} label={k} value={v} />)}
          </SectionCard>

          {/* Payload */}
          <SectionCard
            title="Payload"
            accent="#163863"
            icon={Clock}
            raw={JSON.stringify(parts.payload, null, 2)}
          >
            {Object.entries(parts.payload).map(([k, v]) => <ClaimBadge key={k} label={k} value={v} />)}
          </SectionCard>
        </div>
      )}

      {/* Signature */}
      {parts && (
        <div className="mt-3 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden bg-[var(--bg-card)]">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] bg-[var(--surface)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Signature</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                not verified — display only
              </span>
            </div>
            <CopyButton text={parts.signature} />
          </div>
          <p className="px-4 py-3 font-mono text-[12px] break-all" style={{ color: 'var(--text-muted)' }}>
            {parts.signature}
          </p>
        </div>
      )}

      {!token && (
        <p className="text-center text-[12px] mt-2" style={{ color: 'var(--text-subtle)' }}>
          Paste a JWT above or click <strong>Sample</strong> — your token stays in your browser
        </p>
      )}
    </ToolShell>
  );
}
