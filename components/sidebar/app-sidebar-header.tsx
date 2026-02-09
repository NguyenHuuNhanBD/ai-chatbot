'use client'

import { useState } from 'react'

import { PlusIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSWRConfig } from 'swr'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import cookieHelper from '@/lib/helpers/cookie.helper'

const AppSidebarHeader = () => {
  const router = useRouter()
  const { setOpenMobile } = useSidebar()
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false)
  const isLogin = cookieHelper.getAccessToken()
  return (
    <>
      <section className='flex items-center justify-between'>
        <Link
          href='/'
          onClick={() => {
            setOpenMobile(false)
          }}
        >
          <span className='cursor-pointer rounded-md px-2 font-semibold text-lg hover:bg-muted'>Chatbot</span>
        </Link>
        <section className='flex items-center gap-1'>
          {isLogin && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className='size-8 p-1 md:h-fit md:p-2'
                  onClick={() => setShowDeleteAllDialog(true)}
                  type='button'
                  variant='ghost'
                >
                  <TrashIcon className='size-4.5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent align='end' className='hidden md:block'>
                Delete All Chats
              </TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className='size-8 p-1 md:h-fit md:p-2'
                onClick={() => {
                  setOpenMobile(false)
                  router.push('/')
                }}
                type='button'
                variant='ghost'
              >
                <PlusIcon className='size-4.5' />
              </Button>
            </TooltipTrigger>
            <TooltipContent align='end' className='hidden md:block'>
              New Chat
            </TooltipContent>
          </Tooltip>
        </section>
      </section>

      <AlertDialog onOpenChange={setShowDeleteAllDialog} open={showDeleteAllDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete all chats?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all your chats and remove them from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {}}>Delete All</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default AppSidebarHeader
