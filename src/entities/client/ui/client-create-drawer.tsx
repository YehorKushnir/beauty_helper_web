'use client'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/shared/ui/shad-cn/drawer'
import { Button } from '@/shared/ui/shad-cn/button'
import { Plus } from 'lucide-react'
import ClientCreateUpdateFrom from '@/entities/client/ui/client-create-update-from'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { clientSchema } from '@/entities/client/model/client-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useClientMutations } from '@/entities/client/model/use-client-mutations'
import { z } from 'zod'

export default function ClientCreateDrawer() {
  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      phone: '',
      description: ''
    }
  })

  const mutation = useClientMutations().create

  const onSubmit = async (data: z.infer<typeof clientSchema>) => {
    mutation.mutate(data, {
      onSuccess: () => {
        setOpen(false)
        form.reset()
      }
    })
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size={'icon'}>
          <Plus />
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        <DrawerHeader>
          <DrawerTitle>Add a new client</DrawerTitle>
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
