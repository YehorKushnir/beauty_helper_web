import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'

export async function scheduleAppointment(id: string) {
  try {
    await $api.patch(`/appointment/schedule/${id}`)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
