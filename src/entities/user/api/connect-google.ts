import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api, API_URL } from '@/shared/lib/api/axios'

export async function connectGoogle() {
  try {
    const { token } = (await $api.post<{ token: string }>('/auth/google/connect-token')).data
    window.location.href = `${API_URL}/auth/google?mode=connect&token=${token}`
  } catch (e) {
    showToastError(e)
    throw e
  }
}
