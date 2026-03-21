// app/security/page.tsx — Detailed Security & Privacy page
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Trash2, Eye, Server, CheckCircle, ArrowRight, Wifi } from "lucide-react";

export const metadata: Metadata = {
  title: "Security & Privacy — How weFixPDF Protects Your Files | weFixPDF",
  description:
    "Learn exactly how weFixPDF keeps your files private. Zero file storage, TLS encryption, no accounts, no tracking. Technical security details for privacy-conscious users.",
  alternates: { canonical: "https://wefixpdf.com/security" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Security & Privacy | weFixPDF",
    description: "Zero file storage, TLS encryption, no accounts. How weFixPDF protects your documents.",
    url: "https://wefixpdf.com/security",
    siteName: "weFixPDF",
    type: "website",
    images: [{ url: "https://wefixpdf.com/wfp.png", width: 1200, height: 630, alt: "weFixPDF Security & Privacy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Security & Privacy | weFixPDF",
    description: "Zero file storage, TLS encryption, no accounts or tracking.",
    images: ["https://wefixpdf.com/wfp.png"],
    site: "@wefixpdf",
  },
};

const securityPillars = [
  {
    icon: <Trash2 className="w-6 h-6" />,
    color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    title: "Zero File Retention",
    points: [
      "Files are processed and deleted immediately after you download",
      "No file content is ever written to persistent storage",
      "No cloud backup of uploaded files",
      "Files cannot be retrieved, accessed, or shared — they no longer exist",
    ],
  },
  {
    icon: <Wifi className="w-6 h-6" />,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    title: "Encrypted Transfers",
    points: [
      "All file uploads use TLS 1.2 / TLS 1.3 encryption",
      "Your file data is encrypted in transit between your device and our servers",
      "Downloads are served over HTTPS",
      "No plain-text file transfer at any point",
    ],
  },
  {
    icon: <Eye className="w-6 h-6" />,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    title: "No Human Access",
    points: [
      "File processing is fully automated — no human ever reads your files",
      "No file logging or content inspection at any step",
      "Processing happens in isolated, ephemeral server memory",
      "We cannot recover or produce your files even if legally compelled",
    ],
  },
  {
    icon: <Lock className="w-6 h-6" />,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    title: "No Accounts or Tracking",
    points: [
      "No account creation means no password or personal data breach risk",
      "No persistent cookies or cross-site tracking",
      "No user profiles or activity history stored",
      "Standard server access logs are anonymized and not linked to file content",
    ],
  },
  {
    icon: <Server className="w-6 h-6" />,
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    title: "Isolated Processing",
    points: [
      "Each file conversion runs in an isolated process",
      "No data sharing between different users' file conversions",
      "Temp files (if any) are deleted at process termination",
      "Server memory is cleared between conversions",
    ],
  },
  {
    icon: <Shield className="w-6 h-6" />,
    color: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
    title: "Privacy by Design",
    points: [
      "Architecture built around data minimization from day one",
      "GDPR-compatible: no personal data stored or processed",
      "No third-party analytics tools with access to file metadata",
      "Open-door disclosure: contact us with any security questions",
    ],
  },
];

const comparisons = [
  { label: "File storage after conversion",      weFixPDF: "Never stored",         others: "Minutes to hours" },
  { label: "Human file access",                  weFixPDF: "Impossible by design",  others: "Varies by provider" },
  { label: "Account required",                   weFixPDF: "Never",                 others: "Often required" },
  { label: "Tracking cookies",                   weFixPDF: "None",                  others: "Common" },
  { label: "Data breach risk (files)",           weFixPDF: "Zero (no storage)",     others: "Possible" },
  { label: "Transfer encryption",                weFixPDF: "TLS 1.3",               others: "Usually TLS" },
];

export default function SecurityPage() {
  return (
    <>
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-16 pb-12 px-4 border-b border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-black uppercase tracking-[0.2em] mb-6">
            <Shield className="w-3 h-3" /> Security & Privacy
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-5 leading-[1.1]">
            Your Files Are Safe
            <br />
            <span className="text-reveal">By Architecture</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            weFixPDF is built with a zero-storage, zero-retention architecture. Your files cannot be stored because the system is not designed to store them.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">

        {/* ── Key Guarantee Banner ── */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <Trash2 className="w-5 h-5" />, label: "Files auto-deleted", sub: "Immediately after download" },
            { icon: <Wifi className="w-5 h-5" />,   label: "TLS encryption",     sub: "On every file transfer" },
            { icon: <Eye className="w-5 h-5" />,     label: "Zero human access",  sub: "Fully automated processing" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="font-black text-slate-900 dark:text-white text-sm">{item.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.sub}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ── 6 Security Pillars ── */}
        <section>
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6">
            Security Architecture
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {securityPillars.map((pillar, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${pillar.color}`}>
                    {pillar.icon}
                  </div>
                  <h2 className="font-black text-slate-900 dark:text-white text-base tracking-tight">
                    {pillar.title}
                  </h2>
                </div>
                <div className="space-y-2.5">
                  {pillar.points.map((point, pi) => (
                    <div key={pi} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How File Processing Works ── */}
        <section>
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6">
            How Your File Flows Through Our System
          </p>
          <div className="relative">
            {[
              { step: "1", title: "You upload your file",                  body: "Your file is sent via an encrypted HTTPS connection. The transfer is encrypted end-to-end." },
              { step: "2", title: "Processing runs in isolated memory",    body: "The conversion runs in a short-lived server process. Your file data never touches permanent storage." },
              { step: "3", title: "Result is prepared for download",       body: "The converted file is placed in a temporary in-memory buffer and a download link is generated for you." },
              { step: "4", title: "You download the file",                 body: "You click download and receive your file directly. The download is served over HTTPS." },
              { step: "5", title: "File is permanently deleted",           body: "The moment the download is complete, the temporary buffer is cleared. Your file no longer exists on our servers." },
            ].map((s, i) => (
              <div key={i} className="flex gap-5 mb-6 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shrink-0">
                    {s.step}
                  </div>
                  {i < 4 && <div className="w-px flex-1 bg-emerald-500/20 mt-2" />}
                </div>
                <div className="pb-6">
                  <p className="font-black text-slate-900 dark:text-white mb-1">{s.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Comparison Table ── */}
        <section>
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6">
            Privacy Comparison
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700/60">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left px-6 py-4 font-black text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50">Privacy Aspect</th>
                  <th className="px-6 py-4 font-black text-emerald-600 text-center bg-emerald-500/5">weFixPDF</th>
                  <th className="px-6 py-4 font-black text-slate-400 text-center bg-slate-50 dark:bg-slate-800/50">Typical Online Tools</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">{row.label}</td>
                    <td className="px-6 py-4 text-center font-bold text-emerald-600 dark:text-emerald-400">{row.weFixPDF}</td>
                    <td className="px-6 py-4 text-center text-slate-500">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white text-center">
          <Shield className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-black mb-3 tracking-tight">Ready to Upload Securely?</h2>
          <p className="text-emerald-200 font-medium mb-8 max-w-xl mx-auto">
            Your files are processed privately and deleted immediately. No account needed.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-emerald-700 font-black px-6 py-3 rounded-2xl text-sm hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Browse Tools <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 bg-white/20 text-white border border-white/30 font-bold px-6 py-3 rounded-2xl text-sm hover:bg-white/30 transition-colors"
            >
              Help Center
            </Link>
          </div>
        </section>
      </div>
    </div>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8668995301634402"
        crossOrigin="anonymous"></script>
    </>
  );
}
