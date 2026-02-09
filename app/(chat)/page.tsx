'use client'
import React from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

const NewChatPage = () => {
  const router = useRouter()
  return (
    <section>
      <Button onClick={() => router.push('/chat/2')}>Click go to detail page</Button>
      <div>New chat page</div>
    </section>
  )
}

export default NewChatPage
