import { create } from 'zustand';
import { User } from '@/types/User';
import { UserService } from '@/services/UserService';

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
    register: (user: User) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    loading: false,
    error: null,

    register: async (user: User) => {
        set({ loading: true, error: null });
        try {
            const userId = await UserService.register(user);
            user.id = userId;
            set({ user });
        } catch (error) {
            set({ error: (error as Error).message });
        } finally {
            set({ loading: false });
        }
    },

    login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
            const user = await UserService.login(email, password);
            set({ user });
        } catch (error) {
            set({ error: (error as Error).message });
        } finally {
            set({ loading: false });
        }
    },

    logout: () => {
        set({ user: null });
    }
}));
