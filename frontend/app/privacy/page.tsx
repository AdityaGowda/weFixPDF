import { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy - Zero Data Retention | wefixPDF",
  description: "wefixPDF privacy policy. We never store your files. Zero retention, in-memory processing, complete privacy protection.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
