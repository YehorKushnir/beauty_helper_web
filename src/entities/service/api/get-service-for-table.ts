import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'
import { GetServiceForTableDtoType } from '@/entities/service/model/get-service-for-table-dto.type'
import qs from 'qs'
import { ServiceTableData } from '@/entities/service/model/service-table-data.type'

export async function getServiceForTable(dto: GetServiceForTableDtoType, signal: AbortSignal) {
  try {
    const cleanDto = Object.fromEntries(
      Object.entries(dto).filter(([_, value]) => {
        if (value === null) return false
        if (value === undefined) return false
        return !(typeof value === 'string' && value.trim() === '')
      })
    )

    const query = qs.stringify(cleanDto)
    return (await $api.get<ServiceTableData>(`/service/find-for-table?${query}`, { signal })).data
  } catch (e) {
    showToastError(e)
    throw e
  }
}
