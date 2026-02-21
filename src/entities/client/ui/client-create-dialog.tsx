'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui/shad-cn/dialog'
import { Button } from '@/shared/ui/shad-cn/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/shad-cn/field'
import { Input } from '@/shared/ui/shad-cn/input'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientSchema } from '@/entities/client/model/client-schema'
import { createClient } from '@/entities/client/api/create-client'
import { Textarea } from '@/shared/ui/shad-cn/textarea'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { useState } from 'react'
import LoadingButton from '@/shared/ui/loading-button'

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

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof clientSchema>) => createClient(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['clients'] })
      setOpen(false)
    }
  })

  const onSubmit = async (data: z.infer<typeof clientSchema>) => {
    mutation.mutate(data)
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <FieldGroup>
            <Controller
              name={'name'}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="name"
                    type="text"
                    placeholder="Client name"
                    required
                    autoComplete="name"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name={'phone'}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="phone"
                    type="tel"
                    placeholder="+1 (234) 456-7890"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name={'description'}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="description"
                    placeholder="Notes about the client..."
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <LoadingButton type="submit" loading={mutation.isPending}>
              Create
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
