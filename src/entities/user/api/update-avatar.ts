import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { useUserStore } from '@/shared/model/user/model/store'
import { $api } from '@/shared/lib/api/axios'

export async function updateAvatar(formData: FormData) {
  const updateUser = useUserStore.getState().updateUser

  try {
    const data = (await $api.patch<string>('/users/avatar', formData)).data

    updateUser({ avatarUrl: data })
  } catch (e) {
    showToastError(e)
    throw e
  }
}
