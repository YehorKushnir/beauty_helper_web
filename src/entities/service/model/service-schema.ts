import { z } from 'zod'

export const serviceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be at most 50 characters' }),
  description: z
    .string()
    .trim()
    .max(500, { message: 'Description must be at most 500 characters' }),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: 'Price must be a valid decimal with max 2 decimal places'
  }),
  durationMin: z.coerce.number().max(720, { message: 'Duration must be at most 12 hours' })
})

export type ServiceSchemaInput = z.input<typeof serviceSchema>
export type ServiceSchemaOutput = z.output<typeof serviceSchema>
