'use client'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/shared/ui/shad-cn/drawer'
import { Button } from '@/shared/ui/shad-cn/button'
import ClientCreateUpdateFrom from '@/entities/client/ui/client-create-update-from'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { clientSchema } from '@/entities/client/model/client-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useClientMutations } from '@/entities/client/model/use-client-mutations'
import { z } from 'zod'
import { useClientStore } from '@/entities/client/model/client-store'

export default function ClientUpdateDrawer() {
  const open = useClientStore((state) => state.editing)
  const setOpen = useClientStore((state) => state.setEditing)
  const payload = useClientStore((state) => state.editPayload)

  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      phone: '',
      description: ''
    }
  })

  useEffect(() => {
    if (!payload) return

    form.reset({
      name: payload.name,
      phone: payload.phone,
      description: payload.description
    })
  }, [payload])

  const mutation = useClientMutations().update

  const onSubmit = async (data: z.infer<typeof clientSchema>) => {
    if (payload?.id) {
      mutation.mutate(
        { id: payload.id, data },
        {
          onSuccess: () => {
            setOpen(false)
            form.reset()
          }
        }
      )
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent aria-describedby={undefined}>
        <DrawerHeader>
          <DrawerTitle>Editing</DrawerTitle>
        </DrawerHeader>
        <div className={'flex flex-col gap-4 p-4'}>
          <ClientCreateUpdateFrom form={form} onSubmit={onSubmit} mutation={mutation} />
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
