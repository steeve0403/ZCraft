export type UserRole = 'admin' | 'user';

export interface User {
    id?: number; // Optionnel car auto-généré par Dexie.js
    username: string;
    email: string;
    password: string; // Stocké sous forme hachée
    role: UserRole; // Rôle de l'utilisateur
    isEmailVerified: boolean; // Indique si l'email est vérifié
    passwordResetToken?: string; // Token pour la réinitialisation de mot de passe
    createdAt: Date;
    updatedAt: Date;
}
