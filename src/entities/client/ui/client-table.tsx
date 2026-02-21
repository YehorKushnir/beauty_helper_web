'use client'

import DataTable from '@/shared/ui/data-table'
import { clientTableColumns } from '@/entities/client/model/client-table-columns'
import { useQuery } from '@tanstack/react-query'
import { getClientForTable } from '@/entities/client/api/get-client-for-table'
import { useClientStore } from '@/entities/client/model/client-store'
import TableSkeleton from '@/shared/ui/data-table-skeleton'
import ClientTableOptions from '@/entities/client/ui/client-table-options'
import ClientTablePagination from '@/entities/client/ui/client-table-pagination'

interface Props {
  initPage: number
  initLimit: number
  initSearch: string
}

export default function ClientTable({ initPage, initLimit, initSearch }: Props) {
  const page = useClientStore((state) => state.page) ?? initPage
  const limit = useClientStore((state) => state.limit) ?? initLimit
  const storeSearch = useClientStore((state) => state.search)
  const search = storeSearch ? storeSearch : initSearch

  const { data, isFetching, status } = useQuery({
    queryKey: ['clients', { page, limit, search }],
    queryFn: ({ signal }) =>
      getClientForTable(
        {
          status: 'ACTIVE',
          page,
          limit,
          search
        },
        signal
      ),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev
  })

  if (status === 'pending') {
    return <TableSkeleton rows={initLimit} columns={clientTableColumns.length} />
  }

  if (status === 'error') {
    return 'Error'
  }

  return (
    <div className="w-full flex flex-col flex-1 min-h-0 gap-4">
      <ClientTableOptions initSearch={initSearch} />
      <DataTable
        isFetching={isFetching}
        columns={clientTableColumns}
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
