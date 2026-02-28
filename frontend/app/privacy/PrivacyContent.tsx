"use client";

export default function PrivacyContent() {
  const sections = [
    {
      title: "Zero Retention Policy",
      content: "At wefixPDF, we prioritize your privacy above all else. Our 'Zero Retention' promise means that your files are processed in-memory or in a temporary secure environment and are permanently deleted immediately after conversion. We do not store, view, or share any of your data."
    },
    {
      title: "Data Collection",
      content: "We do not require accounts, email addresses, or any personal identification to use our tools. We collect minimal, anonymized usage data (such as tool popularity) only to improve our services. We do not use tracking cookies or third-party analytics that compromise your identity."
    },
    {
      title: "Security Measures",
      content: "All file transfers are protected by end-to-end encryption (SSL/TLS). Our processing engines are regularly audited for security vulnerabilities to ensure that your sensitive documents remain private during the brief window they are being reshaped."
    },
    {
      title: "Third-Party Services",
      content: "wefixPDF does not sell your data to third parties. We do not display invasive advertisements that track your browsing behavior. Our business model is built on providing value, not on monetizing your information."
    }
  ];

  return (
    <div className="space-y-16 animate-fade-in">

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {sections.map((section, i) => (
          <div key={i} className="glass dark:glass-dark rounded-[2.5rem] p-10 border border-slate-200/50 dark:border-white/5 space-y-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{section.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      {/* Contact Note */}
      <section className="glass dark:glass-dark rounded-[3rem] p-12 text-center border border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Questions about your privacy?</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto font-medium">
          We are committed to total transparency. If you have any concerns about how our tools handle your files, feel free to reach out.
        </p>
        <a href="mailto:support@wefixpdf.com" className="text-brand-primary font-black mt-2 inline-block hover:underline">
          support@wefixpdf.com
        </a>
      </section>
    </div>
  );
}
