import { AppError } from '@/shared/lib/errors/errors'
import { mapStatusToError } from '@/shared/lib/errors/map-status-error'

export function mapApiError(status: number, body: any): AppError {
  const message = typeof body?.message === 'string' ? body.message : 'Request failed'

  const code = body?.code

  return mapStatusToError(status, message, code)
}
