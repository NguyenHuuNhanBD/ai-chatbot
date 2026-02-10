import axiosClient from '@/configs/axios.config'
import { API_URL } from '@/lib/constants/api.constant'
import { ApiResponse, Chat, ChatHistory, PaginationParams, ParamsMessageByChatId } from '@/lib/types'

export const ChatService = {
  getListChatHistory: async (params: PaginationParams): Promise<ApiResponse<ChatHistory>> => {
    return await axiosClient.get(API_URL.CHAT.LIST_HISTORY, { params })
  },
  getChatById: async (id: string): Promise<ApiResponse<Chat>> => {
    try {
      const res = await axiosClient.get(API_URL.CHAT.CHAT_BY_ID, { params: { id } })
      return res.data
    } catch {
      return {
        data: undefined
      }
    }
  },
  getListMessageByChatId: async (params: ParamsMessageByChatId): Promise<ApiResponse<any[]>> => {
    try {
      const res = await axiosClient.get(API_URL.CHAT.LIST_MESSAGE_BY_CHAT_ID, { params })
      return res.data
    } catch {
      return {
        data: []
      }
    }
  }
}
