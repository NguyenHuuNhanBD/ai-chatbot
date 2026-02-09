import type { UseChatHelpers } from '@ai-sdk/react'

import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom'

export function useMessages({ status }: { status: UseChatHelpers<any>['status'] }) {
  const { containerRef, endRef, isAtBottom, scrollToBottom, onViewportEnter, onViewportLeave } = useScrollToBottom()

  const hasSentMessage = status === 'submitted'

  return {
    containerRef,
    endRef,
    isAtBottom,
    scrollToBottom,
    onViewportEnter,
    onViewportLeave,
    hasSentMessage
  }
}
