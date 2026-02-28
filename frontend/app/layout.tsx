import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";
import { Globe } from "lucide-react";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "wefixPDF | Universal File Powerhouse & Converter",
  description: "wefixPDF defines the next generation of file processing. Experience secure, lightning-fast, browser-native file conversions with absolute zero retention.",
  keywords: ["pdf converter", "image compressor", "file conversion", "secure converter", "browser native", "wefixPDF"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col transition-colors duration-500`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          <main className="flex-1 w-full transition-all duration-500 overflow-x-hidden">
            <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-24">
              <div className="relative">
                {/* Premium Visual Decorations */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-secondary/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow delay-700" />

                <div className="relative z-10">
                  {children}
                </div>
              </div>

              {/* SEO CONTENT */}
              <section className="glass dark:glass-dark rounded-[4rem] p-12 md:p-20 space-y-10 relative overflow-hidden group border border-slate-200/50 dark:border-white/5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] transition-transform duration-1000 group-hover:scale-150" />

                <div className="relative z-10 space-y-8">
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                    Universal File <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Powerhouse</span>
                  </h2>

                  <div className="grid md:grid-cols-2 gap-12 text-slate-500 dark:text-slate-400 leading-relaxed text-lg font-medium">
                    <p>
                      wefixPDF defines the next generation of file processing. We've eliminated slow uploads and complex menus, replacing them with a streamlined, browser-native experience that prioritizes your privacy above all else.
                    </p>
                    <p>
                      From high-res image compression to complex document bridging, our tools are engineered for professionals who demand speed without sacrificing quality or security.
                    </p>
                  </div>

                  {/* Trust badges */}
                  <div className="flex flex-wrap gap-4 pt-8">
                    {[
                      { label: 'E2E Encryption', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' },
                      { label: 'Cloud-Native Speed', color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20' },
                      { label: 'Zero Retention', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
                    ].map((badge) => (
                      <span key={badge.label} className={`${badge.color} px-8 py-3 rounded-2xl border text-xs font-black uppercase tracking-[0.2em] shadow-2xl transition-all hover:-translate-y-1 hover:bg-black/5 dark:hover:bg-white/5`}>
                        {badge.label}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* FOOTER */}
            <footer className="relative z-10 border-t border-slate-200 dark:border-white/5 pt-24 pb-12">
              <div className="max-w-7xl mx-auto px-6 space-y-20">
                {/* Top Footer: Brand & Status */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                  <div className="max-w-sm space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-32 md:w-40 h-auto aspect-square max-h-20 overflow-hidden flex items-center justify-start">
                        <Image
                          src="/wefixpdf.png"
                          alt="wefixPDF Logo"
                          width={340}
                          height={340}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 font-bold leading-relaxed">
                      Reimagining file utility for the modern web. Clean, fast, and uncompromisingly secure. Built for a global creator economy.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="px-6 py-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Global Engine Active</span>
                    </div>
                    <div className="px-6 py-3 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 flex items-center gap-3">
                      <Globe className="w-4 h-4 text-brand-primary" />
                      <span className="text-xs font-black text-brand-primary uppercase tracking-widest">180+ Regions Served</span>
                    </div>
                  </div>
                </div>

                {/* Middle Footer: Links */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-t border-slate-200 dark:border-white/5 pt-12">
                  <div className="space-y-6">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Services</h5>
                    <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                      <li><a href="/image-compressor" className="hover:text-brand-primary transition-colors">Core Compressor</a></li>
                      <li><a href="/jpg-to-png" className="hover:text-brand-primary transition-colors">Identity Shift</a></li>
                      <li><a href="/png-to-jpg" className="hover:text-brand-primary transition-colors">Optimized Grid</a></li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Platform</h5>
                    <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                      <li><a href="/" className="hover:text-brand-primary transition-colors">Universal Home</a></li>
                      <li><a href="/about" className="hover:text-brand-primary transition-colors">Our Mission</a></li>
                      <li><a href="/privacy" className="hover:text-brand-primary transition-colors">Privacy Cloud</a></li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Legal</h5>
                    <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                      <li><a href="/privacy" className="hover:text-brand-primary transition-colors">Data Protocol</a></li>
                      <li><a href="/terms" className="hover:text-brand-primary transition-colors">Usage Terms</a></li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Community</h5>
                    <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                      <li><a href="/about" className="hover:text-brand-primary transition-colors">Join Global</a></li>
                      <li><a href="/" className="hover:text-brand-primary transition-colors">Creator Hub</a></li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-200 dark:border-white/5 pt-12">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">© 2026 wefixPDF — All Rights Reserved.</p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Privacy First</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Zero Retention</span>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
