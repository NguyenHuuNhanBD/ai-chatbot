import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { API_URL } from '@/lib/constants'
import { ChatService } from '@/services/chat.service'

type UseMessageByChatIdQueryOptions = Omit<UseQueryOptions<any[]>, 'queryKey' | 'queryFn'>

export const useMessageByChatId = (options?: UseMessageByChatIdQueryOptions) => {
  return useQuery({
    queryKey: [API_URL.CHAT.LIST_MESSAGE_BY_CHAT_ID],
    queryFn: async () => {
      const res = await ChatService.getListMessageByChatId({ id: '1' })
      return res?.data ?? []
    },
    ...options
  })
}
