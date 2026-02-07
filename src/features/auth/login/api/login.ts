import {$api} from '@/shared/lib/api/axios'
import {LoginDto} from '@/features/auth/login/model/login-dto'
import {AuthData} from '@/shared/model/auth/model/auth-data'

export async function loginRequest(dto: LoginDto): Promise<AuthData> {
    return (await $api.post<AuthData>('/auth/login', dto)).data
}