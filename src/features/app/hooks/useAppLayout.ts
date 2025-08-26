// features/chat/hooks/useChatLayout.ts
import { useDispatch, useSelector } from 'react-redux'
import { setDefaultLayout, setIsCollapsed } from '../store/layout.slice'
import type { AppDispatch, RootState } from '@/providers/redux-provider/store'

export const useAppLayout = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { defaultLayout, isCollapsed } = useSelector(
    (state: RootState) => state.layout,
  )

  return {
    defaultLayout,
    isCollapsed,
    setDefaultLayout: (layout: Array<number>) =>
      dispatch(setDefaultLayout(layout)),
    setIsCollapsed: (collapsed: boolean) => dispatch(setIsCollapsed(collapsed)),
  }
}
