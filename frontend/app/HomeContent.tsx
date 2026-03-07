import {
  Shield, Zap, Lock, ArrowRight, Star, FileImage, Image, Minimize2, FileDown,
  FileText, BookOpen, Layers, Scissors, Smartphone,
  RotateCw, ShieldCheck, LockOpen
} from "lucide-react";
import Link from "next/link";
import { LiveProcessingTicker } from "./components/clientDymaic";


export default async function HomeContent() {

  const tools = [
    { name: "JPG to PNG Converter", href: "/jpg-to-png", icon: FileImage, desc: "Convert JPG to PNG free with lossless quality — no watermarks, no sign-up, instant download.", cta: "Convert JPG to PNG Free" },
    { name: "PNG to JPG Converter", href: "/png-to-jpg", icon: Image, desc: "Convert PNG to JPG online and reduce file size for faster web performance — free, no software needed.", cta: "Convert PNG to JPG Free" },
    { name: "Image Compressor", href: "/image-compressor", icon: Minimize2, desc: "Compress images online by up to 80% without losing quality. Supports JPG, PNG, and WEBP — free.", cta: "Compress Image Free" },
    { name: "PNG to WEBP Converter", href: "/png-to-webp", icon: Zap, desc: "Convert PNG to WEBP format and get up to 30% smaller file sizes. Boost page speed instantly.", cta: "Convert PNG to WEBP Free" },
    { name: "Compress PDF", href: "/compress-pdf", icon: FileDown, desc: "Reduce PDF file size online without losing quality. Ideal for email, uploads, and sharing — free.", cta: "Compress PDF Free" },
    { name: "PDF to JPG", href: "/pdf-to-jpg", icon: FileImage, desc: "Convert PDF pages to high-quality JPG images online — fast, free, and no software required.", cta: "Convert PDF to JPG Free" },
    { name: "PDF to Word", href: "/pdf-to-word", icon: FileText, desc: "Convert PDF to editable Word DOCX files online. Preserves formatting — free, no sign-up needed.", cta: "Convert PDF to Word Free" },
    { name: "Merge PDF", href: "/merge-pdf", icon: Layers, desc: "Combine multiple PDF files into one document online — fast, free, and secure. No sign-up required.", cta: "Merge PDF Files Free" },
    { name: "Split PDF", href: "/split-pdf", icon: Scissors, desc: "Split PDF by page range or extract specific pages online — free tool, no software installation needed.", cta: "Split PDF Free" },
    { name: "HEIC to JPG", href: "/heic-to-jpg", icon: Smartphone, desc: "Convert iPhone HEIC photos to JPG online instantly. Compatible with Windows & Mac — free, no app needed.", cta: "Convert HEIC to JPG Free" },
    { name: "Rotate PDF", href: "/rotate-pdf", icon: RotateCw, desc: "Rotate PDF pages 90°, 180°, or 270° and save permanently — free online tool, no sign-up required.", cta: "Rotate PDF Pages Free" },
    { name: "Protect PDF", href: "/protect-pdf", icon: ShieldCheck, desc: "Add password protection to your PDF files instantly. Keep sensitive documents safe and secure online.", cta: "Password Protect PDF Free" },
    { name: "Unlock PDF", href: "/unlock-pdf", icon: LockOpen, desc: "Remove password from PDF files quickly and easily. Unlock protected PDFs online — no software needed.", cta: "Unlock PDF Online Free" },
  ];

  return (
    <div className="space-y-20 md:space-y-32 pb-20 px-0 sm:px-2 md:px-20">
      {/* Hero */}
      <section className="relative  pt-20 pb-10 text-center space-y-12">
        <div className="space-y-8 max-w-4xl mx-auto px-0">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.95] text-reveal flex flex-col gap-2">
            Free Online 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-white to-brand-secondary animate-shine">File Converter</span>
          </h1>

          <div className="space-y-8">
            <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed px-4">
              All-in-one PDF tools and Image converter. <br className="hidden sm:block" />
              <span className="text-slate-900 dark:text-white font-black">100% Free & Secure.</span> Zero data retention.
            </p>
            <div aria-hidden="true" role="presentation" className="flex justify-center animate-in fade-in zoom-in-95 duration-1500 delay-700">
              <LiveProcessingTicker />
            </div>
            {/* Marquee CTA Strip — full width edge to edge */}
            <div className="relative overflow-hidden space-y-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 w-screen left-1/2 -translate-x-1/2">

              <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l to-transparent z-10 pointer-events-none" />

              {/* Row 1 — PDF tools, left to right */}
              <div className="flex gap-3 w-max animate-marquee will-change-transform">
                {[...Array(3)].map((_, d) => (
                  <div key={d} className="flex gap-3 shrink-0">
                    {tools.map((tool, i) => (
                      <Link
                        key={tool.href + d}
                        href={tool.href}
                        title={tool.name + " Free Online"}
                        aria-label={tool.name}
                        className={`
              flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all hover:scale-105
              ${i === 0
                            ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25"
                            : i === 3
                              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg"
                              : "glass dark:glass-dark border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-brand-primary/30"
                          }
            `}
                      >
                        <tool.icon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} />
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              {/* Row 2 — Image tools, right to left */}
              <div className="flex gap-3 w-max animate-marquee-reverse will-change-transform">
                {[...Array(3)].map((_, d) => (
                  <div key={d} className="flex gap-3 shrink-0">
                    {tools.map((tool, i) => (
                      <Link
                        key={tool.href + d}
                        href={tool.href}
                        title={tool.name + " Free Online"}
                        aria-label={tool.name}
                        className={`
              flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all hover:scale-105
              ${i === 0
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg"
                            : i === 2
                              ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25"
                              : "glass dark:glass-dark border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-brand-primary/30"
                          }
            `}
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

      {/* Tool Grid */}
      <section className="max-w-6xl mx-auto px-0 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            All File Conversion Tools
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            Free • Instant • Private — No Sign-up Required
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool, i) => (
            <a
              key={i}
              href={tool.href}
              aria-label={tool.name}
              className="group relative glass dark:glass-dark rounded-3xl p-6 border border-slate-200/50 dark:border-white/5 hover:border-brand-primary/40 hover:shadow-xl hover:shadow-brand-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 overflow-hidden"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

              {/* Top row: icon + badge */}
              <div className="relative flex items-start justify-between">
                <div className="w-11 h-11 rounded-2xl bg-brand-primary/10 group-hover:bg-brand-primary/20 flex items-center justify-center transition-colors duration-300">
                  <tool.icon className="w-5 h-5 text-brand-primary" strokeWidth={1.75} />
                </div>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                  Free
                </span>
              </div>

              {/* Text */}
              <div className="relative flex flex-col gap-1.5 flex-1">
                <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors leading-snug">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              {/* CTA row */}
              <div className="relative flex items-center gap-1.5 text-brand-primary font-black text-[10px] uppercase tracking-widest translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {tool.cta}
                <ArrowRight className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </section >
      {/* Social Proof */}
      <section className="max-w-6xl mx-auto px-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { stat: "1K+", label: "Daily File Conversions" },
            { stat: "Fast", label: "Sub-Second Speed" },
            { stat: "100%", label: "Free Forever" },
            { stat: "0 bytes", label: "Data Retained" },
          ].map((item, i) => (
            <div key={i} className="glass dark:glass-dark rounded-[2rem] p-8 text-center border border-white/5 flex items-center justify-center flex-col">
              <p className="text-4xl font-black text-brand-primary">{item.stat}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Features */}
      <section className="max-w-6xl mx-auto px-0 grid md:grid-cols-3 gap-8">
        {[
          {
            icon: Shield,
            title: "Files Never Stored",
            desc: "Files are deleted immediately after conversion. Nothing saved on our servers."
          },
          {
            icon: Lock,
            title: "Secure Encryption",
            desc: "All file uploads and processing are fully encrypted for maximum security."
          },
          {
            icon: Zap,
            title: "Lightning Fast Conversion",
            desc: "Instant file processing. Most conversions complete in under a second."
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

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-0">
        <div className="glass dark:glass-dark rounded-[3rem] p-16 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 space-y-8">
            <div className="flex justify-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <p className="text-sm font-black text-slate-500 uppercase tracking-widest">Fast & Secure • Zero Retention • Privacy First</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">The Easiest File Converter<br />on the Internet</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Convert images, compress PDFs, and transform documents — instantly and 100% private.</p>
            <a href="/jpg-to-png" className="max-[950px]:text-sm inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black hover:scale-105 transition-all">
              Start Converting <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
      {/* SEO CONTENT */}
      <section className="glass dark:glass-dark rounded-3xl md:rounded-[4rem] p-6 sm:p-12 md:p-20 space-y-10 relative overflow-hidden group border border-slate-200/50 dark:border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] transition-transform duration-1000 group-hover:scale-150" />

        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
            Universal <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">File Converter</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-slate-500 dark:text-slate-400 leading-relaxed text-base md:text-lg font-medium">
            <p>
              weFixPDF provides a secure, private, and lightning-fast way to handle your file conversion needs. From compressing PDFs and converting images to advanced features like <strong>protecting PDFs with passwords</strong>, <strong>unlocking secured files</strong>, and <strong>rotating PDF pages</strong> online.
            </p>
            <p>
              Every tool is designed with a "privacy-first" mindset. We use industry-standard encryption and guarantee zero data retention. Your files are yours alone, processed instantly in your browser and deleted forever once you're done.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-8">
            {[
              { label: 'E2E Encryption', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' },
              { label: 'Cloud-Native Speed', color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20' },
              { label: 'Zero Retention', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
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