import { z } from 'zod'

export const contactPageData = z.object({
  name: z.string().min(3),
  email: z.string(),
  subject: z.string().min(3),
  message: z.string().min(3),
})

export type ContactPageData = z.infer<typeof contactPageData>
