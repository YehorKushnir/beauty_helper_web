interface AppointmentItem {
  serviceId: string
  quantity: number
}

interface NewClientDto {
  name: string
  phone?: string
}

export interface AppointmentCreateUpdateDto {
  startAt: Date
  clientId?: string
  newClient?: NewClientDto
  items: AppointmentItem[]
}
