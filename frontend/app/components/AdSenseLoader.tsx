"use client"

import { useEffect } from "react";

export default function AdSenseLoader() {
  useEffect(() => {
    const checkAndLoad = () => {
      const consent = localStorage.getItem("cookie_consent");
      if (consent === "accepted") {
        if (!document.getElementById("adsense-global-dynamic")) {
          const script = document.createElement("script");
          script.id = "adsense-global-dynamic";
          script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8668995301634402";
          script.async = true;
          script.crossOrigin = "anonymous";
          document.head.appendChild(script);
        }
      }
    };

    checkAndLoad();

    window.addEventListener("cookie-consent-updated", checkAndLoad);
    return () => window.removeEventListener("cookie-consent-updated", checkAndLoad);
  }, []);

  return null;
}

