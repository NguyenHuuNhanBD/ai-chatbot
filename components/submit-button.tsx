'use client'

import { useFormStatus } from 'react-dom'

import { LoaderIcon } from '@/components/icons'

import { Button } from './ui/button'

export function SubmitButton({
  children,
  isLoading,
  isDisabled
}: {
  children: React.ReactNode
  isLoading: boolean
  isDisabled?: boolean
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      aria-disabled={pending || isLoading || isDisabled}
      className='relative'
      disabled={pending || isLoading || isDisabled}
      type={pending ? 'button' : 'submit'}
    >
      {children}

      {(pending || isLoading) && (
        <span className='absolute right-4 animate-spin'>
          <LoaderIcon />
        </span>
      )}

      <output aria-live='polite' className='sr-only'>
        {pending || isLoading ? 'Loading' : 'Submit form'}
      </output>
    </Button>
  )
}
