import { ClientStatus } from '@/entities/client/model/client-status.type'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/shad-cn/tabs'
import { useClientStore } from '@/entities/client/model/client-store'
import { useSearchParams } from 'next/navigation'

interface Props {
  initStatus?: ClientStatus | 'ALL'
}

export default function ClientStatusTabs({ initStatus }: Props) {
  const searchParams = useSearchParams()
  const status = useClientStore((state) => state.status) ?? initStatus
  const setStatus = useClientStore((state) => state.setStatus)
  const setPage = useClientStore((state) => state.setPage)

  const handleStatusChange = (value: string) => {
    setStatus(value as ClientStatus)
    setPage(1)
    const params = new URLSearchParams(searchParams.toString())
    params.set('status', value)
    params.set('page', '1')
    window.history.replaceState({}, '', `?${params.toString()}`)
  }

  return (
    <Tabs value={status} onValueChange={handleStatusChange}>
      <TabsList>
        <TabsTrigger value="ALL">All</TabsTrigger>
        <TabsTrigger value="ACTIVE">Active</TabsTrigger>
        <TabsTrigger value="BANNED">Banned</TabsTrigger>
        <TabsTrigger value="ARCHIVED">Archived</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
