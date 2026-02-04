'use client'
import type { PropsWithChildren } from 'react'

import { QueryProvider } from '@/providers/query-provider'
import ThemeProvider from '@/providers/theme-provider'

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryProvider>
  )
}
