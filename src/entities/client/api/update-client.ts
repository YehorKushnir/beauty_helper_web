import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'
import { CreateUpdateDto } from '@/entities/client/model/create-update-dto.type'

export async function updateClient(id: string, dto: CreateUpdateDto) {
  try {
    await $api.patch(`/client/${id}`, dto)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
