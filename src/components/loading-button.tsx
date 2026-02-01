import {Spinner} from "@/components/ui/spinner";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {ComponentProps, ReactNode} from "react";

interface Props extends ComponentProps<"button"> {
    loading: boolean
    children: ReactNode
}

export default function LoadingButton({loading, children, className, ...props}: Props) {
    return (
        <Button disabled={loading} className={cn("relative", className)} {...props}>
            {loading && <Spinner data-icon="inline-start"/>}
            {children}
        </Button>
    )
}