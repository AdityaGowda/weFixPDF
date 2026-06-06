'use client';

import { useState, useMemo } from 'react';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import { ToolShell, CopyButton } from './SplitEditorPane';

const SAMPLE = `# Application
APP_NAME=MyApp
APP_ENV=production
APP_PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mydb
DB_USER=admin
DB_PASSWORD=

# Auth
JWT_SECRET=super-secret-key
JWT_EXPIRES_IN=7d
APP_NAME=MyApp

# External APIs
API_KEY=
STRIPE_KEY=sk_live_abc123`;

interface ParsedVar { key: string; value: string; line: number; isDuplicate: boolean; isEmpty: boolean }

function parseEnv(raw: string): ParsedVar[] {
  const seen = new Map<string, number>();
  const vars: ParsedVar[] = [];

  raw.split('\n').forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const eqIdx = trimmed.indexOf('=');
    if (eqIdx < 0) return;

    const key   = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');

    const isDuplicate = seen.has(key);
    if (!isDuplicate) seen.set(key, vars.length);

    vars.push({ key, value, line: idx + 1, isDuplicate, isEmpty: !value });
  });

  return vars;
}

export default function EnvFileParser() {
  const [raw, setRaw] = useState('');

  const vars     = useMemo(() => parseEnv(raw), [raw]);
  const dupKeys  = useMemo(() => new Set(vars.filter(v => v.isDuplicate).map(v => v.key)), [vars]);
  const empCount = vars.filter(v => v.isEmpty).length;

  const asJson = JSON.stringify(
    Object.fromEntries(vars.filter(v => !v.isDuplicate || true).map(v => [v.key, v.value])),
    null, 2,
  );
  const asExport = vars.map(v => `export ${v.key}="${v.value}"`).join('\n');

  const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';

  return (
    <ToolShell>
      <div className="space-y-4">
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>.env Contents</span>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setRaw(SAMPLE)} className={iconBtn}>Sample</button>
              {raw && <button onClick={() => setRaw('')} className={iconBtn}>Clear</button>}
            </div>
          </div>
          <textarea value={raw} onChange={e => setRaw(e.target.value)} spellCheck={false}
            placeholder={"Paste your .env file here…\nNOTHING is sent to any server — all processing is local."}
            className="w-full resize-none font-mono text-[12px] p-4 bg-transparent outline-none"
            style={{ minHeight: 160, color: 'var(--text)', caretColor: 'var(--text)' }} />
        </div>

        {vars.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-[rgba(124,58,237,0.1)] text-[#7C3AED]">
              {vars.length} variable{vars.length !== 1 ? 's' : ''}
            </span>
            {dupKeys.size > 0 && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                <AlertTriangle className="w-3 h-3" /> {dupKeys.size} duplicate key{dupKeys.size !== 1 ? 's' : ''}
              </span>
            )}
            {empCount > 0 && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                <AlertCircle className="w-3 h-3" /> {empCount} empty value{empCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        )}

        {vars.length > 0 && (
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <span className="w-2 h-2 rounded-full bg-[#163863]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Parsed Variables</span>
            </div>
            <div className="overflow-auto" style={{ maxHeight: 320 }}>
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                    {['Line','Key','Value','Status'].map(h => (
                      <th key={h} className="px-4 py-2 text-left text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vars.map((v, i) => (
                    <tr key={i} className={`border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] ${v.isDuplicate ? 'bg-red-50 dark:bg-red-900/10' : v.isEmpty ? 'bg-amber-50 dark:bg-amber-900/10' : ''}`}>
                      <td className="px-4 py-2 font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>{v.line}</td>
                      <td className="px-4 py-2">
                        <code className="font-mono font-medium" style={{ color: v.isDuplicate ? '#ef4444' : 'var(--text)' }}>{v.key}</code>
                      </td>
                      <td className="px-4 py-2">
                        {v.isEmpty
                          ? <span className="text-[11px] italic" style={{ color: 'var(--text-subtle)' }}>empty</span>
                          : <code className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>{v.value.length > 30 ? v.value.slice(0,30) + '…' : v.value}</code>
                        }
                      </td>
                      <td className="px-4 py-2">
                        {v.isDuplicate && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400">DUPLICATE</span>}
                        {v.isEmpty && !v.isDuplicate && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">EMPTY</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {vars.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Copy as JSON', text: asJson, mono: true },
              { label: 'Copy as shell exports', text: asExport, mono: true },
            ].map(({ label, text }) => (
              <div key={label} className="flex items-center justify-between rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] px-4 py-3">
                <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>{label}</span>
                <CopyButton text={text} />
              </div>
            ))}
          </div>
        )}

        {!raw && (
          <p className="text-center text-[12px]" style={{ color: 'var(--text-subtle)' }}>
            Paste your .env file above or click <strong>Sample</strong>. Nothing is sent to any server.
          </p>
        )}
      </div>
    </ToolShell>
  );
}
