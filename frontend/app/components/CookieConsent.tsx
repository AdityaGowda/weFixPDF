"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem("cookie_consent", "accepted");
    if (typeof window !== "undefined" && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch {}
    }
    setVisible(false);
  }

  function handleReject() {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 w-[calc(100vw-2rem)] max-w-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 p-4">
        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-3">
          We use cookies to serve ads and improve your experience.{" "}
          <Link href="/privacy-policy" className="text-brand-primary underline decoration-brand-primary/30 hover:decoration-brand-primary transition-colors font-bold">
            Privacy Policy
          </Link>
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReject}
            className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 px-3 py-1.5 rounded-lg bg-brand-primary text-white font-black text-xs hover:opacity-90 transition-opacity shadow-md shadow-brand-primary/25"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
