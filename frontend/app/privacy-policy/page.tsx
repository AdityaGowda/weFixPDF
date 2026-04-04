import { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | weFixPDF",
  description: "weFixPDF privacy policy. We never store your files. Zero retention, complete privacy protection, No Signup Required, unlimited free use",
  alternates: { canonical: "https://wefixpdf.com/privacy-policy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy | weFixPDF",
    description: "weFixPDF never stores your files. Zero data retention, complete privacy protection.",
    url: "https://wefixpdf.com/privacy-policy",
    siteName: "weFixPDF",
    type: "website",
    images: [{ url: "https://wefixpdf.com/wfp.png", width: 1200, height: 630, alt: "Privacy Policy | weFixPDF" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | weFixPDF",
    description: "weFixPDF never stores your files. Zero data retention, complete privacy protection.",
    images: ["https://wefixpdf.com/wfp.png"],
    site: "@wefixpdf",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-10 pb-12 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-medium">
            <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-600 dark:text-slate-300">Privacy Policy</span>
          </nav>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[11px] font-black uppercase tracking-[0.2em] mb-6">
              <Shield className="w-3 h-3" /> Privacy Policy
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.1]">
              Your Privacy Matters
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              At <strong className="text-slate-700 dark:text-slate-300">weFixPDF</strong>, protecting your privacy is our priority.
              We never store your files and collect no personal data.
            </p>
            <p className="text-xs text-slate-400 mt-4 font-medium">Last Updated: April 2026</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-14">
        <PrivacyContent />
      </div>
    </div>
  );
}
