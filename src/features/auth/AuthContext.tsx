import React from 'react'
import axiosInstance from '@/lib/axiosInstance'

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  // Add any other user fields
}

export interface AuthContextType {
  user: User | null
  isAuthReady: boolean
  fetchUser: () => Promise<void>
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  isAuthReady: false,
  fetchUser: async () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [isAuthReady, setIsAuthReady] = React.useState(false)

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get('/auth')
      setUser(res.data.user)
    } catch (err) {
      setUser(null)
    } finally {
      setIsAuthReady(true)
    }
  }

  React.useEffect(() => {
    fetchUser()
  }, [])

  const value = React.useMemo(
    () => ({
      user,
      isAuthReady,
      fetchUser,
    }),
    [user, isAuthReady],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => React.useContext(AuthContext)
