import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  subject: z.string().min(1, { message: 'Please select a subject' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' }),
})

export type ContactFormData = z.infer<typeof contactSchema>
