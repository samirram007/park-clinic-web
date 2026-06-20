import axios, { type AxiosInstance } from 'axios';
import { getToken } from './auth-storage';

export const apiClient :AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: import.meta.env.VITE_AUTH_STORAGE_TYPE === 'cookie',
});


apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) =>   Promise.reject(error) );


apiClient.interceptors.response.use((response) => {
  return response;
}, (error) => Promise.reject(error))