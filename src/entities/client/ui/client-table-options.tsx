import ClientCreateDialog from '@/entities/client/ui/client-create-dialog'
import ClientSearch from '@/entities/client/ui/client-search'
import ClientStatusTabs from '@/entities/client/ui/client-status-tabs'
import { ClientStatus } from '@/entities/client/model/client-status.type'

interface Props {
  initSearch: string
  initStatus?: ClientStatus | 'ALL'
}

export default function ClientTableOptions({ initSearch, initStatus }: Props) {
  return (
    <div className={'flex items-center justify-between gap-2'}>
      <div className={'w-full flex items-center gap-2'}>
        <ClientStatusTabs initStatus={initStatus} />
        <ClientSearch initSearch={initSearch} />
      </div>
      <ClientCreateDialog />
    </div>
  )
}
