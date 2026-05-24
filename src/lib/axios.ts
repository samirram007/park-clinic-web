import axios, { type AxiosInstance } from 'axios';

export const apiClient :AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
 withCredentials: true, 
});


apiClient.interceptors.request.use((config) => {
    return config;
}, (error) =>   Promise.reject(error) );


apiClient.interceptors.response.use((response) => {
  return response;
}, (error) => Promise.reject(error))