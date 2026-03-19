import type { Metadata } from 'next'
import Link from 'next/link'
import { getToolListings } from '@/app/lib/seo/seoApi'
import { FileDown, Image, FileText, Layers, Scissors, RotateCw, ShieldCheck, LockOpen, Minimize2, Zap, Smartphone, ArrowRight, Shield, Lock, FileImage } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const tools = await getToolListings()
  const count = tools.filter((t) => t.type === 'PDF Tools' || t.type === 'Image Tools').length || 14
  return {
    title: 'All Free PDF & Image Tools — weFixPDF',
    description: `Browse all ${count} free online tools at weFixPDF. Compress PDF, convert images, merge, split, protect and unlock PDFs — no sign-up, no watermarks, instant file deletion.`,
    alternates: { canonical: 'https://wefixpdf.com/tools' },
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

// ─── Trust bar ──────────────────────────────────────────────────────────────
const trustItems = [
  { icon: Lock, label: 'TLS 1.3 Encrypted' },
  { icon: Shield, label: 'Files deleted instantly' },
  { icon: ShieldCheck, label: 'No sign-up ever' },
  { icon: Zap, label: 'Zero human access' },
  { icon: Layers, label: 'No daily limits' },
]

// ─── Stats ───────────────────────────────────────────────────────────────────
const stats = [
  { value: '1K+',   label: 'Daily conversions' },
  { value: '14',    label: 'Free tools' },
  { value: '0 sec', label: 'File retention' },
  { value: '100%',  label: 'Free forever' },
]

// ─── ToolCard ────────────────────────────────────────────────────────────────
function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <Link
      href={tool.href}
      className="group relative glass dark:glass-dark rounded-3xl p-6 border border-slate-200/50 dark:border-white/5 hover:border-brand-primary/40 hover:shadow-xl hover:shadow-brand-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 overflow-hidden"
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
      
      {/* Top row: icon + badge */}
      <div className="relative flex items-start justify-between">
        <div className="w-11 h-11 rounded-2xl bg-brand-primary/10 group-hover:bg-brand-primary/20 flex items-center justify-center transition-colors duration-300">
          <Icon className="w-5 h-5 text-brand-primary" strokeWidth={1.75} />
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

      <div className="relative flex flex-col gap-1.5 flex-1 pt-2">
        <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors leading-snug">
          {tool.label}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          {tool.desc}
        </p>
      </div>

      <div className="relative flex items-center gap-1.5 text-brand-primary font-black text-[10px] uppercase tracking-widest translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        {tool.cta}
        <ArrowRight className="w-3 h-3" />
      </div>
    </Link>
  )
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ id, title, count }: { id: string; title: string; count: number }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <h2 id={id} className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
        {title}
      </h2>
      <div className="h-px flex-1 bg-slate-200/50 dark:bg-slate-800/50" />
      <span className="px-3 py-1 font-bold rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5">
        {count} tools
      </span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
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
      <main className="max-w-6xl mx-auto space-y-20 md:space-y-32 pb-20 px-4 sm:px-6 py-12">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="pt-10 text-center space-y-6">
        <span className="px-4 py-1.5 bg-brand-primary/10 text-brand-primary dark:text-brand-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] rounded-full border border-brand-primary/20 shadow-sm inline-block">
          14 Free Tools • No Account Required
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.95]">
          All File Conversion Tools
        </h1>
        <p className="mx-auto max-w-xl text-sm md:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          Free, instant, and completely private. Your files are encrypted during transfer
          and permanently deleted the moment you download them.
        </p>
      </div>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="glass dark:glass-dark rounded-[2rem] p-6 sm:p-8 text-center border border-white/5 flex flex-col items-center justify-center hover:-translate-y-1 transition-transform duration-300"
          >
            <p className="text-3xl sm:text-4xl font-black text-brand-primary">{s.value}</p>
            <p className="mt-2 text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-20">
        {/* ── PDF Tools ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="pdf-tools-heading">
          <SectionHeader id="pdf-tools-heading" title="PDF Tools" count={pdfTools.length} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pdfTools.map((t) => <ToolCard key={t.href} tool={t} />)}
          </div>
        </section>

        {/* ── Image Tools ───────────────────────────────────────────────────── */}
        <section aria-labelledby="image-tools-heading">
          <SectionHeader id="image-tools-heading" title="Image Tools" count={imageTools.length} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {imageTools.map((t) => <ToolCard key={t.href} tool={t} />)}
          </div>
        </section>
      </div>

      {/* ── Trust strip ───────────────────────────────────────────────────── */}
      <div className="glass dark:glass-dark rounded-3xl md:rounded-[3rem] p-8 md:p-16 border border-slate-200/50 dark:border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 text-center space-y-8 md:space-y-12">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Why people trust weFixPDF
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2.5 px-5 py-3 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-brand-primary/30 transition-colors">
                  <Icon className="w-5 h-5 text-brand-primary" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Read more on our{' '}
            <Link href="/security" className="text-brand-primary font-black hover:underline transition-all">
              Security & Privacy
            </Link>{' '}
            page.
          </p>
        </div>
      </div>

    </main>
    </>
  )
}