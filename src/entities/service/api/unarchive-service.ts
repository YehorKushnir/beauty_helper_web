import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'

export async function unarchiveService(id: string) {
  try {
    await $api.patch(`/service/unarchive/${id}`)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
