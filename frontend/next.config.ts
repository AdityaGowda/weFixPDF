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

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
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
      // Numbered slug variants → clean slug (e.g. /split-pdf1 → /split-pdf)
      {
        source: "/:slug([a-z][a-z-]*[a-z])\\d",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
