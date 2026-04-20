"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (type: "accepted" | "rejected") => {
    localStorage.setItem("cookie_consent", type);
    setShowBanner(false);
    
    // Trigger a custom event so other components (like AdSenseLoader) can react
    window.dispatchEvent(new Event("cookie-consent-updated"));
    
    // If accepted, we can also manually trigger GA/AdSense if needed, 
    // but they will check localStorage on their own if we set them up right.
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl z-[100] animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md rounded-xl shadow-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] px-4 py-3 md:px-5">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <p className="text-[12px] md:text-[13px] leading-tight text-slate-600 dark:text-slate-400 text-center md:text-left flex-1">
            We use cookies for analytics and personalized ads via AdSense. By using weFixPDF, you agree to our use of cookies.
          </p>
          
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleConsent("accepted")}
              className="px-4 py-1.5 bg-[#2D5BE3] hover:bg-[#204AC8] text-white text-[12px] font-bold rounded-lg transition-all"
            >
              Accept
            </button>
            <button
              onClick={() => handleConsent("rejected")}
              className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 text-[12px] font-bold rounded-lg transition-all"
            >
              Reject
            </button>
            <a href="/privacy-policy" className="ml-2 text-[11px] text-slate-400 hover:text-blue-500 underline underline-offset-2">
              Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );

}
