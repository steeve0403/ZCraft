import React from 'react';
import styles from './ThemeToggle.module.scss';
import useTheme from '@/hooks/useTheme';
import { Theme } from '@/context/ThemeContext';
import { themes } from '@/context/themes';

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className={styles.themeToggle}>
            <select
                className={styles.themeSelect}
                value={theme}
                onChange={(e) => setTheme(e.target.value as Theme)}
                aria-label="Select Theme"
            >
                {themes.map((t) => (
                    <option key={t.value} value={t.value}>
                        {t.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ThemeToggle;


