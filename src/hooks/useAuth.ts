// src/hooks/useAuth.ts

import { useAuthStore } from '../store/useAuthStore';

export const useAuth = () => {
    const { user, loading, error, register, login, logout } = useAuthStore();

    return { user, loading, error, register, login, logout };
};
