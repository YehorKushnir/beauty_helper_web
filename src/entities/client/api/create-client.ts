import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'
import { ClientCreateUpdateDto } from '@/entities/client/model/client-create-update-dto.type'

export async function createClient(dto: ClientCreateUpdateDto) {
  try {
    await $api.post('/client', dto)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
