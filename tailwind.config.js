/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fantasy: {
          bg: '#0a0a0f',
          card: '#12131c',
          cardHover: '#1a1b28',
          border: '#2a2b3d',
          gold: '#d4af37',
          goldBright: '#f5cc5a',
          goldMuted: '#9e8124',
          crimson: '#8b0000',
          crimsonBright: '#b30000',
          arcane: '#6366f1',
          arcaneBright: '#818cf8',
          parchment: '#f3e5ab',
          parchmentDark: '#1e1c16',
          textMuted: '#94a3b8',
          textMain: '#f1f5f9',
          success: '#10b981',
          warning: '#f59e0b',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        garamond: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 25px rgba(212, 175, 55, 0.4)',
        'arcane-glow': '0 0 15px rgba(99, 102, 241, 0.3)',
        'crimson-glow': '0 0 15px rgba(139, 0, 0, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'parchment-pattern': "url('https://www.transparenttextures.com/patterns/paper.png')",
      }
    },
  },
  plugins: [],
}
