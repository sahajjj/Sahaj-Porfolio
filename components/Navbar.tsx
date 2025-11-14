"use client"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { useEffect, useState } from "react"

const sections = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" }
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-40 transition-all ${scrolled ? "backdrop-blur-md bg-black/30 border-b border-white/10" : "bg-transparent"}`}>
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="#" className="font-semibold tracking-tight text-foreground">
          <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">Sahaj</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {sections.map(s => (
            <a key={s.href} href={s.href} className="text-slate-300 hover:text-primary transition-colors">{s.label}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
