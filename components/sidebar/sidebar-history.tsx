import { useState } from 'react'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import InfiniteScroll from 'react-infinite-scroll-component'
import { toast } from 'sonner'

import { CheckCircleFillIcon, GlobeIcon, LockIcon, MoreHorizontalIcon, ShareIcon, TrashIcon } from '@/components/icons'
import ChatItem from '@/components/sidebar/chat-item'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'

const SidebarHistory = () => {
  const { openMobile, isMobile, setOpenMobile } = useSidebar()
  const params = useParams()
  const currentId = params.id

  const [data, setData] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: `fake-id-${i}`,
      title: `Chat title ${i}`,
      createdAt: new Date().toISOString(),
      userId: 'fake-user',
      visibility: 'private'
    }))
  )
  const [hasMore, setHasMore] = useState(true)

  const fetchMore = async () => {
    // giả lập API delay
    await new Promise((r) => setTimeout(r, 800))

    setData((prev) => {
      const start = prev.length

      const more = Array.from({ length: 10 }, (_, i) => ({
        id: `fake-id-${start + i}`,
        title: `Chat title ${start + i}`,
        createdAt: new Date().toISOString(),
        userId: 'fake-user',
        visibility: 'private'
      }))

      return [...prev, ...more]
    })

    toast.success('Đã tải thêm dữ liệu ✨')
  }

  return (
    <SidebarGroup id='scroll-sidebar' className='overflow-y-auto h-full'>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMore}
        hasMore={!!hasMore}
        loader={
          <section className='flex flex-col gap-3 mt-3'>
            <Skeleton className='h-3 w-full bg-gray-300 dark:bg-muted-foreground' />
            <Skeleton className='h-3 w-[70%] bg-gray-300 dark:bg-muted-foreground' />
            <Skeleton className='h-3 w-[50%] bg-gray-300 dark:bg-muted-foreground' />
          </section>
        }
        scrollableTarget='scroll-sidebar'
      >
        <SidebarMenu>
          {data?.map((item) => {
            const isActive = currentId === item.id
            return (
              // <ChatItem />
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild data-active={isActive} className='data-[active=true]:bg-muted py-1 px-2'>
                  <Link
                    href={`/chat/${item.id}`}
                    onClick={() => {
                      if (isMobile) setOpenMobile(!openMobile)
                    }}
                    className='flex items-center gap-3 w-full'
                  >
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                <DropdownMenu modal={true}>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction
                      className='mr-0.5 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                      showOnHover={!isActive}
                    >
                      <MoreHorizontalIcon />
                      <span className='sr-only'>More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align='end' side='bottom'>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className='cursor-pointer'>
                        <ShareIcon />
                        <span>Share</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem
                            className='cursor-pointer flex-row justify-between'
                            onClick={() => {
                              // setVisibilityType('private')
                            }}
                          >
                            <div className='flex flex-row items-center gap-2'>
                              <LockIcon size={12} />
                              <span>Private</span>
                            </div>
                            {item?.visibility === 'private' ? <CheckCircleFillIcon /> : null}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className='cursor-pointer flex-row justify-between'
                            onClick={() => {
                              // setVisibilityType('public')
                            }}
                          >
                            <div className='flex flex-row items-center gap-2'>
                              <GlobeIcon />
                              <span>Public</span>
                            </div>
                            {item?.visibility === 'public' ? <CheckCircleFillIcon /> : null}
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>

                    <DropdownMenuItem
                      className='cursor-pointer text-destructive focus:bg-destructive/15 focus:text-destructive dark:text-red-500'
                      // onSelect={() => onDelete(chat.id)}
                    >
                      <TrashIcon />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </InfiniteScroll>
    </SidebarGroup>
  )
}

export default SidebarHistory
