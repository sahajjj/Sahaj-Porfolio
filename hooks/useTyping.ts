import { useEffect, useState } from 'react'

export function useTyping(words: string[], pause = 1000) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [dir, setDir] = useState<1 | -1>(1)

  useEffect(() => {
    const word = words[i % words.length]
    const t = setTimeout(() => {
      if (dir === 1) {
        if (text.length < word.length) setText(word.slice(0, text.length + 1))
        else setDir(-1)
      } else {
        if (text.length > 0) setText(word.slice(0, text.length - 1))
        else { setDir(1); setI(i + 1) }
      }
    }, dir === 1 ? 80 : 40)
    return () => clearTimeout(t)
  }, [text, dir, i, words])

  useEffect(() => {
    if (dir === -1 && text.length === words[i % words.length].length) {
      const t = setTimeout(() => setText(text), pause)
      return () => clearTimeout(t)
    }
  }, [dir, text, i, words, pause])

  return text + (dir === 1 ? '|' : '')
}
