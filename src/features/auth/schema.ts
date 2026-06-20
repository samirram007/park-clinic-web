import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
})
export type User = z.infer<typeof userSchema>

export const loginCredentialsSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})
export type LoginCredentials = z.infer<typeof loginCredentialsSchema>

export const loginResponseSchema = z.object({
  token: z.string(),
  tokenType: z.string(),
  success: z.boolean(),
  message: z.string(),
})
export type LoginResponse = z.infer<typeof loginResponseSchema>
