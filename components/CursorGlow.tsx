"use client"
import { useEffect, useRef } from "react"

export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
      }
    }

    const raf = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
      requestAnimationFrame(raf)
    }

    window.addEventListener('mousemove', onMove)
    const id = requestAnimationFrame(raf)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(id)
    }
  }, [])

  return (
    <>
      <div ref={trailRef} className="pointer-events-none fixed left-0 top-0 z-[60] -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(0,255,255,0.18) 0%, rgba(0,255,255,0) 70%)' }} />
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[61] -translate-x-1/2 -translate-y-1/2 h-[10px] w-[10px] rounded-full bg-cyan-300/90 shadow-[0_0_20px_6px_rgba(0,255,255,0.35)]" />
    </>
  )
}
