import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Secure File Converter | wefixPDF",
  description: "Learn about wefixPDF's mission to provide secure, private file conversion tools. Zero data retention, encrypted processing, and instant results.",
  alternates: {
    canonical: "/about",
  },
};

const FeatureItem = ({ children, upcoming }: { children: React.ReactNode; upcoming?: boolean }) => (
  <li className={`flex items-start justify-between gap-3 text-slate-500 dark:text-slate-400 ${upcoming ? 'opacity-60 grayscale' : ''}`}>
    <div className="flex items-start gap-3">
      <span className={`${upcoming ? 'text-amber-500' : 'text-emerald-500'} font-bold mt-0.5`}>✓</span>
      <span>{children}</span>
    </div>
    {upcoming ? (
      <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 whitespace-nowrap">
        Soon
      </span>
    ) : (
      <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
        Active
      </span>
    )}
  </li>
);

const FeatureCard = ({ title, icon, items, colorClass }: { title: string; icon: string; items: { label: string; upcoming?: boolean }[]; colorClass: string }) => (
  <div className={`glass dark:glass-dark rounded-4xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-slate-200/50 dark:border-white/5`}>
    <div className={`w-14 h-14 ${colorClass} rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{title}</h3>
    <ul className="space-y-4 font-medium">
      {items.map((item, i) => (
        <FeatureItem key={i} upcoming={item.upcoming}>{item.label}</FeatureItem>
      ))}
    </ul>
  </div>
);

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto py-20 px-0 sm:px-6 space-y-32">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold tracking-widest uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
          </span>
          Secure File Processing
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tighter leading-[1.05] px-4">
          About wefixPDF
        </h1>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium px-4">
          We build fast, secure and private file conversion tools. Your files are never stored. Once processed, they are instantly deleted from our system.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="grid md:grid-cols-3 gap-10">
        <FeatureCard 
          title="PDF Suite"
          icon="📄"
          colorClass="bg-rose-50 text-rose-600"
          items={[
            { label: "High-quality conversions" },
            { label: "Multiple format support" },
            { label: "Smart PDF merging", upcoming: true },
            { label: "Flexible page splitting", upcoming: true },
            { label: "PDF compression", upcoming: true },
            { label: "Page rotation tools", upcoming: true },
          ]}
        />
        <FeatureCard 
          title="Image Tools"
          icon="🖼️"
          colorClass="bg-brand-primary/10 text-brand-primary"
          items={[
            { label: "All-format support" },
            { label: "Smart compression" },
            { label: "Batch processing" },
            { label: "HEIC to JPG converter", upcoming: true },
            { label: "Image resize & crop", upcoming: true },
            { label: "Format conversion", upcoming: true }
          ]}
        />
        <FeatureCard 
          title="Document Tools"
          icon="📚"
          colorClass="bg-violet-50 text-violet-600"
          items={[
            { label: "Word to PDF", upcoming: true },
            { label: "Excel to PDF", upcoming: true },
            { label: "PowerPoint conversion", upcoming: true },
            { label: "OCR text extraction", upcoming: true },
            { label: "Document merging", upcoming: true },
            { label: "Watermark tools", upcoming: true }
          ]}
        />
      </section>

      {/* Advantage Section */}
      <section className="glass dark:glass-dark rounded-[4rem] p-10 md:p-20 text-slate-900 dark:text-white relative overflow-hidden text-center group border border-slate-200/50 dark:border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] -mr-[250px] -mt-[250px] transition-transform duration-1000 group-hover:scale-150" />
        
        <div className="relative z-10 space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The wefixPDF Difference</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Privacy, security, and speed—built in.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center text-3xl">⚡</div>
              <h4 className="text-2xl font-bold">Lightning Fast</h4>
              <p className="text-slate-400 leading-relaxed font-medium">Optimized servers process most files in under a second.</p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center text-3xl">🔒</div>
              <h4 className="text-2xl font-bold">Secure Processing</h4>
              <p className="text-slate-400 leading-relaxed font-medium">End-to-end encryption. Files automatically deleted after conversion.</p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center text-3xl">🎯</div>
              <h4 className="text-2xl font-bold">Simple Interface</h4>
              <p className="text-slate-400 leading-relaxed font-medium">Clean design with no clutter. Just the tools you need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Why Choose wefixPDF</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">What makes us different from other file converters.</p>
        </div>

        <div className="overflow-x-auto rounded-[2rem] sm:rounded-[3rem] glass dark:glass-dark shadow-2xl border border-slate-200/50 dark:border-white/5 mx-[-1rem] sm:mx-0">
          <table className="w-full text-left border-collapse bg-slate-50/50 dark:bg-white/5 min-w-[600px] sm:min-w-0">
            <thead>
              <tr className="bg-slate-100/50 dark:bg-white/5">
                <th className="p-4 sm:p-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Feature</th>
                <th className="p-4 sm:p-8 text-xs sm:text-sm font-black text-brand-primary uppercase tracking-[0.2em] bg-brand-primary/5">wefixPDF</th>
                <th className="p-4 sm:p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Others</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-white/5 font-medium text-slate-600 dark:text-slate-400">
              <tr className="hover:bg-brand-primary/5 transition-colors group">
                <td className="p-4 sm:p-8 font-bold text-slate-900 dark:text-white">Data Retention</td>
                <td className="p-4 sm:p-8 text-brand-primary font-black bg-brand-primary/5">Zero ★</td>
                <td className="p-4 sm:p-8">Varies</td>
              </tr>
              <tr className="hover:bg-brand-primary/5 transition-colors group">
                <td className="p-4 sm:p-8 font-bold text-slate-900 dark:text-white">File Encryption</td>
                <td className="p-4 sm:p-8 text-brand-primary font-black bg-brand-primary/5">End-to-End ✓</td>
                <td className="p-4 sm:p-8">Partial</td>
              </tr>
              <tr className="hover:bg-brand-primary/5 transition-colors group">
                <td className="p-4 sm:p-8 font-bold text-slate-900 dark:text-white">Processing Speed</td>
                <td className="p-4 sm:p-8 text-brand-primary font-black bg-brand-primary/5">Sub-Second</td>
                <td className="p-4 sm:p-8">2-5 Seconds</td>
              </tr>
              <tr className="hover:bg-brand-primary/5 transition-colors group">
                <td className="p-4 sm:p-8 font-bold text-slate-900 dark:text-white">Interface</td>
                <td className="p-4 sm:p-8 text-brand-primary font-black bg-brand-primary/5">Clean & Modern</td>
                <td className="p-4 sm:p-8">Cluttered</td>
              </tr>
              <tr className="hover:bg-brand-primary/5 transition-colors group">
                <td className="p-4 sm:p-8 font-bold text-slate-900 dark:text-white">Dark Mode</td>
                <td className="p-4 sm:p-8 text-brand-primary font-black bg-brand-primary/5">Native ✓</td>
                <td className="p-4 sm:p-8">Limited</td>
              </tr>
              <tr className="hover:bg-brand-primary/5 transition-colors group">
                <td className="p-4 sm:p-8 font-bold text-slate-900 dark:text-white">Ads</td>
                <td className="p-4 sm:p-8 text-brand-primary font-black bg-brand-primary/5">None ✓</td>
                <td className="p-4 sm:p-8">Heavy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Call to action */}
      <section className="relative text-center bg-brand-primary rounded-[4rem] p-16 md:p-32 text-white shadow-3xl shadow-brand-primary/30 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-secondary/40 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-none">Ready to start <br />converting?</h2>
          <p className="text-indigo-100 text-xl font-medium">
            Experience secure, private file conversion <br className="hidden md:block" /> with zero data retention.
          </p>
          <div className="pt-6">
            <a 
              href="/" 
              className="inline-flex items-center justify-center px-12 py-6 rounded-3xl bg-white text-brand-primary font-black text-2xl hover:bg-slate-50 hover:scale-110 active:scale-90 transition-all duration-500 shadow-2xl"
            >
              Try It Now
            </a>
          </div>
          <div className="pt-8 text-indigo-100/40 text-xs font-bold tracking-[0.3em] uppercase">
            Built with privacy in mind • Secure • Fast
          </div>
        </div>
      </section>
    </div>
  );
}