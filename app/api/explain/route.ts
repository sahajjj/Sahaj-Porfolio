import { NextRequest } from 'next/server'
import { streamWithModel } from '@/lib/ai'
import { SAHAJ, EXPERIENCE, PROJECTS, EDUCATION, SKILLS, CERTS } from '@/constants/resume'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { title, desc, stack } = await req.json()
  const system = {
    role: 'system' as const,
    content: `You are an expert explainer. Explain projects in simple, engaging terms.
Use ONLY the following resume context to answer.
Name: ${SAHAJ.name}
Projects: ${PROJECTS.map(p=>`${p.title} - ${p.desc}`).join(' / ')}
Skills: ${Object.entries(SKILLS).map(([k,v])=>`${k}: ${(v as readonly string[]).join(', ')}`).join(' / ')}`
  }
  const user = {
    role: 'user' as const,
    content: `Explain Like I'm 5: ${title}\nDescription: ${desc}\nTech: ${(stack||[]).join(', ')}`
  }
  try {
    const stream = await streamWithModel([system, user])
    return stream.toAIStreamResponse()
  } catch (err) {
    const text = mockExplain(title, desc, stack)
    const encoder = new TextEncoder()
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        const chunks = text.match(/.{1,80}/g) || [text]
        let i = 0
        const tick = () => {
          if (i >= chunks.length) { controller.close(); return }
          controller.enqueue(encoder.encode(chunks[i++] + ' '))
          setTimeout(tick, 25)
        }
        tick()
      }
    })
    return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }
}

function mockExplain(title: string, desc: string, stack: string[] = []) {
  const simple = `Imagine building ${title}. It's like a helpful tool that ${desc}.`
  const tech = stack.length ? ` It uses ${stack.join(', ')} so things work fast and safely.` : ''
  return simple + tech + ' In short: it helps people do tasks easier and smarter.'
}
