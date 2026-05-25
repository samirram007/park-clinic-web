import z from "zod"

export const contactMessageSchema = z.object({
    id: z.number(),
    name: z.string().min(3),
    email: z.string(),
    subject: z.string().min(3),
    message: z.string().min(3),
    readAt: z.string().nullable(),
    replyMessage: z.string().nullable().optional(),
    replyAt: z.string().nullable().optional(),
    isImportant: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),

})

export type ContactMessage = z.infer<typeof contactMessageSchema>