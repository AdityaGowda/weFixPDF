// app/help/page.tsx — Comprehensive Help Center
import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, Search, FileText, Shield, Zap, Image, Lock, Merge, Scissors, RefreshCw, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center — FAQ & Support | weFixPDF",
  description:
    "Find answers to common questions about compressing PDFs, converting images, file size limits, privacy, and using all of weFixPDF's free tools.",
  alternates: { canonical: "https://wefixpdf.com/help" },
};

const categories = [
  {
    icon: <Zap className="w-5 h-5" />,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    title: "Getting Started",
    faqs: [
      { q: "Do I need to create an account to use weFixPDF?", a: "No. weFixPDF is 100% free without any account. Simply visit the tool page, upload your file, and download your result. No email, no password, no sign-up." },
      { q: "Is weFixPDF really free?", a: "Yes — completely free with no hidden limits, no daily task caps, and no paid tier. All tools are permanently free." },
      { q: "What browsers does weFixPDF work with?", a: "weFixPDF works with Chrome, Firefox, Safari, Edge, and any modern browser on desktop and mobile." },
      { q: "Does weFixPDF work on iPhone and Android?", a: "Yes. The interface is optimized for touchscreens. You can upload, process, and download files on any mobile device." },
      { q: "What file types does weFixPDF support?", a: "PDF, JPG, JPEG, PNG, WebP, HEIC, DOCX, and DOC. Different tools support different formats — see each tool page for specifics." },
    ],
  },
  {
    icon: <FileText className="w-5 h-5" />,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    title: "PDF Tools",
    faqs: [
      { q: "How do I compress a PDF?", a: "Go to the Compress PDF tool, upload your PDF, select your compression level (Standard or High Quality), and download the result. Most PDFs are reduced by 50–80%." },
      { q: "How many PDFs can I merge at once?", a: "You can merge up to 20 PDF files at once. For larger batches, run multiple merge operations." },
      { q: "Will merging PDFs reduce quality?", a: "No. PDF merging is a lossless operation — your content, fonts, images, and formatting are preserved exactly." },
      { q: "Can I reorder pages before merging?", a: "Yes. After uploading your files, drag and drop them into the correct order before clicking Merge." },
      { q: "How do I split a PDF into individual pages?", a: "Go to Split PDF, upload your file, select the page range or 'Extract all pages', and download the result as individual PDFs or a ZIP." },
      { q: "Can I convert a PDF to Word?", a: "Yes. The PDF to Word tool converts PDF to editable .docx format. Text, headings, and basic formatting are preserved." },
      { q: "Can I protect a PDF with a password?", a: "Yes. Use the Protect PDF tool to add password encryption to any PDF online." },
      { q: "How do I remove a password from a PDF?", a: "Use the Unlock PDF tool. You need to know the current password to remove it — weFixPDF does not bypass security on PDFs you don't own." },
    ],
  },
  {
    icon: <Image className="w-5 h-5" />,
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
    title: "Image Tools",
    faqs: [
      { q: "How do I compress an image?", a: "Go to Compress Image, upload your JPG, PNG, or WebP image, and download the smaller version. Quality is preserved at 80–85% by default." },
      { q: "How do I convert HEIC photos from my iPhone?", a: "Use the HEIC to JPG converter. Upload your HEIC file and download the JPG. Batch conversion is supported for multiple photos." },
      { q: "Can I convert PNG to WebP?", a: "Yes. The PNG to WebP tool converts your PNG image to the more efficient WebP format, typically reducing file size by 25–35%." },
      { q: "How do I convert an image to PDF?", a: "Use the Image to PDF tool. Upload one or more images (JPG, PNG, WebP, HEIC) and they are combined into a single PDF." },
      { q: "Does image compression affect transparency?", a: "PNG images compressed losslessly retain transparency. Avoid converting PNG with transparency to JPG — JPG does not support transparent backgrounds." },
    ],
  },
  {
    icon: <Shield className="w-5 h-5" />,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    title: "Privacy & Security",
    faqs: [
      { q: "Are my files stored on weFixPDF servers?", a: "No. Files are processed in memory and permanently deleted immediately after you download your result. There is no server-side storage." },
      { q: "Is it safe to upload confidential documents?", a: "Yes. All transfers use TLS encryption. Files are never stored, logged, or accessed by our team. They are deleted the moment you download." },
      { q: "Does anyone at weFixPDF read my files?", a: "No. Processing is fully automated. No human ever accesses your uploaded files." },
      { q: "What data does weFixPDF collect?", a: "We collect standard anonymous analytics (page views, tool usage counts) but never any file content, file metadata, or personally identifiable information." },
      { q: "Can I use weFixPDF for confidential legal or medical documents?", a: "Yes. The zero-storage, zero-retention architecture makes weFixPDF appropriate for sensitive documents. See our Security page for full technical details." },
      { q: "Is weFixPDF GDPR compliant?", a: "Yes. We do not store personal data, files, or usage patterns tied to individuals. No cookies are used for tracking." },
    ],
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    title: "File Limits & Performance",
    faqs: [
      { q: "What is the maximum file size?", a: "The free tier supports files up to 50MB. Very large scanned PDFs may need to be split before compression for best results." },
      { q: "How long does processing take?", a: "Most files process in under 10 seconds. Large PDFs (30–50MB) may take 15–30 seconds depending on your connection speed." },
      { q: "Why is my compressed PDF still large?", a: "PDFs heavy with high-resolution embedded photos can resist compression. Try splitting the document into sections and compressing separately." },
      { q: "Can I compress a password-protected PDF?", a: "You need to unlock the PDF first using the Unlock PDF tool before compression can access the content." },
      { q: "How much can I reduce PDF size?", a: "Typical compression reduces PDF size by 50–80%. A 20MB scanned PDF routinely compresses to under 3MB without visible quality loss." },
      { q: "My download didn't start. What do I do?", a: "Check your browser's pop-up blocker — it may be blocking the download. Try right-clicking the download button and selecting 'Save link as'." },
    ],
  },
  {
    icon: <Lock className="w-5 h-5" />,
    color: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
    title: "File Formats Explained",
    faqs: [
      { q: "What is the difference between PDF and DOCX?", a: "PDF is a fixed-layout format that looks identical on every device. DOCX is an editable format that may reflow differently depending on the reader's software. Use PDF for sharing final documents, DOCX for editing." },
      { q: "When should I use JPG vs PNG?", a: "Use JPG for photographs and complex images. Use PNG for logos, screenshots, and images requiring transparency or sharp crisp edges." },
      { q: "What is WebP and should I use it?", a: "WebP is Google's modern image format. It delivers 25–35% smaller files than JPG at equivalent quality. All major browsers support it. Use WebP for web images." },
      { q: "What is HEIC?", a: "HEIC (High Efficiency Image Container) is Apple's iPhone camera format. It produces smaller files at equal quality to JPG but is not universally supported. Convert to JPG for compatibility." },
      { q: "What DPI should I use for PDF?", a: "For screen viewing: 72–150 DPI. For high-quality printing: 300 DPI. For court filings and documents: 150–200 DPI achieves a good balance of readability and file size." },
    ],
  },
];

