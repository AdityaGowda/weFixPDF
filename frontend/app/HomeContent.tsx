import {
  Shield, Zap, Lock, ArrowRight, Star, FileImage, Image, Minimize2, FileDown,
  FileText, Layers, Scissors, Smartphone,
  RotateCw, ShieldCheck, LockOpen, Upload, Settings, Download,
  CheckCircle2, ChevronDown
} from "lucide-react";
import Link from "next/link";
import { LiveProcessingTicker } from "./components/clientDymaic";

const pdfTools = [
  { name: "Compress PDF", href: "/compress-pdf", icon: FileDown, desc: "Reduce PDF file size by up to 90% without losing quality. Perfect for email attachments and uploads.", cta: "Compress PDF Free" },
  { name: "PDF to JPG", href: "/pdf-to-jpg", icon: FileImage, desc: "Convert PDF pages to high-quality JPG images instantly — no software, no watermarks, 100% free.", cta: "Convert PDF to JPG Free" },
  { name: "PDF to Word", href: "/pdf-to-word", icon: FileText, desc: "Convert PDF to editable Word DOCX online. Preserves layout and formatting — free, no sign-up.", cta: "Convert PDF to Word Free" },
  { name: "Merge PDF", href: "/merge-pdf", icon: Layers, desc: "Combine multiple PDF files into one document in seconds — free, secure, no sign-up required.", cta: "Merge PDF Files Free" },
  { name: "Split PDF", href: "/split-pdf", icon: Scissors, desc: "Extract specific pages or split a PDF by page range — free online, no software installation needed.", cta: "Split PDF Free" },
  { name: "Rotate PDF", href: "/rotate-pdf", icon: RotateCw, desc: "Rotate PDF pages 90°, 180°, or 270° and save permanently — free tool, no account required.", cta: "Rotate PDF Pages Free" },
  { name: "Protect PDF", href: "/protect-pdf", icon: ShieldCheck, desc: "Password protect PDF files instantly. Keep sensitive documents safe and encrypted online.", cta: "Password Protect PDF Free" },
  { name: "Unlock PDF", href: "/unlock-pdf", icon: LockOpen, desc: "Remove password from PDF files quickly and easily — unlock protected PDFs online, free.", cta: "Unlock PDF Online Free" },
];

const imageTools = [
  { name: "JPG to PNG Converter", href: "/jpg-to-png", icon: FileImage, desc: "Convert JPG to PNG free with lossless quality — no watermarks, no sign-up, instant download.", cta: "Convert JPG to PNG Free" },
  { name: "PNG to JPG Converter", href: "/png-to-jpg", icon: Image, desc: "Convert PNG to JPG online and reduce file size for faster web performance — free, no software.", cta: "Convert PNG to JPG Free" },
  { name: "Image Compressor", href: "/image-compressor", icon: Minimize2, desc: "Compress JPG, PNG, and WEBP images by up to 80% without visible quality loss — 100% free.", cta: "Compress Image Free" },
  { name: "PNG to WEBP Converter", href: "/png-to-webp", icon: Zap, desc: "Convert PNG to WEBP for up to 30% smaller files. Boost page speed and Core Web Vitals instantly.", cta: "Convert PNG to WEBP Free" },
  { name: "HEIC to JPG", href: "/heic-to-jpg", icon: Smartphone, desc: "Convert iPhone HEIC photos to JPG online. Works on Windows & Mac — free, no app needed.", cta: "Convert HEIC to JPG Free" },
];

const allTools = [...pdfTools, ...imageTools];

