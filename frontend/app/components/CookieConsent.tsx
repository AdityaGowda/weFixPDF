"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  function handleAccept() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  }

  function handleNonPersonalized() {
    localStorage.setItem("cookie_consent", "non_personalized");
    // Tell AdSense to serve non-personalized ads (NPA = 1)
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({
        params: { google_npa: "1" },
      });
    } catch {}
    setVisible(false);
  }

  function handleReject() {
    localStorage.setItem("cookie_consent", "rejected");
    // Serve non-personalized ads to stay compliant while respecting rejection
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({
        params: { google_npa: "1" },
      });
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 w-[calc(100vw-2rem)] max-w-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 p-4">
        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-3">
          We use cookies for Google AdSense ads and to improve your experience. Your data may be shared with Google advertising partners.{" "}
          <Link href="/privacy-policy" className="text-brand-primary underline decoration-brand-primary/30 hover:decoration-brand-primary transition-colors font-bold">
            Privacy Policy
          </Link>
        </p>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={handleAccept}
            className="w-full px-3 py-1.5 rounded-lg bg-brand-primary text-white font-black text-xs hover:opacity-90 transition-opacity shadow-md shadow-brand-primary/25"
          >
            Accept All
          </button>
          <button
            onClick={handleNonPersonalized}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
          >
            Non-Personalized Ads
          </button>
          <button
            onClick={handleReject}
            className="w-full px-3 py-1.5 rounded-lg text-slate-400 dark:text-slate-500 font-medium text-xs hover:text-slate-600 transition-colors"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
