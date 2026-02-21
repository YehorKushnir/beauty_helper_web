import { getServerSessions } from '@/entities/session/api/get-server-sessions'
import { HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { dehydrate } from '@tanstack/query-core'
import SessionList from '@/entities/session/ui/session-list'

export default async function Page() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['sessions'],
    queryFn: getServerSessions
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SessionList />
    </HydrationBoundary>
  )
}
