'use client'
import { useEffect, useState } from 'react'

export function Preloader() {
  const [p, setP] = useState(0)
  useEffect(() => {
    let i = 0
    const t = setInterval(() => { i = Math.min(100, i + Math.floor(Math.random() * 12)); setP(i); if (i >= 100) clearInterval(t) }, 120)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-background">
      <div className="text-center">
        <div className="text-primary text-2xl font-semibold">Sahaj • Portfolio</div>
        <div className="mt-3 w-64 h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all" style={{ width: `${p}%` }} />
        </div>
        <div className="mt-2 text-xs text-slate-400">{p}%</div>
      </div>
    </div>
  )
}
