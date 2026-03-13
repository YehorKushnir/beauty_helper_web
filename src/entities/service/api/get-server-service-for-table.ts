import { serverApiRequestWrapper } from '@/shared/lib/api/server-api-request-wrapper'
import { handleServerError } from '@/shared/lib/errors/server-api/handle-server-error'
import qs from 'qs'
import { GetServiceForTableDtoType } from '@/entities/service/model/get-service-for-table-dto.type'
import { ServiceTableData } from '@/entities/service/model/service-table-data.type'

export async function getServerServiceForTable(dto: GetServiceForTableDtoType) {
  try {
    const query = qs.stringify(dto, { skipNulls: true })
    return await serverApiRequestWrapper<ServiceTableData>(`/service/find-for-table?${query}`)
  } catch (e) {
    throw handleServerError(e, {
      scope: 'service',
      action: 'getServerServiceForTable'
    })
  }
}
