import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'
import { CreateUpdateDto } from '@/entities/client/model/create-update-dto.type'

export async function createClient(dto: CreateUpdateDto) {
  try {
    await $api.post('/client', dto)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
