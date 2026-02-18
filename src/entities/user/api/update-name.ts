import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { useUserStore } from '@/shared/model/user/model/store'
import { $api } from '@/shared/lib/api/axios'

export async function updateName(name: string) {
  const updateUser = useUserStore.getState().updateUser

  try {
    const data = (await $api.patch<string>('/users/name', { name })).data
    updateUser({ name: data })
  } catch (e) {
    showToastError(e)
    throw e
  }
}
