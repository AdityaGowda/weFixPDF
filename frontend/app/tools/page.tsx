import type { Metadata } from 'next'
import Link from 'next/link'
import { getToolListings } from '@/app/lib/seo/seoApi'
import { FileDown, Image, FileText, Layers, Scissors, RotateCw, ShieldCheck, LockOpen, Minimize2, Zap, Smartphone, ArrowRight, Shield, Lock, FileImage } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const tools = await getToolListings()
  const count = tools.filter((t) => t.type === 'PDF Tools' || t.type === 'Image Tools').length || 14
  const desc = `Browse all ${count} free online tools at weFixPDF. Compress PDF, convert images, merge, split, protect and unlock PDFs — no sign-up, no watermarks, instant file deletion.`;
  return {
    title: 'All Free PDF & Image Tools — weFixPDF',
    description: desc,
    alternates: { canonical: 'https://wefixpdf.com/tools' },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'All Free PDF & Image Tools — weFixPDF',
      description: desc,
      url: 'https://wefixpdf.com/tools',
      siteName: 'weFixPDF',
      type: 'website',
      images: [{ url: 'https://wefixpdf.com/wfp.png', width: 1200, height: 630, alt: 'weFixPDF — All Free Tools' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'All Free PDF & Image Tools — weFixPDF',
      description: desc,
      images: ['https://wefixpdf.com/wfp.png'],
      site: '@wefixpdf',
    },
  }
}

type Tool = {
  href: string
  icon: any
  label: string
  desc: string
  cta: string
  popular?: boolean
}

const toolsUIConfig: Record<string, { icon: any; cta: string; popular?: boolean }> = {
  'compress-pdf':    { icon: FileDown, cta: 'Compress PDF Free',        popular: true },
  'pdf-to-jpg':      { icon: FileImage, cta: 'Convert PDF to JPG Free' },
  'pdf-to-word':     { icon: FileText, cta: 'Convert PDF to Word Free' },
  'merge-pdf':       { icon: Layers, cta: 'Merge PDF Files Free' },
  'split-pdf':       { icon: Scissors, cta: 'Split PDF Free' },
  'rotate-pdf':      { icon: RotateCw, cta: 'Rotate PDF Pages Free' },
  'protect-pdf':     { icon: ShieldCheck, cta: 'Password Protect PDF Free' },
  'unlock-pdf':      { icon: LockOpen, cta: 'Unlock PDF Online Free' },
  'image-compressor':{ icon: Minimize2, cta: 'Compress Image Free',      popular: true },
  'png-to-jpg':      { icon: Image, cta: 'Convert PNG to JPG Free',  popular: true },
  'jpg-to-png':      { icon: Image, cta: 'Convert JPG to PNG Free' },
  'png-to-webp':     { icon: Zap, cta: 'Convert PNG to WEBP Free' },
  'heic-to-jpg':     { icon: Smartphone, cta: 'Convert HEIC to JPG Free' },
  'image-to-pdf':    { icon: FileText, cta: 'Convert Image to PDF Free' },
}

const trustItems = [
  { icon: Lock, label: 'TLS 1.3 Encrypted' },
  { icon: Shield, label: 'Files deleted instantly' },
  { icon: ShieldCheck, label: 'No sign-up ever' },
  { icon: Zap, label: 'Zero human access' },
  { icon: Layers, label: 'No daily limits' },
]

const stats = [
  { value: '1K+',   label: 'Daily conversions' },
  { value: '14',    label: 'Free tools' },
  { value: '0 sec', label: 'File retention' },
  { value: '100%',  label: 'Free forever' },
]

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <Link
      href={tool.href}
      className="group relative glass dark:glass-dark rounded-2xl p-5 border border-slate-200/60 dark:border-white/5 hover:border-brand-primary/40 hover:shadow-lg hover:shadow-brand-primary/8 hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl" />

      {/* Top row: icon + badge */}
      <div className="relative flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-brand-primary/10 group-hover:bg-brand-primary/20 flex items-center justify-center transition-colors duration-200 shrink-0">
          <Icon className="w-4.5 h-4.5 text-brand-primary" strokeWidth={1.75} />
        </div>
        {tool.popular ? (
          <span className="px-2 py-0.5 bg-red-500/10 text-red-600 dark:text-red-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-red-500/20">
            Popular
          </span>
        ) : (
          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
            Free
          </span>
        )}
      </div>

      <div className="relative flex flex-col gap-1 flex-1">
        <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors leading-snug">
          {tool.label}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
          {tool.desc}
        </p>
      </div>

      <div className="relative flex items-center gap-1 text-brand-primary font-black text-[10px] uppercase tracking-widest translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
        {tool.cta} <ArrowRight className="w-3 h-3" />
      </div>
    </Link>
  )
}

