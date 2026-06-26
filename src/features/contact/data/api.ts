import { apiClient } from '@/lib/axios'

const API_PATH = '/contact'

export async function storeContactService(payload: any) {
  return await apiClient.post(API_PATH, payload)
}
