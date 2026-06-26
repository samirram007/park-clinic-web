import { z } from 'zod'

export const doctorSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  title: z.string().nullable(),
  department: z.string().nullable(),
  rating: z.number().nullable(),
  image: z.string().nullable(),
  experience: z.string().nullable(),
  education: z.string().nullable(),
  schedule: z.string().nullable(),
  bio: z.string().nullable(),
  reviews: z.number().nullable(),
  type: z
    .array(z.enum(['consultant', 'outdoor']))
    .min(1, 'At least one type is required'),
  is_active: z.boolean().default(true),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
})

export type Doctor = z.infer<typeof doctorSchema>

export const doctorFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().optional().default(''),
  department: z.string().optional().default(''),
  rating: z.coerce.number().min(0).max(5).optional().nullable(),
  image: z
    .union([z.string(), z.instanceof(File)])
    .optional()
    .default(''),
  imagePreview: z.string().optional().default(''),
  experience: z.string().optional().default(''),
  education: z.string().optional().default(''),
  schedule: z.string().optional().default(''),
  consultantSchedule: z.string().optional().default(''),
  outdoorSchedule: z.string().optional().default(''),
  bio: z.string().optional().default(''),
  reviews: z.coerce.number().min(0).optional().nullable(),
  type: z
    .array(z.enum(['consultant', 'outdoor']))
    .min(1, 'At least one type is required'),
  is_active: z.boolean().optional().default(true),
})

export type DoctorFormData = z.infer<typeof doctorFormSchema>
