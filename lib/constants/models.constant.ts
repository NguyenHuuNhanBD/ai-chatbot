import { ChatMessage, ChatModel } from '@/lib/types'

export const DEFAULT_CHAT_MODEL = 'anthropic/claude-haiku-4.5'

export const CHAT_MODELS: ChatModel[] = [
  // Anthropic
  {
    id: 'anthropic/claude-haiku-4.5',
    name: 'Claude Haiku 4.5',
    provider: 'anthropic',
    description: 'Fast and affordable, great for everyday tasks'
  },
  {
    id: 'anthropic/claude-sonnet-4.5',
    name: 'Claude Sonnet 4.5',
    provider: 'anthropic',
    description: 'Best balance of speed, intelligence, and cost'
  },
  {
    id: 'anthropic/claude-opus-4.5',
    name: 'Claude Opus 4.5',
    provider: 'anthropic',
    description: 'Most capable Anthropic model'
  },
  // OpenAI
  {
    id: 'openai/gpt-4.1-mini',
    name: 'GPT-4.1 Mini',
    provider: 'openai',
    description: 'Fast and cost-effective for simple tasks'
  },
  {
    id: 'openai/gpt-5.2',
    name: 'GPT-5.2',
    provider: 'openai',
    description: 'Most capable OpenAI model'
  },
  // Google
  {
    id: 'google/gemini-2.5-flash-lite',
    name: 'Gemini 2.5 Flash Lite',
    provider: 'google',
    description: 'Ultra fast and affordable'
  },
  {
    id: 'google/gemini-3-pro-preview',
    name: 'Gemini 3 Pro',
    provider: 'google',
    description: 'Most capable Google model'
  },
  // xAI
  {
    id: 'xai/grok-4.1-fast-non-reasoning',
    name: 'Grok 4.1 Fast',
    provider: 'xai',
    description: 'Fast with 30K context'
  },
  // Reasoning models (extended thinking)
  {
    id: 'anthropic/claude-3.7-sonnet-thinking',
    name: 'Claude 3.7 Sonnet',
    provider: 'reasoning',
    description: 'Extended thinking for complex problems'
  },
  {
    id: 'xai/grok-code-fast-1-thinking',
    name: 'Grok Code Fast',
    provider: 'reasoning',
    description: 'Reasoning optimized for code'
  }
]
// Group models by provider for UI
export const MODELS_BY_PROVIDER = CHAT_MODELS.reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = []
    }
    acc[model.provider].push(model)
    return acc
  },
  {} as Record<string, ChatModel[]>
)

export const fakeUiMessage: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    parts: [{ type: 'text', text: 'Next.js là gì vậy?' }]
  },
  {
    id: '2',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: 'Next.js là framework React giúp bạn xây dựng web app production-ready. Nó hỗ trợ routing, SSR, SSG, API routes, tối ưu bundle và nhiều thứ khác.'
      }
    ]
  },
  {
    id: '3',
    role: 'user',
    parts: [{ type: 'text', text: 'Nó có những kiểu render nào?' }]
  },
  {
    id: '4',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: 'Next.js có 3 kiểu chính: SSR (Server-side Rendering), SSG (Static Site Generation), và CSR (Client-side Rendering). Ngoài ra App Router còn có Streaming và Server Components.'
      }
    ]
  },
  {
    id: '5',
    role: 'user',
    parts: [{ type: 'text', text: 'SSR hoạt động như thế nào?' }]
  },
  {
    id: '6',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: 'SSR render HTML trên server mỗi request. Người dùng nhận được trang hoàn chỉnh nhanh hơn cho SEO, nhưng server sẽ tốn tài nguyên hơn.'
      }
    ]
  },
  {
    id: '7',
    role: 'user',
    parts: [{ type: 'text', text: 'Còn SSG thì sao?' }]
  },
  {
    id: '8',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: 'SSG build HTML sẵn tại build time. Trang load cực nhanh vì chỉ serve file tĩnh, phù hợp blog, landing page.'
      }
    ]
  },
  {
    id: '9',
    role: 'user',
    parts: [
      {
        type: 'text',
        text: 'Khi nào nên dùng CSR? Khi nào nên dùng CSR? Khi nào nên dùng CSR?Khi nào nên dùng CSR?Khi nào nên dùng CSR?Khi nào nên dùng CSR?Khi nào nên dùng CSR?Khi nào nên dùng CSR?Khi nào nên dùng CSR?'
      }
    ]
  },
  {
    id: '10',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: 'CSR phù hợp dashboard hoặc UI cần tương tác nhiều. Browser render sau khi load JS, SEO kém hơn nhưng linh hoạt.'
      }
    ]
  }
]