export default function HelpCenterPage() {
  const totalFaqs = categories.reduce((sum, c) => sum + c.faqs.length, 0);

  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-16 pb-12 px-4 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-black uppercase tracking-[0.2em] mb-6">
            <HelpCircle className="w-3 h-3" /> Help Center
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.1]">
            How Can We Help?
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-3">
            Find answers to {totalFaqs}+ common questions about PDF tools, image conversion, privacy, and file formats.
          </p>
        </div>

        {/* Category quick links */}
        <div className="max-w-4xl mx-auto mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((cat, i) => (
            <a
              key={i}
              href={`#${cat.title.toLowerCase().replace(/\s+/g, "-").replace(/[&]/g, "")}`}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold transition-colors hover:shadow-sm ${cat.color}`}
            >
              {cat.icon} {cat.title}
            </a>
          ))}
        </div>
      </section>

      {/* ── FAQ Sections ── */}
      <div className="max-w-4xl mx-auto px-4 py-14 space-y-16">
        {categories.map((cat, ci) => (
          <section
            key={ci}
            id={cat.title.toLowerCase().replace(/\s+/g, "-").replace(/[&]/g, "")}
          >
            {/* Section header */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${cat.color}`}>
                {cat.icon}
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                {cat.title}
              </h2>
            </div>

            {/* FAQ items */}
            <div className="space-y-2">
              {cat.faqs.map((faq, fi) => (
                <details
                  key={fi}
                  className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none gap-4">
                    <h3 className="font-bold text-slate-800 dark:text-white text-sm leading-relaxed">
                      {faq.q}
                    </h3>
                    <span className="text-blue-600 text-xl font-light group-open:rotate-45 transition-transform duration-300 shrink-0">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-500 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-50 dark:border-slate-800/50 pt-4 font-medium">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        {/* ── Still Need Help ── */}
        <section className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-violet-700 text-white text-center">
          <h2 className="text-2xl font-black mb-3">Still Have Questions?</h2>
          <p className="text-blue-200 font-medium mb-6 max-w-md mx-auto">
            Can't find an answer? Browse our tool guides or check the security page for detailed privacy information.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/security"
              className="inline-flex items-center gap-2 bg-white/20 text-white border border-white/30 font-bold px-5 py-2.5 rounded-2xl text-sm hover:bg-white/30 transition-colors"
            >
              <Shield className="w-4 h-4" /> Security Details
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-black px-5 py-2.5 rounded-2xl text-sm hover:bg-blue-50 transition-colors"
            >
              Browse All Tools <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
