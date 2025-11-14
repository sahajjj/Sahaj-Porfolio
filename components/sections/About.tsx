'use client'
import { useMagnetic } from '@/hooks/useMagnetic'
import { ResumeAnalyzer } from '@/components/ResumeAnalyzer'
import Image from 'next/image'

export function About() {
  const ref = useMagnetic(0.12)
  return (
    <section id="about" className="py-20">
      <h2 className="text-2xl font-semibold mb-6">About</h2>
      <div ref={ref as any} className="grid md:grid-cols-2 gap-6 items-center">
        <div className="glass rounded-xl p-4">
          <div className="rounded-xl p-[1px]" style={{ background: 'linear-gradient(135deg, rgba(0,255,255,0.35), rgba(255,0,255,0.25))' }}>
            <div className="aspect-video rounded-[11px] overflow-hidden relative">
              <Image src="/about.jpg" alt="About photo" width={1280} height={720} className="h-full w-full object-cover" priority />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_100%,rgba(0,0,0,0.45),transparent_60%)]" />
            </div>
          </div>
          <div className="mt-3 text-sm text-slate-300">
            I am Sahaj Sharma, a third-year B.Tech CSE student at VIT Bhopal with a passion for crafting fast, elegant, and impactful web experiences. Currently interning as a Full Stack Web Developer at Motherson Technology Services and leading as Co-CEO of Bits And Bytes, I previously drove a major AngularJS → React migration at Gatepax AI (500K+ DAU platform), slashing render time by 55% and bundle size by 40%. Skilled in React, Next.js, TypeScript, Node.js, MongoDB, AWS, and modern design tools, I build pixel-perfect, high-performance applications that deliver real results. Always building, always learning, always ready for the next challenge. Let’s create something great together
          </div>
        </div>
        <ResumeAnalyzer />
      </div>
    </section>
  )
}
