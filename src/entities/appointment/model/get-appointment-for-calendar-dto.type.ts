import { AppointmentStatus } from '@/entities/appointment/model/appointment.type'
import { PaymentStatus } from '@/entities/appointment/model/payment.type'

export type GetAppointmentForCalendarDto = {
  search?: string
  status?: AppointmentStatus
  paymentStatus?: PaymentStatus
  clientId?: string
  from?: Date
  to?: Date
}
