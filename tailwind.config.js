/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F97316', 
        },
        error: {
          DEFAULT: '#DC2626', 
          dark: '#AA2834', 
        },
        success: {
          DEFAULT: '#00B37E', 
        },
        neutral: {
          50: '#FFFFFF',
          100: '#A3A3A3', 
          200: '#52525B', 
          700: '#202024', 
          800: '#18181B', 
          900: '#09090B',
        }
      },
    },
  },
  plugins: [],
} 