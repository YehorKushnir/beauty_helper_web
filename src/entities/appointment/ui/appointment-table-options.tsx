'use client'

import { useIsMobile } from '@/shared/lib/hooks/use-mobile'
import AppointmentStatusTabs from '@/entities/appointment/ui/appointment-status-tabs'
import { AppointmentStatus } from '@/entities/appointment/model/appointment.type'

interface Props {
  initStatus?: AppointmentStatus | 'ALL'
}

export default function AppointmentTableOptions({ initStatus }: Props) {
  const isMobile = useIsMobile()

  return (
    <div className={'flex items-center justify-between gap-2'}>
      <div className={'w-full flex items-center gap-2'}>
        <AppointmentStatusTabs initStatus={initStatus} />
      </div>
      {!isMobile && (
        <>
          {/*<ClientCreateDialog />
          <ClientUpdateDialog />*/}
        </>
      )}
    </div>
  )
}
