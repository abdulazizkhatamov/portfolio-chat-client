import axiosInstance from '@/libs/axiosInstance'

// Login request
export const postAuthLogin = async (user: {
  email: string
  password: string
}) => {
  const { data } = await axiosInstance.post('/auth/login', user)
  return data
}

// Register request
export const postAuthRegister = async (user: {
  first_name: string
  last_name: string
  email: string
  password: string
}) => {
  const { data } = await axiosInstance.post('/auth/register', user)
  return data
}
