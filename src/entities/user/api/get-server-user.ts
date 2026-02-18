import { serverApiRequestWrapper } from '@/shared/lib/api/server-api-request-wrapper'
import { handleServerError } from '@/shared/lib/errors/server-api/handle-server-error'
import { User } from '@/entities/user/model/types'

export async function getServerUser() {
  try {
    return await serverApiRequestWrapper<User>('/users/me')
  } catch (e) {
    throw handleServerError(e, {
      scope: 'user',
      action: 'getServerUser'
    })
  }
}
