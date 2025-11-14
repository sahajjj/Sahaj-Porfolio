import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol']
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#00ffff',
        slate900: '#1e293b',
        gold: '#fbbf24'
      },
      boxShadow: {
        glass: '0 10px 40px rgba(14,165,233,0.15), inset 0 1px 0 rgba(255,255,255,0.08)'
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-6px)' } }
      },
      animation: {
        float: 'float 4s ease-in-out infinite'
      }
    }
  },
  plugins: [animate]
} satisfies Config
