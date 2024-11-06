import { ZodSchema } from 'zod';
import { ValidationError } from '@/utils/CustomError';

/**
 * Validates data against a Zod schema.
 * @param schema - The Zod schema.
 * @param data - The data to validate.
 * @returns The validated data.
 * @throws {ValidationError} Throws a ValidationError if validation fails.
 */
export function validateData<T>(schema: ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data);
    if (!result.success) {
        const errorMessages = result.error.errors
            .map((err) => err.message)
            .join(', ');
        throw new ValidationError(`Validation error: ${errorMessages}`);
    }
    return result.data;
}

/**
 * Validates data against multiple Zod schemas.
 * @param schemas - An array of Zod schemas.
 * @param data - The data to validate.
 * @returns The validated data.
 * @throws {ValidationError} Throws a ValidationError if validation fails.
 */
export function validateDataAgainstMultipleSchemas<T>(
    schemas: ZodSchema<T>[],
    data: unknown
): T {
    for (const schema of schemas) {
        const result = schema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    }
    const errorMessages = schemas
        .map((schema) =>
            schema
                .safeParse(data)
                .error?.errors.map((err) => err.message)
                .join(', ')
        )
        .filter(Boolean)
        .join('; ');
    throw new ValidationError(`Validation error: ${errorMessages}`);
}

/**
 * Validates optional data against a Zod schema.
 * @param schema - The Zod schema.
 * @param data - The optional data to validate.
 * @returns The validated data or undefined if the data is not provided.
 * @throws {ValidationError} Throws a ValidationError if validation fails.
 */
export function validateOptionalData<T>(
    schema: ZodSchema<T>,
    data?: unknown
): T | undefined {
    if (data === undefined) {
        return undefined;
    }
    return validateData(schema, data);
}

/**
 * Validates if the given value is a valid email address.
 * @param email - The email address to validate.
 * @returns True if the email is valid, otherwise false.
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates if the given value is a valid phone number.
 * @param phoneNumber - The phone number to validate.
 * @returns True if the phone number is valid, otherwise false.
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
}

/**
 * Validates if the given value is not empty.
 * @param value - The value to validate.
 * @returns True if the value is not empty, otherwise false.
 */
export function isNotEmpty(value: string): boolean {
    return value.trim().length > 0;
}
