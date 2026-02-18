import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'

export async function removeSession(id: string) {
  try {
    await $api.delete(`/users/sessions/${id}`)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
