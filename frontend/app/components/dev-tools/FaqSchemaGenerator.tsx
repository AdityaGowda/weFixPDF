'use client';
import React, { useState } from 'react';
import { Copy, CheckCircle2, FileText } from 'lucide-react';

interface QA { q: string; a: string; }

export default function FaqSchemaGenerator() {
  const [faqs, setFaqs] = useState<QA[]>([{ q: '', a: '' }, { q: '', a: '' }]);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const update = (idx: number, field: 'q' | 'a', val: string) => {
    setFaqs(prev => prev.map((f, i) => i === idx ? { ...f, [field]: val } : f));
  };

  const addFaq = () => setFaqs(prev => [...prev, { q: '', a: '' }]);
  const removeFaq = (idx: number) => setFaqs(prev => prev.filter((_, i) => i !== idx));

  const generate = () => {
    const valid = faqs.filter(f => f.q.trim() && f.a.trim());
    if (valid.length === 0) return;
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: valid.map(f => ({
        '@type': 'Question',
        name: f.q.trim(),
        acceptedAnswer: { '@type': 'Answer', text: f.a.trim() },
      })),
    };
    setOutput(JSON.stringify(schema, null, 2));
  };

  const copy = () => { navigator.clipboard.writeText(`<script type="application/ld+json">\n${output}\n</script>`); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" /> FAQ Schema Generator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Generate valid JSON-LD FAQ schema markup to add rich results (FAQ dropdowns) to your Google search snippets.
        </p>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-page border border-base rounded-xl p-4 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[color:var(--text-muted)] uppercase tracking-wide">FAQ #{i + 1}</span>
                {faqs.length > 1 && (
                  <button onClick={() => removeFaq(i)} className="text-[12px] text-red-500 hover:text-red-600">Remove</button>
                )}
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[color:var(--text)] mb-1">Question</label>
                <input value={f.q} onChange={e => update(i, 'q', e.target.value)}
                  placeholder="What is your return policy?"
                  className="w-full px-3 py-2 rounded-lg border border-base bg-card text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[color:var(--text)] mb-1">Answer</label>
                <textarea value={f.a} onChange={e => update(i, 'a', e.target.value)} rows={2}
                  placeholder="We offer a 30-day no-questions-asked return policy..."
                  className="w-full px-3 py-2 rounded-lg border border-base bg-card text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-none" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={addFaq} className="flex-1 py-2.5 rounded-lg border border-blue-500 text-blue-500 text-[14px] font-medium hover:bg-blue-500/10 transition-colors">
            + Add FAQ
          </button>
          <button onClick={generate} className="flex-1 py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors">
            Generate Schema
          </button>
        </div>
      </div>

      {output && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-semibold text-[color:var(--text)]">Generated JSON-LD Schema</h3>
            <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500 text-white text-[12px] hover:bg-blue-600 transition-colors">
              {copied ? <><CheckCircle2 className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy with script tag</>}
            </button>
          </div>
          <pre className="bg-page border border-base rounded-lg p-4 text-[12px] font-mono text-[color:var(--text-muted)] overflow-auto max-h-80">
            {`<script type="application/ld+json">\n${output}\n</script>`}
          </pre>
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg text-[12px] text-emerald-600 dark:text-emerald-400">
            ✓ Paste this in your page &lt;head&gt; or at the end of &lt;body&gt;. FAQ schema can enable rich dropdowns directly in Google search results.
          </div>
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
