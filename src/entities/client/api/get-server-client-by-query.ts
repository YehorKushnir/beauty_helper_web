import { serverApiRequestWrapper } from '@/shared/lib/api/server-api-request-wrapper'
import { handleServerError } from '@/shared/lib/errors/server-api/handle-server-error'
import { ClientSearchItem } from '@/entities/client/model/client.type'
import qs from 'qs'

export async function getServerClientByQuery(search: string) {
  try {
    const query = qs.stringify({ search }, { skipNulls: true })
    return await serverApiRequestWrapper<ClientSearchItem[]>(`/client/find-by-query?${query}`)
  } catch (e) {
    throw handleServerError(e, {
      scope: 'client',
      action: 'getServerClientByQuery'
    })
  }
}
