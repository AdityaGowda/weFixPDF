"use client";

import { Shield, Zap, Globe, Lock, ArrowRight, Star, Users } from "lucide-react";
import { useState, useEffect } from "react";
import TrustTicker from "./components/trustTicker";

export default function HomeContent() {
  const tools = [
    { name: "JPG to PNG Converter", href: "/jpg-to-png", icon: "🖼️", desc: "Lossless quality, no watermarks", cta: "Convert JPG to PNG Free" },
    { name: "PNG to JPG Converter", href: "/png-to-jpg", icon: "📸", desc: "Smaller files, optimized for web", cta: "Convert PNG to JPG Free" },
    { name: "Image Compressor", href: "/image-compressor", icon: "🗜️", desc: "Reduce size up to 80%, keep quality", cta: "Compress Images Now" },
    { name: "PNG to WEBP Converter", href: "/png-to-webp", icon: "🌐", desc: "Next-gen format, 30% smaller", cta: "Convert PNG to WEBP" },
    { name: "Compress PDF", href: "/compress-pdf", icon: "📄", desc: "Reduce PDF file size instantly", upcoming: true },
    { name: "PDF to JPG", href: "/pdf-to-jpg", icon: "🖼️", desc: "Convert PDF pages to images", upcoming: true },
    { name: "PDF to Word", href: "/pdf-to-word", icon: "📚", desc: "Convert PDF to editable DOCX", upcoming: true },
    { name: "HEIC to JPG", href: "#", icon: "📱", desc: "Convert iPhone photos instantly", upcoming: true },
  ];

  return (
    <div className="space-y-32 pb-20">
      {/* Hero */}
      <section className="relative pt-10 pb-10 text-center space-y-12">
        <div className="space-y-8 max-w-4xl mx-auto px-0 sm:px-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-black uppercase tracking-[0.2em] animate-in fade-in zoom-in duration-1000"
          >
            <Shield className="w-4 h-4" />
            Privacy-First Processing • Edge Technology
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.95] text-reveal">
            Free Online<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-white to-brand-secondary animate-shine">File Converter</span>
          </h1>

          <div className="space-y-8">
            <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed px-4">
              Convert PDFs, compress images, and transform documents. <br className="hidden sm:block" />
              <span className="text-slate-900 dark:text-white font-black">Unlimited Files</span> with zero data retention.
            </p>

            <TrustTicker />

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 py-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <a href="/compress-pdf" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-primary text-white font-black hover:scale-105 transition-all shadow-xl shadow-brand-primary/20">
                Compress PDF
              </a>
              <a href="/pdf-to-word" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black hover:scale-105 transition-all shadow-xl">
                PDF to Word
              </a>
              <a href="/image-compressor" className="w-full sm:w-auto px-8 py-4 rounded-2xl glass dark:glass-dark border border-slate-200 dark:border-white/10 font-bold hover:bg-white/10 transition-all">
                Compress Images
              </a>
              <a href="/pdf-to-jpg" className="w-full sm:w-auto px-8 py-4 rounded-2xl glass dark:glass-dark border border-slate-200 dark:border-white/10 font-bold hover:bg-white/10 transition-all">
                PDF to JPG
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-4">
              <div className="flex items-center gap-2 decoration-brand-primary/30 underline underline-offset-4">
                <span className="text-brand-primary font-bold">✓</span> Zero Retention
              </div>
              <div className="flex items-center gap-2 decoration-brand-primary/30 underline underline-offset-4">
                <span className="text-brand-primary font-bold">✓</span> 100% Private
              </div>
              <div className="flex items-center gap-2 decoration-brand-primary/30 underline underline-offset-4">
                <span className="text-brand-primary font-bold">✓</span> No Sign-Up
              </div>
              <div className="flex items-center gap-2 decoration-brand-primary/30 underline underline-offset-4">
                <span className="text-brand-primary font-bold">✓</span> All Files Supported
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Grid */}
      <section className="max-w-6xl mx-auto px-0 sm:px-6 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Online File Converter Tools</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Free • Instant • Private — No Sign-up Required</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <a
              key={i}
              href={tool.href}
              aria-label={tool.name}
              className={`group glass dark:glass-dark rounded-[2rem] p-8 border border-white/5 hover:border-brand-primary/50 transition-all duration-500 relative overflow-hidden ${tool.upcoming ? 'opacity-60 cursor-not-allowed' : ''}`}
              onClick={(e) => tool.upcoming && e.preventDefault()}
            >
              {tool.upcoming && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-brand-primary/30">
                  Coming Soon
                </div>
              )}
              <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500 origin-left">{tool.icon}</div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-brand-primary transition-colors">{tool.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">{tool.desc}</p>
              {!tool.upcoming && (
                <div className="flex items-center gap-2 text-brand-primary font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  {tool.cta} <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </a>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="max-w-6xl mx-auto px-0 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { stat: "Secure", label: "In-Browser Processing" },
            { stat: "Fast", label: "Sub-Second Conversion" },
            { stat: "100%", label: "Free Forever" },
            { stat: "0 bytes", label: "Files Retained" },
          ].map((item, i) => (
            <div key={i} className="glass dark:glass-dark rounded-[2rem] p-8 text-center border border-white/5">
              <p className="text-4xl font-black text-brand-primary">{item.stat}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Features */}
      <section className="max-w-6xl mx-auto px-0 sm:px-6 grid md:grid-cols-3 gap-8">
        {[
          { icon: Shield, title: "Zero Retention", desc: "Files are never stored. They are processed in memory and immediately deleted after conversion." },
          { icon: Lock, title: "100% Private", desc: "No tracking, no accounts, no cookies. Your files stay private from start to finish." },
          { icon: Zap, title: "Sub-Second Speed", desc: "Blazing fast conversions. Most files convert in under a second." }
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
      <section className="max-w-4xl mx-auto px-0 sm:px-6">
        <div className="glass dark:glass-dark rounded-[3rem] p-16 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 space-y-8">
            <div className="flex justify-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <p className="text-sm font-black text-slate-500 uppercase tracking-widest">Minimalist Design • Zero Compromise • 100% Secure</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">The Easiest File Converter<br />on the Internet.</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Convert, compress, and edit files — free, instantly, and 100% private.</p>
            <a href="/jpg-to-png" className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black hover:scale-105 transition-all">
              Start Converting Free <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
