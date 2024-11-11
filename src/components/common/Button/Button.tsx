import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary', size = 'md', disabled = false }) => {
    return (
        <button
            className={`${styles.button} ${styles[`button--${variant}`]} ${styles[`button--${size}`]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
