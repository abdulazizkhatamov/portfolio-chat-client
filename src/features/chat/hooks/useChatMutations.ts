import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { postChat } from '../api/chat.api'
import { getAxiosErrorMessage } from '@/core/errors/axios.error'

export const useCreateChat = () => {
  return useMutation({
    mutationFn: postChat,
    onError: (error) => {
      const message = getAxiosErrorMessage(error)
      toast.error(message, {
        position: 'top-center',
      })
    },
  })
}
