import "./globals.css";
import type { Metadata } from 'next';
import AdSenseLoader from "./components/AdSenseLoader";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { Inter } from 'next/font/google';
import Footer from "./components/footer/footer";
import CookieConsent from "./components/CookieConsent";
import GoogleAnalytics from "./components/GoogleAnalytics";


const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://wefixpdf.com"),
  // AdSense site verification — NOT gated by cookie consent, so Google can
  // verify ownership even when the adsbygoogle loader is withheld pre-consent.
  other: { "google-adsense-account": "ca-pub-8668995301634402" },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    siteName: "weFixPDF",
    locale: "en_US",
    type: "website",
    images: [{ url: "/wfp.png", width: 1200, height: 630, alt: "weFixPDF" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@wefixpdf",
    images: ["/wfp.png"],
  },
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "weFixPDF",
  url: "https://wefixpdf.com",
  description: "Free online PDF and image tools — compress, convert, merge, split, protect. No sign-up, no watermarks, zero data stored.",
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "weFixPDF",
  url: "https://wefixpdf.com",
  logo: "https://wefixpdf.com/logo.png",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: "https://wefixpdf.com/help",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Consent Mode v2 — must run BEFORE adsbygoogle.js / gtag.js.
            Defaults to denied (GDPR-safe); returning visitors who already
            accepted are upgraded to granted immediately. AdSense reads these
            signals, so the loader can be present for everyone (incl. the AdSense
            crawler) while personalization stays gated until consent. */}
        <script
          id="consent-mode-default"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                wait_for_update: 500
              });
              try {
                if (localStorage.getItem('cookie_consent') === 'accepted') {
                  gtag('consent', 'update', {
                    ad_storage: 'granted',
                    ad_user_data: 'granted',
                    ad_personalization: 'granted',
                    analytics_storage: 'granted'
                  });
                }
              } catch (e) {}
            `,
          }}
        />
        <script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} />
        <script id="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Toaster
            position="top-center"
            toastOptions={{
              className: "!text-sm !font-medium !shadow-lg !rounded-lg !bg-white dark:!bg-[#111113] !text-[#0F0F0F] dark:!text-[#F8FAFC] !border !border-[rgba(0,0,0,0.08)] dark:!border-[rgba(255,255,255,0.08)]",
              success: { iconTheme: { primary: '#3B6D11', secondary: 'white' } },
              error:   { iconTheme: { primary: '#DC2626', secondary: 'white' } },
            }}
          />
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
          <AdSenseLoader />
          <CookieConsent />
          <GoogleAnalytics />
        </ThemeProvider>

      </body>
    </html>
  );
}
