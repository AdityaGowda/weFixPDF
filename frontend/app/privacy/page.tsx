import { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy - Zero Data Retention | weFixPDF",
  description: "weFixPDF privacy policy. We never store your files. Zero retention, in-memory processing, complete privacy protection.",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tighter">
          Privacy Policy
        </h1>
        <p className="subtitle text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Your files are processed in-memory only. Zero retention, zero tracking.
        </p>
      </section>
      <PrivacyContent />
    </div>
  );
}
