import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAppointment } from '@/entities/appointment/api/create-appointment'
import { completeAppointment } from '@/entities/appointment/api/complete-appointment'
import { cancelAppointment } from '@/entities/appointment/api/cancel-appointment'
import { scheduleAppointment } from '@/entities/appointment/api/schedule-appointment'
import { deleteAppointment } from '@/entities/appointment/api/delete-appointment'
import { appointmentSchema } from '@/entities/appointment/model/appointment-schema'
import { updateAppointment } from '@/entities/appointment/api/update-appointment'
import { z } from 'zod'

export const useAppointmentMutations = () => {
	const queryClient = useQueryClient()

	const invalidate = async () =>
		await queryClient.invalidateQueries({ queryKey: ['appointments'] })

	return {
		create: useMutation({
			mutationFn: (data: z.infer<typeof appointmentSchema>) => createAppointment(data),
			onSuccess: async () => await invalidate()
		}),
		update: useMutation({
			mutationFn: ({ id, data }: { id: string; data: z.infer<typeof appointmentSchema> }) =>
				updateAppointment(id, data),
			onSuccess: async () => await invalidate()
		}),
		complete: useMutation({
			mutationFn: (id: string) => completeAppointment(id),
			onSuccess: async () => await invalidate()
		}),
		cancel: useMutation({
			mutationFn: (id: string) => cancelAppointment(id),
			onSuccess: async () => await invalidate()
		}),
		schedule: useMutation({
			mutationFn: (id: string) => scheduleAppointment(id),
			onSuccess: async () => await invalidate()
		}),
		delete: useMutation({
			mutationFn: (id: string) => deleteAppointment(id),
			onSuccess: async () => await invalidate()
		})
	}
}
