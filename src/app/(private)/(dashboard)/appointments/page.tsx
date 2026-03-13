import AppointmentView from '@/entities/appointment/ui/appointment-view'
import { HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { dehydrate } from '@tanstack/react-query'
import { AppointmentStatus } from '@/entities/appointment/model/appointment.type'
import { PaymentStatus } from '@/entities/appointment/model/payment.type'

interface Props {
  searchParams: Promise<{
    startAt?: string
    endAt?: string
    status?: AppointmentStatus | 'ALL'
    paymentStatus?: PaymentStatus | 'ALL'
  }>
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams
  const queryService = new QueryClient()
  const startAt = params.startAt ?? ''
  const endAt = params.endAt ?? ''
  const status = params.status ?? 'SCHEDULED'
  const paymentStatus = params.paymentStatus ?? 'ALL'

  return (
    <HydrationBoundary state={dehydrate(queryService)}>
      <AppointmentView initStatus={status} />
    </HydrationBoundary>
  )
}
