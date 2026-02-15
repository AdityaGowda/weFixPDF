"use client";

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800">
        <div className="flex min-h-screen">

          {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          {/* Main */}
          <main className="flex-1 flex flex-col min-h-screen">
            {/* Header */}
            <Header onMenu={() => setIsSidebarOpen(true)} />

            <div className="p-6 max-w-4xl mx-auto flex-1 w-full">
              {children}

              {/* SEO CONTENT */}
              <section className="mt-10 bg-white/80 backdrop-blur rounded-2xl shadow p-10 space-y-5 border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800">
                  Simple Online File Converter
                </h2>

                <p className="text-slate-600 leading-relaxed">
                  ConvertLite helps you convert PDF files, compress images, and change image formats
                  instantly. No installations, no complicated steps — just upload your file and
                  download the result.
                </p>

                <p className="text-slate-600 leading-relaxed">
                  Designed for students, professionals, and everyday users, ConvertLite provides
                  fast conversions while keeping everything clean and easy to use.
                </p>

                <p className="text-slate-600 leading-relaxed">
                  Your privacy matters. Files are processed temporarily and automatically deleted
                  after conversion.
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-4 pt-4 text-sm">
                  <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full border border-blue-100">
                    🔒 Secure Processing
                  </span>
                  <span className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full border border-indigo-100">
                    ⚡ Fast Conversion
                  </span>
                  <span className="bg-green-50 text-green-600 px-4 py-2 rounded-full border border-green-100">
                    🗑 Auto File Delete
                  </span>
                </div>
              </section>
            </div>

            {/* FOOTER */}
            <footer className="mt-20 border-t bg-white w-full">

              <div className="max-w-4xl mx-auto px-6 py-12 text-center">
                <h3 className="font-bold text-slate-800 mb-4 text-base">
                  Why ConvertLite?
                </h3>

                <p className="max-w-2xl mx-auto leading-relaxed text-sm text-slate-600">
                  ConvertLite was built to remove complexity from file conversion. Our mission is to keep everything fast, clean, and trustworthy without the bloat of traditional tools.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Privacy First</span>
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Instant Results</span>
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> No Account Needed</span>
                </div>

                <p className="mt-10 text-[11px] text-slate-400 font-medium">
                  © 2026 ConvertLite — Empowering users with simple tools. Files auto-deleted after processing.
                </p>
              </div>
              
            </footer>
          </main>
        </div>

      </body>
    </html>
  );
}
