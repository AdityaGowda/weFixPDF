"use client";

export default function PrivacyContent() {
  const sections = [
    {
      title: "Files Never Stored",
      content: "At wefixPDF, we prioritize your privacy above all else. Your files are processed securely and permanently deleted immediately after conversion. We do not store, view, or share your files with anyone."
    },
    {
      title: "What We Collect",
      content: "We do not collect or store any of your files or personal data. Your conversions are completely anonymous. We do not track your activity or create user profiles."
    },
    {
      title: "Security & Encryption",
      content: "All file transfers are protected by end-to-end encryption (SSL/TLS). Our processing systems are regularly audited for security vulnerabilities to ensure your documents remain completely private during conversion."
    },
    {
      title: "Your Data Rights",
      content: "wefixPDF does not sell your data to third parties. We do not display invasive advertisements that track your browsing behavior. Your files are yours alone."
    },
    {
      title: "File Processing",
      content: "Files are processed in a secure, isolated environment. All uploaded files are automatically and permanently deleted from our servers immediately after conversion completes."
    },
    {
      title: "No Tracking",
      content: "We do not use cookies for tracking or analytics. We do not monitor your browsing behavior. Your use of wefixPDF is completely private and anonymous."
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

      {/* Privacy Commitment */}
      {/* <section className="glass dark:glass-dark rounded-[3rem] p-12 text-center border border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Questions about your privacy?</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto font-medium">
          We are committed to transparency. If you have any concerns about how we handle your data, please contact us.
        </p>
        <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
          Last updated: March 2026
        </p>
      </section> */}
    </div>
  );
}