import { z } from 'zod';

// Schéma pour l'inscription
export const UserRegisterSchema = z.object({
    username: z.string().min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères."),
    email: z.string().email("Format d'email invalide."),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
    role: z.enum(['admin', 'user']).optional(), // Optionnel, par défaut 'user'
});

// Schéma pour la connexion
export const UserLoginSchema = z.object({
    email: z.string().email("Format d'email invalide."),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});

// Schéma pour la réinitialisation du mot de passe
export const PasswordResetSchema = z.object({
    email: z.string().email("Format d'email invalide."),
});

// Schéma pour la mise à jour du mot de passe
export const PasswordUpdateSchema = z.object({
    token: z.string(),
    newPassword: z.string().min(6, "Le nouveau mot de passe doit contenir au moins 6 caractères."),
});
