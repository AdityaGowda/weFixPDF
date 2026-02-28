"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Avoid hydration mismatch
  if (!mounted) return (
    <nav className="sticky top-0 z-50 px-6 py-4 bg-transparent opacity-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-10 h-10 rounded-2xl bg-brand-primary shadow-lg" />
      </div>
    </nav>
  );

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Image Compressor', href: '/image-compressor' },
    { label: 'PNG to JPG', href: '/png-to-jpg' },
    { label: 'JPG to PNG', href: '/jpg-to-png' },
    { label: 'PNG to WEBP', href: '/png-to-webp' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav className={`
      sticky top-0 z-50 transition-all duration-500 px-6 py-4
      ${scrolled 
        ? 'bg-white/70 dark:bg-black/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/10 shadow-2xl dark:shadow-black/50' 
        : 'bg-transparent'}
    `}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
            C
          </div>
          <span className="font-extrabold text-2xl tracking-tighter text-slate-900 dark:text-white">ConvertLite</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-5 py-2.5 rounded-2xl text-sm font-bold text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-4 w-11 h-11 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-xl hover:scale-110 transition-all"
            aria-label="Toggle Theme"
          >
            {resolvedTheme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-3">
           <button
            onClick={toggleTheme}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-xl"
            aria-label="Toggle Theme"
          >
            {resolvedTheme === 'dark' ? '☀️' : '🌙'}
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-slate-900 dark:text-white text-2xl"
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
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="px-6 py-4 rounded-2xl text-lg font-bold text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
