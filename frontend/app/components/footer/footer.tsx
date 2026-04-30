import WeFixPDFLogo from "@/app/components/Logo";
import { getToolListings } from "@/app/lib/seo/seoApi";
import { Instagram } from 'lucide-react';

export default async function Footer() {
  const tools = await getToolListings();

  const pdfTools = tools.filter((t: any) => t.type === 'PDF Tools');
  const imageTools = tools.filter((t: any) => t.type === 'Image Tools');
  const devTools = tools.filter((t: any) => t.type === 'Dev Tools');

  const footerNav = [
    {
      label: 'PDF Tools',
      href: '/tools/pdf',
      links: pdfTools.slice(0, 6).map((t: any) => ({ label: t.name, href: `/tools/${t.slug}` })),
      moreCount: Math.max(0, pdfTools.length - 6),
    },
    {
      label: 'Image Tools',
      href: '/tools/image',
      links: imageTools.slice(0, 6).map((t: any) => ({ label: t.name, href: `/tools/${t.slug}` })),
      moreCount: Math.max(0, imageTools.length - 6),
    },
    {
      label: 'Developer Tools',
      href: '/tools/developer',
      links: devTools.slice(0, 6).map((t: any) => ({ label: t.name, href: `/tools/${t.slug}` })),
      moreCount: Math.max(0, devTools.length - 6),
    },
    {
      label: 'Platform',
      href: '/tools',
      links: [
        { label: 'About weFixPDF', href: '/about' },
        { label: 'Privacy & Security', href: '/security' },
        { label: 'AI Tools (llms.txt)', href: '/llms.txt' },
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Support', href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-surface border-t border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)]" aria-label="Site Footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12">

          {/* Brand Column */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-1 space-y-5">
            <WeFixPDFLogo size="sm" />
            <p className="text-[13px] leading-[1.65] max-w-sm lg:max-w-none" style={{ color: 'var(--text-muted)' }}>
              Free PDF, image &amp; developer tools — no account, no watermarks,
              files deleted the moment you download.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com/wefixpdf" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)] border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)] hover:text-[#E4405F] transition-colors" title="weFixPDF on Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          {footerNav.map((col) => (
            <nav key={col.label} className="space-y-4" aria-label={col.label}>
              <h5 className="text-[12px] font-bold uppercase tracking-wider">
                <a
                  href={col.href}
                  className="hover:text-[#4f6edb] dark:hover:text-[#7B9AFF] transition-colors"
                  style={{ color: 'var(--text)' }}
                >
                  {col.label}
                </a>
              </h5>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[13px] hover:text-[#4f6edb] dark:hover:text-[#7B9AFF] transition-colors"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                {col.moreCount != null && col.moreCount > 0 && (
                  <li>
                    <a href={col.href} className="text-[12px] font-semibold text-[#4f6edb] hover:underline">
                      +{col.moreCount} more &rarr;
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.07)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
            <p className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>
              © 2026 weFixPDF
            </p>
            <p className="text-[11px]" style={{ color: 'var(--text-subtle)' }}>
              Built with privacy in mind. Secure processing via TLS 1.3.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-3">
            <a href="/" className="text-[12px] hover:text-[#4f6edb] transition-colors" style={{ color: 'var(--text-muted)' }}>Home</a>
            <a href="/sitemap-page" className="text-[12px] hover:text-[#4f6edb] transition-colors" style={{ color: 'var(--text-muted)' }}>Sitemap</a>
            <a href="/about" className="text-[12px] hover:text-[#4f6edb] transition-colors" style={{ color: 'var(--text-muted)' }}>About</a>
            <a href="/contact" className="text-[12px] hover:text-[#4f6edb] transition-colors" style={{ color: 'var(--text-muted)' }}>Contact</a>
            <a href="/privacy-policy" className="text-[12px] hover:text-[#4f6edb] transition-colors" style={{ color: 'var(--text-muted)' }}>Privacy</a>
            <a href="/disclaimer" className="text-[12px] hover:text-[#4f6edb] transition-colors" style={{ color: 'var(--text-muted)' }}>Disclaimer</a>
            <a href="/terms" className="text-[12px] hover:text-[#4f6edb] transition-colors" style={{ color: 'var(--text-muted)' }}>Terms</a>
          </div>

        </div>
      </div>
    </footer>
  );
}
