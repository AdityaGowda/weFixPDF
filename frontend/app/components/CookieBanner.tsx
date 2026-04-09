'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'cookie_banner_dismissed';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{ background: '#1a1a2e', fontSize: 13 }}
      className="fixed bottom-0 left-0 right-0 z-[9999] flex items-center justify-between gap-4 px-4 py-3 text-white"
    >
      <p className="m-0 leading-snug">
        We use cookies to serve relevant ads and improve your experience. By using weFixPDF, you agree to our cookie usage.{' '}
        <Link href="/privacy-policy" className="underline hover:no-underline">
          Learn more
        </Link>
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss cookie banner"
        className="flex-shrink-0 text-white/70 hover:text-white transition-colors text-lg leading-none"
      >
        ✕
      </button>
    </div>
  );
}
