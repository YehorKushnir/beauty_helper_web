import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'
import { AuthMethods } from '@/entities/user/model/auth-methods'

export async function getSessions() {
  try {
    return (await $api.get<AuthMethods>('/auth/auth-methods')).data
  } catch (e) {
    showToastError(e)
    throw e
  }
}
