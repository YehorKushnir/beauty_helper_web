import { serverApiRequestWrapper } from '@/shared/lib/api/server-api-request-wrapper'
import { handleServerError } from '@/shared/lib/errors/server-api/handle-server-error'
import { ServiceSearchItem } from '@/entities/service/model/service.type'
import qs from 'qs'

export async function getServerServiceByQuery(search: string) {
  try {
    const query = qs.stringify({ search }, { skipNulls: true })
    return await serverApiRequestWrapper<ServiceSearchItem[]>(`/service/find-by-query?${query}`)
  } catch (e) {
    throw handleServerError(e, {
      scope: 'service',
      action: 'getServerServiceByQuery'
    })
  }
}
