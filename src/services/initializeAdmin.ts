import { db } from '@/database/db';
import { useAuthStore } from '@/stores/useAuthStore';
import { UserService } from '@/services/userService';

export const initializeAdmin = async () => {
    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD || '@dminPassword1';

    console.log('Initializing admin...');

    const existingAdmin = await db.users.where('email').equals(adminEmail).first();

    console.log('initializeAdmin: existingAdmin:', existingAdmin);

    if (!existingAdmin) {
        const userService = new UserService();
        try {
            const newAdmin = await userService.register(
                {
                    username: 'admin',
                    email: adminEmail,
                    password: adminPassword,
                    role: 'admin'
                },
                'admin' // Le requesterRole est 'admin' pour créer un admin
            );
            // Marquer l'administrateur comme vérifié
            // @ts-ignore
            await db.users.update(newAdmin.id, { isEmailVerified: true });
            console.log('Administrateur initial créé et vérifié.');

            // Connecter l'administrateur automatiquement
            console.log('Attempting to log in the admin automatically...');
            await useAuthStore.getState().login({
                email: adminEmail,
                password: adminPassword
            });
            console.log('Administrateur connecté automatiquement.');
        } catch (error: any) {
            console.error('Error during admin registration or login:', error);
        }
    } else if (!existingAdmin.isEmailVerified) {
        try {
            // Si l'administrateur existe mais n'est pas vérifié, le marquer comme vérifié
            // @ts-ignore
            await db.users.update(existingAdmin.id, { isEmailVerified: true });
            console.log('Administrateur existant vérifié.');

            // Connecter l'administrateur automatiquement
            console.log(
                'Attempting to log in the existing admin automatically...'
            );
            await useAuthStore.getState().login({
                email: adminEmail,
                password: adminPassword
            });
            console.log('Administrateur connecté automatiquement.');
        } catch (error: any) {
            console.error('Error during admin verification or login:', error);
        }
    } else {
        console.log('Administrateur existant et vérifié.');
        // Optionnel: Connecter l'administrateur automatiquement
        await useAuthStore.getState().login({ email: adminEmail, password: adminPassword });
        console.log('Administrateur connecté automatiquement.');
    }
};
