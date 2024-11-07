import React, { useState } from 'react';
import styles from './RegisterForm.module.scss';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import { useAuth } from '@/hooks/useAuth';

const RegisterForm: React.FC = () => {
    const { register, loading, error } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            alert(
                'Registration successful! Please check your email to verify your account.'
            );
        } catch (err: any) {
            console.error('Registration error:', err);
        }
    };

    return (
        <form className={styles.registerForm} onSubmit={handleSubmit}>
            <h2>Register</h2>
            <Input
                label="Username"
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
            />
            <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <Input
                label="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />
            {error && <p className={styles.errorMessage}>{error.message}</p>}
            <Button type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </Button>
        </form>
    );
};

export default RegisterForm;
