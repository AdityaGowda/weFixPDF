"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, X, ChevronRight, ChevronDown, Globe, Sun, Moon } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const toggleCategory = (label: string) => {
    setOpenCategory(openCategory === label ? null : label);
  };

  const navCategories = [
    {
      label: 'Image Tools',
      items: [
        { label: 'Image Compressor', href: '/image-compressor', description: 'Free online image compressor. Reduce JPG, PNG & WEBP file sizes instantly without quality loss.' },
        { label: 'PNG to JPG', href: '/png-to-jpg', description: 'Fast PNG to JPG converter. Change image formats securely online with high-quality results.' },
        { label: 'JPG to PNG', href: '/jpg-to-png', description: 'Convert JPG to transparent PNG online. Free, fast, and secure image format converter.' },
        { label: 'PNG to WEBP', href: '/png-to-webp', description: 'Optimize images with our free PNG to WEBP converter. Create next-gen formats for faster websites.' },
      ]
    },
    {
      label: 'PDF Tools',
      items: [
        { label: 'Merge PDF', href: '/merge-pdf', description: 'Free online PDF merger. Combine multiple PDF files securely into one document in seconds.' },
        { label: 'Split PDF', href: '/split-pdf', description: 'Split PDF pages easily online. Extract specific pages or separate large PDFs into multiple files.' },
        { label: 'Compress PDF', href: '/compress-pdf', description: 'Best free PDF compressor. Reduce PDF file size online instantly without losing document quality.' },
        { label: 'PDF to Word', href: '/pdf-to-word', description: 'Convert PDF to Word documents online. Accurate, fast, and free PDF to DOCX converter for easy editing.' },
      ]
    }
  ];

  return (
    <nav className={`
      sticky top-0 z-50 transition-all duration-500 px-2 py-1
      ${scrolled 
        ? 'bg-white/70 dark:bg-black/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/10 shadow-2xl dark:shadow-black/50' 
        : 'bg-transparent'}
    `}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative w-28 h-8 sm:w-32 sm:h-10 md:w-40 md:h-12 overflow-hidden items-center justify-start flex hover:scale-105 transition-transform duration-300">
            <Image
              src="/wefixpdf.png"
              alt="wefixPDF Logo"
              width={160}
              height={160}
              className="object-contain"
              priority
            />
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="/" className="text-sm font-bold text-slate-500 hover:text-brand-primary transition-colors py-6">Home</a>

          {navCategories.map((category) => (
            <div key={category.label} className="relative group/nav">
              <button className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-brand-primary transition-colors py-6">
                {category.label}
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/nav:-rotate-180" />
              </button>

              <div className="absolute top-[80%] left-1/2 -translate-x-1/2 pt-4 opacity-0 scale-95 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:scale-100 group-hover/nav:pointer-events-auto transition-all duration-300 z-50">
                <div className="w-[480px] glass dark:glass-dark rounded-3xl p-4 border border-slate-200/50 dark:border-white/10 shadow-2xl grid grid-cols-2 gap-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent pointer-events-none" />
                  {category.items.map((item) => (
                    <a key={item.href} href={item.href} className="relative z-10 flex flex-col gap-1.5 p-4 rounded-2xl hover:bg-white dark:hover:bg-white/10 shadow-sm hover:shadow-md transition-all group/item">
                      <span className="text-sm font-bold text-slate-900 dark:text-white group-hover/item:text-brand-primary transition-colors">{item.label}</span>
                      <span className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.description}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <a href="/about" className="text-sm font-bold text-slate-500 hover:text-brand-primary transition-colors py-6">About</a>

          <div className="h-4 w-px bg-slate-200 dark:bg-white/10 mx-2" />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-all"
          >
            {resolvedTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-3">
           <button
            onClick={toggleTheme}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-lg sm:text-xl"
            aria-label="Toggle Theme"
          >
            {resolvedTheme === 'dark' ? '☀️' : '🌙'}
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-slate-900 dark:text-white text-xl sm:text-2xl"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div className={`
        lg:hidden absolute top-full left-0 right-0 m-4 p-4 rounded-3xl 
        glass dark:glass-dark border border-slate-200/50 dark:border-white/10 shadow-3xl
        transition-all duration-500 origin-top
        ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}
      `}>
        <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <a href="/" onClick={() => setIsOpen(false)} className="px-6 py-4 rounded-2xl text-lg font-bold text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all">Home</a>

          {navCategories.map((category) => (
            <div key={category.label} className="flex flex-col">
              <button
                onClick={() => toggleCategory(category.label)}
                className="flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-bold text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all"
              >
                {category.label}
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openCategory === category.label ? '-rotate-180' : ''}`} />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${openCategory === category.label ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col gap-2 px-4 pb-4">
                  {category.items.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex flex-col gap-1 px-6 py-4 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-all bg-white/50 dark:bg-black/20"
                    >
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{item.label}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{item.description}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <a href="/about" onClick={() => setIsOpen(false)} className="px-6 py-4 rounded-2xl text-lg font-bold text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all">About</a>
        </div>
      </div>
    </nav>
  );
}
