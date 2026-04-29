import { Metadata } from "next";
import Link from "next/link";
import { getToolListings, getAllSlugs } from "@/app/lib/seo/seoApi";
import { ArrowRight, FileText, Settings, Image as ImageIcon, Layout, Info, Shield, HelpCircle, Mail, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Sitemap — All PDF & Image Tools | weFixPDF",
  description: "Browse our complete directory of free online PDF, image, and developer tools. Find every tool and guide on weFixPDF.",
  alternates: { canonical: "https://wefixpdf.com/sitemap-page" },
};

export default async function SitemapPage() {
  const tools = await getToolListings();
  const allSlugs = await getAllSlugs();
  
  const pdfTools = tools.filter(t => t.type === "PDF Tools");
  const imageTools = tools.filter(t => t.type === "Image Tools");
  const devTools = tools.filter(t => t.type === "Dev Tools");

  const sections = [
    {
      title: "PDF Tools",
      icon: <FileText className="w-5 h-5 text-blue-500" />,
      links: pdfTools.map(t => ({ label: t.name, href: `/tools/${t.slug}` })),
    },
    {
      title: "Image Tools",
      icon: <ImageIcon className="w-5 h-5 text-emerald-500" />,
      links: imageTools.map(t => ({ label: t.name, href: `/tools/${t.slug}` })),
    },
    {
      title: "Developer Tools",
      icon: <Settings className="w-5 h-5 text-purple-500" />,
      links: devTools.map(t => ({ label: t.name, href: `/tools/${t.slug}` })),
    },
    {
      title: "Company & Legal",
      icon: <Info className="w-5 h-5 text-slate-500" />,
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Security & Privacy", href: "/security" },
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact" },
      ],
    }
  ];

  return (
    <div className="min-h-screen bg-page">
      {/* Hero */}
      <section className="py-16 border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            Site Directory
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
            A complete list of every tool, guide, and page on weFixPDF.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {sections.map((section) => (
              <div key={section.title} className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{section.title}</h2>
                </div>
                
                <ul className="grid gap-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href}
                        className="group flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-transparent hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-all"
                      >
                        <span className="text-[14px] font-medium text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {link.label}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 border-t border-[rgba(0,0,0,0.06)] bg-surface text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Missing a tool?</h2>
          <p className="text-slate-500 mb-8">We&apos;re always adding new features. If there&apos;s a file conversion you need, let us know.</p>
          <Link href="/contact" className="btn-primary inline-flex">
            Suggest a Feature
          </Link>
        </div>
      </section>
    </div>
  );
}
