/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Définir les mouvements (keyframes)
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        },
        slideUp: {
          '0%': { transform: 'translate(-50%, 20px)', opacity: '0' },
          '100%': { transform: 'translate(-50%, 0)', opacity: '1' },
        }
      },
      // 2. Créer les classes d'animation réutilisables
      animation: {
        'shake': 'shake 0.4s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out forwards',
      }
    },
  },
  plugins: [],
}
