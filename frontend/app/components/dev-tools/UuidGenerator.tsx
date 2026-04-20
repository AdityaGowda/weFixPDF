'use client';

import { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { ToolShell, CopyButton } from './SplitEditorPane';

// ── UUID generation ────────────────────────────────────────────────────────────

function generateV4(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function stripHyphens(uuid: string): string {
  return uuid.replace(/-/g, '');
}

function toUpperCase(uuid: string): string {
  return uuid.toUpperCase();
}

const FORMATS = [
  { id: 'standard', label: 'Standard', fn: (u: string) => u },
  { id: 'no-hyphens', label: 'No hyphens', fn: (u: string) => stripHyphens(u) },
  { id: 'upper', label: 'Uppercase', fn: (u: string) => toUpperCase(u) },
  { id: 'braces', label: 'Braces', fn: (u: string) => `{${u}}` },
  { id: 'urn', label: 'URN', fn: (u: string) => `urn:uuid:${u}` },
] as const;

type FormatId = typeof FORMATS[number]['id'];

function applyFormat(uuid: string, formatId: FormatId): string {
  const fmt = FORMATS.find(f => f.id === formatId);
  return fmt ? fmt.fn(uuid) : uuid;
}

export default function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [format, setFormat] = useState<FormatId>('standard');
  const [uuids, setUuids] = useState<string[]>(() => Array.from({ length: 5 }, generateV4));
  const [allCopied, setAllCopied] = useState(false);

  const generate = useCallback(() => {
    setUuids(Array.from({ length: count }, generateV4));
  }, [count]);

  const handleCountChange = useCallback((n: number) => {
    const clamped = Math.max(1, Math.min(50, n));
    setCount(clamped);
    setUuids(Array.from({ length: clamped }, generateV4));
  }, []);

  const copyAll = useCallback(async () => {
    const text = uuids.map(u => applyFormat(u, format)).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setAllCopied(true);
      setTimeout(() => setAllCopied(false), 1500);
    } catch { /* ignore */ }
  }, [uuids, format]);

  const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';
  const activeBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors text-white';

  return (
    <ToolShell>
      <div className="space-y-4">
        {/* Controls */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Configuration</span>
            </div>
          </div>
          <div className="p-4 space-y-4">
            {/* Count */}
            <div className="flex items-center gap-3 flex-wrap">
              <label className="text-[12px] font-medium w-28 flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                How many
              </label>
              <div className="flex items-center gap-2">
                <button onClick={() => handleCountChange(count - 1)} className={iconBtn}>−</button>
                <input
                  type="number"
                  min={1} max={50}
                  value={count}
                  onChange={e => handleCountChange(parseInt(e.target.value) || 1)}
                  className="w-16 text-center text-[13px] font-mono px-2 py-1 rounded border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-transparent outline-none"
                  style={{ color: 'var(--text)' }}
                />
                <button onClick={() => handleCountChange(count + 1)} className={iconBtn}>+</button>
              </div>
            </div>

            {/* Format */}
            <div className="flex items-center gap-3 flex-wrap">
              <label className="text-[12px] font-medium w-28 flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                Format
              </label>
              <div className="flex items-center gap-1.5 flex-wrap">
                {FORMATS.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id)}
                    className={format === f.id ? `${activeBtn} bg-[#7C3AED]` : iconBtn}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#163863]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Generated UUIDs</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)]" style={{ color: 'var(--text-muted)' }}>v4</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={copyAll}
                className={allCopied ? `${activeBtn} bg-[#3B6D11] text-white` : iconBtn}
              >
                {allCopied ? 'Copied all!' : `Copy all ${uuids.length}`}
              </button>
              <button onClick={generate} className={iconBtn} title="Regenerate">
                <RefreshCw className="w-3 h-3" /> Regenerate
              </button>
            </div>
          </div>
          <div className="divide-y divide-[rgba(0,0,0,0.04)] dark:divide-[rgba(255,255,255,0.04)]">
            {uuids.map((uuid, i) => {
              const formatted = applyFormat(uuid, format);
              return (
                <div key={i} className="flex items-center justify-between px-4 py-2.5 group hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.02)]">
                  <code className="text-[12px] font-mono break-all flex-1 pr-3" style={{ color: 'var(--text)' }}>
                    {formatted}
                  </code>
                  <CopyButton text={formatted} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Info box */}
        <div className="rounded-lg px-4 py-3 text-[12px] space-y-1" style={{ background: 'rgba(124,58,237,0.05)', color: 'var(--text-muted)' }}>
          <p><strong style={{ color: 'var(--text)' }}>UUID v4</strong> — 122 random bits + 6 version/variant bits. Collision probability is astronomically low — about 1 in 5 undecillion for a billion UUIDs per second over 85 years.</p>
          <p>Generated entirely in your browser using <code className="font-mono text-[11px]">crypto.randomUUID()</code> — nothing leaves your device.</p>
        </div>
      </div>
    </ToolShell>
  );
}
