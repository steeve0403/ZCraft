// src/components/layout/Header/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { useAuth } from '@/hooks/useAuth';
import { Permission } from '@/models/Permission';

const Header: React.FC = () => {
    const { user, logout, hasPermission } = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/">My Portfolio</Link>
            </div>
            <nav className={styles.nav}>
                <Link to="/projects">Projects</Link>
                {user ? (
                    <>
                        <Link to="/profile">Profile</Link>
                        {hasPermission(Permission.MANAGE_USERS) && <Link to="/admin/users">Admin</Link>}
                        <button onClick={logout} className={styles.logoutButton}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;


