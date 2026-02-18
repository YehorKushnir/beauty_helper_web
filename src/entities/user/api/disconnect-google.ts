import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'
import { toast } from 'sonner'

export async function disconnectGoogle() {
  try {
    await $api.delete('/auth/google')
    toast.success('Google was disconnected')
  } catch (e) {
    showToastError(e)
    throw e
  }
}
