import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type = 'text', placeholder = '', value, onChange }) => {
    return (
        <input
            type={type}
            className={styles.input}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

export default Input;

