import React from "react";
import { Metadata } from "next";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About weFixPDF — Free, Private File Conversion Tools",
  description: "Learn about weFixPDF's mission to provide secure, private file conversion tools. Zero data retention, encrypted processing, and instant results.",
  alternates: { canonical: "https://wefixpdf.com/about" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "About weFixPDF — Free, Private File Conversion Tools",
    description: "Zero data retention, encrypted processing, instant results. No sign-up ever.",
    url: "https://wefixpdf.com/about",
    siteName: "weFixPDF",
    type: "website",
    images: [{ url: "https://wefixpdf.com/wfp.png", width: 1200, height: 630, alt: "About weFixPDF" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About weFixPDF",
    description: "Zero data retention, encrypted processing. No sign-up ever.",
    images: ["https://wefixpdf.com/wfp.png"],
    site: "@wefixpdf",
  },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.06em] mb-4" style={{ color: 'var(--text-muted)' }}>
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-page">

      <section className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionLabel>About</SectionLabel>
          <h1 className="text-hero mb-5" style={{ color: 'var(--text)' }}>
            Built for privacy.<br />Designed for everyone.
          </h1>
          <p className="text-[16px] leading-[1.7] max-w-xl" style={{ color: 'var(--text-muted)' }}>
            weFixPDF provides fast, secure file conversion tools — PDF, images, documents.
            Every file is encrypted in transit, processed, and deleted immediately.
            No account. No watermarks. No limits.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionLabel>What we offer</SectionLabel>
          <h2 className="text-section mb-10" style={{ color: 'var(--text)' }}>Three toolsets. All free.</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                label: "PDF Suite",
                desc: "Everything you need to work with PDF files.",
                items: [
                  "High-quality compression",
                  "PDF to JPG conversion",
                  "Smart PDF merging",
                  "Flexible page splitting",
                  "Rotation & protection",
                  "PDF to Word conversion",
                ],
                accent: "#2D5BE3",
              },
              {
                label: "Image Tools",
                desc: "Convert and compress any image format.",
                items: [
                  "JPG, PNG, WEBP, HEIC support",
                  "Smart compression (up to 80%)",
                  "HEIC to JPG converter",
                  "PNG to WEBP converter",
                  "Lossless quality option",
                  "Batch processing (coming soon)",
                ],
                accent: "#163863",
              },
              {
                label: "Document Tools",
                desc: "Go beyond PDFs.",
                items: [
                  "Image to PDF conversion",
                  "Word to PDF (coming soon)",
                  "Excel to PDF (coming soon)",
                  "OCR text extraction (coming soon)",
                  "PowerPoint conversion (coming soon)",
                  "Watermark tools (coming soon)",
                ],
                accent: "#8B5CF6",
              },
            ].map((suite) => (
              <div
                key={suite.label}
                className="bg-card rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] p-6"
                style={{ borderTop: `2px solid ${suite.accent}` }}
              >
                <h3 className="text-[15px] font-medium mb-1" style={{ color: 'var(--text)' }}>{suite.label}</h3>
                <p className="text-[13px] mb-5" style={{ color: 'var(--text-muted)' }}>{suite.desc}</p>
                <ul className="space-y-2">
                  {suite.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                      <CheckCircle2
                        className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                        color={suite.accent}
                        strokeWidth={2}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <SectionLabel>Our approach</SectionLabel>
              <h2 className="text-section mb-5" style={{ color: 'var(--text)' }}>
                The weFixPDF difference
              </h2>
              <p className="text-[15px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
                Built after frustration with watermarked, login-gated PDF tools. The
                goal was simple: make every common file operation free, instant, and
                private — with no strings attached.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { title: "Lightning fast",   body: "Optimized cloud servers process most files in under 3 seconds.",              accent: "#F59E0B" },
                { title: "Secure by design", body: "TLS 1.3 encrypted transfers. Files are deleted the moment you download.",    accent: "#163863" },
                { title: "Zero friction",    body: "No account, no email, no password. Open a tool and use it.",                 accent: "#2D5BE3" },
              ].map((f) => (
                <div key={f.title} className="feature-block" style={{ borderLeftColor: f.accent }}>
                  <h3 className="text-[15px] font-medium mb-1" style={{ color: 'var(--text)' }}>{f.title}</h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionLabel>The team</SectionLabel>
          <h2 className="text-section mb-10" style={{ color: 'var(--text)' }}>Who built this</h2>
          <div className="bg-card rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] p-6 flex flex-col sm:flex-row gap-6 items-start">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-[18px] font-medium flex-shrink-0"
              style={{ background: '#2D5BE3' }}
            >
              AM
            </div>
            <div className="space-y-2">
              <div>
                <h3 className="text-[15px] font-medium" style={{ color: 'var(--text)' }}>Adithya M R</h3>
                <p className="text-[13px] text-[#2D5BE3]">Founder &amp; Lead Developer</p>
              </div>
              <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Full-stack developer with a passion for tools that respect user privacy.
                Built weFixPDF after getting frustrated with watermarked, login-gated
                PDF tools during a client project.
              </p>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md"
                style={{ background: '#E6F1FB', color: '#185FA5' }}
              >
                Built in India 🇮🇳
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionLabel>Authority & Trust</SectionLabel>
          <h2 className="text-section mb-10" style={{ color: 'var(--text)' }}>Why trust weFixPDF?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <h3 className="text-[16px] font-bold mb-2" style={{ color: 'var(--text)' }}>Technical Expertise</h3>
                <p className="text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
                  Our core processing engine is built on top of battle-tested open-source libraries used by millions of developers worldwide.
                  We implement enterprise-grade logic for PDF manipulation and image optimization to ensure 99.9% conversion accuracy.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <h3 className="text-[16px] font-bold mb-2" style={{ color: 'var(--text)' }}>Verified Security</h3>
                <p className="text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
                  Every tool on weFixPDF runs on isolated, ephemeral cloud instances.
                  We use TLS 1.3 for all data in transit and adhere to a strict "No Data Retention" policy, meaning your files don&apos;t just get hidden — they are physically wiped from memory after download.
                </p>
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20">
              <h3 className="text-[18px] font-bold mb-4" style={{ color: 'var(--text)' }}>A Mission for Privacy</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-slate-600 dark:text-slate-400">
                <p>
                  weFixPDF was founded in 2024 with a clear goal: to provide an alternative to the increasingly monetized and invasive PDF tool market.
                  Unlike larger competitors, we do not treat your documents as data to be mined.
                </p>
                <p>
                  Our founder, Adithya M R, is an advocate for the open web and privacy-first software.
                  The site remains free because we believe basic file utilities should be as accessible and private as a standard calculator.
                </p>
                <ul className="space-y-2 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                    <span>Independent & Self-funded</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                    <span>Global CDN for fast access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                    <span>No third-party data selling</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionLabel>Why choose weFixPDF</SectionLabel>
          <h2 className="text-section mb-8" style={{ color: 'var(--text)' }}>How we compare</h2>
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] overflow-hidden">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] bg-surface dark:bg-[#111113]">
                  <th className="text-left px-5 py-3.5 font-medium" style={{ color: 'var(--text-muted)' }}>Feature</th>
                  <th className="px-5 py-3.5 font-medium text-center" style={{ color: '#2D5BE3' }}>weFixPDF</th>
                  <th className="px-5 py-3.5 font-medium text-center" style={{ color: 'var(--text-muted)' }}>Others</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(0,0,0,0.06)] dark:divide-[rgba(255,255,255,0.06)]">
                {[
                  { label: "Data retention",    us: "Zero",              them: "Minutes to hours" },
                  { label: "File encryption",   us: "TLS 1.3",           them: "Partial" },
                  { label: "Account required",  us: "Never",             them: "Often required" },
                  { label: "Processing speed",  us: "Under 3 seconds",   them: "2–5 seconds" },
                  { label: "Daily limits",      us: "None",              them: "2–5 tasks/day (free tier)" },
                  { label: "Price",             us: "100% free",         them: "Freemium / paid" },
                ].map((row) => (
                  <tr key={row.label} className="bg-card">
                    <td className="px-5 py-3.5 font-medium" style={{ color: 'var(--text)' }}>{row.label}</td>
                    <td className="px-5 py-3.5 text-center font-medium" style={{ color: '#2D5BE3' }}>{row.us}</td>
                    <td className="px-5 py-3.5 text-center" style={{ color: 'var(--text-muted)' }}>{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] bg-surface">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-section" style={{ color: 'var(--text)' }}>Ready to start converting?</h2>
          <p className="text-[15px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
            Free. Private. No account needed. Just pick a tool and get started.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a href="/tools/compress-pdf" className="btn-primary">
              Compress PDF Free
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/tools" className="btn-ghost">Browse All Tools</a>
          </div>
        </div>
      </section>

    </div>
  );
}
