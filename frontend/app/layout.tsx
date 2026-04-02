import "./globals.css";
import type { Metadata } from 'next'
import AdSenseLoader from "./components/AdSenseLoader";
import CookieConsent from "./components/CookieConsent";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { Poppins } from 'next/font/google'
import Footer from "./components/footer/footer";
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://wefixpdf.com"),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
}

// Global structured data — injected once in <head>
const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "weFixPDF",
  url: "https://wefixpdf.com",
  description: "Free online PDF and image tools — compress, convert, merge, split, protect. No sign-up, no watermarks, zero data stored.",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://wefixpdf.com/blog?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
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


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} />
        <script id="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }} />
      </head>
      <body className={`${poppins.className} antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col transition-colors duration-500`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster
            position="top-center"
            toastOptions={{
              className: "font-bold text-sm !shadow-2xl !bg-white/80 dark:!bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 !text-slate-900 dark:!text-white px-6 py-4 rounded-2xl",
              success: {
                iconTheme: { primary: '#10b981', secondary: 'white' },
              },
              error: {
                className: "font-bold text-sm !shadow-2xl !bg-rose-50 dark:!bg-rose-950/80 backdrop-blur-xl border border-rose-200 dark:border-rose-900/50 !text-rose-700 dark:!text-rose-200 px-6 py-4 rounded-2xl",
                iconTheme: { primary: '#f43f5e', secondary: 'white' },
              },
              loading: {
                iconTheme: { primary: '#60a5fa', secondary: 'white' },
              },
            }}
          />
          <Navbar />
          <main className="flex-1 w-full transition-all duration-500 overflow-x-hidden">
            <div className="px-4 sm:px-6 lg:px-0 md:py-12 max-w-7xl mx-auto space-y-16 md:space-y-24">
              <div className="relative">
                {/* Premium Visual Decorations - Hidden on mobile for performance */}
                <div className="hidden md:block absolute -top-40 -left-40 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
                <div className="hidden md:block absolute -bottom-40 -right-40 w-96 h-96 bg-brand-secondary/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow delay-700" />

                <div className="relative z-10">
                  {children}
                </div>
              </div>
            </div>
            <Footer />
            <AdSenseLoader />
            <CookieConsent />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}