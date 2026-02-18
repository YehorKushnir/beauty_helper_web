import { $api } from '@/shared/lib/api/axios'
import { AuthData } from '@/shared/model/auth/model/auth-data'
import { RegisterDto } from '@/features/auth/register/model/register-dto'

export async function registerRequest(dto: RegisterDto): Promise<AuthData> {
  return (await $api.post<AuthData>('/auth/register', dto)).data
}
