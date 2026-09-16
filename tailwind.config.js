/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        'cream-dark': '#F5EDE3',
        maroon: {
          DEFAULT: '#8B2252',
          light: '#A83A6A',
          dark: '#6B1A3F',
        },
        rose: {
          DEFAULT: '#D4A5A5',
          light: '#E8C8C8',
          dark: '#B88888',
        },
        gold: {
          DEFAULT: '#C9A96E',
          light: '#DFC99A',
          dark: '#A88B4A',
        },
        'dark-text': '#3D2B1F',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A96E, #DFC99A, #C9A96E)',
      },
    },
  },
  plugins: [],
};
