'use client'

import DataTable from '@/shared/ui/data-table'
import { clientTableColumns } from '@/entities/client/model/client-table-columns'
import { useQuery } from '@tanstack/react-query'
import { getClientForTable } from '@/entities/client/api/get-client-for-table'
import { useClientStore } from '@/entities/client/model/client-store'
import DataTablePagination from '@/shared/ui/data-table-pagination'
import TableSkeleton from '@/shared/ui/data-table-skeleton'

interface Props {
  initPage: number
  initLimit: number
}

export default function ClientTable({ initPage, initLimit }: Props) {
  const page = useClientStore((state) => state.page) ?? initPage
  const limit = useClientStore((state) => state.limit) ?? initLimit

  const { data, isFetching, status } = useQuery({
    queryKey: ['clients', { page, limit }],
    queryFn: ({ signal }) =>
      getClientForTable(
        {
          status: 'ACTIVE',
          page,
          limit
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
      <DataTable
        isFetching={isFetching}
        columns={clientTableColumns}
        data={data.items}
        total={data.total}
        pages={data.pages}
        page={page ?? initPage}
        limit={limit ?? initLimit}
      />
      <DataTablePagination
        pages={data.pages}
        total={data.total}
        initPage={initPage}
        initLimit={initLimit}
      />
    </div>
  )
}
