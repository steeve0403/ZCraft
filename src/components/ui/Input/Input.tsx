import React from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
    return (
        <div className={styles.inputGroup}>
            <label htmlFor={props.id}>{label}</label>
            <input className={error ? styles.error : ''} {...props} />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default Input;
