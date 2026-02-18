import { logoutRequest } from '@/features/auth/logout/api/api'
import { useUserStore } from '@/shared/model/user/model/store'

export async function logout() {
  const clear = useUserStore.getState().clear

  await logoutRequest()
  clear()
}
