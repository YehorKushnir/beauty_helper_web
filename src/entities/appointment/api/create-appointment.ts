import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'
import { AppointmentCreateUpdateDto } from '@/entities/appointment/model/appointment-create-update-dto.type'

export async function createAppointment(dto: AppointmentCreateUpdateDto) {
  try {
    await $api.post('/appointment', dto)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
