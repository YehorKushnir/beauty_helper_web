import { redirect, notFound } from 'next/navigation'
import { AppError, UnauthorizedError, NotFoundError } from '@/shared/lib/errors/errors'
import { logger } from '@/shared/lib/logger/logger'

export function handleServerError(
  e: unknown,
  context?: { scope?: string; action?: string }
): AppError | never {
  if (e instanceof UnauthorizedError) {
    redirect('/login')
  }

  if (e instanceof NotFoundError) {
    notFound()
  }

  if (e instanceof AppError) {
    if (!e.isUserError) {
      logger.error(e.message, {
        scope: context?.scope,
        action: context?.action,
        status: e.status
      })
    }

    return e
  }

  logger.error('Unhandled server error', {
    scope: context?.scope,
    action: context?.action
  })

  throw e
}
