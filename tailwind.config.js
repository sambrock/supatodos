/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      screens: {
        md: '100%',
        lg: '980px',
      }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        logo: ['var(--font-logo)', 'sans-serif'],
      },
      colors: {
        neutral: {
          bg: '#242526',
        },
      },
    },
  },
  plugins: [],
};
