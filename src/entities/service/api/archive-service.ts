import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'

export async function archiveService(id: string) {
	try {
		await $api.patch(`/service/archive/${id}`)
	} catch (e) {
		showToastError(e)
		throw e
	}
}
