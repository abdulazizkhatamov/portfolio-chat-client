// store.ts
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/store/auth.slice'
import chatReducer from '@/features/chat/store/chat.slice'
import chatLayoutReducer from '@/features/chat/store/chatLayout.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    chatLayout: chatLayoutReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
