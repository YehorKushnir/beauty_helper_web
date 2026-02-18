import axios from 'axios'
import { AppError, InvariantError } from '@/shared/lib/errors/errors'
import { extractAxiosErrorMessage } from '@/shared/lib/errors/axios/extract-axios-error-message'
import { mapStatusToError } from '@/shared/lib/errors/map-status-error'

export function mapAxiosError(error: unknown): AppError | Error {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error : new InvariantError('Unknown client error')
  }

  const status = error.response?.status
  const data = error.response?.data

  if (!status) {
    return new InvariantError('Network error')
  }

  const message = extractAxiosErrorMessage(data, error.message)

  return mapStatusToError(status, message)
}
