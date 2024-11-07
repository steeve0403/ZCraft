import { Role } from './Role';
export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    role: Role;
    isEmailVerified: boolean;
    emailVerificationToken?: string;
    emailVerificationTokenExpiry?: Date;
    passwordResetToken?: string;
    passwordResetTokenExpiry?: Date;
    profile?: UserProfile;

    token: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserProfile {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    bio?: string;
    phoneNumber?: string;
    address?: string;
}
