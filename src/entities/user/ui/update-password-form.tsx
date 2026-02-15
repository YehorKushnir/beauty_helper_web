'use client'

import {Field, FieldError, FieldGroup, FieldLabel} from "@/shared/ui/shad-cn/field";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/shared/ui/shad-cn/input";
import LoadingButton from "@/shared/ui/loading-button";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {updatePassword} from "@/entities/user/model/update-password";
import {useUserStore} from '@/shared/model/user/model/store'

const formSchema = z.object({
    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters.")
        .max(64, "Password must be at most 64 characters."),
    password_new: z
        .string()
        .min(8, {message: "Password must be at least 8 characters"})
        .max(64, {message: "Password must be at most 64 characters"})
        .regex(/[a-z]/, {
            message: "Password must contain lowercase letter",
        })
        .regex(/[A-Z]/, {
            message: "Password must contain uppercase letter",
        })
        .regex(/[0-9]/, {
            message: "Password must contain number",
        }),
    password_confirmation: z
        .string()
})
    .refine(
        (data) => data.password_new === data.password_confirmation,
        {
            message: "Passwords do not match",
            path: ["password_confirmation"],
        }
    )

export default function UpdatePasswordForm() {
    const user = useUserStore(state => state.user)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            password_new: "",
            password_confirmation: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        await updatePassword(data)
    }

    return (
        <div className="flex gap-8 flex-col sm:flex-row">
            <form onSubmit={form.handleSubmit(onSubmit)} className={'flex-1 min-w-70'}>
                <FieldGroup>
                    <input
                        name="username"
                        autoComplete="username"
                        defaultValue={user?.email}
                        hidden
                    />
                    <Controller
                        name={'password'}
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-4 hover:underline text-foreground"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name={'password_new'}
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="password_new">New Password</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="password_new"
                                    type="password"
                                    required
                                    autoComplete="new-password"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name={'password_confirmation'}
                        control={form.control}
                        render={({field, fieldState}) => (
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
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />
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