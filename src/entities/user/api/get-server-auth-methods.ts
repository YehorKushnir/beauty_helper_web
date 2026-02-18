import { serverApiRequestWrapper } from '@/shared/lib/api/server-api-request-wrapper'
import { handleServerError } from '@/shared/lib/errors/server-api/handle-server-error'
import { AuthMethods } from '@/entities/user/model/auth-methods'

export async function getServerAuthMethods() {
  try {
    return await serverApiRequestWrapper<AuthMethods>('/auth/auth-methods')
  } catch (e) {
    throw handleServerError(e, {
      scope: 'authMethods',
      action: 'getAuthMethods'
    })
  }
}
