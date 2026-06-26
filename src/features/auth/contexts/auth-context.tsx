import React, { createContext, useContext } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { authService } from '../data/api'
import type { LoginResponse, User } from '../schema'
import { getToken, removeToken, setToken } from '@/lib/auth-storage'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: LoginResponse) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user-profile'],
    queryFn: authService.profile,
    enabled: !!getToken(),
    retry: false, // Prevent endless retries on auth failure
  })

  const user = data || null
  const isAuthenticated = !!user

  const login = (data: LoginResponse) => {
    if (data.token) {
      setToken(data.token)
      refetch()
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } finally {
      removeToken()
      queryClient.removeQueries({ queryKey: ['user-profile'] })
      window.location.href = '/login'
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
