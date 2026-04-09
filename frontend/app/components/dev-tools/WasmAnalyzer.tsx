'use client';

import { useState, useCallback, useRef } from 'react';
import { ToolShell, CopyButton } from './SplitEditorPane';

// ─────────────────────────────────────────────────────────────────────────────
// LEB128 unsigned decoder
// ─────────────────────────────────────────────────────────────────────────────
function readULEB128(bytes: Uint8Array, offset: number): [number, number] {
  let result = 0;
  let shift = 0;
  let consumed = 0;
  while (offset + consumed < bytes.length) {
    const byte = bytes[offset + consumed++];
    result |= (byte & 0x7f) << shift;
    shift += 7;
    if ((byte & 0x80) === 0) break;
  }
  return [result, consumed];
}

function readString(bytes: Uint8Array, offset: number): [string, number] {
  const [len, lenBytes] = readULEB128(bytes, offset);
  const strBytes = bytes.slice(offset + lenBytes, offset + lenBytes + len);
  const str = new TextDecoder().decode(strBytes);
  return [str, lenBytes + len];
}

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface WasmSection { id: number; name: string; size: number; offset: number }
interface WasmImport  { module: string; field: string; kind: string }
interface WasmExport  { name: string; kind: string; index: number }
interface WasmMemory  { minPages: number; maxPages: number | null }

interface WasmAnalysis {
  valid: boolean;
  totalSize: number;
  sections: WasmSection[];
  imports: WasmImport[];
  exports: WasmExport[];
  memory: WasmMemory | null;
  functionCount: number;
  tips: string[];
}

const SECTION_NAMES: Record<number, string> = {
  0: 'Custom', 1: 'Type', 2: 'Import', 3: 'Function', 4: 'Table',
  5: 'Memory', 6: 'Global', 7: 'Export', 8: 'Start', 9: 'Element',
  10: 'Code', 11: 'Data', 12: 'DataCount',
};

const KIND_NAMES = ['Function', 'Table', 'Memory', 'Global'];

