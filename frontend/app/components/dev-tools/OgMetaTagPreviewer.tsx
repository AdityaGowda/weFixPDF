'use client';

import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { ToolShell, CopyButton } from './SplitEditorPane';

interface OGData { title: string; description: string; imageUrl: string; siteName: string; url: string }

const DEFAULT: OGData = {
  title: 'My Awesome Page Title',
  description: 'A compelling meta description that appears in social media link previews.',
  imageUrl: '',
  siteName: 'My Website',
  url: 'https://example.com/page',
};

function ImgOrPlaceholder({ src, h }: { src: string; h: string }) {
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" className={`w-full ${h} object-cover`} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
  ) : (
    <div className={`w-full ${h} flex items-center justify-center bg-gray-100 dark:bg-gray-800`}>
      <ImageIcon className="w-8 h-8 text-gray-400" />
    </div>
  );
}

function TwitterCard({ d }: { d: OGData }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-[rgba(0,0,0,0.12)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#16181c] max-w-md">
      <ImgOrPlaceholder src={d.imageUrl} h="h-48" />
      <div className="px-3 py-2.5 border-t border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)]">
        <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate mb-0.5">{d.url || 'example.com'}</p>
        <p className="text-[14px] font-bold text-gray-900 dark:text-white leading-snug truncate">{d.title || 'Title'}</p>
        <p className="text-[12px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">{d.description || 'Description'}</p>
      </div>
    </div>
  );
}

function LinkedInCard({ d }: { d: OGData }) {
  return (
    <div className="rounded-md overflow-hidden border border-[rgba(0,0,0,0.15)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1d2226] max-w-md">
      <ImgOrPlaceholder src={d.imageUrl} h="h-44" />
      <div className="px-3 py-2.5 border-t border-[rgba(0,0,0,0.08)]">
        <p className="text-[14px] font-semibold text-gray-900 dark:text-white leading-snug truncate">{d.title || 'Title'}</p>
        <p className="text-[12px] text-gray-500 dark:text-gray-400 truncate mt-0.5">{d.siteName || 'Site Name'} · {d.url || 'example.com'}</p>
      </div>
    </div>
  );
}

function FacebookCard({ d }: { d: OGData }) {
  return (
    <div className="overflow-hidden border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-[#f0f2f5] dark:bg-[#1c1e21] max-w-md">
      <ImgOrPlaceholder src={d.imageUrl} h="h-44" />
      <div className="px-3 py-2 bg-[#e4e6eb] dark:bg-[#2c2f33] border-t border-[rgba(0,0,0,0.08)]">
        <p className="text-[10px] uppercase text-gray-500 dark:text-gray-400 truncate">{d.siteName || d.url || 'EXAMPLE.COM'}</p>
        <p className="text-[14px] font-bold text-gray-900 dark:text-white leading-snug truncate mt-0.5">{d.title || 'Title'}</p>
        <p className="text-[12px] text-gray-600 dark:text-gray-400 line-clamp-1">{d.description || 'Description'}</p>
      </div>
    </div>
  );
}

const INPUTS: { key: keyof OGData; label: string; placeholder: string }[] = [
  { key: 'title',       label: 'Title',       placeholder: 'Page title (50–60 chars recommended)' },
  { key: 'description', label: 'Description', placeholder: 'Meta description (150–160 chars recommended)' },
  { key: 'imageUrl',    label: 'Image URL',   placeholder: 'https://example.com/image.jpg  (1200×630 px)' },
  { key: 'siteName',    label: 'Site Name',   placeholder: 'Your website name' },
  { key: 'url',         label: 'Page URL',    placeholder: 'https://example.com/page' },
];

export default function OgMetaTagPreviewer() {
  const [data, setData] = useState<OGData>(DEFAULT);
  const upd = (k: keyof OGData, v: string) => setData(p => ({ ...p, [k]: v }));

  const metaTags = `<meta property="og:title"       content="${data.title}" />
<meta property="og:description"  content="${data.description}" />
<meta property="og:image"        content="${data.imageUrl}" />
<meta property="og:url"          content="${data.url}" />
<meta property="og:site_name"    content="${data.siteName}" />
<meta property="og:type"         content="website" />
<meta name="twitter:card"        content="summary_large_image" />
<meta name="twitter:title"       content="${data.title}" />
<meta name="twitter:description" content="${data.description}" />
<meta name="twitter:image"       content="${data.imageUrl}" />`;

  return (
    <ToolShell>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Left: inputs */}
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Tag Values</p>
          {INPUTS.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>{label}</label>
              <input
                type="text" value={data[key]} onChange={e => upd(key, e.target.value)} placeholder={placeholder}
                className="w-full text-[13px] px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#7C3AED] transition-colors"
                style={{ color: 'var(--text)' }}
              />
            </div>
          ))}
        </div>

        {/* Right: previews */}
        <div className="space-y-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Live Previews</p>
          {[
            { platform: 'X / Twitter', el: <TwitterCard d={data} /> },
            { platform: 'LinkedIn',    el: <LinkedInCard d={data} /> },
            { platform: 'Facebook',    el: <FacebookCard d={data} /> },
          ].map(({ platform, el }) => (
            <div key={platform}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>{platform}</p>
              {el}
            </div>
          ))}
        </div>
      </div>

      {/* Meta tags output */}
      <div className="mt-5 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
            <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Generated &lt;meta&gt; tags</span>
          </div>
          <CopyButton text={metaTags} />
        </div>
        <pre className="p-4 text-[11px] font-mono leading-relaxed overflow-x-auto" style={{ color: 'var(--text)' }}>{metaTags}</pre>
      </div>
    </ToolShell>
  );
}
