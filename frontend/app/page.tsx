import { Metadata } from "next";
import HomeContent from "./HomeContent";
import { homePageSchemas } from "./lib/seo/seoschema";

export const metadata: Metadata = {
  ...homePageSchemas.metadata, robots: {
    index: true,
    follow: true,
  }
};

export default function Home() {
  const schemas = [
    homePageSchemas.webApplication,
    homePageSchemas.organization,
    homePageSchemas.webSite,
    homePageSchemas.itemList,
  ];

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
