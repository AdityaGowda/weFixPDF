"use client";

export default function TermsContent() {
  const terms = [
    {
      title: "Usage Agreement",
      content: "By accessing weFixPDF, you agree to use our tools responsibly and for lawful purposes only. You are solely responsible for the content you upload for conversion."
    },
    {
      title: "Service Scope",
      content: "Our services are provided on an 'as is' basis. While we strive for 100% accuracy and availability, we do not guarantee that our tools will always be free from interruptions or that all conversions will be error-free."
    },
    {
      title: "Intellectual Property",
      content: "We do not claim ownership of any files you upload. Likewise, all design elements, code, and logos of wefixPDF are protected by intellectual property laws and may not be reused without permission."
    },
    {
      title: "User Obligations",
      content: "Users must not attempt to circumvent our security features, reverse-engineer our tools, or use our services for malicious activities. We reserve the right to block access to anyone violating these terms."
    }
  ];

  return (
    <div className="space-y-16 animate-fade-in">

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
      </section>
    </div>
  );
}
