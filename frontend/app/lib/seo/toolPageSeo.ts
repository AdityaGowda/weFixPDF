const SITE_URL = "https://wefixpdf.com";
const SITE_NAME = "weFixPDF";
const SITE_LOGO = "https://wefixpdf.com/logo.svg";

export type HowItWorksStep = {
  name: string;
  text: string;
};

export type ToolMetaData = {
  title: string;
  description: string;
  h1: string;
  h2: string;
  intro: string;
  keywords: string[];
  url: string;
  howTo: {
    title: string;
    description: string;
    steps: HowItWorksStep[];
  };
  features: string[];
  faqs: {
    q: string;
    a: string;
  }[];
};


export const ToolPageMetaData: Record<string, ToolMetaData> = {

  "compress-pdf": {
    title: "Compress PDF Online Free — Reduce PDF Size Without Losing Quality | weFixPDF",
    description: "Compress PDF files online for free. Reduce PDF size up to 80% instantly. No sign-up needed. Files deleted immediately after compression.",
    h1: "Free Online PDF Compressor",
    h2: "Reduce PDF File Size Instantly — No Sign-up, No Storage",
    intro: "Compress PDF files online for free in seconds. Our PDF compressor reduces your file size by up to 80% without losing document quality. Perfect for sending PDFs by email, uploading to websites, or saving storage space. Works on Windows, Mac, iPhone, and Android.",
    keywords: [
      "compress pdf online",
      "reduce pdf file size",
      "pdf compressor free",
      "compress pdf without losing quality",
      "make pdf smaller",
      "reduce pdf size online",
      "pdf file size reducer",
      "compress pdf to 100kb",
      "compress pdf for email",
    ],
    url: `${SITE_URL}/compress-pdf`,
    howTo: {
      title: "How to Compress a PDF Online for Free",
      description: "Reduce your PDF file size by up to 80% in seconds using weFixPDF's free online PDF compressor. No sign-up required.",
      steps: [
        {
          name: "Upload your PDF file",
          text: "Click the upload area or drag and drop your PDF file into the compressor tool.",
        },
        {
          name: "Choose compression level",
          text: "Select your preferred compression level — High, Medium, or Low — depending on how much you want to reduce the file size.",
        },
        {
          name: "Start compression",
          text: "Click 'Initiate' to begin compressing your PDF instantly in your browser.",
        },
        {
          name: "Download your compressed PDF",
          text: "Once compression is complete, download your smaller PDF file immediately.",
        },
      ],
    },
    faqs: [
      {
        q: "How do I compress a PDF without losing quality?",
        a: "Upload your PDF, select compression level, and click Compress. Our tool reduces size up to 80% while keeping text and images sharp.",
      },
      {
        q: "Is it safe to compress PDF online?",
        a: "Yes. All files are encrypted during upload and permanently deleted immediately after compression. We never store your files.",
      },
      {
        q: "What is the maximum PDF size I can compress?",
        a: "You can compress PDF files up to 100MB for free with no sign-up required.",
      },
      {
        q: "Does PDF compression work on iPhone and Android?",
        a: "Yes, our PDF compressor works on all devices including iPhone, Android, Windows, and Mac — no app download needed.",
      },
      {
        q: "How much can I reduce my PDF size?",
        a: "Most PDFs can be reduced by 40–80% depending on content. Image-heavy PDFs compress the most.",
      },
    ],
    features: [
      "Reduce PDF size up to 80%",
      "No quality loss on text and graphics",
      "100% free, no sign-up required",
      "Files deleted immediately after compression",
      "Works on all devices and browsers",
    ],
  },

  // ============================================

  "pdf-to-jpg": {
    title: "PDF to JPG Converter Online Free — Convert PDF Pages to Images | weFixPDF",
    description: "Convert PDF to JPG online for free. Extract PDF pages as high-quality JPG images instantly. No sign-up. Files deleted after conversion.",
    h1: "Free PDF to JPG Converter",
    h2: "Convert PDF Pages to High-Quality JPG Images Instantly",
    intro: "Convert PDF to JPG online for free. Extract every page of your PDF as a high-resolution JPG image in seconds. No software installation needed. Works directly in your browser on any device.",
    keywords: [
      "pdf to jpg converter online",
      "convert pdf to jpg free",
      "pdf to image converter",
      "extract images from pdf",
      "pdf to jpeg online",
      "pdf page to image",
      "convert pdf to picture",
      "pdf to jpg high quality",
    ],
    url: `${SITE_URL}/pdf-to-jpg`,
    howTo: {
      title: "How to Convert PDF to JPG Online for Free",
      description: "Extract every page of your PDF as a high-resolution JPG image instantly using weFixPDF's free online PDF to JPG converter.",
      steps: [
        {
          name: "Upload your PDF file",
          text: "Click the upload area or drag and drop your PDF into the converter tool.",
        },
        {
          name: "Start converting to JPG",
          text: "Click 'Initiate' to begin converting each PDF page to a high-quality JPG image.",
        },
        {
          name: "Download your JPG images",
          text: "Once conversion is complete, download all your JPG images in a single ZIP file.",
        },
        {
          name: "Unzip and use your images",
          text: "Extract the ZIP file to access your individual JPG images ready for use anywhere.",
        },
      ],
    },
    faqs: [
      {
        q: "How do I convert a PDF to JPG for free?",
        a: "Upload your PDF, select the pages you want, and click Convert. Download your JPG images instantly — no sign-up needed.",
      },
      {
        q: "Will the JPG images be high quality?",
        a: "Yes. Our converter exports JPG images at high resolution, preserving all text and graphics from your PDF.",
      },
      {
        q: "Can I convert multiple PDF pages to JPG?",
        a: "Yes. Every page of your PDF is converted to a separate JPG image and available to download.",
      },
      {
        q: "Is my PDF safe when converting online?",
        a: "Absolutely. All uploaded PDFs are encrypted and deleted immediately after conversion. We never store your files.",
      },
    ],
    features: [
      "High resolution JPG output",
      "Convert all pages or select specific ones",
      "100% free, no watermark",
      "No sign-up required",
      "Files deleted immediately after conversion",
    ],
  },

  // ============================================

  "pdf-to-word": {
    title: "PDF to Word Converter Online Free — Convert PDF to DOCX | weFixPDF",
    description: "Convert PDF to Word (DOCX) online for free. Accurate, fast PDF to Word conversion. Preserves formatting, tables, and fonts. No sign-up required.",
    h1: "Free PDF to Word Converter",
    h2: "Convert PDF to Editable Word Document — Accurate & Fast",
    intro: "Convert PDF to Word documents online for free. Our PDF to Word converter accurately preserves your original formatting, tables, fonts, and layout. Edit your PDF content in Microsoft Word or Google Docs in seconds.",
    keywords: [
      "pdf to word converter online free",
      "convert pdf to word",
      "pdf to docx converter",
      "pdf to word free",
      "convert pdf to editable word",
      "pdf to word without losing formatting",
      "adobe pdf to word",
      "extract text from pdf",
    ],
    url: `${SITE_URL}/pdf-to-word`,
    howTo: {
      title: "How to Convert PDF to Word Online for Free",
      description: "Convert your PDF to an editable Word document in seconds using weFixPDF. Formatting, tables, and fonts are preserved accurately.",
      steps: [
        {
          name: "Upload your PDF file",
          text: "Click the upload area or drag and drop your PDF into the converter tool.",
        },
        {
          name: "Start conversion to Word",
          text: "Click 'Initiate' to begin converting your PDF to an editable Word document.",
        },
        {
          name: "Wait for processing",
          text: "Our tool processes your PDF and accurately recreates the layout, fonts, and tables in Word format.",
        },
        {
          name: "Download your Word document",
          text: "Download your editable .docx file ready to open in Microsoft Word, Google Docs, or LibreOffice.",
        },
      ],
    },
    faqs: [
      {
        q: "How do I convert PDF to Word for free?",
        a: "Upload your PDF and click Convert. Your Word document (.docx) will be ready to download in seconds — completely free.",
      },
      {
        q: "Will the formatting be preserved?",
        a: "Yes. Our converter preserves fonts, tables, columns, and layout as accurately as possible in the Word document.",
      },
      {
        q: "Can I edit the Word document after conversion?",
        a: "Yes. The output is a standard .docx file that works in Microsoft Word, Google Docs, and LibreOffice.",
      },
      {
        q: "Is there a file size limit?",
        a: "You can convert PDFs up to 50MB for free with no sign-up required.",
      },
    ],
    features: [
      "Accurate formatting preservation",
      "Tables, fonts, and layout retained",
      "Output is standard .docx format",
      "100% free, no watermark",
      "Files deleted immediately after conversion",
    ],
  },

  // ============================================

  "merge-pdf": {
    title: "Merge PDF Online Free — Combine Multiple PDFs Into One | weFixPDF",
    description: "Merge PDF files online for free. Combine multiple PDFs into one document instantly. Drag and drop to reorder pages. No sign-up required.",
    h1: "Free Online PDF Merger",
    h2: "Combine Multiple PDF Files Into One Document Instantly",
    intro: "Merge multiple PDF files into one document online for free. Simply upload your PDFs, drag to reorder if needed, and download your merged file in seconds. No software needed, works on all devices.",
    keywords: [
      "merge pdf online free",
      "combine pdf files",
      "pdf merger online",
      "join pdf files",
      "merge multiple pdfs into one",
      "pdf combiner free",
      "combine pdf pages",
      "merge pdf without adobe",
    ],
    url: `${SITE_URL}/merge-pdf`,
    howTo: {
      title: "How to Merge PDF Files Online for Free",
      description: "Combine multiple PDF files into one document instantly using weFixPDF's free online PDF merger. No sign-up required.",
      steps: [
        {
          name: "Upload your PDF files",
          text: "Click the upload area or drag and drop two or more PDF files into the merger tool.",
        },
        {
          name: "Reorder your files",
          text: "Drag and drop the uploaded PDFs to arrange them in the order you want in the final document.",
        },
        {
          name: "Merge your PDFs",
          text: "Click 'Merge PDF' to combine all uploaded files into a single PDF document.",
        },
        {
          name: "Download your merged PDF",
          text: "Download your combined PDF file instantly — all pages from every file in one document.",
        },
      ],
    },
    faqs: [
      {
        q: "How do I merge PDF files for free?",
        a: "Upload two or more PDF files, arrange them in order, and click Merge. Download your combined PDF instantly.",
      },
      {
        q: "How many PDFs can I merge at once?",
        a: "You can merge up to 20 PDF files at once for free with no sign-up required.",
      },
      {
        q: "Can I reorder pages before merging?",
        a: "Yes. Simply drag and drop your files to set the order before merging.",
      },
      {
        q: "Will the quality be affected when merging?",
        a: "No. Merging PDFs does not affect the quality or content of the original documents.",
      },
    ],
    features: [
      "Merge up to 20 PDFs at once",
      "Drag and drop reordering",
      "No quality loss",
      "100% free, no sign-up",
      "Files deleted after merging",
    ],
  },

  // ============================================

  "split-pdf": {
    title: "Split PDF Online Free — Extract Pages from PDF | weFixPDF",
    description: "Split PDF files online for free. Extract specific pages or split large PDFs into smaller files. Fast, secure, no sign-up required.",
    h1: "Free Online PDF Splitter",
    h2: "Split PDF or Extract Specific Pages Instantly",
    intro: "Split your PDF into individual pages or extract specific page ranges online for free. Perfect for extracting a single page, splitting a large PDF into chapters, or removing unwanted pages. No software needed.",
    keywords: [
      "split pdf online free",
      "extract pages from pdf",
      "pdf splitter online",
      "separate pdf pages",
      "split pdf into multiple files",
      "extract one page from pdf",
      "pdf page extractor",
      "remove pages from pdf",
    ],
    url: `${SITE_URL}/split-pdf`,
    howTo: {
      title: "How to Split a PDF Online for Free",
      description: "Extract specific pages or split your PDF into multiple files instantly using weFixPDF's free online PDF splitter.",
      steps: [
        {
          name: "Upload your PDF file",
          text: "Click the upload area or drag and drop your PDF file into the splitter tool.",
        },
        {
          name: "Select pages to extract",
          text: "Choose specific pages, a page range, or select all pages to split into individual files.",
        },
        {
          name: "Split your PDF",
          text: "Click 'Split PDF' to extract your selected pages into separate PDF files.",
        },
        {
          name: "Download your split files",
          text: "Download your extracted PDF files instantly, individually or as a ZIP archive.",
        },
      ],
    },
    faqs: [
      {
        q: "How do I split a PDF online for free?",
        a: "Upload your PDF, select the pages or page ranges you want, and click Split. Download your files instantly.",
      },
      {
        q: "Can I extract just one page from a PDF?",
        a: "Yes. You can select any single page or range of pages to extract from your PDF.",
      },
      {
        q: "Will splitting affect PDF quality?",
        a: "No. Splitting a PDF does not change the content or quality of the extracted pages.",
      },
      {
        q: "Can I split a large PDF?",
        a: "Yes. Our tool supports PDFs up to 100MB and can split them into as many files as needed.",
      },
    ],
    features: [
      "Extract any page or page range",
      "Split into individual pages",
      "Supports large PDFs up to 100MB",
      "100% free, no sign-up",
      "Files deleted immediately after splitting",
    ],
  },

  // ============================================
  // IMAGE TOOLS
  // ============================================

  "image-compressor": {
    title: "Free Online Image Compressor — Reduce JPG, PNG & WEBP Size | weFixPDF",
    description: "Compress images online for free. Reduce JPG, PNG and WEBP file sizes by up to 80% without quality loss. No sign-up required. Instant results.",
    h1: "Free Online Image Compressor",
    h2: "Reduce Image File Size by 80% Without Losing Quality",
    intro: "Compress JPG, PNG, and WEBP images online for free. Our image compressor reduces file sizes by up to 80% while keeping your photos and graphics looking sharp. Perfect for websites, email attachments, and social media.",
    keywords: [
      "image compressor online free",
      "compress image without losing quality",
      "reduce image file size",
      "jpg compressor online",
      "png compressor free",
      "compress photo online",
      "reduce image size in kb",
      "compress image to 100kb",
      "image size reducer",
    ],
    url: `${SITE_URL}/image-compressor`,
    howTo: {
      title: "How to Compress an Image Online for Free",
      description: "Reduce JPG, PNG and WEBP image file sizes by up to 80% without quality loss using weFixPDF's free online image compressor. No sign-up required.",
      steps: [
        {
          name: "Upload your image",
          text: "Upload your JPG, PNG, or WEBP image by clicking the upload area or dragging it into the compressor tool.",
        },
        {
          name: "Start compression",
          text: "Click 'Initiate' to start compressing your image instantly using our smart compression algorithms.",
        },
        {
          name: "Compression runs automatically",
          text: "Our tool automatically compresses your image, reducing file size while preserving visual quality.",
        },
        {
          name: "Download your compressed image",
          text: "Download your optimized image immediately — smaller file size with no visible quality loss.",
        },
      ],
    },
    faqs: [
      {
        q: "How do I compress an image without losing quality?",
        a: "Upload your image and our tool automatically compresses it using smart algorithms that reduce file size while preserving visual quality.",
      },
      {
        q: "Which image formats can I compress?",
        a: "You can compress JPG, PNG, and WEBP images. Support for more formats coming soon.",
      },
      {
        q: "How much can I reduce my image size?",
        a: "Most images can be reduced by 40–80% depending on content. Photos compress more than graphics.",
      },
      {
        q: "Is there a limit on how many images I can compress?",
        a: "You can compress unlimited images for free. No sign-up or account needed.",
      },
    ],
    features: [
      "Supports JPG, PNG, WEBP",
      "Up to 80% size reduction",
      "No visible quality loss",
      "Bulk compress multiple images",
      "100% free, no sign-up",
    ],
  },

  // ============================================

  "jpg-to-png": {
    title: "JPG to PNG Converter Online Free — Lossless Quality, No Watermark | weFixPDF",
    description: "Convert JPG to PNG online for free. Lossless quality conversion, no watermarks. Instant results with zero data retention. No sign-up required.",
    h1: "Free JPG to PNG Converter",
    h2: "Convert JPG to Transparent PNG — Lossless Quality, No Watermark",
    intro: "Convert JPG images to PNG format online for free. PNG is perfect for images that need transparency or lossless quality. Our converter delivers crisp, clean PNG files instantly with no watermarks.",
    keywords: [
      "jpg to png converter online free",
      "convert jpg to png",
      "jpeg to png online",
      "jpg to png transparent",
      "change jpg to png",
      "jpg to png no background",
      "convert image to png free",
      "jpg to png high quality",
    ],
    url: `${SITE_URL}/jpg-to-png`,
    howTo: {
      title: "How to Convert JPG to PNG Online for Free",
      description: "Convert JPG images to lossless PNG format instantly using weFixPDF's free online converter. No watermarks, no sign-up required.",
      steps: [
        {
          name: "Upload your JPG image",
          text: "Click the upload area or drag and drop your JPG or JPEG image into the converter tool.",
        },
        {
          name: "Start converting to PNG",
          text: "Click 'Initiate' to begin converting your JPG image to PNG format.",
        },
        {
          name: "Download your PNG file",
          text: "Download your lossless PNG file instantly — no watermark, full quality preserved.",
        },
      ],
    },
    faqs: [
      {
        q: "Why should I convert JPG to PNG?",
        a: "PNG supports transparency and lossless compression, making it ideal for logos, icons, and images that need a transparent background.",
      },
      {
        q: "Will I lose quality converting JPG to PNG?",
        a: "No. PNG is a lossless format so your converted image will maintain full quality.",
      },
      {
        q: "Can I convert multiple JPGs to PNG at once?",
        a: "Yes. You can upload and convert multiple JPG files to PNG in one go.",
      },
      {
        q: "Is the converted PNG file free of watermarks?",
        a: "Yes. All converted files are completely watermark-free.",
      },
    ],
    features: [
      "Lossless PNG output",
      "No watermarks",
      "Supports transparency",
      "Bulk conversion supported",
      "100% free, no sign-up",
    ],
  },

  // ============================================

  "png-to-jpg": {
    title: "PNG to JPG Converter Online Free — Optimize Images for Web | weFixPDF",
    description: "Convert PNG to JPG online for free. Smaller file sizes, optimized for web and email. Fast, secure, and private. No sign-up required.",
    h1: "Free PNG to JPG Converter",
    h2: "Convert PNG to JPG — Smaller Files, Optimized for Web",
    intro: "Convert PNG images to JPG format online for free. JPG files are smaller and load faster on websites, making them perfect for web use and email attachments. Instant conversion with no quality compromise.",
    keywords: [
      "png to jpg converter online free",
      "convert png to jpg",
      "png to jpeg online",
      "change png to jpg",
      "png to jpg smaller size",
      "convert image format free",
      "png to jpg high quality",
      "reduce png file size to jpg",
    ],
    url: `${SITE_URL}/png-to-jpg`,
    howTo: {
      title: "How to Convert PNG to JPG Online for Free",
      description: "Convert PNG images to smaller JPG files optimized for web and email using weFixPDF's free online converter. Instant results, no sign-up.",
      steps: [
        {
          name: "Upload your PNG image",
          text: "Click the upload area or drag and drop your PNG image into the converter tool.",
        },
        {
          name: "Start converting to JPG",
          text: "Click 'Initiate' to begin converting your PNG to a smaller, web-optimized JPG file.",
        },
        {
          name: "Download your JPG file",
          text: "Download your converted JPG file instantly — smaller size, no watermark, ready for web or email use.",
        },
      ],
    },
    faqs: [
      {
        q: "Why convert PNG to JPG?",
        a: "JPG files are significantly smaller than PNG, making them faster to load on websites and easier to send via email.",
      },
      {
        q: "Will converting PNG to JPG reduce quality?",
        a: "There is minimal quality difference for photos. JPG uses compression that slightly reduces file size while keeping images looking great.",
      },
      {
        q: "Can I convert PNG to JPG with a white background?",
        a: "Yes. Transparent areas in PNG are automatically filled with a white background when converting to JPG.",
      },
      {
        q: "How many PNG files can I convert?",
        a: "You can convert unlimited PNG files to JPG for free with no sign-up.",
      },
    ],
    features: [
      "Smaller JPG output files",
      "Transparent areas auto-filled white",
      "Bulk conversion supported",
      "100% free, no watermark",
      "Files deleted immediately",
    ],
  },

  // ============================================

  "png-to-webp": {
    title: "PNG to WEBP Converter Online Free — Next-Gen Web Image Format | weFixPDF",
    description: "Convert PNG to WEBP online for free. WEBP images are 30% smaller than PNG. Boost your website speed with next-gen image format. No sign-up.",
    h1: "Free PNG to WEBP Converter",
    h2: "Convert PNG to WEBP — 30% Smaller Files for Faster Websites",
    intro: "Convert PNG images to WEBP format online for free. WEBP is Google's next-generation image format that delivers 25–35% smaller file sizes compared to PNG, making your website load faster and rank better on Google.",
    keywords: [
      "png to webp converter online free",
      "convert png to webp",
      "image to webp converter",
      "png to webp free",
      "webp image converter",
      "convert images to webp for website",
      "next gen image format converter",
      "png to webp without losing quality",
    ],
    url: `${SITE_URL}/png-to-webp`,
    howTo: {
      title: "How to Convert PNG to WEBP Online for Free",
      description: "Convert PNG images to Google's next-gen WEBP format for 25–35% smaller file sizes using weFixPDF's free online converter. No sign-up required.",
      steps: [
        {
          name: "Upload your PNG image",
          text: "Click the upload area or drag and drop your PNG image into the converter tool.",
        },
        {
          name: "Start converting to WEBP",
          text: "Click 'Initiate' to begin converting your PNG to the next-gen WEBP format.",
        },
        {
          name: "Download your WEBP file",
          text: "Download your smaller WEBP file instantly — 25–35% smaller than the original PNG with no visible quality loss.",
        },
      ],
    },
    faqs: [
      {
        q: "What is WEBP and why should I use it?",
        a: "WEBP is a modern image format by Google that offers 25–35% smaller file sizes than PNG or JPG, making websites load faster and improving SEO.",
      },
      {
        q: "Will WEBP images look the same as PNG?",
        a: "Yes. WEBP supports both lossless and lossy compression. Our tool preserves visual quality while reducing file size.",
      },
      {
        q: "Do all browsers support WEBP?",
        a: "Yes. WEBP is supported by all modern browsers including Chrome, Firefox, Safari, and Edge.",
      },
      {
        q: "How much smaller will my WEBP file be?",
        a: "WEBP files are typically 25–35% smaller than PNG files of the same image.",
      },
    ],
    features: [
      "25–35% smaller than PNG",
      "Supports transparency like PNG",
      "Supported by all modern browsers",
      "Bulk conversion supported",
      "100% free, no sign-up",
    ],
  },

  // ============================================

  "image-to-pdf": {
    title: "Image to PDF Converter Online Free — JPG, PNG to PDF | weFixPDF",
    description: "Convert images to PDF online for free. Supports JPG, PNG, WEBP. Combine multiple images into one PDF. No sign-up. Files deleted after conversion.",
    h1: "Free Image to PDF Converter",
    h2: "Convert JPG, PNG & WEBP Images to PDF Instantly",
    intro: "Convert JPG, PNG, and WEBP images to PDF online for free. Combine multiple images into a single PDF document or convert one image at a time. Perfect for creating portfolios, documents, and reports from photos.",
    keywords: [
      "image to pdf converter online free",
      "jpg to pdf converter",
      "png to pdf online free",
      "convert photo to pdf",
      "multiple images to pdf",
      "combine images into pdf",
      "picture to pdf converter",
      "convert image to pdf free",
    ],
    url: `${SITE_URL}/image-to-pdf`,
    howTo: {
      title: "How to Convert Images to PDF Online for Free",
      description: "Convert JPG, PNG, and WEBP images to a PDF document instantly using weFixPDF's free online converter. Combine multiple images into one PDF.",
      steps: [
        {
          name: "Upload your images",
          text: "Upload one or more JPG, PNG, or WEBP images by clicking the upload area or dragging them into the tool.",
        },
        {
          name: "Arrange image order",
          text: "If combining multiple images, drag and drop them to arrange the order they will appear in the PDF.",
        },
        {
          name: "Start conversion to PDF",
          text: "Click 'Initiate' to begin converting your images into a PDF document.",
        },
        {
          name: "Download your PDF",
          text: "Download your completed PDF file instantly — all images combined at full quality.",
        },
      ],
    },
    faqs: [
      {
        q: "How do I convert an image to PDF for free?",
        a: "Upload your JPG, PNG, or WEBP image and click Convert. Your PDF will be ready to download instantly.",
      },
      {
        q: "Can I combine multiple images into one PDF?",
        a: "Yes. Upload multiple images and our tool combines them into a single PDF document.",
      },
      {
        q: "What image formats are supported?",
        a: "We support JPG, JPEG, PNG, and WEBP image formats.",
      },
      {
        q: "Will the image quality be preserved in the PDF?",
        a: "Yes. Images are embedded at full quality in the PDF output.",
      },
    ],
    features: [
      "Supports JPG, PNG, WEBP",
      "Combine multiple images into one PDF",
      "Full quality image embedding",
      "100% free, no watermark",
      "Files deleted immediately",
    ],
  },

  // ============================================

  "heic-to-jpg": {
    title: "HEIC to JPG Converter Online Free — Convert iPhone Photos | weFixPDF",
    description: "Convert HEIC to JPG online for free. Convert iPhone HEIC photos to JPG instantly in your browser. No app needed. No sign-up required.",
    h1: "Free HEIC to JPG Converter",
    h2: "Convert iPhone HEIC Photos to JPG — Fast & Free",
    intro: "Convert HEIC images to JPG format online for free. HEIC is the default photo format on iPhones, but it's not supported everywhere. Convert your HEIC photos to universally compatible JPG in seconds — no app download needed.",
    keywords: [
      "heic to jpg converter online free",
      "convert heic to jpg",
      "iphone heic to jpg",
      "heic to jpeg online",
      "open heic file on windows",
      "heic converter free",
      "convert apple heic photo",
      "heic to jpg without losing quality",
    ],
    url: `${SITE_URL}/heic-to-jpg`,
    howTo: {
      title: "How to Convert HEIC to JPG Online for Free",
      description: "Convert iPhone HEIC photos to universally compatible JPG format instantly using weFixPDF's free online converter. No app download needed.",
      steps: [
        {
          name: "Upload your HEIC file",
          text: "Click the upload area or drag and drop your HEIC photo from your iPhone into the converter tool.",
        },
        {
          name: "Start converting to JPG",
          text: "Click 'Initiate' to begin converting your HEIC image to a universally compatible JPG file.",
        },
        {
          name: "Download your JPG file",
          text: "Download your converted JPG file instantly — compatible with Windows, Android, and all websites.",
        },
      ],
    },
    faqs: [
      {
        q: "What is a HEIC file?",
        a: "HEIC is Apple's High Efficiency Image Format used by iPhones for photos. It offers great quality at small file sizes but isn't widely supported outside Apple devices.",
      },
      {
        q: "How do I convert HEIC to JPG for free?",
        a: "Upload your HEIC file and click Convert. Your JPG will be ready to download instantly with no sign-up.",
      },
      {
        q: "Will HEIC to JPG conversion lose quality?",
        a: "Minimal quality difference. JPG is a near-lossless conversion from HEIC and looks virtually identical.",
      },
      {
        q: "Can I open HEIC files on Windows after converting?",
        a: "Yes. Once converted to JPG, your photos will open on any Windows PC, Android phone, or website.",
      },
    ],
    features: [
      "Works with iPhone HEIC photos",
      "No app download needed",
      "High quality JPG output",
      "Bulk HEIC conversion supported",
      "100% free, no sign-up",
    ],
  },
};