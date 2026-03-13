'use client'

import { getServiceColumns } from '@/entities/service/model/service-table-columns'
import { useServiceMutations } from '@/entities/service/model/use-service-mutations'
import { useServiceStore } from '@/entities/service/model/service-store'
import { useQuery } from '@tanstack/react-query'
import { getServiceForTable } from '@/entities/service/api/get-service-for-table'
import { ServiceStatus } from '@/entities/service/model/service-status.type'
import TableSkeleton from '@/shared/ui/data-table-skeleton'
import ServiceTableOptions from '@/entities/service/ui/service-table-options'
import DataTable from '@/shared/ui/data-table'
import ServiceTablePagination from '@/entities/service/ui/service-table-pagination'
import { useIsMobile } from '@/shared/lib/hooks/use-mobile'

interface Props {
  initPage: number
  initLimit: number
  initSearch: string
  initStatus?: ServiceStatus | 'ALL'
}

export default function ServiceTable({ initPage, initLimit, initSearch, initStatus }: Props) {
  const isMobile = useIsMobile()
  const mutations = useServiceMutations()
  const page = useServiceStore((state) => state.page) ?? initPage
  const limit = useServiceStore((state) => state.limit) ?? initLimit
  const status = useServiceStore((state) => state.status) ?? initStatus
  const search = useServiceStore((state) => state.search) ?? initSearch

  const {
    data,
    isFetching,
    status: queryStatus
  } = useQuery({
    queryKey: ['services', { page, limit, search, status }],
    queryFn: ({ signal }) =>
      getServiceForTable(
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
    mutations.delete.isPending

  if (queryStatus === 'pending') {
    return <TableSkeleton rows={initLimit} columns={6} />
  }

  if (queryStatus === 'error') {
    return 'Error'
  }

  return (
    <>
      <ServiceTableOptions initSearch={initSearch} initStatus={initStatus} />
      <DataTable
        isFetching={isAnyPending}
        columns={getServiceColumns(mutations)}
        data={data.items}
        total={data.total}
        pages={data.pages}
        page={page ?? initPage}
        limit={limit ?? initLimit}
      />
      <ServiceTablePagination
        pages={data.pages}
        total={data.total}
        initPage={initPage}
        initLimit={initLimit}
      />
    </>
  )
}
