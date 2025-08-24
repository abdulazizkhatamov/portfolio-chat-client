import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Chat } from '@/features/chat/data'
import { chats } from '@/features/chat/data'

// Load from cookies (helper)
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
  defaultLayout: Array<number>
  isCollapsed: boolean
  selectedChatId: Chat['id'] | null
}

const initialState: ChatState = {
  defaultLayout: loadFromCookies(
    'react-resizable-panels:layout:chat',
    [20, 32, 48],
  ),
  isCollapsed: loadFromCookies('react-resizable-panels:collapsed', false),
  selectedChatId: loadFromCookies(
    'chat:selected',
    chats.length > 0 ? chats[0].id : null,
  ),
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setDefaultLayout: (state, action: PayloadAction<Array<number>>) => {
      state.defaultLayout = action.payload
      Cookies.set(
        'react-resizable-panels:layout:chat',
        JSON.stringify(state.defaultLayout),
      )
    },
    setIsCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload
      Cookies.set(
        'react-resizable-panels:collapsed',
        JSON.stringify(state.isCollapsed),
      )
    },
    setSelectedChatId: (state, action: PayloadAction<Chat['id'] | null>) => {
      state.selectedChatId = action.payload
      Cookies.set('chat:selected', JSON.stringify(state.selectedChatId))
    },
  },
})

export const { setDefaultLayout, setIsCollapsed, setSelectedChatId } =
  chatSlice.actions
export default chatSlice.reducer
