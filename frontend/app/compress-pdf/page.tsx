import { Metadata } from "next";
import { Clock, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Compress PDF Online - Reduce PDF File Size Free | wefixPDF",
  description: "Compress PDF files online without losing quality. Reduce PDF size by up to 90%. Fast, free, and secure compression.",
};

export default function CompressPdfPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-0 sm:px-6 text-center space-y-12 animate-fade-in">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-black uppercase tracking-widest">
          <Clock className="w-4 h-4" />
          Coming Soon
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
          Compress PDF Online
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
          Reduce PDF file size by up to 90% without losing quality. Fast, free, and secure compression.
        </p>
      </div>

      <div className="glass dark:glass-dark rounded-[3rem] p-16 border border-slate-200/50 dark:border-white/5 space-y-8">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-primary/10 flex items-center justify-center text-5xl">
          🏗️
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Under Construction</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Our compression algorithms are being optimized to provide the best possible reduction while maintaining perfect legibility.
        </p>
        <div className="pt-6">
          <a
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
