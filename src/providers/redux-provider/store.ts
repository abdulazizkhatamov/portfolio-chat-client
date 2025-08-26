// store.ts
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/store/auth.slice'
import layoutReducer from '@/features/app/store/layout.slice'
import chatReducer from '@/features/chat/store/chat.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    chat: chatReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
