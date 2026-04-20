import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Trash2, Eye, Server, CheckCircle, ArrowRight, Wifi } from "lucide-react";

export const metadata: Metadata = {
  title: "Security & Privacy — How weFixPDF Protects Your Files | weFixPDF",
  description: "Learn exactly how weFixPDF keeps your files private. Zero file storage, TLS encryption, no accounts, no tracking. Technical security details for privacy-conscious users.",
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
    icon: Trash2,
    title: "Zero File Retention",
    color: "#EF4444", bg: "#FEF2F2",
    points: [
      "Files are processed and deleted immediately after you download",
      "No file content is ever written to persistent storage",
      "No cloud backup of uploaded files",
      "Files cannot be retrieved, accessed, or shared — they no longer exist",
    ],
  },
  {
    icon: Wifi,
    title: "Encrypted Transfers",
    color: "#2D5BE3", bg: "#E6F1FB",
    points: [
      "All file uploads use TLS 1.2 / TLS 1.3 encryption",
      "Your file data is encrypted in transit between your device and our servers",
      "Downloads are served over HTTPS",
      "No plain-text file transfer at any point",
    ],
  },
  {
    icon: Eye,
    title: "No Human Access",
    color: "#8B5CF6", bg: "#F5F3FF",
    points: [
      "File processing is fully automated — no human ever reads your files",
      "No file logging or content inspection at any step",
      "Processing happens in isolated, ephemeral server memory",
      "We cannot recover or produce your files even if legally compelled",
    ],
  },
  {
    icon: Lock,
    title: "No Accounts or Tracking",
    color: "#163863", bg: "#ECFDF5",
    points: [
      "No account creation means no password or personal data breach risk",
      "No tracking cookies without your explicit consent",
      "No user profiles or activity history stored",
      "Standard server access logs are anonymized and not linked to file content",
    ],
  },
  {
    icon: Server,
    title: "Isolated Processing",
    color: "#F59E0B", bg: "#FFFBEB",
    points: [
      "Each file conversion runs in an isolated process",
      "No data sharing between different users' file conversions",
      "Temp files (if any) are deleted at process termination",
      "Server memory is cleared between conversions",
    ],
  },
  {
    icon: Shield,
    title: "Privacy by Design",
    color: "#0EA5E9", bg: "#F0F9FF",
    points: [
      "Architecture built around data minimization from day one",
      "GDPR-compatible: no personal data stored or processed",
      "No third-party analytics tools with access to file metadata",
      "Open-door disclosure: contact us with any security questions",
    ],
  },
];

