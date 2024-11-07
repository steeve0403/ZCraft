import { User, UserProfile } from '@/models/User';
import { db } from '@/database/db';
import {
    UserRegisterSchema,
    UserLoginSchema,
    PasswordResetSchema,
    PasswordUpdateSchema
} from '@/validators/userValidators';
import bcrypt from 'bcryptjs';
import { ServiceWrapper } from '@/services/serviceWrapper';
import { generateSecureToken } from '@/utils/tokenGenerator';
import { Role, RolePermissions } from '@/models/Role';
import { Permission } from '@/models/Permission';
import { AuditService } from '@/services/auditService';
import { Logger, LogLevel } from '@/utils/logger';

interface LoginAttempt {
    count: number;
    lastAttempt: Date;
}

const loginAttempts: { [email: string]: LoginAttempt } = {};

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes

export class UserService {
    private auditService: AuditService;

    constructor() {
        this.auditService = new AuditService();
    }

    /**
     * Registers a new user.
     * @param userData - Data for the new user.
     * @param requesterRole - Role of the user performing the registration.
     * @returns The newly created user.
     */
    async register(userData: any, requesterRole: Role = 'user'): Promise<User> {
        return await ServiceWrapper.executeService(async () => {
            const parsedData = UserRegisterSchema.parse(userData);

            const existingUser = await db.users
                .where('email')
                .equals(parsedData.email)
                .first();
            if (existingUser) {
                throw new Error('This email is already in use.');
            }

            const role: Role =
                requesterRole === 'admin' && parsedData.role
                    ? parsedData.role
                    : 'user';

            const hashedPassword = await this.hashPassword(
                parsedData.password,
                10
            );

            const newUser: {
                id?: number;
                createdAt: Date;
                password: string;
                role: 'admin' | 'user';
                email: string;
                isEmailVerified: boolean;
                username: string;
                token: string;
                updatedAt: Date;
            } = {
                username: parsedData.username,
                email: parsedData.email,
                password: hashedPassword,
                role,
                isEmailVerified: requesterRole === 'admin', // Automatiquement vérifié pour admin
                token: '', // Initialisé vide, sera généré lors de la connexion
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const id = await db.users.add(<User>newUser);
            const createdUser = { ...newUser, id };

            if (requesterRole !== 'admin') {
                await this.sendEmailVerification(createdUser);
            }

            await this.auditService.logAction(
                id,
                'Register',
                `User registered: ${parsedData.email}`
            );

            return createdUser;
        }, 'UserService.register').then((response) => {
            if (response.error) {
                throw new Error(response.error.message);
            }
            return response.data as User;
        });
    }

    /**
     * Logs in a user.
     * @param loginData - Credentials for login.
     * @returns The logged-in user.
     */
    async login(loginData: { email: string; password: string }): Promise<User> {
        return await ServiceWrapper.executeService(async () => {
            const parsedData = UserLoginSchema.parse(loginData);
            const email = parsedData.email;

            const attempt = loginAttempts[email];
            const now = new Date();

            if (attempt && attempt.count >= MAX_ATTEMPTS) {
                const lockDuration =
                    now.getTime() - attempt.lastAttempt.getTime();
                if (lockDuration < LOCK_TIME) {
                    throw new Error(
                        'Too many login attempts. Please try again later.'
                    );
                } else {
                    delete loginAttempts[email];
                }
            }

            const user = await db.users
                .where('email')
                .equals(parsedData.email)
                .first();
            if (!user) {
                this.recordFailedAttempt(email);
                throw new Error('User not found.');
            }

            if (!user.isEmailVerified) {
                this.recordFailedAttempt(email);
                throw new Error(
                    'Please verify your email address before logging in.'
                );
            }

            const isPasswordValid = bcrypt.compare(
                parsedData.password,
                user.password
            );
            if (!isPasswordValid) {
                this.recordFailedAttempt(email);
                throw new Error('Incorrect password.');
            }

            delete loginAttempts[email];

            await this.auditService.logAction(
                user.id!,
                'Login',
                `User logged in: ${user.email}`
            );

            // Génération du token
            const token = generateSecureToken();
            user.token = token;

            // Mise à jour de l'utilisateur avec le token
            await db.users.update(user.id!, { token, updatedAt: new Date() });

            return user;
        }, 'UserService.login').then((response) => {
            if (response.error) {
                throw new Error(response.error.message);
            }
            return response.data as User;
        });
    }

    /**
     * Logs out the current user.
     */
    async logout(): Promise<void> {
        return await ServiceWrapper.executeService(async () => {
            // Frontend-only: Clearing user data is handled in the store
            await this.auditService.logAction(-1, 'Logout', 'User logged out.');
        }, 'UserService.logout').then((response) => {
            if (response.error) {
                throw new Error(response.error.message);
            }
        });
    }

    /**
     * Requests a password reset for a user.
     * @param email - The email of the user requesting the reset.
     * @returns The reset token.
     */
    async requestPasswordReset(email: string): Promise<string> {
        return await ServiceWrapper.executeService(async () => {
            const parsedData = PasswordResetSchema.parse({ email });

            const user = await db.users
                .where('email')
                .equals(parsedData.email)
                .first();
            if (!user) {
                throw new Error('User not found.');
            }

            const token = generateSecureToken();
            const expiry = new Date(Date.now() + 3600000); // 1 hour
            await db.users.update(user.id!, {
                passwordResetToken: token,
                passwordResetTokenExpiry: expiry,
                updatedAt: new Date()
            });

            Logger.log({
                level: LogLevel.INFO,
                message: `Password reset token for ${email}: ${token}`,
                context: 'UserService.requestPasswordReset'
            });

            await this.auditService.logAction(
                user.id!,
                'Password Reset Requested',
                `Token generated: ${token}`
            );

            return token;
        }, 'UserService.requestPasswordReset').then((response) => {
            if (response.error) {
                throw new Error(response.error.message);
            }
            return response.data as string;
        });
    }

    /**
     * Resets a user's password using a token.
     * @param token - The password reset token.
     * @param newPassword - The new password.
     */
    async resetPassword(token: string, newPassword: string): Promise<void> {
        return await ServiceWrapper.executeService(async () => {
            const parsedData = PasswordUpdateSchema.parse({
                token,
                newPassword
            });

            const user = await db.users
                .where('passwordResetToken')
                .equals(parsedData.token)
                .first();
            if (!user) {
                throw new Error('Invalid password reset token.');
            }

            if (
                user.passwordResetTokenExpiry &&
                user.passwordResetTokenExpiry < new Date()
            ) {
                throw new Error('Password reset token has expired.');
            }

            const hashedPassword = await this.hashPassword(
                parsedData.newPassword,
                10
            );

            await db.users.update(user.id!, {
                password: hashedPassword,
                passwordResetToken: undefined,
                passwordResetTokenExpiry: undefined,
                updatedAt: new Date()
            });

            await this.auditService.logAction(
                user.id!,
                'Password Reset',
                `Password reset via token: ${token}`
            );
        }, 'UserService.resetPassword').then((response) => {
            if (response.error) {
                throw new Error(response.error.message);
            }
        });
    }

    /**
     * Verifies a user's email using a token.
     * @param token - The email verification token.
     */
    async verifyEmail(token: string): Promise<void> {
        return await ServiceWrapper.executeService(async () => {
            const user = await db.users
                .where('emailVerificationToken')
                .equals(token)
                .first();
            if (!user) {
                throw new Error('Invalid email verification token.');
            }

            if (
                user.emailVerificationTokenExpiry &&
                user.emailVerificationTokenExpiry < new Date()
            ) {
                throw new Error('Email verification token has expired.');
            }

            await db.users.update(user.id!, {
                isEmailVerified: true,
                emailVerificationToken: undefined,
                emailVerificationTokenExpiry: undefined,
                updatedAt: new Date()
            });

            await this.auditService.logAction(
                user.id!,
                'Email Verified',
                `Email verified via token: ${token}`
            );
        }, 'UserService.verifyEmail').then((response) => {
            if (response.error) {
                throw new Error(response.error.message);
            }
        });
    }

    /**
     * Retrieves a user by their ID.
     * @param id - The ID of the user.
     * @returns The user or undefined if not found.
     */
    async getUserById(id: number): Promise<User | undefined> {
        return await ServiceWrapper.executeService(async () => {
            return db.users.get(id);
        }, 'UserService.getUserById').then((response) => {
            if (response.error) {
                throw new Error(response.error.message);
            }
            return response.data as User | undefined;
        });
    }

    /**
     * Retrieves all users.
     * @returns An array of all users.
     */
    async getAllUsers(): Promise<User[]> {
        return await ServiceWrapper.executeService(async () => {
            return db.users.toArray();
        }, 'UserService.getAllUsers').then((response) => {
            if (response.error) {
                throw new Error(response.error.message);
            }
            return response.data as User[];
        });
    }

    /**
     * Updates a user's role.
     * @param id - The ID of the user to update.
     * @param newRole - The new role to assign.
     * @param requester - The user making the request.
     */
    async updateUserRole(
        id: number,
        newRole: Role,
        requester: User
    ): Promise<void> {
        return await ServiceWrapper.executeService(async () => {
            if (!this.hasPermission(requester, Permission.MANAGE_USERS)) {
                throw new Error(
                    "You do not have the necessary permissions to update a user's role."
                );
            }

            const user = await db.users.get(id);
            if (!user) {
                throw new Error('User not found.');
            }

            if (user.role === 'admin' && id === 1 && newRole !== 'admin') {
                throw new Error(
                    'Cannot modify the role of the primary administrator.'
                );
            }

            await db.users.update(id, { role: newRole, updatedAt: new Date() });

            await this.auditService.logAction(
                requester.id!,
                `Updated user role to ${newRole}`,
                `User ID: ${id}`
            );
        }, 'UserService.updateUserRole').then((response) => {
            if (response.error) {
                throw new Error(response.error.message);
            }
        });
    }

    /**
     * Deletes a user.
     * @param id - The ID of the user to delete.
     * @param requester - The user making the request.
     */
    async deleteUser(id: number, requester: User): Promise<void> {
        return await ServiceWrapper.executeService(async () => {
            if (!this.hasPermission(requester, Permission.MANAGE_USERS)) {
                throw new Error(
                    'You do not have the necessary permissions to delete a user.'
                );
            }

            const user = await db.users.get(id);
            if (!user) {
                throw new Error('User not found.');
            }

            if (user.role === 'admin' && user.id === 1) {
                throw new Error('Cannot delete the primary administrator.');
            }

            await db.users.delete(id);

            await this.auditService.logAction(
                requester.id!,
                `Deleted user: ${user.email}`,
                `Deleted User ID: ${id}`
            );
        }, 'UserService.deleteUser').then((response) => {
            if (response.error) {
                throw new Error(response.error.message);
            }
        });
    }

    /**
     * Updates a user's profile.
     * @param id - The ID of the user to update.
     * @param updates - The profile updates to apply.
     */
    async updateUserProfile(
        id: number,
        updates: Partial<UserProfile>
    ): Promise<void> {
        return await ServiceWrapper.executeService(async () => {
            const user = await db.users.get(id);
            if (!user) {
                throw new Error('User not found.');
            }

            const updatedProfile = { ...user.profile, ...updates };
            await db.users.update(id, {
                profile: updatedProfile,
                updatedAt: new Date()
            });

            await this.auditService.logAction(
                id,
                'Update Profile',
                `Profile updated: ${JSON.stringify(updates)}`
            );
        }, 'UserService.updateUserProfile').then((response) => {
            if (response.error) {
                throw new Error(response.error.message);
            }
        });
    }

    /**
     * Retrieves a user's profile by their ID.
     * @param id - The ID of the user.
     * @returns The user's profile or undefined if not found.
     */
    async getUserProfile(id: number): Promise<UserProfile | undefined> {
        return await ServiceWrapper.executeService(async () => {
            const user = await db.users.get(id);
            return user?.profile;
        }, 'UserService.getUserProfile').then((response) => {
            if (response.error) {
                throw new Error(response.error.message);
            }
            return response.data as UserProfile | undefined;
        });
    }

    /**
     * Checks if a user has a specific permission.
     * @param user - The user to check.
     * @param permission - The permission to verify.
     * @returns True if the user has the permission, false otherwise.
     */
    hasPermission(user: User, permission: Permission): boolean {
        const role = user.role as Role;
        return RolePermissions[role].includes(permission);
    }

    /**
     * Records a failed login attempt.
     * @param email - The email of the user attempting to log in.
     */
    private recordFailedAttempt(email: string): void {
        const now = new Date();
        if (loginAttempts[email]) {
            loginAttempts[email].count += 1;
            loginAttempts[email].lastAttempt = now;
        } else {
            loginAttempts[email] = { count: 1, lastAttempt: now };
        }
    }

    /**
     * Hashes a password using bcrypt.
     * @param password - The password to hash.
     * @param saltRounds - The number of salt rounds.
     * @returns The hashed password.
     */
    private async hashPassword(
        password: string,
        saltRounds: number = 10
    ): Promise<string> {
        return bcrypt.hash(password, saltRounds);
    }

    /**
     * Sends an email verification (simulated).
     * @param user - The user to verify.
     */
    private async sendEmailVerification(user: User): Promise<void> {
        const token = generateSecureToken();
        const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        await db.users.update(user.id!, {
            emailVerificationToken: token,
            emailVerificationTokenExpiry: expiry,
            updatedAt: new Date()
        });

        Logger.log({
            level: LogLevel.INFO,
            message: `Email verification token for ${user.email}: ${token}`,
            context: 'UserService.sendEmailVerification'
        });

        await this.auditService.logAction(
            user.id!,
            'Email Verification Sent',
            `Verification token: ${token}`
        );
    }
}
