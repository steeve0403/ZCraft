// src/components/forms/PasswordResetForm/PasswordResetForm.tsx

import React, { useState } from 'react';
import styles from './PasswordResetForm.module.scss';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { useAuth } from '@/hooks/useAuth';

const PasswordResetForm: React.FC = () => {
    const { requestPasswordReset, error, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = await requestPasswordReset(email);
        if (token) {
            setMessage('Password reset instructions have been sent to your email.');
        }
    };

    return (
        <form className={styles.passwordResetForm} onSubmit={handleSubmit}>
            <h2>Password Reset</h2>
            <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                error={error?.code === 'INVALID_EMAIL' ? error.message : undefined}
            />
            <Button label={loading ? 'Sending...' : 'Send Reset Link'} onClick={handleSubmit} disabled={loading} />
            {message && <div className={styles.passwordResetForm__message}>{message}</div>}
            {error && <div className={styles.passwordResetForm__error}>{error.message}</div>}
        </form>
    );
};

export default PasswordResetForm;
