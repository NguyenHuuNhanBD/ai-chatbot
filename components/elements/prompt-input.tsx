import type { ComponentProps, KeyboardEventHandler } from 'react'

import type { ChatStatus } from 'ai'
import { Loader2Icon, SquareIcon, XIcon } from 'lucide-react'

import { ArrowUpIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
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
  let Icon = <ArrowUpIcon className='size-4' />

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

export type PromptInputTextareaProps = ComponentProps<typeof Textarea> & {
  minHeight?: number
  maxHeight?: number
  disableAutoResize?: boolean
  resizeOnNewLinesOnly?: boolean
}

export const PromptInputTextarea = ({
  onChange,
  className,
  placeholder = 'What would you like to know?',
  minHeight = 48,
  maxHeight = 164,
  disableAutoResize = false,
  resizeOnNewLinesOnly = false,
  ...props
}: PromptInputTextareaProps) => {
  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      if (e.nativeEvent.isComposing) {
        return
      }

      if (e.shiftKey) {
        return
      }

      e.preventDefault()

      const form = e.currentTarget.form
      const submitButton = form?.querySelector('button[type="submit"]') as HTMLButtonElement | null
      if (submitButton?.disabled) {
        return
      }

      form?.requestSubmit()
    }
  }

  return (
    <Textarea
      className={cn(
        'w-full resize-none rounded-none border-none p-3 shadow-none outline-hidden ring-0',
        disableAutoResize
          ? 'field-sizing-fixed'
          : resizeOnNewLinesOnly
            ? 'field-sizing-fixed'
            : 'field-sizing-content max-h-[6lh]',
        'bg-transparent dark:bg-transparent',
        'focus-visible:ring-0',
        className
      )}
      name='message'
      onChange={(e) => {
        onChange?.(e)
      }}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      {...props}
    />
  )
}
