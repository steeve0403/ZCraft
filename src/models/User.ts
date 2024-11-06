import { Role } from './Role';
export interface User {
    id?: number; // Optionnel car auto-généré par Dexie.js
    username: string;
    email: string;
    password: string; // Stocké sous forme hachée
    role: Role; // Rôle de l'utilisateur
    isEmailVerified: boolean;
    emailVerificationToken?: string;
    emailVerificationTokenExpiry?: Date;
    passwordResetToken?: string; // Token pour la réinitialisation de mot de passe
    passwordResetTokenExpiry?: Date; // Date d'expiration du token
    createdAt: Date;
    updatedAt: Date;
    profile?: UserProfile;
}

export interface UserProfile {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    bio?: string;
    phoneNumber?: string;
    address?: string;
}
