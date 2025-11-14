'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'
const ThemeCtx = createContext<{ theme: Theme; setTheme: (t: Theme) => void; isDark: boolean }>({ theme: 'system', setTheme: () => {}, isDark: true })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => (typeof window === 'undefined' ? 'system' : (localStorage.getItem('theme') as Theme) || 'system'))

  useEffect(() => {
    if (theme !== 'system') {
      document.documentElement.classList.toggle('dark', theme === 'dark')
      localStorage.setItem('theme', theme)
    } else {
      const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('dark', prefers)
      localStorage.setItem('theme', 'system')
    }
  }, [theme])

  const isDark = useMemo(() => {
    if (theme === 'system') return typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : true
    return theme === 'dark'
  }, [theme])

  return <ThemeCtx.Provider value={{ theme, setTheme, isDark }}>{children}</ThemeCtx.Provider>
}

export function useTheme() {
  return useContext(ThemeCtx)
}
