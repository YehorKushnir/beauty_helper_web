'use client'

import { ServiceStatus } from '@/entities/service/model/service-status.type'
import { useServiceMutations } from '@/entities/service/model/use-service-mutations'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/ui/shad-cn/dropdown-menu'
import { Button } from '@/shared/ui/shad-cn/button'
import { Archive, ArchiveRestore, MoreHorizontal, PencilLine, Trash } from 'lucide-react'
import { UseMutationResult } from '@tanstack/react-query'
import { useServiceStore } from '@/entities/service/model/service-store'

interface Props {
  id: string
  status: ServiceStatus
  name: string
  price: string
  durationMin: number
  description: string | null
  mutations: ReturnType<typeof useServiceMutations>
}

export default function ServiceActionsCell({
  id,
  status,
  name,
  price,
  durationMin,
  description,
  mutations
}: Props) {
  const [open, setOpen] = useState(false)
  const setEditing = useServiceStore((state) => state.setEditing)

  const mutate = (mutation: UseMutationResult<void, Error, string>) => {
    mutation.mutate(id)
  }

  const actionsByStatus = {
    ACTIVE: [{ label: 'Archive', icon: <Archive />, mutation: mutations.archive }],
    ARCHIVED: [{ label: 'Unarchive', icon: <ArchiveRestore />, mutation: mutations.unarchive }]
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() =>
            setEditing(true, {
              id,
              name: name,
              price: price,
              durationMin: durationMin,
              description: description ?? ''
            })
          }>
          <PencilLine />
          Edit
        </DropdownMenuItem>

        {actionsByStatus[status].map(({ label, icon, mutation }) => (
          <DropdownMenuItem key={label} onClick={() => mutate(mutation)}>
            {icon}
            {label}
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem variant={'destructive'} onClick={() => mutate(mutations.delete)}>
          <Trash />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
