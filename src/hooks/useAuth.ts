import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect } from 'react';
import { User } from '@/models/User';
import { useShallow } from 'zustand/react/shallow';

/**
 * Custom hook to access authentication state and actions.
 * @returns Authentication state and action methods.
 */
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
    } = useAuthStore(
        useShallow((state) => ({
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
        }))
    );

    // Persist user in localStorage on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        console.log(
            'useEffect: storedUser:',
            storedUser,
            'current user:',
            user
        );
        if (storedUser && !user) {
            try {
                const parsedUser: User = JSON.parse(storedUser);
                setUser(parsedUser);
                console.log(
                    'setUser called in useAuth useEffect with:',
                    parsedUser
                );
            } catch (error) {
                console.error('Failed to parse stored user:', error);
            }
        }
    }, [user, setUser]);

    useEffect(() => {
        console.log('useEffect: user changed to:', user);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            console.log('useEffect: user stored in localStorage');
        } else {
            localStorage.removeItem('currentUser');
            console.log('useEffect: user removed from localStorage');
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
