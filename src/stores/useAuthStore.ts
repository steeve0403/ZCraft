import { create } from 'zustand';
import { UserService } from '@/services/userService';
import { Logger, LogLevel } from '@/utils/logger';
import { Role } from '@/models/Role';
import { User } from '@/models/User';
import { Permission } from '@/models/Permission';
import { AppError } from '@/models/AppError';

interface AuthState {
    user: (User & { token: string }) | null;
    loading: boolean;
    error: AppError | null;
    // eslint-disable-next-line no-unused-vars
    setUser: (user: (User & { token: string }) | null) => void; // New method
    // eslint-disable-next-line no-unused-vars
    register: (userData: any, requesterRole?: Role) => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    login: (loginData: any) => Promise<void>;
    logout: () => void;
    // eslint-disable-next-line no-unused-vars
    requestPasswordReset: (email: string) => Promise<string | null>;
    // eslint-disable-next-line no-unused-vars
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    hasPermission: (permission: Permission) => boolean;
}

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    loading: false,
    error: null,
    /**
     * Directly sets the user state.
     * @param user - The user object to set.
     */
    setUser: (user) => {
        console.log('setUser called with:', user);
        set({ user });
    },

    /**
     * Registers a new user.
     * @param userData - Data for the new user.
     * @param requesterRole - Role of the user performing the registration.
     */
    register: async (userData, requesterRole = 'user') => {
        set({ loading: true, error: null });
        try {
            const userService = new UserService();
            const newUser = await userService.register(userData, requesterRole);
            // set({ user: newUser as User & { token: string }, loading: false });
            set({ loading: false });
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            Logger.log({
                level: LogLevel.INFO,
                message: `User registered: ${newUser.email}`,
                context: 'useAuthStore.register'
            });
            // resetSessionTimer();
        } catch (error: any) {
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

    /**
     * Logs in a user.
     * @param loginData - Credentials for login.
     */
    login: async (loginData) => {
        set({ loading: true, error: null });
        try {
            const userService = new UserService();
            const loggedInUser = await userService.login(loginData);
            set({ user: loggedInUser, loading: false });
            localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
            Logger.log({
                level: LogLevel.INFO,
                message: `User logged in: ${loggedInUser.email}`,
                context: 'useAuthStore.login'
            });
            resetSessionTimer();
        } catch (error: any) {
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

    /**
     * Logs out the current user.
     */
    logout: () => {
        set({ user: null });
        localStorage.removeItem('currentUser');
        clearSessionTimer();
        Logger.log({
            level: LogLevel.INFO,
            message: `User logged out.`,
            context: 'useAuthStore.logout'
        });
    },

    /**
     * Requests a password reset.
     * @param email - Email of the user requesting the reset.
     * @returns The reset token or null if an error occurred.
     */
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

    /**
     * Resets a user's password.
     * @param token - The password reset token.
     * @param newPassword - The new password.
     */
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

    /**
     * Checks if the current user has a specific permission.
     * @param permission - The permission to check.
     * @returns True if the user has the permission, false otherwise.
     */
    hasPermission: (permission: Permission) => {
        const user = get().user;
        if (!user) return false;
        const userService = new UserService();
        return userService.hasPermission(user, permission);
    }
}));

// Session management
// eslint-disable-next-line no-undef
let sessionTimer: NodeJS.Timeout;
let isEventListenerAdded = false; // Flag to ensure single registration

/**
 * Resets the session timer to log out the user after inactivity.
 */
const resetSessionTimer = () => {
    clearSessionTimer();
    sessionTimer = setTimeout(() => {
        useAuthStore.getState().logout();
        alert('Your session has expired due to inactivity.');
    }, SESSION_TIMEOUT);
};

/**
 * Clears the session timer.
 */
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
