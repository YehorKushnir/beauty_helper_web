import { AppointmentStatus } from '@/entities/appointment/model/appointment.type'
import AppointmentTableOptions from '@/entities/appointment/ui/appointment-table-options'

interface Props {
  initStatus?: AppointmentStatus | 'ALL'
}

export default function AppointmentView({ initStatus }: Props) {
  return (
    <div className="h-full flex flex-col flex-1">
      <AppointmentTableOptions initStatus={initStatus} />
    </div>
  )
}
