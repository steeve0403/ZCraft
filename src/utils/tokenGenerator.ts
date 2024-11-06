import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a secure token using UUID v4.
 * @returns A secure token string.
 */
export const generateSecureToken = (): string => {
    return uuidv4();
};
