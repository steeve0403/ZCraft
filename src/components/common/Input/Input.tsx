// src/components/common/Input/Input.tsx

import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, type, value, onChange, placeholder, error }) => {
    return (
        <div className={styles.input}>
            <label className={styles.input__label}>{label}</label>
            <input
                className={`${styles.input__field} ${error ? styles['input__field--error'] : ''}`}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {error && <span className={styles.input__error}>{error}</span>}
        </div>
    );
};

export default Input;
