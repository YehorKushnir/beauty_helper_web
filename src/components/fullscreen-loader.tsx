import {Spinner} from "@/components/ui/spinner";

export default function FullScreenLoader() {
    return (
        <div className="h-screen flex items-center justify-center">
            <Spinner className="size-16" />
        </div>
    )
}