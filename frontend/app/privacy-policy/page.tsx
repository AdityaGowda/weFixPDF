import { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | weFixPDF",
  description: "weFixPDF privacy policy. We never store your files. Zero retention, complete privacy protection, No Signup Required , unlimited free use",
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
    <div className="space-y-12">
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tighter">
          Privacy Policy
        </h1>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
          At <strong>weFixPDF</strong>, protecting your privacy is extremely important to us.
          This page explains how your files are processed, how minimal technical
          data may be used, and how your documents remain secure while using our tools.
        </p>
      </section>
      <PrivacyContent />
    </div>
  );
}
