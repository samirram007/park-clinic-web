import { z } from 'zod'

export const contactMessageSchema = z.object({
  id: z.number(),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(3, 'Message must be at least 3 characters'),
  readAt: z.string().nullable(),
  replyMessage: z.string().nullable().optional(),
  replyAt: z.string().nullable().optional(),
  isImportant: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type ContactMessage = z.infer<typeof contactMessageSchema>

export const getMessagesParamsSchema = z.object({
  page: z.coerce.number().optional(),
  per_page: z.coerce.number().optional(),
  search: z.string().optional(),
  status: z.enum(['read', 'unread', 'all']).optional(),
  important: z.coerce.boolean().optional(),
})
export type GetMessagesParams = z.infer<typeof getMessagesParamsSchema>

export const getDoctorsParamsSchema = z.object({
  page: z.coerce.number().optional(),
  per_page: z.coerce.number().optional(),
  type: z.string().optional(),
  status: z.enum(['active', 'inactive', 'all']).optional(),
  search: z.string().optional(),
  sort_by: z.enum(['name', 'type', 'is_active']).optional(),
  sort_order: z.enum(['asc', 'desc']).optional(),
})
export type GetDoctorsParams = z.infer<typeof getDoctorsParamsSchema>

export const jobPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  is_active: z.boolean().default(true),
  apply_duration: z.string().nullable(),
  applications_count: z.number().optional().default(0),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
})
export type JobPost = z.infer<typeof jobPostSchema>

export const jobPostFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  is_active: z.boolean().optional().default(true),
  apply_duration: z.string().optional().default(''),
})
export type JobPostFormData = z.infer<typeof jobPostFormSchema>

export const getJobPostsParamsSchema = z.object({
  page: z.coerce.number().optional(),
  per_page: z.coerce.number().optional(),
  status: z.enum(['active', 'inactive', 'expired', 'all']).optional(),
  search: z.string().optional(),
})
export type GetJobPostsParams = z.infer<typeof getJobPostsParamsSchema>

export const careerApplicationSchema = z.object({
  id: z.number(),
  full_name: z.string(),
  email: z.string(),
  phone: z.string(),
  position: z.string(),
  message: z.string().nullable(),
  resume_path: z.string(),
  resume_url: z.string().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
})
export type CareerApplication = z.infer<typeof careerApplicationSchema>

export const getCareerApplicationsParamsSchema = z.object({
  page: z.coerce.number().optional(),
  per_page: z.coerce.number().optional(),
  search: z.string().optional(),
})
export type GetCareerApplicationsParams = z.infer<
  typeof getCareerApplicationsParamsSchema
>
