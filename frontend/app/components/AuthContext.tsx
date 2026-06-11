'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { User } from '../lib/user'

type AuthContextType = {
  isLoggedIn: boolean
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(
  null
)

export function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false)

  const [user, setUser] = useState<User | null>(
    null
  )

  useEffect(() => {
    const storedUser =
      localStorage.getItem('user')

    if (!storedUser) {
      return
    }

    try {
      const parsedUser: User =
        JSON.parse(storedUser)

      setUser(parsedUser)
      setIsLoggedIn(true)
    } catch (error) {
      console.error(
        'failed to get user from localStorage:',
        error
      )

      localStorage.removeItem('user')
    }
  }, [])

  const login = (user: User) => {
    setUser(user)
    setIsLoggedIn(true)

    localStorage.setItem(
      'user',
      JSON.stringify(user)
    )
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)

    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'not AuthProvider'
    )
  }

  return context
}