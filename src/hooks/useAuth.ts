import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect } from 'react';
import { User } from '@/models/User';

export const useAuth = () => {
    const {
        user,
        loading,
        error,
        login,
        register,
        logout,
        requestPasswordReset,
        resetPassword,
        hasPermission,
        setUser
    } = useAuthStore((state) => ({
        user: state.user,
        loading: state.loading,
        error: state.error,
        login: state.login,
        register: state.register,
        logout: state.logout,
        requestPasswordReset: state.requestPasswordReset,
        resetPassword: state.resetPassword,
        hasPermission: state.hasPermission,
        setUser: state.setUser
    }));

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser && !user) {
            const parsedUser: User & { token: string } = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, [setUser, user]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [user]);

    return {
        user,
        loading,
        error,
        login,
        register,
        logout,
        requestPasswordReset,
        resetPassword,
        hasPermission
    };
};
