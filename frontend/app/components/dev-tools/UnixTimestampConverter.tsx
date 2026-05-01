'use client';

import { useState, useCallback } from 'react';
import { Clock } from 'lucide-react';
import { ToolShell, CopyButton } from './SplitEditorPane';

function relativeTime(d: Date): string {
  const diff = Date.now() - d.getTime();
  const abs  = Math.abs(diff);
  const future = diff < 0;
  const sfx = (n: number, unit: string) => future ? `in ${n} ${unit}` : `${n} ${unit} ago`;
  if (abs < 60_000)         return 'just now';
  if (abs < 3_600_000)      return sfx(Math.round(abs / 60_000),         'minutes');
  if (abs < 86_400_000)     return sfx(Math.round(abs / 3_600_000),      'hours');
  if (abs < 2_592_000_000)  return sfx(Math.round(abs / 86_400_000),     'days');
  if (abs < 31_536_000_000) return sfx(Math.round(abs / 2_592_000_000),  'months');
  return sfx(Math.round(abs / 31_536_000_000), 'years');
}

interface Row { label: string; value: string }

function buildRows(d: Date): Row[] {
  return [
    { label: 'UTC',      value: d.toUTCString() },
    { label: 'Local',    value: d.toLocaleString() },
    { label: 'ISO 8601', value: d.toISOString() },
    { label: 'Relative', value: relativeTime(d) },
    { label: 'Unix (s)', value: String(Math.floor(d.getTime() / 1000)) },
    { label: 'Unix (ms)', value: String(d.getTime()) },
  ];
}

export default function UnixTimestampConverter() {
  const [ts,       setTs]       = useState('');
  const [dt,       setDt]       = useState('');
  const [rows,     setRows]     = useState<Row[]>([]);
  const [error,    setError]    = useState('');

  const applyDate = useCallback((d: Date) => {
    if (isNaN(d.getTime())) { setError('Invalid date'); setRows([]); return; }
    setError('');
    setRows(buildRows(d));
    setTs(String(Math.floor(d.getTime() / 1000)));
    setDt(d.toISOString().slice(0, 16));
  }, []);

  const fromTs = useCallback((val: string) => {
    setTs(val);
    if (!val.trim()) { setDt(''); setRows([]); setError(''); return; }
    const n = Number(val);
    if (isNaN(n)) { setError('Not a number'); return; }
    applyDate(new Date(val.length > 11 ? n : n * 1000));
  }, [applyDate]);

  const fromDt = useCallback((val: string) => {
    setDt(val);
    if (!val) { setTs(''); setRows([]); setError(''); return; }
    applyDate(new Date(val));
  }, [applyDate]);

  const useNow = useCallback(() => fromTs(String(Math.floor(Date.now() / 1000))), [fromTs]);

  const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';

  return (
    <ToolShell>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {/* Unix timestamp */}
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Unix Timestamp</span>
              </div>
              <button onClick={useNow} className={iconBtn}><Clock className="w-3 h-3" /> Use now</button>
            </div>
            <div className="px-3 py-3">
              <input
                type="text" value={ts} onChange={e => fromTs(e.target.value)}
                placeholder="e.g. 1700000000  or  1700000000000"
                className="w-full text-[14px] font-mono px-2 py-2 rounded border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#7C3AED]"
                style={{ color: 'var(--text)' }}
              />
              <p className="mt-1 text-[10px]" style={{ color: 'var(--text-subtle)' }}>Accepts seconds (10-digit) or milliseconds (13-digit)</p>
            </div>
          </div>

          {/* Human-readable */}
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <span className="w-2 h-2 rounded-full bg-[#163863]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Human-readable Date &amp; Time</span>
            </div>
            <div className="px-3 py-3">
              <input
                type="datetime-local" value={dt} onChange={e => fromDt(e.target.value)}
                className="w-full text-[14px] font-mono px-2 py-2 rounded border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#163863]"
                style={{ color: 'var(--text)' }}
              />
            </div>
          </div>
        </div>

        {error && <p className="text-[12px] text-red-500 px-1">{error}</p>}

        {rows.length > 0 && (
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>All Formats</span>
            </div>
            <table className="w-full">
              <tbody>
                {rows.map(({ label, value }) => (
                  <tr key={label} className="border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] first:border-0">
                    <td className="px-4 py-2.5 w-28 shrink-0">
                      <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <code className="text-[12px] font-mono break-all" style={{ color: 'var(--text)' }}>{value}</code>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <CopyButton text={value} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!rows.length && !error && (
          <p className="text-center text-[12px]" style={{ color: 'var(--text-subtle)' }}>
            Enter a Unix timestamp or date above, or click <strong>Use now</strong> to convert the current time
          </p>
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
    </ToolShell>
  );
}
