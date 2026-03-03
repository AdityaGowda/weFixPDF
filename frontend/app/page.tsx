import { Metadata } from "next";
import HomeContent from "./HomeContent";
import { getHomepageData } from "./lib/seo/seoApi";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHomepageData();

  // Use API data if available, otherwise fallback to static
  if (seo) {
    return {
      title: seo.title,
      description: seo.description,
      alternates: { canonical: seo.url },
      keywords: seo.keywords,
      robots: { index: true, follow: true },
    };
  }

  // Fallback if API fails
  return {
    title: "Free Online File Converter — PDF, Images & Documents | weFixPDF",
    description: "Compress PDF, convert PDF to JPG, merge PDF, JPG to PNG, compress images and more. 100% free, no sign-up, zero data retention.",
    robots: { index: true, follow: true },
  };
}

export default async function Home() {
  const { schemas: apiSchemas } = await getHomepageData();

  // Use API schemas if available, fallback to empty array
  const schemas = apiSchemas.length > 0
    ? apiSchemas.map((s) => s.schema_data)
    : [];

  return <>
    {schemas.map((schema, i) => (
      <script
        key={i}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    ))}
    <HomeContent />
  </>
}
