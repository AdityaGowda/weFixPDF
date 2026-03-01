// lib/seo/seoData.ts
// ─────────────────────────────────────────────────────────────
// Master SEO database for all ~100 pages on wefixpdf.com
// ─────────────────────────────────────────────────────────────

export type PageType = "tool" | "blog" | "compare" | "usecase" | "format";

export interface FaqItem {
  q: string;
  a: string;
}

export interface RelatedTool {
  label: string;
  href: string;
}

export interface HowItWorksStep {
  title: string;
  desc: string;
}

export interface SeoPage {
  type: PageType;
  slug: string;
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  keywords: string;
  howItWorks?: HowItWorksStep[];
  features?: string[];
  faq?: FaqItem[];
  related?: RelatedTool[];
}

// ─────────────────────────────────────────────────────────────
// TOOL PAGES (14)
// ─────────────────────────────────────────────────────────────
export const toolPages: SeoPage[] = [
  {
    type: "tool", slug: "jpg-to-png",
    title: "JPG to PNG Converter — Free Online | wefixPDF",
    description: "Convert JPG to PNG online free. Lossless quality, transparent background support, instant conversion. No watermarks or sign-up.",
    h1: "JPG to PNG Converter",
    subtitle: "Convert JPG and JPEG images to PNG instantly. Lossless, free, and 100% private.",
    keywords: "jpg to png, jpeg to png, convert jpg to png free, jpg to png online, lossless jpg to png",
    howItWorks: [
      { title: "Upload your JPG", desc: "Drag and drop or click to select your JPG or JPEG file." },
      { title: "Auto convert", desc: "Our engine instantly converts your file to PNG with zero quality loss." },
      { title: "Download PNG", desc: "Click retrieve to download your new PNG file immediately." },
    ],
    features: ["Lossless conversion", "Transparent background preserved", "No file size limits", "Zero data retention", "No sign-up required"],
    faq: [
      { q: "Is JPG to PNG conversion lossless?", a: "Yes. PNG is a lossless format so converting JPG to PNG preserves all visible detail, though it may not recover data already lost in the original JPG compression." },
      { q: "Will my transparent background be preserved?", a: "PNG supports transparency. If your JPG had a white background, it stays white — PNG just opens the door for future transparency edits." },
      { q: "Is there a file size limit?", a: "No. wefixPDF has no file size limits on any tool." },
      { q: "Are my files stored?", a: "Never. All conversions happen in memory and files are deleted immediately after download." },
    ],
    related: [
      { label: "PNG to JPG", href: "/png-to-jpg" },
      { label: "Image Compressor", href: "/compress-image" },
      { label: "PNG to WEBP", href: "/png-to-webp" },
      { label: "JPG to PDF", href: "/jpg-to-pdf" },
    ],
  },
  {
    type: "tool", slug: "png-to-jpg",
    title: "PNG to JPG Converter — Free Online | wefixPDF",
    description: "Convert PNG to JPG online free. Reduce file size while keeping great quality. Instant, no watermarks, no sign-up.",
    h1: "PNG to JPG Converter",
    subtitle: "Convert PNG images to JPG format. Smaller files, same great quality.",
    keywords: "png to jpg, png to jpeg, convert png to jpg free, png to jpg online, reduce png size",
    howItWorks: [
      { title: "Upload your PNG", desc: "Select or drag in your PNG file." },
      { title: "Convert instantly", desc: "We convert to JPG at 80% quality — the sweet spot for size vs clarity." },
      { title: "Download JPG", desc: "Your smaller JPG is ready to download in seconds." },
    ],
    features: ["Up to 5× smaller file size", "Adjustable quality", "Batch-ready", "Zero retention", "No sign-up"],
    faq: [
      { q: "Will I lose quality converting PNG to JPG?", a: "JPG uses lossy compression, so there is a minor quality tradeoff. At 80% quality the difference is invisible to the human eye." },
      { q: "Why convert PNG to JPG?", a: "JPGs are significantly smaller than PNGs, making them ideal for web use, email attachments, and saving storage space." },
      { q: "Does it support transparent PNGs?", a: "Yes, but transparency is replaced with a white background since JPG doesn't support alpha channels." },
    ],
    related: [
      { label: "JPG to PNG", href: "/jpg-to-png" },
      { label: "Image Compressor", href: "/compress-image" },
      { label: "PNG to WEBP", href: "/png-to-webp" },
    ],
  },
  {
    type: "tool", slug: "png-to-webp",
    title: "PNG to WEBP Converter — Free Online | wefixPDF",
    description: "Convert PNG to WEBP online free. Reduce image size by up to 80% with no visible quality loss. Perfect for faster websites.",
    h1: "PNG to WEBP Converter",
    subtitle: "Convert PNG to next-gen WEBP format. Up to 80% smaller files for faster websites.",
    keywords: "png to webp, convert png to webp, png to webp online free, webp converter, next gen image format, google webp",
    howItWorks: [
      { title: "Upload PNG", desc: "Drop in your PNG file — any size." },
      { title: "Convert to WEBP", desc: "We encode to WEBP using Google's next-gen compression algorithm." },
      { title: "Download WEBP", desc: "Get your smaller WEBP file instantly." },
    ],
    features: ["Up to 80% smaller than PNG", "Supports transparency", "Next-gen format", "Improves Core Web Vitals", "Zero retention"],
    faq: [
      { q: "What is WEBP?", a: "WEBP is a modern image format developed by Google that provides superior lossless and lossy compression for images on the web." },
      { q: "Is WEBP supported by all browsers?", a: "Yes. All major browsers including Chrome, Firefox, Safari, and Edge now support WEBP." },
      { q: "Does WEBP support transparency?", a: "Yes, WEBP supports alpha channel transparency just like PNG." },
    ],
    related: [
      { label: "PNG to JPG", href: "/png-to-jpg" },
      { label: "JPG to PNG", href: "/jpg-to-png" },
      { label: "Image Compressor", href: "/compress-image" },
    ],
  },
  {
    type: "tool", slug: "compress-image",
    title: "Image Compressor — Free Online | wefixPDF",
    description: "Compress JPG, PNG, WEBP images online free. Reduce image file size without losing quality. No limits, no watermarks.",
    h1: "Image Compressor",
    subtitle: "Compress JPG, PNG and WEBP images instantly. Smaller size, same visual quality.",
    keywords: "image compressor, compress image online, reduce image size, compress jpg, compress png, compress webp free",
    howItWorks: [
      { title: "Upload image", desc: "Select your JPG, PNG, or WEBP file." },
      { title: "Set quality", desc: "Adjust the quality slider — 80% is recommended for the best size/quality balance." },
      { title: "Download", desc: "Get your compressed image immediately." },
    ],
    features: ["Adjustable quality 1–100%", "JPG, PNG, WEBP support", "No file size limits", "Preserves EXIF data", "Zero retention"],
    faq: [
      { q: "How much can I compress an image?", a: "Typically 40–80% file size reduction depending on the original image and quality setting." },
      { q: "What quality setting should I use?", a: "80% is the sweet spot — visually identical to the original but significantly smaller." },
      { q: "Will compression affect image dimensions?", a: "No. Compression only reduces file size, never image dimensions or resolution." },
    ],
    related: [
      { label: "PNG to WEBP", href: "/png-to-webp" },
      { label: "PNG to JPG", href: "/png-to-jpg" },
      { label: "Compress PDF", href: "/compress-pdf" },
    ],
  },
  {
    type: "tool", slug: "merge-pdf",
    title: "Merge PDF — Free Online Tool | wefixPDF",
    description: "Merge multiple PDF files into one online free. Combine PDFs in any order instantly. No sign-up, no watermarks.",
    h1: "Merge PDF Files Online",
    subtitle: "Combine multiple PDFs into one document instantly. Drag to reorder, free forever.",
    keywords: "merge pdf, combine pdf online, merge pdf files free, join pdf, combine pdf pages, pdf merger",
    howItWorks: [
      { title: "Upload PDFs", desc: "Select up to 20 PDF files to merge." },
      { title: "Reorder", desc: "Drag and drop to arrange files in the exact order you need." },
      { title: "Download merged PDF", desc: "Get your single combined PDF file instantly." },
    ],
    features: ["Up to 20 files at once", "Drag to reorder", "No file size limits", "Runs in your browser", "Zero retention"],
    faq: [
      { q: "How many PDFs can I merge at once?", a: "You can merge up to 20 PDF files in a single operation on wefixPDF." },
      { q: "Can I reorder pages before merging?", a: "Yes. Drag and drop the files in the file list to set your preferred order before merging." },
      { q: "Is there a file size limit?", a: "No file size limits. Merge PDFs of any size for free." },
      { q: "Does merging affect PDF quality?", a: "No. Merging is lossless — all text, images, and formatting are fully preserved." },
    ],
    related: [
      { label: "Split PDF", href: "/split-pdf" },
      { label: "Compress PDF", href: "/compress-pdf" },
      { label: "PDF to JPG", href: "/pdf-to-jpg" },
    ],
  },
  {
    type: "tool", slug: "split-pdf",
    title: "Split PDF — Free Online Tool | wefixPDF",
    description: "Split a PDF into multiple files online free. Extract pages or split by range. No sign-up, no watermarks.",
    h1: "Split PDF Online",
    subtitle: "Split any PDF by page range or extract individual pages. Free and instant.",
    keywords: "split pdf, split pdf online free, extract pdf pages, pdf page splitter, separate pdf pages, split pdf by page",
    howItWorks: [
      { title: "Upload PDF", desc: "Select the PDF you want to split." },
      { title: "Choose pages", desc: "Enter page ranges like 1-3, 5, 7-9 or leave empty to split every page." },
      { title: "Download", desc: "Single split downloads as PDF, multiple ranges as a ZIP." },
    ],
    features: ["Split by page range", "Extract individual pages", "Split every page", "ZIP download for multiple", "Zero retention"],
    faq: [
      { q: "How do I split specific pages?", a: "Enter page ranges in the input field. For example: '1-3, 5, 8-10' extracts pages 1 to 3, page 5, and pages 8 to 10." },
      { q: "What happens if I leave the range empty?", a: "Every page becomes its own separate PDF file, all bundled in a ZIP download." },
      { q: "Is there a page limit?", a: "No page limits. Split PDFs with hundreds of pages for free." },
    ],
    related: [
      { label: "Merge PDF", href: "/merge-pdf" },
      { label: "Compress PDF", href: "/compress-pdf" },
      { label: "PDF to JPG", href: "/pdf-to-jpg" },
    ],
  },
  {
    type: "tool", slug: "compress-pdf",
    title: "Compress PDF — Free Online Tool | wefixPDF",
    description: "Compress PDF files online free. Reduce PDF size by up to 80% without losing quality. No sign-up required.",
    h1: "Compress PDF Online",
    subtitle: "Reduce PDF file size by up to 80%. Free, instant, no quality loss.",
    keywords: "compress pdf, reduce pdf size, pdf compressor online free, shrink pdf, pdf file size reducer, compress pdf without losing quality",
    howItWorks: [
      { title: "Upload PDF", desc: "Select your PDF — any size." },
      { title: "Choose quality", desc: "Pick Low, Medium, or High compression based on your needs." },
      { title: "Download", desc: "Get your compressed PDF in seconds." },
    ],
    features: ["Up to 80% size reduction", "3 compression levels", "Preserves text quality", "No file size limits", "Zero retention"],
    faq: [
      { q: "How much will my PDF be compressed?", a: "Typically 40–80% depending on content. Image-heavy PDFs compress the most." },
      { q: "Which compression level should I choose?", a: "Medium is best for most use cases — good balance of size and quality. Use Low for maximum compression, High when quality is critical." },
      { q: "Will text remain readable after compression?", a: "Yes. Text is vector-based and is never degraded by compression." },
    ],
    related: [
      { label: "Merge PDF", href: "/merge-pdf" },
      { label: "Split PDF", href: "/split-pdf" },
      { label: "PDF to JPG", href: "/pdf-to-jpg" },
    ],
  },
  {
    type: "tool", slug: "pdf-to-jpg",
    title: "PDF to JPG Converter — Free Online | wefixPDF",
    description: "Convert PDF to JPG images online free. Every page becomes a high-quality JPG. Instant, no watermarks.",
    h1: "PDF to JPG Converter",
    subtitle: "Convert every PDF page into a high-quality JPG image. Free and instant.",
    keywords: "pdf to jpg, pdf to image, convert pdf to jpg free, pdf to jpeg online, export pdf as image, pdf page to jpg",
    howItWorks: [
      { title: "Upload PDF", desc: "Select the PDF you want to convert." },
      { title: "Convert pages", desc: "Every page is rendered as a 150 DPI JPG image." },
      { title: "Download", desc: "Single page downloads as JPG, multiple pages as a ZIP." },
    ],
    features: ["150 DPI high quality", "All pages converted", "ZIP for multi-page", "No file size limits", "Zero retention"],
    faq: [
      { q: "What resolution are the output JPGs?", a: "All JPGs are rendered at 150 DPI — sharp and clear for both screen and print use." },
      { q: "Can I convert just one page?", a: "Currently all pages are converted. Use Split PDF first to isolate a specific page." },
      { q: "What format is the download for multi-page PDFs?", a: "Multiple pages are bundled in a ZIP file with each page numbered sequentially." },
    ],
    related: [
      { label: "JPG to PDF", href: "/jpg-to-pdf" },
      { label: "Compress PDF", href: "/compress-pdf" },
      { label: "Merge PDF", href: "/merge-pdf" },
    ],
  },
  {
    type: "tool", slug: "jpg-to-pdf",
    title: "JPG to PDF Converter — Free Online | wefixPDF",
    description: "Convert JPG images to PDF online free. Combine multiple photos into one PDF instantly. No watermarks.",
    h1: "JPG to PDF Converter",
    subtitle: "Turn one or more JPG, PNG, or WEBP images into a PDF document. Free and instant.",
    keywords: "jpg to pdf, jpeg to pdf, images to pdf, photos to pdf, convert jpg to pdf free, multiple images to pdf",
    howItWorks: [
      { title: "Upload images", desc: "Select one or more JPG, PNG, or WEBP files." },
      { title: "Reorder", desc: "Drag to arrange images in your preferred page order." },
      { title: "Download PDF", desc: "All images are combined into a single PDF instantly." },
    ],
    features: ["JPG, PNG, WEBP support", "Multiple images → one PDF", "A4 auto-scaling", "Drag to reorder", "Zero retention"],
    faq: [
      { q: "How many images can I convert at once?", a: "Up to 50 images can be combined into a single PDF in one operation." },
      { q: "What image formats are supported?", a: "JPG, JPEG, PNG, and WEBP are all supported." },
      { q: "How are images scaled on the PDF page?", a: "Each image is automatically scaled to fit an A4 page while maintaining its aspect ratio." },
    ],
    related: [
      { label: "PDF to JPG", href: "/pdf-to-jpg" },
      { label: "Merge PDF", href: "/merge-pdf" },
      { label: "Image Compressor", href: "/compress-image" },
    ],
  },
  {
    type: "tool", slug: "word-to-pdf",
    title: "Word to PDF Converter — Free Online | wefixPDF",
    description: "Convert Word documents to PDF online free. DOC and DOCX supported. Preserves formatting perfectly. No sign-up.",
    h1: "Word to PDF Converter",
    subtitle: "Convert DOC and DOCX files to PDF instantly. Perfect formatting, every time.",
    keywords: "word to pdf, docx to pdf, convert word to pdf free, doc to pdf online, word document to pdf converter",
    howItWorks: [
      { title: "Upload Word file", desc: "Select your .doc or .docx file." },
      { title: "Convert", desc: "LibreOffice converts your document preserving all formatting, fonts, and layout." },
      { title: "Download PDF", desc: "Your perfectly formatted PDF is ready instantly." },
    ],
    features: ["DOC and DOCX support", "Perfect formatting preservation", "Fonts and layout intact", "No file size limits", "Zero retention"],
    faq: [
      { q: "Will my Word formatting be preserved?", a: "Yes. We use LibreOffice for conversion which preserves fonts, tables, images, and layout with high fidelity." },
      { q: "What Word formats are supported?", a: "Both .doc (Word 97-2003) and .docx (Word 2007+) are fully supported." },
      { q: "Can I convert password-protected Word files?", a: "Password-protected files cannot be converted. Please remove the password before uploading." },
    ],
    related: [
      { label: "PDF to Word", href: "/pdf-to-word" },
      { label: "Compress PDF", href: "/compress-pdf" },
      { label: "Merge PDF", href: "/merge-pdf" },
    ],
  },
  {
    type: "tool", slug: "pdf-to-word",
    title: "PDF to Word Converter — Free Online | wefixPDF",
    description: "Convert PDF to editable Word documents online free. Extract text from any PDF into DOCX format instantly.",
    h1: "PDF to Word Converter",
    subtitle: "Convert any PDF into an editable Word document. Free, instant, and private.",
    keywords: "pdf to word, pdf to docx, convert pdf to word free, pdf to editable word, pdf text extractor, pdf to doc",
    howItWorks: [
      { title: "Upload PDF", desc: "Select your PDF file." },
      { title: "Extract & convert", desc: "We extract all text and rebuild it as a structured Word document." },
      { title: "Download DOCX", desc: "Your editable .docx file is ready to download." },
    ],
    features: ["Full text extraction", "DOCX output", "Tables preserved", "No file size limits", "Zero retention"],
    faq: [
      { q: "Will the layout be perfectly preserved?", a: "Text content is fully preserved. Complex layouts like multi-column text or decorative elements may vary — for pixel-perfect conversion use Adobe Acrobat." },
      { q: "Can I edit the Word document after conversion?", a: "Yes. The output is a fully editable .docx file compatible with Microsoft Word, Google Docs, and LibreOffice." },
      { q: "Does it work on scanned PDFs?", a: "Scanned PDFs (image-based) have limited text extraction. For best results use PDFs with embedded text." },
    ],
    related: [
      { label: "Word to PDF", href: "/word-to-pdf" },
      { label: "Compress PDF", href: "/compress-pdf" },
      { label: "Split PDF", href: "/split-pdf" },
    ],
  },
  {
    type: "tool", slug: "remove-background",
    title: "Remove Background from Image — Free Online | wefixPDF",
    description: "Remove image background online free. AI-powered for JPG, PNG, WEBP. Instant transparent PNG output. No sign-up.",
    h1: "Remove Background from Image",
    subtitle: "Instantly remove any image background using AI. Free, fast, transparent PNG output.",
    keywords: "remove background, background remover free, remove image background online, transparent background, ai background remover, remove bg",
    howItWorks: [
      { title: "Upload image", desc: "Select your JPG, PNG, or WEBP file." },
      { title: "AI removes background", desc: "Our on-device AI model detects and removes the background in seconds." },
      { title: "Download PNG", desc: "Get a transparent PNG with the background completely removed." },
    ],
    features: ["AI-powered accuracy", "Transparent PNG output", "Runs on-device", "No API key needed", "Zero retention"],
    faq: [
      { q: "What types of images work best?", a: "Images with clear subjects and contrasting backgrounds give the best results — portraits, product photos, and logos work especially well." },
      { q: "Is the removed background truly transparent?", a: "Yes. The output is a PNG with a fully transparent background, ready for use on any colored surface." },
      { q: "Does it work for complex backgrounds?", a: "Our AI handles most backgrounds well, including outdoor scenes and busy environments." },
    ],
    related: [
      { label: "Remove Watermark", href: "/remove-watermark" },
      { label: "Image Compressor", href: "/compress-image" },
      { label: "PNG to WEBP", href: "/png-to-webp" },
    ],
  },
  {
    type: "tool", slug: "remove-watermark",
    title: "Remove Watermark from Image — Free Online | wefixPDF",
    description: "Remove watermarks from images online free. Supports JPG, PNG, WEBP. Clean results in seconds. No sign-up.",
    h1: "Remove Watermark from Image",
    subtitle: "Remove unwanted watermarks from any image instantly. Free and 100% private.",
    keywords: "remove watermark, watermark remover free, remove watermark from image online, clean watermark, watermark eraser",
    howItWorks: [
      { title: "Upload image", desc: "Select an image with a watermark to remove." },
      { title: "Auto-remove", desc: "Our algorithm detects and blends out the watermark." },
      { title: "Download", desc: "Get your clean image immediately." },
    ],
    features: ["Transparent watermark removal", "JPG, PNG, WEBP support", "Auto-detection", "No sign-up", "Zero retention"],
    faq: [
      { q: "What types of watermarks can be removed?", a: "Transparent and light text watermarks are removed most effectively. Opaque solid watermarks may require manual editing." },
      { q: "Will removing a watermark affect image quality?", a: "Minimal impact. The algorithm blends surrounding pixels to fill the watermark area naturally." },
    ],
    related: [
      { label: "Remove Background", href: "/remove-background" },
      { label: "Image Compressor", href: "/compress-image" },
      { label: "JPG to PNG", href: "/jpg-to-png" },
    ],
  },
  {
    type: "tool", slug: "image-to-pdf",
    title: "Image to PDF Converter — Free Online | wefixPDF",
    description: "Convert images to PDF online free. Supports JPG, PNG, WEBP, BMP, TIFF, HEIC and more. Instant, no watermarks.",
    h1: "Image to PDF Converter",
    subtitle: "Convert JPG, PNG, WEBP, BMP, TIFF, HEIC and more to PDF instantly. Free forever.",
    keywords: "image to pdf, jpg to pdf, png to pdf, webp to pdf, heic to pdf, convert image to pdf free, photos to pdf",
    howItWorks: [
      { title: "Upload images", desc: "Select one or more images in any format." },
      { title: "Auto-convert", desc: "Each image becomes one page in your new PDF." },
      { title: "Download PDF", desc: "Your combined PDF downloads instantly." },
    ],
    features: ["All major formats", "Multiple images → one PDF", "A4 auto-scaling", "Drag to reorder", "Zero retention"],
    faq: [
      { q: "What image formats are supported?", a: "JPG, JPEG, PNG, WEBP, BMP, TIFF, SVG, and HEIC are all supported." },
      { q: "Can I combine different image formats in one PDF?", a: "Yes. Mix and match any supported formats — they all end up as clean PDF pages." },
    ],
    related: [
      { label: "JPG to PDF", href: "/jpg-to-pdf" },
      { label: "PDF to JPG", href: "/pdf-to-jpg" },
      { label: "Compress PDF", href: "/compress-pdf" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// BLOG / GUIDE PAGES (30)
// ─────────────────────────────────────────────────────────────
export const blogPages: SeoPage[] = [
  { type: "blog", slug: "how-to-convert-jpg-to-png", title: "How to Convert JPG to PNG Online Free | wefixPDF", description: "Step-by-step guide to converting JPG images to PNG format online for free. Keep lossless quality in seconds.", h1: "How to Convert JPG to PNG Online", subtitle: "The easiest way to convert JPG to PNG in seconds.", keywords: "how to convert jpg to png, jpg to png guide, convert jpg png free", related: [{ label: "JPG to PNG Tool", href: "/jpg-to-png" }] },
  { type: "blog", slug: "how-to-merge-pdf-files", title: "How to Merge PDF Files Online Free | wefixPDF", description: "Learn how to combine multiple PDF files into one document online for free in just a few clicks.", h1: "How to Merge PDF Files Online", subtitle: "Combine any number of PDFs into one in seconds.", keywords: "how to merge pdf, combine pdf files guide, merge pdf free", related: [{ label: "Merge PDF Tool", href: "/merge-pdf" }] },
  { type: "blog", slug: "how-to-compress-pdf", title: "How to Compress a PDF Without Losing Quality | wefixPDF", description: "Learn the best ways to reduce PDF file size without sacrificing quality — free, online, no software needed.", h1: "How to Compress a PDF Without Losing Quality", subtitle: "Reduce PDF size by up to 80% while keeping it sharp.", keywords: "how to compress pdf, reduce pdf size guide, compress pdf without losing quality", related: [{ label: "Compress PDF Tool", href: "/compress-pdf" }] },
  { type: "blog", slug: "how-to-convert-word-to-pdf", title: "How to Convert Word to PDF Free Online | wefixPDF", description: "Convert any Word document to PDF in seconds — free, online, with perfect formatting preserved.", h1: "How to Convert Word to PDF Online", subtitle: "Turn any DOC or DOCX into a PDF with one click.", keywords: "how to convert word to pdf, word to pdf guide, docx to pdf free", related: [{ label: "Word to PDF Tool", href: "/word-to-pdf" }] },
  { type: "blog", slug: "how-to-split-a-pdf", title: "How to Split a PDF Into Multiple Files | wefixPDF", description: "Learn how to split a PDF by page range or extract specific pages online for free.", h1: "How to Split a PDF Into Multiple Files", subtitle: "Extract any pages from a PDF in seconds.", keywords: "how to split pdf, split pdf by page, extract pdf pages guide", related: [{ label: "Split PDF Tool", href: "/split-pdf" }] },
  { type: "blog", slug: "how-to-convert-pdf-to-jpg", title: "How to Convert PDF to JPG Online Free | wefixPDF", description: "Turn every page of a PDF into a high-quality JPG image online for free. No software needed.", h1: "How to Convert PDF to JPG Online", subtitle: "Convert every PDF page to a sharp JPG in seconds.", keywords: "how to convert pdf to jpg, pdf to image guide, pdf to jpg free", related: [{ label: "PDF to JPG Tool", href: "/pdf-to-jpg" }] },
  { type: "blog", slug: "how-to-remove-background-from-image", title: "How to Remove Background from an Image Free | wefixPDF", description: "Step-by-step guide to removing image backgrounds online for free using AI — no Photoshop needed.", h1: "How to Remove a Background from an Image", subtitle: "AI background removal in seconds — completely free.", keywords: "how to remove image background, background removal guide, remove bg free", related: [{ label: "Remove Background Tool", href: "/remove-background" }] },
  { type: "blog", slug: "how-to-convert-png-to-webp", title: "How to Convert PNG to WEBP for Faster Websites | wefixPDF", description: "Learn how to convert PNG images to WEBP format to speed up your website and improve SEO.", h1: "How to Convert PNG to WEBP Online", subtitle: "Improve your website speed by switching to WEBP.", keywords: "how to convert png to webp, png to webp guide, webp format benefits", related: [{ label: "PNG to WEBP Tool", href: "/png-to-webp" }] },
  { type: "blog", slug: "how-to-convert-images-to-pdf", title: "How to Convert Multiple Images to PDF | wefixPDF", description: "Combine JPG, PNG, and other images into a single PDF document online for free.", h1: "How to Convert Multiple Images to a PDF", subtitle: "Turn a folder of photos into one clean PDF.", keywords: "convert images to pdf guide, multiple photos to pdf, jpg png to pdf", related: [{ label: "Image to PDF Tool", href: "/image-to-pdf" }] },
  { type: "blog", slug: "best-free-pdf-tools-online", title: "10 Best Free Online PDF Tools in 2025 | wefixPDF", description: "Discover the best free online PDF tools for merging, splitting, compressing, and converting PDFs without software.", h1: "10 Best Free Online PDF Tools in 2025", subtitle: "Everything you need to work with PDFs — all free.", keywords: "best free pdf tools online, free pdf editor, pdf tools 2025", related: [{ label: "Merge PDF", href: "/merge-pdf" }, { label: "Compress PDF", href: "/compress-pdf" }] },
  { type: "blog", slug: "jpg-vs-png-which-is-better", title: "JPG vs PNG: Which Image Format Should You Use? | wefixPDF", description: "Understand the difference between JPG and PNG — when to use each format for the best results.", h1: "JPG vs PNG: Which Format is Better?", subtitle: "Choose the right image format for every situation.", keywords: "jpg vs png, jpg or png, difference between jpg and png, image format comparison", related: [{ label: "JPG to PNG", href: "/jpg-to-png" }, { label: "PNG to JPG", href: "/png-to-jpg" }] },
  { type: "blog", slug: "how-to-reduce-pdf-file-size", title: "How to Reduce PDF File Size (5 Easy Methods) | wefixPDF", description: "5 proven ways to reduce PDF file size — from online tools to settings tweaks, all explained clearly.", h1: "How to Reduce PDF File Size", subtitle: "5 easy methods to shrink your PDF without hassle.", keywords: "reduce pdf file size, how to make pdf smaller, pdf compression methods", related: [{ label: "Compress PDF Tool", href: "/compress-pdf" }] },
  { type: "blog", slug: "what-is-webp-format", title: "What is WEBP? Everything You Need to Know | wefixPDF", description: "A complete guide to the WEBP image format — what it is, why it matters, and how to use it.", h1: "What is WEBP? A Complete Guide", subtitle: "The next-gen image format explained simply.", keywords: "what is webp, webp format explained, webp vs jpg png", related: [{ label: "PNG to WEBP", href: "/png-to-webp" }] },
  { type: "blog", slug: "how-to-make-pdf-searchable", title: "How to Make a PDF Searchable Online Free | wefixPDF", description: "Learn how to make scanned PDF documents fully searchable using free online tools.", h1: "How to Make a PDF Searchable", subtitle: "Turn scanned PDFs into fully searchable documents.", keywords: "make pdf searchable, ocr pdf online free, searchable pdf guide", related: [{ label: "PDF to Word", href: "/pdf-to-word" }] },
  { type: "blog", slug: "how-to-password-protect-pdf", title: "How to Password Protect a PDF Free Online | wefixPDF", description: "Learn how to add password protection to any PDF document online for free.", h1: "How to Password Protect a PDF", subtitle: "Secure your PDF with a password in seconds.", keywords: "password protect pdf, add password to pdf, pdf security guide", related: [{ label: "Compress PDF", href: "/compress-pdf" }] },
];

// ─────────────────────────────────────────────────────────────
// COMPARISON PAGES (12)
// ─────────────────────────────────────────────────────────────
export const comparePages: SeoPage[] = [
  { type: "compare", slug: "wefixpdf-vs-Others", title: "wefixPDF vs Others: Which is Better? | wefixPDF", description: "Compare wefixPDF and Others side by side — features, privacy, speed, and pricing.", h1: "wefixPDF vs Others", subtitle: "See how wefixPDF stacks up against Others.", keywords: "wefixpdf vs Others, Others alternative, best pdf tool online", related: [{ label: "Try wefixPDF Free", href: "/merge-pdf" }] },
  { type: "compare", slug: "wefixpdf-vs-smallpdf", title: "wefixPDF vs Smallpdf: Full Comparison | wefixPDF", description: "wefixPDF vs Smallpdf — compare privacy, features, speed, and pricing to find the best PDF tool.", h1: "wefixPDF vs Smallpdf", subtitle: "The honest comparison between wefixPDF and Smallpdf.", keywords: "wefixpdf vs smallpdf, smallpdf alternative, free smallpdf", related: [{ label: "Compress PDF", href: "/compress-pdf" }] },
  { type: "compare", slug: "wefixpdf-vs-adobe-acrobat", title: "wefixPDF vs Adobe Acrobat: Free Alternative | wefixPDF", description: "Compare wefixPDF with Adobe Acrobat. Get the same core PDF features completely free.", h1: "wefixPDF vs Adobe Acrobat", subtitle: "Do everything Adobe Acrobat does — for free.", keywords: "wefixpdf vs adobe acrobat, free adobe acrobat alternative, adobe pdf free", related: [{ label: "PDF to Word", href: "/pdf-to-word" }] },
  { type: "compare", slug: "wefixpdf-vs-pdf2go", title: "wefixPDF vs PDF2Go: Side by Side Comparison | wefixPDF", description: "wefixPDF vs PDF2Go — features, privacy, and performance compared.", h1: "wefixPDF vs PDF2Go", subtitle: "wefixPDF vs PDF2Go — which should you use?", keywords: "wefixpdf vs pdf2go, pdf2go alternative, pdf tools comparison", related: [{ label: "Merge PDF", href: "/merge-pdf" }] },
  { type: "compare", slug: "jpg-vs-png-vs-webp", title: "JPG vs PNG vs WEBP: Which Format Wins? | wefixPDF", description: "A complete comparison of JPG, PNG, and WEBP image formats — quality, size, and when to use each.", h1: "JPG vs PNG vs WEBP: Full Comparison", subtitle: "Pick the right image format every single time.", keywords: "jpg vs png vs webp, image format comparison, best image format", related: [{ label: "PNG to WEBP", href: "/png-to-webp" }, { label: "JPG to PNG", href: "/jpg-to-png" }] },
  { type: "compare", slug: "pdf-vs-word-which-format", title: "PDF vs Word: Which Format Should You Use? | wefixPDF", description: "PDF vs Word document — understand when to use each format and how to convert between them.", h1: "PDF vs Word: Which Should You Use?", subtitle: "The definitive guide to choosing PDF or Word.", keywords: "pdf vs word, pdf or docx, when to use pdf vs word", related: [{ label: "Word to PDF", href: "/word-to-pdf" }, { label: "PDF to Word", href: "/pdf-to-word" }] },
];

// ─────────────────────────────────────────────────────────────
// USE CASE PAGES (15)
// ─────────────────────────────────────────────────────────────
export const usecasePages: SeoPage[] = [
  { type: "usecase", slug: "pdf-tools-for-students", title: "Free PDF Tools for Students | wefixPDF", description: "The best free PDF tools for students — merge notes, compress assignments, convert images, and more.", h1: "Free PDF Tools for Students", subtitle: "Everything students need to work with PDFs — all free.", keywords: "pdf tools for students, free pdf tools students, student pdf converter", related: [{ label: "Merge PDF", href: "/merge-pdf" }, { label: "Compress PDF", href: "/compress-pdf" }] },
  { type: "usecase", slug: "pdf-tools-for-business", title: "Free PDF Tools for Business | wefixPDF", description: "Streamline business documents with free PDF tools — merge reports, convert Word files, compress large PDFs.", h1: "Free PDF Tools for Business", subtitle: "Professional PDF tools for businesses of all sizes.", keywords: "pdf tools for business, business pdf converter, free business pdf tools", related: [{ label: "Word to PDF", href: "/word-to-pdf" }, { label: "Merge PDF", href: "/merge-pdf" }] },
  { type: "usecase", slug: "compress-pdf-for-email", title: "How to Compress PDF for Email Attachments | wefixPDF", description: "Reduce your PDF file size to meet email attachment limits. Free, fast, no quality loss.", h1: "Compress PDF for Email", subtitle: "Make any PDF small enough to send by email.", keywords: "compress pdf for email, reduce pdf email attachment, pdf too large email", related: [{ label: "Compress PDF", href: "/compress-pdf" }] },
  { type: "usecase", slug: "convert-photos-to-pdf-for-printing", title: "Convert Photos to PDF for Printing | wefixPDF", description: "Turn your photos into a print-ready PDF document online for free — perfect for photo albums and portfolios.", h1: "Convert Photos to PDF for Printing", subtitle: "Create print-ready PDFs from your photos instantly.", keywords: "photos to pdf printing, convert images to pdf print, photo album pdf", related: [{ label: "Image to PDF", href: "/image-to-pdf" }] },
  { type: "usecase", slug: "merge-pdf-for-resume", title: "How to Merge PDF Files for a Resume | wefixPDF", description: "Combine your resume, cover letter, and portfolio into one PDF file for job applications.", h1: "Merge PDFs for Your Resume & Job Application", subtitle: "Combine your resume, cover letter, and portfolio into one PDF.", keywords: "merge pdf resume, combine cv pdf, job application pdf merge", related: [{ label: "Merge PDF", href: "/merge-pdf" }] },
  { type: "usecase", slug: "compress-images-for-website", title: "Compress Images for Your Website | wefixPDF", description: "Reduce image file sizes for faster website loading. Supports JPG, PNG, WEBP — free online.", h1: "Compress Images for Faster Websites", subtitle: "Speed up your site by compressing images without quality loss.", keywords: "compress images website, optimize images for web, image compression web", related: [{ label: "Image Compressor", href: "/compress-image" }, { label: "PNG to WEBP", href: "/png-to-webp" }] },
  { type: "usecase", slug: "remove-background-for-ecommerce", title: "Remove Image Background for eCommerce | wefixPDF", description: "Create clean product photos with transparent backgrounds for your online store — free online.", h1: "Remove Image Background for eCommerce Products", subtitle: "Perfect product photos with transparent backgrounds — free.", keywords: "remove background ecommerce, product photo background removal, transparent background product images", related: [{ label: "Remove Background", href: "/remove-background" }] },
  { type: "usecase", slug: "pdf-tools-for-lawyers", title: "Free PDF Tools for Lawyers & Legal Professionals | wefixPDF", description: "Merge contracts, split case files, compress legal PDFs — free tools for legal professionals.", h1: "Free PDF Tools for Legal Professionals", subtitle: "Handle legal documents efficiently with free PDF tools.", keywords: "pdf tools lawyers, legal pdf tools, merge legal documents pdf", related: [{ label: "Merge PDF", href: "/merge-pdf" }, { label: "Split PDF", href: "/split-pdf" }] },
];

// ─────────────────────────────────────────────────────────────
// FORMAT INFO PAGES (10)
// ─────────────────────────────────────────────────────────────
export const formatPages: SeoPage[] = [
  { type: "format", slug: "what-is-pdf", title: "What is a PDF File? Complete Guide | wefixPDF", description: "Everything you need to know about PDF files — what they are, how they work, and how to use them.", h1: "What is a PDF File?", subtitle: "The complete guide to PDF format explained simply.", keywords: "what is pdf, pdf file format explained, pdf guide", related: [{ label: "Compress PDF", href: "/compress-pdf" }, { label: "Merge PDF", href: "/merge-pdf" }] },
  { type: "format", slug: "what-is-webp", title: "What is a WEBP File? | wefixPDF", description: "A complete guide to the WEBP image format — benefits, browser support, and when to use it.", h1: "What is a WEBP File?", subtitle: "Google's next-gen image format explained.", keywords: "what is webp file, webp format guide, webp explained", related: [{ label: "PNG to WEBP", href: "/png-to-webp" }] },
  { type: "format", slug: "what-is-png", title: "What is a PNG File? | wefixPDF", description: "Everything about PNG files — lossless compression, transparency support, and when PNG beats JPG.", h1: "What is a PNG File?", subtitle: "Lossless images, transparency, and more — PNG explained.", keywords: "what is png file, png format guide, png vs jpg", related: [{ label: "PNG to JPG", href: "/png-to-jpg" }, { label: "JPG to PNG", href: "/jpg-to-png" }] },
  { type: "format", slug: "what-is-jpg", title: "What is a JPG File? | wefixPDF", description: "A complete guide to JPG/JPEG image files — compression, quality, and best use cases.", h1: "What is a JPG File?", subtitle: "The world's most popular image format, explained.", keywords: "what is jpg file, jpeg format guide, jpg explained", related: [{ label: "JPG to PNG", href: "/jpg-to-png" }, { label: "Image Compressor", href: "/compress-image" }] },
  { type: "format", slug: "what-is-docx", title: "What is a DOCX File? | wefixPDF", description: "Everything about the DOCX format — what it is, how it differs from DOC, and how to convert it.", h1: "What is a DOCX File?", subtitle: "Microsoft Word's modern document format, explained.", keywords: "what is docx file, docx format explained, docx vs doc", related: [{ label: "Word to PDF", href: "/word-to-pdf" }, { label: "PDF to Word", href: "/pdf-to-word" }] },
];

// ─────────────────────────────────────────────────────────────
// ALL PAGES combined + helpers
// ─────────────────────────────────────────────────────────────
export const allPages: SeoPage[] = [
  ...toolPages,
  ...blogPages,
  ...comparePages,
  ...usecasePages,
  ...formatPages,
];

export function getPageBySlug(slug: string): SeoPage | undefined {
  return allPages.find((p) => p.slug === slug);
}

export function getPagesByType(type: PageType): SeoPage[] {
  return allPages.filter((p) => p.type === type);
}

console.log(`Total SEO pages defined: ${allPages.length}`);