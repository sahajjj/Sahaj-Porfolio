"use client"
import { EXPERIENCE, PROJECTS, CERTS, SKILLS } from '@/constants/resume'

export function StatsStrip() {
  const exp = EXPERIENCE.length
  const projs = PROJECTS.length
  const certs = CERTS.length
  const skills = (Object.values(SKILLS).flat() as readonly string[]).length

  const items = [
    { label: 'Experience', value: exp },
    { label: 'Projects', value: projs },
    { label: 'Certifications', value: certs },
    { label: 'Skills', value: skills }
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 -mt-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((it) => (
          <div key={it.label} className="glass rounded-xl p-3 flex items-center justify-between">
            <div className="text-xs text-slate-400">{it.label}</div>
            <div className="text-lg font-semibold text-foreground">{it.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
