import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
 
import { authService } from '../data/api';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData?: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user-profile'],
    queryFn: authService.profile ,
    retry: true,
  });

  const user = data || null;
  const isAuthenticated = !!user;

  const login = (_userData?: User) => {
    // Invalidate and refetch user profile after login
    refetch();
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      // Clear cache on logout
      window.location.reload(); 
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
