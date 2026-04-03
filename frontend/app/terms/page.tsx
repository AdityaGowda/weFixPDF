import { Metadata } from "next";
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
    <div className="space-y-12">
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tighter">
          Terms of Service
        </h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400">
          Simple, fair terms for using the free file conversion tools
          provided by <strong>weFixPDF</strong>.
        </p>
      </section>
      <TermsContent />
    </div>
  );
}
