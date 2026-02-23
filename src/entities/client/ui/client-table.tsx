'use client'

import DataTable from '@/shared/ui/data-table'
import { useQuery } from '@tanstack/react-query'
import { getClientForTable } from '@/entities/client/api/get-client-for-table'
import { useClientStore } from '@/entities/client/model/client-store'
import TableSkeleton from '@/shared/ui/data-table-skeleton'
import ClientTableOptions from '@/entities/client/ui/client-table-options'
import ClientTablePagination from '@/entities/client/ui/client-table-pagination'
import { ClientStatus } from '@/entities/client/model/client-status.type'
import { useClientMutations } from '@/entities/client/model/use-client-mutations'
import { getClientColumns } from '@/entities/client/model/client-table-columns'

interface Props {
  initPage: number
  initLimit: number
  initSearch: string
  initStatus?: ClientStatus | 'ALL'
}

export default function ClientTable({ initPage, initLimit, initSearch, initStatus }: Props) {
  const mutations = useClientMutations()
  const page = useClientStore((state) => state.page) ?? initPage
  const limit = useClientStore((state) => state.limit) ?? initLimit
  const clientStatus = useClientStore((state) => state.status) ?? initStatus
  const storeSearch = useClientStore((state) => state.search)
  const search = storeSearch ? storeSearch : initSearch

  const { data, isFetching, status } = useQuery({
    queryKey: ['clients', { page, limit, search, status: clientStatus }],
    queryFn: ({ signal }) =>
      getClientForTable(
        {
          status: clientStatus === 'ALL' ? undefined : clientStatus,
          page,
          limit,
          search
        },
        signal
      ),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev
  })

  const isAnyPending =
    isFetching ||
    mutations.archive.isPending ||
    mutations.unarchive.isPending ||
    mutations.ban.isPending ||
    mutations.unban.isPending ||
    mutations.removeData.isPending ||
    mutations.delete.isPending

  if (status === 'pending') {
    return <TableSkeleton rows={initLimit} columns={6} />
  }

  if (status === 'error') {
    return 'Error'
  }

  return (
    <div className="w-full flex flex-col flex-1 min-h-0 gap-4">
      <ClientTableOptions initSearch={initSearch} initStatus={initStatus} />
      <DataTable
        isFetching={isAnyPending}
        columns={getClientColumns(mutations)}
        data={data.items}
        total={data.total}
        pages={data.pages}
        page={page ?? initPage}
        limit={limit ?? initLimit}
      />
      <ClientTablePagination
        pages={data.pages}
        total={data.total}
        initPage={initPage}
        initLimit={initLimit}
      />
    </div>
  )
}
