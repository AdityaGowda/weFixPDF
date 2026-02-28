

export default function Home() {
  return (
    <div className="space-y-20">

      <section className="text-center space-y-8 py-10">
        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-black tracking-[0.25em] uppercase animate-float shadow-2xl shadow-brand-primary/5 dark:shadow-brand-primary/10">
          ✨ Simple & Secure File Conversion
        </div>

        <h2 className="text-4xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
          Convert files <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">instantly</span> in your browser.
        </h2>
 
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed opacity-80">
          The high-performance way to convert photos, documents, and videos. <br className="hidden md:block" />
          No tracking, no accounts, just pure speed.
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "Image Compressor", desc: "Reduce file size without losing quality.", icon: "📉", href: "/image-compressor", color: "text-blue-400 bg-blue-500/10" },
          { name: "PNG to JPG", desc: "Convert PNG images to compatible JPG format.", icon: "🖼️", href: "/png-to-jpg", color: "text-indigo-400 bg-indigo-500/10" },
          { name: "JPG to PNG", desc: "Convert JPG to high-quality PNG.", icon: "✨", href: "/jpg-to-png", color: "text-violet-400 bg-violet-500/10" },
          { name: "PNG to WEBP", desc: "Optimize images for the modern web.", icon: "🌐", href: "/png-to-webp", color: "text-emerald-400 bg-emerald-500/10" },
        ].map((tool) => (
          <a
            key={tool.href}
            href={tool.href}
            className="group glass dark:glass-dark border border-slate-200/50 dark:border-white/5 rounded-[2.5rem] p-10 space-y-6 hover:-translate-y-2 hover:shadow-3xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${tool.color} shadow-inner`}>
              {tool.icon}
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors tracking-tight">{tool.name}</h3>
            <p className="text-base text-slate-500 leading-relaxed font-semibold">{tool.desc}</p>
          </a>
        ))}
      </section>

    </div>
  );
}
