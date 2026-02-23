import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/shad-cn/field'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Input } from '@/shared/ui/shad-cn/input'
import { Textarea } from '@/shared/ui/shad-cn/textarea'
import { DialogClose, DialogFooter } from '@/shared/ui/shad-cn/dialog'
import { Button } from '@/shared/ui/shad-cn/button'
import LoadingButton from '@/shared/ui/loading-button'
import { z } from 'zod'
import { clientSchema } from '@/entities/client/model/client-schema'
import { UseMutationResult } from '@tanstack/react-query'

interface Props {
  form: UseFormReturn<z.infer<typeof clientSchema>>
  onSubmit: (data: z.infer<typeof clientSchema>) => Promise<void>
  mutation: UseMutationResult<void, Error, any>
  isUpdate?: boolean
}

export default function ClientCreateUpdateFrom({
  form,
  onSubmit,
  mutation,
  isUpdate = false
}: Props) {
  return (
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
        <LoadingButton type="submit" loading={mutation.isPending}>
          {isUpdate ? 'Save' : 'Create'}
        </LoadingButton>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </form>
  )
}
