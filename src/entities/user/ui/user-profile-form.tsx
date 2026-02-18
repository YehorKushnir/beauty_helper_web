'use client'

import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/shad-cn/field'
import { Input } from '@/shared/ui/shad-cn/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shad-cn/avatar'
import { AspectRatio } from '@/shared/ui/shad-cn/aspect-ratio'
import LoadingButton from '@/shared/ui/loading-button'
import { ChangeEvent, use } from 'react'
import { User } from '@/entities/user/model/types'
import { useUserStore } from '@/shared/model/user/model/store'
import { updateAvatar } from '@/entities/user/api/update-avatar'
import { updateName } from '@/entities/user/api/update-name'
import { getUserAvatarUrl } from '@/shared/lib/get-user-avatar-url'

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be at most 50 characters' })
})

interface Props {
  userPromise: Promise<User>
}

export default function UserProfileForm({ userPromise }: Props) {
  const user = useUserStore((store) => store.user) ?? use(userPromise)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await updateName(data.name)
  }

  const uploadImage = async (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    await updateAvatar(formData)
  }

  return (
    <div className="flex gap-8 flex-col sm:flex-row">
      <Field className={'sm:max-w-56'}>
        <FieldLabel htmlFor={'file'} className={'cursor-pointer'}>
          <AspectRatio ratio={1} className="w-full rounded-lg">
            <Avatar className={'w-full h-full rounded-lg'}>
              <AvatarImage src={getUserAvatarUrl(user.avatarUrl)} alt={user.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
          </AspectRatio>
        </FieldLabel>
        <Input
          id={'file'}
          type="file"
          hidden={true}
          name={'file'}
          accept="image/*"
          onChange={uploadImage}
        />
      </Field>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'flex-1 min-w-60'}>
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
                  placeholder="Your name"
                  required
                  autoComplete="name"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Field aria-disabled={true}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              value={user.email}
              disabled={true}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              autoComplete="email"
            />
          </Field>
          <Field className={'w-fit self-end'}>
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Update
            </LoadingButton>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