function SectionHeader({ id, title, count }: { id: string; title: string; count: number }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <h2 id={id} className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 shrink-0">
        {title}
      </h2>
      <div className="h-px flex-1 bg-slate-200/60 dark:bg-slate-800/60" />
      <span className="px-2.5 py-0.5 font-bold rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5 shrink-0">
        {count} tools
      </span>
    </div>
  )
}

export default async function ToolsPage() {
  const allTools = await getToolListings()

  const pdfTools: Tool[] = allTools
    .filter((t) => t.type === 'PDF Tools')
    .sort((a, b) => a.position - b.position)
    .map((t) => ({
      href: `/${t.slug}`,
      icon: toolsUIConfig[t.slug]?.icon ?? FileDown,
      label: t.name,
      desc: t.description,
      cta: toolsUIConfig[t.slug]?.cta ?? `${t.name} Free`,
      popular: toolsUIConfig[t.slug]?.popular,
    }))

  const imageTools: Tool[] = allTools
    .filter((t) => t.type === 'Image Tools')
    .sort((a, b) => a.position - b.position)
    .map((t) => ({
      href: `/${t.slug}`,
      icon: toolsUIConfig[t.slug]?.icon ?? Image,
      label: t.name,
      desc: t.description,
      cta: toolsUIConfig[t.slug]?.cta ?? `${t.name} Free`,
      popular: toolsUIConfig[t.slug]?.popular,
    }))

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'All Free PDF & Image Tools — weFixPDF',
    description: 'Free online tools to compress PDF, convert images, merge, split, protect and unlock PDFs.',
    url: 'https://wefixpdf.com/tools',
    numberOfItems: pdfTools.length + imageTools.length,
    itemListElement: [
      ...pdfTools.map((tool, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: tool.label,
        description: tool.desc,
        url: `https://wefixpdf.com${tool.href}`,
      })),
      ...imageTools.map((tool, i) => ({
        '@type': 'ListItem',
        position: pdfTools.length + i + 1,
        name: tool.label,
        description: tool.desc,
        url: `https://wefixpdf.com${tool.href}`,
      })),
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Free PDF & Image Tools — weFixPDF',
    description: 'Browse all free online tools at weFixPDF.',
    url: 'https://wefixpdf.com/tools',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wefixpdf.com' },
        { '@type': 'ListItem', position: 2, name: 'All Tools', item: 'https://wefixpdf.com/tools' },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 pb-20 space-y-12 md:space-y-16">

        {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium -mb-4">
          <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
          <ArrowRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-600 dark:text-slate-300">All Tools</span>
        </nav>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="text-center space-y-4">
          <span className="px-4 py-1.5 bg-brand-primary/10 text-brand-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] rounded-full border border-brand-primary/20 inline-block">
            14 Free Tools · No Account Required
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.95]">
            All File Conversion Tools
          </h1>
          <p className="mx-auto max-w-lg text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Free, instant, and completely private. Your files are encrypted during transfer
            and permanently deleted the moment you download them.
          </p>
        </div>

        {/* ── Quick trust chips ────────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-2 px-4 py-2 bg-slate-100/70 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-white/5 hover:border-brand-primary/30 transition-colors">
                <Icon className="w-4 h-4 text-brand-primary shrink-0" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Tool sections ─────────────────────────────────────────────────── */}
        <div className="space-y-12">
          {/* PDF Tools */}
          <section aria-labelledby="pdf-tools-heading">
            <SectionHeader id="pdf-tools-heading" title="PDF Tools" count={pdfTools.length} />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {pdfTools.map((t) => <ToolCard key={t.href} tool={t} />)}
            </div>
          </section>

          {/* Image Tools */}
          <section aria-labelledby="image-tools-heading">
            <SectionHeader id="image-tools-heading" title="Image Tools" count={imageTools.length} />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {imageTools.map((t) => <ToolCard key={t.href} tool={t} />)}
            </div>
          </section>
        </div>

        {/* ── Stats bar ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass dark:glass-dark rounded-2xl p-5 sm:p-6 text-center border border-white/5 flex flex-col items-center justify-center"
            >
              <p className="text-2xl sm:text-3xl font-black text-brand-primary">{s.value}</p>
              <p className="mt-1.5 text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Why trust us ─────────────────────────────────────────────────── */}
        <div className="glass dark:glass-dark rounded-2xl md:rounded-3xl p-6 md:p-10 border border-slate-200/50 dark:border-white/5 text-center space-y-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Why people trust weFixPDF
          </p>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Every file is processed securely, never stored, and immediately deleted after download. No account, no watermarks, no limits.
          </p>
          <Link
            href="/security"
            className="inline-flex items-center gap-2 text-sm font-black text-brand-primary hover:underline transition-all"
          >
            Read our Security & Privacy page <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </>
  )
}
