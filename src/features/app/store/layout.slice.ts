// features/app/store/layout.slice.ts
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

export interface AppLayoutState {
  defaultLayout: Array<number>
  isCollapsed: boolean
}

const initialState: AppLayoutState = {
  defaultLayout: loadFromCookies(
    'react-resizable-panels:layout:app',
    [20, 32, 48],
  ),
  isCollapsed: loadFromCookies('react-resizable-panels:collapsed', false),
}

const appLayoutSlice = createSlice({
  name: 'appLayout',
  initialState,
  reducers: {
    setDefaultLayout: (state, action: PayloadAction<Array<number>>) => {
      state.defaultLayout = action.payload
      Cookies.set(
        'react-resizable-panels:layout:app',
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

export const { setDefaultLayout, setIsCollapsed } = appLayoutSlice.actions
export default appLayoutSlice.reducer
