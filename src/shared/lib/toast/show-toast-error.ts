import { resolveToast } from '@/shared/lib/toast/resolve-toast'
import { toast } from 'sonner'

export function showToastError(e: unknown) {
  const payload = resolveToast(e)
  if (!payload) return

  const { variant, message } = payload

  switch (variant) {
    case 'error':
      toast.error(message, { richColors: true })
      break

    case 'warning':
      toast.warning(message)
      break

    case 'info':
      toast.info(message)
      break
  }
}
