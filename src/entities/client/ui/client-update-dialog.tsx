'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/shad-cn/dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientSchema } from '@/entities/client/model/client-schema'
import { z } from 'zod'
import { useClientMutations } from '@/entities/client/model/use-client-mutations'
import ClientCreateUpdateFrom from '@/entities/client/ui/client-create-update-from'
import { useClientStore } from '@/entities/client/model/client-store'
import { useEffect } from 'react'

export default function ClientUpdateDialog() {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Editing</DialogTitle>
        </DialogHeader>
        <ClientCreateUpdateFrom
          form={form}
          onSubmit={onSubmit}
          mutation={mutation}
          isUpdate={true}
        />
      </DialogContent>
    </Dialog>
  )
}
