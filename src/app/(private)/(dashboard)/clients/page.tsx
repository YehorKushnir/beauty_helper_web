import { HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { dehydrate } from '@tanstack/query-core'
import { getServerClientForTable } from '@/entities/client/api/get-server-client-for-table'
import ClientTable from '@/entities/client/ui/client-table'
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientTable initPage={page} initLimit={limit} initSearch={search} initStatus={status} />
    </HydrationBoundary>
  )
}
