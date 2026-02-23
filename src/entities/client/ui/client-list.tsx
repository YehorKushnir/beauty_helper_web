'use client'

import { Item, ItemActions, ItemContent, ItemGroup, ItemTitle } from '@/shared/ui/shad-cn/item'
import { Skeleton } from '@/shared/ui/shad-cn/skeleton'
import { ClientTableItem } from '@/entities/client/model/client.type'
import { RefObject } from 'react'
import { useDelayedLoading } from '@/shared/lib/hooks/useDelayedLoading'
import ClientActionsCell from '@/entities/client/ui/client-action-cell'
import { ClientStatus } from '@/entities/client/model/client-status.type'
import { useClientMutations } from '@/entities/client/model/use-client-mutations'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/shared/ui/shad-cn/empty'
import { Users } from 'lucide-react'

interface Props {
  clients: ClientTableItem[]
  queryStatus: 'error' | 'success' | 'pending'
  isFetching: boolean
  isPending: boolean
  isFetchingNextPage: boolean
  scrollRef: RefObject<HTMLDivElement | null>
  loadMoreRef: RefObject<HTMLDivElement | null>
}

export default function ClientList({
  clients,
  queryStatus,
  isFetching,
  isPending,
  isFetchingNextPage,
  scrollRef,
  loadMoreRef
}: Props) {
  const delayedLoading = useDelayedLoading(isFetching, 300)
  const mutations = useClientMutations()

  if (delayedLoading || isPending) {
    return (
      <div className="flex gap-3 flex-col">
        <Skeleton className={'w-full h-15 rounded-lg'}></Skeleton>
        <Skeleton className={'w-full h-15 rounded-lg'}></Skeleton>
        <Skeleton className={'w-full h-15 rounded-lg'}></Skeleton>
      </div>
    )
  }

  if (queryStatus === 'error') {
    return 'Error'
  }

  return (
    <ItemGroup
      className="h-full w-full flex flex-col gap-2.5 overflow-y-auto min-h-0"
      ref={scrollRef}>
      {clients.map((item) => (
        <Item key={item.id} variant="outline" size="sm">
          <ItemContent>
            <ItemTitle>
              {item.name} <div className={'font-normal'}>{item.phone}</div>
            </ItemTitle>
          </ItemContent>
          <ItemActions>
            <ClientActionsCell
              id={item.id}
              name={item.name}
              phone={item.phone}
              description={item.description}
              status={item.status as Exclude<ClientStatus, 'DELETED'>}
              mutations={mutations}
            />
          </ItemActions>
        </Item>
      ))}
      {isFetchingNextPage && <Skeleton className="min-h-15 h-15 w-full" />}
      <div ref={loadMoreRef} />
      {clients.length === 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Users />
            </EmptyMedia>
            <EmptyTitle>Nothing here yet</EmptyTitle>
            <EmptyDescription>Items you add will appear here.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </ItemGroup>
  )
}
