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
    title: "Free Online PDF & Image Converter — No Sign-Up | weFixPDF",
    description:
      "Compress PDF, merge PDF, split PDF, convert PDF to JPG, PDF to Word, JPG to PNG, PNG to WEBP, compress images and more. 100% free, no account, zero data retention.",
    alternates: { canonical: "https://wefixpdf.com" },
    keywords: [
      "free pdf converter",
      "compress pdf",
      "merge pdf",
      "split pdf",
      "pdf to jpg",
      "pdf to word",
      "rotate pdf",
      "protect pdf",
      "unlock pdf",
      "jpg to png",
      "png to jpg",
      "image compressor",
      "png to webp",
      "heic to jpg",
      "free online file converter",
      "no sign up pdf tool",
    ],
    robots: { index: true, follow: true },
    openGraph: {
      title: "Free Online PDF & Image Converter — No Sign-Up | weFixPDF",
      description:
        "Compress PDF, convert images, merge PDF and more. 100% free, no account required, zero data retention.",
      url: "https://wefixpdf.com",
      siteName: "weFixPDF",
      type: "website",
      locale: "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: "weFixPDF — Free Online PDF & Image Tools",
      description:
        "Compress PDF, convert images, merge PDF — free, no sign-up, zero data retention.",
      images: ["https://wefixpdf.com/wfp.png"],
      site: "@wefixpdf",
    },
  };
}

const fallbackSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "weFixPDF",
    url: "https://wefixpdf.com",
    description:
      "Free online PDF and image conversion tools. Compress PDF, merge PDF, convert images — no sign-up, zero data retention.",
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
    "@type": "Organization",
    name: "weFixPDF",
    url: "https://wefixpdf.com",
    logo: "https://wefixpdf.com/wfp.png",
    sameAs: [],
    description:
      "weFixPDF provides free, privacy-first online tools for converting, compressing, and editing PDF files and images.",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "weFixPDF — Free Online File Converter",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (Web Browser)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: "https://wefixpdf.com",
    description:
      "13+ free online tools to compress PDF, merge PDF, convert PDF to JPG, convert images between formats, and more. No sign-up, no watermarks, zero data retention.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "312",
      bestRating: "5",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is weFixPDF really 100% free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — every tool on weFixPDF is completely free with no hidden fees, no subscription, and no sign-up required.",
        },
      },
      {
        "@type": "Question",
        name: "Are my files safe and private?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All uploads use HTTPS/TLS encryption. Files are permanently deleted immediately after conversion — we never store, read, or share your files.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to create an account?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No account or sign-up is needed. Just open any tool, upload your file, and download the result instantly.",
        },
      },
      {
        "@type": "Question",
        name: "How does weFixPDF compare to Adobe Acrobat or iLovePDF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "weFixPDF is 100% free with no usage limits. Adobe Acrobat requires a paid subscription. iLovePDF and Smallpdf limit free users to 2 tasks per day and retain files for 1–2 hours. weFixPDF deletes files immediately.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a file size limit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can upload files up to 100MB per conversion.",
        },
      },
    ],
  },
];

export default async function Home() {
  const { schemas: apiSchemas } = await getHomepageData();

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
      <HomeContent />
    </>
  );
}
