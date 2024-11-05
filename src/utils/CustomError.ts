// src/utils/CustomError.ts

/**
 * Base custom error class.
 */
export class CustomError extends Error {
    statusCode?: number;
    details?: string;
    code?: string;

    constructor(
        message: string,
        statusCode?: number,
        details?: string,
        code?: string
    ) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.details = details;
        this.code = code;
        // if (Error.captureStackTrace) {
        //     Error.captureStackTrace(this, this.constructor);
        // }
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            statusCode: this.statusCode,
            details: this.details,
            code: this.code,
            stack: this.stack
        };
    }
}

/**
 * Custom error class for validation errors.
 */
export class ValidationError extends CustomError {
    constructor(message: string, details?: string) {
        super(message, 400, details, 'VALIDATION_ERROR');
    }
}

/**
 * Custom error class for authentication errors.
 */
export class AuthenticationError extends CustomError {
    constructor(message: string, details?: string) {
        super(message, 401, details, 'AUTHENTICATION_ERROR');
    }
}

/**
 * Custom error class for not found errors.
 */
export class NotFoundError extends CustomError {
    constructor(message: string, details?: string) {
        super(message, 404, details, 'NOT_FOUND_ERROR');
    }
}

/**
 * Custom error class for database errors.
 */
export class DatabaseError extends CustomError {
    constructor(message: string, details?: string) {
        super(message, 500, details, 'DATABASE_ERROR');
    }
}

/**
 * Custom error class for permission errors.
 */
export class PermissionError extends CustomError {
    constructor(message: string, details?: string) {
        super(message, 403, details, 'PERMISSION_ERROR');
    }
}

/**
 * Custom error class for conflict errors.
 */
export class ConflictError extends CustomError {
    constructor(message: string, details?: string) {
        super(message, 409, details, 'CONFLICT_ERROR');
    }
}

/**
 * Custom error class for bad request errors.
 */
export class BadRequestError extends CustomError {
    constructor(message: string, details?: string) {
        super(message, 400, details, 'BAD_REQUEST_ERROR');
    }
}

/**
 * Custom error class for unauthorized errors.
 */
export class UnauthorizedError extends CustomError {
    constructor(message: string, details?: string) {
        super(message, 401, details, 'UNAUTHORIZED_ERROR');
    }
}

/**
 * Custom error class for forbidden errors.
 */
export class ForbiddenError extends CustomError {
    constructor(message: string, details?: string) {
        super(message, 403, details, 'FORBIDDEN_ERROR');
    }
}

/**
 * Custom error class for internal server errors.
 */
export class InternalServerError extends CustomError {
    constructor(message: string, details?: string) {
        super(message, 500, details, 'INTERNAL_SERVER_ERROR');
    }
}

/**
 * Custom error class for service unavailable errors.
 */
export class ServiceUnavailableError extends CustomError {
    constructor(message: string, details?: string) {
        super(message, 503, details, 'SERVICE_UNAVAILABLE_ERROR');
    }
}
