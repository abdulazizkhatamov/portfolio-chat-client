import { useDispatch, useSelector } from 'react-redux'
import {
  setDefaultLayout,
  setIsCollapsed,
  setSelectedChatId,
} from '../store/chat.slice'
import type { AppDispatch, RootState } from '@/store'

export const useChat = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { defaultLayout, isCollapsed, selectedChatId } = useSelector(
    (state: RootState) => state.chat,
  )

  return {
    defaultLayout,
    isCollapsed,
    selectedChatId,
    setDefaultLayout: (layout: Array<number>) =>
      dispatch(setDefaultLayout(layout)),
    setIsCollapsed: (collapsed: boolean) => dispatch(setIsCollapsed(collapsed)),
    setSelectedChatId: (id: string | null) => dispatch(setSelectedChatId(id)),
  }
}
