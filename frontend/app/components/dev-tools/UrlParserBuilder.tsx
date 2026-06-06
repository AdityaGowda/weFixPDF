'use client';

import { useState, useCallback, useId } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ToolShell, CopyButton } from './SplitEditorPane';

interface Param { id: string; key: string; value: string }

const SAMPLE = 'https://api.example.com:8080/v1/search?q=hello+world&page=2&lang=en#results';

function uid() { return Math.random().toString(36).slice(2); }

function parseUrl(raw: string): { protocol: string; hostname: string; port: string; pathname: string; params: Param[]; fragment: string } | null {
  try {
    const u = new URL(raw);
    const params: Param[] = [];
    u.searchParams.forEach((v, k) => params.push({ id: uid(), key: k, value: v }));
    return {
      protocol: u.protocol.replace(':', ''),
      hostname:  u.hostname,
      port:      u.port,
      pathname:  u.pathname,
      params:    params.length ? params : [{ id: uid(), key: '', value: '' }],
      fragment:  u.hash.replace('#', ''),
    };
  } catch {
    return null;
  }
}

function buildUrl(protocol: string, hostname: string, port: string, pathname: string, params: Param[], fragment: string): string {
  if (!hostname) return '';
  try {
    const portPart = port ? `:${port}` : '';
    const base = `${protocol || 'https'}://${hostname}${portPart}${pathname || '/'}`;
    const u = new URL(base);
    params.filter(p => p.key).forEach(p => u.searchParams.append(p.key, p.value));
    if (fragment) u.hash = fragment;
    return u.toString();
  } catch {
    return '';
  }
}

export default function UrlParserBuilder() {
  const [fullUrl,  setFullUrl]  = useState(SAMPLE);
  const [protocol, setProtocol] = useState('https');
  const [hostname, setHostname] = useState('api.example.com');
  const [port,     setPort]     = useState('8080');
  const [pathname, setPathname] = useState('/v1/search');
  const [params,   setParams]   = useState<Param[]>([
    { id: uid(), key: 'q',    value: 'hello world' },
    { id: uid(), key: 'page', value: '2' },
    { id: uid(), key: 'lang', value: 'en' },
  ]);
  const [fragment, setFragment] = useState('results');
  const [error,    setError]    = useState('');

  const applyParsed = useCallback((raw: string) => {
    setFullUrl(raw);
    if (!raw.trim()) { setError(''); return; }
    const p = parseUrl(raw);
    if (!p) { setError('Invalid URL'); return; }
    setError('');
    setProtocol(p.protocol);
    setHostname(p.hostname);
    setPort(p.port);
    setPathname(p.pathname);
    setParams(p.params);
    setFragment(p.fragment);
  }, []);

  const rebuild = useCallback((pr: string, ho: string, po: string, pa: string, ps: Param[], fr: string) => {
    const url = buildUrl(pr, ho, po, pa, ps, fr);
    setFullUrl(url || '');
    setError(url ? '' : 'Could not build URL — hostname is required');
  }, []);

  const upd = <T,>(setter: (v: T) => void, rebuilder: (v: T) => void) => (v: T) => { setter(v); rebuilder(v); };

  const setProto = (v: string) => { setProtocol(v); rebuild(v, hostname, port, pathname, params, fragment); };
  const setHost  = (v: string) => { setHostname(v); rebuild(protocol, v, port, pathname, params, fragment); };
  const setPort_ = (v: string) => { setPort(v);     rebuild(protocol, hostname, v, pathname, params, fragment); };
  const setPath  = (v: string) => { setPathname(v); rebuild(protocol, hostname, port, v, params, fragment); };
  const setFrag  = (v: string) => { setFragment(v); rebuild(protocol, hostname, port, pathname, params, v); };

  const updateParam = (id: string, field: 'key' | 'value', val: string) => {
    const next = params.map(p => p.id === id ? { ...p, [field]: val } : p);
    setParams(next);
    rebuild(protocol, hostname, port, pathname, next, fragment);
  };
  const addParam    = () => { const next = [...params, { id: uid(), key: '', value: '' }]; setParams(next); };
  const removeParam = (id: string) => {
    const next = params.filter(p => p.id !== id);
    const safe = next.length ? next : [{ id: uid(), key: '', value: '' }];
    setParams(safe);
    rebuild(protocol, hostname, port, pathname, safe, fragment);
  };

  const inputClass = 'w-full text-[13px] font-mono px-2.5 py-1.5 rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#7C3AED] transition-colors';
  const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';

  const label = (text: string) => (
    <span className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>{text}</span>
  );

  return (
    <ToolShell>
      <div className="space-y-4">
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Full URL</span>
            </div>
            <div className="flex gap-1">
              <button onClick={() => applyParsed(SAMPLE)} className={iconBtn}>Sample</button>
              {fullUrl && <CopyButton text={fullUrl} />}
            </div>
          </div>
          <div className="px-3 py-2.5">
            <input type="text" value={fullUrl} onChange={e => applyParsed(e.target.value)}
              placeholder="https://example.com/path?key=value#anchor"
              className={inputClass} style={{ color: 'var(--text)' }} />
            {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            {label('Protocol')}
            <select value={protocol} onChange={e => setProto(e.target.value)}
              className={inputClass} style={{ color: 'var(--text)' }}>
              {['https','http','ftp','ws','wss'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            {label('Hostname')}
            <input type="text" value={hostname} onChange={e => setHost(e.target.value)}
              placeholder="api.example.com" className={inputClass} style={{ color: 'var(--text)' }} />
          </div>
          <div>
            {label('Port')}
            <input type="text" value={port} onChange={e => setPort_(e.target.value)}
              placeholder="8080" className={inputClass} style={{ color: 'var(--text)' }} />
          </div>
        </div>

        <div>
          {label('Pathname')}
          <input type="text" value={pathname} onChange={e => setPath(e.target.value)}
            placeholder="/v1/search" className={inputClass} style={{ color: 'var(--text)' }} />
        </div>

        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Query Parameters</span>
            <button onClick={addParam} className={iconBtn}><Plus className="w-3 h-3" /> Add param</button>
          </div>
          <div className="divide-y divide-[rgba(0,0,0,0.04)] dark:divide-[rgba(255,255,255,0.04)]">
            {params.map(p => (
              <div key={p.id} className="flex items-center gap-2 px-3 py-2">
                <input type="text" value={p.key} onChange={e => updateParam(p.id, 'key', e.target.value)}
                  placeholder="key" className="flex-1 text-[12px] font-mono px-2 py-1 rounded border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#7C3AED]"
                  style={{ color: 'var(--text)' }} />
                <span className="text-[var(--text-muted)] text-[12px]">=</span>
                <input type="text" value={p.value} onChange={e => updateParam(p.id, 'value', e.target.value)}
                  placeholder="value" className="flex-1 text-[12px] font-mono px-2 py-1 rounded border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#7C3AED]"
                  style={{ color: 'var(--text)' }} />
                <button onClick={() => removeParam(p.id)} className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-[var(--text-muted)] hover:text-red-500 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          {label('Fragment (#)')}
          <input type="text" value={fragment} onChange={e => setFrag(e.target.value)}
            placeholder="section-id" className={inputClass} style={{ color: 'var(--text)' }} />
        </div>
      </div>
    </ToolShell>
  );
}
