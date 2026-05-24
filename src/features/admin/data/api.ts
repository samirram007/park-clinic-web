import { apiClient } from "@/lib/axios";

const API_PATH = "/admin/contacts" //contact_messages

export interface GetMessagesParams {
    page?: number;
    per_page?: number;
    search?: string;
    status?: 'read' | 'unread' | 'all';
}

export const contactMessageService = {
    getMessages: async (params: GetMessagesParams) => {
        const { data } = await apiClient.get(API_PATH, { params });
        return data;
    },
    storeMessage: async (payload: any) => {
        const { data } = await apiClient.post(API_PATH, payload);
        return data;
    },
    markAsRead: async (id: number) => {
        const { data } = await apiClient.patch(`${API_PATH}/${id}/read`);
        return data;
    },
    markAsUnread: async (id: number) => {
        const { data } = await apiClient.patch(`${API_PATH}/${id}/unread`);
        return data;
    }
}