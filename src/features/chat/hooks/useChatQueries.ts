import { useQuery } from '@tanstack/react-query'
import { getChatById, getChatMessages, getChats } from '../api/chat.api'
import type { Chat, PaginatedMessages } from '../api/chat.types'

// 🔹 Fetch all chats (chat list)
export const useFetchChats = () => {
  return useQuery<Array<Chat>>({
    queryKey: ['chats'],
    queryFn: getChats,
    staleTime: 1000 * 60, // 1 minute caching
  })
}

// 🔹 Fetch single chat metadata
export const useFetchChatById = (id: string | null) => {
  return useQuery<Chat>({
    queryKey: ['chat', id],
    queryFn: () => {
      if (!id) throw new Error('Chat ID is required')
      return getChatById(id)
    },
    enabled: !!id, // Only fetch if id is not null
    staleTime: 1000 * 30, // 30s cache
  })
}

// 🔹 Fetch messages for a chat (with pagination)
export const useFetchChatMessages = (
  chatId: string | null,
  page = 1,
  limit = 20,
) => {
  return useQuery<PaginatedMessages>({
    queryKey: ['chatMessages', chatId, page, limit],
    queryFn: () => {
      if (!chatId) throw new Error('Chat ID is required')
      return getChatMessages(chatId, page, limit)
    },
    placeholderData: (prev) => prev, // keep previous page while fetching new one
    enabled: !!chatId,
    staleTime: 1000 * 10, // 10s fresh
  })
}
