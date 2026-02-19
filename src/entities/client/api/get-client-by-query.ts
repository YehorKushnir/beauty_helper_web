import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'
import { ClientSearchItem } from '@/entities/client/model/client.type'
import qs from 'qs'

export async function getClientByQuery(search: string) {
  try {
    const query = qs.stringify({ search }, { skipNulls: true })
    return (await $api.get<ClientSearchItem[]>(`/client/find-by-query?${query}`)).data
  } catch (e) {
    showToastError(e)
    throw e
  }
}
