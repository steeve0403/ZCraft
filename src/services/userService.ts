// src/services/userService.ts

import { User, UserRole } from '@/models/User';
import { db } from '@/database/db';
import { UserRegisterSchema, UserLoginSchema, PasswordResetSchema, PasswordUpdateSchema } from '@/validators/userValidators';
import bcrypt from 'bcryptjs';
import { ServiceWrapper } from '@/services/serviceWrapper';
export class UserService {
    /**
     * Inscription d'un nouvel utilisateur
     * @param userData - Données de l'utilisateur à inscrire
     * @param requesterRole - Rôle de l'utilisateur qui effectue l'inscription
     * @returns L'utilisateur inscrit
     */
    async register(userData: any, requesterRole: UserRole = 'user'): Promise<User> {
        return await ServiceWrapper.executeService(async () => {
            // Validation des données
            const parsedData = UserRegisterSchema.parse(userData);

            // Vérifier si l'email existe déjà
            const existingUser = await db.users.where('email').equals(parsedData.email).first();
            if (existingUser) {
                throw new Error("Cet email est déjà utilisé.");
            }

            // Déterminer le rôle
            const role: UserRole = requesterRole === 'admin' && parsedData.role ? parsedData.role : 'user';

            // Hachage du mot de passe
            const hashedPassword = await bcrypt.hash(parsedData.password, 10);

            const newUser: User = {
                username: parsedData.username,
                email: parsedData.email,
                password: hashedPassword,
                role,
                isEmailVerified: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            // Ajout de l'utilisateur à la base de données
            const id = await db.users.add(newUser);
            return { ...newUser, id };
        }, 'UserService.register').then(response => {
            if (response.error) {
                throw new Error(response.error);
            }
            return response.data as User;
        });
    }

    /**
     * Connexion d'un utilisateur
     * @param loginData - Données de connexion
     * @returns L'utilisateur connecté
     */
    async login(loginData: any): Promise<User> {
        return await ServiceWrapper.executeService(async () => {
            // Validation des données
            const parsedData = UserLoginSchema.parse(loginData);

            // Récupérer l'utilisateur par email
            const user = await db.users.where('email').equals(parsedData.email).first();
            if (!user) {
                throw new Error("Utilisateur non trouvé.");
            }

            // Vérifier si l'email est vérifié
            if (!user.isEmailVerified) {
                throw new Error("Veuillez vérifier votre adresse email avant de vous connecter.");
            }

            // Vérifier le mot de passe
            const isPasswordValid = await bcrypt.compare(parsedData.password, user.password);
            if (!isPasswordValid) {
                throw new Error("Mot de passe incorrect.");
            }

            return user;
        }, 'UserService.login').then(response => {
            if (response.error) {
                throw new Error(response.error);
            }
            return response.data as User;
        });
    }

    /**
     * Récupérer un utilisateur par ID
     * @param id - ID de l'utilisateur
     * @returns L'utilisateur trouvé ou undefined
     */
    async getUserById(id: number): Promise<User | undefined> {
        return await ServiceWrapper.executeService(async () => {
            return db.users.get(id);
        }, 'UserService.getUserById').then(response => {
            if (response.error) {
                throw new Error(response.error);
            }
            return response.data as User | undefined;
        });
    }

    /**
     * Récupérer tous les utilisateurs (admin uniquement)
     * @returns Liste de tous les utilisateurs
     */
    async getAllUsers(): Promise<User[]> {
        return await ServiceWrapper.executeService(async () => {
            return db.users.toArray();
        }, 'UserService.getAllUsers').then(response => {
            if (response.error) {
                throw new Error(response.error);
            }
            return response.data as User[];
        });
    }

    /**
     * Mettre à jour le rôle d'un utilisateur (admin uniquement)
     * @param id - ID de l'utilisateur
     * @param newRole - Nouveau rôle à attribuer
     */
    async updateUserRole(id: number, newRole: UserRole): Promise<void> {
        await ServiceWrapper.executeService(async () => {
            const user = await db.users.get(id);
            if (!user) {
                throw new Error("Utilisateur non trouvé.");
            }

            // Empêcher la dégradation de l'administrateur principal
            if (user.role === 'admin' && id === 1 && newRole !== 'admin') {
                throw new Error("Impossible de modifier le rôle de l'administrateur principal.");
            }

            await db.users.update(id, { role: newRole, updatedAt: new Date() });
        }, 'UserService.updateUserRole').then(response => {
            if (response.error) {
                throw new Error(response.error);
            }
        });
    }

    /**
     * Demander la réinitialisation du mot de passe
     * @param email - Email de l'utilisateur
     * @returns Le token de réinitialisation (simulé)
     */
    async requestPasswordReset(email: string): Promise<string> {
        return await ServiceWrapper.executeService(async () => {
            // Validation des données
            const parsedData = PasswordResetSchema.parse({ email });

            // Récupérer l'utilisateur par email
            const user = await db.users.where('email').equals(parsedData.email).first();
            if (!user) {
                throw new Error("Utilisateur non trouvé.");
            }

            // Générer un token de réinitialisation (simulé)
            const token = Math.random().toString(36).substr(2);
            await db.users.update(user.id!, { passwordResetToken: token, updatedAt: new Date() });

            // Envoyer le token par email (simulé)
            Logger.log({ level: LogLevel.INFO, message: `Token de réinitialisation pour ${email}: ${token}`, context: 'UserService.requestPasswordReset' });

            return token;
        }, 'UserService.requestPasswordReset').then(response => {
            if (response.error) {
                throw new Error(response.error);
            }
            return response.data as string;
        });
    }

    /**
     * Réinitialiser le mot de passe avec un token
     * @param token - Token de réinitialisation
     * @param newPassword - Nouveau mot de passe
     */
    async resetPassword(token: string, newPassword: string): Promise<void> {
        return await ServiceWrapper.executeService(async () => {
            // Validation des données
            const parsedData = PasswordUpdateSchema.parse({ token, newPassword });

            // Récupérer l'utilisateur par token
            const user = await db.users.where('passwordResetToken').equals(parsedData.token).first();
            if (!user) {
                throw new Error("Token de réinitialisation invalide.");
            }

            // Hachage du nouveau mot de passe
            const hashedPassword = await bcrypt.hash(parsedData.newPassword, 10);

            // Mettre à jour le mot de passe et supprimer le token
            await db.users.update(user.id!, { password: hashedPassword, passwordResetToken: undefined, updatedAt: new Date() });
        }, 'UserService.resetPassword').then(response => {
            if (response.error) {
                throw new Error(response.error);
            }
        });
    }

    /**
     * Vérifier et valider le token de réinitialisation
     * @param token - Token de réinitialisation
     * @returns L'utilisateur associé au token
     */
    async verifyResetToken(token: string): Promise<User> {
        return await ServiceWrapper.executeService(async () => {
            const user = await db.users.where('passwordResetToken').equals(token).first();
            if (!user) {
                throw new Error("Token de réinitialisation invalide.");
            }
            return user;
        }, 'UserService.verifyResetToken').then(response => {
            if (response.error) {
                throw new Error(response.error);
            }
            return response.data as User;
        });
    }
}


