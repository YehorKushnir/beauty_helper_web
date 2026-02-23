import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'
import { ClientCreateUpdateDto } from '@/entities/client/model/client-create-update-dto.type'

export async function updateClient(id: string, dto: ClientCreateUpdateDto) {
  try {
    await $api.patch(`/client/${id}`, dto)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
