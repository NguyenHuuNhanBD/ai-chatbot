import type { ComponentProps } from 'react'

import type { ChatStatus } from 'ai'
import { Loader2Icon, SendIcon, SquareIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type PromptInputSubmitProps = ComponentProps<typeof Button> & {
  status?: ChatStatus
}

export const PromptInputSubmit = ({
  className,
  variant = 'default',
  size = 'icon',
  status,
  children,
  ...props
}: PromptInputSubmitProps) => {
  let Icon = <SendIcon className='size-4' />

  if (status === 'submitted') {
    Icon = <Loader2Icon className='size-4 animate-spin' />
  } else if (status === 'streaming') {
    Icon = <SquareIcon className='size-4' />
  } else if (status === 'error') {
    Icon = <XIcon className='size-4' />
  }

  return (
    <Button className={cn('gap-1.5 rounded-lg', className)} size={size} type='submit' variant={variant} {...props}>
      {children ?? Icon}
    </Button>
  )
}
