'use client';

import { useState, useRef, useCallback } from 'react';
import { ToolShell, CopyButton } from './SplitEditorPane';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface PingResult {
  attempt:    number;
  duration:   number | null;   // ms, null = error
  status:     number | null;
  statusText: string;
  error:      string;
  timestamp:  number;
}

interface EndpointState {
  url:        string;
  method:     string;
  headers:    { key: string; value: string }[];
  results:    PingResult[];
  running:    boolean;
  runs:       number;
}

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

function makeEmptyEndpoint(): EndpointState {
  return { url: '', method: 'GET', headers: [], results: [], running: false, runs: 5 };
}

// ─────────────────────────────────────────────────────────────────────────────
// Single ping
// ─────────────────────────────────────────────────────────────────────────────
async function ping(url: string, method: string, headers: Record<string, string>): Promise<Omit<PingResult, 'attempt' | 'timestamp'>> {
  const start = performance.now();
  try {
    const res = await fetch(url, {
      method,
      headers,
      mode: 'cors',
      cache: 'no-store',
    });
    const duration = performance.now() - start;
    return { duration, status: res.status, statusText: res.statusText, error: '' };
  } catch (e) {
    const duration = performance.now() - start;
    const msg = e instanceof Error ? e.message : String(e);
    // CORS errors appear as TypeError: Failed to fetch
    const error = msg.includes('Failed to fetch') || msg.includes('NetworkError')
      ? 'Network error / CORS blocked — check the URL and ensure the server allows cross-origin requests.'
      : msg;
    return { duration, status: null, statusText: '', error };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Stats
// ─────────────────────────────────────────────────────────────────────────────
function computeStats(results: PingResult[]) {
  const durations = results.map(r => r.duration).filter((d): d is number => d !== null);
  if (durations.length === 0) return null;
  const min = Math.min(...durations);
  const max = Math.max(...durations);
  const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
  const p95 = [...durations].sort((a, b) => a - b)[Math.floor(durations.length * 0.95)] ?? max;
  const errors = results.filter(r => r.error).length;
  return { min, max, avg, p95, errors, total: results.length };
}

function fmtMs(ms: number): string { return `${ms.toFixed(0)} ms`; }

function statusColor(status: number | null): string {
  if (!status) return '#EF4444';
  if (status < 300) return '#10B981';
  if (status < 400) return '#F59E0B';
  return '#EF4444';
}

// ─────────────────────────────────────────────────────────────────────────────
// Bar chart
// ─────────────────────────────────────────────────────────────────────────────
function LatencyChart({ results }: { results: PingResult[] }) {
  if (results.length === 0) return null;
  const max = Math.max(...results.map(r => r.duration ?? 0), 1);
  return (
    <div className="flex items-end gap-1 h-16">
      {results.map((r, i) => {
        const h = r.duration ? (r.duration / max) * 100 : 100;
        const color = r.error ? '#EF4444' : statusColor(r.status);
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1" style={{ minWidth: 0 }}>
            <div
              className="w-full rounded-t transition-all"
              style={{ height: `${h}%`, background: color, minHeight: 4 }}
              title={r.error || `${fmtMs(r.duration ?? 0)} — HTTP ${r.status}`}
            />
            <span className="text-[9px] font-mono" style={{ color: 'var(--text-muted)' }}>{i + 1}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Endpoint panel
// ─────────────────────────────────────────────────────────────────────────────
function EndpointPanel({
  ep, idx, onChange, onRun, accent,
}: {
  ep: EndpointState;
  idx: number;
  onChange: (patch: Partial<EndpointState>) => void;
  onRun: () => void;
  accent: string;
}) {
  const stats = computeStats(ep.results);

  const addHeader = () => onChange({ headers: [...ep.headers, { key: '', value: '' }] });
  const removeHeader = (i: number) => onChange({ headers: ep.headers.filter((_, j) => j !== i) });
  const setHeader = (i: number, field: 'key' | 'value', val: string) =>
    onChange({ headers: ep.headers.map((h, j) => j === i ? { ...h, [field]: val } : h) });

  const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';

  return (
    <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
        <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
        <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Endpoint {idx + 1}</span>
        {stats && (
          <span className="ml-auto text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
            avg {fmtMs(stats.avg)} · min {fmtMs(stats.min)} · max {fmtMs(stats.max)}
          </span>
        )}
      </div>

      <div className="p-4 space-y-3">
        {/* URL + Method */}
        <div className="flex gap-2">
          <select
            value={ep.method}
            onChange={e => onChange({ method: e.target.value })}
            className="text-[12px] font-mono px-2 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#7C3AED]"
            style={{ color: accent }}
          >
            {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <input
            type="url"
            value={ep.url}
            onChange={e => onChange({ url: e.target.value })}
            placeholder="https://api.example.com/endpoint"
            className="flex-1 text-[13px] font-mono px-3 py-2 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#7C3AED]"
            style={{ color: 'var(--text)' }}
          />
        </div>

        {/* Headers */}
        {ep.headers.map((h, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text" value={h.key} onChange={e => setHeader(i, 'key', e.target.value)}
              placeholder="Header-Name"
              className="w-40 text-[12px] font-mono px-2 py-1.5 rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none"
              style={{ color: 'var(--text)' }}
            />
            <input
              type="text" value={h.value} onChange={e => setHeader(i, 'value', e.target.value)}
              placeholder="value"
              className="flex-1 text-[12px] font-mono px-2 py-1.5 rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none"
              style={{ color: 'var(--text)' }}
            />
            <button onClick={() => removeHeader(i)} className="text-[11px] px-2 py-1 rounded text-red-400 hover:text-red-600">✕</button>
          </div>
        ))}

        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={addHeader} className={iconBtn}>+ Header</button>

          {/* Runs */}
          <label className="flex items-center gap-2">
            <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Runs</span>
            <input
              type="number" min={1} max={20} value={ep.runs}
              onChange={e => onChange({ runs: Math.min(20, Math.max(1, parseInt(e.target.value) || 1)) })}
              className="w-14 text-[12px] font-mono px-2 py-1 rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none text-center"
              style={{ color: 'var(--text)' }}
            />
          </label>

          <button
            onClick={onRun}
            disabled={ep.running || !ep.url}
            className="px-4 py-1.5 rounded-xl text-[12px] font-semibold text-white transition-colors disabled:opacity-50"
            style={{ background: ep.running ? '#64748B' : accent }}
          >
            {ep.running ? 'Running…' : 'Run Test'}
          </button>

          {ep.results.length > 0 && (
            <button onClick={() => onChange({ results: [] })} className={iconBtn}>Clear</button>
          )}
        </div>

        {/* Chart */}
        {ep.results.length > 0 && (
          <div className="space-y-2">
            <LatencyChart results={ep.results} />
            {/* Result rows */}
            <div className="overflow-auto" style={{ maxHeight: 160 }}>
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                    {['#', 'Status', 'Latency', 'Error'].map(h => (
                      <th key={h} className="px-2 py-1 text-left font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ep.results.map((r, i) => (
                    <tr key={i} className="border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)]">
                      <td className="px-2 py-1 font-mono" style={{ color: 'var(--text-muted)' }}>{r.attempt}</td>
                      <td className="px-2 py-1">
                        {r.status ? (
                          <span className="font-mono font-bold" style={{ color: statusColor(r.status) }}>{r.status}</span>
                        ) : (
                          <span className="text-red-400">—</span>
                        )}
                      </td>
                      <td className="px-2 py-1 font-mono" style={{ color: 'var(--text)' }}>
                        {r.duration != null ? fmtMs(r.duration) : '—'}
                      </td>
                      <td className="px-2 py-1 text-red-400 truncate max-w-xs">{r.error}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Stats summary */}
            {stats && (
              <div className="flex flex-wrap gap-4 text-[11px] pt-1 border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)]">
                {[
                  ['Min', fmtMs(stats.min), '#10B981'],
                  ['Avg', fmtMs(stats.avg), '#7C3AED'],
                  ['P95', fmtMs(stats.p95), '#F59E0B'],
                  ['Max', fmtMs(stats.max), '#EF4444'],
                  ['Errors', `${stats.errors}/${stats.total}`, stats.errors > 0 ? '#EF4444' : '#10B981'],
                ].map(([label, value, color]) => (
                  <span key={label as string} style={{ color: 'var(--text-muted)' }}>
                    {label}: <strong style={{ color: color as string }}>{value}</strong>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function ApiPingTester() {
  const [endpoints, setEndpoints] = useState<EndpointState[]>([makeEmptyEndpoint()]);
  const abortRefs = useRef<(AbortController | null)[]>([null, null]);

  const updateEndpoint = useCallback((idx: number, patch: Partial<EndpointState>) => {
    setEndpoints(eps => eps.map((ep, i) => i === idx ? { ...ep, ...patch } : ep));
  }, []);

  const runEndpoint = useCallback(async (idx: number) => {
    const ep = endpoints[idx];
    if (!ep.url || ep.running) return;

    // Clear old results
    updateEndpoint(idx, { results: [], running: true });

    const headerMap: Record<string, string> = {};
    ep.headers.forEach(h => { if (h.key) headerMap[h.key] = h.value; });

    for (let attempt = 1; attempt <= ep.runs; attempt++) {
      const result = await ping(ep.url, ep.method, headerMap);
      setEndpoints(eps => eps.map((e, i) =>
        i === idx ? { ...e, results: [...e.results, { ...result, attempt, timestamp: Date.now() }] } : e
      ));
      // Small gap between requests to be polite
      if (attempt < ep.runs) await new Promise(r => setTimeout(r, 200));
    }

    setEndpoints(eps => eps.map((e, i) => i === idx ? { ...e, running: false } : e));
  }, [endpoints, updateEndpoint]);

  const addEndpoint = () => {
    if (endpoints.length < 2) setEndpoints(eps => [...eps, makeEmptyEndpoint()]);
  };

  const removeEndpoint = (idx: number) => {
    setEndpoints(eps => eps.filter((_, i) => i !== idx));
  };

  const ACCENTS = ['#7C3AED', '#10B981'];

  return (
    <ToolShell>
      <div className="space-y-4">
        {/* Info banner */}
        <div className="rounded-xl bg-[rgba(37,99,235,0.06)] border border-[rgba(37,99,235,0.15)] px-4 py-3 text-[12px]" style={{ color: 'var(--text-muted)' }}>
          Requests are made directly from your browser — no proxy. CORS must be enabled on the target server.
          Test against public APIs or your own CORS-enabled endpoints. Compare two URLs side by side.
        </div>

        {endpoints.map((ep, idx) => (
          <div key={idx} className="relative">
            {endpoints.length > 1 && (
              <button
                onClick={() => removeEndpoint(idx)}
                className="absolute top-3 right-3 z-10 text-[11px] px-2 py-1 rounded bg-red-50 dark:bg-red-900/20 text-red-400 hover:text-red-600"
              >
                Remove
              </button>
            )}
            <EndpointPanel
              ep={ep}
              idx={idx}
              onChange={patch => updateEndpoint(idx, patch)}
              onRun={() => runEndpoint(idx)}
              accent={ACCENTS[idx] ?? '#7C3AED'}
            />
          </div>
        ))}

        {endpoints.length < 2 && (
          <button
            onClick={addEndpoint}
            className="w-full py-2 rounded-xl border-2 border-dashed text-[12px] font-medium transition-colors border-[rgba(0,0,0,0.12)] dark:border-[rgba(255,255,255,0.12)] hover:border-[#7C3AED]"
            style={{ color: 'var(--text-muted)' }}
          >
            + Add second endpoint to compare
          </button>
        )}

        {/* Quick test URLs */}
        <div className="space-y-1">
          <p className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Quick test — public APIs with CORS enabled:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'https://httpbin.org/get',
              'https://jsonplaceholder.typicode.com/posts/1',
              'https://api.github.com/zen',
              'https://worldtimeapi.org/api/timezone/UTC',
            ].map(url => (
              <button
                key={url}
                onClick={() => updateEndpoint(0, { url })}
                className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] hover:bg-[rgba(124,58,237,0.08)] transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                {url.replace('https://', '')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
