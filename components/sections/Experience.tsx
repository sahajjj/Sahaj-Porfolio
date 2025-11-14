'use client'
import { EXPERIENCE } from '@/constants/resume'
import { motion } from 'framer-motion'

export function Experience() {
  return (
    <section id="experience" className="py-20">
      <h2 className="text-2xl font-semibold mb-6">Experience</h2>
      <div className="relative pl-6">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />
        <div className="space-y-6">
          {EXPERIENCE.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="[perspective:1200px]"
            >
              <div className="group relative rounded-xl border border-white/10 bg-white/5 p-4 shadow-glass transition hover:-translate-y-1">
                <div className="absolute -left-[29px] top-5 h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_4px_rgba(0,255,255,0.35)]" />
                <div className="grid md:grid-cols-2 gap-4">
                  {/* front */}
                  <div className="relative [transform-style:preserve-3d] md:[transform:rotateY(0deg)] group-hover:md:[transform:rotateY(180deg)] transition-transform duration-500">
                    <div className="[backface-visibility:hidden]">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold tracking-tight">{e.company} • {e.role}</div>
                        <div className="text-xs text-slate-400">{e.period}</div>
                      </div>
                      <ul className="mt-3 list-disc pl-5 text-sm space-y-1">
                        {e.bullets.map((b, j) => <li key={j} className="hover:text-primary transition">{b}</li>)}
                      </ul>
                    </div>
                    {/* back */}
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] p-2">
                      <div className="h-full rounded-lg border border-white/10 bg-black/20 grid place-items-center text-center text-sm text-slate-300">
                        <div>
                          <div className="text-xs uppercase tracking-wider text-slate-400">Highlights</div>
                          <div className="mt-1">{e.bullets[0]}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-300">
                    <div className="text-xs uppercase tracking-wider text-slate-400">Impact</div>
                    <ul className="mt-2 space-y-1">
                      {e.bullets.slice(1).map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
