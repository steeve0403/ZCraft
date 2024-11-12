import { Theme } from '@/context/ThemeContext';

export const themes: { value: Theme; label: string }[] = [
    { value: 'theme-default', label: 'Default' },
    { value: 'theme-dark', label: 'Dark' },
    { value: 'theme-ocean', label: 'Ocean' }
    // Add more themes as needed
];
