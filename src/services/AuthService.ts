import { db } from '@/database/db';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';
import {
    AuthenticationError,
    ConflictError,
    NotFoundError
} from '@/utils/CustomError';
import { UserSchema, EmailSchema, PasswordSchema } from '@/utils/validators';
import { BaseService } from './BaseService';
import { validateData } from './utils/ValidationUtils';
import { entityExists } from './utils/DatabaseUtils';
import { Logger, LogLevel } from '@/utils/logger';

class AuthService extends BaseService {
    constructor() {
        super('AuthService');
    }

    async register(userData: Partial<User>): Promise<number> {
        return this.execute(async () => {
            const validatedUser = validateData(UserSchema, userData);

            if (await entityExists(db.users, 'email', validatedUser.email)) {
                throw new ConflictError(
                    'A user with this email already exists.'
                );
            }

            validatedUser.password = bcrypt.hashSync(
                validatedUser.password,
                10
            );
            validatedUser.createdAt = new Date();
            validatedUser.updatedAt = new Date();

            // Ensure createdAt and updatedAt are not undefined
            const userToAdd: User = {
                ...validatedUser,
                createdAt: validatedUser.createdAt!,
                updatedAt: validatedUser.updatedAt!
            };

            const userId = await db.users.add(userToAdd);

            Logger.log({
                level: LogLevel.INFO,
                message: `User registered with ID: ${userId}`,
                context: this.context
            });

            return userId;
        });
    }

    async login(email: string, password: string): Promise<User> {
        return this.execute(async () => {
            validateData(EmailSchema, email);
            validateData(PasswordSchema, password);

            const user = await db.users
                .where('email')
                .equalsIgnoreCase(email)
                .first();
            if (!user || !bcrypt.compareSync(password, user.password)) {
                throw new AuthenticationError('Incorrect email or password.');
            }

            Logger.log({
                level: LogLevel.INFO,
                message: `User logged in with ID: ${user.id}`,
                context: this.context
            });

            return user;
        });
    }

    async logout(userId: number): Promise<string> {
        return this.execute(async () => {
            Logger.log({
                level: LogLevel.INFO,
                message: `User logged out with ID: ${userId}`,
                context: this.context
            });

            return 'User has been logged out successfully.';
        });
    }

    async initiatePasswordReset(email: string): Promise<string> {
        return this.execute(async () => {
            validateData(EmailSchema, email);

            const user = await db.users
                .where('email')
                .equalsIgnoreCase(email)
                .first();
            if (!user) {
                throw new NotFoundError('User with this email does not exist.');
            }

            Logger.log({
                level: LogLevel.INFO,
                message: `Password reset initiated for user ID: ${user.id}`,
                context: this.context
            });

            return 'Password reset initiated. Please check your email for instructions.';
        });
    }

    async resetPassword(userId: number, newPassword: string): Promise<string> {
        return this.execute(async () => {
            validateData(PasswordSchema, newPassword);

            const user = await db.users.get(userId);
            if (!user) {
                throw new NotFoundError('User not found.');
            }

            user.password = bcrypt.hashSync(newPassword, 10);
            user.updatedAt = new Date();
            await db.users.put(user);

            Logger.log({
                level: LogLevel.INFO,
                message: `Password reset for user ID: ${user.id}`,
                context: this.context
            });

            return 'Password has been reset successfully.';
        });
    }

    async verifyEmail(userId: number): Promise<string> {
        return this.execute(async () => {
            const user = await db.users.get(userId);
            if (!user) {
                throw new NotFoundError('User not found.');
            }

            Logger.log({
                level: LogLevel.INFO,
                message: `Email verified for user ID: ${user.id}`,
                context: this.context
            });

            return 'Email has been verified successfully.';
        });
    }

    async updateUserProfile(
        userId: number,
        userData: Partial<User>
    ): Promise<User> {
        return this.execute(async () => {
            const user = await db.users.get(userId);
            if (!user) {
                throw new NotFoundError('User not found.');
            }

            const updatedUser = { ...user, ...userData, updatedAt: new Date() };
            await db.users.put(updatedUser);

            Logger.log({
                level: LogLevel.INFO,
                message: `User profile updated for user ID: ${user.id}`,
                context: this.context
            });

            return updatedUser;
        });
    }

    async getUserDetails(userId: number): Promise<User> {
        return this.execute(async () => {
            const user = await db.users.get(userId);
            if (!user) {
                throw new NotFoundError('User not found.');
            }

            Logger.log({
                level: LogLevel.INFO,
                message: `Fetched details for user ID: ${user.id}`,
                context: this.context
            });

            return user;
        });
    }

}

export const authService = new AuthService();
