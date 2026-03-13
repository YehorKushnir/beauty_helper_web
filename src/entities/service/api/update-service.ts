import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'
import { ServiceCreateUpdateDto } from '@/entities/service/model/service-create-update-dto.type'

export async function updateService(id: string, dto: ServiceCreateUpdateDto) {
  try {
    await $api.patch(`/service/${id}`, dto)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
