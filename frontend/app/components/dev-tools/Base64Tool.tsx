'use client';

import { useState, useCallback, useRef, DragEvent } from 'react';
import { Upload } from 'lucide-react';
import { ToolShell, CopyButton, ToggleChip } from './SplitEditorPane';

function toUrlSafe(b64: string)   { return b64.replace(/\+/g, '-').replace(/\//g, '_'); }
function fromUrlSafe(b64: string) { return b64.replace(/-/g, '+').replace(/_/g, '/'); }

function encode(text: string, urlSafe: boolean): string {
  const b64 = btoa(unescape(encodeURIComponent(text)));
  return urlSafe ? toUrlSafe(b64) : b64;
}

function decode(b64: string, urlSafe: boolean): string {
  const std = urlSafe ? fromUrlSafe(b64) : b64;
  return decodeURIComponent(escape(atob(std)));
}

export default function Base64Tool() {
  const [input,    setInput]    = useState('');
  const [output,   setOutput]   = useState('');
  const [error,    setError]    = useState('');
  const [urlSafe,  setUrlSafe]  = useState(false);
  const [mode,     setMode]     = useState<'encode'|'decode'>('encode');
  const [fileUri,  setFileUri]  = useState('');
  const [fileName, setFileName] = useState('');
  const [drag,     setDrag]     = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const run = useCallback((text: string, m: typeof mode, us: boolean) => {
    setError(''); setFileUri('');
    if (!text) { setOutput(''); return; }
    try {
      setOutput(m === 'encode' ? encode(text, us) : decode(text, us));
    } catch {
      setError(m === 'encode' ? 'Encoding failed' : 'Invalid Base64 string');
      setOutput('');
    }
  }, []);

  const handleInput = (v: string) => { setInput(v); run(v, mode, urlSafe); };
  const switchMode  = (m: typeof mode) => { setMode(m); run(input, m, urlSafe); };
  const switchUrlSafe = (v: boolean) => { setUrlSafe(v); run(input, mode, v); };

  const handleFile = useCallback((file: File) => {
    setFileName(file.name); setInput(''); setOutput(''); setError('');
    const reader = new FileReader();
    reader.onload = e => {
      const dataUrl = e.target?.result as string;
      setFileUri(dataUrl);
    };
    reader.readAsDataURL(file);
  }, []);

  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setDrag(false);
    const file = e.dataTransfer.files[0]; if (file) handleFile(file);
  }, [handleFile]);

  const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';

  return (
    <ToolShell>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="inline-flex rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] overflow-hidden text-[11px] font-medium">
          {(['encode', 'decode'] as const).map(m => (
            <button key={m} onClick={() => switchMode(m)}
              className={`px-3 py-1.5 capitalize transition-colors ${mode === m ? 'bg-[#7C3AED] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>
              {m}
            </button>
          ))}
        </div>
        <ToggleChip label="URL-safe (- _)" checked={urlSafe} onChange={switchUrlSafe} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Input */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>{mode === 'encode' ? 'Plain Text' : 'Base64 String'}</span>
            </div>
            {input && <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className={iconBtn}>Clear</button>}
          </div>
          <textarea value={input} onChange={e => handleInput(e.target.value)} spellCheck={false}
            placeholder={mode === 'encode' ? 'Paste text to encode…' : 'Paste Base64 string to decode…'}
            className="flex-1 resize-none font-mono text-[13px] p-4 bg-transparent outline-none"
            style={{ minHeight: 260, color: 'var(--text)', caretColor: 'var(--text)' }}
          />
          {error && input && (
            <div className="px-3 py-1.5 text-[11px] text-red-500 bg-red-50 dark:bg-red-900/20 border-t border-red-100 dark:border-red-800/30">{error}</div>
          )}
        </div>

        {/* Output */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#163863]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>{mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}</span>
            </div>
            {output && <CopyButton text={output} />}
          </div>
          <textarea readOnly value={output} spellCheck={false}
            placeholder="Output appears here…"
            className="flex-1 resize-none font-mono text-[13px] p-4 bg-transparent outline-none"
            style={{ minHeight: 260, color: 'var(--text)' }}
          />
          {output && (
            <div className="px-3 py-1.5 text-[11px] text-[var(--text-muted)] bg-[var(--surface)] border-t border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)]">
              {output.length.toLocaleString()} chars
            </div>
          )}
        </div>
      </div>

      {/* File zone */}
      <div className="mt-4 space-y-3">
        <div
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          className={`rounded-xl border-2 border-dashed cursor-pointer transition-colors flex items-center gap-3 px-4 py-3 ${drag ? 'border-[#7C3AED] bg-[rgba(124,58,237,0.05)]' : 'border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] hover:border-[#7C3AED]'}`}
        >
          <Upload className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
          <div>
            <p className="text-[13px] font-medium" style={{ color: 'var(--text)' }}>{fileName || 'Drop any file to get its Base64 data URI'}</p>
            <p className="text-[11px]" style={{ color: 'var(--text-subtle)' }}>Everything stays in your browser</p>
          </div>
          <input ref={fileRef} type="file" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} />
        </div>
        {fileUri && (
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Data URI — {fileName}</span>
              <CopyButton text={fileUri} />
            </div>
            <p className="px-4 py-2.5 text-[11px] font-mono break-all" style={{ color: 'var(--text-muted)', maxHeight: 120, overflow: 'auto' }}>{fileUri.slice(0, 200)}…</p>
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
    </ToolShell>
  );
}
