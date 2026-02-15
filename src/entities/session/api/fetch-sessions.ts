import {$api} from '@/shared/lib/api/axios'
import {Session} from '@/entities/session/model/types'

export async function fetchSessions() {
    return (await $api.get<Session[]>('/users/sessions')).data
}