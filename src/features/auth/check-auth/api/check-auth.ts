import {AuthData} from '@/shared/model/auth/model/auth-data'
import {cookies} from 'next/headers'

export async function checkAuthRequest(): Promise<AuthData | null> {
    const cookieStore = await cookies()

    const refresh = cookieStore.get('refresh')?.value
    const sid = cookieStore.get('sid')?.value

    if (!refresh || !sid) {
        return null
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/check-auth`,
        {
            headers: {
                Cookie: `refresh=${refresh}; sid=${sid}`,
            },
            cache: 'no-store',
        }
    )

    if (res.status === 401) {
        return null
    }

    if (!res.ok) {
        throw new Error('Failed to check auth')
    }

    return (await res.json()) as AuthData
}