const faqs = [
  {
    q: "Is weFixPDF really 100% free?",
    a: "Yes — every tool on weFixPDF is completely free with no hidden fees, no subscription, and no sign-up required. All features are available to everyone at no cost.",
  },
  {
    q: "Are my files safe and private?",
    a: "Absolutely. All uploads are encrypted with HTTPS/TLS. Files are processed on our servers and permanently deleted immediately after conversion — we never store, read, or share your files.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account or sign-up is needed. Just open any tool, upload your file, and download the result. No email address, no registration, no software to install.",
  },
  {
    q: "What file formats does weFixPDF support?",
    a: "We support PDF, JPG, PNG, WEBP, HEIC, and DOCX formats. You can compress PDFs, convert between image formats, merge/split PDF files, and protect or unlock PDFs.",
  },
  {
    q: "How long does file conversion take?",
    a: "Most conversions complete in under 3 seconds. Large files (over 50MB) may take slightly longer, but the process is always fast and runs entirely server-side.",
  },
  {
    q: "Is there a file size limit?",
    a: "You can upload files up to 100MB per conversion. For larger documents, try splitting the PDF first, then processing individual sections.",
  },
  {
    q: "How does weFixPDF compare to Adobe Acrobat or iLovePDF?",
    a: "weFixPDF is 100% free with no usage limits, unlike Adobe Acrobat which requires a paid subscription. Compared to iLovePDF or Smallpdf, we offer the same core tools with stricter zero-retention privacy — files are deleted immediately, not after 1–2 hours.",
  },
  {
    q: "Can I compress a PDF without losing quality?",
    a: "Yes. Our smart compression algorithm reduces PDF file size by removing redundant data and optimizing embedded images while preserving text clarity and document fidelity.",
  },
];

// Uses native <details>/<summary> so answer text is always in the DOM —
// Google reads it on every crawl, satisfying FAQPage schema requirements.
function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
      <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
        <span className="font-bold text-slate-900 dark:text-white text-sm md:text-base pr-4">{q}</span>
        <ChevronDown className="w-4 h-4 text-slate-400 group-open:text-brand-primary group-open:rotate-180 transition-transform flex-shrink-0" />
      </summary>
      <div className="px-6 pb-5 pt-4 text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed font-medium border-t border-slate-100 dark:border-white/5">
        {a}
      </div>
    </details>
  );
}

