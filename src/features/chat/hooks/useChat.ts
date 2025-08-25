import { useDispatch, useSelector } from 'react-redux'
import { setSelectedChatId } from '../store/chat.slice'
import type { AppDispatch, RootState } from '@/providers/redux-provider/store'

export const useChat = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { selectedChatId } = useSelector((state: RootState) => state.chat)

  return {
    selectedChatId,
    setSelectedChatId: (id: string | null) => dispatch(setSelectedChatId(id)),
  }
}
