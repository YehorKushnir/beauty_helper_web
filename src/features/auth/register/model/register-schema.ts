import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: 'Name must be at least 2 characters' })
      .max(50, { message: 'Name must be at most 50 characters' }),
    email: z.email().trim(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(64, { message: 'Password must be at most 64 characters' })
      .regex(/[a-z]/, {
        message: 'Password must contain lowercase letter'
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain uppercase letter'
      })
      .regex(/[0-9]/, {
        message: 'Password must contain number'
      }),
    password_confirmation: z.string()
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation']
  })
