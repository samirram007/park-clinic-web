import { apiClient } from "@/lib/axios";
import type { LoginCredentials } from '../schema';

// Re-export for backward compatibility
export type { LoginCredentials } from '../schema';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await apiClient.post('/auth/login', credentials);
    return data;
  },
  logout: async () => {
    const { data } = await apiClient.post('/auth/logout');
    return data;
  },
  profile: async () => {
    const { data } = await apiClient.get('/auth/profile');
    return data;
  },
};