import {
    AppError,
    ApiError,
    ForbiddenError,
    InvariantError,
    NotFoundError,
    UnauthorizedError,
} from '@/shared/lib/errors/errors'

export function mapStatusToError(
    status: number,
    message: string,
    code?: string
): AppError {
    switch (status) {
        case 401:
            return new UnauthorizedError(message)
        case 403:
            return new ForbiddenError(message)
        case 404:
            return new NotFoundError(message)
        case 500:
            return new InvariantError(message)
        default:
            return new ApiError(status, message, code)
    }
}