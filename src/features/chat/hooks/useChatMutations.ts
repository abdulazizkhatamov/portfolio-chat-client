import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { postChat } from '../api/chat.api'
import { getAxiosErrorMessage } from '@/core/errors/axios.error'

export const useCreateChat = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postChat,
    onSuccess: () => {
      // Invalidate the "chats" query to refetch chat list
      queryClient.invalidateQueries({ queryKey: ['chats'] })
    },
    onError: (error) => {
      const message = getAxiosErrorMessage(error)
      toast.error(message, {
        position: 'top-center',
      })
    },
  })
}
