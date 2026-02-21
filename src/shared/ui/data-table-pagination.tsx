'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/ui/shad-cn/select'
import { Button } from '@/shared/ui/shad-cn/button'
import { useSearchParams } from 'next/navigation'
import { useClientStore } from '@/entities/client/model/client-store'

interface DataTablePaginationProps {
  pages: number
  total: number
  initPage: number
  initLimit: number
}

export default function DataTablePagination({
  pages,
  total,
  initPage,
  initLimit
}: DataTablePaginationProps) {
  const page = useClientStore((state) => state.page) ?? initPage
  const limit = useClientStore((state) => state.limit) ?? initLimit
  const setPage = useClientStore((state) => state.setPage)
  const setLimit = useClientStore((state) => state.setLimit)
  const searchParams = useSearchParams()

  const nextPage = () => {
    if (page < pages) {
      setPage(page + 1)
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(page + 1))
      window.history.replaceState({}, '', `?${params.toString()}`)
    }
  }

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1)
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(page - 1))
      window.history.replaceState({}, '', `?${params.toString()}`)
    }
  }

  const handleLimit = (value: number) => {
    setLimit(value)
    setPage(1)
    const params = new URLSearchParams(searchParams.toString())
    params.set('limit', String(value))
    params.set('page', String(1))
    window.history.replaceState({}, '', `?${params.toString()}`)
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center text-sm font-medium">
        Page {page} of {pages} ({total})
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select value={`${limit}`} onValueChange={(value) => handleLimit(+value)}>
            <SelectTrigger className="h-8 w-18">
              <SelectValue placeholder={`${limit}`} />
            </SelectTrigger>
            <SelectContent side="top" position={'popper'}>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={prevPage} disabled={page <= 1}>
            <span className="sr-only">Go to previous page</span>
            Previous
          </Button>
          <Button variant="outline" onClick={nextPage} disabled={page >= pages}>
            <span className="sr-only">Go to next page</span>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
