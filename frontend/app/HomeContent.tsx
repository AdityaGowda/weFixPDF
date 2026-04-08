import {
  FileDown, FileImage, Layers, Scissors, RotateCw, ShieldCheck, LockOpen,
  Image, Minimize2, Zap, Smartphone, CheckCircle2, ChevronDown, ArrowRight,
  FileText, Palette, Braces, KeyRound, ArrowLeftRight, GitCompare, FileCode, Code,
} from "lucide-react";
import HeroDropzone from "./components/HeroDropzone";
import { type ToolListing } from "@/app/lib/seo/seoApi";

/* ─── Icon map (slug → lucide icon) ────────────────────────── */

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number; color?: string }>> = {
  "compress-pdf": FileDown,
  "pdf-to-jpg": FileImage,
  "merge-pdf": Layers,
  "split-pdf": Scissors,
  "rotate-pdf": RotateCw,
  "protect-pdf": ShieldCheck,
  "unlock-pdf": LockOpen,
  "pdf-to-word": FileText,
  "jpg-to-png": FileImage,
  "png-to-jpg": Image,
  "image-compressor": Minimize2,
  "png-to-webp": Zap,
  "heic-to-jpg": Smartphone,
  // Dev tools
  "csv-json-converter":      ArrowLeftRight,
  "color-palette-generator": Palette,
  "text-diff-checker":       GitCompare,
  "json-to-yaml":            FileCode,
  "yaml-to-json":            FileCode,
  "json-to-xml":             Code,
  "xml-to-json":             Code,
  "json-formatter":          Braces,
  "jwt-decoder":             KeyRound,
};

/* ─── Fallback data (used when DB returns nothing) ──────────── */

const FALLBACK_PDF_TOOLS = [
  { name: "Compress PDF", href: "/compress-pdf", icon: FileDown, desc: "Reduce file size by up to 90%, losslessly." },
  { name: "PDF to JPG", href: "/pdf-to-jpg", icon: FileImage, desc: "Convert every page to a high-quality image." },
  { name: "Merge PDF", href: "/merge-pdf", icon: Layers, desc: "Combine multiple PDFs into one document." },
  { name: "Split PDF", href: "/split-pdf", icon: Scissors, desc: "Extract pages or split by page range." },
  { name: "Rotate PDF", href: "/rotate-pdf", icon: RotateCw, desc: "Rotate pages 90°, 180°, or 270° permanently." },
  { name: "Protect PDF", href: "/protect-pdf", icon: ShieldCheck, desc: "Password-protect sensitive documents." },
  { name: "Unlock PDF", href: "/unlock-pdf", icon: LockOpen, desc: "Remove passwords from PDF files." },
  { name: "PDF to Word", href: "/pdf-to-word", icon: FileText, desc: "Convert PDF to an editable .docx file." },
];

const FALLBACK_IMAGE_TOOLS = [
  { name: "JPG to PNG", href: "/jpg-to-png", icon: FileImage, desc: "Lossless conversion, no watermarks." },
  { name: "PNG to JPG", href: "/png-to-jpg", icon: Image, desc: "Smaller files for faster web pages." },
  { name: "Image Compressor", href: "/image-compressor", icon: Minimize2, desc: "Shrink JPG, PNG, WEBP by up to 80%." },
  { name: "PNG to WEBP", href: "/png-to-webp", icon: Zap, desc: "Modern format, 30% smaller files." },
  { name: "HEIC to JPG", href: "/heic-to-jpg", icon: Smartphone, desc: "Convert iPhone photos anywhere." },
];

const FALLBACK_DEV_TOOLS = [
  { name: "CSV ↔ JSON Converter",    href: "/csv-json-converter",      icon: ArrowLeftRight, desc: "Convert CSV to JSON or JSON to CSV with live preview." },
  { name: "JSON Formatter",          href: "/json-formatter",           icon: Braces,         desc: "Pretty-print, minify, and validate any JSON." },
  { name: "JWT Decoder",             href: "/jwt-decoder",              icon: KeyRound,       desc: "Decode JWT header & payload — stays in your browser." },
  { name: "Text Diff Checker",       href: "/text-diff-checker",        icon: GitCompare,     desc: "Compare two texts and highlight every change." },
  { name: "JSON to YAML",            href: "/json-to-yaml",             icon: FileCode,       desc: "Convert JSON to clean, indented YAML instantly." },
  { name: "Color Palette Generator", href: "/color-palette-generator",  icon: Palette,        desc: "Generate palettes and export as CSS, Tailwind, or JSON." },
];

