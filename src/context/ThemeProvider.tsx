// src/context/ThemeContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextProps {
    theme: string;
    setTheme: (theme: string) => void;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    setTheme: () => {},
    toggleTheme: () => {},
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setThemeState] = useState<string>('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const setTheme = (newTheme: string) => {
        setThemeState(newTheme);
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            if (prevTheme === 'light') return 'dark';
            if (prevTheme === 'dark') return 'pastel';
            return 'light';
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
