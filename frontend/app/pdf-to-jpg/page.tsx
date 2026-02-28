import { Metadata } from "next";
import { Clock, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "PDF to JPG Converter - Free Online Tool | wefixPDF",
  description: "Convert PDF to JPG online free. Extract images from PDF or convert entire pages. No file limits, instant conversion.",
};

export default function PdfToJpgPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-0 sm:px-6 text-center space-y-12 animate-fade-in">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-black uppercase tracking-widest">
          <Clock className="w-4 h-4" />
          Coming Soon
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
          PDF to JPG Converter
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
          Extract images from PDF or convert entire pages to high-quality JPGs. No file limits, 100% private.
        </p>
      </div>

      <div className="glass dark:glass-dark rounded-[3rem] p-16 border border-slate-200/50 dark:border-white/5 space-y-8">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-primary/10 flex items-center justify-center text-5xl">
          🏗️
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Under Construction</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          We're fine-tuning our PDF engine to ensure the highest quality results with our signature zero-retention privacy.
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
