'use client'

import { ServiceStatus } from '@/entities/service/model/service-status.type'
import { useServiceStore } from '@/entities/service/model/service-store'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getServiceForTable } from '@/entities/service/api/get-service-for-table'
import { useEffect, useRef } from 'react'
import ServiceSearch from '@/entities/service/ui/service-search'
import ServiceList from '@/entities/service/ui/service-list'
import { useIsMobile } from '@/shared/lib/hooks/use-mobile'
import ServiceCreateDrawer from '@/entities/service/ui/service-create-drawer'
import ServiceUpdateDrawer from '@/entities/service/ui/service-update-drawer'
import ServiceStatusTabs from '@/entities/service/ui/service-status-tabs'
import { Plus } from 'lucide-react'
import { Button } from '@/shared/ui/shad-cn/button'

interface Props {
	initSearch: string
	initStatus?: ServiceStatus | 'ALL'
}

export default function ServiceListView({ initSearch, initStatus }: Props) {
	const isMobile = useIsMobile()
	const status = useServiceStore((state) => state.status) ?? initStatus
	const search = useServiceStore((state) => state.search) ?? initSearch

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isFetching,
		isPending,
		status: queryStatus
	} = useInfiniteQuery({
		queryKey: ['services', { search, status }],
		queryFn: ({ pageParam = 1, signal }) =>
			getServiceForTable(
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

	const services = data?.pages.flatMap((page) => page.items) ?? []

	return (
		<div className="h-full flex flex-col gap-4 flex-1 min-h-0">
			<ServiceStatusTabs initStatus={initStatus} />
			<div className="flex gap-2">
				<ServiceSearch initSearch={initSearch} />
				{isMobile ? (
					<>
						<ServiceCreateDrawer />
						<ServiceUpdateDrawer />
					</>
				) : (
					<Button size={'icon'}>
						<Plus />
					</Button>
				)}
			</div>
			<ServiceList
				services={services}
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
