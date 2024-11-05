// src/services/UserService.ts

import { db } from '@/database/db';
import { User } from '@/types/User';
import bcrypt from 'bcryptjs';
import { ValidationError, AuthenticationError } from '@/utils/CustomError';

export const UserService = {
    /**
     * Registers a new user.
     * @param user - The user to register.
     * @returns The ID of the registered user.
     */
    async register(user: User): Promise<number> {
        // Validate input
        if (!user.username || !user.email || !user.password) {
            throw new ValidationError('All fields are required.');
        }

        // Check if user already exists
        const existingUser = await db.users
            .where('email')
            .equalsIgnoreCase(user.email)
            .first();
        if (existingUser) {
            throw new ValidationError('A user with this email already exists.');
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);

        user.createdAt = new Date();
        user.updatedAt = new Date();

        const userId = await db.users.add(user);
        return userId;
    },

    /**
     * Authenticates a user.
     * @param email - User's email.
     * @param password - User's password.
     * @returns The authenticated user.
     */
    async login(email: string, password: string): Promise<User> {
        const user = await db.users
            .where('email')
            .equalsIgnoreCase(email)
            .first();
        if (!user) {
            throw new AuthenticationError('Incorrect email or password.');
        }

        // Verify password
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new AuthenticationError('Incorrect email or password.');
        }

        return user;
    },

    /**
     * Gets a user by ID.
     * @param userId - The ID of the user.
     * @returns The user.
     */
    async getUserById(userId: number): Promise<User | undefined> {
        return await db.users.get(userId);
    }
    // Additional methods like updateUser, deleteUser can be added as needed.
};
