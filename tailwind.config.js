/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#86efac',
          dark: '#4ade80', // green-400 (cho hover)
          light: '#bbf7d0', // green-200
        },
      },
    },
  },
  plugins: [],
}
