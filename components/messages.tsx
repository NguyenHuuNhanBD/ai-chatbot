import { ArrowDownIcon } from 'lucide-react'

import { Greeting } from '@/components/greeting'
import { useMessages } from '@/hooks'

function PureMessages() {
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
    <div className='relative flex-1 border border-[green]'>
      <div className='absolute inset-0 touch-pan-y overflow-y-auto' ref={messagesContainerRef}>
        <div className='mx-auto flex min-w-0 max-w-4xl flex-col gap-4 px-2 py-4 md:gap-6 md:px-4'>
          <Greeting />
          {Array.from({ length: 20 }).map((_, index) => (
            <p key={index}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta sed iste quam at quo pariatur dolorem
              sapiente, quisquam error, labore, officia amet dolore inventore cumque animi. Aut in minima aliquid?
            </p>
          ))}
          {/* <div className='min-h-[24px] min-w-[24px] shrink-0 border border-[red]' ref={messagesEndRef} /> */}
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
