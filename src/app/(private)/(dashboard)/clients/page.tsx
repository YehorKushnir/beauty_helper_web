import { HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { dehydrate } from '@tanstack/query-core'
import { getServerClientForTable } from '@/entities/client/api/get-server-client-for-table'
import ClientTable from '@/entities/client/ui/client-table'

interface Props {
  searchParams: Promise<{
    page?: string
    limit?: string
  }>
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams
  const queryClient = new QueryClient()
  const page = Number(params.page ?? 1)
  const limit = Number(params.limit ?? 10)

  await queryClient.prefetchQuery({
    queryKey: ['clients', { page, limit }],
    queryFn: () =>
      getServerClientForTable({
        status: 'ACTIVE',
        page: page,
        limit: limit
      })
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientTable initPage={page} initLimit={limit} />
    </HydrationBoundary>
  )
}
