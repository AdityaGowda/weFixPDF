'use client';

import { useState, useMemo } from 'react';
import { AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { ToolShell, CopyButton } from './SplitEditorPane';

const SAMPLE = `HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 1234
Cache-Control: max-age=3600, public
ETag: "abc123"
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Server: nginx/1.24.0
Date: Wed, 09 Apr 2025 12:00:00 GMT`;

type Category = 'security' | 'caching' | 'content' | 'connection' | 'general';

interface HeaderDoc { explanation: string; category: Category }

const DOCS: Record<string, HeaderDoc> = {
  'content-type':                   { explanation: 'Tells the client the media type of the response body so it knows how to parse it.', category: 'content' },
  'content-length':                  { explanation: 'Size of the response body in bytes.', category: 'content' },
  'content-encoding':                { explanation: 'Compression applied to the body (e.g. gzip, br). Client must decompress before parsing.', category: 'content' },
  'content-language':                { explanation: 'Language of the response content.', category: 'content' },
  'cache-control':                   { explanation: 'Caching directives for browsers and proxies (e.g. max-age, no-store, public, private).', category: 'caching' },
  'etag':                            { explanation: 'Version fingerprint of the resource — used for conditional requests to avoid re-downloading unchanged content.', category: 'caching' },
  'last-modified':                   { explanation: 'When the resource was last changed. Used for cache validation alongside ETag.', category: 'caching' },
  'expires':                         { explanation: 'Deprecated cache expiry date. Prefer Cache-Control.', category: 'caching' },
  'vary':                            { explanation: 'Which request headers affect the response — caches use this to store separate versions per header value.', category: 'caching' },
  'strict-transport-security':       { explanation: 'Forces HTTPS for the domain (HSTS). Prevents protocol downgrade and cookie hijacking attacks.', category: 'security' },
  'content-security-policy':         { explanation: 'Restricts sources for scripts, styles, images, and more. Prevents XSS and data injection attacks.', category: 'security' },
  'x-frame-options':                 { explanation: 'Controls iframe embedding. Prevents clickjacking attacks. Values: DENY, SAMEORIGIN.', category: 'security' },
  'x-content-type-options':          { explanation: 'Prevents MIME-type sniffing. Must be "nosniff" to block browsers from guessing the content type.', category: 'security' },
  'referrer-policy':                 { explanation: 'Controls how much referrer info is sent in requests from this page.', category: 'security' },
  'permissions-policy':              { explanation: 'Controls access to browser APIs (camera, mic, geolocation) for this page and its iframes.', category: 'security' },
  'x-xss-protection':                { explanation: 'Legacy XSS filter for old IE/Chrome. Deprecated — use Content-Security-Policy instead.', category: 'security' },
  'access-control-allow-origin':     { explanation: 'CORS: which origins may read this response. * = any origin.', category: 'security' },
  'access-control-allow-methods':    { explanation: 'CORS: which HTTP methods are allowed for cross-origin requests.', category: 'security' },
  'access-control-allow-headers':    { explanation: 'CORS: which request headers are allowed in cross-origin requests.', category: 'security' },
  'access-control-allow-credentials':{ explanation: 'CORS: whether credentials (cookies, auth headers) may be sent with cross-origin requests.', category: 'security' },
  'www-authenticate':                { explanation: 'Indicates the auth scheme required for the resource (e.g. Basic, Bearer).', category: 'security' },
  'set-cookie':                      { explanation: 'Sets a cookie on the client. Look for Secure, HttpOnly, and SameSite flags.', category: 'security' },
  'server':                          { explanation: 'Identifies the server software. Often intentionally omitted or obscured for security.', category: 'general' },
  'date':                            { explanation: 'Timestamp when the response was generated.', category: 'general' },
  'location':                        { explanation: 'Redirect URL for 3xx responses, or new resource URL for 201 Created.', category: 'general' },
  'connection':                      { explanation: 'Whether the connection stays open after the transaction (keep-alive) or closes (close).', category: 'connection' },
  'keep-alive':                      { explanation: 'Parameters for persistent connection: timeout and max request count.', category: 'connection' },
  'transfer-encoding':               { explanation: 'How the response body is encoded for transfer (e.g. chunked). Different from Content-Encoding.', category: 'connection' },
  'alt-svc':                         { explanation: 'Advertises an alternative service endpoint, typically HTTP/3 (QUIC).', category: 'connection' },
  'x-powered-by':                    { explanation: 'Reveals the server framework. Often removed for security (information disclosure).', category: 'general' },
  'x-request-id':                    { explanation: 'Unique ID for the request — useful for tracing logs across distributed systems.', category: 'general' },
  'expect-ct':                       { explanation: 'Deprecated. Previously enforced Certificate Transparency for TLS certificates.', category: 'security' },
};

const IMPORTANT_MISSING = [
  'strict-transport-security',
  'content-security-policy',
  'x-frame-options',
  'x-content-type-options',
  'referrer-policy',
];

const CATEGORY_COLOR: Record<Category, string> = {
  security:   'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  caching:    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  content:    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  connection: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  general:    'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

interface ParsedHeader { name: string; value: string; explanation: string; category: Category; isSecurity: boolean }

function parseHeaders(raw: string): ParsedHeader[] {
  return raw
    .split('\n')
    .filter(line => line.includes(':') && !line.match(/^HTTP\//))
    .map(line => {
      const idx = line.indexOf(':');
      const name  = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim();
      const key   = name.toLowerCase();
      const doc   = DOCS[key];
      return {
        name,
        value,
        explanation: doc?.explanation ?? 'No description available for this header.',
        category:    doc?.category   ?? 'general',
        isSecurity:  doc?.category   === 'security',
      };
    });
}

export default function HttpHeaderAnalyzer() {
  const [raw, setRaw] = useState('');

  const parsed  = useMemo(() => parseHeaders(raw), [raw]);
  const present = useMemo(() => new Set(parsed.map(h => h.name.toLowerCase())), [parsed]);
  const missing = IMPORTANT_MISSING.filter(h => !present.has(h));

  const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';

  return (
    <ToolShell>
      <div className="space-y-4">
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Raw HTTP Response Headers</span>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setRaw(SAMPLE)} className={iconBtn}>Sample</button>
              {raw && <button onClick={() => setRaw('')} className={iconBtn}>Clear</button>}
            </div>
          </div>
          <textarea
            value={raw} onChange={e => setRaw(e.target.value)}
            placeholder={"Paste raw HTTP headers here…\ne.g. Content-Type: text/html\nCache-Control: max-age=3600"}
            spellCheck={false}
            className="w-full resize-none font-mono text-[12px] p-4 bg-transparent outline-none"
            style={{ minHeight: 160, color: 'var(--text)', caretColor: 'var(--text)' }}
          />
        </div>

        {raw && missing.length > 0 && (
          <div className="rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[12px] font-semibold text-amber-800 dark:text-amber-300 mb-1">Missing security headers</p>
              <div className="flex flex-wrap gap-1.5">
                {missing.map(h => (
                  <code key={h} className="text-[11px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">{h}</code>
                ))}
              </div>
            </div>
          </div>
        )}

        {parsed.length > 0 && (
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <span className="w-2 h-2 rounded-full bg-[#163863]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>{parsed.length} header{parsed.length !== 1 ? 's' : ''} found</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                    {['Header', 'Value', 'Category', 'Explanation'].map(h => (
                      <th key={h} className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parsed.map((h, i) => (
                    <tr key={i} className="border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)]">
                      <td className="px-4 py-2.5 align-top">
                        <div className="flex items-center gap-1.5">
                          {h.isSecurity && <ShieldCheck className="w-3 h-3 text-red-500 flex-shrink-0" />}
                          <code className="font-mono font-medium" style={{ color: 'var(--text)' }}>{h.name}</code>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 align-top max-w-[180px]">
                        <div className="flex items-start gap-1">
                          <code className="font-mono break-all text-[11px]" style={{ color: 'var(--text-muted)' }}>{h.value}</code>
                          <CopyButton text={h.value} />
                        </div>
                      </td>
                      <td className="px-4 py-2.5 align-top">
                        <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${CATEGORY_COLOR[h.category]}`}>{h.category}</span>
                      </td>
                      <td className="px-4 py-2.5 align-top" style={{ color: 'var(--text-muted)' }}>
                        <div className="flex items-start gap-1.5">
                          <Info className="w-3 h-3 flex-shrink-0 mt-0.5 opacity-50" />
                          <span>{h.explanation}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!raw && (
          <p className="text-center text-[12px]" style={{ color: 'var(--text-subtle)' }}>
            Paste raw HTTP headers above, or click <strong>Sample</strong> to try an example
          </p>
        )}
      </div>
    </ToolShell>
  );
}
