'use client'

import LoadingButton from "@/shared/ui/loading-button";
import {LogOut} from "lucide-react";
import {removeSessionResponse} from "@/entities/session/model/remove-session";
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {Session} from '@/entities/session/model/types'

interface Props {
    sessionId: string
}

export default function RemoveSessionButton({sessionId}: Props) {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (id: string) => removeSessionResponse(id),
        onMutate: async (id) => {
            await queryClient.cancelQueries({queryKey: ['sessions']})

            const previous = queryClient.getQueryData<Session[]>(['sessions'])

            queryClient.setQueryData<Session[]>(['sessions'], (old = []) =>
                old.filter(s => s.id !== id)
            )

            return {previous}
        },
        onError: (_err, _id, context) => {
            if (context?.previous) {
                queryClient.setQueryData(['sessions'], context.previous)
            }
        }
    })

    return (
        <LoadingButton
            className={'cursor-pointer'}
            variant="destructive"
            size="icon"
            loading={mutation.isPending}
            onClick={() => mutation.mutate(sessionId)}
            isIcon={true}
        >
            <LogOut/>
        </LoadingButton>
    )
}