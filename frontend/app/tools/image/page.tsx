import type { Metadata } from 'next';
import Link from 'next/link';
import { getToolListings } from '@/app/lib/seo/seoApi';
import {
  FileImage, Image, Minimize2, Zap, Smartphone, Expand,
  ArrowRight, CheckCircle2, ChevronRight,
} from 'lucide-react';
import ToolRating from '@/app/components/ToolRating';

export const metadata: Metadata = {
  title: 'Free Image Converter & Compressor Tools Online | weFixPDF',
  description:
    'Convert and compress images free online: JPG to PNG, PNG to JPG, PNG to WEBP, HEIC to JPG, compress images, resize images. No sign-up, no watermarks, files deleted instantly.',
  alternates: { canonical: 'https://wefixpdf.com/tools/image' },
  keywords: [
    'free image converter online',
    'image compressor online free',
    'compress image without losing quality',
    'jpg to png converter free',
    'png to jpg converter online',
    'heic to jpg converter free',
    'png to webp converter',
    'compress image to 100kb online',
    'reduce image file size free',
    'image format converter online',
    'convert image online no sign up',
    'resize image online free',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Free Image Converter & Compressor Tools Online | weFixPDF',
    description: 'Compress & convert JPG, PNG, WEBP, HEIC — all free, no watermarks, files deleted instantly.',
    url: 'https://wefixpdf.com/tools/image',
    siteName: 'weFixPDF',
    type: 'website',
    images: [{ url: 'https://wefixpdf.com/wfp.png', width: 1200, height: 630, alt: 'weFixPDF — Free Image Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Tools Online | weFixPDF',
    description: 'Compress & convert JPG, PNG, WEBP, HEIC — free, no sign-up.',
    images: ['https://wefixpdf.com/wfp.png'],
    site: '@wefixpdf',
  },
};

const iconMap: Record<string, any> = {
  FileImage, Image, Minimize2, Zap, Smartphone, Expand,
};

const popularSlugs = new Set(['image-compressor', 'jpg-to-png', 'heic-to-jpg']);

const faqs = [
  {
    q: 'I compressed my photo and it looks exactly the same but is 80% smaller. How?',
    a: 'JPEG compression works by averaging groups of pixels that look similar. At 80% quality — the default — those differences are genuinely invisible unless you zoom in to 400% and compare two versions side by side. You\'re storing less data because your eyes weren\'t using it anyway. For photos, this trade-off is almost always worth it.',
  },
  {
    q: 'Why does my iPhone save photos as HEIC instead of JPG?',
    a: 'Apple switched to HEIC with iOS 11 because it produces photos at roughly half the file size of equivalent JPEG quality. Good for phone storage, but a problem everywhere else — Windows can\'t open HEIC without a codec, most websites won\'t accept it, and Android doesn\'t support it. Convert to JPG first and it works everywhere.',
  },
  {
    q: 'Will I lose quality converting PNG to JPG?',
    a: 'Technically yes — JPG is lossy. In practice, for photos, you won\'t see the difference. For screenshots with text, sharp lines, or logos, you might notice JPEG artifacts around edges at high zoom. If your image has a transparent background, converting to JPG will fill that transparency with white. If any of that matters for your use case, stay with PNG.',
  },
  {
    q: 'WEBP sounds great. Why isn\'t everyone using it already?',
    a: 'They are — slowly. All major browsers have supported it since 2020. The holdback is tooling and existing workflows. If you\'re building or updating a website in 2025, converting your images to WEBP is one of the easier ways to improve Google PageSpeed scores. The 25–35% size reduction over JPG is real and measurable.',
  },
  {
    q: 'How do I get an image under 50 KB for a government form?',
    a: 'Use Image Compressor — move the quality slider down and watch the estimate. If compression alone won\'t get you there (common with high-res phone photos), use Resize first to reduce the pixel dimensions. A government portal doesn\'t need a 4000×3000 photo. Resize to 800×600, compress to 75%, and you\'ll be well under 50 KB.',
  },
  {
    q: 'Do you store photos that get uploaded?',
    a: 'No. Files are deleted automatically once your download starts. There\'s no gallery of uploaded images, no thumbnails cached anywhere, nothing retained. The server holds the file for the few seconds the conversion takes, then it\'s gone.',
  },
];



function ToolCard({ href, label, desc, icon: Icon, popular }: {
  href: string; label: string; desc: string; icon: any; popular?: boolean;
}) {
  return (
    <Link href={href} className="tool-card group" aria-label={label}>
      <div className="flex items-start justify-between gap-2">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#ECFDF5' }}>
          <Icon className="w-[18px] h-[18px]" color="#059669" strokeWidth={1.75} />
        </div>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded" style={popular ? { background: '#DCFCE7', color: '#166534' } : { background: '#EAF3DE', color: '#3B6D11' }}>
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
    <details className="group border-b border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] last:border-0">
      <summary className="flex items-center justify-between py-4 cursor-pointer list-none gap-4">
        <span className="text-[14px] font-medium leading-snug" style={{ color: 'var(--text)' }}>{q}</span>
        <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-open:rotate-90" style={{ color: 'var(--text-muted)' }} />
      </summary>
      <p className="pb-4 text-[14px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>{a}</p>
    </details>
  );
}

export default async function ImageHubPage() {
  const allTools = await getToolListings();
  const tools = allTools
    .filter((t) => t.type === 'Image Tools')
    .sort((a, b) => a.position - b.position)
    .map((t) => ({
      href: `/tools/${t.slug}`,
      label: t.name,
      desc: t.description,
      icon: iconMap[t.icon_name ?? ''] ?? Image,
      popular: popularSlugs.has(t.slug),
    }));

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free Image Converter & Compressor Tools — weFixPDF',
    url: 'https://wefixpdf.com/tools/image',
    description: 'Complete list of free online image tools by weFixPDF — compress, convert, and resize images.',
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
      { '@type': 'ListItem', position: 3, name: 'Image Tools', item: 'https://wefixpdf.com/tools/image' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-page">

        {/* ── Hero ── */}
        <section className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-2 text-[12px] mb-8" aria-label="Breadcrumb" style={{ color: 'var(--text-muted)' }}>
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/tools" className="hover:underline">Tools</Link>
              <span>/</span>
              <span style={{ color: 'var(--text)' }}>Image Tools</span>
            </nav>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#10B981' }} />
              <p className="text-label">{tools.length} free tools · No account · Files deleted instantly</p>
            </div>
            <h1 className="text-hero mb-4" style={{ color: 'var(--text)' }}>
              Free Image Converter &amp; Compressor Online
            </h1>
            <p className="text-[17px] leading-[1.75] max-w-2xl" style={{ color: 'var(--text-muted)' }}>
              iPhone photos that won't open on Windows. Portfolio images that are slowing down your site.
              A product photo at 4 MB that a form won't accept. These tools cover the actual image problems
              people deal with — compress, convert, resize — with no account and no watermark on the output.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {['100% Free', 'No sign-up', 'Files deleted instantly', 'No watermarks', 'Supports JPG PNG WEBP HEIC'].map((chip) => (
                <span key={chip} className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-3 h-3 flex-shrink-0" strokeWidth={2} />
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-16">

          {/* ── Tool grid ── */}
          <section>
            <h2 className="text-[20px] font-bold mb-6" style={{ color: 'var(--text)' }}>
              All {tools.length} Image Tools — Free &amp; Instant
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {tools.map((t) => <ToolCard key={t.href} {...t} />)}
            </div>
          </section>

          {/* ── Format guide ── */}
          <section className="space-y-6">
            <h2 className="text-[22px] font-bold" style={{ color: 'var(--text)' }}>
              JPG, PNG, WEBP, HEIC — which one to use
            </h2>
            <p className="text-[15px] leading-[1.75]" style={{ color: 'var(--text-muted)' }}>
              Most image problems come down to format mismatch — the wrong format for the job, or a format
              nobody else can open. Here's what each format actually does and when to switch.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  format: 'JPG / JPEG',
                  best: 'Photos, social media, email attachments',
                  avoid: 'Images with transparency or sharp text',
                  body: 'The universal format. Every device, browser, and portal can open a JPG. Compression is lossy — it throws away pixel data your eyes can\'t see — but for real photographs that trade-off is invisible at 80% quality and above.',
                  href: '/tools/png-to-jpg',
                  cta: 'PNG → JPG',
                  accent: '#2D5BE3',
                },
                {
                  format: 'PNG',
                  best: 'Logos, screenshots, transparent backgrounds',
                  avoid: 'Large photos where file size matters',
                  body: 'PNG stores every pixel exactly as-is. Larger files than JPG, but the right call when you need a transparent background, a crisp logo, or a screenshot where the text has to be readable at any zoom level.',
                  href: '/tools/jpg-to-png',
                  cta: 'JPG → PNG',
                  accent: '#10B981',
                },
                {
                  format: 'WEBP',
                  best: 'Web pages, Google PageSpeed, Next.js projects',
                  avoid: 'Sending to users on very old browsers',
                  body: 'Google\'s format. 25–35% smaller than equivalent JPG or PNG. Every major browser has supported it since 2020. If you\'re optimising a website for Core Web Vitals, converting images to WEBP is one of the cheapest wins available.',
                  href: '/tools/png-to-webp',
                  cta: 'PNG → WEBP',
                  accent: '#8B5CF6',
                },
                {
                  format: 'HEIC',
                  best: 'iPhone camera output',
                  avoid: 'Sharing with Windows or Android users',
                  body: 'Apple made this the default iPhone camera format in 2017. Excellent quality at half the JPG file size — but Windows can\'t open it without an extra codec, Android ignores it, and most upload forms reject it. Convert to JPG before sending anywhere.',
                  href: '/tools/heic-to-jpg',
                  cta: 'HEIC → JPG',
                  accent: '#F59E0B',
                },
              ].map((item) => (
                <div key={item.format} className="p-5 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-card space-y-2">
                  <p className="text-[13px] font-bold" style={{ color: item.accent }}>{item.format}</p>
                  <p className="text-[13px] leading-[1.65]" style={{ color: 'var(--text-muted)' }}>{item.body}</p>
                  <div className="flex gap-3 text-[12px]">
                    <span style={{ color: 'var(--text-muted)' }}>✓ {item.best}</span>
                  </div>
                  <Link href={item.href} className="inline-flex items-center gap-1 text-[12px] font-medium mt-1" style={{ color: item.accent }}>
                    {item.cta} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* ── Common tasks ── */}
          <section className="space-y-5">
            <h2 className="text-[22px] font-bold" style={{ color: 'var(--text)' }}>
              What people actually use these tools for
            </h2>
            <ul className="space-y-3">
              {[
                { task: 'Photo too large for WhatsApp or email — need it under 1 MB', tool: 'Image Compressor', href: '/tools/image-compressor' },
                { task: 'Government portal asks for photo under 50 KB or 100 KB', tool: 'Image Compressor', href: '/tools/image-compressor' },
                { task: 'iPhone HEIC photo not opening on Windows', tool: 'HEIC to JPG', href: '/tools/heic-to-jpg' },
                { task: 'Logo needs a transparent background (not white)', tool: 'JPG to PNG', href: '/tools/jpg-to-png' },
                { task: 'PNG is too large for an upload form', tool: 'PNG to JPG', href: '/tools/png-to-jpg' },
                { task: 'Improving Google PageSpeed by converting images to WEBP', tool: 'PNG to WEBP', href: '/tools/png-to-webp' },
                { task: 'Resize image to an exact width × height in pixels', tool: 'Resize & Crop Image', href: '/tools/resize-image' },
              ].map(({ task, tool, href }) => (
                <li key={task} className="flex items-start gap-3 text-[14px]">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" color="#10B981" strokeWidth={2} />
                  <span style={{ color: 'var(--text-muted)' }}>
                    {task} —{' '}
                    <Link href={href} className="font-medium underline underline-offset-2 decoration-dotted hover:text-[#10B981] transition-colors" style={{ color: 'var(--text)' }}>
                      {tool}
                    </Link>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Privacy ── */}
          <section className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] p-6 bg-surface space-y-3">
            <h2 className="text-[18px] font-bold" style={{ color: 'var(--text)' }}>No file storage. No tracking.</h2>
            <p className="text-[14px] leading-[1.75]" style={{ color: 'var(--text-muted)' }}>
              Phone photos often carry invisible EXIF data — GPS coordinates, device model, the exact timestamp. We process your
              file on the server, return the result, then delete it. There's no upload gallery, no account that collects your
              images over time, and no third-party image CDN involved. The file exists on the server only for as long as it
              takes to convert or compress it.
            </p>
            <Link href="/security" className="inline-flex items-center gap-1.5 text-[13px] font-medium" style={{ color: '#10B981' }}>
              How we handle files <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>



          {/* ── FAQ ── */}
          <section>
            <h2 className="text-[22px] font-bold mb-6" style={{ color: 'var(--text)' }}>
              Frequently Asked Questions — Image Tools
            </h2>
            <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-card px-6">
              {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} i={i} />)}
            </div>
          </section>

          {/* ── Rating ── */}
          <ToolRating toolSlug="image-hub" />

          {/* ── Other categories ── */}
          <section>
            <h2 className="text-[20px] font-bold mb-4" style={{ color: 'var(--text)' }}>Explore Other Tool Categories</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link href="/tools/pdf" className="flex items-center justify-between p-4 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-card hover:border-blue-400/40 transition-colors group">
                <div>
                  <p className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>PDF Tools</p>
                  <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>Compress, convert, merge, split, protect PDFs</p>
                </div>
                <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" style={{ color: '#2D5BE3' }} />
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
