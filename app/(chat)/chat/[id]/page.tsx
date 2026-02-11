import { Suspense } from 'react'

import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import Chat from '@/components/chat'
import { DEFAULT_CHAT_MODEL, fakeUiMessage } from '@/lib/constants'
import { ChatMessage } from '@/lib/types'
import { convertToUIMessages } from '@/lib/utils'
import { ChatService } from '@/services'

export default function Page(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<section className='flex h-dvh' />}>
      <ChatPage params={props.params} />
    </Suspense>
  )
}
async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const chat = await ChatService.getChatById(id)
  const messageFromDb = await ChatService.getListMessageByChatId({ id })
  const uiMessages = convertToUIMessages(messageFromDb?.data ?? [])
  const cookieStore = await cookies()
  const chatModelFromCookie = cookieStore.get('chat-model')

  return (
    <Chat
      autoResume={true}
      id={chat?.data?.id || '7f8dbe6e-25d5-4535-8f36-030c6cbc14fd'}
      initialChatModel={!chatModelFromCookie ? DEFAULT_CHAT_MODEL : chatModelFromCookie.value}
      initialMessages={fakeUiMessage}
      initialVisibilityType={chat?.data?.visibility || 'private'}
      isReadonly={false}
      key={id}
    />
  )
}
