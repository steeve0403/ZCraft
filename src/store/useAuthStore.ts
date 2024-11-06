import { create } from 'zustand';
import { UserService } from '@/services/userService';
import { User, UserRole } from '@/models/User';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    register: (userData: any, requesterRole?: UserRole) => Promise<void>;
    login: (loginData: any) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,
    error: null,

    register: async (userData, requesterRole = 'user') => {
        set({ loading: true, error: null });
        try {
            const userService = new UserService();
            const newUser = await userService.register(userData, requesterRole);
            set({ user: newUser, loading: false });
            // Stockage dans localStorage
            localStorage.setItem('currentUser', JSON.stringify(newUser));
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    login: async (loginData) => {
        set({ loading: true, error: null });
        try {
            const userService = new UserService();
            const loggedInUser = await userService.login(loginData);
            set({ user: loggedInUser, loading: false });
            // Stockage dans localStorage
            localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    logout: () => {
        set({ user: null });
        // Suppression du localStorage
        localStorage.removeItem('currentUser');
    },
}));
