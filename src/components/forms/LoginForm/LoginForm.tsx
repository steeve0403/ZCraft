// src/components/forms/LoginForm/LoginForm.tsx

import React, { useState } from 'react';
import styles from './LoginForm.module.scss';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { useAuth } from '@/hooks/useAuth';

const LoginForm: React.FC = () => {
    const { login, error, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login({ email, password });
    };

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                error={
                    error?.code === 'INVALID_EMAIL' ? error.message : undefined
                }
            />
            <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                error={
                    error?.code === 'INVALID_PASSWORD'
                        ? error.message
                        : undefined
                }
            />
            <Button label={loading ? 'Logging in...' : 'Login'} onClick={handleSubmit} disabled={loading} />
            {error && <div className={styles.loginForm__error}>{error.message}</div>}
        </form>
    );
};

export default LoginForm;
