import type { DoctorSingleResponse, DoctorsListResponse } from '../schema'
import { apiClient } from '@/lib/axios'

/**
 * Generate the API URL for a doctor's photo.
 * Uses the dedicated image-serving endpoint so the frontend
 * always gets images through a consistent URL.
 */
export function getDoctorImageUrl(doctorId: number): string {
  const baseURL = apiClient.defaults.baseURL ?? ''
  return `${baseURL.replace(/\/+$/, '')}/doctors/${doctorId}/image`
}

export const doctorService = {
  getDoctors: async (type?: string) => {
    const params = type ? { type } : {}
    const { data } = await apiClient.get<DoctorsListResponse>('/doctors', {
      params,
    })
    return data.data
  },
  getDoctor: async (id: number) => {
    const { data } = await apiClient.get<DoctorSingleResponse>(`/doctors/${id}`)
    return data.data
  },
}
