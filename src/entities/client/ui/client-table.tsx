import { getClientColumns } from '@/entities/client/model/client-table-columns'
import { useClientMutations } from '@/entities/client/model/use-client-mutations'
import { useClientStore } from '@/entities/client/model/client-store'
import { useQuery } from '@tanstack/react-query'
import { getClientForTable } from '@/entities/client/api/get-client-for-table'
import { ClientStatus } from '@/entities/client/model/client-status.type'
import TableSkeleton from '@/shared/ui/data-table-skeleton'
import ClientTableOptions from '@/entities/client/ui/client-table-options'
import DataTable from '@/shared/ui/data-table'
import ClientTablePagination from '@/entities/client/ui/client-table-pagination'
import { useIsMobile } from '@/shared/lib/hooks/use-mobile'

interface Props {
  initPage: number
  initLimit: number
  initSearch: string
  initStatus?: ClientStatus | 'ALL'
}

export default function ClientTable({ initPage, initLimit, initSearch, initStatus }: Props) {
  const isMobile = useIsMobile()
  const mutations = useClientMutations()
  const page = useClientStore((state) => state.page) ?? initPage
  const limit = useClientStore((state) => state.limit) ?? initLimit
  const status = useClientStore((state) => state.status) ?? initStatus
  const search = useClientStore((state) => state.search) ?? initSearch

  const {
    data,
    isFetching,
    status: queryStatus
  } = useQuery({
    queryKey: ['clients', { page, limit, search, status }],
    queryFn: ({ signal }) =>
      getClientForTable(
        {
          status: status === 'ALL' ? undefined : status,
          page,
          limit,
          search
        },
        signal
      ),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
    enabled: !isMobile
  })

  const isAnyPending =
    isFetching ||
    mutations.archive.isPending ||
    mutations.unarchive.isPending ||
    mutations.ban.isPending ||
    mutations.unban.isPending ||
    mutations.removeData.isPending ||
    mutations.delete.isPending

  if (queryStatus === 'pending') {
    return <TableSkeleton rows={initLimit} columns={6} />
  }

  if (queryStatus === 'error') {
    return 'Error'
  }

  return (
    <>
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
    </>
  )
}
