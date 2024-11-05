/* global localStorage */
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { User } from '@/models/User';
import { authService } from '@/services/AuthService';
import { CacheService } from '@/services/CacheService';
import { ServiceWrapper } from '@/services/ServiceWrapper';

const cacheService = new CacheService<User>(60);
const serviceWrapper = new ServiceWrapper('AuthStore');

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    register: (userData: User) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                loading: false,
                error: null,
                register: async (userData: User) => {
                    set({ loading: true, error: null });
                    try {
                        const userId = await serviceWrapper.wrap(() => authService.register(userData));
                        const user = { ...userData, id: userId };
                        cacheService.set(`user_${userId}`, user);
                        set({ user });
                    } catch (error) {
                        set({
                            error:
                                error instanceof Error
                                    ? error.message
                                    : 'Unknown error'
                        });
                    } finally {
                        set({ loading: false });
                    }
                },
                login: async (email: string, password: string) => {
                    set({ loading: true, error: null });
                    try {
                        const user = await serviceWrapper.wrap(() => authService.login(email, password));
                        cacheService.set(`user_${user.id}`, user);
                        set({ user });
                    } catch (error) {
                        set({
                            error:
                                error instanceof Error
                                    ? error.message
                                    : 'Unknown error'
                        });
                    } finally {
                        set({ loading: false });
                    }
                },
                logout: () => {
                    set({ user: null });
                }
            }),
            {
                name: 'auth-storage',
                storage: createJSONStorage(() => localStorage)
            }
        ),
        { name: 'AuthStore' }
    )
);