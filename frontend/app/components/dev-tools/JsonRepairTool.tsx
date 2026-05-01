'use client';
import React, { useState } from 'react';
import { Wrench, Copy, CheckCircle2 } from 'lucide-react';

function repairJson(input: string): { result: string; fixed: boolean; error?: string } {
  try { return { result: JSON.stringify(JSON.parse(input), null, 2), fixed: false }; } catch {}
  let s = input.trim();
  s = s.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
  s = s.replace(/,(\s*[}\]])/g, '$1');
  s = s.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');
  s = s.replace(/:\s*'([^']*)'/g, ': "$1"');
  try { return { result: JSON.stringify(JSON.parse(s), null, 2), fixed: true }; }
  catch (e: unknown) { return { result: s, fixed: false, error: (e as Error).message }; }
}

export default function JsonRepairTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<'idle' | 'fixed' | 'valid' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const repair = () => {
    if (!input.trim()) return;
    const { result, fixed, error } = repairJson(input);
    setOutput(result);
    setStatus(error ? 'error' : fixed ? 'fixed' : 'valid');
  };

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const CONFIG = {
    fixed: { cls: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400', label: '✓ JSON repaired successfully' },
    valid: { cls: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400', label: '✓ JSON was already valid — formatted for readability' },
    error: { cls: 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400', label: '✗ Auto-repair incomplete. Review highlighted areas manually.' },
    idle: { cls: '', label: '' },
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <Wrench className="w-5 h-5 text-blue-500" /> JSON Repair Tool
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Paste broken JSON — fixes trailing commas, unquoted keys, single quotes, and JS comments. 100% client-side.
        </p>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={10}
          placeholder={`{ name: 'Alice', age: 30, } // trailing comma + unquoted key`}
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        <div className="flex gap-3">
          <button onClick={repair} className="flex-1 py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors">
            Repair JSON
          </button>
          <button onClick={() => { setInput(''); setOutput(''); setStatus('idle'); }}
            className="px-4 py-2.5 rounded-lg border border-base text-[14px] text-[color:var(--text-muted)] hover:border-red-500 hover:text-red-500 transition-colors">
            Clear
          </button>
        </div>
      </div>

      {status !== 'idle' && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`border px-4 py-2.5 rounded-lg text-[13px] font-medium ${CONFIG[status].cls}`}>
            {CONFIG[status].label}
          </div>
          <div className="relative">
            <textarea value={output} readOnly rows={12}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] font-mono text-[color:var(--text)] resize-y" />
            <button onClick={copy}
              className="absolute top-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500 text-white text-[12px] hover:bg-blue-600 transition-colors">
              {copied ? <><CheckCircle2 className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
            </button>
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
