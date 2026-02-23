import { ClientStatus } from '@/entities/client/model/client-status.type'
import { useClientStore } from '@/entities/client/model/client-store'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getClientForTable } from '@/entities/client/api/get-client-for-table'
import { useEffect, useRef } from 'react'
import ClientSearch from '@/entities/client/ui/client-search'
import ClientList from '@/entities/client/ui/client-list'
import { useIsMobile } from '@/shared/lib/hooks/use-mobile'
import ClientCreateDrawer from '@/entities/client/ui/client-create-drawer'
import ClientUpdateDrawer from '@/entities/client/ui/client-update-drawer'
import ClientStatusTabs from '@/entities/client/ui/client-status-tabs'
import { Plus } from 'lucide-react'
import { Button } from '@/shared/ui/shad-cn/button'

interface Props {
  initSearch: string
  initStatus?: ClientStatus | 'ALL'
}

export default function ClientListView({ initSearch, initStatus }: Props) {
  const isMobile = useIsMobile()
  const status = useClientStore((state) => state.status) ?? initStatus
  const search = useClientStore((state) => state.search) ?? initSearch

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isPending,
    status: queryStatus
  } = useInfiniteQuery({
    queryKey: ['clients', { search, status }],
    queryFn: ({ pageParam = 1, signal }) =>
      getClientForTable(
        {
          status: status === 'ALL' ? undefined : status,
          page: pageParam,
          limit: 20,
          search
        },
        signal
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined,
    placeholderData: (prev) => prev,
    staleTime: 60 * 1000,
    enabled: isMobile
  })

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!loadMoreRef.current || !scrollRef.current || !hasNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (hasNextPage && !isFetchingNextPage) {
            void fetchNextPage()
          }
        }
      },
      {
        root: scrollRef.current,
        rootMargin: '400px'
      }
    )

    observer.observe(loadMoreRef.current)

    return () => observer.disconnect()
  }, [hasNextPage, fetchNextPage, isFetchingNextPage])

  const clients = data?.pages.flatMap((page) => page.items) ?? []

  return (
    <div className="h-full flex flex-col gap-4 flex-1 min-h-0">
      <ClientStatusTabs initStatus={initStatus} />
      <div className="flex gap-2">
        <ClientSearch initSearch={initSearch} />
        {isMobile ? (
          <>
            <ClientCreateDrawer />
            <ClientUpdateDrawer />
          </>
        ) : (
          <Button size={'icon'}>
            <Plus />
          </Button>
        )}
      </div>
      <ClientList
        clients={clients}
        queryStatus={queryStatus}
        isFetching={isFetching}
        isPending={isPending}
        isFetchingNextPage={isFetchingNextPage}
        scrollRef={scrollRef}
        loadMoreRef={loadMoreRef}
      />
    </div>
  )
}
