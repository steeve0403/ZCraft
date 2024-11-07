import { db } from '@/database/db';
import { UserService } from '@/services/userService';
import { useAuthStore } from '@/stores/useAuthStore';

export const initializeAdmin = async () => {
    const adminEmail = 'admin@example.com';
    const adminPassword = '@dminPassword1'; // Change this password after the first login
    const existingAdmin = await db.users.where('email').equals(adminEmail).first();

    try {
        if (!existingAdmin) {
            const userService = new UserService();
            const newAdmin = await userService.register(
                {
                    username: 'admin',
                    email: adminEmail,
                    password: adminPassword,
                    role: 'admin'
                },
                'admin' // The requesterRole is 'admin' to create an admin
            );
            if (newAdmin.id !== undefined) {
                await db.users.update(newAdmin.id, { isEmailVerified: true });
                console.log('Initial admin created and verified.');

                // Automatically log in the new admin
                await useAuthStore.getState().login({
                    email: adminEmail,
                    password: adminPassword
                });
                console.log('New admin logged in automatically.');
            } else {
                console.error('Error: Newly created admin ID is undefined.');
            }
        } else if (!existingAdmin.isEmailVerified) {
            // If the admin exists but is not verified, mark them as verified
            if (existingAdmin.id !== undefined) {
                await db.users.update(existingAdmin.id, { isEmailVerified: true });
                console.log('Existing admin verified.');

                // Automatically log in the existing admin
                await useAuthStore.getState().login({
                    email: adminEmail,
                    password: adminPassword
                });
                console.log('Existing admin logged in automatically.');
            } else {
                console.error('Error: Existing admin ID is undefined.');
            }
        }
    } catch (error: any) {
        console.error('Error during admin verification or login:', error);
    }
};