// ─────────────────────────────────────────────────────────────────────────────
// Parser
// ─────────────────────────────────────────────────────────────────────────────
function analyzeWasm(buffer: ArrayBuffer): WasmAnalysis {
  const bytes = new Uint8Array(buffer);
  const view  = new DataView(buffer);

  // Magic: \0asm  Version: 1
  if (bytes.length < 8
    || view.getUint32(0, false) !== 0x0061736D
    || view.getUint32(4, true)  !== 1) {
    return { valid: false, totalSize: bytes.length, sections: [], imports: [], exports: [], memory: null, functionCount: 0, tips: [] };
  }

  const sections: WasmSection[] = [];
  let offset = 8;

  while (offset < bytes.length) {
    const sectionId = bytes[offset++];
    if (offset >= bytes.length) break;
    const [sectionSize, consumed] = readULEB128(bytes, offset);
    offset += consumed;
    sections.push({
      id: sectionId,
      name: SECTION_NAMES[sectionId] ?? `Unknown(${sectionId})`,
      size: sectionSize,
      offset,
    });
    offset += sectionSize;
  }

  // ── Imports (section 2) ────────────────────────────────────────────────────
  const imports: WasmImport[] = [];
  const importSec = sections.find(s => s.id === 2);
  if (importSec) {
    let pos = importSec.offset;
    const [count, cb] = readULEB128(bytes, pos); pos += cb;
    for (let i = 0; i < count && pos < importSec.offset + importSec.size; i++) {
      const [mod, mb] = readString(bytes, pos); pos += mb;
      const [field, fb] = readString(bytes, pos); pos += fb;
      const kind = bytes[pos++] ?? 0;
      // skip kind-specific data
      if (kind === 0) { const [, tb] = readULEB128(bytes, pos); pos += tb; }      // func: type idx
      else if (kind === 1) { pos += 2; }                                          // table: type + limits
      else if (kind === 2) { const flags = bytes[pos++]; pos++; if (flags & 1) pos++; } // memory limits
      else if (kind === 3) { pos += 2; }                                          // global: type + mutability
      imports.push({ module: mod, field, kind: KIND_NAMES[kind] ?? 'Unknown' });
    }
  }

  // ── Exports (section 7) ────────────────────────────────────────────────────
  const exports: WasmExport[] = [];
  const exportSec = sections.find(s => s.id === 7);
  if (exportSec) {
    let pos = exportSec.offset;
    const [count, cb] = readULEB128(bytes, pos); pos += cb;
    for (let i = 0; i < count && pos < exportSec.offset + exportSec.size; i++) {
      const [name, nb] = readString(bytes, pos); pos += nb;
      const kind = bytes[pos++] ?? 0;
      const [index, ib] = readULEB128(bytes, pos); pos += ib;
      exports.push({ name, kind: KIND_NAMES[kind] ?? 'Unknown', index });
    }
  }

  // ── Memory (section 5) ────────────────────────────────────────────────────
  let memory: WasmMemory | null = null;
  const memSec = sections.find(s => s.id === 5);
  if (memSec) {
    let pos = memSec.offset;
    const [count, cb] = readULEB128(bytes, pos); pos += cb;
    if (count > 0) {
      const flags = bytes[pos++] ?? 0;
      const [minPages, mb] = readULEB128(bytes, pos); pos += mb;
      let maxPages: number | null = null;
      if (flags & 1) { const [mx] = readULEB128(bytes, pos); maxPages = mx; }
      memory = { minPages, maxPages };
    }
  }

  // ── Function count (section 3) ────────────────────────────────────────────
  let functionCount = 0;
  const funcSec = sections.find(s => s.id === 3);
  if (funcSec) {
    const [count] = readULEB128(bytes, funcSec.offset);
    functionCount = count;
  }

  // ── Tips ─────────────────────────────────────────────────────────────────
  const tips: string[] = [];
  const customSections = sections.filter(s => s.id === 0);
  const customSize = customSections.reduce((a, s) => a + s.size, 0);
  if (customSize > 4096) tips.push(`Strip debug/name custom sections (${fmtBytes(customSize)} found) — run wasm-strip or wasm-opt --strip-debug.`);
  const codeSection = sections.find(s => s.id === 10);
  if (codeSection && codeSection.size > 50_000) tips.push('Run wasm-opt -O3 to apply Binaryen optimizations — often reduces code section by 10-30%.');
  if (functionCount > 500) tips.push(`${functionCount} functions found — consider dead-code elimination (wasm-opt --dce) to remove unused exports.`);
  if (!sections.some(s => s.id === 11)) tips.push('No data section — if you use large static tables, consider lazy-loading them as fetch() instead of embedding in the bundle.');
  if (tips.length === 0) tips.push('Bundle looks lean — no obvious size reduction opportunities detected.');

  return { valid: true, totalSize: bytes.length, sections, imports, exports, memory, functionCount, tips };
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1048576).toFixed(2)} MB`;
}

function pct(part: number, total: number): string {
  return total === 0 ? '0%' : `${((part / total) * 100).toFixed(1)}%`;
}

const SECTION_COLORS: Record<number, string> = {
  0: '#94A3B8', 1: '#7C3AED', 2: '#2563EB', 3: '#059669',
  4: '#D97706', 5: '#DC2626', 6: '#7C3AED', 7: '#10B981',
  10: '#F59E0B', 11: '#EF4444',
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function WasmAnalyzer() {
  const [analysis, setAnalysis] = useState<WasmAnalysis | null>(null);
  const [fileName, setFileName]   = useState('');
  const [dragging, setDragging]   = useState(false);
  const [error,    setError]      = useState('');
  const inputRef = useRef<HTMLInputElement>(null!);

  const process = useCallback((file: File) => {
    if (!file.name.endsWith('.wasm')) { setError('Please upload a .wasm file.'); return; }
    setFileName(file.name);
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = analyzeWasm(e.target?.result as ArrayBuffer);
        if (!result.valid) { setError('Invalid WebAssembly file — magic number mismatch.'); setAnalysis(null); return; }
        setAnalysis(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Parse error');
        setAnalysis(null);
      }
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) process(file);
  }, [process]);

  const onFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) process(file);
    e.target.value = '';
  }, [process]);

  // JSON export of analysis
  const exportJson = analysis ? JSON.stringify({
    file: fileName, totalSize: analysis.totalSize,
    sections: analysis.sections.map(s => ({ name: s.name, size: s.size })),
    imports: analysis.imports, exports: analysis.exports,
    memory: analysis.memory, functionCount: analysis.functionCount,
  }, null, 2) : '';

  return (
    <ToolShell>
      <div className="space-y-5">
        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer transition-colors p-10
            ${dragging ? 'border-[#7C3AED] bg-[rgba(124,58,237,0.05)]' : 'border-[rgba(0,0,0,0.12)] dark:border-[rgba(255,255,255,0.12)] hover:border-[#7C3AED]'}`}
        >
          <input ref={inputRef} type="file" accept=".wasm" className="hidden" onChange={onFile} />
          <div className="w-12 h-12 rounded-full bg-[rgba(124,58,237,0.1)] flex items-center justify-center">
            <span className="text-[24px]">⬡</span>
          </div>
          <div className="text-center">
            <p className="text-[14px] font-medium" style={{ color: 'var(--text)' }}>
              {fileName ? fileName : 'Drop a .wasm file here'}
            </p>
            <p className="text-[12px] mt-1" style={{ color: 'var(--text-muted)' }}>
              Parsed entirely in your browser — nothing uploaded
            </p>
          </div>
        </div>

        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[13px]">{error}</div>
        )}

        {analysis && (
          <>
            {/* Summary bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Total Size',    value: fmtBytes(analysis.totalSize) },
                { label: 'Functions',     value: analysis.functionCount.toLocaleString() },
                { label: 'Imports',       value: analysis.imports.length.toString() },
                { label: 'Exports',       value: analysis.exports.length.toString() },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] p-3 bg-[var(--bg-card)]">
                  <p className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
                  <p className="text-[20px] font-bold" style={{ color: 'var(--text)' }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Section breakdown */}
            <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Section Breakdown</span>
              </div>
              {/* Stacked bar */}
              <div className="flex h-3 overflow-hidden">
                {analysis.sections.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      width: pct(s.size, analysis.totalSize),
                      background: SECTION_COLORS[s.id] ?? '#64748B',
                    }}
                    title={`${s.name}: ${fmtBytes(s.size)}`}
                  />
                ))}
              </div>
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                    {['Section', 'Size', 'Share'].map(h => (
                      <th key={h} className="px-4 py-2 text-left font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {analysis.sections.map((s, i) => (
                    <tr key={i} className="border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)]">
                      <td className="px-4 py-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: SECTION_COLORS[s.id] ?? '#64748B' }} />
                        <span className="font-medium" style={{ color: 'var(--text)' }}>{s.name}</span>
                      </td>
                      <td className="px-4 py-2 font-mono" style={{ color: 'var(--text)' }}>{fmtBytes(s.size)}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full bg-[rgba(0,0,0,0.06)] dark:bg-[rgba(255,255,255,0.06)] overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: pct(s.size, analysis.totalSize), background: SECTION_COLORS[s.id] ?? '#64748B' }} />
                          </div>
                          <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>{pct(s.size, analysis.totalSize)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Exports + Imports side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Exports */}
              <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Exports ({analysis.exports.length})</span>
                </div>
                <div className="overflow-auto" style={{ maxHeight: 200 }}>
                  {analysis.exports.length === 0 ? (
                    <p className="px-4 py-3 text-[12px]" style={{ color: 'var(--text-muted)' }}>No exports</p>
                  ) : (
                    <table className="w-full text-[12px]">
                      <tbody>
                        {analysis.exports.map((ex, i) => (
                          <tr key={i} className="border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] first:border-0">
                            <td className="px-4 py-2 font-mono" style={{ color: 'var(--text)' }}>{ex.name}</td>
                            <td className="px-4 py-2">
                              <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-[rgba(16,185,129,0.1)] text-[#10B981]">{ex.kind}</span>
                            </td>
                            <td className="px-4 py-2 text-[11px]" style={{ color: 'var(--text-muted)' }}>#{ex.index}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Imports */}
              <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                  <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Imports ({analysis.imports.length})</span>
                </div>
                <div className="overflow-auto" style={{ maxHeight: 200 }}>
                  {analysis.imports.length === 0 ? (
                    <p className="px-4 py-3 text-[12px]" style={{ color: 'var(--text-muted)' }}>No imports</p>
                  ) : (
                    <table className="w-full text-[12px]">
                      <tbody>
                        {analysis.imports.map((im, i) => (
                          <tr key={i} className="border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] first:border-0">
                            <td className="px-4 py-2 font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>{im.module}</td>
                            <td className="px-4 py-2 font-mono" style={{ color: 'var(--text)' }}>{im.field}</td>
                            <td className="px-4 py-2">
                              <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-[rgba(37,99,235,0.1)] text-[#2563EB]">{im.kind}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>

            {/* Memory */}
            {analysis.memory && (
              <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] px-4 py-3 flex items-center gap-6 bg-[var(--bg-card)]">
                <span className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Memory</span>
                <span className="text-[13px]" style={{ color: 'var(--text)' }}>
                  Min: <code className="font-mono text-[#7C3AED]">{analysis.memory.minPages} page{analysis.memory.minPages !== 1 ? 's' : ''}</code>
                  <span className="text-[11px] ml-1" style={{ color: 'var(--text-muted)' }}>({(analysis.memory.minPages * 64).toLocaleString()} KB)</span>
                </span>
                {analysis.memory.maxPages !== null && (
                  <span className="text-[13px]" style={{ color: 'var(--text)' }}>
                    Max: <code className="font-mono text-[#7C3AED]">{analysis.memory.maxPages} pages</code>
                    <span className="text-[11px] ml-1" style={{ color: 'var(--text-muted)' }}>({(analysis.memory.maxPages * 64).toLocaleString()} KB)</span>
                  </span>
                )}
              </div>
            )}

            {/* Tips */}
            <div className="rounded-xl border border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.04)] overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 border-b border-[rgba(245,158,11,0.2)]">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Size Optimization Tips</span>
              </div>
              <ul className="p-4 space-y-2">
                {analysis.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-[12px]" style={{ color: 'var(--text)' }}>
                    <span className="text-[#F59E0B] flex-shrink-0 mt-0.5">▶</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Export JSON */}
            <div className="flex justify-end">
              <CopyButton text={exportJson} />
            </div>
          </>
        )}
      </div>
    </ToolShell>
  );
}

