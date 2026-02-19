import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'

export async function banClient(id: string) {
  try {
    await $api.patch(`/client/ban/${id}`)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
