// features/chat/store/chat.slice.ts
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Chat } from '../api/chat.types'

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
  selectedChatId: Chat['_id'] | null
}

const initialState: ChatState = {
  selectedChatId: loadFromCookies('chat:selected', null),
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChatId: (state, action: PayloadAction<Chat['_id'] | null>) => {
      state.selectedChatId = action.payload
      Cookies.set('chat:selected', JSON.stringify(state.selectedChatId))
    },
  },
})

export const { setSelectedChatId } = chatSlice.actions
export default chatSlice.reducer
