const db = require("../config/db.config");

const seoData = [
  // ============================================
  // BLOG PAGES
  // ============================================
  {
    type: 'blog',
    slug: 'how-to-compress-images',
    title: 'How to Compress Images for Web: Ultimate 2026 Guide | weFixPDF',
    description: 'Learn the best practices for compressing PNG, JPG, and WEBP images without losing quality. Optimizing your images improves SEO, bounce rates, and load speed.',
    h1: 'How to Compress Images Without Losing Quality',
    schema_type: 'Article',
    schema_name: 'How to Compress Images for Web: Ultimate 2026 Guide'
  },
  {
    type: 'blog',
    slug: 'best-free-pdf-tools',
    title: '5 Best Free PDF Tools in 2026 - No Watermarks | weFixPDF',
    description: 'Discover the top free PDF converters and editors in 2026. Compare features, privacy, and limits for merging, compressing, and editing documents.',
    h1: 'The Best Free PDF Tools in 2026',
    schema_type: 'Article',
    schema_name: '5 Best Free PDF Tools in 2026 - No Watermarks'
  },
  {
    type: 'blog',
    slug: 'heic-vs-jpg',
    title: 'HEIC vs JPG: Which Image Format is Better? | weFixPDF',
    description: 'HEIC vs JPG - compare file size, quality, and browser compatibility. Learn why Apple uses HEIC and how to convert HEIC to JPG easily.',
    h1: 'HEIC vs JPG: The Complete Comparison',
    schema_type: 'Article',
    schema_name: 'HEIC vs JPG: Which Image Format is Better?'
  },
  {
    type: 'blog',
    slug: 'how-to-merge-pdf-files',
    title: 'How to Merge PDF Files Online for Free in 2026 | weFixPDF',
    description: 'Step-by-step guide to combining multiple PDF files into one document online. No software needed — merge PDFs instantly and securely with weFixPDF.',
    h1: 'How to Merge PDF Files Online (Free & Fast)',
    schema_type: 'Article',
    schema_name: 'How to Merge PDF Files Online for Free'
  },
  {
    type: 'blog',
    slug: 'pdf-vs-docx',
    title: 'PDF vs DOCX: Which Format Should You Use? | weFixPDF',
    description: 'PDF or Word? We break down when to use each format for sharing, editing, and archiving documents. Plus how to convert between them instantly.',
    h1: 'PDF vs DOCX: Which Format Is Right for Your Document?',
    schema_type: 'Article',
    schema_name: 'PDF vs DOCX: Which Format Should You Use?'
  },
  {
    type: 'blog',
    slug: 'how-to-reduce-pdf-file-size',
    title: 'How to Reduce PDF File Size Without Losing Quality | weFixPDF',
    description: 'Large PDF files slowing you down? Learn 5 proven methods to shrink PDF size for emailing, uploading, and sharing — all free online.',
    h1: 'How to Reduce PDF File Size (5 Easy Methods)',
    schema_type: 'Article',
    schema_name: 'How to Reduce PDF File Size Without Losing Quality'
  },
  {
    type: 'blog',
    slug: 'webp-vs-png',
    title: 'WebP vs PNG: Which Image Format is Best for Web? | weFixPDF',
    description: 'WebP loads faster than PNG but compatibility varies. Discover when to use WebP vs PNG and how to convert between formats for optimal web performance.',
    h1: 'WebP vs PNG: The Developer\'s Complete Guide',
    schema_type: 'Article',
    schema_name: 'WebP vs PNG: Which Image Format is Best for Web?'
  },
  {
    type: 'blog',
    slug: 'how-to-convert-jpg-to-pdf',
    title: 'How to Convert JPG to PDF Online Free | weFixPDF',
    description: 'Turn any JPG, JPEG, or photo into a PDF in seconds. No sign-up required. Learn how to convert single or multiple images to a single PDF file.',
    h1: 'How to Convert JPG to PDF Online (Free & Instant)',
    schema_type: 'Article',
    schema_name: 'How to Convert JPG to PDF Online Free'
  },
  {
    type: 'blog',
    slug: 'how-to-split-pdf',
    title: 'How to Split a PDF Into Multiple Files Online | weFixPDF',
    description: 'Extract pages or split a large PDF into separate files without any paid software. Use weFixPDF\'s free split tool — no download required.',
    h1: 'How to Split a PDF Into Separate Pages or Files',
    schema_type: 'Article',
    schema_name: 'How to Split a PDF Into Multiple Files Online'
  },
  {
    type: 'blog',
    slug: 'image-formats-explained',
    title: 'Image Formats Explained: JPG, PNG, GIF, SVG, WebP | weFixPDF',
    description: 'Not sure which image format to use? We explain JPG, PNG, GIF, SVG, WebP, and HEIC — and when to use each for web, print, and design.',
    h1: 'Every Image Format Explained: JPG, PNG, WebP, SVG & More',
    schema_type: 'Article',
    schema_name: 'Image Formats Explained: JPG, PNG, GIF, SVG, WebP'
  },
  {
    type: 'blog',
    slug: 'how-to-password-protect-pdf',
    title: 'How to Password Protect a PDF for Free | weFixPDF',
    description: 'Keep your sensitive documents private. Learn how to add password protection to any PDF file online — no software or account needed.',
    h1: 'How to Password Protect a PDF Online (Free)',
    schema_type: 'Article',
    schema_name: 'How to Password Protect a PDF for Free'
  },
  {
    type: 'blog',
    slug: 'what-is-ocr',
    title: 'What is OCR? How Optical Character Recognition Works | weFixPDF',
    description: 'OCR (Optical Character Recognition) turns scanned images and PDFs into editable text. Learn how OCR works and how to use it for free online.',
    h1: 'What is OCR and How Does It Work?',
    schema_type: 'Article',
    schema_name: 'What is OCR? How Optical Character Recognition Works'
  },
  {
    type: 'blog',
    slug: 'core-web-vitals-image-optimization',
    title: 'Core Web Vitals & Image Optimization: The 2026 Guide | weFixPDF',
    description: 'Images are the #1 cause of poor Core Web Vitals scores. Learn how to optimize images for LCP, CLS, and FID to rank higher on Google.',
    h1: 'How Image Optimization Affects Core Web Vitals',
    schema_type: 'Article',
    schema_name: 'Core Web Vitals & Image Optimization: The 2026 Guide'
  },

  // ============================================
  // COMPARE PAGES
  // ============================================
  {
    type: 'compare',
    slug: 'free-vs-paid-pdf-converters',
    title: 'Free vs Paid PDF Tools: Is a Subscription Worth It? | weFixPDF',
    description: 'Should you pay for a PDF tool? We break down the real differences between free online PDF converters and paid software in 2026.',
    h1: 'Free vs Paid PDF Tools: An Honest Comparison',
    schema_type: 'WebPage',
    schema_name: 'Free vs Paid PDF Converters Comparison'
  },
  {
    type: 'compare',
    slug: 'online-vs-desktop-pdf-tools',
    title: 'Online vs Desktop PDF Tools: Which Should You Use? | weFixPDF',
    description: 'Online PDF tools vs installed software — compare speed, privacy, cost, and convenience to find the best fit for your workflow.',
    h1: 'Online vs Desktop PDF Tools: Pros, Cons & Use Cases',
    schema_type: 'WebPage',
    schema_name: 'Online vs Desktop PDF Tools Comparison'
  },
  {
    type: 'compare',
    slug: 'free-pdf-tools-with-no-limits',
    title: 'Free PDF Tools With No Daily Limits — What to Look For | weFixPDF',
    description: 'Most free PDF tools cap you at 2-3 tasks per day. Learn what separates genuinely unlimited free tools from those with hidden restrictions.',
    h1: 'Free PDF Tools With No Daily Limits: What\'s Actually Free?',
    schema_type: 'WebPage',
    schema_name: 'Free PDF Tools With No Limits'
  },
  {
    type: 'compare',
    slug: 'best-pdf-tools-for-privacy',
    title: 'Best PDF Tools for Privacy — Zero Storage Options | weFixPDF',
    description: 'Not all PDF tools delete your files. Compare online PDF tools by their privacy policies and file retention practices to find the safest option.',
    h1: 'Best PDF Tools for Privacy: Zero-Storage vs Standard Tools',
    schema_type: 'WebPage',
    schema_name: 'Best PDF Tools for Privacy'
  },
  {
    type: 'compare',
    slug: 'jpg-vs-png-for-web',
    title: 'JPG vs PNG for Web: Which Should You Use? | weFixPDF',
    description: 'JPG or PNG? Understand the tradeoffs in file size, transparency, and quality. Pick the right image format for your website or app.',
    h1: 'JPG vs PNG: Which Image Format is Best for Your Website?',
    schema_type: 'WebPage',
    schema_name: 'JPG vs PNG for Web Comparison'
  },
  {
    type: 'compare',
    slug: 'lossless-vs-lossy-compression',
    title: 'Lossless vs Lossy Compression: Which is Better for PDFs & Images? | weFixPDF',
    description: 'Understand the key differences between lossless and lossy compression for PDFs, JPGs, and PNGs — and when to use each for best results.',
    h1: 'Lossless vs Lossy Compression: The Complete Breakdown',
    schema_type: 'WebPage',
    schema_name: 'Lossless vs Lossy Compression'
  },
  {
    type: 'compare',
    slug: 'jpg-vs-png-for-web',
    title: 'JPG vs PNG for Web: Which Should You Use? | weFixPDF',
    description: 'JPG or PNG? Understand the tradeoffs in file size, transparency, and quality. Pick the right image format for your website or app.',
    h1: 'JPG vs PNG: Which Image Format is Best for Your Website?',
    schema_type: 'WebPage',
    schema_name: 'JPG vs PNG for Web Comparison'
  },

  // ============================================
  // USE CASE PAGES
  // ============================================
  {
    type: 'use_cases',
    slug: 'pdf-tools-for-students',
    title: 'Free PDF Tools for College Students & Teachers | weFixPDF',
    description: 'The ultimate toolkit for students. Learn how to merge assignments, compress heavy lecture PDFs, and convert images to documents for free.',
    h1: 'Essential PDF Tools for Students & Educators',
    schema_type: 'CollectionPage',
    schema_name: 'PDF Tools for Education'
  },
  {
    type: 'use_cases',
    slug: 'image-optimization-for-developers',
    title: 'Image Optimization Guide for Web Developers | weFixPDF',
    description: 'Optimize web performance. Convert PNGs to WEBP, compress assets, and improve Core Web Vitals with our developer-friendly image tools.',
    h1: 'Image Optimization for Web Developers',
    schema_type: 'CollectionPage',
    schema_name: 'File Conversion for Developers'
  },
  {
    type: 'use_cases',
    slug: 'document-management-for-business',
    title: 'Secure Document Management for Small Business | weFixPDF',
    description: 'Manage invoices, contracts, and business documents securely. weFixPDF offers free, encrypted PDF tools for small businesses and freelancers.',
    h1: 'Secure Document Workflows for Small Business',
    schema_type: 'CollectionPage',
    schema_name: 'Document Management for Business'
  },
  {
    type: 'use_cases',
    slug: 'pdf-tools-for-freelancers',
    title: 'PDF Tools for Freelancers: Proposals, Invoices & More | weFixPDF',
    description: 'Streamline your freelance workflow. Create, compress, and share PDFs for proposals, contracts, and invoices — all free with weFixPDF.',
    h1: 'The Best Free PDF Tools for Freelancers',
    schema_type: 'CollectionPage',
    schema_name: 'PDF Tools for Freelancers'
  },
  {
    type: 'use_cases',
    slug: 'pdf-tools-for-real-estate',
    title: 'PDF Tools for Real Estate Agents & Brokers | weFixPDF',
    description: 'Merge listing documents, compress photos, and share property PDFs securely. weFixPDF makes document management easy for real estate professionals.',
    h1: 'PDF & Document Tools for Real Estate Professionals',
    schema_type: 'CollectionPage',
    schema_name: 'PDF Tools for Real Estate'
  },
  {
    type: 'use_cases',
    slug: 'pdf-tools-for-lawyers',
    title: 'Secure PDF Tools for Lawyers & Legal Professionals | weFixPDF',
    description: 'Merge court filings, compress exhibits, and protect sensitive legal documents. weFixPDF is built for privacy — no files stored on our servers.',
    h1: 'PDF Tools for Legal Professionals',
    schema_type: 'CollectionPage',
    schema_name: 'PDF Tools for Legal Professionals'
  },
  {
    type: 'use_cases',
    slug: 'compress-images-for-email',
    title: 'How to Compress Images for Email Attachments | weFixPDF',
    description: 'Email attachments too large? Compress JPG, PNG, and PDF files to meet inbox size limits without sacrificing quality. Free and instant.',
    h1: 'Compress Images & PDFs for Email Attachments',
    schema_type: 'CollectionPage',
    schema_name: 'Compress Files for Email'
  },
  {
    type: 'use_cases',
    slug: 'pdf-tools-for-hr',
    title: 'PDF Tools for HR Teams: Onboarding & Document Handling | weFixPDF',
    description: 'Simplify HR document workflows. Merge onboarding packets, compress resumes, and distribute forms securely — all with free PDF tools from weFixPDF.',
    h1: 'PDF Tools for Human Resources Teams',
    schema_type: 'CollectionPage',
    schema_name: 'PDF Tools for HR'
  },

  // ============================================
  // TOOL / FEATURE LANDING PAGES
  // ============================================
  {
    type: 'tool',
    slug: 'compress-pdf',
    title: 'Compress PDF Online Free — Reduce PDF Size Instantly | weFixPDF',
    description: 'Compress PDF files online without losing quality. Reduce PDF size for email, upload, or storage in seconds. No sign-up. No watermarks.',
    h1: 'Compress PDF Files Online — Free & Instant',
    schema_type: 'SoftwareApplication',
    schema_name: 'weFixPDF PDF Compressor'
  },
  {
    type: 'tool',
    slug: 'merge-pdf',
    title: 'Merge PDF Files Online Free — Combine PDFs in Seconds | weFixPDF',
    description: 'Combine multiple PDF files into one document online. Drag, drop, and merge — free, fast, and secure. No software download needed.',
    h1: 'Merge PDF Files Online for Free',
    schema_type: 'SoftwareApplication',
    schema_name: 'weFixPDF PDF Merger'
  },
  {
    type: 'tool',
    slug: 'split-pdf',
    title: 'Split PDF Online Free — Extract Pages Instantly | weFixPDF',
    description: 'Split a PDF into individual pages or custom ranges online. Free PDF splitter — no installation, no account, no watermarks.',
    h1: 'Split PDF Files Online — Extract Any Page for Free',
    schema_type: 'SoftwareApplication',
    schema_name: 'weFixPDF PDF Splitter'
  },
  {
    type: 'tool',
    slug: 'jpg-to-pdf',
    title: 'JPG to PDF Converter — Free Online Tool | weFixPDF',
    description: 'Convert JPG images to PDF online in one click. Combine multiple photos into a single PDF. Free, no watermarks, no sign-up required.',
    h1: 'Convert JPG to PDF Online — Free & Fast',
    schema_type: 'SoftwareApplication',
    schema_name: 'weFixPDF JPG to PDF Converter'
  },
  {
    type: 'tool',
    slug: 'pdf-to-jpg',
    title: 'PDF to JPG Converter — Extract Images Free | weFixPDF',
    description: 'Convert PDF pages to high-quality JPG images online. Extract every page as an image or download all at once. Free & no watermarks.',
    h1: 'Convert PDF to JPG Online — Free Image Extractor',
    schema_type: 'SoftwareApplication',
    schema_name: 'weFixPDF PDF to JPG Converter'
  },
  {
    type: 'tool',
    slug: 'compress-image',
    title: 'Compress Image Online Free — PNG, JPG, WebP | weFixPDF',
    description: 'Reduce image file size without losing quality. Compress PNG, JPG, and WebP images online for free. Instant results, no upload limits.',
    h1: 'Compress Images Online Free — PNG, JPG & WebP',
    schema_type: 'SoftwareApplication',
    schema_name: 'weFixPDF Image Compressor'
  },
  {
    type: 'tool',
    slug: 'heic-to-jpg',
    title: 'HEIC to JPG Converter — Free Online | weFixPDF',
    description: 'Convert Apple HEIC photos to JPG instantly. Open HEIC files on any device or browser with our free HEIC to JPG converter. No software needed.',
    h1: 'Convert HEIC to JPG Online — Free & Instant',
    schema_type: 'SoftwareApplication',
    schema_name: 'weFixPDF HEIC to JPG Converter'
  },
  {
    type: 'tool',
    slug: 'png-to-webp',
    title: 'PNG to WebP Converter — Free & Fast Online Tool | weFixPDF',
    description: 'Convert PNG images to WebP format to improve web page load times. Free PNG to WebP converter with no file size limits or watermarks.',
    h1: 'Convert PNG to WebP Online — Boost Your Web Performance',
    schema_type: 'SoftwareApplication',
    schema_name: 'weFixPDF PNG to WebP Converter'
  },
  {
    type: 'tool',
    slug: 'pdf-to-word',
    title: 'Convert PDF to Word Online (Free & Fast) | weFixPDF',
    description: 'Convert PDF to editable Word documents (DOCX) in seconds. Preserve formatting and layout without expensive subscriptions. Free and secure.',
    h1: 'Convert PDF to Word (DOCX) Online — Free',
    schema_type: 'SoftwareApplication',
    schema_name: 'weFixPDF PDF to Word Converter'
  },
  {
    type: 'tool',
    slug: 'word-to-pdf',
    title: 'Word to PDF Converter — Free Online DOCX to PDF | weFixPDF',
    description: 'Convert Word documents to PDF online for free. Maintain fonts, layout, and images perfectly. Share or print your DOC/DOCX as a PDF instantly.',
    h1: 'Convert Word to PDF Online — Free DOCX to PDF',
    schema_type: 'SoftwareApplication',
    schema_name: 'weFixPDF Word to PDF Converter'
  },
  {
    type: 'tool',
    slug: 'rotate-pdf',
    title: 'Rotate PDF Pages Online Free | weFixPDF',
    description: 'Fix upside-down or sideways PDF pages instantly. Rotate individual pages or entire PDFs online — free, no software required.',
    h1: 'Rotate PDF Pages Online — Fix Orientation for Free',
    schema_type: 'SoftwareApplication',
    schema_name: 'weFixPDF PDF Page Rotator'
  },
  {
    type: 'tool',
    slug: 'protect-pdf',
    title: 'Protect PDF with Password Online Free | weFixPDF',
    description: 'Add password protection to any PDF online. Encrypt PDF files to prevent unauthorized access — free, secure, and no account needed.',
    h1: 'Password Protect Your PDF Online — Free & Secure',
    schema_type: 'SoftwareApplication',
    schema_name: 'weFixPDF PDF Protector'
  },
  {
    type: 'tool',
    slug: 'unlock-pdf',
    title: 'Unlock PDF — Remove Password Free Online | weFixPDF',
    description: 'Remove password restrictions from PDFs you own. Unlock PDF files online instantly — free, private, and no registration required.',
    h1: 'Unlock PDF Files Online — Remove Password for Free',
    schema_type: 'SoftwareApplication',
    schema_name: 'weFixPDF PDF Unlocker'
  },
  {
    type: 'tool',
    slug: 'image-to-pdf',
    title: 'Image to PDF Converter — JPG, PNG, WEBP to PDF | weFixPDF',
    description: 'Convert any image to a PDF file online. Supports JPG, PNG, WebP, HEIC, and more. Combine multiple images into one PDF for free.',
    h1: 'Convert Any Image to PDF Online — Free Tool',
    schema_type: 'SoftwareApplication',
    schema_name: 'weFixPDF Image to PDF Converter'
  },
];


async function seedExtraSeo() {
  console.log('Seeding SEO content for blog, use-cases, and compare pages...');
  
  try {
    const insertQuery = `
      INSERT INTO seo_content (
        slug, 
        page_type, 
        title, 
        description, 
        h1, 
        schema_type, 
        schema_name, 
        schema_description
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        description = VALUES(description),
        h1 = VALUES(h1),
        schema_type = VALUES(schema_type),
        schema_name = VALUES(schema_name),
        schema_description = VALUES(schema_description);
    `;

    for (const item of seoData) {
      await db.execute(insertQuery, [
        item.slug,
        item.type,
        item.title,
        item.description,
        item.h1,
        item.schema_type,
        item.schema_name,
        item.description // reusing description for schema_description
      ]);
      console.log(`✓ Seeded ${item.type}/${item.slug}`);
    }

    console.log('Successfully seeded all extra SEO content!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding SEO content:', error);
    process.exit(1);
  }
}

seedExtraSeo();