export default function HomeContent() {
  return (
    <div className="space-y-20 md:space-y-32 pb-20 px-0 sm:px-2 md:px-12">

      {/* ── Hero ── */}
      <section className="relative pt-20 pb-10 text-center space-y-12">
        <div className="space-y-8 max-w-4xl mx-auto px-0">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.95] text-reveal flex flex-col gap-2">
            Free Online
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-white to-brand-secondary animate-shine">File Converter</span>
          </h1>

          <div className="space-y-8">
            <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed px-4">
              PDF tools &amp; image converter — all in one place.<br className="hidden sm:block" />
              <span className="text-slate-900 dark:text-white font-black">100% Free. No sign-up. Zero data retention.</span>
            </p>
            <div aria-hidden="true" role="presentation" className="flex justify-center animate-in fade-in zoom-in-95 duration-1500 delay-700">
              <LiveProcessingTicker />
            </div>

            {/* Marquee CTA Strip */}
            <div className="relative overflow-hidden space-y-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 w-screen left-1/2 -translate-x-1/2">
              <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l to-transparent z-10 pointer-events-none" />

              <div className="flex gap-3 w-max animate-marquee will-change-transform">
                {[...Array(3)].map((_, d) => (
                  <div key={d} className="flex gap-3 shrink-0">
                    {allTools.map((tool, i) => (
                      <Link
                        key={tool.href + d}
                        href={tool.href}
                        title={tool.name + " — Free Online"}
                        aria-label={tool.name}
                        className={`flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all hover:scale-105 ${
                          i === 0
                            ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25"
                            : i === 3
                              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg"
                              : "glass dark:glass-dark border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-brand-primary/30"
                        }`}
                      >
                        <tool.icon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} />
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 w-max animate-marquee-reverse will-change-transform">
                {[...Array(3)].map((_, d) => (
                  <div key={d} className="flex gap-3 shrink-0">
                    {[...allTools].reverse().map((tool, i) => (
                      <Link
                        key={tool.href + d}
                        href={tool.href}
                        title={tool.name + " — Free Online"}
                        aria-label={tool.name}
                        className={`flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all hover:scale-105 ${
                          i === 0
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg"
                            : i === 2
                              ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25"
                              : "glass dark:glass-dark border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-brand-primary/30"
                        }`}
                      >
                        <tool.icon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} />
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-12">
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Convert Any File in 3 Simple Steps
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            No software. No account. Just upload and download.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Upload, step: "1", title: "Upload Your File", desc: "Select a PDF or image from your device. Files up to 100MB supported." },
            { icon: Settings, step: "2", title: "Convert or Edit", desc: "Our servers process your file instantly with high-quality results." },
            { icon: Download, step: "3", title: "Download Instantly", desc: "Get your converted file in seconds. Original file is deleted immediately." },
          ].map((item) => (
            <div key={item.step} className="glass dark:glass-dark rounded-3xl p-8 border border-slate-200/50 dark:border-white/5 space-y-4 relative">
              <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-brand-primary text-white text-sm font-black flex items-center justify-center shadow-lg shadow-brand-primary/30">
                {item.step}
              </div>
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center mt-2">
                <item.icon className="w-6 h-6 text-brand-primary" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PDF Tools Grid ── */}
      <section className="max-w-6xl mx-auto px-0 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Free PDF Tools
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm max-w-xl mx-auto">
            Compress, convert, merge, split, protect and unlock PDF files — all completely free, no account needed.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pdfTools.map((tool, i) => (
            <a
              key={i}
              href={tool.href}
              aria-label={tool.name}
              className="group relative glass dark:glass-dark rounded-3xl p-6 border border-slate-200/50 dark:border-white/5 hover:border-brand-primary/40 hover:shadow-xl hover:shadow-brand-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
              <div className="relative flex items-start justify-between">
                <div className="w-11 h-11 rounded-2xl bg-brand-primary/10 group-hover:bg-brand-primary/20 flex items-center justify-center transition-colors duration-300">
                  <tool.icon className="w-5 h-5 text-brand-primary" strokeWidth={1.75} />
                </div>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                  Free
                </span>
              </div>
              <div className="relative flex flex-col gap-1.5 flex-1">
                <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors leading-snug">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {tool.desc}
                </p>
              </div>
              <div className="relative flex items-center gap-1.5 text-brand-primary font-black text-[10px] uppercase tracking-widest translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {tool.cta}
                <ArrowRight className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Image Tools Grid ── */}
      <section className="max-w-6xl mx-auto px-0 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Free Image Converter &amp; Compressor
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm max-w-xl mx-auto">
            Convert JPG to PNG, PNG to WEBP, compress images, and convert HEIC photos — free, instant, no watermarks.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {imageTools.map((tool, i) => (
            <a
              key={i}
              href={tool.href}
              aria-label={tool.name}
              className="group relative glass dark:glass-dark rounded-3xl p-6 border border-slate-200/50 dark:border-white/5 hover:border-brand-primary/40 hover:shadow-xl hover:shadow-brand-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
              <div className="relative flex items-start justify-between">
                <div className="w-11 h-11 rounded-2xl bg-brand-primary/10 group-hover:bg-brand-primary/20 flex items-center justify-center transition-colors duration-300">
                  <tool.icon className="w-5 h-5 text-brand-primary" strokeWidth={1.75} />
                </div>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                  Free
                </span>
              </div>
              <div className="relative flex flex-col gap-1.5 flex-1">
                <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors leading-snug">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {tool.desc}
                </p>
              </div>
              <div className="relative flex items-center gap-1.5 text-brand-primary font-black text-[10px] uppercase tracking-widest translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {tool.cta}
                <ArrowRight className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Social Proof Stats ── */}
      <section className="max-w-6xl mx-auto px-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { stat: "13+", label: "Free Tools" },
            { stat: "< 3s", label: "Average Conversion Time" },
            { stat: "100%", label: "Free Forever" },
            { stat: "0 bytes", label: "Data Retained After Use" },
          ].map((item, i) => (
            <div key={i} className="glass dark:glass-dark rounded-[2rem] p-8 text-center border border-white/5 flex items-center justify-center flex-col">
              <p className="text-4xl font-black text-brand-primary">{item.stat}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trust Features ── */}
      <section className="max-w-6xl mx-auto px-0 grid md:grid-cols-3 gap-8">
        {[
          {
            icon: Shield,
            title: "Files Deleted Immediately",
            desc: "Your files are permanently deleted right after conversion. Nothing is stored, logged, or retained on our servers — ever."
          },
          {
            icon: Lock,
            title: "Encrypted Transfers",
            desc: "All uploads and downloads use HTTPS/TLS encryption. Your files are never transmitted or processed in plain text."
          },
          {
            icon: Zap,
            title: "Blazing Fast Processing",
            desc: "Cloud-native architecture delivers sub-3-second conversions. No queues, no waiting — instant results every time."
          }
        ].map((feature, i) => (
          <div key={i} className="glass dark:glass-dark rounded-[2.5rem] p-10 border border-white/5 space-y-6 hover:-translate-y-2 transition-transform duration-500">
            <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
              <feature.icon className="w-7 h-7 text-brand-primary" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{feature.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* ── CTA ── */}
      <section className="max-w-4xl mx-auto px-0">
        <div className="glass dark:glass-dark rounded-[3rem] p-16 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 space-y-8">
            <div className="flex justify-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <p className="text-sm font-black text-slate-500 uppercase tracking-widest">Fast &amp; Secure • Zero Retention • Privacy First</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              The Easiest Free File Converter<br />on the Internet
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              Compress PDFs, convert images, merge documents — instantly and 100% private. No account. No limits.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/compress-pdf" className="max-[950px]:text-sm inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-brand-primary text-white font-black hover:scale-105 transition-all shadow-lg shadow-brand-primary/25">
                Compress PDF Free <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/jpg-to-png" className="max-[950px]:text-sm inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black hover:scale-105 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-white/10">
                Convert Images Free
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="max-w-3xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            Everything you need to know about weFixPDF.
          </p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* ── SEO Content ── */}
      <section className="glass dark:glass-dark rounded-3xl md:rounded-[4rem] p-6 sm:p-12 md:p-20 space-y-10 relative overflow-hidden group border border-slate-200/50 dark:border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] transition-transform duration-1000 group-hover:scale-150" />

        <div className="relative z-10 space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
              Your All-in-One <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Free File Converter</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-slate-500 dark:text-slate-400 leading-relaxed text-base md:text-lg font-medium">
              <p>
                weFixPDF is a free online file converter built around one principle: <strong className="text-slate-700 dark:text-slate-300">your files are your business, not ours</strong>. Every tool — from compressing PDFs and converting images to merging documents, rotating pages, and protecting files with passwords — is available to everyone for free, with no account required and no usage limits.
              </p>
              <p>
                Unlike Adobe Acrobat Online (which locks features behind a monthly subscription) or Smallpdf (which limits free users to two tasks per day), weFixPDF imposes no restrictions. Files are processed instantly using cloud-native servers and <strong className="text-slate-700 dark:text-slate-300">deleted permanently the moment your download is ready</strong> — not hours later.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
              Why Privacy Matters for File Conversion
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-base font-medium">
              When you upload a PDF or image to an online converter, you are trusting that service with potentially sensitive information — contracts, invoices, personal photos, legal documents. weFixPDF uses HTTPS/TLS encryption for all transfers and guarantees <strong className="text-slate-700 dark:text-slate-300">zero data retention</strong>: no file is ever stored on disk beyond the duration of your active conversion session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "PDF Tools", items: ["Compress PDF", "PDF to JPG", "PDF to Word", "Merge PDF", "Split PDF", "Rotate PDF", "Protect PDF", "Unlock PDF"] },
              { title: "Image Converters", items: ["JPG to PNG", "PNG to JPG", "PNG to WEBP", "Image Compressor", "HEIC to JPG"] },
              { title: "Why weFixPDF", items: ["100% Free", "No Sign-up", "No Watermarks", "Zero Data Retention", "HTTPS Encryption", "No Usage Limits", "Instant Processing"] },
            ].map((col) => (
              <div key={col.title} className="space-y-3">
                <h4 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-widest">{col.title}</h4>
                <ul className="space-y-1.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-8">
            {[
              { label: 'E2E Encryption', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' },
              { label: 'Cloud-Native Speed', color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20' },
              { label: 'Zero Retention', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
              { label: 'No Watermarks', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
              { label: 'No Limits', color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' },
            ].map((badge) => (
              <span key={badge.label} className={`${badge.color} px-4 sm:px-8 py-2 sm:py-3 rounded-xl sm:rounded-2xl border text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] shadow-2xl transition-all hover:-translate-y-1 hover:bg-black/5 dark:hover:bg-white/5`}>
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
