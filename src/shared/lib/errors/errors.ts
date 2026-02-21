// APP

export abstract class AppError extends Error {
  abstract readonly type: string
  abstract readonly status?: number

  protected constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }

  get isUserError() {
    return (this.status ?? 500) < 500
  }
}

export class UnauthorizedError extends AppError {
  readonly type = 'UNAUTHORIZED'
  readonly status = 401
  constructor(message = 'Unauthorized') {
    super(message)
  }
}

export class ForbiddenError extends AppError {
  readonly type = 'FORBIDDEN'
  readonly status = 403
  constructor(message = 'Forbidden') {
    super(message)
  }
}

export class NotFoundError extends AppError {
  readonly type = 'NOT_FOUND'
  readonly status = 404
  constructor(message = 'Not found') {
    super(message)
  }
}

export class InvariantError extends AppError {
  readonly type = 'INVARIANT'
  readonly status = 500
  constructor(message = 'Invariant violation') {
    super(message)
  }
}

export class CanceledError extends AppError {
  readonly type = 'CANCELED'
  readonly status = undefined

  constructor(message = 'Request canceled') {
    super(message)
  }

  override get isUserError() {
    return false
  }
}

export class ApiError extends AppError {
  readonly type = 'API_ERROR'

  constructor(
    public readonly status: number,
    message = 'API error',
    public readonly code?: string
  ) {
    super(message)
  }
}
