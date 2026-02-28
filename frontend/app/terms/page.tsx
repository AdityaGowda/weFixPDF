"use client";

export default function TermsPage() {
  const terms = [
    {
      title: "Usage Agreement",
      content: "By accessing ConvertLite, you agree to use our tools responsibly and for lawful purposes only. You are solely responsible for the content you upload for conversion."
    },
    {
      title: "Service Scope",
      content: "Our services are provided on an 'as is' basis. While we strive for 100% accuracy and availability, we do not guarantee that our tools will always be free from interruptions or that all conversions will be error-free."
    },
    {
      title: "Intellectual Property",
      content: "We do not claim ownership of any files you upload. Likewise, all design elements, code, and logos of ConvertLite are protected by intellectual property laws and may not be reused without permission."
    },
    {
      title: "User Obligations",
      content: "Users must not attempt to circumvent our security features, reverse-engineer our tools, or use our services for malicious activities. We reserve the right to block access to anyone violating these terms."
    }
  ];

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Header */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100 dark:border-indigo-500/20">
          General Terms
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tighter">
          Standard <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Terms of Service.</span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Our terms are simple, clear, and designed to protect both the user and the platform.
        </p>
      </section>

      {/* Terms Grid */}
      <div className="grid md:grid-cols-2 gap-10">
        {terms.map((term, i) => (
          <div key={i} className="glass dark:glass-dark rounded-[2.5rem] p-10 border border-slate-200/50 dark:border-white/5 space-y-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{term.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {term.content}
            </p>
          </div>
        ))}
      </div>

      {/* Note Section */}
      <section className="glass dark:glass-dark rounded-[3rem] p-12 text-center border border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Fair Usage Notice</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto font-medium">
          We offer these tools for free to provide maximum value. If you plan to use our services for heavy automated processing, please contact us for API access.
        </p>
        <div className="inline-flex items-center gap-2 text-brand-primary font-bold">
          legal@convertlite.com
        </div>
      </section>
    </div>
  );
}
