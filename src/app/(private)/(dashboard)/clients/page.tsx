import { HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { dehydrate } from '@tanstack/query-core'
import { getServerClientForTable } from '@/entities/client/api/get-server-client-for-table'
import ClientTable from '@/entities/client/ui/client-table'

interface Props {
  searchParams: Promise<{
    page?: string
    limit?: string
    search?: string
  }>
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams
  const queryClient = new QueryClient()
  const page = Number(params.page ?? 1)
  const limit = Number(params.limit ?? 10)
  const search = params.search ?? ''

  await queryClient.prefetchQuery({
    queryKey: ['clients', { page, limit, search }],
    queryFn: () =>
      getServerClientForTable({
        status: 'ACTIVE',
        page: page,
        limit: limit,
        search: search
      })
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientTable initPage={page} initLimit={limit} initSearch={search} />
    </HydrationBoundary>
  )
}
