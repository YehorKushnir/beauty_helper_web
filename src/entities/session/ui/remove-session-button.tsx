'use client'

import LoadingButton from "@/shared/ui/loading-button";
import {LogOut} from "lucide-react";
import {removeSessionResponse} from "@/entities/session/model/remove-session";
import {startTransition, useState} from "react";
import {useRouter} from "next/navigation";

interface Props {
    sessionId: string
}

export default function RemoveSessionButton({sessionId}: Props) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    
    const handleRemove = async () => {
        setLoading(true)
        await removeSessionResponse(sessionId)

        startTransition(() => {
            router.refresh()
            setLoading(false)
        })
    }
    
    return (
        <LoadingButton
            className={'cursor-pointer'}
            variant="destructive"
            size="icon"
            loading={loading}
            onClick={handleRemove}
            isIcon={true}
        >
            <LogOut/>
        </LoadingButton>
    )
}