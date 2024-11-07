import { create } from 'zustand';
import { AuthState, RegisterData, LoginData } from '@/models/AuthState';
import { Logger, LogLevel } from '@/utils/logger';
import { Permission } from '@/models/Permission';
import { generateSecureToken } from '@/utils/tokenGenerator';
import { UserService } from '@/services/userService';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    loading: false,
    error: null,
    setUser: (user) => {
        console.log('setUser called with:', user);
        set({ user });
    },
    register: async (userData, requesterRole = 'user') => {
        set({ loading: true, error: null });
        try {
            // eslint-disable-next-line no-undef
            const userService = new UserService();
            await userService.register(userData, requesterRole);
            set({ loading: false });
            Logger.log({
                level: LogLevel.INFO,
                message: `User registered: ${userData.email}`,
                context: 'useAuthStore.register'
            });
        } catch (error: any) {
            console.error('useAuthStore.register error:', error);
            set({
                error: { code: 'SERVER_ERROR', message: error.message },
                loading: false
            });
            Logger.log({
                level: LogLevel.ERROR,
                message: `Registration error: ${error.message}`,
                context: 'useAuthStore.register'
            });
        }
    },
    login: async (loginData) => {
        console.log('useAuthStore.login called with:', loginData);
        set({ loading: true, error: null });
        try {
            const userService = new UserService();
            const loggedInUser = await userService.login(loginData);
            loggedInUser.token = generateSecureToken(); // Génération du token
            console.log('useAuthStore.login: loggedInUser:', loggedInUser);
            set({ user: loggedInUser, loading: false });
            localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
            Logger.log({
                level: LogLevel.INFO,
                message: `User logged in: ${loggedInUser.email}`,
                context: 'useAuthStore.login'
            });
            resetSessionTimer();
        } catch (error: any) {
            console.error('useAuthStore.login error:', error);
            set({
                error: { code: 'SERVER_ERROR', message: error.message },
                loading: false
            });
            Logger.log({
                level: LogLevel.ERROR,
                message: `Login error: ${error.message}`,
                context: 'useAuthStore.login'
            });
        }
    },
    logout: () => {
        console.log('useAuthStore.logout called');
        set({ user: null });
        localStorage.removeItem('currentUser');
        clearSessionTimer();
        Logger.log({
            level: LogLevel.INFO,
            message: `User logged out.`,
            context: 'useAuthStore.logout'
        });
    },
    requestPasswordReset: async (email: string) => {
        set({ loading: true, error: null });
        try {
            const userService = new UserService();
            const token = await userService.requestPasswordReset(email);
            set({ loading: false });
            Logger.log({
                level: LogLevel.INFO,
                message: `Password reset requested for: ${email}`,
                context: 'useAuthStore.requestPasswordReset'
            });
            return token;
        } catch (error: any) {
            console.error('useAuthStore.requestPasswordReset error:', error);
            set({
                error: { code: 'SERVER_ERROR', message: error.message },
                loading: false
            });
            Logger.log({
                level: LogLevel.ERROR,
                message: `Password reset request error: ${error.message}`,
                context: 'useAuthStore.requestPasswordReset'
            });
            return null;
        }
    },
    resetPassword: async (token: string, newPassword: string) => {
        set({ loading: true, error: null });
        try {
            const userService = new UserService();
            await userService.resetPassword(token, newPassword);
            set({ loading: false });
            Logger.log({
                level: LogLevel.INFO,
                message: `Password reset successful for token: ${token}`,
                context: 'useAuthStore.resetPassword'
            });
        } catch (error: any) {
            console.error('useAuthStore.resetPassword error:', error);
            set({
                error: { code: 'SERVER_ERROR', message: error.message },
                loading: false
            });
            Logger.log({
                level: LogLevel.ERROR,
                message: `Password reset error: ${error.message}`,
                context: 'useAuthStore.resetPassword'
            });
        }
    },
    hasPermission: (permission: Permission) => {
        const user = get().user;
        if (!user) return false;
        const userService = new UserService();
        return userService.hasPermission(user, permission);
    }
}));

// Session management
let sessionTimer: NodeJS.Timeout;
let isEventListenerAdded = false; // Flag pour assurer une seule inscription

const resetSessionTimer = () => {
    clearSessionTimer();
    sessionTimer = setTimeout(() => {
        useAuthStore.getState().logout();
        alert('Votre session a expiré en raison d\'inactivité.');
    }, SESSION_TIMEOUT);
};

const clearSessionTimer = () => {
    if (sessionTimer) {
        clearTimeout(sessionTimer);
    }
};

// Reset session timer on user interactions
if (!isEventListenerAdded) {
    window.addEventListener('mousemove', resetSessionTimer);
    window.addEventListener('keydown', resetSessionTimer);
    isEventListenerAdded = true;
}

