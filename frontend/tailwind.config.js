const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '375px',
        ...defaultTheme.screens,
      },
      colors: {
        // Brand
        blue: {
          DEFAULT: '#2D5BE3',
          dark:    '#1E4BC8',
          light:   '#E6F1FB',
          text:    '#185FA5',
        },
        // Surfaces
        surface: '#F7F7F5',
        // Free badge
        green: {
          chip:      '#EAF3DE',
          'chip-text': '#3B6D11',
        },
        // Legacy alias (kept so existing tool-page components don't break)
        brand: {
          primary:   '#2D5BE3',
          secondary: '#1E4BC8',
        },
      },
      borderRadius: {
        sm:   '4px',
        DEFAULT: '8px',
        md:   '8px',
        lg:   '12px',
        xl:   '16px',
        '2xl': '20px',
        '3xl': '24px',   // kept as alias so UploadBox etc. still compile
        '4xl': '28px',
        '5xl': '32px',
      },
      fontFamily: {
        sans:    ['Inter', 'Geist', ...defaultTheme.fontFamily.sans],
        inter:   ['Inter', ...defaultTheme.fontFamily.sans],
        poppins: ['Inter', ...defaultTheme.fontFamily.sans], // remap to Inter
      },
      boxShadow: {
        card:       '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 2px 8px rgba(45,91,227,0.10), 0 1px 3px rgba(0,0,0,0.06)',
        nav:        '0 1px 0 rgba(0,0,0,0.06)',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        'marquee-reverse': {
          '0%':   { transform: 'translateX(-33.333%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        marquee:          'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
