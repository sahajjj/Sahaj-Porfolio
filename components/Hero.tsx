'use client'
import { motion } from 'framer-motion'
import { useTyping } from '@/hooks/useTyping'
import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { HeroSphere } from '@/components/three/HeroSphere'

const titles = ['Full Stack Developer', 'AI Enthusiast', 'Problem Solver', 'Co-CEO @ Bits And Bytes']

export function Hero() {
  const text = useTyping(titles, 1100)

  return (
    <section className="relative min-h-[92vh] grid place-items-center overflow-hidden">
      <HeroSphere />
      <BackgroundFX />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-left space-y-6 md:-translate-x-4 lg:-translate-x-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-7xl font-extrabold leading-tight tracking-tight"
        >
          <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(0,255,255,0.25)]">
            Sahaj Sharma
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl"
        >
          Aspiring Software Engineer crafting intuitive, performant web apps with modern stacks.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-primary text-xl sm:text-2xl h-8">
          {text}
        </motion.div>
        <div className="flex items-center justify-start gap-3 pt-2">
          <a href="/resume/ATS_Resume Sahaj Final.pdf" download className="px-5 py-3 rounded-xl bg-primary text-black shadow-[0_10px_30px_rgba(14,165,233,0.35)] hover:brightness-95 hover:translate-y-[-1px] active:translate-y-0 transition">
            Download Resume
          </a>
          <a href="#projects" className="px-5 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition">
            View Projects
          </a>
          <Link href="https://www.linkedin.com/in/sahaj-sharma-ba8464315/" target="_blank" className="px-4 py-3 rounded-xl glass hover:ring-2 ring-primary">
            <Linkedin className="text-primary" />
          </Link>
          <Link href="https://github.com/sahajjj" target="_blank" className="px-4 py-3 rounded-xl glass hover:ring-2 ring-primary">
            <Github className="text-primary" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function BackgroundFX() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(650px_350px_at_50%_-10%,rgba(14,165,233,0.22),transparent)]" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl animate-pulse [animation-duration:5s]" />
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="g" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(14,165,233,0.35)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          {[...Array(40)].map((_, i) => (
            <circle key={i} cx={(i * 73) % 1200} cy={(i * 131) % 800} r={Math.random() * 2 + 1} fill="url(#g)"></circle>
          ))}
        </svg>
      </div>
    </>
  )
}
