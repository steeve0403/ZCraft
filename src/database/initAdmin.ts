import { db } from '@/database/db';
import { UserService } from '@/services/userService';

export const initializeAdmin = async () => {
    const adminEmail = 'admin@example.com';
    const existingAdmin = await db.users.where('email').equals(adminEmail).first();

    if (!existingAdmin) {
        const userService = new UserService();
        await userService.register(
            {
                username: 'admin',
                email: adminEmail,
                password: 'adminpassword', // Changez ce mot de passe après la première connexion
                role: 'admin'
            },
            'admin' // Le requesterRole est 'admin' pour créer un admin
        );
        console.log('Administrateur initial créé.');
    }
};
