import { z } from 'zod'

export const clientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be at most 50 characters' }),
  phone: z.string().trim(),
  description: z.string().trim().max(500, { message: 'Description must be at most 500 characters' })
})
