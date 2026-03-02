// schemas.ts — create this file in your project
// Import and use in app/page.tsx

const SITE_URL = "https://wefixpdf.com";
const SITE_NAME = "weFixPDF";
const SITE_LOGO = "https://wefixpdf.com/logo.svg";

// ============================================
// ALL TOOLS LIST
// ============================================

export const tools = [
  {
    position: 1,
    name: "Compress PDF",
    description: "Reduce PDF file size online free without losing quality",
    url: `${SITE_URL}/compress-pdf`,
    keywords: ["compress pdf", "reduce pdf size", "pdf compressor", "make pdf smaller", "compress pdf online free"],
  },
  {
    position: 2,
    name: "PDF to JPG",
    description: "Convert PDF pages to high quality JPG images free",
    url: `${SITE_URL}/pdf-to-jpg`,
    keywords: ["pdf to jpg", "convert pdf to image", "pdf to jpeg", "extract images from pdf", "pdf page to jpg"],
  },
  {
    position: 3,
    name: "JPG to PNG",
    description: "Convert JPG to transparent PNG online free, no watermark",
    url: `${SITE_URL}/jpg-to-png`,
    keywords: ["jpg to png", "jpeg to png", "convert jpg to png", "jpg to png transparent", "jpg to png free"],
  },
  {
    position: 4,
    name: "PNG to JPG",
    description: "Convert PNG to JPG online free, smaller files for web",
    url: `${SITE_URL}/png-to-jpg`,
    keywords: ["png to jpg", "png to jpeg", "convert png to jpg", "png to jpg smaller", "png to jpg online free"],
  },
  {
    position: 5,
    name: "Image Compressor",
    description: "Compress JPG, PNG and WEBP images online free up to 80%",
    url: `${SITE_URL}/image-compressor`,
    keywords: ["image compressor", "compress image online", "reduce image size", "compress jpg", "compress png free"],
  },
  {
    position: 6,
    name: "PNG to WEBP",
    description: "Convert PNG to WEBP next-gen format free, 30% smaller files",
    url: `${SITE_URL}/png-to-webp`,
    keywords: ["png to webp", "convert png to webp", "image to webp", "webp converter", "png to webp free"],
  },
  {
    position: 7,
    name: "Image to PDF",
    description: "Convert JPG, PNG and WEBP images to PDF online free",
    url: `${SITE_URL}/image-to-pdf`,
    keywords: ["image to pdf", "jpg to pdf", "png to pdf", "convert photo to pdf", "multiple images to pdf free"],
  },
  // {
  //   position: 8,
  //   name: "Merge PDF",
  //   description: "Combine multiple PDF files into one document online free",
  //   url: `${SITE_URL}/merge-pdf`,
  //   keywords: ["merge pdf", "combine pdf", "pdf merger online", "join pdf files", "merge pdf free"],
  // },
  // {
  //   position: 9,
  //   name: "Split PDF",
  //   description: "Split PDF or extract specific pages online free",
  //   url: `${SITE_URL}/split-pdf`,
  //   keywords: ["split pdf", "extract pages from pdf", "pdf splitter", "separate pdf pages", "split pdf free online"],
  // },
  // {
  //   position: 10,
  //   name: "PDF to Word",
  //   description: "Convert PDF to editable Word DOCX document online free",
  //   url: `${SITE_URL}/pdf-to-word`,
  //   keywords: ["pdf to word", "pdf to docx", "convert pdf to word free", "pdf to word online", "pdf to editable word"],
  // },
  // {
  //   position: 11,
  //   name: "HEIC to JPG",
  //   description: "Convert iPhone HEIC photos to JPG instantly free",
  //   url: `${SITE_URL}/heic-to-jpg`,
  //   keywords: ["heic to jpg", "convert heic to jpg", "iphone heic converter", "heic to jpeg free", "open heic on windows"],
  // },
];

// ============================================
// HOMEPAGE SCHEMAS OBJECT
// ============================================

