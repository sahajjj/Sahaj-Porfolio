import { useEffect, useRef } from 'react'

export function useMagnetic(strength = 0.2) {
  const ref = useRef<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | null>(null)
  useEffect(() => {
    const el = ref.current as HTMLElement | null
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }
    const onLeave = () => { if (el) el.style.transform = 'translate(0,0)' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [strength])
  return ref
}
