/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F5E8',
          100: '#C8E6C9',
          500: '#4CAF50',
          600: '#2E7D32',
          700: '#1B5E20',
        },
        secondary: {
          50: '#FFF8E1',
          100: '#FFECB3',
          500: '#FBC02D',
          600: '#F9A825',
        },
        accent: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          500: '#1565C0',
          600: '#0D47A1',
        },
        brown: {
          50: '#EFEBE9',
          100: '#D7CCC8',
          500: '#8D6E63',
          600: '#5D4037',
        }
      }
    },
  },
  plugins: [],
}