export const homePageSchemas = {

  metadata: {
  title: "Free Online File Converter — PDF, Images & Documents | weFixPDF",
  description: "Compress PDF, convert PDF to JPG, merge PDF, JPG to PNG, compress images and more. 100% free, no sign-up, zero data retention.",
  alternates: {
    canonical: "https://wefixpdf.com",
},
keywords: [
  "compress pdf online free",
  "pdf compressor free",
  "reduce pdf file size",
  "pdf to jpg converter",
  "pdf to word converter free",
  "merge pdf online free",
  "split pdf online",
  "jpg to png converter",
  "png to jpg converter",
  "image compressor online",
  "compress image without losing quality",
  "png to webp converter",
  "image to pdf converter",
  "free online file converter",
  "heic to jpg converter",
  "how to compress a pdf",
  "how to reduce pdf file size",
  "how to convert pdf to jpg",
  "how to merge pdf files free",
  "how to compress images online",
  "compress pdf without losing quality",
  "reduce image size in kb online free",
  "compress image to 100kb online free",
  "free pdf tools no sign up",
  "online file converter no watermark",
  "compress pdf online free india",
  "pdf converter free india",
  "pdf tools online free",
  "image tools online free",
  "convert image format online",
  "heic to jpg",
  "convert heic to jpg online free",
  "iphone heic to jpg converter",
  "heic to jpeg online",
  "open heic file on windows",
  "heic converter free online",
  "convert apple photo heic",
  "heic to jpg without losing quality",
  "how to convert heic to jpg",
  "merge pdf online free",
  "combine pdf files online",
  "pdf merger free",
  "join pdf files online",
  "merge multiple pdf into one",
  "combine pdf pages free",
  "pdf combiner online no sign up",
  "how to merge pdf files",
  "merge pdf without adobe",
  "split pdf online free",
  "extract pages from pdf",
  "pdf splitter free",
  "separate pdf pages online",
  "split pdf into multiple files",
  "extract one page from pdf free",
  "remove pages from pdf online",
  "how to split a pdf file",
  "pdf to word converter free",
  "convert pdf to word online",
  "pdf to docx converter",
  "pdf to editable word free",
  "pdf to word without losing formatting",
  "convert pdf to word document",
  "pdf to word no sign up",
  "how to convert pdf to word",
  "adobe pdf to word free alternative",
],
    },
  webApplication: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": SITE_LOGO,
    "description": "Free online file converter. Compress PDF, convert PDF to JPG, merge PDF, split PDF, convert JPG to PNG, compress images, PNG to WEBP and more. 100% free, zero data retention, no sign-up required.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "inLanguage": "en",
    "keywords": [
      // PDF
      "compress pdf online free",
      "pdf compressor",
      "reduce pdf file size",
      "pdf to jpg converter",
      "pdf to word converter",
      "merge pdf online free",
      "split pdf online",
      "pdf to jpeg",
      "compress pdf without losing quality",
      // Image
      "image compressor online free",
      "compress jpg online",
      "compress png online",
      "jpg to png converter",
      "png to jpg converter",
      "png to webp converter",
      "image to pdf converter",
      "heic to jpg converter",
      "reduce image file size",
      // General
      "free online file converter",
      "online file converter no sign up",
      "file converter zero retention",
      "secure file converter online",
      "free pdf tools online",
      "free image tools online",
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": tools.map(t => t.name),
  },

  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": SITE_LOGO,
      "width": 200,
      "height": 60
    },
    "description": "weFixPDF provides free online file conversion tools for PDF and images with zero data retention and complete privacy.",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "url": `${SITE_URL}/about`,
      "availableLanguage": "English"
    }
  },

  webSite: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
    "description": "Free online PDF and image converter. Convert, compress and transform files instantly with zero data retention.",
    "inLanguage": "en",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/{search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  },

  itemList: {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Free Online PDF and Image Conversion Tools",
    "description": "Complete list of free PDF and image conversion tools by weFixPDF. Convert, compress and transform files instantly.",
    "numberOfItems": tools.length,
    "itemListElement": tools.map(tool => ({
      "@type": "ListItem",
      "position": tool.position,
      "name": tool.name,
      "description": tool.description,
      "url": tool.url,
    })),
  },

};





