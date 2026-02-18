import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { PasswordDto } from '@/entities/user/model/password-dto'
import { $api } from '@/shared/lib/api/axios'

export async function updatePassword(dto: PasswordDto) {
  try {
    await $api.patch<{ url: string }>('/users/password', dto)
  } catch (e) {
    showToastError(e)
    throw e
  }
}
