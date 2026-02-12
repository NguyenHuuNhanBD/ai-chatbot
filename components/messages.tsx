import { useEffect, useRef, useState } from 'react'

import { UseChatHelpers } from '@ai-sdk/react'
import { ArrowDownIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Greeting } from '@/components/greeting'
import PreviewMessage from '@/components/preview-message'
import ThinkingMessage from '@/components/thinking-message'
import { ChatMessage } from '@/lib/types'

type PureMessagesProps = {
  messages: ChatMessage[]
  status: UseChatHelpers<ChatMessage>['status']
  setMessages: UseChatHelpers<ChatMessage>['setMessages']
}
function PureMessages({ messages, status, setMessages }: PureMessagesProps) {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const [isAtBottom, setIsAtBottom] = useState(false)
  const fakeFetch = async (): Promise<ChatMessage[]> => {
    await new Promise((r) => setTimeout(r, 600))

    return Array.from({ length: 10 }).flatMap(() => [
      {
        id: crypto.randomUUID(),
        role: 'user',
        parts: [{ type: 'text', text: 'Tin cũ load từ API...' }]
      },
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        parts: [{ type: 'text', text: 'Reply lịch sử từ server 🤖' }]
      }
    ])
  }

  const handleScrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    const el = messagesContainerRef.current
    if (!el) return
    el.scrollTo({
      top: el.scrollHeight - el.clientHeight,
      behavior: 'instant'
    })
  }, [])

  useEffect(() => {
    const el = messagesContainerRef.current
    if (!el) return

    let loading = false

    const handleScroll = async () => {
      if (loading) return

      // ⭐ chỉ trigger khi chạm đỉnh
      if (el.scrollTop <= 100) {
        loading = true

        // lưu chiều cao trước khi load
        const prevHeight = el.scrollHeight

        const older = await fakeFetch()
        setMessages((prev) => [...older, ...prev])

        // giữ vị trí scroll không nhảy
        requestAnimationFrame(() => {
          const newHeight = el.scrollHeight
          el.scrollTop = newHeight - prevHeight
          loading = false
        })

        toast.success('Đã load thêm data')
      }
    }

    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const el = messagesContainerRef.current
    if (!el) return

    const THRESHOLD = 80 // 50–100px tùy bạn

    const onScroll = () => {
      const distanceToBottom = el.scrollHeight - el.clientHeight - el.scrollTop

      setIsAtBottom(distanceToBottom > THRESHOLD)
    }

    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isAtBottom) {
      handleScrollToBottom()
    }
  }, [messages])
  return (
    <div className='relative flex-1'>
      <div className='absolute inset-0 touch-pan-y overflow-y-auto' ref={messagesContainerRef}>
        <div className='mx-auto flex min-w-0 max-w-4xl flex-col gap-4 px-2 py-4 md:gap-6 md:px-4 overflow-x-hidden'>
          {messages.length === 0 && <Greeting />}
          {messages.map((message) => (
            <PreviewMessage key={message.id} message={message} />
          ))}
          {status === 'submitted' &&
            !messages.some((msg) =>
              msg.parts?.some((part) => 'state' in part && part.state === 'approval-responded')
            ) && <ThinkingMessage />}
          <div className='min-h-6 min-w-6 shrink-0' ref={messagesEndRef} />
        </div>
      </div>
      <button
        aria-label='Scroll to bottom'
        className={`absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border bg-background p-2 shadow-lg transition-all hover:bg-muted ${
          !isAtBottom ? 'pointer-events-none scale-0 opacity-0' : 'pointer-events-auto scale-100 opacity-100'
        }`}
        onClick={handleScrollToBottom}
        type='button'
      >
        <ArrowDownIcon className='size-4' />
      </button>
    </div>
  )
}
export const Messages = PureMessages
