'use client'
import { useEffect, useRef, useState } from 'react'
import { MessageCircle } from 'lucide-react'

type Msg = { role: 'user' | 'assistant'; content: string }

export function ChatOrb() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: "Hi! I'm Sahaj's AI assistant. Ask me about experience, skills, or projects." }
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      // Delay to ensure element is mounted
      const t = setTimeout(() => inputRef.current?.focus(), 0)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, open])

  async function send(msg: string) {
    const next = [...messages, { role: 'user' as const, content: msg }]
    // Add an empty assistant placeholder we will stream into
    setMessages([...next, { role: 'assistant', content: '' }])
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'text/plain' },
        body: JSON.stringify({ messages: next })
      })
      if (!res.body) {
        throw new Error('No response body')
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value)
        setMessages(cur => {
          const copy = [...cur]
          // update last assistant message
          const lastIdx = copy.length - 1
          if (lastIdx >= 0 && copy[lastIdx].role === 'assistant') {
            copy[lastIdx] = { role: 'assistant', content: acc }
          }
          return copy
        })
      }
    } catch (e) {
      setMessages(cur => {
        const copy = [...cur]
        const lastIdx = copy.length - 1
        if (lastIdx >= 0 && copy[lastIdx].role === 'assistant') {
          copy[lastIdx] = { role: 'assistant', content: "I'm in fallback mode. Ask about experience, projects, or skills and I'll answer from the on-page resume." }
        }
        return copy
      })
    }
  }

  return (
    <>
      <button aria-label="Open chat" onClick={() => setOpen(v => !v)} className="fixed right-5 bottom-5 z-50 h-14 w-14 rounded-full grid place-items-center bg-primary text-black shadow-xl animate-float">
        <MessageCircle />
      </button>
      {open && (
        <div className="fixed right-5 bottom-24 z-50 w-80 glass rounded-xl p-3">
          <div ref={listRef} className="max-h-64 overflow-y-auto space-y-2 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`p-2 rounded-md ${m.role === 'user' ? 'bg-primary/20 text-primary' : 'bg-white/5'}`}>{m.content}</div>
            ))}
          </div>
          <form onSubmit={e => { e.preventDefault(); const v = inputRef.current?.value?.trim(); if (!v) return; inputRef.current!.value = ''; send(v) }} className="mt-2 flex gap-2">
            <input
              ref={inputRef}
              className="flex-1 bg-transparent border border-white/15 rounded-md px-2 py-2 caret-primary cursor-text text-foreground placeholder:text-slate-400 focus:outline-none focus:ring-2 ring-primary/40"
              placeholder="Ask about Sahaj..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <button className="px-3 py-2 rounded-md bg-primary text-black">Send</button>
          </form>
        </div>
      )}
    </>
  )
}
