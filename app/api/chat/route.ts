import { NextRequest } from 'next/server'
import { streamWithModel } from '@/lib/ai'
import { SAHAJ, EXPERIENCE, PROJECTS, EDUCATION, SKILLS, CERTS } from '@/constants/resume'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { messages } = await req.json()
  const system = {
    role: 'system' as const,
    content: `You are an enthusiastic assistant for Sahaj Sharma. Answer concisely using ONLY the following profile data. If asked personal details, use exact strings.
Name: ${SAHAJ.name}
Title: ${SAHAJ.title}
Email: ${SAHAJ.email}
Phone: ${SAHAJ.phone}
LinkedIn: ${SAHAJ.linkedin}
GitHub: ${SAHAJ.github}
Experience: ${EXPERIENCE.map(e=>`${e.company} | ${e.role} | ${e.period} - ${e.bullets.join(' ; ')}`).join(' / ')}
Projects: ${PROJECTS.map(p=>`${p.title} - ${p.desc}`).join(' / ')}
Education: ${EDUCATION.join(' / ')}
Skills: ${Object.entries(SKILLS).map(([k,v])=>`${k}: ${(v as readonly string[]).join(', ')}`).join(' / ')}
Certifications: ${CERTS.join(' / ')}` }
  try {
    const stream = await streamWithModel([system, ...messages])
    return stream.toAIStreamResponse()
  } catch (err) {
    const lastUser = Array.isArray(messages) ? messages.filter((m: any) => m?.role === 'user').slice(-1)[0]?.content ?? '' : ''
    const mock = mockAnswer(lastUser)
    const encoder = new TextEncoder()
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        const chunks = mock.match(/.{1,80}/g) || [mock]
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

function mockAnswer(q: string): string {
  const intro = "I'm Sahaj's AI assistant. Here's a quick, grounded answer based on the on-page resume."
  if (/why.*hire|why.*you/i.test(q)) {
    return intro + "\nWhy hire Sahaj? Impact across frontend and full stack: " +
      EXPERIENCE[0].company + " " + EXPERIENCE[0].role + " delivering " + EXPERIENCE[0].bullets.join('; ') +
      ". Projects like " + PROJECTS.map(p=>p.title).join(', ') + " show practical shipping. Core skills: " +
      (Object.values(SKILLS).flat() as readonly string[]).slice(0,10).join(', ') + "."
  }
  if (/project|build|made/i.test(q)) {
    return intro + "\nRecent projects: " + PROJECTS.map(p=>p.title + " — " + p.desc).join(' / ') + "."
  }
  if (/skill|stack|tech/i.test(q)) {
    return intro + "\nSkills: " + Object.entries(SKILLS).map(([k,v]) => k + ": " + (v as readonly string[]).join(', ')).join(' | ') + "."
  }
  if (/experience|intern|work/i.test(q)) {
    return intro + "\nExperience: " + EXPERIENCE.map(e=> e.company + " • " + e.role + " (" + e.period + ")").join(' / ') + "."
  }
  return intro + "\nAsk me about experience, projects, or skills. For example: \"Why should we hire Sahaj?\""
}
