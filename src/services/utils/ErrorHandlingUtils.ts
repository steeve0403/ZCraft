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
} from '@/utils/CustomError';

/**
 * Processes and throws the appropriate error based on the caught error.
 * @param error - The caught error.
 * @throws {Error} Throws a standardized error.
 */
export function processServiceError(error: unknown): never {
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
        throw error;
    } else if (error instanceof Error) {
        throw new Error(`Service error: ${error.message}`);
    } else {
        throw new Error('An unknown error occurred.');
    }
}
