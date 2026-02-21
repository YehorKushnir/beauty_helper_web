'use client'

import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/shad-cn/field'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/shared/ui/shad-cn/input'
import LoadingButton from '@/shared/ui/loading-button'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { updatePassword } from '@/entities/user/api/update-password'
import { useUserStore } from '@/shared/model/user/model/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSessions } from '@/entities/user/api/get-auth-methods'
import { PasswordDto } from '@/entities/user/model/password-dto'
import { Button } from '@/shared/ui/shad-cn/button'
import { ChevronsUpDown, KeyRound } from 'lucide-react'
import { useState } from 'react'
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/shared/ui/shad-cn/item'
import { removePassword } from '@/entities/user/api/remove-password'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/shared/ui/shad-cn/collapsible'

const formSchema = z
  .object({
    password: z.string().trim(),
    password_new: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(64, { message: 'Password must be at most 64 characters' })
      .regex(/[a-z]/, {
        message: 'Password must contain lowercase letter'
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain uppercase letter'
      })
      .regex(/[0-9]/, {
        message: 'Password must contain number'
      }),
    password_confirmation: z.string()
  })
  .refine((data) => data.password_new === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation']
  })

export default function UpdatePasswordForm() {
  const queryClient = useQueryClient()
  const user = useUserStore((state) => state.user)
  const [isOpen, setIsOpen] = useState(false)

  const { data } = useQuery({
    queryKey: ['authMethods'],
    queryFn: getSessions
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      password_new: '',
      password_confirmation: ''
    }
  })

  const updateMutation = useMutation({
    mutationFn: async (data: PasswordDto) => await updatePassword(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authMethods'] })
  })

  const removeMutation = useMutation({
    mutationFn: async () => await removePassword(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authMethods'] })
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    updateMutation.mutate(data)
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex w-full flex-col gap-2">
      <Item variant="outline" size={'sm'}>
        <ItemMedia variant={'default'}>
          <KeyRound />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Password</ItemTitle>
        </ItemContent>
        <ItemActions>
          <CollapsibleTrigger asChild>
            <Button variant="outline" size={'sm'}>
              {!isOpen ? 'Change password' : 'Hide'}
              <ChevronsUpDown />
            </Button>
          </CollapsibleTrigger>
        </ItemActions>
      </Item>
      <CollapsibleContent className="w-full flex flex-col gap-2">
        <div className="w-full rounded-md border p-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className={'w-full'}>
            <FieldGroup>
              <input name="username" autoComplete="username" defaultValue={user?.email} hidden />
              <Controller
                name={'password'}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} aria-disabled={!data?.hasPassword}>
                    <FieldLabel
                      htmlFor="password"
                      className="flex items-center"
                      aria-disabled={!data?.hasPassword}>
                      Old password
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline text-foreground">
                        Forgot your password?
                      </a>
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      aria-disabled={!data?.hasPassword}
                      id="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      disabled={!data?.hasPassword}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name={'password_new'}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password_new">New password</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="password_new"
                      type="password"
                      required
                      autoComplete="new-password"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name={'password_confirmation'}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password_confirmation">Confirm password</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="password_confirmation"
                      type="password"
                      required
                      autoComplete="new-password"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <div className={'self-end flex gap-2'}>
                {data?.hasPassword && (
                  <LoadingButton
                    type="button"
                    variant="destructive"
                    loading={removeMutation.isPending}
                    onClick={() => removeMutation.mutate()}>
                    Remove password
                  </LoadingButton>
                )}
                <LoadingButton type="submit" loading={updateMutation.isPending}>
                  Update
                </LoadingButton>
              </div>
            </FieldGroup>
          </form>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
