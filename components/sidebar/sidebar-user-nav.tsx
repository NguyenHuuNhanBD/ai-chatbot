'use client'

import { ChevronUp } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { LoaderIcon } from '@/components/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

export function SidebarUserNav() {
  const router = useRouter()
  const { setTheme, resolvedTheme } = useTheme()
  const isGuest = true
  const status: string = 'done'
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {status === 'loading' ? (
              <SidebarMenuButton className='h-10 justify-between bg-background data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                <div className='flex flex-row gap-2'>
                  <div className='size-6 animate-pulse rounded-full bg-zinc-500/30' />
                  <span className='animate-pulse rounded-md bg-zinc-500/30 text-transparent'>Loading auth status</span>
                </div>
                <div className='animate-spin text-zinc-500'>
                  <LoaderIcon />
                </div>
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton
                className='h-10 bg-background data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                data-testid='user-nav-button'
              >
                <p className='size-6 bg-blue-500 rounded-full'></p>
                <span className='truncate' data-testid='user-email'>
                  {isGuest ? 'Guest' : 'NHN'}
                </span>
                <ChevronUp className='ml-auto' />
              </SidebarMenuButton>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-(--radix-popper-anchor-width)' data-testid='user-nav-menu' side='top'>
            <DropdownMenuItem
              className='cursor-pointer'
              data-testid='user-nav-item-theme'
              onSelect={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            >
              {`Toggle ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild data-testid='user-nav-item-auth'>
              <button
                className='w-full cursor-pointer'
                onClick={() => {
                  if (isGuest) {
                    router.push('/login')
                  } else {
                    router.push('/')
                  }
                }}
                type='button'
              >
                {isGuest ? 'Login to your account' : 'Sign out'}
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
