import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'
import { toast } from 'sonner'

export async function removePassword() {
  try {
    await $api.delete('/auth/password')
    toast.success('Password was deleted')
  } catch (e) {
    showToastError(e)
    throw e
  }
}
