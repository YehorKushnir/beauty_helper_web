import { ServiceStatus } from '@/entities/service/model/service-status.type'
import ServiceTable from '@/entities/service/ui/service-table'
import ServiceListView from '@/entities/service/ui/service-list-view'

interface Props {
  initPage: number
  initLimit: number
  initSearch: string
  initStatus?: ServiceStatus | 'ALL'
}

export default function ServiceView({ initPage, initLimit, initSearch, initStatus }: Props) {
  return (
    <div className="h-full flex flex-col flex-1">
      <div className="hidden md:flex flex-col flex-1 min-h-0 gap-4">
        <ServiceTable
          initPage={initPage}
          initLimit={initLimit}
          initSearch={initSearch}
          initStatus={initStatus}
        />
      </div>

      <div className="h-full flex md:hidden flex-col flex-1 min-h-0 gap-4">
        <ServiceListView initSearch={initSearch} initStatus={initStatus} />
      </div>
    </div>
  )
}
