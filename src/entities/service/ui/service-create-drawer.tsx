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
import ServiceCreateUpdateFrom from '@/entities/service/ui/service-create-update-from'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { serviceSchema } from '@/entities/service/model/service-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useServiceMutations } from '@/entities/service/model/use-service-mutations'
import { ServiceSchemaInput, ServiceSchemaOutput } from '@/entities/service/model/service-schema'

export default function ServiceCreateDrawer() {
  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<ServiceSchemaInput, any, ServiceSchemaOutput>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      price: '',
      durationMin: '',
      description: ''
    }
  })

  const mutation = useServiceMutations().create

  const onSubmit = async (data: ServiceSchemaOutput) => {
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
          <DrawerTitle>Add a new service</DrawerTitle>
        </DrawerHeader>
        <div className={'flex flex-col gap-4 p-4'}>
          <ServiceCreateUpdateFrom form={form} onSubmit={onSubmit} mutation={mutation} />
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
