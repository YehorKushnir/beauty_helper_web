import { Payment } from '@/entities/appointment/model/payment.type'

export type AppointmentStatus = 'SCHEDULED' | 'CANCELLED' | 'COMPLETED'

interface AppointmentItem {
  id: string
  name: string
  price: string
  total: string
  quantity: number
}

export interface Appointment {
  id: string
  startAt: string
  endAt: string | null
  status: AppointmentStatus
  totalAmount: string | null
  clientId: string | null
  items: AppointmentItem[]
  payments: Payment[]
}
