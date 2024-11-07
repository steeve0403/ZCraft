import { User } from './User';
import { Role } from './Role';
import { Permission } from './Permission';
import { AppError } from '@/models/AppError';

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: AppError | null;
    setUser: (user: User | null) => void;
    register: (userData: RegisterData, requesterRole?: Role) => Promise<void>;
    login: (loginData: LoginData) => Promise<void>;
    logout: () => void;
    requestPasswordReset: (email: string) => Promise<string | null>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    hasPermission: (permission: Permission) => boolean;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    role?: Role;
}

export interface LoginData {
    email: string;
    password: string;
}
