
import Image from "next/image";
import { getToolListings } from "@/app/lib/seo/seoApi";
import { Globe } from "lucide-react";

export default async function Footer() {
  const tools = await getToolListings();
    return (
           <footer className="relative z-10 border-t border-slate-200 dark:border-white/5 pt-24 pb-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
                {/* Top Footer: Brand & Status */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                  <div className="max-w-xl space-y-6">
                    <div className="flex items-center gap-3">
                <div className="relative w-full h-12 overflow-hidden items-center justify-start flex gap-4">
                  <Image
                    src="/logo.svg"
                    alt="weFixPDF Logo"
                    width={38}
                    height={38}
                    className="dark:hidden"
                    style={{ width: "38px", height: "auto" }}
                  />
                  <Image
                    src="/darklogo.svg"
                    alt="weFixPDF Logo"
                    width={40}
                    height={40}
                    className="hidden dark:block"
                    style={{ width: "40px", height: "auto" }}
                  />
                  <Image
                    src="/weFixPDF.png"
                    alt="weFixPDF - Online File Converter Logo"
                    width={140}
                    height={38}
                    className="object-contain"
                    style={{ width: "140px", height: "auto" }}
                  />
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 font-bold leading-relaxed">
                      Online file converter for images and PDFs. Fast, secure, and private file conversion with zero data retention. Built for creators worldwide.
                    </p>
                  </div>

                </div>

                {/* Middle Footer: Links */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 border-t border-slate-200 dark:border-white/5 pt-12">
                  {(() => {
                    const PDF_SLUGS = ["compress-pdf","merge-pdf","split-pdf","pdf-to-jpg","pdf-to-word","rotate-pdf","protect-pdf","unlock-pdf","word-to-pdf"];
                    const pdfTools = tools.filter((t: any) => PDF_SLUGS.includes(t.slug));
                    const imageTools = tools.filter((t: any) => !PDF_SLUGS.includes(t.slug));
                    const ToolList = ({ items, allHref }: { items: any[], allHref: string }) => (
                      <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                        {items.slice(0, 5).map((tool: any) => (
                          <li key={tool.slug}>
                            <a href={`/${tool.slug}`} className="hover:text-brand-primary transition-colors">
                              {tool.name}
                            </a>
                          </li>
                        ))}
                        {items.length > 5 && (
                          <li>
                            <a href={allHref} className="text-brand-primary hover:underline transition-colors">
                              +{items.length - 5} more tools →
                            </a>
                          </li>
                        )}
                      </ul>
                    );
                    return (
                      <>
                        <div className="space-y-6">
                          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">PDF Tools</h5>
                          <ToolList items={pdfTools} allHref="/tools" />
                        </div>
                        <div className="space-y-6">
                          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Image Tools</h5>
                          <ToolList items={imageTools} allHref="/tools" />
                        </div>
                      </>
                    );
                  })()}
                  <div className="space-y-6">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Platform</h5>
                    <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                      <li><a href="/" className="hover:text-brand-primary transition-colors">Home</a></li>
                <li><a href="/about" className="hover:text-brand-primary transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-brand-primary transition-colors">Contact Us</a></li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Legal</h5>
                    <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                <li><a href="/privacy-policy" className="hover:text-brand-primary transition-colors">Privacy Policy</a></li>
                      <li><a href="/terms" className="hover:text-brand-primary transition-colors">Terms of Service</a></li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Resources</h5>
                    <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                <li><a href="/blog" className="hover:text-brand-primary transition-colors">Blog</a></li>
                      <li><a href="/about" className="hover:text-brand-primary transition-colors">How It Works</a></li>
                <li><a href="/tools" className="hover:text-brand-primary transition-colors">All Tools</a></li>
                <li><a href="mailto:hello@wefixpdf.com" className="hover:text-brand-primary transition-colors">Support: hello@wefixpdf.com</a></li>
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