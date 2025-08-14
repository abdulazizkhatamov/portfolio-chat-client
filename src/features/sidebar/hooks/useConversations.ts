import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { postConversations } from '@/features/sidebar/conversationsApi'
import { getAxiosErrorMessage } from '@/utils/getAxiosError'

export const usePostConversations = () => {
  return useMutation({
    mutationFn: postConversations,
    onSuccess: (response) => {
      //   window.location.href = '/'
      console.log(response)
    },
    onError: (error) => {
      const message = getAxiosErrorMessage(error)
      toast.error(message, {
        position: 'top-center',
      })
    },
  })
}
