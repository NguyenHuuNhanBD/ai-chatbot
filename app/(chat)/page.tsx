import { Suspense } from 'react'

import { cookies } from 'next/headers'

import Chat from '@/components/chat'
import { DEFAULT_CHAT_MODEL } from '@/lib/constants'
import { generateUUID } from '@/lib/utils'

export default function Page() {
  return (
    <Suspense fallback={<section className='flex h-dvh' />}>
      <NewChatPage />
    </Suspense>
  )
}

async function NewChatPage() {
  const id = generateUUID()
  const cookieStore = await cookies()
  const modelIdFromCookie = cookieStore.get('chat-model')
  return (
    <Chat
      autoResume={false}
      id={id}
      initialChatModel={!modelIdFromCookie ? DEFAULT_CHAT_MODEL : modelIdFromCookie.value}
      initialMessages={[]}
      initialVisibilityType='private'
      isReadonly={false}
      key={id}
    />
  )
}
