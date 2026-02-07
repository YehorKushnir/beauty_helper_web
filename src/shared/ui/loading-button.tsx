import {Spinner} from "@/shared/ui/shad-cn/spinner";
import {Button, buttonVariants} from "@/shared/ui/shad-cn/button";
import {cn} from "@/shared/lib/utils";
import {ComponentProps, ReactNode} from "react";
import type {VariantProps} from "class-variance-authority";

interface Props extends ComponentProps<"button"> {
    loading: boolean
    isIcon?: boolean
    children: ReactNode
}

export default function LoadingButton(
    {
        loading,
        isIcon,
        children,
        className,
        ...props
    }: Props & VariantProps<typeof buttonVariants>
) {
    const spinner = loading && <Spinner data-icon="inline-start" />

    return (
        <Button disabled={loading} className={cn("relative", className)} {...props}>
            {isIcon
                ? spinner || children
                : <>{spinner} {children}</>
            }
        </Button>
    )
}