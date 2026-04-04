import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Shield, Zap, FileJson, CheckCircle, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "The weFixPDF Team — PDF & File Conversion Specialists",
  description: "Meet the team of specialists building and maintaining weFixPDF. Experts in PDF processing, document security, and privacy-first file conversion.",
  alternates: { canonical: "https://wefixpdf.com/authors/wefixpdf-team" },
};

const ExpertiseCard = ({ title, icon: Icon }: { title: string; icon: any }) => (
  <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
      <Icon className="w-5 h-5" />
    </div>
    <span className="font-bold text-sm text-slate-700 dark:text-slate-300">{title}</span>
  </div>
);

export default function AuthorProfilePage() {
  return (
    <div className="min-h-screen pt-20 pb-32">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16 pb-16 border-b border-slate-100 dark:border-slate-800">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-600 to-violet-700 flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-blue-500/20 shrink-0">
            W
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
              The weFixPDF Team
            </h1>
            <p className="text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-[0.2em] mb-6">
              PDF & File Conversion Specialists
            </p>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
              Our team builds and maintains weFixPDF with a focus on privacy-first file conversion architecture. With years of hands-on experience in PDF processing and document security, we test every tool ourselves before publishing any guides. Our mission is to provide genuinely free, secure, and fast tools for everyday document workflows.
            </p>
          </div>
        </div>

        {/* Expertise Section */}
        <div className="mb-16">
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-8 tracking-tight flex items-center gap-3">
            <div className="w-1 h-6 rounded-full bg-blue-500" />
            Core Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ExpertiseCard title="PDF Compression" icon={Zap} />
            <ExpertiseCard title="Image Format Conversion" icon={FileJson} />
            <ExpertiseCard title="Document Security" icon={Shield} />
            <ExpertiseCard title="Web Performance" icon={Zap} />
          </div>
        </div>

        {/* Editorial Standards */}
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16" />
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-500" />
            Our Editorial Standards
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed mb-6">
            Every article on weFixPDF is written by the same engineers and specialists who build the tools. We don&apos;t use AI to write our guides because document security and file conversion require practical, technical knowledge that only comes from building the infrastructure itself.
          </p>
          <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-blue-500" /> Expert Verified</span>
            <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-blue-500" /> Hands-on Testing</span>
            <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-blue-500" /> Privacy First</span>
          </div>
        </div>
      </div>
    </div>
  );
}
