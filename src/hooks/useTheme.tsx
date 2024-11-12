import { useContext } from 'react';
import { ThemeContext, ThemeContextProps } from '@/context/ThemeContext';

const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export default useTheme;
