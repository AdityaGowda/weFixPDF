import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About wefixPDF | Powerful & Free Online File Conversion",
  description: "Convert between dozens of file formats with professional quality. No software installation required. Fast, secure, and ad-free.",
};

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3 text-slate-500 dark:text-slate-400">
    <span className="text-brand-secondary font-bold mt-0.5">✓</span>
    <span>{children}</span>
  </li>
);

const FeatureCard = ({ title, icon, items, colorClass }: { title: string; icon: string; items: string[]; colorClass: string }) => (
  <div className={`glass dark:glass-dark rounded-4xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-slate-200/50 dark:border-white/5`}>
    <div className={`w-14 h-14 ${colorClass} rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{title}</h3>
    <ul className="space-y-4 font-medium">
      {items.map((item, i) => (
        <FeatureItem key={i}>{item}</FeatureItem>
      ))}
    </ul>
  </div>
);

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto py-20 px-6 space-y-32">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold tracking-widest uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
          </span>
          Modern File Processing
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tighter leading-[1.05]">
          A simpler way to <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">reshape your media safely.</span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Professional-grade, browser-native file conversion tools designed for speed and total privacy. No accounts, no tracking, just pure utility.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="grid md:grid-cols-3 gap-10">
        <FeatureCard 
          title="PDF Suite"
          icon="📄"
          colorClass="bg-rose-50 text-rose-600"
          items={[
            "Premium quality presets",
            "Smart PDF merging",
            "Range-based splitting",
            "Precise page rotation",
            "Lossless conversions",
            "Universal support"
          ]}
        />
        <FeatureCard 
          title="Image Engine"
          icon="🖼️"
          colorClass="bg-brand-primary/10 text-brand-primary"
          items={[
            "All-format support",
            "HEIC to JPG converter",
            "Lossless compression",
            "Visual resize & crop",
            "Batch processing",
            "Creative filter engine"
          ]}
        />
        <FeatureCard 
          title="Video & Data"
          icon="🎬"
          colorClass="bg-violet-50 text-violet-600"
          items={[
            "Format transcoder",
            "Document bridge (↔)",
            "CSV automation",
            "Presentation tools",
            "AI-powered OCR",
            "Bulk data extraction"
          ]}
        />
      </section>

      {/* Advantage Section */}
      <section className="glass dark:glass-dark rounded-[4rem] p-10 md:p-20 text-slate-900 dark:text-white relative overflow-hidden text-center group border border-slate-200/50 dark:border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] -mr-[250px] -mt-[250px] transition-transform duration-1000 group-hover:scale-150" />
        
        <div className="relative z-10 space-y-16">
          <div className="space-y-4">
                      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The wefixPDF Edge</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No compromises. Just performance.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center text-3xl">⚡</div>
              <h4 className="text-2xl font-bold">Instant</h4>
              <p className="text-slate-400 leading-relaxed font-medium">Server-side optimization ensures sub-second processing for most files.</p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center text-3xl">🔒</div>
              <h4 className="text-2xl font-bold">Military-Grade</h4>
              <p className="text-slate-400 leading-relaxed font-medium">We use end-to-end temp encryption. Files vanish 30 minutes after use.</p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center text-3xl">🚫</div>
              <h4 className="text-2xl font-bold">Zero Noise</h4>
              <p className="text-slate-400 leading-relaxed font-medium">No ads, no trackers, no accounts. Just the tool you came for.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Transparency First</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">How we compare to established tools.</p>
        </div>

        <div className="overflow-hidden rounded-[3rem] glass dark:glass-dark shadow-2xl border border-slate-200/50 dark:border-white/5">
          <table className="w-full text-left border-collapse bg-slate-50/50 dark:bg-white/5">
            <thead>
              <tr className="bg-slate-100/50 dark:bg-white/5">
                <th className="p-8 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Capability</th>
                              <th className="p-8 text-sm font-black text-brand-primary uppercase tracking-[0.2em] bg-brand-primary/5">wefixPDF</th>
                <th className="p-8 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">iLovePDF</th>
                <th className="p-8 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Smallpdf</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-white/5 font-medium text-slate-600 dark:text-slate-400">
              <tr className="hover:bg-brand-primary/5 transition-colors group">
                <td className="p-8 font-bold text-slate-900 dark:text-white">Free daily limit</td>
                <td className="p-8 text-brand-primary font-black bg-brand-primary/5">Unlimited ★</td>
                <td className="p-8">3 Files</td>
                <td className="p-8">2 Files</td>
              </tr>
              <tr className="hover:bg-brand-primary/5 transition-colors group">
                <td className="p-8 font-bold text-slate-900 dark:text-white">User Experience</td>
                <td className="p-8 text-brand-primary font-black bg-brand-primary/5">Clean & Pro</td>
                <td className="p-8">Ad-Heavy</td>
                <td className="p-8">Restricted</td>
              </tr>
              <tr className="hover:bg-brand-primary/5 transition-colors group">
                <td className="p-8 font-bold text-slate-900 dark:text-white">Cost per month</td>
                <td className="p-8 text-brand-primary font-black bg-brand-primary/5">$0.00</td>
                <td className="p-8">$9.00</td>
                <td className="p-8">$12.00</td>
              </tr>
              <tr className="hover:bg-brand-primary/5 transition-colors group">
                <td className="p-8 font-bold text-slate-900 dark:text-white">Dark Mode Support</td>
                <td className="p-8 text-brand-primary font-black bg-brand-primary/5">Native ✓</td>
                <td className="p-8">✗</td>
                <td className="p-8">✗</td>
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
            Join thousands of monthly users who trust our minimal, <br className="hidden md:block" /> powerful tools. 
          </p>
          <div className="pt-6">
            <a 
              href="/" 
              className="inline-flex items-center justify-center px-12 py-6 rounded-3xl bg-white text-brand-primary font-black text-2xl hover:bg-slate-50 hover:scale-110 active:scale-90 transition-all duration-500 shadow-2xl"
            >
              Convert Now
            </a>
          </div>
          <div className="pt-8 text-indigo-100/40 text-xs font-bold tracking-[0.3em] uppercase">
            Built for the modern web • v0.1.0
          </div>
        </div>
      </section>
    </div>
  );
}
