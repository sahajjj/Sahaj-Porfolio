'use client'
import { useMagnetic } from '@/hooks/useMagnetic'
import { Mail, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

export function Contact() {
  const ref = useMagnetic(0.2)
  return (
    <section id="contact" className="py-20">
      <h2 className="text-2xl font-semibold mb-6">Contact</h2>
      <div className="glass rounded-xl p-4">
        <div className="text-sm text-slate-300">Open for internships and exciting roles.</div>
        <div className="mt-4 flex gap-3 items-center">
          <a href="mailto:Ssahaj646@gmail.com" className="px-4 py-2 rounded-md bg-primary text-black flex items-center gap-2" ref={ref as any}>
            <Mail size={16} /> Email Me
          </a>
          <Link href="https://www.linkedin.com/in/sahaj-sharma-ba8464315/" target="_blank" className="px-4 py-2 rounded-md glass flex items-center gap-2 hover:ring-2 ring-primary">
            <Linkedin size={16} /> LinkedIn
          </Link>
          <Link href="https://github.com/sahajjj" target="_blank" className="px-4 py-2 rounded-md glass flex items-center gap-2 hover:ring-2 ring-primary">
            <Github size={16} /> GitHub
          </Link>
        </div>
      </div>
    </section>
  )
}
