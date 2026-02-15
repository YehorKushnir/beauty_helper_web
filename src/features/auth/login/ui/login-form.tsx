'use client'

import {cn} from "@/shared/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/ui/shad-cn/card"
import {
    Field,
    FieldDescription, FieldError,
    FieldGroup,
    FieldLabel,
} from "@/shared/ui/shad-cn/field"
import {Input} from "@/shared/ui/shad-cn/input"
import {ComponentProps} from "react";
import Link from "next/link";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import {Controller, useForm} from "react-hook-form";
import LoadingButton from "@/shared/ui/loading-button";
import {loginSchema} from "@/features/auth/login/model/login-schema";
import {useRouter} from "next/navigation";
import {login} from "@/features/auth/login/model/login";

export function LoginForm({className, ...props}: ComponentProps<"div">) {
    const router = useRouter()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        await login(data)
            .then(() => router.replace('/dashboard'))
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name={'email'}
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>
                                )}
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
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>
                                )}
                            />
                            <Field>
                                <LoadingButton type="submit" loading={form.formState.isSubmitting}>
                                    Login
                                </LoadingButton>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    )
}
