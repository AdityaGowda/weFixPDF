'use client';

import { useState, useCallback, useRef, useEffect, DragEvent } from 'react';
import { Upload, Download } from 'lucide-react';
import { ToolShell, CopyButton } from './SplitEditorPane';

const SIZES = [16, 32, 48, 180, 512] as const;

interface Preview { size: number; dataUrl: string }

function drawToCanvas(source: HTMLImageElement | null, emoji: string, size: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);
  if (source) {
    ctx.drawImage(source, 0, 0, size, size);
  } else if (emoji) {
    const fontSize = Math.round(size * 0.78);
    ctx.font = `${fontSize}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, size / 2, size / 2 + 2);
  }
  return canvas.toDataURL('image/png');
}

function generatePreviews(source: HTMLImageElement | null, emoji: string): Preview[] {
  return SIZES.map(size => ({ size, dataUrl: drawToCanvas(source, emoji, size) }));
}

const htmlSnippet = `<link rel="icon" type="image/png" sizes="16x16"   href="/favicon-16.png">
<link rel="icon" type="image/png" sizes="32x32"   href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="48x48"   href="/favicon-48.png">
<link rel="apple-touch-icon"      sizes="180x180"  href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="512x512"  href="/favicon-512.png">`;

export default function FaviconGenerator() {
  const [mode,     setMode]     = useState<'emoji' | 'file'>('emoji');
  const [emoji,    setEmoji]    = useState('🚀');
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [drag,     setDrag]     = useState(false);
  const [fileName, setFileName] = useState('');
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === 'emoji') {
      setPreviews(generatePreviews(null, emoji));
    }
  }, [emoji, mode]);

  const loadFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setFileName(file.name);
      setMode('file');
      setPreviews(generatePreviews(img, ''));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setDrag(false);
    const file = e.dataTransfer.files[0]; if (file) loadFile(file);
  }, [loadFile]);

  const download = (dataUrl: string, size: number) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = size === 180 ? 'apple-touch-icon.png' : `favicon-${size}.png`;
    a.click();
  };

  const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';

  return (
    <ToolShell>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Source</p>

          <div className="inline-flex rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] overflow-hidden text-[11px] font-medium">
            <button onClick={() => setMode('emoji')} className={`px-3 py-1.5 transition-colors ${mode === 'emoji' ? 'bg-[#7C3AED] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>Emoji</button>
            <button onClick={() => setMode('file')}  className={`px-3 py-1.5 transition-colors ${mode === 'file'  ? 'bg-[#7C3AED] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>Image</button>
          </div>

          {mode === 'emoji' ? (
            <div className="space-y-2">
              <label className="block text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Enter an emoji</label>
              <input
                type="text" value={emoji} onChange={e => setEmoji(e.target.value)} maxLength={4}
                className="w-24 text-[40px] text-center px-2 py-1 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#7C3AED]"
                style={{ color: 'var(--text)' }}
              />
              <p className="text-[10px]" style={{ color: 'var(--text-subtle)' }}>Try 🔥 ⚡ 🎯 🛠️ 🌊</p>
            </div>
          ) : (
            <div
              onDragOver={e => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={onDrop}
              onClick={() => fileRef.current?.click()}
              className={`rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${drag ? 'border-[#7C3AED] bg-[rgba(124,58,237,0.05)]' : 'border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] hover:border-[#7C3AED]'}`}
            >
              <Upload className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
              <p className="text-[13px] font-medium" style={{ color: 'var(--text)' }}>{fileName || 'Drop PNG or SVG, or click to browse'}</p>
              <input ref={fileRef} type="file" accept=".png,.svg,.jpg,.jpeg,.webp" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f); e.target.value = ''; }} />
            </div>
          )}

          {previews.length > 0 && (
            <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>&lt;head&gt; snippet</span>
                <CopyButton text={htmlSnippet} />
              </div>
              <pre className="text-[10px] font-mono p-3 overflow-x-auto leading-relaxed" style={{ color: 'var(--text)' }}>{htmlSnippet}</pre>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Preview &amp; Download</p>
          {previews.length > 0 ? (
            <div className="space-y-3">
              {previews.map(({ size, dataUrl }) => (
                <div key={size} className="flex items-center gap-4 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] px-4 py-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={dataUrl} alt={`Favicon preview ${size}x${size} pixels`}
                    style={{ width: Math.min(size, 64), height: Math.min(size, 64) }}
                    className="rounded border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-white"
                  />
                  <div className="flex-1">
                    <p className="text-[13px] font-medium" style={{ color: 'var(--text)' }}>{size}×{size}</p>
                    <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      {size === 180 ? 'Apple touch icon' : size === 512 ? 'PWA / maskable icon' : 'Browser favicon'}
                    </p>
                  </div>
                  <button onClick={() => download(dataUrl, size)} className={iconBtn}>
                    <Download className="w-3 h-3" /> .png
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[12px]" style={{ color: 'var(--text-subtle)' }}>Enter an emoji or upload an image to generate previews</p>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
