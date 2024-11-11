import React, { createContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/models/User';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    register: (user: User) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
    error: null,
    register: async () => {},
    login: async () => {},
    logout: () => {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const { user, loading, error, register, login, logout } = useAuth();

    return (
        <AuthContext.Provider
            value={{ user, loading, error, register, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
