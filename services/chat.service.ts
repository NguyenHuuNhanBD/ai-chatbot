import axiosClient from '@/configs/axios.config'
import { API_URL } from '@/lib/constants/api.constant'
import { ApiResponse, ChatHistory, PaginationParams } from '@/lib/types'

export const ChatService = {
  getListChatHistory: async (params: PaginationParams): Promise<ApiResponse<ChatHistory>> => {
    return await axiosClient.get(API_URL.CHAT.LIST_HISTORY, { params })
  }
}