const faqs = [
  {
    q: "Is weFixPDF really 100% free?",
    a: "Yes. Every tool is completely free — no hidden fees, no subscription, no sign-up required. All features are available to everyone at no cost."
  },
  {
    q: "Are my files safe and private?",
    a: "All uploads use TLS 1.3 encryption. Files are permanently deleted immediately after conversion — we never store, read, or share your files."
  },
  {
    q: "Do I need to create an account?",
    a: "No. Open a tool, upload your file, download your result. No email, no registration, no software to install."
  },
  {
    q: "What file formats are supported?",
    a: "We support PDF, JPG, PNG, WEBP, HEIC, and DOCX. Compress, convert, merge, split, protect, and unlock these formats."
  },
  {
    q: "How fast is the conversion?",
    a: "Most conversions complete in under 3 seconds. Processing runs on cloud servers — your device isn't burdened."
  },
  {
    q: "Is there a file size limit?",
    a: "Files up to 100 MB. For larger PDFs, try splitting first, then processing individual sections."
  },
  {
    q: "How does weFixPDF compare to Smallpdf or Adobe?",
    a: "We're 100% free with no daily limits. Adobe requires a paid subscription. Smallpdf caps free users at 2 tasks/day and keeps files for 1–2 hours. We delete files the moment your download begins."
  },
  {
    q: "Can I compress a PDF without losing quality?",
    a: "Yes. Our compression removes redundant data and optimises embedded images while preserving text sharpness and visual fidelity."
  },
];

/* ─── Sub-components ────────────────────────────────────────── */

function FreeBadge() {
  return (
    <span
      className="inline-block text-[11px] font-medium px-2 py-0.5 rounded"
      style={{ background: '#EAF3DE', color: '#3B6D11' }}
    >
      Free
    </span>
  );
}

function ToolCard({ name, href, icon: Icon, desc, variant = 'blue' }: {
  name: string; href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number; color?: string }>;
  desc: string;
  variant?: 'blue' | 'emerald' | 'violet';
}) {
  const iconBg    = variant === 'emerald' ? '#ECFDF5' : variant === 'violet' ? '#F3EFFE' : 'var(--blue-light)';
  const iconColor = variant === 'emerald' ? '#059669' : variant === 'violet' ? '#7C3AED' : 'var(--blue)';
  return (
    <a href={href} className="tool-card group" aria-label={name}>
      <div className="flex items-start justify-between gap-2">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: iconBg }}
        >
          <Icon className="w-[18px] h-[18px]" color={iconColor} strokeWidth={1.75} />
        </div>
        <FreeBadge />
      </div>
      <div>
        <p className="text-[14px] font-medium leading-snug" style={{ color: 'var(--text)' }}>{name}</p>
        <p className="text-[12px] mt-0.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{desc}</p>
      </div>
    </a>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] last:border-0">
      <summary className="flex items-center justify-between py-5 cursor-pointer list-none gap-4">
        <span className="text-[15px] font-medium leading-snug" style={{ color: 'var(--text)' }}>{q}</span>
        <ChevronDown
          className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
          style={{ color: 'var(--text-muted)' }}
        />
      </summary>
      <div
        className="pb-5 text-[15px] leading-relaxed"
        style={{ color: 'var(--text-muted)' }}
      >
        {a}
      </div>
    </details>
  );
}

