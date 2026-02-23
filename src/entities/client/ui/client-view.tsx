'use client'

import { ClientStatus } from '@/entities/client/model/client-status.type'
import ClientTable from '@/entities/client/ui/client-table'
import ClientListView from '@/entities/client/ui/client-list-view'

interface Props {
  initPage: number
  initLimit: number
  initSearch: string
  initStatus?: ClientStatus | 'ALL'
}

export default function ClientView({ initPage, initLimit, initSearch, initStatus }: Props) {
  return (
    <div className="h-full flex flex-col flex-1">
      <div className="hidden md:flex flex-col flex-1 min-h-0 gap-4">
        <ClientTable
          initPage={initPage}
          initLimit={initLimit}
          initSearch={initSearch}
          initStatus={initStatus}
        />
      </div>

      <div className="h-full flex md:hidden flex-col flex-1 min-h-0 gap-4">
        <ClientListView initSearch={initSearch} initStatus={initStatus} />
      </div>
    </div>
  )
}
