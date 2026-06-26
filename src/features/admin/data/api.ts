import type {
  GetCareerApplicationsParams,
  GetDoctorsParams,
  GetJobPostsParams,
  GetMessagesParams,
} from './schema'
import { apiClient } from '@/lib/axios'

const API_PATH = '/admin/contacts' // contact_messages

export const contactMessageService = {
  getMessages: async (params: GetMessagesParams) => {
    const { data } = await apiClient.get(API_PATH, { params })
    return data
  },
  storeMessage: async (payload: any) => {
    const { data } = await apiClient.post(API_PATH, payload)
    return data
  },
  markAsRead: async (id: number) => {
    const { data } = await apiClient.patch(`${API_PATH}/${id}/read`)
    return data
  },
  markAsUnread: async (id: number) => {
    const { data } = await apiClient.patch(`${API_PATH}/${id}/unread`)
    return data
  },
  reply: async ({ id, message }: { id: number; message: string }) => {
    const { data } = await apiClient.post(`${API_PATH}/${id}/reply`, {
      reply_message: message,
    })
    return data
  },
  toggleImportant: async (id: number) => {
    const { data } = await apiClient.patch(`${API_PATH}/${id}/important`)
    return data
  },
}

const DOCTORS_PATH = '/admin/doctors'

/**
 * Build FormData from a doctor form payload.
 * Adds the image file if present, otherwise sends image as a string URL.
 */
function buildDoctorFormData(form: Record<string, unknown>): FormData {
  const fd = new FormData()

  // Append text fields (skip image — handled separately)
  for (const [key, value] of Object.entries(form)) {
    if (key === 'image' || key === 'imagePreview') continue
    if (value !== null && value !== undefined) {
      // Arrays: send as key[] entries so PHP natively parses as array
      if (Array.isArray(value)) {
        value.forEach((v) => fd.append(`${key}[]`, v))
      }
      // Booleans: use "0"/"1" so PHP treats "false" string as falsy
      else if (typeof value === 'boolean') {
        fd.append(key, value ? '1' : '0')
      } else {
        fd.append(key, String(value))
      }
    }
  }

  // Handle image: if it's a File object, upload as file; otherwise send as URL string
  const image = form.image
  if (image instanceof File) {
    fd.append('image', image)
  } else if (typeof image === 'string' && image.trim()) {
    // Send existing URL string as the image field directly
    fd.append('image', image)
  }

  return fd
}

const DEPARTMENTS_PATH = '/admin/departments'

export const adminDoctorService = {
  getDepartments: async () => {
    const { data } = await apiClient.get(DEPARTMENTS_PATH)
    return data.data as string[]
  },
  getDoctors: async (params: GetDoctorsParams) => {
    const { data } = await apiClient.get(DOCTORS_PATH, { params })
    return data
  },
  getDoctor: async (id: number) => {
    const { data } = await apiClient.get(`${DOCTORS_PATH}/${id}`)
    return data
  },
  createDoctor: async (payload: Record<string, unknown>) => {
    const fd = buildDoctorFormData(payload)
    const { data } = await apiClient.post(DOCTORS_PATH, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },
  updateDoctor: async ({
    id,
    payload,
  }: {
    id: number
    payload: Record<string, unknown>
  }) => {
    const fd = buildDoctorFormData(payload)
    // Laravel's PUT method doesn't handle multipart well — use POST with _method=PUT
    fd.append('_method', 'PUT')
    const { data } = await apiClient.post(`${DOCTORS_PATH}/${id}`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },
  deleteDoctor: async (id: number) => {
    const { data } = await apiClient.delete(`${DOCTORS_PATH}/${id}`)
    return data
  },
}

const JOBS_PATH = '/admin/job-posts'

export const adminJobPostService = {
  getPosts: async (params: GetJobPostsParams) => {
    const { data } = await apiClient.get(JOBS_PATH, { params })
    return data
  },
  getPost: async (id: number) => {
    const { data } = await apiClient.get(`${JOBS_PATH}/${id}`)
    return data
  },
  createPost: async (payload: Record<string, unknown>) => {
    const { data } = await apiClient.post(JOBS_PATH, payload)
    return data
  },
  updatePost: async ({
    id,
    payload,
  }: {
    id: number
    payload: Record<string, unknown>
  }) => {
    const { data } = await apiClient.put(`${JOBS_PATH}/${id}`, payload)
    return data
  },
  deletePost: async (id: number) => {
    const { data } = await apiClient.delete(`${JOBS_PATH}/${id}`)
    return data
  },
}

const CAREER_APPS_PATH = '/admin/career-applications'

export const adminCareerApplicationService = {
  getApplications: async (params: GetCareerApplicationsParams) => {
    const { data } = await apiClient.get(CAREER_APPS_PATH, { params })
    return data
  },
  getApplication: async (id: number) => {
    const { data } = await apiClient.get(`${CAREER_APPS_PATH}/${id}`)
    return data
  },
  deleteApplication: async (id: number) => {
    const { data } = await apiClient.delete(`${CAREER_APPS_PATH}/${id}`)
    return data
  },
}
