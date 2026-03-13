'use client'

import { ServiceStatus } from '@/entities/service/model/service-status.type'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/shad-cn/tabs'
import { useServiceStore } from '@/entities/service/model/service-store'
import { useSearchParams } from 'next/navigation'

interface Props {
  initStatus?: ServiceStatus | 'ALL'
}

export default function ServiceStatusTabs({ initStatus }: Props) {
  const searchParams = useSearchParams()
  const status = useServiceStore((state) => state.status) ?? initStatus
  const setStatus = useServiceStore((state) => state.setStatus)
  const setPage = useServiceStore((state) => state.setPage)

  const handleStatusChange = (value: string) => {
    setStatus(value as ServiceStatus)
    setPage(1)
    const params = new URLSearchParams(searchParams.toString())
    params.set('status', value)
    params.set('page', '1')
    window.history.replaceState({}, '', `?${params.toString()}`)
  }

  return (
    <Tabs value={status} onValueChange={handleStatusChange}>
      <TabsList className={'w-full'}>
        <TabsTrigger value="ALL">All</TabsTrigger>
        <TabsTrigger value="ACTIVE">Active</TabsTrigger>
        <TabsTrigger value="ARCHIVED">Archived</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