function SectionLabel({ children, color = 'blue' }: { children: React.ReactNode; color?: 'blue' | 'emerald' | 'purple' }) {
  const dotColor = color === 'emerald' ? '#10B981' : color === 'purple' ? '#8B5CF6' : 'var(--blue)';
  return (
    <p className="text-label mb-4 flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: dotColor }} />
      {children}
    </p>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function HomeContent({ tools = [] }: { tools?: ToolListing[] }) {
  const dbPdfTools = tools
    .filter((t) => t.type === "PDF Tools")
    .sort((a, b) => a.position - b.position)
    .map((t) => ({ name: t.name, href: `/${t.slug}`, icon: ICON_MAP[t.slug] ?? FileText, desc: t.description }));

  const dbImageTools = tools
    .filter((t) => t.type === "Image Tools")
    .sort((a, b) => a.position - b.position)
    .map((t) => ({ name: t.name, href: `/${t.slug}`, icon: ICON_MAP[t.slug] ?? FileImage, desc: t.description }));

  const dbDevTools = tools
    .filter((t) => t.type === "Dev Tools")
    .sort((a, b) => a.position - b.position)
    .map((t) => ({ name: t.name, href: `/${t.slug}`, icon: ICON_MAP[t.slug] ?? Code, desc: t.description }));

  const pdfTools   = dbPdfTools.length   > 0 ? dbPdfTools   : FALLBACK_PDF_TOOLS;
  const imageTools = dbImageTools.length > 0 ? dbImageTools : FALLBACK_IMAGE_TOOLS;
  const devTools   = dbDevTools.length   > 0 ? dbDevTools   : FALLBACK_DEV_TOOLS;

  return (
    <div>

      {/* ══ 1. HERO ═══════════════════════════════════════════ */}
      <section
        className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 60% 0%, rgba(45,91,227,0.07) 0%, transparent 70%), var(--bg-page)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — copy */}
            <div className="space-y-6 max-w-lg">
              {/* Eyebrow badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium rounded-[20px]"
                style={{ background: 'var(--blue-light)', color: 'var(--blue-chip-text)' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: 'var(--blue)' }}
                />
                Zero data retention — files deleted instantly
              </div>

              {/* Headline */}
              <h1 className="text-hero" style={{ color: 'var(--text)' }}>
                Free Online{' '}
                <span style={{ color: 'var(--blue)' }}>PDF &amp; Image Tools</span>
                {' '}— Compress, Convert, Merge &amp; More
              </h1>

              {/* Sub-headline */}
              <p className="text-[16px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
                Compress PDF, convert PDF to JPG or Word, merge &amp; split PDFs — plus compress images, convert JPG to PNG, HEIC to JPG, PNG to WebP. All free, no sign-up, files deleted instantly.
              </p>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  '100% Free',
                  'No sign-up',
                  'HTTPS Encrypted',
                  'Files deleted instantly',
                  'No watermarks',
                ].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — upload dropzone (the real CTA) */}
            <div>
              <HeroDropzone />
              <p className="mt-3 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
                Or scroll down to pick a specific tool
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. PDF TOOL GRID ══════════════════════════════════ */}
      <section id="pdf-tools" className="py-16 md:py-20" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionLabel>PDF Tools</SectionLabel>
          <h2 className="text-section mb-8" style={{ color: 'var(--text)' }}>
            Everything you need for <span style={{ color: 'var(--blue)' }}>PDFs</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pdfTools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. IMAGE TOOL GRID ════════════════════════════════ */}
      <section id="image-tools" className="py-16 md:py-20 bg-page border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionLabel color="emerald">Image Tools</SectionLabel>
          <h2 className="text-section mb-8" style={{ color: 'var(--text)' }}>
            Convert &amp; compress <span style={{ color: '#10B981' }}>images</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {imageTools.map((tool) => (
              <ToolCard key={tool.href} {...tool} variant="emerald" />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. DEV TOOLS GRID ════════════════════════════════ */}
      <section id="dev-tools" className="py-16 md:py-20 border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionLabel color="purple">Developer Tools</SectionLabel>
          <h2 className="text-section mb-2" style={{ color: 'var(--text)' }}>
            Browser-based <span style={{ color: '#7C3AED' }}>dev utilities</span>
          </h2>
          <p className="text-[15px] mb-8 max-w-lg" style={{ color: 'var(--text-muted)' }}>
            JSON, YAML, CSV, XML, JWT — all processed locally in your browser. Nothing sent to a server.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {devTools.map((tool) => (
              <ToolCard key={tool.href} {...tool} variant="violet" />
            ))}
          </div>
          <div className="mt-6">
            <a href="/tools#dev-tools" className="inline-flex items-center gap-1.5 text-[13px] font-medium" style={{ color: '#7C3AED' }}>
              See all developer tools <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ══ 5. HOW IT WORKS ═══════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-page border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="text-section mb-12" style={{ color: 'var(--text)' }}>Three steps. That&apos;s it.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                n: '1',
                title: 'Upload your file',
                body: 'Select a PDF or image from your device. Files up to 100 MB supported.',
                color: '#2D5BE3',
                bg: '#E6F1FB',
              },
              {
                n: '2',
                title: 'We process it',
                body: 'Our servers convert your file instantly. No queue, no waiting.',
                color: '#10B981',
                bg: '#ECFDF5',
              },
              {
                n: '3',
                title: 'Download instantly',
                body: 'Your file downloads immediately. Original deleted from servers.',
                color: '#8B5CF6',
                bg: '#F5F3FF',
              },
            ].map((step) => (
              <div
                key={step.n}
                className="rounded-xl p-6 space-y-4 bg-card border border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[18px] font-bold"
                  style={{ background: step.bg, color: step.color }}
                >
                  {step.n}
                </div>
                <h3 className="text-[16px] font-semibold" style={{ color: 'var(--text)' }}>{step.title}</h3>
                <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. TRUST & SECURITY ═══════════════════════════════ */}
      <section className="py-16 md:py-24 bg-page border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">

            {/* Left */}
            <div className="space-y-5">
              <SectionLabel>Privacy &amp; Security</SectionLabel>
              <h2 className="text-section" style={{ color: 'var(--text)' }}>
                Built for privacy.<br />Designed for speed.
              </h2>
              <p className="text-[16px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
                When you upload a contract, invoice, or personal photo, you&apos;re
                trusting that service with sensitive information. weFixPDF was built
                around a single rule: process the file and delete it immediately.
                Nothing stored, nothing shared, nothing logged.
              </p>
              <a
                href="/security"
                className="inline-flex items-center gap-1.5 text-[14px] font-medium"
                style={{ color: 'var(--blue)' }}
              >
                How we protect your files
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right — feature blocks */}
            <div className="space-y-4">
              {[
                {
                  title: 'Files Deleted Immediately',
                  body: 'Your files are permanently removed the moment your download is ready. Nothing is stored, logged, or retained — not for a minute, not ever.',
                  accent: '#10B981',
                },
                {
                  title: 'End-to-End Encryption',
                  body: 'All uploads and downloads use HTTPS/TLS 1.3. Files are never transmitted in plain text between your browser and our servers.',
                  accent: '#2D5BE3',
                },
                {
                  title: 'No Account Required',
                  body: 'Open a tool, upload your file, get your result. No email, no password, no tracking — just the tool doing its job.',
                  accent: '#8B5CF6',
                },
              ].map((f) => (
                <div key={f.title} className="feature-block" style={{ borderLeftColor: f.accent, background: `${f.accent}08` }}>
                  <h3 className="text-[15px] font-medium mb-1.5" style={{ color: f.accent }}>{f.title}</h3>
                  <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. STATS BAR ══════════════════════════════════════ */}
      <section className="py-12 border-t border-[rgba(0,0,0,0.06)]" style={{ background: 'var(--surface)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { stat: '100%', label: 'Free', sub: 'No hidden fees, ever', accent: '#2D5BE3' },
              { stat: '<3 sec', label: 'Speed', sub: 'Average processing time', accent: '#10B981' },
              { stat: '0 bytes', label: 'Retained', sub: 'Data stored after use', accent: '#8B5CF6' },
              { stat: '12+', label: 'Tools', sub: 'Free tools available', accent: '#F59E0B' },
            ].map(({ stat, label, sub, accent }) => (
              <div
                key={label}
                className="rounded-lg p-5 text-center border-base bg-card overflow-hidden relative"
                style={{ borderTop: `2.5px solid ${accent}` }}
              >
                <p className="text-[22px] font-medium tabular-nums" style={{ color: accent }}>{stat}</p>
                <p className="text-[12px] font-medium mt-0.5" style={{ color: 'var(--text)' }}>{label}</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. FAQ ════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-page border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="text-section mb-10" style={{ color: 'var(--text)' }}>Common questions</h2>
          <div>
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. FINAL CTA ══════════════════════════════════════ */}
      <section
        className="py-16 md:py-24 border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]"
        style={{ background: 'linear-gradient(135deg, rgba(45,91,227,0.06) 0%, rgba(139,92,246,0.05) 100%), var(--bg-page)' }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-section" style={{ color: 'var(--text)' }}>
            Your files are your business — <span style={{ color: 'var(--blue)' }}>not ours.</span>
          </h2>
          <p className="text-[16px] leading-[1.7] max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Every tool on weFixPDF is free, private, and instant. No account,
            no watermarks, no limits. Your files are processed and deleted — full
            stop. We exist to do the job and get out of the way.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a href="/compress-pdf" className="btn-primary">
              Compress PDF Free
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/image-compressor" className="btn-ghost">
              Convert an Image
            </a>
          </div>
        </div>
      </section>

      {/* ══ 9. SEO CONTENT (hidden from primary view) ════════ */}
      <section className="py-12 bg-page border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'PDF Tools',
                items: ['Compress PDF', 'PDF to JPG', 'Merge PDF', 'Split PDF', 'Rotate PDF', 'Protect PDF', 'Unlock PDF', 'PDF to Word'],
              },
              {
                title: 'Image Converters',
                items: ['JPG to PNG', 'PNG to JPG', 'PNG to WEBP', 'Image Compressor', 'HEIC to JPG'],
              },
              {
                title: 'Why weFixPDF',
                items: ['100% Free', 'No Sign-up', 'No Watermarks', 'Zero Data Retention', 'TLS Encryption', 'No Usage Limits'],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-[13px] font-medium mb-3" style={{ color: 'var(--text)' }}>{col.title}</h4>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" color="#3B6D11" strokeWidth={2} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
