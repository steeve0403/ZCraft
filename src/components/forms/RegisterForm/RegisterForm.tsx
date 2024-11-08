// src/components/forms/RegisterForm/RegisterForm.tsx

import React, { useState } from 'react';
import styles from './RegisterForm.module.scss';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { useAuth } from '@/hooks/useAuth';

const RegisterForm: React.FC = () => {
    const { register, error, loading } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            // Gérer l'erreur de confirmation de mot de passe
            return;
        }
        await register({ username, email, password });
    };

    return (
        <form className={styles.registerForm} onSubmit={handleSubmit}>
            <h2>Register</h2>
            <Input
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                error={error?.code === 'INVALID_USERNAME' ? error.message : undefined}
            />
            <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                error={error?.code === 'INVALID_EMAIL' ? error.message : undefined}
            />
            <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                error={error?.code === 'INVALID_PASSWORD' ? error.message : undefined}
            />
            <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                error={password !== confirmPassword ? "Passwords do not match." : undefined}
            />
            <Button label={loading ? 'Registering...' : 'Register'} onClick={handleSubmit} disabled={loading} />
            {error && <div className={styles.registerForm__error}>{error.message}</div>}
        </form>
    );
};

export default RegisterForm;