const comparisons = [
  { label: "File storage after conversion",  us: "Never stored",         them: "Minutes to hours" },
  { label: "Human file access",              us: "Impossible by design", them: "Varies by provider" },
  { label: "Account required",               us: "Never",                them: "Often required" },
  { label: "Tracking cookies", us: "Only if accepted", them: "Common" },
  { label: "Data breach risk (files)",       us: "Zero (no storage)",    them: "Possible" },
  { label: "Transfer encryption",            us: "TLS 1.3",              them: "Usually TLS" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-label mb-4">{children}</p>;
}

export default function SecurityPage() {
  return (
    <div className="bg-page">

      {/* ── Hero ── */}
      <section className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionLabel>Security &amp; Privacy</SectionLabel>
          <h1 className="text-hero mb-5" style={{ color: 'var(--text)' }}>
            Your files are safe<br />by architecture.
          </h1>
          <p className="text-[16px] leading-[1.7] max-w-xl" style={{ color: 'var(--text-muted)' }}>
            weFixPDF is built with a zero-storage, zero-retention architecture.
            Your files cannot be stored because the system is not designed to store them.
          </p>
        </div>
      </section>

      {/* ── Key guarantee banner ── */}
      <section className="py-10 border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: Trash2, label: "Files auto-deleted", sub: "Immediately after download", color: "#EF4444", bg: "#FEF2F2" },
              { icon: Wifi,   label: "TLS encryption",     sub: "On every file transfer",    color: "#2D5BE3", bg: "#E6F1FB" },
              { icon: Eye,    label: "Zero human access",  sub: "Fully automated processing",color: "#8B5CF6", bg: "#F5F3FF" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-5 bg-card rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)]"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: item.bg }}
                >
                  <item.icon className="w-5 h-5" color={item.color} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-[14px] font-medium" style={{ color: 'var(--text)' }}>{item.label}</p>
                  <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-16">

        {/* ── 6 Security Pillars ── */}
        <section>
          <SectionLabel>Security architecture</SectionLabel>
          <h2 className="text-section mb-8" style={{ color: 'var(--text)' }}>Six pillars of protection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {securityPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-6 rounded-xl bg-card border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: pillar.bg }}
                  >
                    <pillar.icon className="w-[18px] h-[18px]" color={pillar.color} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[14px] font-medium" style={{ color: 'var(--text)' }}>{pillar.title}</h3>
                </div>
                <ul className="space-y-2">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" color="#163863" strokeWidth={2} />
                      <span className="text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── How file processing works ── */}
        <section>
          <SectionLabel>How your file flows through our system</SectionLabel>
          <h2 className="text-section mb-8" style={{ color: 'var(--text)' }}>Step by step</h2>
          <div className="space-y-0">
            {[
              { n: "01", title: "You upload your file", body: "Your file is sent via an encrypted HTTPS connection using TLS 1.3. The transfer is secured in transit." },
              { n: "02", title: "Processing runs in isolated memory", body: "The conversion runs in a short-lived server process. Your file data never touches permanent storage." },
              { n: "03", title: "Result is prepared for download", body: "The converted file is placed in a temporary in-memory buffer and a download link is generated for you." },
              { n: "04", title: "You download the file", body: "You click download and receive your file directly. The download is served over HTTPS." },
              { n: "05", title: "File is permanently deleted", body: "The moment the download is complete, the temporary buffer is cleared. Your file no longer exists on our servers." },
            ].map((s, i, arr) => (
              <div key={s.n} className="flex gap-5 pb-6 last:pb-0">
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-medium flex-shrink-0"
                    style={{ background: '#2D5BE3' }}
                  >
                    {s.n}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-px flex-1 mt-2" style={{ background: 'rgba(45,91,227,0.15)' }} />
                  )}
                </div>
                <div className="pb-2 pt-1">
                  <p className="text-[14px] font-medium mb-1" style={{ color: 'var(--text)' }}>{s.title}</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Comparison table ── */}
        <section>
          <SectionLabel>Privacy comparison</SectionLabel>
          <h2 className="text-section mb-8" style={{ color: 'var(--text)' }}>weFixPDF vs typical online tools</h2>
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] overflow-hidden">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] bg-surface dark:bg-[#111113]">
                  <th className="text-left px-5 py-3.5 font-medium" style={{ color: 'var(--text-muted)' }}>Privacy aspect</th>
                  <th className="px-5 py-3.5 font-medium text-center" style={{ color: '#2D5BE3' }}>weFixPDF</th>
                  <th className="px-5 py-3.5 font-medium text-center" style={{ color: 'var(--text-muted)' }}>Typical online tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(0,0,0,0.06)] dark:divide-[rgba(255,255,255,0.06)]">
                {comparisons.map((row) => (
                  <tr key={row.label} className="bg-card">
                    <td className="px-5 py-3.5 font-medium" style={{ color: 'var(--text)' }}>{row.label}</td>
                    <td className="px-5 py-3.5 text-center font-medium" style={{ color: '#2D5BE3' }}>{row.us}</td>
                    <td className="px-5 py-3.5 text-center" style={{ color: 'var(--text-muted)' }}>{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] p-8 md:p-12 bg-surface">
          <h2 className="text-[20px] font-medium mb-2" style={{ color: 'var(--text)' }}>Ready to upload securely?</h2>
          <p className="text-[14px] mb-6" style={{ color: 'var(--text-muted)' }}>
            Your files are processed privately and deleted immediately. No account needed.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">
              Browse Tools <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/help" className="btn-ghost">Help Center</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
