import axiosInstance from '@/config/axios.config'

export const postAuthLogin = async (payload: {
  email: string
  password: string
}) => {
  const { data } = await axiosInstance.post('/auth/login', payload)
  return data
}

// Register request
export const postAuthRegister = async (payload: {
  first_name: string
  last_name: string
  email: string
  password: string
}) => {
  const { data } = await axiosInstance.post('/auth/register', payload)
  return data
}
