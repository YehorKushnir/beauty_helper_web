import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'

export async function removeClientData(id: string) {
  try {
    await $api.patch(`/client/remove-data/${id}`)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
