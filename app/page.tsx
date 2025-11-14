'use client'

import { Hero } from '@/components/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Certifications } from '@/components/sections/Certifications'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ChatOrb } from '@/components/ChatOrb'
import { VisitorCounter } from '@/components/VisitorCounter'
import { useEffect, useState } from 'react'
import { Preloader } from '@/components/Preloader'
import { Skills } from '@/components/sections/Skills'
import { StatsStrip } from '@/components/StatsStrip'
import { SKILLS } from '@/constants/resume'

export default function Page() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {!loaded && <Preloader />}
      <ThemeToggle />
      <Hero />
      <div className="mt-4">
        <StatsStrip />
      </div>
      {/* Stack band */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-4">
        <div className="glass rounded-xl p-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-wrap gap-2">
            {Object.entries(SKILLS).flatMap(([k,v]) => (v as readonly string[]).slice(0, 6).map((t) => (
              <span key={k+':'+t} className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300">{t}</span>
            )))}
          </div>
        </div>
      </div>
      <main className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <VisitorCounter />
      <ChatOrb />
    </>
  )
}
