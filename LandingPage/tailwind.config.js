/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        zen: {
          ink: '#183C38',
          deep: '#0F2928',
          forest: '#285C4D',
          moss: '#6F9D76',
          sage: '#C9D8C7',
          mist: '#EEF4ED',
          cream: '#FAFBF7',
          muted: '#66807A',
          accent: '#B9D88B',
        },
      },
    },
  },
  plugins: [],
}
