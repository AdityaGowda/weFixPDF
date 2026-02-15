"use client";

export default function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="bg-white/70 backdrop-blur border-b px-4 py-3 flex items-center gap-3">

      <button onClick={onMenu} className="md:hidden text-2xl">
        ☰
      </button>

      <h1 className="font-semibold">
        Simple Online File Converter
      </h1>

    </header>
  );
}
