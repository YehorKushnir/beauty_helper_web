import { Session } from '@/entities/session/model/types'
import { serverApiRequestWrapper } from '@/shared/lib/api/server-api-request-wrapper'
import { handleServerError } from '@/shared/lib/errors/server-api/handle-server-error'

export async function getServerSessions() {
  try {
    return await serverApiRequestWrapper<Session[]>('/users/sessions')
  } catch (e) {
    throw handleServerError(e, {
      scope: 'sessions',
      action: 'getSessions'
    })
  }
}
