import { HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { dehydrate } from '@tanstack/react-query'
import { getServerServiceForTable } from '@/entities/service/api/get-server-service-for-table'
import ServiceView from '@/entities/service/ui/service-view'
import { ServiceStatus } from '@/entities/service/model/service-status.type'

interface Props {
  searchParams: Promise<{
    page?: string
    limit?: string
    search?: string
    status?: ServiceStatus | 'ALL'
  }>
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams
  const queryService = new QueryClient()
  const page = Number(params.page ?? 1)
  const limit = Number(params.limit ?? 10)
  const search = params.search ?? ''
  const status = params.status ?? 'ACTIVE'

  await queryService.prefetchQuery({
    queryKey: ['services', { page, limit, search, status }],
    queryFn: () =>
      getServerServiceForTable({
        status: status === 'ALL' ? undefined : status,
        page,
        limit,
        search
      })
  })

  await queryService.prefetchInfiniteQuery({
    queryKey: ['services', { search, status }],
    queryFn: ({ pageParam = 1 }) =>
      getServerServiceForTable({
        status: status === 'ALL' ? undefined : status,
        page: pageParam,
        limit: 20,
        search
      }),
    initialPageParam: 1
  })

  return (
    <HydrationBoundary state={dehydrate(queryService)}>
      <ServiceView initPage={page} initLimit={limit} initSearch={search} initStatus={status} />
    </HydrationBoundary>
  )
}
