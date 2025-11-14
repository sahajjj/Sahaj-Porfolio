"use client"
import { useEffect, useRef } from "react"

export function ParticlesBG() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const count = Math.min(120, Math.floor((w * h) / 18000))
    const dots = Array.from({ length: count }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.2 + 0.6,
    }))

    let rafId = 0
    const loop = () => {
      ctx.clearRect(0, 0, w, h)
      // subtle gradient fade
      const g = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, Math.max(w, h)/1.2)
      g.addColorStop(0, 'rgba(0,255,255,0.05)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      // draw dots
      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > w) d.vx *= -1
        if (d.y < 0 || d.y > h) d.vy *= -1
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,255,255,0.6)'
        ctx.globalAlpha = 0.45
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // connect close dots
      ctx.strokeStyle = 'rgba(0,255,255,0.08)'
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < 110) {
            ctx.globalAlpha = 1 - dist / 110
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      rafId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10" />
}
