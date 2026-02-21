import { serverApiRequestWrapper } from '@/shared/lib/api/server-api-request-wrapper'
import { handleServerError } from '@/shared/lib/errors/server-api/handle-server-error'
import qs from 'qs'
import { GetClientForTableDtoType } from '@/entities/client/model/get-client-for-table-dto.type'
import { ClientTableData } from '@/entities/client/model/client-table-data.type'

export async function getServerClientForTable(dto: GetClientForTableDtoType) {
  try {
    const query = qs.stringify(dto, { skipNulls: true })
    return await serverApiRequestWrapper<ClientTableData>(`/client/find-for-table?${query}`)
  } catch (e) {
    throw handleServerError(e, {
      scope: 'client',
      action: 'getServerClientForTable'
    })
  }
}
