// features/chat/store/chat.slice.ts
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Chat } from '@/features/chat/data'
import { chats } from '@/features/chat/data'

// helper
const loadFromCookies = <T>(key: string, fallback: T): T => {
  const value = Cookies.get(key)
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

export interface ChatState {
  selectedChatId: Chat['id'] | null
}

const initialState: ChatState = {
  selectedChatId: loadFromCookies(
    'chat:selected',
    chats.length > 0 ? chats[0].id : null,
  ),
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChatId: (state, action: PayloadAction<Chat['id'] | null>) => {
      state.selectedChatId = action.payload
      Cookies.set('chat:selected', JSON.stringify(state.selectedChatId))
    },
  },
})

export const { setSelectedChatId } = chatSlice.actions
export default chatSlice.reducer
