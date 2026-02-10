'use client'
import React, { useState } from 'react'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'

import ChatHeader from '@/components/chat-header'
import { Messages } from '@/components/messages'
import MultimodalInput from '@/components/multimodal-input'
import { ChatMessage, VisibilityType } from '@/lib/types'

type ChatProps = {
  id: string
  initialMessages: ChatMessage[]
  initialChatModel: string
  initialVisibilityType: VisibilityType
  isReadonly: boolean
  autoResume: boolean
}
const Chat = ({ id, initialMessages, initialChatModel, initialVisibilityType, isReadonly, autoResume }: ChatProps) => {
  const [selectedModel, setSelectedModel] = useState('google/gemini-2.5-flash-lite')
  const { messages, sendMessage, status } = useChat({
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: `${process.env.NEXT_PUBLIC_API_URL}/chat`,
      body: {
        model: selectedModel
      }
    })
  })
  const [input, setInput] = useState('')
  return (
    <section className='overscroll-behavior-contain flex flex-col h-dvh min-w-0 touch-pan-y bg-background'>
      <ChatHeader />

      <Messages messages={messages} />

      <section className='sticky bottom-0 z-1 mx-auto flex w-full max-w-4xl gap-2 border-t-0 bg-background mt-auto mb-4'>
        <MultimodalInput />
      </section>
    </section>
  )
}

export default Chat
