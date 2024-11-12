import React from 'react';

export type Theme = 'theme-default' | 'theme-dark' | 'theme-ocean'; // Extendable for future themes

export interface ThemeContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const ThemeContext = React.createContext<ThemeContextProps | undefined>(
    undefined
);
