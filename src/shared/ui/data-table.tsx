'use client'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shared/ui/shad-cn/table'

interface DataTableProps<TData, TValue> {
  isFetching: boolean
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  total: number
  page: number
  pages: number
  limit: number
}

import { useEffect, useState } from 'react'

function useDelayedLoading(isLoading: boolean, delay = 300) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setShow(false)
      return
    }

    const timer = setTimeout(() => {
      setShow(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [isLoading, delay])

  return show
}

export default function DataTable<TData, TValue>({
  isFetching,
  columns,
  data,
  total,
  page,
  pages,
  limit
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: pages ?? -1,
    rowCount: total,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: limit
      }
    }
  })

  const delayedLoading = useDelayedLoading(isFetching, 300)

  return (
    <div className="flex-1 overflow-hidden rounded-md border relative">
      <div className="h-full overflow-y-auto">
        <Table className={'h-full overflow-visible!'}>
          <TableHeader className={'sticky top-0 z-10 bg-background shadow-2xs'}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} style={{ width: header.getSize() }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className="truncate overflow-hidden whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {delayedLoading && (
        <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
          <div className="absolute top-10 h-0.5 w-full bg-primary animate-pulse" />
        </div>
      )}
    </div>
  )
}
