'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Copy, Check, Trash2, Upload, Download, RefreshCw, ChevronRight } from 'lucide-react';

export interface SplitEditorPaneProps {
  leftLabel: string;
  rightLabel: string;
  leftPlaceholder?: string;
  rightPlaceholder?: string;
  sampleInput?: string;
  fileAccept?: string;
  convert: (input: string) => string;
  downloadExt?: string;
  leftToolbar?: React.ReactNode;
  rightExtra?: React.ReactNode;
  canSwap?: boolean;
  onSwap?: () => void;
  inputValue?: string;
  onInputChange?: (v: string) => void;
  minHeight?: number;
}

export function CopyButton({ text, className = '' }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
    }
  }, [text]);

  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors ${
        copied
          ? 'bg-[#EAF3DE] text-[#3B6D11]'
          : 'bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]'
      } ${className}`}
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

interface PanelProps {
  label: string;
  lang?: string;
  children: React.ReactNode;
  toolbar?: React.ReactNode;
  accent?: string;
}

export function Panel({ label, lang, children, toolbar, accent = '#7C3AED' }: PanelProps) {
  return (
    <div className="flex flex-col rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden bg-[var(--bg-card)]">
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] bg-[var(--surface)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: accent }} />
          <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>{label}</span>
          {lang && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)]" style={{ color: 'var(--text-muted)' }}>
              {lang}
            </span>
          )}
        </div>
        {toolbar && <div className="flex items-center gap-1">{toolbar}</div>}
      </div>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}

interface EditorTextareaProps {
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  minHeight?: number;
  hasError?: boolean;
}

export function EditorTextarea({ value, onChange, placeholder, readOnly, minHeight = 280, hasError }: EditorTextareaProps) {
  return (
    <textarea
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      readOnly={readOnly}
      placeholder={placeholder}
      spellCheck={false}
      className={`flex-1 w-full resize-none font-mono text-[13px] leading-[1.6] p-4 bg-transparent outline-none transition-colors ${
        hasError ? 'text-red-500' : ''
      } placeholder:text-[var(--text-subtle)]`}
      style={{
        minHeight,
        color: hasError ? '#ef4444' : 'var(--text)',
        caretColor: 'var(--text)',
      }}
    />
  );
}

function StatusBar({ error, outputLen }: { error: string | null; outputLen: number }) {
  if (error) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 text-[11px] text-red-500 bg-red-50 dark:bg-red-900/20 border-t border-red-100 dark:border-red-800/30">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
        {error}
      </div>
    );
  }
  if (outputLen > 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 text-[11px] text-[var(--text-muted)] bg-[var(--surface)] border-t border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#163863] flex-shrink-0" />
        {outputLen.toLocaleString()} chars
      </div>
    );
  }
  return null;
}

export default function SplitEditorPane({
  leftLabel,
  rightLabel,
  leftPlaceholder = 'Paste or type here…',
  rightPlaceholder = 'Output will appear here…',
  sampleInput,
  fileAccept,
  convert,
  downloadExt,
  leftToolbar,
  rightExtra,
  canSwap,
  onSwap,
  inputValue,
  onInputChange,
  minHeight = 300,
}: SplitEditorPaneProps) {
  const [internalInput, setInternalInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const input = inputValue !== undefined ? inputValue : internalInput;
  const setInput = onInputChange ?? setInternalInput;

  useEffect(() => {
    if (!input.trim()) { setOutput(''); setError(null); return; }
    try {
      setOutput(convert(input));
      setError(null);
    } catch (e: unknown) {
      setOutput('');
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [input, convert]);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setInput(ev.target?.result as string ?? '');
    reader.readAsText(file);
    e.target.value = '';
  }, [setInput]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `output.${downloadExt ?? 'txt'}`;
    a.click(); URL.revokeObjectURL(url);
  }, [output, downloadExt]);

  const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';

  return (
    <div className="w-full space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Panel
          label={leftLabel}
          accent="#7C3AED"
          toolbar={
            <>
              {leftToolbar}
              {fileAccept && (
                <>
                  <button onClick={() => fileRef.current?.click()} className={iconBtn} title="Upload file">
                    <Upload className="w-3 h-3" /> File
                  </button>
                  <input ref={fileRef} type="file" accept={fileAccept} onChange={handleFile} className="hidden" />
                </>
              )}
              {sampleInput && (
                <button onClick={() => setInput(sampleInput)} className={iconBtn} title="Load sample data">
                  Sample
                </button>
              )}
              {canSwap && (
                <button onClick={onSwap} className={iconBtn} title="Swap input and output">
                  <RefreshCw className="w-3 h-3" /> Swap
                </button>
              )}
              {input && (
                <button onClick={() => { setInput(''); setOutput(''); setError(null); }} className={iconBtn} title="Clear input">
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </>
          }
        >
          <EditorTextarea
            value={input}
            onChange={setInput}
            placeholder={leftPlaceholder}
            minHeight={minHeight}
            hasError={!!error && !!input}
          />
          {error && input && (
            <div className="px-3 py-1.5 text-[11px] text-red-500 bg-red-50 dark:bg-red-900/20 border-t border-red-100 dark:border-red-800/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              {error}
            </div>
          )}
        </Panel>

        <Panel
          label={rightLabel}
          accent="#163863"
          toolbar={
            <>
              {output && <CopyButton text={output} />}
              {output && downloadExt && (
                <button onClick={handleDownload} className={iconBtn} title={`Download as .${downloadExt}`}>
                  <Download className="w-3 h-3" /> .{downloadExt}
                </button>
              )}
            </>
          }
        >
          <EditorTextarea
            value={output}
            placeholder={rightPlaceholder}
            readOnly
            minHeight={minHeight}
          />
          {output && (
            <div className="px-3 py-1.5 text-[11px] text-[var(--text-muted)] bg-[var(--surface)] border-t border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#163863] flex-shrink-0" />
              {output.length.toLocaleString()} chars · {output.split('\n').length.toLocaleString()} lines
            </div>
          )}
          {rightExtra}
        </Panel>
      </div>

      {!input && (
        <p className="text-center text-[12px]" style={{ color: 'var(--text-subtle)' }}>
          Paste into the left panel{fileAccept ? ', upload a file, ' : ' '}or click <strong>Sample</strong> to try it out
          {canSwap && <> · use <strong>Swap</strong> to reverse the conversion</>}
        </p>
      )}
    </div>
  );
}

export function ToolShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full rounded-2xl border border-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.07)] bg-[var(--surface)] p-4 md:p-5">
      {children}
    </div>
  );
}

export function SelectChip({
  label, value, options, onChange,
}: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <label className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--text-muted)]">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ml-0.5 text-[11px] rounded px-1.5 py-0.5 bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text)] border-none outline-none cursor-pointer"
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}

export function ToggleChip({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--text-muted)] cursor-pointer select-none">
      <span
        onClick={() => onChange(!checked)}
        className={`w-7 h-4 rounded-full transition-colors flex items-center px-0.5 ${checked ? 'bg-[#7C3AED]' : 'bg-[rgba(0,0,0,0.15)] dark:bg-[rgba(255,255,255,0.15)]'}`}
      >
        <span className={`w-3 h-3 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-3' : 'translate-x-0'}`} />
      </span>
      {label}
    </label>
  );
}
