import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

export const useAuth = () => {
    const user = useAuthStore(state => state.user);
    const login = useAuthStore(state => state.login);
    const register = useAuthStore(state => state.register);
    const logout = useAuthStore(state => state.logout);

    // Persistance de l'utilisateur dans le localStorage au chargement
    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser && !user) {
            const parsedUser = JSON.parse(storedUser);
            // Mettre à jour le store avec l'utilisateur stocké
            // Note : Cette méthode suppose que le mot de passe est stocké, ce qui n'est pas recommandé
            // Dans une vraie application, l'authentification devrait être gérée côté serveur avec des tokens
            useAuthStore.getState().login({
                email: parsedUser.email,
                password: '' // Impossible de récupérer le mot de passe haché, ajustez selon votre logique
            }).catch(() => {
                // Gérer l'erreur si nécessaire
            });
        }
    }, [user]);

    // Mettre à jour le localStorage lorsque l'utilisateur change
    useEffect(() => {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [user]);

    const isAdmin = user?.role === 'admin';
    const isAuthenticated = !!user;

    return {
        user,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout
    };
};
