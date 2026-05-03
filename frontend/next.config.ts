import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Shared CSP directives across dev and prod
const baseCSP: string[] = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://adservice.google.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://static.cloudflareinsights.com https://cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://googleads.g.doubleclick.net https://www.google.com https://tpc.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://pagead2.googlesyndication.com",
  "font-src 'self' https://fonts.gstatic.com",
  "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://www.google.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
];

const devCSP = [
  ...baseCSP,
  "connect-src 'self' http://localhost:5000 https://www.google.com https://pagead2.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://cloudflareinsights.com https://static.cloudflareinsights.com",
].join("; ");

const prodCSP = [
  ...baseCSP,
  "connect-src 'self' https://www.google.com https://pagead2.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://cloudflareinsights.com https://static.cloudflareinsights.com",
  "upgrade-insecure-requests",
].join("; ");

/* All tool slugs that lived at /{slug} and now live at /tools/{slug} */
const TOOL_SLUGS = [
  // PDF Tools
  'compress-pdf', 'merge-pdf', 'split-pdf', 'pdf-to-jpg', 'pdf-to-word',
  'rotate-pdf', 'protect-pdf', 'unlock-pdf', 'word-to-pdf', 'pdf-to-epub',
  'auto-rotate-pdf', 'scan-to-pdf', 'pdf-to-html', 'remove-pdf-metadata',
  'extract-text-pdf', 'compare-pdf', 'redact-pdf', 'image-to-pdf', 'jpg-to-pdf',
  // Image Tools
  'compress-image', 'image-compressor', 'heic-to-jpg', 'heic-to-png',
  'jpg-to-png', 'png-to-jpg', 'png-to-webp', 'resize-image',
  // Dev Tools
  'csv-json-converter', 'color-palette-generator', 'text-diff-checker',
  'json-to-yaml', 'yaml-to-json', 'json-to-xml', 'xml-to-json',
  'json-formatter', 'jwt-decoder', 'cron-expression-builder', 'chmod-calculator',
  'unix-timestamp-converter', 'og-meta-tag-previewer', 'hash-generator',
  'http-header-analyzer', 'sql-formatter', 'favicon-generator', 'number-base-converter',
  'base64-encoder-decoder', 'url-parser-builder', 'regex-tester', 'css-unit-converter',
  'color-contrast-checker', 'mock-json-generator', 'env-file-parser', 'markdown-to-html',
  'ip-subnet-calculator', 'text-to-ascii-art', 'wasm-analyzer', 'llm-token-counter',
  'api-ping-tester',
];

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // { key: "X-Content-Type-Options", value: "nosniff" },
          // { key: "X-Frame-Options", value: "DENY" },
          // { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: isDev ? devCSP : prodCSP },
        ],
      },
    ];
  },
  turbopack: {
    root: "../frontend",
  },
  async redirects() {
    return [
      // www → non-www
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.wefixpdf.com" }],
        destination: "https://wefixpdf.com/:path*",
        permanent: true,
      },
      // /privacy → /privacy-policy
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      // Tool pages: /{slug} → /tools/{slug}  (301 permanent)
      // We list these first to ensure static slugs take precedence over regex patterns
      ...TOOL_SLUGS.map((slug) => ({
        source: `/${slug}`,
        destination: `/tools/${slug}`,
        permanent: true,
      })),
      // Numbered slug variants → /tools/slug (e.g. /split-pdf1 → /tools/split-pdf)
      {
        source: "/:slug([a-z][a-z-]*[a-z]):num(\\d+)",
        destination: "/tools/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
