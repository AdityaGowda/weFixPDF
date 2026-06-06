"use client"

import { useEffect } from "react";

export default function AdSenseLoader() {
  useEffect(() => {
    // Load the AdSense library for everyone (including the AdSense crawler).
    // Personalization is governed by Google Consent Mode (default denied, set
    // in <head>), so this is GDPR-safe: non-personalized ads serve until the
    // visitor accepts, after which CookieConsent flips consent to granted.
    if (document.getElementById("adsense-global")) return;
    const script = document.createElement("script");
    script.id = "adsense-global";
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8668995301634402";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, []);

  return null;
}

