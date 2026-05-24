import z from "zod"

export const contactMessageSchema = z.object({
    id: z.number(),
    name: z.string().min(3),
    email: z.string(),
    subject: z.string().min(3),
    message: z.string().min(3),
    readAt: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),

})

export type ContactMessage = z.infer<typeof contactMessageSchema>