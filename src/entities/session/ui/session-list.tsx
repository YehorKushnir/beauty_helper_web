'use client'

import SessionItem from '@/entities/session/ui/session-item'
import {useQuery} from '@tanstack/react-query'
import {fetchSessions} from '@/entities/session/api/fetch-sessions'

export default function SessionList() {
    const {data} = useQuery({
        queryKey: ['sessions'],
        queryFn: fetchSessions
    })

    return (
        <div className="flex gap-4 flex-col">
            {data?.map((session) => (
                <SessionItem key={session.id} session={session}/>
            ))}
        </div>
    )
}