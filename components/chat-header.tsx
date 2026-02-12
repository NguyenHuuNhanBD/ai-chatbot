'use client'

import { memo } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useWindowSize } from 'usehooks-ts'

import { SidebarToggle } from '@/components/sidebar-toggle'
import { Button } from '@/components/ui/button'
import { VisibilitySelector } from '@/components/visibility-selector'

import { PlusIcon, VercelIcon } from './icons'
import { useSidebar } from './ui/sidebar'

const ChatHeader = () => {
  const router = useRouter()
  const { open } = useSidebar()
  const { width: windowWidth } = useWindowSize()

  const isReadonly = false
  return (
    <header className='sticky top-0 flex items-center gap-2 bg-background px-2 py-1.5 md:px-2'>
      <SidebarToggle />

      {(!open || windowWidth < 768) && (
        <Button
          className='order-2 ml-auto h-8 px-2 md:order-1 md:ml-0 md:h-fit md:px-2'
          onClick={() => {
            router.push('/')
            router.refresh()
          }}
          variant='outline'
        >
          <PlusIcon />
          <span className='md:sr-only'>New Chat</span>
        </Button>
      )}

      {!isReadonly && <VisibilitySelector className='order-1 md:order-2' />}
    </header>
  )
}

export default ChatHeader
