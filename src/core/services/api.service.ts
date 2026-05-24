import { apiClient } from '@/lib/axios';



export const contactService = {
  submitMessage: async (messageData: any) => {
    const { data } = await apiClient.post('/contact', messageData);
    return data;
  },
  getMessages: async () => {
    const { data } = await apiClient.get('/admin/contacts');
    return data;
  },
};
