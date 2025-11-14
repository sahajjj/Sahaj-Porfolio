'use client'
import { useTheme } from './ThemeProvider'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme, isDark } = useTheme()
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed right-4 top-4 z-50 h-10 w-10 rounded-full glass grid place-items-center hover:ring-2 ring-primary"
      title={`Theme: ${theme}`}
    >
      {isDark ? <Sun size={18} className="text-primary" /> : <Moon size={18} className="text-primary" />}
    </button>
  )
}
