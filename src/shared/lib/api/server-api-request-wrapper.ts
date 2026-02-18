import { cookies } from 'next/headers'
import { mapApiError } from '@/shared/lib/errors/server-api/map-api-error'
import { UnauthorizedError } from '@/shared/lib/errors/errors'
import { API_URL } from '@/shared/lib/api/axios'

export async function serverApiRequestWrapper<T>(url: string, init?: Omit<RequestInit, 'headers'>) {
  const cookieStore = await cookies()
  const refresh = cookieStore.get('refresh')?.value
  const sid = cookieStore.get('sid')?.value

  if (!refresh || !sid) {
    throw UnauthorizedError
  }

  const contentType =
    init?.body instanceof FormData ? undefined : { 'Content-Type': 'application/json' }

  const res = await fetch(`${API_URL}${url}`, {
    ...init,
    headers: {
      Cookie: `refresh=${refresh}; sid=${sid}`,
      ...contentType
    },
    cache: 'no-store'
  })

  if (!res.ok) {
    const body = await res.json()
    throw mapApiError(res.status, body)
  }

  return (await res.json()) as T
}
