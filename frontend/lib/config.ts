import { ToolConfig } from "@/types";

export const envConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
};

const TOOL_CONFIG_MAP: Record<string, ToolConfig> = {
  "image-to-pdf": { service: "image-to-pdf", isMulti: true, maxFiles: 20, acceptedTypes: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"], maxFileSizeMb: 20, verb: "Convert to PDF", result: "PDF file" },
  "merge-pdf": { service: "merge-pdf", isMulti: true, maxFiles: 20, acceptedTypes: ["application/pdf"], maxFileSizeMb: 20, verb: "Merge PDFs", result: "merged PDF" },
  "heic-to-jpg": { service: "heic-to-jpg", isMulti: false, maxFiles: 1, acceptedTypes: ["image/heic", "image/heif"], maxFileSizeMb: 20, verb: "Convert to JPG", result: "JPG image" },
  "word-to-pdf": { service: "word-to-pdf", isMulti: false, maxFiles: 1, acceptedTypes: ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"], maxFileSizeMb: 20, verb: "Convert to PDF", result: "PDF file" },
  "pdf-to-jpg": { service: "pdf-to-jpg", isMulti: false, maxFiles: 1, acceptedTypes: ["application/pdf"], maxFileSizeMb: 20, verb: "Convert to JPG", result: "JPG image(s)" },
  "pdf-to-word": { service: "pdf-to-word", isMulti: false, maxFiles: 1, acceptedTypes: ["application/pdf"], maxFileSizeMb: 20, verb: "Convert to Word", result: "DOCX file" },
  "split-pdf": { service: "split-pdf", isMulti: false, maxFiles: 1, acceptedTypes: ["application/pdf"], maxFileSizeMb: 20, verb: "Split PDF", result: "split PDF pages" },
  "compress-pdf": { service: "compress-pdf", isMulti: false, maxFiles: 1, acceptedTypes: ["application/pdf"], maxFileSizeMb: 50, verb: "Compress PDF", result: "smaller PDF" },
  "pdf-to-png": { service: "pdf-to-png", isMulti: false, maxFiles: 1, acceptedTypes: ["application/pdf"], maxFileSizeMb: 20, verb: "Convert to PNG", result: "PNG image(s)" },
  "pdf-to-webp": { service: "pdf-to-webp", isMulti: false, maxFiles: 1, acceptedTypes: ["application/pdf"], maxFileSizeMb: 20, verb: "Convert to WebP", result: "WebP image(s)" },
  "rotate-pdf": { service: "rotate-pdf", isMulti: false, maxFiles: 1, acceptedTypes: ["application/pdf"], maxFileSizeMb: 20, verb: "Rotate PDF", result: "rotated PDF" },
  "protect-pdf": { service: "protect-pdf", isMulti: false, maxFiles: 1, acceptedTypes: ["application/pdf"], maxFileSizeMb: 20, verb: "Protect PDF", result: "password-protected PDF" },
  "unlock-pdf": { service: "unlock-pdf", isMulti: false, maxFiles: 1, acceptedTypes: ["application/pdf"], maxFileSizeMb: 20, verb: "Unlock PDF", result: "unlocked PDF" },
  "pdf-to-doc": { service: "pdf-to-doc", isMulti: false, maxFiles: 1, acceptedTypes: ["application/pdf"], maxFileSizeMb: 20, verb: "Convert to Word", result: "DOC file" },
  "pdf-to-epub": { service: "pdf-to-epub", isMulti: false, maxFiles: 1, acceptedTypes: ["application/pdf"], maxFileSizeMb: 20, verb: "Convert to EPUB", result: "EPUB ebook" },
  "epub-to-pdf": { service: "epub-to-pdf", isMulti: false, maxFiles: 1, acceptedTypes: ["application/epub+zip"], maxFileSizeMb: 20, verb: "Convert to PDF", result: "PDF file" },
  "auto-rotate-pdf": { service: "auto-rotate-pdf", isMulti: false, maxFiles: 1, acceptedTypes: ["application/pdf"], maxFileSizeMb: 20, verb: "Auto Rotate", result: "fixed PDF" },
  "scan-to-pdf": { service: "scan-to-pdf", isMulti: false, maxFiles: 1, acceptedTypes: ["image/jpeg", "image/png", "image/webp"], maxFileSizeMb: 20, verb: "Convert to PDF", result: "PDF file" },
  "pdf-to-html": { service: "pdf-to-html", isMulti: false, maxFiles: 1, acceptedTypes: ["application/pdf"], maxFileSizeMb: 20, verb: "Convert to HTML", result: "HTML file" },
  "remove-pdf-metadata": { service: "remove-pdf-metadata", isMulti: false, maxFiles: 1, acceptedTypes: ["application/pdf"], maxFileSizeMb: 20, verb: "Clean Metadata", result: "clean PDF" },
  "extract-text-pdf": { service: "extract-text-pdf", isMulti: false, maxFiles: 1, acceptedTypes: ["application/pdf"], maxFileSizeMb: 20, verb: "Extract Text", result: "text file" },
  "compare-pdf": { service: "compare-pdf", isMulti: true, maxFiles: 2, acceptedTypes: ["application/pdf"], maxFileSizeMb: 20, verb: "Compare", result: "comparison report" },
  "redact-pdf": { service: "redact-pdf", isMulti: false, maxFiles: 1, acceptedTypes: ["application/pdf"], maxFileSizeMb: 20, verb: "Redact", result: "redacted PDF" },
  "resize-image": { service: "resize-image", isMulti: false, maxFiles: 1, acceptedTypes: ["image/jpeg", "image/png", "image/webp"], maxFileSizeMb: 20, verb: "Resize", result: "resized image" },
};

export function getToolConfig(service: string): ToolConfig {
  return TOOL_CONFIG_MAP[service] || {
    service,
    isMulti: false,
    maxFiles: 1,
    acceptedTypes: ["*/*"],
    maxFileSizeMb: 20,
    verb: "Convert",
    result: "output file"
  };
}
