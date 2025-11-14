'use client'
import { PROJECTS } from '@/constants/resume'
import { useRef, useState } from 'react'

export function Projects() {
  const [explaining, setExplaining] = useState<number | null>(null)
  const [explanations, setExplanations] = useState<Record<number, string>>({})

  async function explain(i: number) {
    const p = PROJECTS[i] as any
    setExplaining(i)
    setExplanations((s) => ({ ...s, [i]: '' }))
    const res = await fetch('/api/explain', { method: 'POST', body: JSON.stringify({ title: p.title, desc: p.desc, stack: p.stack }) })
    const reader = res.body?.getReader()
    if (!reader) { setExplaining(null); return }
    let acc = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      acc += new TextDecoder().decode(value)
      setExplanations((s) => ({ ...s, [i]: acc }))
    }
    setExplaining(null)
  }

  return (
    <section id="projects" className="py-20">
      <h2 className="text-2xl font-semibold mb-6">Projects</h2>
      <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PROJECTS.map((p, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 shadow-glass transition hover:shadow-xl hover:border-primary/40 [perspective:1000px] min-w-[85%] sm:min-w-[60%] md:min-w-0 snap-center"
            onMouseMove={(e) => tilt(e)}
            onMouseLeave={(e) => resetTilt(e)}
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-opacity opacity-0 group-hover:opacity-100" />
            <div className="relative [transform-style:preserve-3d] will-change-transform transition-transform duration-200">
              <div className="flex items-center justify-between gap-2">
                <div className="font-semibold mb-1 tracking-tight [transform:translateZ(20px)]">{p.title}</div>
                <div className="shrink-0 text-[10px] px-2 py-1 rounded-full border border-white/10 bg-white/5 [transform:translateZ(26px)]">★ {getStubStars(p.title)}</div>
              </div>
              <div className="text-sm text-slate-300 [transform:translateZ(12px)]">{p.desc}</div>
              <div className="mt-3 flex flex-wrap gap-2 [transform:translateZ(18px)]">
                {(p as any).stack?.map((t: string, k: number) => (
                  <span key={k} className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5/50 group-hover:bg-primary/15 group-hover:text-primary transition">{t}</span>
                ))}
              </div>
              {/* actions */}
              <div className="mt-3 flex items-center gap-2 [transform:translateZ(22px)]">
                {(p as any).link && (
                  <a href={(p as any).link} target="_blank" className="px-3 py-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-xs">Visit Live</a>
                )}
                <button onClick={() => explain(i)} className="px-3 py-1.5 rounded-md bg-primary text-black text-xs hover:brightness-95">
                  {explaining === i ? 'Explaining...' : "Explain Like I'm 5"}
                </button>
              </div>
              {/* explanation stream */}
              {explanations[i] && (
                <div className="mt-3 text-xs text-slate-300 whitespace-pre-wrap [transform:translateZ(10px)]">
                  {explanations[i]}
                </div>
              )}
              {/* live preview or placeholder */}
              {(p as any).link ? (
                <div className="mt-3 rounded-lg overflow-hidden border border-white/10 [transform:translateZ(8px)]">
                  <div className="relative w-full pt-[56.25%]">
                    <iframe
                      src={(p as any).link}
                      title={p.title}
                      className="absolute inset-0 h-full w-full"
                      loading="lazy"
                      sandbox="allow-same-origin allow-scripts allow-forms"
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-3 h-28 rounded-lg border border-white/10 bg-black/20 grid place-items-center text-xs text-slate-400 [transform:translateZ(8px)]">Live preview unavailable</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function tilt(e: React.MouseEvent<HTMLDivElement>) {
  const card = (e.currentTarget.querySelector('[transform-style]') || e.currentTarget.children[1]) as HTMLElement
  if (!card) return
  const rect = e.currentTarget.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width
  const py = (e.clientY - rect.top) / rect.height
  const rx = (py - 0.5) * -10
  const ry = (px - 0.5) * 10
  card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
}

function resetTilt(e: React.MouseEvent<HTMLDivElement>) {
  const card = (e.currentTarget.querySelector('[transform-style]') || e.currentTarget.children[1]) as HTMLElement
  if (!card) return
  card.style.transform = 'rotateX(0deg) rotateY(0deg)'
}

function getStubStars(title: string): number {
  // deterministic stub based on title
  let hash = 0
  for (let i = 0; i < title.length; i++) hash = (hash * 31 + title.charCodeAt(i)) >>> 0
  return 50 + (hash % 450) // 50..499
}
