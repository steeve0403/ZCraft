// src/components/common/Button/Button.tsx

import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary', disabled = false, icon }) => {
    return (
        <button
            className={`${styles.button} ${styles[`button--${variant}`]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <span className={styles.button__icon}>{icon}</span>}
            {label}
        </button>
    );
};

export default Button;
