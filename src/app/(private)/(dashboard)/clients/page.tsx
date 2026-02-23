import { HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { dehydrate } from '@tanstack/query-core'
import { getServerClientForTable } from '@/entities/client/api/get-server-client-for-table'
import ClientView from '@/entities/client/ui/client-view'
import { ClientStatus } from '@/entities/client/model/client-status.type'

interface Props {
  searchParams: Promise<{
    page?: string
    limit?: string
    search?: string
    status?: ClientStatus | 'ALL'
  }>
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams
  const queryClient = new QueryClient()
  const page = Number(params.page ?? 1)
  const limit = Number(params.limit ?? 10)
  const search = params.search ?? ''
  const status = params.status ?? 'ACTIVE'

  await queryClient.prefetchQuery({
    queryKey: ['clients', { page, limit, search, status }],
    queryFn: () =>
      getServerClientForTable({
        status: status === 'ALL' ? undefined : status,
        page,
        limit,
        search
      })
  })

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['clients', { search, status }],
    queryFn: ({ pageParam = 1 }) =>
      getServerClientForTable({
        status: status === 'ALL' ? undefined : status,
        page: pageParam,
        limit: 20,
        search
      }),
    initialPageParam: 1
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientView initPage={page} initLimit={limit} initSearch={search} initStatus={status} />
    </HydrationBoundary>
  )
}
