import { ColumnDef } from '@tanstack/table-core'
import { ClientTableItem } from '@/entities/client/model/client.type'
import { formatDateTime } from '@/shared/lib/format-date'
import ClientActionsCell from '@/entities/client/ui/client-action-cell'
import { useClientMutations } from '@/entities/client/model/use-client-mutations'
import { ClientStatus } from '@/entities/client/model/client-status.type'

export const getClientColumns = (
  mutations: ReturnType<typeof useClientMutations>
): ColumnDef<ClientTableItem>[] => [
  {
    accessorKey: 'name',
    header: 'Client',
    minSize: 200
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    minSize: 140,
    maxSize: 140
  },
  {
    accessorKey: 'description',
    header: 'Notes',
    minSize: 300
  },
  {
    accessorKey: 'status',
    header: 'Status',
    minSize: 100,
    maxSize: 100
  },
  {
    accessorKey: 'statusChangedAt',
    header: 'Status updated',
    minSize: 140,
    maxSize: 140,
    cell: (props) => formatDateTime(props.getValue<string>())
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    minSize: 140,
    maxSize: 140,
    cell: (props) => formatDateTime(props.getValue<string>())
  },
  {
    id: 'actions',
    minSize: 40,
    maxSize: 40,
    cell: ({ row }) => (
      <ClientActionsCell
        id={row.original.id}
        name={row.original.name}
        phone={row.original.phone}
        description={row.original.description}
        status={row.original.status as Exclude<ClientStatus, 'DELETED'>}
        mutations={mutations}
      />
    )
  }
]
