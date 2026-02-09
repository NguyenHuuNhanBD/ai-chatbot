'use client'

import { useMemo, useRef, useState } from 'react'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'

import ChatHeader from '@/components/chat-header'
import { Messages } from '@/components/messages'
import { Input } from '@/components/ui/input'
import { WeatherCard } from '@/components/weather-card'

export default function Page() {
  const [selectedModel, setSelectedModel] = useState('google/gemini-2.5-flash-lite')
  const { messages, sendMessage, status } = useChat({
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
      <Messages />
      <section className='sticky bottom-0 z-1 mx-auto flex w-full max-w-4xl gap-2 border-t-0 bg-background mt-auto'>
        <Input placeholder='Send a message' />
      </section>
    </section>
  )
}
