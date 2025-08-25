// features/chat/hooks/useChatLayout.ts
import { useDispatch, useSelector } from 'react-redux'
import { setDefaultLayout, setIsCollapsed } from '../store/chatLayout.slice'
import type { AppDispatch, RootState } from '@/providers/redux-provider/store'

export const useChatLayout = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { defaultLayout, isCollapsed } = useSelector(
    (state: RootState) => state.chatLayout,
  )

  return {
    defaultLayout,
    isCollapsed,
    setDefaultLayout: (layout: Array<number>) =>
      dispatch(setDefaultLayout(layout)),
    setIsCollapsed: (collapsed: boolean) => dispatch(setIsCollapsed(collapsed)),
  }
}
