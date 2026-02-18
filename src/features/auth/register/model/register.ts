import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { RegisterDto } from '@/features/auth/register/model/register-dto'
import { registerRequest } from '@/features/auth/register/api/register'
import { useUserStore } from '@/shared/model/user/model/store'

export async function register(dto: RegisterDto) {
  const setAccess = useUserStore.getState().setAccess
  const setUser = useUserStore.getState().setUser

  try {
    const data = await registerRequest(dto)

    setUser(data.user)
    setAccess(data.access)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
