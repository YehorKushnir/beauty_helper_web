import {
  AppError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ApiError,
  InvariantError
} from '@/shared/lib/errors/errors'

type ToastVariant = 'error' | 'warning' | 'info'

interface ToastData {
  message: string
  variant: ToastVariant
}

export function resolveToast(e: unknown): ToastData | null {
  if (e instanceof UnauthorizedError) return null

  if (e instanceof AppError) {
    switch (true) {
      case e instanceof ForbiddenError:
        return {
          variant: 'warning',
          message: e.message || 'Access denied'
        }

      case e instanceof NotFoundError:
        return {
          variant: 'info',
          message: e.message || 'Not found'
        }

      case e instanceof ApiError:
      case e instanceof InvariantError:
        return {
          variant: 'error',
          message: e.message || 'Something went wrong'
        }
    }
  }

  return {
    variant: 'error',
    message: 'Unexpected error'
  }
}
