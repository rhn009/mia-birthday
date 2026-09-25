/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastelPink: '#FFD6E0',
        softRose: '#FFACC7',
        deepRose: '#FF5D8F',
        cream: '#FFF0F5',
        lavender: '#E8DFF5',
        peach: '#FCF6BD',
        mint: '#D0F4DE',
        sky: '#A9DEF9',
        darkCat: '#1A1A24',
        gold: '#FFD700',
      },
      fontFamily: {
        cute: ['"Quicksand"', '"Fredoka"', 'sans-serif'],
        handwriting: ['"Dancing Script"', '"Caveat"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'purr': 'purr 0.3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(255, 93, 143, 0.6))' },
          '50%': { filter: 'drop-shadow(0 0 25px rgba(255, 93, 143, 0.95))' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        purr: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
