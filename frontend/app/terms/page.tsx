import { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service | weFixPDF",
  description: "Terms of service for weFixPDF file conversion tools. Free to use, no registration required, complete privacy guaranteed.",
  alternates: { canonical: "https://wefixpdf.com/terms" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Terms of Service | weFixPDF",
    description: "Terms of service for weFixPDF file conversion tools. Free to use, no registration required.",
    url: "https://wefixpdf.com/terms",
    siteName: "weFixPDF",
    type: "website",
    images: [{ url: "https://wefixpdf.com/wfp.png", width: 1200, height: 630, alt: "Terms of Service | weFixPDF" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | weFixPDF",
    description: "Terms of service for weFixPDF file conversion tools. Free to use, no registration required.",
    images: ["https://wefixpdf.com/wfp.png"],
    site: "@wefixpdf",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="pt-10 pb-12 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-medium">
            <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-600 dark:text-slate-300">Terms of Service</span>
          </nav>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[11px] font-black uppercase tracking-[0.2em] mb-6">
              <FileText className="w-3 h-3" /> Terms of Service
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.1]">
              Simple, Fair Terms
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Plain-language terms for using the free file conversion tools provided by{" "}
              <strong className="text-slate-700 dark:text-slate-300">weFixPDF</strong>.
            </p>
            <p className="text-xs text-slate-400 mt-4 font-medium">Last Updated: April 2026</p>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-14">
        <TermsContent />
      </div>
    </div>
  );
}
