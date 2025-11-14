import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

export function getProvider() {
  const useOpenRouter = !!process.env.OPENROUTER_API_KEY
  const baseURL = useOpenRouter ? 'https://openrouter.ai/api/v1' : 'https://api.groq.com/openai/v1'
  const apiKey = useOpenRouter ? process.env.OPENROUTER_API_KEY : process.env.GROQ_API_KEY
  if (!apiKey) throw new Error('Missing OPENROUTER_API_KEY or GROQ_API_KEY')
  const headers = baseURL.includes('openrouter')
    ? { 'HTTP-Referer': 'https://sahaj-sharma.dev', 'X-Title': 'Sahaj Portfolio' }
    : undefined
  const openai = createOpenAI({ baseURL, apiKey, headers })
  return { openai, baseURL }
}

export async function streamWithModel(messages: { role: 'system'|'user'|'assistant'; content: string }[]) {
  const { openai, baseURL } = getProvider()
  return streamText({
    model: openai(useModel(baseURL)),
    messages
  })
}

function useModel(baseURL: string) {
  return baseURL.includes('openrouter') ? 'openrouter/auto' : 'groq/llama-3.1-70b-versatile'
}
