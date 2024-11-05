/**
 * Represents a user in the application.
 */
export interface User {
    id?: number;
    username: string;
    email: string;
    password: string; // Hashed password
    createdAt: Date;
    updatedAt: Date;
}
