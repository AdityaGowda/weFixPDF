'use client';

import { useState, useCallback } from 'react';
import { ToolShell, CopyButton } from './SplitEditorPane';

type Bit = 'r' | 'w' | 'x';
type Entity = 'owner' | 'group' | 'other';
type Perms = Record<Bit, boolean>;
type PermSet = Record<Entity, Perms>;

const INITIAL: PermSet = {
  owner: { r: true, w: true, x: true },
  group: { r: true, w: false, x: true },
  other: { r: true, w: false, x: true },
};

const toOctal  = (p: Perms) => (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0);
const toSym    = (p: Perms) => (p.r ? 'r' : '-') + (p.w ? 'w' : '-') + (p.x ? 'x' : '-');
const fromOctal = (n: number): Perms => ({ r: !!(n & 4), w: !!(n & 2), x: !!(n & 1) });
const numeric  = (ps: PermSet) => `${toOctal(ps.owner)}${toOctal(ps.group)}${toOctal(ps.other)}`;
const symbolic = (ps: PermSet) => toSym(ps.owner) + toSym(ps.group) + toSym(ps.other);

const ENTITIES: { key: Entity; label: string; color: string }[] = [
  { key: 'owner', label: 'Owner', color: '#7C3AED' },
  { key: 'group', label: 'Group', color: '#2563EB' },
  { key: 'other', label: 'Other', color: '#163863' },
];

const COMMON: { label: string; value: string }[] = [
  { label: '777 — full', value: '777' },
  { label: '755 — exec',  value: '755' },
  { label: '644 — file',  value: '644' },
  { label: '600 — private', value: '600' },
  { label: '664 — shared', value: '664' },
];

export default function ChmodCalculator() {
  const [perms,    setPerms]    = useState<PermSet>(INITIAL);
  const [numInput, setNumInput] = useState('755');

  const toggle = useCallback((entity: Entity, bit: Bit) => {
    setPerms(prev => {
      const updated = { ...prev, [entity]: { ...prev[entity], [bit]: !prev[entity][bit] } };
      setNumInput(numeric(updated));
      return updated;
    });
  }, []);

  const applyNumeric = useCallback((val: string) => {
    setNumInput(val);
    if (/^[0-7]{3}$/.test(val)) {
      const [o, g, t] = val.split('').map(Number);
      setPerms({ owner: fromOctal(o), group: fromOctal(g), other: fromOctal(t) });
    }
  }, []);

  const num = numeric(perms);
  const sym = symbolic(perms);
  const cmd = `chmod ${num} filename`;

  return (
    <ToolShell>
      <div className="space-y-4">

        {/* Grid */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="grid grid-cols-4 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            {['Entity', 'Read (4)', 'Write (2)', 'Execute (1)'].map(h => (
              <div key={h} className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-center first:text-left" style={{ color: 'var(--text-muted)' }}>{h}</div>
            ))}
          </div>
          {ENTITIES.map(({ key, label, color }) => (
            <div key={key} className="grid grid-cols-4 items-center border-t border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-2 px-4 py-3">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                <span className="text-[13px] font-medium" style={{ color: 'var(--text)' }}>{label}</span>
                <span className="ml-auto text-[12px] font-mono font-bold" style={{ color }}>{toOctal(perms[key])}</span>
              </div>
              {(['r', 'w', 'x'] as Bit[]).map(bit => (
                <div key={bit} className="flex justify-center py-3">
                  <button
                    onClick={() => toggle(key, bit)}
                    className={`w-8 h-8 rounded-lg text-[12px] font-bold font-mono border-2 transition-all ${perms[key][bit] ? 'border-transparent text-white shadow-sm' : 'border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[var(--text-muted)]'}`}
                    style={perms[key][bit] ? { background: color } : { background: 'var(--bg-card)' }}
                  >
                    {bit}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Output row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Numeric</span>
              <CopyButton text={num} />
            </div>
            <div className="px-4 py-3 flex items-center gap-2">
              <input
                type="text" value={numInput} onChange={e => applyNumeric(e.target.value)}
                maxLength={3}
                className="w-20 text-[28px] font-mono font-bold text-center bg-transparent border-b-2 border-[#7C3AED] outline-none"
                style={{ color: '#7C3AED' }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Symbolic</span>
              <CopyButton text={sym} />
            </div>
            <div className="px-4 py-3">
              <code className="text-[20px] font-mono font-bold tracking-widest" style={{ color: 'var(--text)' }}>{sym}</code>
            </div>
          </div>

          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Command</span>
              <CopyButton text={cmd} />
            </div>
            <div className="px-4 py-3">
              <code className="text-[13px] font-mono" style={{ color: 'var(--text)' }}>{cmd}</code>
            </div>
          </div>
        </div>

        {/* Common presets */}
        <div className="flex flex-wrap gap-2">
          {COMMON.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => applyNumeric(value)}
              className={`text-[11px] font-mono px-3 py-1.5 rounded-lg border transition-colors ${numInput === value ? 'bg-[#7C3AED] text-white border-transparent' : 'border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--surface)]'}`}
            >
              {label}
            </button>
          ))}
        </div>
      
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
