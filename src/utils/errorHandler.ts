import { ZodError } from 'zod';
import { AppError } from '@/models/AppError';

export const handleError = (error: any): AppError => {
    if (error instanceof ZodError) {
        const field = error.errors[0]?.path.join('.');
        return {
            code: 'VALIDATION_ERROR',
            message: error.errors[0]?.message || 'Validation errors occurred.',
            field: field || undefined
        };
    } else if (error instanceof Error) {
        return {
            code: 'SERVER_ERROR',
            message: error.message
        };
    } else {
        return {
            code: 'UNKNOWN_ERROR',
            message: 'An unknown error occurred.'
        };
    }
};
