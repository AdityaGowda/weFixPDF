"use client"

import { useEffect } from "react";

/**
 * AdSenseLoader dynamically injects the Google AdSense script after the component has mounted.
 * This prevents hydration mismatches and avoids the 'data-nscript' attribute that 
 * Next.js 'next/script' adds, satisfyng Google AdSense requirements.
 */
export default function AdSenseLoader() {
  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");

    // Don't load AdSense at all if user hasn't consented yet
    if (!consent) return;

    // Check if script already exists to avoid duplicate injection
    if (document.getElementById("adsense-global-dynamic")) return;

    const script = document.createElement("script");
    script.id = "adsense-global-dynamic";
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8668995301634402";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, []);

  return null;
}
