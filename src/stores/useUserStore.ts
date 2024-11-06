import { create } from 'zustand';
import { UserService } from '@/services/userService';
import { Logger, LogLevel } from '@/utils/logger';
import { Role } from '@/models/Role';
import { User, UserProfile } from '@/models/User';
import { AppError } from '@/models/AppError';
import { getAuthStore } from '@/utils/getAuthStore';

interface UserState {
    users: User[];
    loading: boolean;
    error: AppError | null;
    fetchUsers: () => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
    updateUserRole: (id: number, newRole: Role) => Promise<void>;
    updateUserProfile: (
        id: number,
        updates: Partial<UserProfile>
    ) => Promise<void>;
    getUserProfile: (id: number) => Promise<UserProfile | undefined>;
}

export const useUserStore = create<UserState>((set, get) => ({
    users: [],
    loading: false,
    error: null,

    /**
     * Fetches all users and updates the store.
     */
    fetchUsers: async () => {
        if (get().users.length > 0) {
            Logger.log({
                level: LogLevel.INFO,
                message: `Users fetched from cache.`,
                context: 'useUserStore.fetchUsers'
            });
            return;
        }
        set({ loading: true, error: null });
        try {
            const userService = new UserService();
            const users = await userService.getAllUsers();
            set({ users, loading: false });
            Logger.log({
                level: LogLevel.INFO,
                message: `Users fetched and updated in the store.`,
                context: 'useUserStore.fetchUsers'
            });
        } catch (error: any) {
            set({
                error: { code: 'SERVER_ERROR', message: error.message },
                loading: false
            });
            Logger.log({
                level: LogLevel.ERROR,
                message: `Error fetching users: ${error.message}`,
                context: 'useUserStore.fetchUsers'
            });
        }
    },

    /**
     * Deletes a user by ID.
     * @param id - The ID of the user to delete.
     */
    deleteUser: async (id: number) => {
        set({ loading: true, error: null });
        try {
            const userService = new UserService();
            const authStore = getAuthStore();
            const currentUser = authStore.user;
            if (!currentUser) {
                throw new Error('User not authenticated.');
            }

            await userService.deleteUser(id, currentUser);
            set((state) => ({
                users: state.users.filter((user) => user.id !== id),
                loading: false
            }));
            Logger.log({
                level: LogLevel.INFO,
                message: `User with ID ${id} deleted.`,
                context: 'useUserStore.deleteUser'
            });
        } catch (error: any) {
            set({
                error: { code: 'SERVER_ERROR', message: error.message },
                loading: false
            });
            Logger.log({
                level: LogLevel.ERROR,
                message: `Error deleting user: ${error.message}`,
                context: 'useUserStore.deleteUser'
            });
        }
    },

    /**
     * Updates a user's role.
     * @param id - The ID of the user to update.
     * @param newRole - The new role to assign.
     */
    updateUserRole: async (id: number, newRole: Role) => {
        set({ loading: true, error: null });
        try {
            const userService = new UserService();
            const authStore = getAuthStore();
            const currentUser = authStore.user;
            if (!currentUser) {
                throw new Error('User not authenticated.');
            }

            await userService.updateUserRole(id, newRole, currentUser);
            set((state) => ({
                users: state.users.map((user) =>
                    user.id === id
                        ? { ...user, role: newRole, updatedAt: new Date() }
                        : user
                ),
                loading: false
            }));
            Logger.log({
                level: LogLevel.INFO,
                message: `User role updated to ${newRole} for user ID ${id}.`,
                context: 'useUserStore.updateUserRole'
            });
        } catch (error: any) {
            set({
                error: { code: 'SERVER_ERROR', message: error.message },
                loading: false
            });
            Logger.log({
                level: LogLevel.ERROR,
                message: `Error updating user role: ${error.message}`,
                context: 'useUserStore.updateUserRole'
            });
        }
    },

    /**
     * Updates a user's profile.
     * @param id - The ID of the user to update.
     * @param updates - The profile updates to apply.
     */
    updateUserProfile: async (id: number, updates: Partial<UserProfile>) => {
        set({ loading: true, error: null });
        try {
            const userService = new UserService();
            const authStore = getAuthStore();
            const currentUser = authStore.user;
            if (!currentUser) {
                throw new Error('User not authenticated.');
            }

            await userService.updateUserProfile(id, updates);
            set((state) => ({
                users: state.users.map((user) =>
                    user.id === id
                        ? {
                              ...user,
                              profile: { ...user.profile, ...updates },
                              updatedAt: new Date()
                          }
                        : user
                ),
                loading: false
            }));
            Logger.log({
                level: LogLevel.INFO,
                message: `User profile updated for user ID ${id}.`,
                context: 'useUserStore.updateUserProfile'
            });
        } catch (error: any) {
            set({
                error: { code: 'SERVER_ERROR', message: error.message },
                loading: false
            });
            Logger.log({
                level: LogLevel.ERROR,
                message: `Error updating user profile: ${error.message}`,
                context: 'useUserStore.updateUserProfile'
            });
        }
    },

    /**
     * Retrieves a user's profile by ID.
     * @param id - The ID of the user.
     * @returns The user's profile or undefined.
     */
    getUserProfile: async (id: number) => {
        set({ loading: true, error: null });
        try {
            const userService = new UserService();
            const profile = await userService.getUserProfile(id);
            set((state) => ({
                users: state.users.map((user) =>
                    user.id === id ? { ...user, profile } : user
                ),
                loading: false
            }));
            Logger.log({
                level: LogLevel.INFO,
                message: `User profile fetched for user ID ${id}.`,
                context: 'useUserStore.getUserProfile'
            });
            return profile;
        } catch (error: any) {
            set({
                error: { code: 'SERVER_ERROR', message: error.message },
                loading: false
            });
            Logger.log({
                level: LogLevel.ERROR,
                message: `Error fetching user profile: ${error.message}`,
                context: 'useUserStore.getUserProfile'
            });
            return undefined;
        }
    }
}));
