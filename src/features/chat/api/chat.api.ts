import type { Chat, CreateChatPayload, PaginatedMessages } from './chat.types'
import axiosInstance from '@/config/axios.config'

// Create a chat
export const postChat = async (payload: CreateChatPayload) => {
  const { data } = await axiosInstance.post<Chat>('/chats', payload)
  return data
}

// Get all chats
export const getChats = async () => {
  const { data } = await axiosInstance.get<Array<Chat>>('/chats')
  return data
}

// Get a single chat metadata
export const getChatById = async (id: string): Promise<Chat> => {
  const { data } = await axiosInstance.get<Chat>(`/chats/${id}`)
  return data
}

// Get paginated messages for a chat
export const getChatMessages = async (
  id: string,
  page = 1,
  limit = 20,
): Promise<PaginatedMessages> => {
  const { data } = await axiosInstance.get<PaginatedMessages>(
    `/chats/${id}/messages?page=${page}&limit=${limit}`,
  )
  return data
}
