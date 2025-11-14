import './globals.css'
import '@fontsource/geist'
import { ThemeProvider } from '@/components/ThemeProvider'
import type { ReactNode } from 'react'
import { Navbar } from '@/components/Navbar'
import { SmoothScroll } from '@/components/SmoothScroll'
import { CursorGlow } from '@/components/CursorGlow'
import { ParticlesBG } from '@/components/ParticlesBG'

export const metadata = {
  title: 'Sahaj Sharma • Portfolio',
  description: 'Aspiring Software Engineer | Full Stack Developer'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans text-foreground bg-background`}>
        <ThemeProvider>
          <Navbar />
          <SmoothScroll />
          <CursorGlow />
          <ParticlesBG />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
