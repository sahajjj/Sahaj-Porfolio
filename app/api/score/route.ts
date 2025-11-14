import { NextRequest } from 'next/server'
import { SAHAJ, EXPERIENCE, PROJECTS, SKILLS } from '@/constants/resume'

export const runtime = 'edge'

function tokenize(s: string) {
  return (s || '').toLowerCase().replace(/[^a-z0-9+.#]/g, ' ').split(/\s+/).filter(Boolean)
}

function scoreJD(jd: string) {
  const tokens = new Set(tokenize(jd))
  const resumeTokens = new Set<string>([
    SAHAJ.title,
    ...EXPERIENCE.flatMap(e => [e.company, e.role, ...e.bullets]),
    ...PROJECTS.flatMap(p => [p.title, p.desc]),
    ...Object.values(SKILLS).flat() as string[]
  ].flatMap(tokenize))
  let hit = 0
  tokens.forEach(t => { if (resumeTokens.has(t)) hit++ })
  const pct = tokens.size ? Math.round((hit / tokens.size) * 100) : 0
  const suggestions = [] as string[]
  if (!tokens.has('typescript')) suggestions.push('Highlight TypeScript depth with metrics.')
  if (!tokens.has('next.js') && !tokens.has('next')) suggestions.push('Mention Next.js projects with performance wins.')
  if (!tokens.has('cloud')) suggestions.push('Add cloud experience (AWS/GCP) in relevant bullets.')
  if (!tokens.has('testing')) suggestions.push('Include testing frameworks and coverage improvements.')
  const matchedTokens = Array.from(tokens).filter(t => resumeTokens.has(t)).slice(0, 40)
  const missingTokens = Array.from(tokens).filter(t => !resumeTokens.has(t)).slice(0, 40)
  return { match: Math.min(98, pct), suggestions, matchedTokens, missingTokens }
}

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const jd = String(form.get('jd') || '')
  return new Response(JSON.stringify(scoreJD(jd)), { headers: { 'Content-Type': 'application/json' } })
}
