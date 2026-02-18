'use client'

import SessionItem from '@/entities/session/ui/session-item'
import { useQuery } from '@tanstack/react-query'
import { getSessions } from '@/entities/session/api/get-sessions'

export default function SessionList() {
  const { data } = useQuery({
    queryKey: ['sessions'],
    queryFn: getSessions
  })

  return (
    <div className="flex gap-4 flex-col">
      {data?.map((session) => (
        <SessionItem key={session.id} session={session} />
      ))}
    </div>
  )
}
