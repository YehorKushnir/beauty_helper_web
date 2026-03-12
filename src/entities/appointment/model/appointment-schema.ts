import { z } from 'zod'

export const appointmentSchema = z.object({
	startAt: z.date(),
	clientId: z.string().trim().optional(),
	newClient: z
		.object({
			name: z.string().trim(),
			phone: z.string().trim().optional(),
			description: z.string().trim().optional()
		})
		.optional(),
	items: z
		.array(
			z.object({
				serviceId: z.string().trim(),
				quantity: z.number().min(1)
			})
		)
		.min(1)
})
