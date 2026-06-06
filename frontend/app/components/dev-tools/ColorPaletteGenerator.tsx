'use client';

import { useState, useCallback, useEffect } from 'react';
import { Shuffle, Download } from 'lucide-react';
import { CopyButton, ToolShell } from './SplitEditorPane';
import { generatePalette, randomHex, paletteToCSS, paletteToSCSS, paletteToTailwind, paletteToJson, type ColorSwatch, type Palette } from './converters';

type ColorFormat = 'hex' | 'rgb' | 'hsl';
type ExportFormat = 'css' | 'scss' | 'tailwind' | 'json';

function formatSwatch(s: ColorSwatch, fmt: ColorFormat): string {
  if (fmt === 'rgb') return `rgb(${s.rgb.join(', ')})`;
  if (fmt === 'hsl') return `hsl(${s.hsl[0]}, ${s.hsl[1]}%, ${s.hsl[2]}%)`;
  return s.hex;
}

function contrastColor(hex: string): string {
  const [r, g, b] = hex.replace('#', '').match(/.{2}/g)!.map((c) => parseInt(c, 16));
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum > 140 ? '#000000' : '#ffffff';
}

function Swatch({ s, fmt }: { s: ColorSwatch; fmt: ColorFormat }) {
  const [copied, setCopied] = useState(false);
  const value = formatSwatch(s, fmt);
  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }, [value]);

  return (
    <button
      onClick={handleCopy}
      title={`Copy ${value}`}
      className="group flex flex-col rounded-xl overflow-hidden border border-[rgba(0,0,0,0.1)] hover:scale-105 transition-transform shadow-sm hover:shadow-md"
      style={{ background: s.hex }}
    >
      <div className="flex-1 min-h-[60px] flex items-end justify-end p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <span
          className="text-[9px] font-bold px-1.5 py-0.5 rounded"
          style={{ background: 'rgba(0,0,0,0.25)', color: '#fff' }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </span>
      </div>
      <div
        className="px-2 py-1.5 text-left"
        style={{ background: 'rgba(0,0,0,0.15)', color: contrastColor(s.hex) }}
      >
        <p className="text-[9px] font-bold truncate opacity-60">{s.label}</p>
        <p className="text-[10px] font-mono font-medium truncate">{value}</p>
      </div>
    </button>
  );
}

function SwatchRow({ title, swatches, fmt, accent }: { title: string; swatches: ColorSwatch[]; fmt: ColorFormat; accent: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: accent }} />
        <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{title}</span>
      </div>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${swatches.length}, 1fr)` }}>
        {swatches.map((s) => <Swatch key={s.label} s={s} fmt={fmt} />)}
      </div>
    </div>
  );
}

export default function ColorPaletteGenerator() {
  const [hex, setHex] = useState('#7C3AED');
  const [fmt, setFmt] = useState<ColorFormat>('hex');
  const [exportFmt, setExportFmt] = useState<ExportFormat>('css');
  const [palette, setPalette] = useState<Palette | null>(null);
  const [hexInput, setHexInput] = useState('#7C3AED');
  const [exportText, setExportText] = useState('');

  const generate = useCallback((color: string) => {
    try { setPalette(generatePalette(color)); } catch { }
  }, []);

  useEffect(() => { generate(hex); }, [hex, generate]);

  useEffect(() => {
    if (!palette) return;
    const map: Record<ExportFormat, () => string> = {
      css: () => paletteToCSS(palette),
      scss: () => paletteToSCSS(palette),
      tailwind: () => paletteToTailwind(palette),
      json: () => paletteToJson(palette),
    };
    setExportText(map[exportFmt]());
  }, [palette, exportFmt]);

  const handleHexInput = (v: string) => {
    setHexInput(v);
    const clean = v.startsWith('#') ? v : '#' + v;
    if (/^#[0-9a-fA-F]{6}$/.test(clean)) { setHex(clean); }
  };

  const handlePickerChange = (v: string) => { setHex(v); setHexInput(v); };

  const iconBtn = 'inline-flex items-center gap-1 text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';

  return (
    <ToolShell>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={hex}
            onChange={(e) => handlePickerChange(e.target.value)}
            className="w-10 h-10 rounded-lg border border-[rgba(0,0,0,0.1)] cursor-pointer p-0.5"
            title="Pick a color"
          />
          <input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexInput(e.target.value)}
            placeholder="#7C3AED"
            maxLength={7}
            className="w-24 text-[13px] font-mono px-2 py-1.5 rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--surface)] outline-none focus:border-[#7C3AED]"
            style={{ color: 'var(--text)' }}
          />
        </div>
        <button onClick={() => { const h = randomHex(); setHex(h); setHexInput(h); }} className={iconBtn}>
          <Shuffle className="w-3.5 h-3.5" /> Randomize
        </button>
        <div className="inline-flex rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] overflow-hidden text-[11px] font-medium ml-auto">
          {(['hex', 'rgb', 'hsl'] as ColorFormat[]).map((f) => (
            <button key={f} onClick={() => setFmt(f)} className={`px-2.5 py-1.5 transition-colors ${fmt === f ? 'bg-[#7C3AED] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {palette && (
        <>
          <div
            className="w-full h-16 rounded-xl mb-5 flex items-center px-4 gap-3 shadow-inner"
            style={{ background: palette.base.hex }}
          >
            <span className="font-mono font-bold text-[15px]" style={{ color: contrastColor(palette.base.hex) }}>
              {formatSwatch(palette.base, fmt)}
            </span>
            <span className="text-[11px] opacity-60" style={{ color: contrastColor(palette.base.hex) }}>Base</span>
            <div className="ml-auto"><CopyButton text={formatSwatch(palette.base, fmt)} /></div>
          </div>

          <div className="space-y-5 mb-5">
            <SwatchRow title="Shades (darker)" swatches={palette.shades} fmt={fmt} accent="#374151" />
            <SwatchRow title="Tints (lighter)" swatches={palette.tints} fmt={fmt} accent="#9CA3AF" />
            <SwatchRow title="Harmonics" swatches={palette.harmonics} fmt={fmt} accent="#7C3AED" />
          </div>

          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Export as</span>
              <div className="inline-flex rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] overflow-hidden text-[11px] font-medium">
                {(['css', 'scss', 'tailwind', 'json'] as ExportFormat[]).map((f) => (
                  <button key={f} onClick={() => setExportFmt(f)} className={`px-2.5 py-1 transition-colors ${exportFmt === f ? 'bg-[#7C3AED] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>
                    {f}
                  </button>
                ))}
              </div>
              <div className="ml-auto flex gap-1">
                <CopyButton text={exportText} />
                <button
                  onClick={() => {
                    const ext = exportFmt === 'tailwind' ? 'js' : exportFmt;
                    const blob = new Blob([exportText], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a'); a.href = url; a.download = `palette.${ext}`; a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className={iconBtn}
                >
                  <Download className="w-3 h-3" />
                </button>
              </div>
            </div>
            <pre className="p-4 text-[12px] font-mono leading-relaxed overflow-auto" style={{ color: 'var(--text)', maxHeight: 200 }}>
              {exportText}
            </pre>
          </div>
        </>
      )}
    </ToolShell>
  );
}
