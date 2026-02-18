import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'
import { Session } from '@/entities/session/model/types'

export async function getSessions() {
  try {
    return (await $api.get<Session[]>('/users/sessions')).data
  } catch (e) {
    showToastError(e)
    throw e
  }
}
