import axiosClient from '@/configs/axios.config'
import { API_URL } from '@/lib/constants/api.constant'
import { ApiResponse, LoginPayload } from '@/lib/types'

export const AuthService = {
  login: async (payload?: LoginPayload): Promise<ApiResponse<boolean>> => {
    return await axiosClient.post(API_URL.AUTH.LOGIN, payload)
  }
}
