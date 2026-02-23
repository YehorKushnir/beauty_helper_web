import TableSkeleton from '@/shared/ui/data-table-skeleton'
import { Skeleton } from '@/shared/ui/shad-cn/skeleton'

export default function Loading() {
  return (
    <div className="h-full flex flex-col flex-1">
      <div className="hidden md:flex flex-col flex-1 min-h-0 gap-4">
        <TableSkeleton columns={6} />
      </div>

      <div className="h-full flex md:hidden flex-col flex-1 min-h-0 gap-4">
        <Skeleton className={'w-full h-8 rounded-lg'}></Skeleton>
        <div className="flex gap-2.5 flex-col">
          <Skeleton className={'w-full h-15 rounded-lg'}></Skeleton>
          <Skeleton className={'w-full h-15 rounded-lg'}></Skeleton>
          <Skeleton className={'w-full h-15 rounded-lg'}></Skeleton>
        </div>
      </div>
    </div>
  )
}
