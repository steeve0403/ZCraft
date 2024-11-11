import React from 'react';
import styles from './Toggle.module.scss';

interface ToggleProps {
    isDarkMode: boolean;
    onToggle: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ isDarkMode, onToggle }) => {
    return (
        <button
            className={`${styles.toggleButton} bg-secondary text-white p-2 rounded`}
            onClick={onToggle}
            aria-label="Toggle Dark Mode"
        >
            {isDarkMode ? '🌞 Light' : '🌙 Dark'}
        </button>
    );
};

export default Toggle;
