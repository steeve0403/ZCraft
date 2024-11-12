import React, { useState, useEffect, ReactNode } from 'react';
import { ThemeContext, Theme } from './ThemeContext';

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem('theme') as Theme;
        return storedTheme || 'theme-default';
    });

    useEffect(() => {
        // Remove all theme classes
        document.documentElement.classList.remove(
            'theme-default',
            'theme-dark',
            'theme-ocean'
        );
        // Add the current theme class if not default
        if (theme !== 'theme-default') {
            document.documentElement.classList.add(theme);
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
