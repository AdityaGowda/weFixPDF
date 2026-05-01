'use client';
import React, { useState } from 'react';
import { TrendingUp, Code } from 'lucide-react';

function generateMock(type: string, fields: string): Record<string, unknown> {
  const f = fields.split(',').map(f => f.trim()).filter(Boolean);
  const mock: Record<string, unknown> = {};
  f.forEach(field => {
    const lower = field.toLowerCase();
    if (lower.includes('id')) mock[field] = Math.floor(Math.random() * 10000);
    else if (lower.includes('name')) mock[field] = 'John Doe';
    else if (lower.includes('email')) mock[field] = 'user@example.com';
    else if (lower.includes('phone') || lower.includes('mobile')) mock[field] = '+91-9876543210';
    else if (lower.includes('price') || lower.includes('amount') || lower.includes('cost')) mock[field] = parseFloat((Math.random() * 1000).toFixed(2));
    else if (lower.includes('date') || lower.includes('created')) mock[field] = new Date().toISOString();
    else if (lower.includes('status')) mock[field] = 'active';
    else if (lower.includes('count') || lower.includes('total') || lower.includes('quantity')) mock[field] = Math.floor(Math.random() * 100);
    else if (lower.includes('url') || lower.includes('image') || lower.includes('avatar')) mock[field] = 'https://example.com/image.jpg';
    else if (lower.includes('bool') || lower.includes('active') || lower.includes('enabled')) mock[field] = true;
    else mock[field] = `Sample ${field}`;
  });
  return mock;
}

const TEMPLATES = [
  { name: 'User', fields: 'id, name, email, phone, status, created_at' },
  { name: 'Product', fields: 'id, name, price, quantity, status, image_url' },
  { name: 'Order', fields: 'id, user_id, total_amount, status, created_at' },
  { name: 'Post', fields: 'id, title, author, status, created_at, url' },
];

export default function ApiResponseMockGenerator() {
  const [fields, setFields] = useState('id, name, email, status, created_at');
  const [count, setCount] = useState('3');
  const [wrapKey, setWrapKey] = useState('data');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const n = Math.min(parseInt(count) || 1, 20);
    const items = Array.from({ length: n }, () => generateMock('object', fields));
    const response = {
      success: true,
      [wrapKey || 'data']: n === 1 ? items[0] : items,
      meta: { total: n, page: 1, per_page: n },
      timestamp: new Date().toISOString(),
    };
    setResult(JSON.stringify(response, null, 2));
  };

  const copy = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <Code className="w-5 h-5 text-blue-500" /> API Response Mock Generator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Generate realistic mock API JSON responses for frontend development, testing, or documentation. 100% client-side.
        </p>
        <div className="flex gap-2 flex-wrap">
          {TEMPLATES.map(t => (
            <button key={t.name} onClick={() => setFields(t.fields)}
              className="px-3 py-1.5 rounded-full border border-base text-[12px] text-[color:var(--text-muted)] hover:border-blue-500 hover:text-blue-500 transition-colors">
              {t.name}
            </button>
          ))}
        </div>
        <div>
          <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Fields (comma-separated)</label>
          <input value={fields} onChange={e => setFields(e.target.value)}
            placeholder="id, name, email, status, created_at"
            className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Number of Records (max 20)</label>
            <input type="number" value={count} onChange={e => setCount(e.target.value)} min="1" max="20"
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Response Wrapper Key</label>
            <input value={wrapKey} onChange={e => setWrapKey(e.target.value)}
              placeholder="data"
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        <button onClick={generate} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Generate Mock Response
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-[color:var(--text)]">Generated API Response</h3>
            <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500 text-white text-[12px] hover:bg-blue-600 transition-colors">
              {copied ? '✓ Copied!' : '📋 Copy JSON'}
            </button>
          </div>
          <pre className="bg-page border border-base rounded-lg p-4 text-[12px] font-mono text-[color:var(--text-muted)] overflow-auto max-h-80">{result}</pre>
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
