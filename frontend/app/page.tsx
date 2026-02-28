import { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Free Online File Converter - Images & PDFs | wefixPDF",
  description: "Convert and compress files instantly. Free JPG to PNG, image compression, PDF tools. Zero retention, 100% private, no sign-up required.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <HomeContent />;
}
