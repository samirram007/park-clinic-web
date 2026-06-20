import { z } from 'zod'

export const doctorSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  title: z.string().nullable(),
  department: z.string().nullable(),
  rating: z.number().nullable(),
  image: z.string().nullable(),
  experience: z.string().nullable(),
  education: z.string().nullable(),
  schedule: z.string().nullable(),
  bio: z.string().nullable(),
  reviews: z.number().nullable(),
  type: z.array(z.enum(['consultant', 'outdoor'])).min(1, 'At least one type is required'),
  is_active: z.boolean().optional().default(true),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
})

export type Doctor = z.infer<typeof doctorSchema>

/** API returns `{ data: Doctor[] }` for the list endpoint */
export const doctorsListResponseSchema = z.object({
  data: z.array(doctorSchema),
})
export type DoctorsListResponse = z.infer<typeof doctorsListResponseSchema>

/** API returns `{ data: Doctor }` for the single endpoint */
export const doctorSingleResponseSchema = z.object({
  data: doctorSchema,
})
export type DoctorSingleResponse = z.infer<typeof doctorSingleResponseSchema>
