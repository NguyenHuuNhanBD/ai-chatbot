import { motion } from 'framer-motion'
import { ArrowDownIcon } from 'lucide-react'

import { Greeting } from '@/components/greeting'
import PreviewMessage from '@/components/preview-message'
import { useMessages } from '@/hooks'
import { ChatMessage } from '@/lib/types'

type PureMessagesProps = {
  messages: ChatMessage[]
}
function PureMessages({ messages }: PureMessagesProps) {
  const {
    containerRef: messagesContainerRef,
    endRef: messagesEndRef,
    isAtBottom,
    scrollToBottom,
    hasSentMessage
  } = useMessages({
    status: 'submitted'
  })
  return (
    <div className='relative flex-1'>
      <div className='absolute inset-0 touch-pan-y overflow-y-auto' ref={messagesContainerRef}>
        <div className='mx-auto flex min-w-0 max-w-4xl flex-col gap-4 px-2 py-4 md:gap-6 md:px-4 overflow-x-hidden'>
          {messages.length === 0 && <Greeting />}

          {messages.map((message) => (
            <PreviewMessage key={message.id} message={message} />
          ))}

          <div className='min-h-6 min-w-6 shrink-0' ref={messagesEndRef} />
        </div>
      </div>
      <button
        aria-label='Scroll to bottom'
        className={`absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border bg-background p-2 shadow-lg transition-all hover:bg-muted ${
          isAtBottom ? 'pointer-events-none scale-0 opacity-0' : 'pointer-events-auto scale-100 opacity-100'
        }`}
        onClick={() => scrollToBottom('smooth')}
        type='button'
      >
        <ArrowDownIcon className='size-4' />
      </button>
    </div>
  )
}
export const Messages = PureMessages
