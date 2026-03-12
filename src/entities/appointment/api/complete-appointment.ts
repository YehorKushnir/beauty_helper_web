import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'

export async function completeAppointment(id: string) {
	try {
		await $api.patch(`/appointment/complete/${id}`)
	} catch (e) {
		showToastError(e)
		throw e
	}
}
