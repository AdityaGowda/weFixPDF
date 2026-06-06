import type { Metadata } from 'next';
import Link from 'next/link';
import { getToolListings } from '@/app/lib/seo/seoApi';
import {
  FileDown, FileImage, FileText, Layers, Scissors, RotateCw,
  ShieldCheck, LockOpen, BookOpen, Camera, Code, Type, ShieldX,
  Expand, Shield, Columns2, ArrowRight, Image, CheckCircle2, ChevronRight,
} from 'lucide-react';
import ToolRating from '@/app/components/ToolRating';

export const metadata: Metadata = {
  title: 'Free PDF Tools Online — Compress, Convert, Merge, Split & More | weFixPDF',
  description:
    'All free PDF tools in one place: compress PDF without losing quality, convert PDF to JPG or Word, merge multiple PDFs, split by page, rotate, password-protect & unlock. No sign-up, no watermarks, files deleted instantly.',
  alternates: { canonical: 'https://wefixpdf.com/tools/pdf' },
  keywords: [
    'free pdf tools online',
    'pdf converter online free',
    'compress pdf online free',
    'merge pdf online free',
    'split pdf online free',
    'pdf to jpg converter free',
    'pdf to word converter free',
    'rotate pdf online',
    'protect pdf online',
    'unlock pdf online',
    'best free pdf tools',
    'pdf tools no sign up',
    'pdf tools no watermark',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Free PDF Tools Online — Compress, Convert, Merge & More | weFixPDF',
    description:
      'Compress, convert, merge, split, rotate, protect & unlock PDFs — all free, no watermarks, files deleted instantly.',
    url: 'https://wefixpdf.com/tools/pdf',
    siteName: 'weFixPDF',
    type: 'website',
    images: [{ url: 'https://wefixpdf.com/wfp.png', width: 1200, height: 630, alt: 'weFixPDF — Free PDF Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF Tools Online | weFixPDF',
    description: 'Compress, convert, merge, split, protect & unlock — all free, no sign-up.',
    images: ['https://wefixpdf.com/wfp.png'],
    site: '@wefixpdf',
  },
};

const iconMap: Record<string, any> = {
  FileDown, FileImage, FileText, Layers, Scissors, RotateCw,
  ShieldCheck, LockOpen, BookOpen, Camera, Code, Type, ShieldX,
  Expand, Shield, Columns2, Image,
};

const popularSlugs = new Set(['compress-pdf', 'pdf-to-jpg', 'merge-pdf', 'pdf-to-word']);

const faqs = [
  {
    q: 'Does compressing a PDF actually work, or does it just make it blurry?',
    a: 'Depends on the PDF. If it has embedded high-res images — scanned documents, presentations, brochures — compression makes a real difference. A 15 MB scanned form typically comes out under 2 MB and looks identical on screen. For a text-only PDF generated from Word or Google Docs, expect maybe 20–30% reduction. Either way, text stays sharp because PDF text is vector, not a rasterized image.',
  },
  {
    q: 'I converted a PDF to Word and the layout is completely wrong. Why?',
    a: 'PDFs don\'t actually store "paragraphs" or "headings" — they store characters at specific X/Y coordinates on a page. Converting that back into structured Word formatting is genuinely hard. PDFs originally made in Word usually convert cleanly. Scanned PDFs are just photos of pages — there\'s no real text to extract without OCR, which is a different process entirely. If your output looks scrambled, that\'s likely what you\'re dealing with.',
  },
  {
    q: 'I only need pages 5–12 from a 90-page report. Do I have to download everything?',
    a: 'No. Open Split PDF, enter your page range, and download just those pages as a new file. Takes about five seconds. You can also extract a single page by entering the same number twice.',
  },
  {
    q: 'Is there a watermark on the compressed or converted output?',
    a: 'No watermark, ever. Some "free" tools add one to push you toward a paid upgrade — we don\'t do that. What comes out is a clean file, identical to what paid desktop software would produce.',
  },
  {
    q: 'What\'s the largest PDF these tools handle?',
    a: '100 MB. That covers virtually everything — multi-chapter reports, portfolios, scanned application packets. Architectural drawings and print-ready files sometimes go over. If yours does, split it into sections first, process each one, then merge them back.',
  },
  {
    q: 'If I password-protect a PDF here, how strong is that protection?',
    a: 'Standard 128-bit AES encryption — the same level most PDF readers use. It\'s a reasonable barrier for everyday use: sharing contracts, protecting personal documents before emailing. It\'s not a substitute for proper encryption if you\'re handling highly classified material, but for normal professional use it\'s fine.',
  },
  {
    q: 'Does rotating a PDF here permanently fix the orientation?',
    a: 'Yes. The rotation is written into the file structure, so whoever opens it — on any device, in any PDF reader — sees the correct orientation. This is different from rotating the view inside a reader like Adobe or Preview, which only affects your local display and doesn\'t change the file.',
  },
];

function ToolCard({ href, label, desc, icon: Icon, popular }: {
  href: string; label: string; desc: string; icon: any; popular?: boolean;
}) {
  return (
    <Link href={href} className="tool-card group" aria-label={label}>
      <div className="flex items-start justify-between gap-2">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#EBF0FA' }}>
          <Icon className="w-[18px] h-[18px]" color="#4f6edb" strokeWidth={1.75} />
        </div>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded" style={popular ? { background: '#EBF0FA', color: '#163863' } : { background: '#EAF3DE', color: '#3B6D11' }}>
          {popular ? 'Popular' : 'Free'}
        </span>
      </div>
      <div>
        <h3 className="text-[14px] font-medium leading-snug" style={{ color: 'var(--text)' }}>{label}</h3>
        <p className="text-[12px] mt-0.5 leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>{desc}</p>
      </div>
    </Link>
  );
}

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  return (
    <details className="group border-b border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] last:border-0" key={i}>
      <summary className="flex items-center justify-between py-4 cursor-pointer list-none gap-4">
        <span className="text-[14px] font-medium leading-snug" style={{ color: 'var(--text)' }}>{q}</span>
        <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-open:rotate-90" style={{ color: 'var(--text-muted)' }} />
      </summary>
      <p className="pb-4 text-[14px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>{a}</p>
    </details>
  );
}

export default async function PdfHubPage() {
  const allTools = await getToolListings();
  const tools = allTools
    .filter((t) => t.type === 'PDF Tools')
    .sort((a, b) => a.position - b.position)
    .map((t) => ({
      href: `/tools/${t.slug}`,
      label: t.name,
      desc: t.description,
      icon: iconMap[t.icon_name ?? ''] ?? FileDown,
      popular: popularSlugs.has(t.slug),
    }));

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free PDF Tools Online — weFixPDF',
    url: 'https://wefixpdf.com/tools/pdf',
    description: 'Complete list of free online PDF tools by weFixPDF — compress, convert, merge, split, rotate, protect and unlock PDFs.',
    numberOfItems: tools.length,
    itemListElement: tools.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.label,
      url: `https://wefixpdf.com${t.href}`,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wefixpdf.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://wefixpdf.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'PDF Tools', item: 'https://wefixpdf.com/tools/pdf' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-page">

        <section className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-2 text-[12px] mb-8" aria-label="Breadcrumb" style={{ color: 'var(--text-muted)' }}>
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/tools" className="hover:underline">Tools</Link>
              <span>/</span>
              <span style={{ color: 'var(--text)' }}>PDF Tools</span>
            </nav>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#4f6edb' }} />
              <p className="text-label">{tools.length} free tools · No account · Files deleted instantly</p>
            </div>
            <h1 className="text-hero mb-4" style={{ color: 'var(--text)' }}>
              Free PDF Tools Online
            </h1>
            <p className="text-[17px] leading-[1.75] max-w-2xl" style={{ color: 'var(--text-muted)' }}>
              Most people hit a PDF problem a few times a week — a file too large to email, a contract with the
              wrong page orientation, a 90-page report where you only need six pages. These tools handle all of it.
              Nothing to install, no account, and the file is deleted from our servers the second you hit download.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {['100% Free', 'No sign-up', 'Files deleted instantly', 'No watermarks', 'TLS 1.3 encrypted'].map((chip) => (
                <span key={chip} className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-3 h-3 flex-shrink-0" strokeWidth={2} />
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-16">

          <section>
            <h2 className="text-[20px] font-bold mb-6" style={{ color: 'var(--text)' }}>
              All {tools.length} PDF Tools — Free &amp; Instant
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {tools.map((t) => <ToolCard key={t.href} {...t} />)}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-[22px] font-bold" style={{ color: 'var(--text)' }}>
              The PDF problems people actually run into
            </h2>
            <p className="text-[15px] leading-[1.75]" style={{ color: 'var(--text-muted)' }}>
              PDF is everywhere — job applications, tax filings, university admissions, contracts, bank statements.
              The format was designed for print fidelity, not ease of editing, which is why people constantly need
              to resize, rearrange, or convert them. Adobe charges a monthly fee for what should be a five-second task.
              Every tool here is free, runs in your browser, and doesn't require an account.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Compress PDF',
                  body: 'Government portals in India — UPSC, income tax, Aadhaar, university admissions — cap uploads at 1–2 MB. A scanned application is usually 8–15 MB. The compressor brings it down without making text illegible.',
                  href: '/tools/compress-pdf',
                  accent: '#4f6edb',
                },
                {
                  title: 'PDF to Word',
                  body: 'Works well on text-based PDFs. If your PDF was originally a Word doc, conversion is clean — paragraphs, headings, tables all come through. Scanned PDFs are a different story (they\'re images, not text).',
                  href: '/tools/pdf-to-word',
                  accent: '#4f6edb',
                },
                {
                  title: 'Merge & Split',
                  body: 'Combine a cover letter, resume, and certificates into one file before uploading to a job portal. Or pull out just the pages you need from a 100-page report. Both take under 10 seconds.',
                  href: '/tools/merge-pdf',
                  accent: '#4f6edb',
                },
                {
                  title: 'Protect & Unlock',
                  body: 'Add a password before sending a sensitive document. Remove one when a PDF you legitimately own is locked and you need to print or edit it. Standard 128-bit AES — same as most desktop software.',
                  href: '/tools/protect-pdf',
                  accent: '#4f6edb',
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block p-5 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-card hover:border-blue-400/40 transition-colors group"
                >
                  <h3 className="text-[15px] font-semibold mb-2 group-hover:text-[#4f6edb] transition-colors" style={{ color: 'var(--text)' }}>
                    {item.title} <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                  </h3>
                  <p className="text-[13px] leading-[1.65]" style={{ color: 'var(--text-muted)' }}>{item.body}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold" style={{ color: 'var(--text)' }}>
              What people use this page for
            </h2>
            <ul className="space-y-3">
              {[
                { task: 'Reduce PDF size for email', tool: 'Compress PDF', href: '/tools/compress-pdf' },
                { task: 'Compress PDF to 50 KB for UPSC / government portal', tool: 'Compress PDF', href: '/tools/compress-pdf' },
                { task: 'Convert scanned PDF to editable Word document', tool: 'PDF to Word', href: '/tools/pdf-to-word' },
                { task: 'Extract specific pages from a large PDF', tool: 'Split PDF', href: '/tools/split-pdf' },
                { task: 'Combine multiple invoices into one PDF', tool: 'Merge PDF', href: '/tools/merge-pdf' },
                { task: 'Fix upside-down or sideways pages', tool: 'Rotate PDF', href: '/tools/rotate-pdf' },
                { task: 'Password-protect a contract before sending', tool: 'Protect PDF', href: '/tools/protect-pdf' },
                { task: 'Remove metadata before sharing confidential PDF', tool: 'Remove PDF Metadata', href: '/tools/remove-pdf-metadata' },
              ].map(({ task, tool, href }) => (
                <li key={task} className="flex items-start gap-3 text-[14px]">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" color="#4f6edb" strokeWidth={2} />
                  <span style={{ color: 'var(--text-muted)' }}>
                    {task} —{' '}
                    <Link href={href} className="font-medium underline underline-offset-2 decoration-dotted hover:text-[#4f6edb] transition-colors" style={{ color: 'var(--text)' }}>
                      {tool}
                    </Link>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] p-6 bg-surface space-y-3">
            <h2 className="text-[18px] font-bold" style={{ color: 'var(--text)' }}>A note on privacy</h2>
            <p className="text-[14px] leading-[1.75]" style={{ color: 'var(--text-muted)' }}>
              A lot of what runs through these tools is stuff people would rather keep private — salary slips, employment
              contracts, Aadhaar-linked documents, medical records. We built the backend with that in mind. Files are
              deleted automatically the moment your download starts. Nobody on the team has access to uploaded files.
              There's no backup copy, no thumbnail saved, no log of file contents. TLS 1.3 handles the transit.
              That's it.
            </p>
            <Link href="/security" className="inline-flex items-center gap-1.5 text-[13px] font-medium" style={{ color: '#4f6edb' }}>
              How we protect your files <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>

          <section className="space-y-2">
            <h2 className="text-[22px] font-bold mb-6" style={{ color: 'var(--text)' }}>
              Frequently Asked Questions — PDF Tools
            </h2>
            <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-card px-6">
              {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} i={i} />)}
            </div>
          </section>

          <ToolRating toolSlug="pdf-hub" />

          <section>
            <h2 className="text-[20px] font-bold mb-4" style={{ color: 'var(--text)' }}>Explore Other Tool Categories</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link href="/tools/image" className="flex items-center justify-between p-4 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-card hover:border-emerald-400/40 transition-colors group">
                <div>
                  <p className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>Image Tools</p>
                  <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>Compress &amp; convert JPG, PNG, WEBP, HEIC</p>
                </div>
                <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" style={{ color: '#10B981' }} />
              </Link>
              <Link href="/tools/developer" className="flex items-center justify-between p-4 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-card hover:border-violet-400/40 transition-colors group">
                <div>
                  <p className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>Developer Tools</p>
                  <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>JSON, YAML, JWT, CSV — runs in your browser</p>
                </div>
                <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" style={{ color: '#8B5CF6' }} />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
