import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'

export async function deleteService(id: string) {
  try {
    await $api.delete(`/Service/${id}`)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
