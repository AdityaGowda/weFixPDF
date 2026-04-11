import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Clock, Bug, Shield, Briefcase, Lightbulb } from "lucide-react";
import { buildBreadcrumbSchema } from "../lib/seo/metadata";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | weFixPDF",
  description: "Get in touch with the weFixPDF team. Report bugs, ask privacy questions, submit feature requests, or inquire about business opportunities.",
  alternates: { canonical: "https://wefixpdf.com/contact" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Contact Us | weFixPDF",
    description: "Get in touch with the weFixPDF team for support, privacy questions, or business inquiries.",
    url: "https://wefixpdf.com/contact",
    siteName: "weFixPDF",
    type: "website",
    images: [{ url: "https://wefixpdf.com/wfp.png", width: 1200, height: 630, alt: "Contact weFixPDF" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | weFixPDF",
    description: "Get in touch with the weFixPDF team.",
    images: ["https://wefixpdf.com/wfp.png"],
    site: "@wefixpdf",
  },
};

const topics = [
  { icon: Bug,       label: "Tool bugs",          desc: "Something not working? Let us know exactly what happened.", color: "#EF4444", bg: "#FEF2F2" },
  { icon: Shield,    label: "Privacy questions",  desc: "Questions about how we handle your files and data.",        color: "#163863", bg: "#ECFDF5" },
  { icon: Briefcase, label: "Business inquiries", desc: "Partnerships, sponsorship, or API access.",                 color: "#2D5BE3", bg: "#E6F1FB" },
  { icon: Lightbulb, label: "Feature requests",   desc: "Have an idea for a new tool or improvement?",               color: "#F59E0B", bg: "#FFFBEB" },
];

export default function ContactPage() {
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ]);

  return (
    <div className="bg-page">
      <script id="breadcrumb-schema" type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>

      {/* ── Hero ── */}
      <section className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-[12px] mb-8" style={{ color: 'var(--text-muted)' }}>
            <Link href="/" className="transition-colors hover:underline">Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text)' }}>Contact</span>
          </nav>
          <p className="text-label mb-4">Contact</p>
          <h1 className="text-section mb-3" style={{ color: 'var(--text)' }}>Get in touch</h1>
          <p className="text-[16px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
            Have a question, found a bug, or want to share feedback? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-12">

        {/* ── Contact info ── */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] p-6 bg-card space-y-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: '#E6F1FB' }}
            >
              <Mail className="w-4 h-4" color="#2D5BE3" strokeWidth={1.75} />
            </div>
            <h2 className="text-[15px] font-medium" style={{ color: 'var(--text)' }}>Email us</h2>
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Send us a message and we&apos;ll get back to you as soon as possible.
            </p>
            <a
              href="mailto:hello@wefixpdf.com"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium"
              style={{ color: '#2D5BE3' }}
            >
              hello@wefixpdf.com <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] p-6 bg-card space-y-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: '#EAF3DE' }}
            >
              <Clock className="w-4 h-4" color="#3B6D11" strokeWidth={1.75} />
            </div>
            <h2 className="text-[15px] font-medium" style={{ color: 'var(--text)' }}>Response time</h2>
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              We aim to respond to all inquiries promptly.
            </p>
            <p className="text-[13px] font-medium" style={{ color: '#3B6D11' }}>
              Within 24–48 hours
            </p>
          </div>
        </div>

        {/* ── Topics ── */}
        <section>
          <h2 className="text-[18px] font-medium mb-2" style={{ color: 'var(--text)' }}>What can we help with?</h2>
          <p className="text-[13px] mb-6" style={{ color: 'var(--text-muted)' }}>Feel free to reach out about any of these topics.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {topics.map((topic) => (
              <div
                key={topic.label}
                className="flex items-start gap-4 p-4 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-card"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: topic.bg }}
                >
                  <topic.icon className="w-4 h-4" color={topic.color} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-[13px] font-medium" style={{ color: 'var(--text)' }}>{topic.label}</p>
                  <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{topic.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact form ── */}
        <section className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] p-6 md:p-8 bg-card">
          <h2 className="text-[18px] font-medium mb-1" style={{ color: 'var(--text)' }}>Send a message</h2>
          <p className="text-[13px] mb-6" style={{ color: 'var(--text-muted)' }}>Fill in the form below and we&apos;ll get back to you.</p>
          <ContactForm />
        </section>

      </div>
    </div>
  );
}
