import axiosInstance from '@/config/axios.config'

// Create conversation request
export const postConversations = async (user: {
  type: string
  name: string
  members: Array<string>
}) => {
  const { data } = await axiosInstance.post('/conversations', user)
  return data
}
