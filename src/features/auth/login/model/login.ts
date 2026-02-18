import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { useUserStore } from '@/shared/model/user/model/store'
import { loginRequest } from '@/features/auth/login/api/login'
import { LoginDto } from '@/features/auth/login/model/login-dto'

export async function login(dto: LoginDto) {
  const setAccess = useUserStore.getState().setAccess
  const setUser = useUserStore.getState().setUser

  try {
    const data = await loginRequest(dto)

    setUser(data.user)
    setAccess(data.access)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
