'use client'

import { AppointmentStatus } from '@/entities/appointment/model/appointment.type'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/shad-cn/tabs'
import { useAppointmentStore } from '@/entities/appointment/model/appointment-store'
import { useSearchParams } from 'next/navigation'

interface Props {
  initStatus?: AppointmentStatus | 'ALL'
}

export default function AppointmentStatusTabs({ initStatus }: Props) {
  const searchParams = useSearchParams()
  const status = useAppointmentStore((state) => state.status) ?? initStatus
  const setStatus = useAppointmentStore((state) => state.setStatus)

  const handleStatusChange = (value: string) => {
    setStatus(value as AppointmentStatus)
    const params = new URLSearchParams(searchParams.toString())
    params.set('status', value)
    window.history.replaceState({}, '', `?${params.toString()}`)
  }

  return (
    <Tabs value={status} onValueChange={handleStatusChange}>
      <TabsList className={'w-full'}>
        <TabsTrigger value="ALL">All</TabsTrigger>
        <TabsTrigger value="SCHEDULED">Scheduled</TabsTrigger>
        <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
        <TabsTrigger value="CANCELLED">Cancelled</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
