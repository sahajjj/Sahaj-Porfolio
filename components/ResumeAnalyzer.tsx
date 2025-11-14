'use client'
import { useState } from 'react'

export function ResumeAnalyzer() {
  const [progress, setProgress] = useState<'idle' | 'loading' | 'done'>('idle')
  const [score, setScore] = useState<number | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const [missing, setMissing] = useState<string[]>([])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setProgress('loading')
    const res = await fetch('/api/score', { method: 'POST', body: fd })
    const data = await res.json()
    setScore(data.match)
    setSuggestions(data.suggestions)
    setMatched(data.matchedTokens || [])
    setMissing(data.missingTokens || [])
    setProgress('done')
  }

  return (
    <div className="glass rounded-xl p-4 space-y-4">
      <h3 className="font-semibold text-lg tracking-tight">AI Resume Match Analyzer</h3>
      <form onSubmit={onSubmit} className="space-y-3">
        <textarea name="jd" placeholder="Paste job description..." className="w-full min-h-40 bg-transparent border border-white/15 rounded-md p-3 text-sm" required />
        <button className="px-4 py-2 rounded-md bg-primary text-black disabled:opacity-60" disabled={progress==='loading'}>{progress === 'loading' ? 'Analyzing...' : 'Analyze'}</button>
      </form>
      {score !== null && (
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0 rounded-full" style={{ background: `conic-gradient(#00ffff ${score}%, rgba(255,255,255,0.08) ${score}% 100%)` }}>
              <div className="absolute inset-[6px] rounded-full bg-black/60 grid place-items-center text-sm">
                <span className="font-semibold text-gold">{score}%</span>
              </div>
            </div>
            <div className="text-sm text-slate-300">
              <div className="font-medium text-foreground">Match score</div>
              <div>Higher is better. Improve by covering missing keywords and quantifying outcomes.</div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">Matched Keywords</div>
              <div className="flex flex-wrap gap-2">
                {matched.length ? matched.map((t, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">{t}</span>
                )) : <span className="text-xs text-slate-500">No matches yet</span>}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">Missing Keywords</div>
              <div className="flex flex-wrap gap-2">
                {missing.length ? missing.map((t, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30">{t}</span>
                )) : <span className="text-xs text-slate-500">Great coverage</span>}
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">Suggestions</div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {suggestions.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
