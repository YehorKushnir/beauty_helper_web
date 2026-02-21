import { ColumnDef } from '@tanstack/table-core'
import { ClientTableItem } from '@/entities/client/model/client.type'
import { formatDateTime } from '@/shared/lib/format-date'

export const clientTableColumns: ColumnDef<ClientTableItem>[] = [
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
  }
]
