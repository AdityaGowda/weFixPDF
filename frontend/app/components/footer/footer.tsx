
import Image from "next/image";
import { tools } from "@/app/lib/seo/seoschema";
import { Globe } from "lucide-react";

function Footer() {
    return (
           <footer className="relative z-10 border-t border-slate-200 dark:border-white/5 pt-24 pb-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
                {/* Top Footer: Brand & Status */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                  <div className="max-w-xl space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-32 md:w-40 h-auto aspect-square max-h-20 overflow-hidden flex items-center justify-start">
                        <Image
                          src="/wefixpdf.png"
                          alt="wefixPDF - Online File Converter Logo"
                          width={340}
                          height={340}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 font-bold leading-relaxed">
                      Online file converter for images and PDFs. Fast, secure, and private file conversion with zero data retention. Built for creators worldwide.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="px-6 py-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Global Engine Active</span>
                    </div>
                    <div className="px-6 py-3 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 flex items-center gap-3">
                      <Globe className="w-4 h-4 text-brand-primary" />
                      <span className="text-xs font-black text-brand-primary uppercase tracking-widest">Global Processing</span>
                    </div>
                  </div>
                </div>

                {/* Middle Footer: Links */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-t border-slate-200 dark:border-white/5 pt-12">
                  <div className="space-y-6">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Image Tools</h5>
                    <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                     {tools.map((tool:any) => (
                       <li key={tool.name}>
                         <a href={tool.url} className="hover:text-brand-primary transition-colors">
                           {tool.name}
                         </a>
                       </li>
                     ))}
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Platform</h5>
                    <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                      <li><a href="/" className="hover:text-brand-primary transition-colors">Home</a></li>
                      <li><a href="/about" className="hover:text-brand-primary transition-colors">About Us</a></li>
                      <li><a href="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</a></li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Legal</h5>
                    <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                      <li><a href="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</a></li>
                      <li><a href="/terms" className="hover:text-brand-primary transition-colors">Terms of Service</a></li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Resources</h5>
                    <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                      <li><a href="/about" className="hover:text-brand-primary transition-colors">How It Works</a></li>
                      <li><a href="/" className="hover:text-brand-primary transition-colors">All Tools</a></li>
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
    );
}

export default Footer;