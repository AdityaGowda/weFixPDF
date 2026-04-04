'use client';

import { useRef, useState } from 'react';

const PDF_EXTENSIONS  = ['.pdf'];
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.heic'];

function detectRoute(file: File): string {
  const name = file.name.toLowerCase();
  if (PDF_EXTENSIONS.some(ext => name.endsWith(ext)))   return '/compress-pdf';
  if (name.endsWith('.heic'))                           return '/heic-to-jpg';
  if (name.endsWith('.webp'))                           return '/image-compressor';
  if (name.endsWith('.png'))                            return '/image-compressor';
  return '/image-compressor';
}

export default function HeroDropzone() {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    window.location.href = detectRoute(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload a file to get started"
      className={`upload-zone group select-none outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BE3] focus-visible:ring-offset-2 ${dragging ? 'dragging' : ''}`}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.webp,.heic"
        className="sr-only"
        onChange={onInputChange}
        tabIndex={-1}
      />

      {/* Upload icon — hand-drawn SVG, no library dependency */}
      <svg
        className="mx-auto mb-4 text-[#2D5BE3] opacity-80 group-hover:opacity-100 transition-opacity"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>

      <p className="text-[15px] font-medium mb-1" style={{ color: 'var(--text)' }}>
        {dragging ? 'Release to upload' : 'Drop your file here'}
      </p>
      <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
        or{' '}
        <span className="text-[#2D5BE3] underline underline-offset-2 decoration-dotted">
          click to browse
        </span>
        {' '}— PDF, JPG, PNG, WEBP, HEIC up to 100 MB
      </p>
    </div>
  );
}
