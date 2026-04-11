import { Metadata } from "next";
import HomeContent from "./HomeContent";
import { getHomepageData } from "./lib/seo/seoApi";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHomepageData();

  const ogImage = {
    url: "https://wefixpdf.com/wfp.png",
    width: 1200,
    height: 630,
    alt: "weFixPDF — Free Online PDF & Image Tools",
  };

  if (seo) {
    return {
      title: seo.title,
      description: seo.description,
      alternates: { canonical: seo.url },
      keywords: seo.keywords,
      robots: { index: true, follow: true },
      openGraph: {
        title: seo.title,
        description: seo.description,
        url: seo.url,
        siteName: "weFixPDF",
        type: "website",
        locale: "en_US",
        images: [ogImage],
      },
      twitter: {
        card: "summary_large_image",
        title: seo.title,
        description: seo.description,
        images: ["https://wefixpdf.com/wfp.png"],
        site: "@wefixpdf",
      },
    };
  }

  return {
    title: "Compress PDF & Image Converter Free Online — No Sign-Up | weFixPDF",
    description:
      "Free online tools: compress PDF, convert PDF to JPG or Word, merge PDF, split PDF, protect & unlock PDF. Compress images, convert JPG to PNG, HEIC to JPG, PNG to WebP. No account. Files deleted instantly.",
    alternates: { canonical: "https://wefixpdf.com" },
    keywords: [
      "compress pdf free",
      "compress pdf online",
      "convert pdf free",
      "merge pdf free",
      "split pdf free",
      "pdf to jpg",
      "pdf to word",
      "rotate pdf",
      "protect pdf",
      "unlock pdf",
      "free pdf tools online",
      "compress image free",
      "compress image online",
      "jpg to png converter",
      "png to jpg converter",
      "heic to jpg converter",
      "png to webp converter",
      "image compressor online",
      "free image converter",
      "free online file converter no sign up",
      "smallpdf alternative",
      "ilovepdf alternative",
      "adobe acrobat alternative free",
    ],
    robots: { index: true, follow: true },
    openGraph: {
      title: "Compress PDF & Image Converter Free Online | weFixPDF",
      description:
        "Free PDF & image tools: compress PDF, merge, split, convert PDF to JPG or Word. Plus compress images, JPG↔PNG, HEIC to JPG, PNG to WebP. No account, files deleted instantly.",
      url: "https://wefixpdf.com",
      siteName: "weFixPDF",
      type: "website",
      locale: "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: "Free PDF & Image Tools Online — weFixPDF",
      description:
        "Compress PDF, convert images, merge & split PDFs, JPG↔PNG, HEIC to JPG — free, no sign-up, files deleted instantly.",
      images: ["https://wefixpdf.com/wfp.png"],
      site: "@wefixpdf",
    },
  };
}

const fallbackSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "weFixPDF",
    url: "https://wefixpdf.com",
    logo: "https://wefixpdf.com/wfp.png",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (Web Browser)",
    description:
      "Free online tools to compress PDF, convert PDF to JPG or Word, merge PDF, split PDF, compress images, convert JPG to PNG, HEIC to JPG, and 50+ developer utilities. No sign-up, zero data retention.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "487",
      bestRating: "5",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "weFixPDF",
    url: "https://wefixpdf.com",
    logo: {
      "@type": "ImageObject",
      url: "https://wefixpdf.com/wfp.png",
      width: 200,
      height: 60,
    },
    sameAs: [],
    description:
      "weFixPDF provides free online file conversion tools for PDF and images with zero data retention and complete privacy.",
    contactPoint: {
      "@type": "ContactPoint",
      url: "https://wefixpdf.com/about",
      contactType: "customer support",
      availableLanguage: "English",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "weFixPDF",
    url: "https://wefixpdf.com",
    inLanguage: "en",
    description:
      "Free online PDF and image converter. Convert, compress and transform files instantly with zero data retention.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://wefixpdf.com/tools?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Online PDF, Image & Developer Tools",
    description:
      "Complete list of free online tools by weFixPDF — compress PDF, convert images, and 30+ browser-based developer utilities. No sign-up, zero data retention.",
    numberOfItems: 19,
    itemListElement: [
      { "@type": "ListItem", position: 1,  name: "Compress PDF",           url: "https://wefixpdf.com/tools/compress-pdf",           description: "Reduce PDF file size online free without losing quality" },
      { "@type": "ListItem", position: 2,  name: "PDF to JPG",             url: "https://wefixpdf.com/tools/pdf-to-jpg",             description: "Convert PDF pages to high quality JPG images free" },
      { "@type": "ListItem", position: 3,  name: "Merge PDF",              url: "https://wefixpdf.com/tools/merge-pdf",              description: "Combine multiple PDF files into one document online free" },
      { "@type": "ListItem", position: 4,  name: "Split PDF",              url: "https://wefixpdf.com/tools/split-pdf",              description: "Split PDF or extract specific pages online free" },
      { "@type": "ListItem", position: 5,  name: "Rotate PDF",             url: "https://wefixpdf.com/tools/rotate-pdf",             description: "Rotate PDF pages online free — no sign-up required" },
      { "@type": "ListItem", position: 6,  name: "Protect PDF",            url: "https://wefixpdf.com/tools/protect-pdf",            description: "Password protect PDF files online free and securely" },
      { "@type": "ListItem", position: 7,  name: "Unlock PDF",             url: "https://wefixpdf.com/tools/unlock-pdf",             description: "Remove password from PDF files online free instantly" },
      { "@type": "ListItem", position: 8,  name: "PDF to Word",            url: "https://wefixpdf.com/tools/pdf-to-word",            description: "Convert PDF to editable Word DOCX document online free" },
      { "@type": "ListItem", position: 9,  name: "JPG to PNG",             url: "https://wefixpdf.com/tools/jpg-to-png",             description: "Convert JPG to transparent PNG online free, no watermark" },
      { "@type": "ListItem", position: 10, name: "PNG to JPG",             url: "https://wefixpdf.com/tools/png-to-jpg",             description: "Convert PNG to JPG online free, smaller files for web" },
      { "@type": "ListItem", position: 11, name: "Image Compressor",       url: "https://wefixpdf.com/tools/image-compressor",       description: "Compress JPG, PNG and WEBP images online free up to 80%" },
      { "@type": "ListItem", position: 12, name: "PNG to WEBP",            url: "https://wefixpdf.com/tools/png-to-webp",            description: "Convert PNG to WEBP next-gen format free, 30% smaller files" },
      { "@type": "ListItem", position: 13, name: "HEIC to JPG",            url: "https://wefixpdf.com/tools/heic-to-jpg",            description: "Convert iPhone HEIC photos to JPG instantly free" },
      { "@type": "ListItem", position: 14, name: "CSV ↔ JSON Converter",   url: "https://wefixpdf.com/tools/csv-json-converter",     description: "Convert CSV to JSON or JSON to CSV with live preview in your browser" },
      { "@type": "ListItem", position: 15, name: "JSON Formatter",         url: "https://wefixpdf.com/tools/json-formatter",         description: "Format, validate, and inspect JSON with a tree view — all in browser" },
      { "@type": "ListItem", position: 16, name: "JWT Decoder",            url: "https://wefixpdf.com/tools/jwt-decoder",            description: "Decode JSON Web Tokens without sending them to a server" },
      { "@type": "ListItem", position: 17, name: "Text Diff Checker",      url: "https://wefixpdf.com/tools/text-diff-checker",      description: "Compare two texts and highlight every change instantly" },
      { "@type": "ListItem", position: 18, name: "JSON to YAML",           url: "https://wefixpdf.com/tools/json-to-yaml",           description: "Convert JSON to YAML format locally in your browser" },
      { "@type": "ListItem", position: 19, name: "Color Palette Generator",url: "https://wefixpdf.com/tools/color-palette-generator","description": "Generate harmonious color palettes and export as CSS, Tailwind, or JSON" },
    ],
  },
];

export default async function Home() {
  const { schemas: apiSchemas, tools } = await getHomepageData();

  const schemas =
    apiSchemas.length > 0
      ? apiSchemas.map((s) => s.schema_data)
      : fallbackSchemas;

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <HomeContent tools={tools} />
    </>
  );
}
