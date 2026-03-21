import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

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
          {
            key: "Content-Security-Policy",
            value: isDev
              ? [
                  "default-src 'self'",
                  "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://adservice.google.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google",
                  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                  "img-src 'self' data: blob: https://googleads.g.doubleclick.net https://www.google.com https://tpc.googlesyndication.com",
                  "font-src 'self' https://fonts.gstatic.com",
                  "connect-src 'self' http://localhost:5000 https://www.google.com https://pagead2.googlesyndication.com",
                  "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
                  "object-src 'none'",
                  "base-uri 'self'",
                  "form-action 'self'",
                ].join("; ")
              : [
                  "default-src 'self'",
                  "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://adservice.google.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google",
                  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                  "img-src 'self' data: blob: https://googleads.g.doubleclick.net https://www.google.com https://tpc.googlesyndication.com",
                  "font-src 'self' https://fonts.gstatic.com",
                  "connect-src 'self' https://www.google.com https://pagead2.googlesyndication.com",
                  "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
                  "object-src 'none'",
                  "base-uri 'self'",
                  "form-action 'self'",
                  "upgrade-insecure-requests",
                ].join("; "),
          }
        ]
      }
    ];
  },
  turbopack: {
    root: "../frontend",
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.wefixpdf.com" }],
        destination: "https://wefixpdf.com/:path*",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;