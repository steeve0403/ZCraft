import { Logger, LogLevel } from './logger';
import {
    ValidationError,
    AuthenticationError,
    NotFoundError,
    ConflictError,
    DatabaseError,
    PermissionError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    InternalServerError,
    ServiceUnavailableError
} from './CustomError';

export function handleServiceError(error: unknown, context?: string): never {
    if (
        error instanceof ValidationError ||
        error instanceof AuthenticationError ||
        error instanceof NotFoundError ||
        error instanceof ConflictError ||
        error instanceof DatabaseError ||
        error instanceof PermissionError ||
        error instanceof BadRequestError ||
        error instanceof UnauthorizedError ||
        error instanceof ForbiddenError ||
        error instanceof InternalServerError ||
        error instanceof ServiceUnavailableError
    ) {
        Logger.log({
            level: LogLevel.WARN,
            message: error.message,
            context
        });
        throw error;
    } else if (error instanceof Error) {
        Logger.log({
            level: LogLevel.ERROR,
            message: 'An unexpected error occurred.',
            context,
            error
        });
        throw new Error(
            'An unexpected error occurred. Please try again later.'
        );
    } else {
        Logger.log({
            level: LogLevel.ERROR,
            message: 'An unknown error occurred.',
            context
        });
        throw new Error('An unknown error occurred.');
    }
}
