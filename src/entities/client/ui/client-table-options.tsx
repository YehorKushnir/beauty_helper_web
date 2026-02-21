import ClientCreateDialog from '@/entities/client/ui/client-create-dialog'
import ClientSearch from '@/entities/client/ui/client-search'

interface Props {
  initSearch: string
}

export default function ClientTableOptions({ initSearch }: Props) {
  return (
    <div className={'flex items-center justify-between'}>
      <ClientCreateDialog />
      <ClientSearch initSearch={initSearch} />
    </div>
  )
}
