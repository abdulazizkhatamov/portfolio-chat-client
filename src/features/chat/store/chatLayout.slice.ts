// features/chat/store/chatLayout.slice.ts
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import type { PayloadAction } from '@reduxjs/toolkit'

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

export interface ChatLayoutState {
  defaultLayout: Array<number>
  isCollapsed: boolean
}

const initialState: ChatLayoutState = {
  defaultLayout: loadFromCookies(
    'react-resizable-panels:layout:chat',
    [20, 32, 48],
  ),
  isCollapsed: loadFromCookies('react-resizable-panels:collapsed', false),
}

const chatLayoutSlice = createSlice({
  name: 'chatLayout',
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
  },
})

export const { setDefaultLayout, setIsCollapsed } = chatLayoutSlice.actions
export default chatLayoutSlice.reducer
