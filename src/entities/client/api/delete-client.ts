import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'

export async function deleteClient(id: string) {
  try {
    await $api.delete(`/client/${id}`)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
