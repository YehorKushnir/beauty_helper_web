'use client'

import { Select, SelectTrigger, SelectValue } from '@/shared/ui/shad-cn/select'
import { Button } from '@/shared/ui/shad-cn/button'
import { Skeleton } from '@/shared/ui/shad-cn/skeleton'

interface TableSkeletonProps {
  rows?: number
  columns?: number
}

export default function TableSkeleton({ rows = 10, columns = 5 }: TableSkeletonProps) {
  return (
    <div className="w-full flex flex-col flex-1 min-h-0 gap-4">
      <div className="flex-1 w-full rounded-md border overflow-hidden">
        <div className="border-b bg-muted/40 px-4 py-3 flex items-center gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-ful rounded" />
          ))}
        </div>

        <div className="divide-y">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center px-4 py-2.5 gap-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-4 w-full rounded" />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center text-sm font-medium gap-2">
          Page <Skeleton className={'h-4 w-20 rounded'} />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select disabled={true}>
              <SelectTrigger className="h-8 w-18">
                <SelectValue placeholder={rows} />
              </SelectTrigger>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" disabled={true}>
              <span className="sr-only">Go to previous page</span>
              Previous
            </Button>
            <Button variant="outline" disabled={true}>
              <span className="sr-only">Go to next page</span>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
