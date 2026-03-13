import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'
import { GetAppointmentForCalendarDto } from '@/entities/appointment/model/get-appointment-for-calendar-dto.type'
import { Appointment } from '@/entities/appointment/model/appointment.type'
import qs from 'qs'

export async function getAppointmentForCalendar(dto: GetAppointmentForCalendarDto) {
  try {
    const query = qs.stringify(dto, { skipNulls: true })
    return (await $api.get<Appointment[]>(`/appointment/calendar?${query}`)).data
  } catch (e) {
    showToastError(e)
    throw e
  }
}
