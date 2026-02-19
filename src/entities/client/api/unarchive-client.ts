import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'

export async function unarchiveClient(id: string) {
  try {
    await $api.patch(`/client/unarchive/${id}`)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
