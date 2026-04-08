import type { Metadata } from 'next';
import Link from 'next/link';
import { getToolListings } from '@/app/lib/seo/seoApi';
import {
  FileDown, Image, FileText, Layers, Scissors, RotateCw,
  ShieldCheck, LockOpen, Minimize2, Zap, Smartphone, ArrowRight, FileImage,
  BookOpen, Camera, Code, Type, ShieldX, Expand, Shield, Columns2,
  Palette, Braces, KeyRound, ArrowLeftRight, GitCompare, FileCode,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const tools = await getToolListings();
  const count = tools.length || 14;
  const desc = `${count}+ free online tools: compress PDF, merge PDF, split PDF, convert PDF to JPG or Word — plus compress images, convert JPG to PNG, HEIC to JPG, PNG to WebP. No sign-up, no watermarks, files deleted instantly.`;
  return {
    title: 'Free PDF & Image Converter Tools Online — No Sign-Up | weFixPDF',
    description: desc,
    alternates: { canonical: 'https://wefixpdf.com/tools' },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Free PDF & Image Converter Tools Online | weFixPDF',
      description: desc,
      url: 'https://wefixpdf.com/tools',
      siteName: 'weFixPDF',
      type: 'website',
      images: [{ url: 'https://wefixpdf.com/wfp.png', width: 1200, height: 630, alt: 'weFixPDF — Free PDF & Image Tools' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Free PDF & Image Converter Tools — weFixPDF',
      description: desc,
      images: ['https://wefixpdf.com/wfp.png'],
      site: '@wefixpdf',
    },
  };
}

type Tool = { href: string; icon: any; label: string; desc: string; popular?: boolean };

// Map icon_name strings (stored in DB) to Lucide components
const iconNameMap: Record<string, any> = {
  FileDown, FileImage, FileText, Layers, Scissors, RotateCw,
  ShieldCheck, LockOpen, Minimize2, Zap, Smartphone, Image,
  BookOpen, Camera, Code, Type, ShieldX, Expand, Shield, Columns2,
  Palette, Braces, KeyRound, ArrowLeftRight, GitCompare, FileCode,
};

const popularSlugs = new Set(['compress-pdf', 'image-compressor', 'png-to-jpg']);


function FreeBadge({ popular }: { popular?: boolean }) {
  if (popular) {
    return (
      <span
        className="text-[10px] font-medium px-2 py-0.5 rounded"
        style={{ background: '#E6F1FB', color: '#185FA5' }}
      >
        Popular
      </span>
    );
  }
  return (
    <span
      className="text-[10px] font-medium px-2 py-0.5 rounded"
      style={{ background: '#EAF3DE', color: '#3B6D11' }}
    >
      Free
    </span>
  );
}

function ToolCard({ tool, variant = 'blue' }: { tool: Tool; variant?: 'blue' | 'emerald' | 'violet' }) {
  const Icon = tool.icon;
  const iconBg    = variant === 'emerald' ? '#ECFDF5' : variant === 'violet' ? '#F3EFFE' : '#E6F1FB';
  const iconColor = variant === 'emerald' ? '#059669' : variant === 'violet' ? '#7C3AED' : '#2D5BE3';
  return (
    <Link href={tool.href} className="tool-card group" aria-label={tool.label}>
      <div className="flex items-start justify-between gap-2">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: iconBg }}
        >
          <Icon className="w-[18px] h-[18px]" color={iconColor} strokeWidth={1.75} />
        </div>
        <FreeBadge popular={tool.popular} />
      </div>
      <div>
        <h3 className="text-[14px] font-medium leading-snug" style={{ color: 'var(--text)' }}>{tool.label}</h3>
        <p className="text-[12px] mt-0.5 leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>{tool.desc}</p>
      </div>
    </Link>
  );
}

