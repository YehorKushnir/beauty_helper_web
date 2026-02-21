import { clientTableColumns } from '@/entities/client/model/client-table-columns'
import TableSkeleton from '@/shared/ui/data-table-skeleton'

export default function Loading() {
  return <TableSkeleton columns={clientTableColumns.length} />
}
