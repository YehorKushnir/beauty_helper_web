import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'
import { ClientTableItem } from '@/entities/client/model/client.type'
import { GetClientForTableDtoType } from '@/entities/client/model/get-client-for-table-dto.type'
import qs from 'qs'

export async function getClientForTable(dto: GetClientForTableDtoType) {
  try {
    const query = qs.stringify(dto, { skipNulls: true })
    return (await $api.get<ClientTableItem[]>(`/client/find-for-table?${query}`)).data
  } catch (e) {
    showToastError(e)
    throw e
  }
}
