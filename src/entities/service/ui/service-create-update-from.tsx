import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/shad-cn/field'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Input } from '@/shared/ui/shad-cn/input'
import { Textarea } from '@/shared/ui/shad-cn/textarea'
import LoadingButton from '@/shared/ui/loading-button'
import { ServiceSchemaInput, ServiceSchemaOutput } from '@/entities/service/model/service-schema'
import { UseMutationResult } from '@tanstack/react-query'

interface Props {
  form: UseFormReturn<ServiceSchemaInput, any, ServiceSchemaOutput>
  onSubmit: (data: ServiceSchemaOutput) => Promise<void>
  mutation: UseMutationResult<void, Error, any>
  isUpdate?: boolean
}

export default function ServiceCreateUpdateFrom({
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
                placeholder="Service name"
                required
                autoComplete="name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name={'price'}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="price">Price</FieldLabel>
              <Input {...field} aria-invalid={fieldState.invalid} id="price" placeholder="Price" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name={'durationMin'}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="durationMin">Duration</FieldLabel>
              <Input
                {...field}
                value={typeof field.value === 'string' ? field.value : ''}
                aria-invalid={fieldState.invalid}
                id="durationMin"
                placeholder="Duration in minutes"
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
                placeholder="Notes about the service..."
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <LoadingButton type="submit" loading={mutation.isPending}>
        {isUpdate ? 'Save' : 'Create'}
      </LoadingButton>
    </form>
  )
}
