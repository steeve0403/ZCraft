import React, { ReactNode } from 'react';
import { ThemeProvider } from '@/context/ThemeProvider';

interface AppProviderProps {
    children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
};

export default AppProvider;
