import { Suspense } from 'react'

import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import Chat from '@/components/chat'
import { DEFAULT_CHAT_MODEL } from '@/lib/constants'
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
  const fakeUiMessage: ChatMessage[] = [
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
