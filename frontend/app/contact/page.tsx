import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Clock, Bug, Shield, Briefcase, Lightbulb } from "lucide-react";
import { buildBreadcrumbSchema } from "../lib/seo/metadata";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | weFixPDF",
  description:
    "Get in touch with the weFixPDF team. Report bugs, ask privacy questions, submit feature requests, or inquire about business opportunities.",
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
  { icon: Bug, label: "Tool bugs", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20", desc: "Something not working as expected? Let us know." },
  { icon: Shield, label: "Privacy questions", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20", desc: "Questions about how we handle your data." },
  { icon: Briefcase, label: "Business inquiries", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20", desc: "Partnership, sponsorship, or API access." },
  { icon: Lightbulb, label: "Feature requests", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20", desc: "Have an idea for a new tool or improvement?" },
];

export default function ContactPage() {
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ]);

  return (
    <div className="min-h-screen">
      <script id="breadcrumb-schema" type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-0 max-[950px]:mt-8 font-medium">
        <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
        <ArrowRight className="w-3 h-3 text-slate-300" />
        <span className="text-slate-600 dark:text-slate-300">Contact</span>
      </nav>

      {/* Hero */}
      <section className="pt-10 pb-12 px-4 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[11px] font-black uppercase tracking-[0.2em] mb-6">
            <Mail className="w-3 h-3" /> Contact Us
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.1]">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Have a question, found a bug, or want to share feedback? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-14 space-y-16">

        {/* Contact Cards */}
        <section className="grid sm:grid-cols-2 gap-6">
          <div className="glass dark:glass-dark rounded-[2.5rem] p-8 border border-slate-200/50 dark:border-white/5 space-y-4 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-brand-primary" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Email Us</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">
              Send us a message and we'll get back to you as soon as possible.
            </p>
            <a
              href="mailto:hello@wefixpdf.com"
              className="inline-flex items-center gap-2 text-brand-primary font-black text-sm hover:underline"
            >
              hello@wefixpdf.com <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="glass dark:glass-dark rounded-[2.5rem] p-8 border border-slate-200/50 dark:border-white/5 space-y-4 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Response Time</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">
              We aim to respond to all inquiries promptly.
            </p>
            <p className="text-emerald-600 dark:text-emerald-400 font-black text-sm">
              We reply within 24–48 hours
            </p>
          </div>
        </section>

        {/* Topics */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">What can we help with?</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Feel free to reach out about any of these topics.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {topics.map((topic, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 p-5 rounded-2xl border ${topic.color}`}
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${topic.color}`}>
                  <topic.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-black text-sm">{topic.label}</p>
                  <p className="text-xs font-medium mt-1 opacity-80">{topic.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="glass dark:glass-dark rounded-[2.5rem] p-8 md:p-12 border border-slate-200/50 dark:border-white/5 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Send a Message</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Fill in the form below and we'll get back to you.</p>
          </div>
          <ContactForm />
        </section>

      </div>
    </div>
  );
}
