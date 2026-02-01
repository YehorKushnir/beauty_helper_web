'use client'

import {cn} from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription, FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import {ComponentProps} from "react";
import Link from "next/link";
import {useAuthStore} from "@/stores/auth-store";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import LoadingButton from "@/components/loading-button";

export const formSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, {message: "Name must be at least 2 characters"})
        .max(50, {message: "Name must be at most 50 characters"}),

    email: z
        .email()
        .trim(),
    password: z
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
        (data) => data.password === data.password_confirmation,
        {
            message: "Passwords do not match",
            path: ["password_confirmation"],
        }
    )

export function SignupForm({className, ...props}: ComponentProps<"div">) {
    const register = useAuthStore(state => state.register)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        await register(data)
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Create your account</CardTitle>
                    <CardDescription>
                        Enter your email below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name={'name'}
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            id="name"
                                            type="text"
                                            placeholder="Your name"
                                            required
                                            autoComplete="name"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>
                                )}
                            />
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
                                            autoComplete="email"
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
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            id="password"
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
                            <Field>
                                <LoadingButton type="submit" loading={form.formState.isSubmitting}>
                                    Create Account
                                </LoadingButton>
                                {/*<Button variant="outline" type="button">*/}
                                {/*    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">*/}
                                {/*        <path*/}
                                {/*            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"*/}
                                {/*            fill="currentColor"*/}
                                {/*        />*/}
                                {/*    </svg>*/}
                                {/*    Continue with Google*/}
                                {/*</Button>*/}
                                <FieldDescription className="text-center">
                                    Already have an account? <Link href="/login">Sign in</Link>
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
