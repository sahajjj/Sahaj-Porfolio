"use client"
import { SKILLS } from '@/constants/resume'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'

const categories = Object.keys(SKILLS) as (keyof typeof SKILLS)[]

export function Skills() {
  const [active, setActive] = useState<(keyof typeof SKILLS) | 'All'>('All')
  const flat = useMemo(() => {
    return categories.flatMap((k) => (SKILLS[k] as readonly string[]).map((v) => ({ k, v })))
  }, [])
  const shown = active === 'All' ? flat : flat.filter((t) => t.k === active)

  return (
    <section id="skills" className="py-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <button onClick={() => setActive('All')} className={`px-3 py-1 rounded-full border ${active==='All'?'border-primary text-primary bg-primary/10':'border-white/10 text-slate-300 hover:text-primary'}`}>All</button>
          {categories.map((c) => (
            <button key={String(c)} onClick={() => setActive(c)} className={`px-3 py-1 rounded-full border ${active===c?'border-primary text-primary bg-primary/10':'border-white/10 text-slate-300 hover:text-primary'}`}>{String(c)}</button>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        {shown.map(({ v, k }, i) => (
          <motion.div
            key={i+v}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2"
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-xs text-slate-400">{String(k)}</div>
            <div className="font-medium tracking-tight">{v}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
