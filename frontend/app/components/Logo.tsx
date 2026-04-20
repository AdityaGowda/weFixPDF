import Image from "next/image";

export default function WeFixPDFLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const fontSize = size === 'sm' ? 24 : size === 'lg' ? 44 : 30;
  const imgSize  = size === 'sm' ? 40 : size === 'lg' ? 64 : 52;

  return (
    <span
      className="inline-flex items-center gap-2"
      style={{ fontSize, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}
    >
      {/* dark mode logo */}
      <Image
        src="/logo.png"
        alt="weFixPDF Logo"
        width={imgSize}
        height={imgSize}
        priority
        className="hidden dark:block"
        style={{ width: imgSize, height: imgSize, objectFit: 'contain' }}
      />
      {/* light mode — swap with your light logo once available */}
      <Image
        src="/logo.png"
        alt="weFixPDF Logo"
        width={imgSize}
        height={imgSize}
        priority
        className="block dark:hidden"
        style={{ width: imgSize, height: imgSize, objectFit: 'contain' }}
      />
      <span>
        <span style={{ color: '#163863' }} className="dark:!text-white">we</span><span style={{ color: '#4f6edb' }}>Fix</span><span style={{ color: '#B44CFF' }}>PDF</span>
      </span>
    </span>
  );
}

