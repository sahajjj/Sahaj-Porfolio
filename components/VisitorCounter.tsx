'use client'
import confetti from 'canvas-confetti'
import { useEffect, useState } from 'react'

export function VisitorCounter() {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    const k = 'visit-count'
    const next = (Number(localStorage.getItem(k) || '0') || 0) + 1
    localStorage.setItem(k, String(next))
    setCount(next)
    if (next % 1000 === 0) confetti({ particleCount: 180, spread: 70, origin: { y: 0.7 } })
  }, [])

  return (
    <div className="fixed left-4 bottom-4 glass rounded-full px-3 py-1 text-xs opacity-90">
      Visitor #{count}
    </div>
  )
}
