import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'

export async function unbanClient(id: string) {
  try {
    await $api.patch(`/client/unban/${id}`)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
