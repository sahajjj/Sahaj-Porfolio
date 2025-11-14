'use client'
import { CERTS } from '@/constants/resume'

export function Certifications() {
  const items = CERTS.map(parseCert)
  return (
    <section id="certifications" className="py-20">
      <h2 className="text-2xl font-semibold mb-6">Certifications</h2>
      {/* Mobile: horizontal snap scrolling */}
      <div className="md:hidden flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((c, i) => (
          <div key={i} className="min-w-[260px] glass rounded-xl p-4 snap-center">
            <div className="font-medium tracking-tight">{c.title}</div>
            {c.issuer && <div className="mt-1 text-xs text-slate-400">{c.issuer}</div>}
            {c.date && <div className="text-[11px] text-slate-500">{c.date}</div>}
          </div>
        ))}
      </div>
      {/* Desktop: dense grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {items.map((c, i) => (
          <div key={i} className="glass rounded-xl p-4">
            <div className="font-medium tracking-tight">{c.title}</div>
            {c.issuer && <div className="mt-1 text-xs text-slate-400">{c.issuer}</div>}
            {c.date && <div className="text-[11px] text-slate-500">{c.date}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}

function parseCert(s: string): { title: string; issuer?: string; date?: string } {
  // Example: "Python Essential (Cisco) – Oct 2025"
  const issuerMatch = s.match(/\(([^)]+)\)/)
  const issuer = issuerMatch?.[1]
  const parts = s.split(/[–-]/)
  const title = s.split('(')[0].trim()
  const date = parts[1]?.trim()
  return { title, issuer, date }
}
