import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'

export async function deleteAppointment(id: string) {
  try {
    await $api.delete(`/appointment/${id}`)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
