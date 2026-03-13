import { create } from 'zustand'
import { AppointmentStatus } from '@/entities/appointment/model/appointment.type'
import { AppointmentCreateUpdateDto } from '@/entities/appointment/model/appointment-create-update-dto.type'

function getInitialPagination() {
  if (typeof window === 'undefined') {
    return {
      startAt: null,
      endAt: null,
      status: undefined,
      paymentStatus: undefined,
      client: undefined
    }
  }

  const params = new URLSearchParams(window.location.search)

  return {
    startAt: params.get('startAt') ?? null,
    endAt: params.get('endAt') ?? null,
    status: (params.get('status') as AppointmentStatus) ?? undefined,
    paymentStatus: (params.get('paymentStatus') as AppointmentStatus) ?? undefined,
    client: params.get('client') ?? undefined
  }
}

interface AppointmentStore {
  startAt: string | null
  endAt: string | null
  status?: AppointmentStatus | 'ALL'
  paymentStatus?: AppointmentStatus | 'ALL'
  client?: string | null
  editing: boolean
  editPayload: AppointmentCreateUpdateDto | null
  setStartAt: (value: string | null) => void
  setEndAt: (value: string | null) => void
  setStatus: (value: AppointmentStatus | 'ALL') => void
  setPaymentStatus: (value: AppointmentStatus | 'ALL') => void
  setClient: (value: string | null) => void
  setEditing: (value: boolean, payload?: AppointmentCreateUpdateDto) => void
}

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  startAt: getInitialPagination().startAt,
  endAt: getInitialPagination().endAt,
  status: getInitialPagination().status,
  paymentStatus: getInitialPagination().paymentStatus,
  client: getInitialPagination().client,
  editing: false,
  editPayload: null,
  setStartAt: (value) => set({ startAt: value }),
  setEndAt: (value) => set({ endAt: value }),
  setStatus: (value) => set({ status: value }),
  setPaymentStatus: (value) => set({ paymentStatus: value }),
  setClient: (value) => set({ client: value }),
  setEditing: (value, payload) => set({ editing: value, editPayload: payload ?? null })
}))
