/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D32F2F',
        paper: '#F4F1EA',
        ink: '#1A1A1A',
        'ink-light': '#4A4A4A',
        surface: '#FFFFFF',
        'border-ink': '#1A1A1A',
      },
      fontFamily: {
        display: ['Newsreader', 'serif'],
        sans: ['Noto Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem',
      },
      backgroundImage: {
        'gradient-25-50': 'linear-gradient(329deg, #0B0F4E 0%, #434DDD 19%, #FFFFFF 100%)',
      },
    },
  },
  plugins: [],
}