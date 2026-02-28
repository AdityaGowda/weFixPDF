"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
                      ConvertLite defines the next generation of file processing. We've eliminated slow uploads and complex menus, replacing them with a streamlined, browser-native experience that prioritizes your privacy above all else.
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
            <footer className="mt-10 border-t border-slate-200/60 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-xl w-full">
              <div className="max-w-6xl mx-auto px-10 py-20">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
                  <div className="max-w-md space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white font-black text-xl shadow-xl">C</div>
                      <span className="font-extrabold text-2xl tracking-tighter text-slate-900 dark:text-white">ConvertLite</span>
                    </div>
                    <p className="text-slate-500 leading-relaxed font-medium text-sm">
                      Reimagining file utility for the modern web. Clean, fast, and uncompromisingly secure. Built with passion for creators everywhere.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
                    <div className="space-y-6">
                      <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] text-[10px]">Ecosystem</h3>
                      <ul className="space-y-4 text-sm font-bold text-slate-500">
                        <li><a href="/" className="hover:text-brand-primary transition-colors">Home</a></li>
                        <li><a href="/about" className="hover:text-brand-primary transition-colors">Mission</a></li>
                        <li><a href="/privacy" className="hover:text-brand-primary transition-colors">Privacy</a></li>
                        <li><a href="/terms" className="hover:text-brand-primary transition-colors">Terms</a></li>
                      </ul>
                    </div>
                    <div className="space-y-6">
                      <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] text-[10px]">Legal</h3>
                      <ul className="space-y-4 text-sm font-bold text-slate-500">
                        <li><a href="/privacy" className="hover:text-brand-primary transition-colors">Privacy</a></li>
                        <li><a href="/terms" className="hover:text-brand-primary transition-colors">Terms</a></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-20 pt-10 border-t border-slate-200/60 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] text-slate-500 font-black uppercase tracking-[0.25em]">
                  <p>© 2026 ConvertLite — All rights reserved.</p>
                  <div className="flex gap-10">
                    <span className="flex items-center gap-2 font-semibold text-slate-500"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Privacy First</span>
                    <span className="flex items-center gap-2 font-semibold text-slate-500"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Instant Results</span>
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
