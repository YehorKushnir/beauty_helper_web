'use client'

import { ClientStatus } from '@/entities/client/model/client-status.type'
import { useClientMutations } from '@/entities/client/model/use-client-mutations'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/ui/shad-cn/dropdown-menu'
import { Button } from '@/shared/ui/shad-cn/button'
import {
  Archive,
  ArchiveRestore,
  Eraser,
  MoreHorizontal,
  PencilLine,
  ShieldCheck,
  ShieldX,
  Trash
} from 'lucide-react'
import { ClientTableItem } from '@/entities/client/model/client.type'
import { Row } from '@tanstack/table-core'
import { UseMutationResult } from '@tanstack/react-query'
import { useClientStore } from '@/entities/client/model/client-store'

interface Props {
  row: Row<ClientTableItem>
  mutations: ReturnType<typeof useClientMutations>
}

export default function ClientActionsCell({ row, mutations }: Props) {
  const status = row.original.status as Exclude<ClientStatus, 'DELETED'>
  const id = row.original.id
  const [open, setOpen] = useState(false)
  const setEditing = useClientStore((state) => state.setEditing)

  const mutate = (mutation: UseMutationResult<void, Error, string>) => {
    mutation.mutate(id)
  }

  const actionsByStatus = {
    ACTIVE: [
      { label: 'Archive', icon: <Archive />, mutation: mutations.archive },
      { label: 'Ban', icon: <ShieldX />, mutation: mutations.ban },
      { label: 'Remove Data', icon: <Eraser />, mutation: mutations.removeData }
    ],
    BANNED: [
      { label: 'Archive', icon: <Archive />, mutation: mutations.archive },
      { label: 'Unban', icon: <ShieldCheck />, mutation: mutations.unban },
      { label: 'Remove Data', icon: <Eraser />, mutation: mutations.removeData }
    ],
    ARCHIVED: [
      { label: 'Unarchive', icon: <ArchiveRestore />, mutation: mutations.unarchive },
      { label: 'Ban', icon: <ShieldX />, mutation: mutations.ban },
      { label: 'Remove Data', icon: <Eraser />, mutation: mutations.removeData }
    ]
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
              name: row.original.name,
              phone: row.original.phone ?? '',
              description: row.original.description ?? ''
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
