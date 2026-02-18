import { $api } from '@/shared/lib/api/axios'

export async function logoutRequest() {
  await $api.post('/auth/logout')
}
