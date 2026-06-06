'use client';

import { useState, useMemo } from 'react';
import { ToolShell, CopyButton } from './SplitEditorPane';

type Unit = 'px' | 'rem' | 'em' | 'vw' | 'vh' | '%';

const UNITS: Unit[] = ['px', 'rem', 'em', 'vw', 'vh', '%'];

interface Conversion { unit: Unit; value: string; description: string }

function toPx(value: number, unit: Unit, baseFontSize: number, vpWidth: number, vpHeight: number): number {
  switch (unit) {
    case 'px':  return value;
    case 'rem': return value * baseFontSize;
    case 'em':  return value * baseFontSize;
    case 'vw':  return (value / 100) * vpWidth;
    case 'vh':  return (value / 100) * vpHeight;
    case '%':   return (value / 100) * baseFontSize;
  }
}

function fromPx(px: number, unit: Unit, baseFontSize: number, vpWidth: number, vpHeight: number): number {
  switch (unit) {
    case 'px':  return px;
    case 'rem': return px / baseFontSize;
    case 'em':  return px / baseFontSize;
    case 'vw':  return (px / vpWidth) * 100;
    case 'vh':  return (px / vpHeight) * 100;
    case '%':   return (px / baseFontSize) * 100;
  }
}

const UNIT_DESC: Record<Unit, string> = {
  px:  'Absolute pixels — fixed, unaffected by user settings',
  rem: 'Root font-size multiples — respects user accessibility settings',
  em:  'Parent element font-size multiples — cascades with nesting',
  vw:  'Percentage of viewport width',
  vh:  'Percentage of viewport height',
  '%': 'Percentage of parent element font-size',
};

function fmt(n: number): string {
  if (!isFinite(n)) return '∞';
  const s = parseFloat(n.toPrecision(6)).toString();
  return s;
}

export default function CssUnitConverter() {
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [vpWidth,      setVpWidth]      = useState(1440);
  const [vpHeight,     setVpHeight]     = useState(900);
  const [inputValue,   setInputValue]   = useState('1');
  const [inputUnit,    setInputUnit]    = useState<Unit>('rem');

  const conversions = useMemo<Conversion[]>(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return [];
    const px = toPx(val, inputUnit, baseFontSize, vpWidth, vpHeight);
    return UNITS.filter(u => u !== inputUnit).map(u => ({
      unit: u,
      value: fmt(fromPx(px, u, baseFontSize, vpWidth, vpHeight)),
      description: UNIT_DESC[u],
    }));
  }, [inputValue, inputUnit, baseFontSize, vpWidth, vpHeight]);

  const inputClass = 'text-[13px] font-mono px-2.5 py-1.5 rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#7C3AED] transition-colors';

  return (
    <ToolShell>
      <div className="space-y-5">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Root font size (px)</label>
            <input type="number" value={baseFontSize} onChange={e => setBaseFontSize(parseFloat(e.target.value) || 16)}
              min={1} max={64} className={`w-24 ${inputClass}`} style={{ color: 'var(--text)' }} />
          </div>
          <div>
            <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Viewport width (px)</label>
            <input type="number" value={vpWidth} onChange={e => setVpWidth(parseFloat(e.target.value) || 1440)}
              min={1} className={`w-28 ${inputClass}`} style={{ color: 'var(--text)' }} />
          </div>
          <div>
            <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Viewport height (px)</label>
            <input type="number" value={vpHeight} onChange={e => setVpHeight(parseFloat(e.target.value) || 900)}
              min={1} className={`w-28 ${inputClass}`} style={{ color: 'var(--text)' }} />
          </div>
        </div>

        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Value</label>
            <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)}
              placeholder="1" step="any"
              className={`w-full text-[20px] font-mono font-bold ${inputClass}`} style={{ color: '#7C3AED' }} />
          </div>
          <div>
            <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Unit</label>
            <div className="inline-flex rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] overflow-hidden text-[11px] font-medium font-mono">
              {UNITS.map(u => (
                <button key={u} onClick={() => setInputUnit(u)}
                  className={`px-2.5 py-2 transition-colors ${inputUnit === u ? 'bg-[#7C3AED] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        {conversions.length > 0 && (
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <span className="w-2 h-2 rounded-full bg-[#163863]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>
                {inputValue} {inputUnit} in all other units
              </span>
            </div>
            <table className="w-full">
              <tbody>
                {conversions.map(({ unit, value, description }) => (
                  <tr key={unit} className="border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] first:border-0">
                    <td className="px-4 py-3 w-16">
                      <code className="text-[14px] font-mono font-bold" style={{ color: '#7C3AED' }}>{unit}</code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-[14px] font-mono font-semibold" style={{ color: 'var(--text)' }}>{value}</code>
                    </td>
                    <td className="px-4 py-3 text-[11px]" style={{ color: 'var(--text-muted)' }}>{description}</td>
                    <td className="px-3 py-3 text-right">
                      <CopyButton text={`${value}${unit}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ToolShell>
  );
}
