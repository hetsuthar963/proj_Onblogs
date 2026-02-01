/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-25-50': 'linear-gradient(329deg, #0B0F4E 0%, #434DDD 19%, #FFFFFF 100%)',
      },
    },
  },
  plugins: [],
}