export default async function ToolsPage() {
  const allTools = await getToolListings();

  const toTool = (t: { slug: string; name: string; description: string; icon_name?: string }, fallback: any): Tool => ({
    href:    `/${t.slug}`,
    icon:    iconNameMap[t.icon_name ?? ''] ?? fallback,
    label:   t.name,
    desc:    t.description,
    popular: popularSlugs.has(t.slug),
  });

  const pdfTools: Tool[] = allTools
    .filter((t) => t.type === 'PDF Tools')
    .sort((a, b) => a.position - b.position)
    .map((t) => toTool(t, FileDown));

  const imageTools: Tool[] = allTools
    .filter((t) => t.type === 'Image Tools')
    .sort((a, b) => a.position - b.position)
    .map((t) => toTool(t, Image));

  const devTools: Tool[] = allTools
    .filter((t) => t.type === 'Dev Tools')
    .sort((a, b) => a.position - b.position)
    .map((t) => toTool(t, Code));

  const totalTools = pdfTools.length + imageTools.length + devTools.length;

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'All Free PDF, Image & Developer Tools — weFixPDF',
    url: 'https://wefixpdf.com/tools',
    numberOfItems: totalTools,
    itemListElement: [
      ...pdfTools.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.label, url: `https://wefixpdf.com${t.href}` })),
      ...imageTools.map((t, i) => ({ '@type': 'ListItem', position: pdfTools.length + i + 1, name: t.label, url: `https://wefixpdf.com${t.href}` })),
      ...devTools.map((t, i) => ({ '@type': 'ListItem', position: pdfTools.length + imageTools.length + i + 1, name: t.label, url: `https://wefixpdf.com${t.href}` })),
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="bg-page">

        {/* ── Hero ── */}
        <section className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-2 text-[12px] mb-8" style={{ color: 'var(--text-muted)' }}>
              <Link href="/" className="transition-colors hover:underline">Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--text)' }}>All Tools</span>
            </nav>

            <p className="text-label mb-4">{totalTools} Free tools · No account required</p>
            <h1 className="text-section mb-3" style={{ color: 'var(--text)' }}>Free PDF &amp; Image Converter Tools Online</h1>
            <p className="text-[16px] leading-[1.7] max-w-lg" style={{ color: 'var(--text-muted)' }}>
              Compress PDF, convert PDF to JPG or Word, merge &amp; split PDFs — plus compress images, convert JPG to PNG, HEIC to JPG, PNG to WebP. All free, no sign-up, files deleted instantly.
            </p>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-2 mt-6">
              {['TLS 1.3 encrypted', 'Files deleted instantly', 'No sign-up ever', 'No daily limits', 'Zero human access'].map((chip) => (
                <span
                  key={chip}
                  className="text-[12px] font-medium px-3 py-1.5 rounded-md border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)]" style={{ color: 'var(--text-muted)' }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-14">

          {/* ── PDF Tools ── */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{ background: '#2D5BE3' }} />
                <p className="text-label">PDF Tools</p>
              </div>
              <div className="h-px flex-1 bg-[rgba(0,0,0,0.06)] dark:bg-[rgba(255,255,255,0.06)]" />
              <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{pdfTools.length} tools</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {pdfTools.map((t) => <ToolCard key={t.href} tool={t} variant="blue" />)}
            </div>
          </section>

          {/* ── Image Tools ── */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{ background: '#10B981' }} />
                <p className="text-label">Image Tools</p>
              </div>
              <div className="h-px flex-1 bg-[rgba(0,0,0,0.06)] dark:bg-[rgba(255,255,255,0.06)]" />
              <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{imageTools.length} tools</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {imageTools.map((t) => <ToolCard key={t.href} tool={t} variant="emerald" />)}
            </div>
          </section>

          {/* ── Dev Tools ── */}
          {devTools.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm" style={{ background: '#8B5CF6' }} />
                  <p className="text-label">Developer Tools</p>
                </div>
                <div className="h-px flex-1 bg-[rgba(0,0,0,0.06)] dark:bg-[rgba(255,255,255,0.06)]" />
                <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{devTools.length} tools</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {devTools.map((t) => <ToolCard key={t.href} tool={t} variant="violet" />)}
              </div>
            </section>
          )}

          {/* ── Stats ── */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { stat: '100%',   label: 'Free forever',   accent: '#2D5BE3' },
              { stat: '<3 sec', label: 'Processing time', accent: '#10B981' },
              { stat: '0 sec',  label: 'File retention',  accent: '#8B5CF6' },
              { stat: `${totalTools}+`, label: 'Free tools', accent: '#F59E0B' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] p-5 text-center bg-card"
                style={{ borderTop: `2.5px solid ${s.accent}` }}
              >
                <p className="text-[22px] font-medium tabular-nums" style={{ color: s.accent }}>{s.stat}</p>
                <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </section>

          {/* ── Trust note ── */}
          <section className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] p-6 bg-surface">
            <p className="text-[14px] font-medium mb-1" style={{ color: 'var(--text)' }}>Why people trust weFixPDF</p>
            <p className="text-[13px] mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Every file is processed securely, never stored, and immediately deleted after download.
              No account, no watermarks, no limits.
            </p>
            <Link
              href="/security"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium"
              style={{ color: '#2D5BE3' }}
            >
              Read our Security &amp; Privacy page <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
