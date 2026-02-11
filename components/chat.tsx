'use client'
import { useState } from 'react'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'

import ChatHeader from '@/components/chat-header'
import { Messages } from '@/components/messages'
import MultimodalInput from '@/components/multimodal-input'
import { ChatMessage, VisibilityType } from '@/lib/types'
import { generateUUID } from '@/lib/utils'

type ChatProps = {
  id: string
  initialMessages: ChatMessage[]
  initialChatModel: string
  initialVisibilityType: VisibilityType
  isReadonly: boolean
  autoResume: boolean
}
const Chat = ({ id, initialMessages, initialChatModel, initialVisibilityType, isReadonly, autoResume }: ChatProps) => {
  // Model
  const [currentModelId, setCurrentModelId] = useState(initialChatModel)

  // Propmt text
  const [input, setInput] = useState<string>('')

  const { messages, sendMessage, status } = useChat({
    messages: initialMessages,
    generateId: generateUUID,
    transport: new DefaultChatTransport({
      api: '/api/chat',
      prepareSendMessagesRequest(request) {
        console.log('Request: ', request)
        const lastMessage = request.messages.at(-1)
        const isToolApprovalContinuation =
          lastMessage?.role !== 'user' ||
          request.messages.some((msg) =>
            msg.parts?.some((part) => {
              const state = (part as { state?: string }).state
              return state === 'approval-responded' || state === 'output-denied'
            })
          )

        return {
          body: {
            id: request.id,
            ...(isToolApprovalContinuation ? { messages: request.messages } : { message: lastMessage }),
            selectedChatModel: currentModelId,
            selectedVisibilityType: initialVisibilityType,
            ...request.body
          }
        }
      }
    })
  })

  return (
    <section className='overscroll-behavior-contain flex flex-col h-dvh min-w-0 touch-pan-y bg-background'>
      <ChatHeader />
      <Messages messages={messages} />

      <section className='sticky bottom-0 z-1 mx-auto flex w-full max-w-4xl gap-2 border-t-0 bg-background px-2 pb-3 md:px-4 md:pb-4'>
        <MultimodalInput
          selectedModelId={currentModelId}
          onModelChange={setCurrentModelId}
          promptText={input}
          onChangePromptText={setInput}
          status={status}
          onSendMessage={sendMessage}
        />
      </section>
    </section>
  )
}

export default Chat
