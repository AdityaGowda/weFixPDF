import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, ArrowRight, Mail } from "lucide-react";
import { buildBreadcrumbSchema, buildFaqSchema } from "../lib/seo/metadata";

export const metadata: Metadata = {
  title: "Help Center — FAQ & Support | weFixPDF",
  description: "Find answers to common questions about compressing PDFs, converting images, file size limits, privacy, and using all of weFixPDF's free tools.",
  alternates: { canonical: "https://wefixpdf.com/help" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Help Center — FAQ & Support | weFixPDF",
    description: "Answers to common questions about PDF compression, image conversion, privacy, and all weFixPDF tools.",
    url: "https://wefixpdf.com/help",
    siteName: "weFixPDF",
    type: "website",
    images: [{ url: "https://wefixpdf.com/wfp.png", width: 1200, height: 630, alt: "weFixPDF Help Center" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Help Center | weFixPDF",
    description: "Answers to common questions about PDF compression, image conversion, and privacy.",
    images: ["https://wefixpdf.com/wfp.png"],
    site: "@wefixpdf",
  },
};

const categories = [
  {
    id: "getting-started",
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
    id: "pdf-tools",
    title: "PDF Tools",
    faqs: [
      { q: "How do I compress a PDF?", a: "Go to the Compress PDF tool, upload your PDF, select your compression level, and download the result. Most PDFs are reduced by 50–80%." },
      { q: "How many PDFs can I merge at once?", a: "You can merge up to 20 PDF files at once. For larger batches, run multiple merge operations." },
      { q: "Will merging PDFs reduce quality?", a: "No. PDF merging is a lossless operation — your content, fonts, images, and formatting are preserved exactly." },
      { q: "Can I reorder pages before merging?", a: "Yes. After uploading your files, drag and drop them into the correct order before clicking Merge." },
      { q: "How do I split a PDF into individual pages?", a: "Go to Split PDF, upload your file, select the page range or 'Extract all pages', and download the result." },
      { q: "Can I convert a PDF to Word?", a: "Yes. The PDF to Word tool converts PDF to editable .docx format. Text, headings, and basic formatting are preserved." },
      { q: "Can I protect a PDF with a password?", a: "Yes. Use the Protect PDF tool to add password encryption to any PDF online." },
      { q: "How do I remove a password from a PDF?", a: "Use the Unlock PDF tool. You need to know the current password to remove it — weFixPDF does not bypass security on PDFs you don't own." },
    ],
  },
  {
    id: "image-tools",
    title: "Image Tools",
    faqs: [
      { q: "How do I compress an image?", a: "Go to Compress Image, upload your JPG, PNG, or WebP image, and download the smaller version. Quality is preserved at 80–85% by default." },
      { q: "How do I convert HEIC photos from my iPhone?", a: "Use the HEIC to JPG converter. Upload your HEIC file and download the JPG. Batch conversion is supported for multiple photos." },
      { q: "Can I convert PNG to WebP?", a: "Yes. The PNG to WebP tool converts your PNG image to the more efficient WebP format, typically reducing file size by 25–35%." },
      { q: "Does image compression affect transparency?", a: "PNG images compressed losslessly retain transparency. Avoid converting PNG with transparency to JPG — JPG does not support transparent backgrounds." },
      { q: "How do I convert an image to PDF?", a: "Use the Image to PDF tool. Upload one or more images (JPG, PNG, WebP, HEIC) and they are combined into a single PDF." },
    ],
  },
  {
    id: "privacy-security",
    title: "Privacy & Security",
    faqs: [
      { q: "Are my files stored on weFixPDF servers?", a: "No. Files are processed in memory and permanently deleted immediately after you download your result. There is no server-side storage." },
      { q: "Is it safe to upload confidential documents?", a: "Yes. All transfers use TLS encryption. Files are never stored, logged, or accessed by our team. They are deleted the moment you download." },
      { q: "Does anyone at weFixPDF read my files?", a: "No. Processing is fully automated. No human ever accesses your uploaded files." },
      { q: "What data does weFixPDF collect?", a: "We collect anonymous analytics via Google Analytics 4 and use third-party advertising cookies through Google AdSense. These are only enabled if you provide explicit consent via our cookie banner. We never collect file content or personally identifiable information." },
      { q: "Can I use weFixPDF for confidential legal or medical documents?", a: "Yes. The zero-storage, zero-retention architecture makes weFixPDF appropriate for sensitive documents. We process files in-memory and delete them immediately." },
      { q: "Is weFixPDF GDPR compliant?", a: "Yes. We do not store personal data or file contents. Non-essential cookies (Analytics and Advertising) are blocked by default and only load after you click 'Accept' on our consent banner." },

    ],
  },
  {
    id: "file-limits",
    title: "File Limits & Performance",
    faqs: [
      { q: "What is the maximum file size?", a: "Files up to 100MB are supported. Very large scanned PDFs may need to be split before compression for best results." },
      { q: "How long does processing take?", a: "Most files process in under 3 seconds. Large PDFs (30–50MB) may take 10–15 seconds depending on your connection speed." },
      { q: "Why is my compressed PDF still large?", a: "PDFs heavy with high-resolution embedded photos can resist compression. Try splitting the document and compressing each section separately." },
      { q: "Can I compress a password-protected PDF?", a: "You need to unlock the PDF first using the Unlock PDF tool before compression can access the content." },
      { q: "How much can I reduce PDF size?", a: "Typical compression reduces PDF size by 50–80%. A 20MB scanned PDF routinely compresses to under 3MB without visible quality loss." },
      { q: "My download didn't start. What do I do?", a: "Check your browser's pop-up blocker — it may be blocking the download. Try right-clicking the download button and selecting 'Save link as'." },
    ],
  },
  {
    id: "file-formats",
    title: "File Formats Explained",
    faqs: [
      { q: "What is the difference between PDF and DOCX?", a: "PDF is a fixed-layout format that looks identical on every device. DOCX is an editable format that may reflow depending on the reader's software. Use PDF for sharing final documents, DOCX for editing." },
      { q: "When should I use JPG vs PNG?", a: "Use JPG for photographs and complex images. Use PNG for logos, screenshots, and images requiring transparency or sharp crisp edges." },
      { q: "What is WebP and should I use it?", a: "WebP is Google's modern image format. It delivers 25–35% smaller files than JPG at equivalent quality. All major browsers support it. Use WebP for web images." },
      { q: "What is HEIC?", a: "HEIC (High Efficiency Image Container) is Apple's iPhone camera format. It produces smaller files than JPG but is not universally supported. Convert to JPG for broad compatibility." },
      { q: "What DPI should I use for PDF?", a: "For screen viewing: 72–150 DPI. For printing: 300 DPI. For court filings and documents: 150–200 DPI is a good balance of readability and file size." },
    ],
  },
];

export default function HelpCenterPage() {
  const totalFaqs = categories.reduce((sum, c) => sum + c.faqs.length, 0);
  const allFaqs = categories.flatMap((c) => c.faqs);
  const faqSchema = buildFaqSchema(allFaqs);
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Help Center", href: "/help" },
  ]);

  return (
    <div className="bg-page">
      <script id="faq-schema" type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script id="breadcrumb-schema" type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>

      <section className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-[12px] mb-8" style={{ color: 'var(--text-muted)' }}>
            <Link href="/" className="transition-colors hover:underline">Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text)' }}>Help Center</span>
          </nav>
          <p className="text-label mb-4">Help Center</p>
          <h1 className="text-section mb-3" style={{ color: 'var(--text)' }}>
            How can we help?
          </h1>
          <p className="text-[16px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
            Answers to {totalFaqs}+ common questions about PDF tools, image conversion, privacy, and file formats.
          </p>

          <div className="flex flex-wrap gap-2 mt-8">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="text-[12px] font-medium px-3 py-1.5 rounded-md border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] hover:border-[#2D5BE3] dark:hover:border-[#5B82FF] hover:text-[#2D5BE3] dark:hover:text-[#5B82FF] transition-colors" style={{ color: 'var(--text-muted)' }}
              >
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-14">
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id}>
            <h2 className="text-[18px] font-medium mb-6 pb-4 border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]" style={{ color: 'var(--text)' }}>
              {cat.title}
            </h2>
            <div>
              {cat.faqs.map((faq, fi) => (
                <details
                  key={fi}
                  className="group border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] last:border-0"
                >
                  <summary className="flex items-center justify-between py-4 cursor-pointer list-none gap-4">
                    <h3 className="text-[14px] font-medium leading-snug" style={{ color: 'var(--text)' }}>
                      {faq.q}
                    </h3>
                    <ChevronDown className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-open:rotate-180" style={{ color: 'var(--text-muted)' }} />
                  </summary>
                  <div className="pb-4 text-[14px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] p-8 bg-card">
          <h2 className="text-[18px] font-medium mb-2" style={{ color: 'var(--text)' }}>Still have questions?</h2>
          <p className="text-[14px] mb-6" style={{ color: 'var(--text-muted)' }}>
            Can&apos;t find an answer? Email us — we reply within 24–48 hours.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:hello@wefixpdf.com" className="btn-primary">
              <Mail className="w-4 h-4" />
              hello@wefixpdf.com
            </a>
            <Link href="/security" className="btn-ghost">
              Security details
            </Link>
            <Link href="/tools" className="btn-ghost">
              Browse tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
