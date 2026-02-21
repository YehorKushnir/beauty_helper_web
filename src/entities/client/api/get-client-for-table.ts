import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'
import { GetClientForTableDtoType } from '@/entities/client/model/get-client-for-table-dto.type'
import qs from 'qs'
import { ClientTableData } from '@/entities/client/model/client-table-data.type'

export async function getClientForTable(dto: GetClientForTableDtoType, signal: AbortSignal) {
  try {
    const query = qs.stringify(dto, { skipNulls: true })
    return (await $api.get<ClientTableData>(`/client/find-for-table?${query}`, { signal })).data
  } catch (e) {
    showToastError(e)
    throw e
  }
}
