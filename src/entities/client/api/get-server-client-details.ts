import { serverApiRequestWrapper } from '@/shared/lib/api/server-api-request-wrapper'
import { handleServerError } from '@/shared/lib/errors/server-api/handle-server-error'
import { ClientDetails } from '@/entities/client/model/client.type'

export async function getServerClientDetails(id: string) {
  try {
    return await serverApiRequestWrapper<ClientDetails>(`/client/${id}`)
  } catch (e) {
    throw handleServerError(e, {
      scope: 'client',
      action: 'getServerClientDetails'
    })
  }
}
