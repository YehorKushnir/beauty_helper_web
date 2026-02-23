'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui/shad-cn/dialog'
import { Button } from '@/shared/ui/shad-cn/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientSchema } from '@/entities/client/model/client-schema'
import { z } from 'zod'
import { useState } from 'react'
import { useClientMutations } from '@/entities/client/model/use-client-mutations'
import ClientCreateUpdateFrom from '@/entities/client/ui/client-create-update-from'

export default function ClientCreateDialog() {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add a client</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add a new client</DialogTitle>
        </DialogHeader>
        <ClientCreateUpdateFrom form={form} onSubmit={onSubmit} mutation={mutation} />
      </DialogContent>
    </Dialog>
  )
}
