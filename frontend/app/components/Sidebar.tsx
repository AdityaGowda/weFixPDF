"use client";

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 
        bg-gradient-to-b from-blue-600 to-indigo-600 text-white 
        flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>

        {/* Logo & Close Button (Mobile Only) */}
        <div className="p-6 flex items-center justify-between">
          <div className="font-bold text-xl">ConvertLite</div>
          <button onClick={onClose} className="md:hidden p-2 hover:bg-white/10 rounded-lg">
            ✕
          </button>
        </div>

      {/* Navigation */}
      <nav className="px-4 space-y-1 text-sm">
        <a href="/" className="block p-3 rounded hover:bg-white/10">Home</a>
        <a href="/image-compressor" className="block p-3 rounded hover:bg-white/10">Image Compressor</a>
        <a href="/png-to-jpg" className="block p-3 rounded hover:bg-white/10">PNG to JPG</a>
        <a href="/jpg-to-png" className="block p-3 rounded hover:bg-white/10">JPG to PNG</a>
        <a href="/png-to-webp" className="block p-3 rounded hover:bg-white/10">PNG to WEBP</a>
      </nav>

    <div className="p-4">
        <div className="relative overflow-hidden bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-xl group hover:bg-white/[0.15] transition-all duration-500">

          {/* Animated background */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />

          <div className="relative z-10 space-y-4">

            <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
              Support
            </span>

            <p className="text-xs text-indigo-100 leading-relaxed">
              If this tool helps you, consider supporting my work with a small coffee ☕
            </p>

            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <p className="text-xs leading-relaxed text-white font-medium italic">
                Hey! If ConvertLite saved you some time, buying me a coffee helps keep this
                project alive and motivates me to build more useful tools. Thank you 😄
              </p>
            </div>

            <a
              href="https://buymeacoffee.com/adithya_m_r_"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-full
                bg-gradient-to-r from-yellow-400 to-orange-400
                text-indigo-900
                hover:brightness-105
                font-bold
                py-3
                rounded-xl
                shadow-lg
                shadow-black/20
                transition-all
                duration-300
                hover:scale-[1.03]
                active:scale-[0.97]
                flex
                items-center
                justify-center
                gap-2
                text-sm
              "
            >
              ☕ Buy Me a Coffee
            </a>

            <p className="text-[10px] text-center text-indigo-100 opacity-70">
              Opens BuyMeACoffee in new tab
            </p>

          </div>
        </div>
      </div>


      </aside>
    </>
  );
}
