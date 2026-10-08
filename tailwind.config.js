/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C5A059',
          light: '#E8D39E',
          dark: '#9A7736',
          subtle: 'rgba(197, 160, 89, 0.12)',
          50: '#FAF6ED',
          100: '#F4ECD8',
          200: '#E8D8B0',
          300: '#DCC389',
          400: '#D1AF62',
          500: '#C5A059',
          600: '#B0883E',
          700: '#8E6B2D',
          800: '#6C4E1E',
          900: '#4B3512',
        },
        obsidian: {
          DEFAULT: '#090D14',
          card: '#0D131F',
        },
        charcoal: '#121824',
        midnight: '#0F172A',
        alabaster: {
          DEFAULT: '#FAF8F5',
          alt: '#F6F5F2',
          muted: '#F1ECE5',
          border: '#E8E2D9',
        },
        sand: {
          DEFAULT: '#FAF8F5',
          card: '#FFFFFF',
          muted: '#F1ECE5'
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        heading: ['"Cormorant Garamond"', 'serif'],
        sans: ['Plus Jakarta Sans', 'Outfit', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'gold-glow': '0 4px 20px rgba(197, 160, 89, 0.25)',
        'luxury': '0 10px 30px -5px rgba(9, 13, 20, 0.05), 0 4px 12px -2px rgba(9, 13, 20, 0.03)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #DFBE7B 0%, #C5A059 50%, #9F7B39 100%)',
        'gold-gradient-hover': 'linear-gradient(135deg, #E8C888 0%, #D1AC64 50%, #AB8642 100%)',
      }
    }
  },
  plugins: [],
};
