import { Metadata } from "next";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer | weFixPDF",
  description: "General disclaimer for weFixPDF tools and services. Learn about our service limitations and user responsibilities.",
  alternates: { canonical: "https://wefixpdf.com/disclaimer" },
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
  const lastUpdated = "April 2026";

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b]">
      <section className="pt-10 pb-12 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-medium">
            <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-600 dark:text-slate-300">Disclaimer</span>
          </nav>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] font-black uppercase tracking-[0.2em] mb-6">
              <AlertCircle className="w-3 h-3" /> Legal Information
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.1]">
              Disclaimer
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              General terms of use and limitations of liability for the weFixPDF platform.
            </p>
            <p className="text-xs text-slate-400 mt-4 font-medium">Last Updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-10">

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              By accessing and using weFixPDF.com (the "Website"), you acknowledge that you have read, understood, and agree to be bound by the terms of this Disclaimer. If you do not agree with any part of this disclaimer, you must not use our tools or services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Nature of Service</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              weFixPDF provides browser-based and server-side file conversion and optimization tools. These tools are provided "as is" and "as available" without any warranty of any kind, either express or implied. While we strive for 100% accuracy, we do not guarantee that the output of our tools (converted, compressed, or edited files) will be perfect or error-free.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Limitation of Liability</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Under no circumstances shall weFixPDF, its owners, or developers be liable for any direct, indirect, incidental, special, or consequential damages arising out of the use or inability to use the services provided. This includes, but is not limited to:
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600 dark:text-slate-400">
              <li>Loss of data or corruption of files during processing.</li>
              <li>Incorrect conversion or formatting of documents.</li>
              <li>Service interruptions or downtime.</li>
              <li>Unauthorized access to files (despite our TLS 1.3 encryption and zero-retention policy).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. User Responsibility</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Users are solely responsible for the files they upload. You must ensure you have the legal right to process, convert, or edit any document you upload to weFixPDF. We do not monitor or review file contents, and we are not responsible for any copyright violations or illegal activities performed using our tools.
            </p>
            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed font-bold">
              Important: Always keep a backup of your original files. weFixPDF is a processing service, not a storage or backup provider.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. "Zero Retention" Policy</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              While we strictly maintain a zero-retention policy where files are deleted immediately after download, we cannot be held liable for any technical failures that may result in temporary file persistence on server memory before deletion.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. External Links</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our website may contain links to external sites that are not operated by us. We have no control over the content and practices of these sites and cannot accept responsibility or liability for their respective privacy policies or actions.
            </p>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400 italic text-center">
              If you have any questions regarding this disclaimer, please contact us via our <Link href="/contact" className="text-blue-500 hover:underline">Contact Page</Link>.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
