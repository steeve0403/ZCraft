// src/components/Header/Header.tsx

import React, { useContext } from 'react';
import Logo from '../../common/Logo/Logo';
import styles from './Header.module.scss';
import { ThemeContext } from '@/context/themeContext';
import Toggle from '@/components/common/Toggle/Toggle';

const Header: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <header
            className={`${styles.header} bg-primary text-white p-2 d-flex justify-between items-center`}
        >
            <Logo />
            <Toggle isDarkMode={theme === 'dark'} onToggle={toggleTheme} />
        </header>
    );
};

export default Header;



{/*<header className={styles.header}>*/}
{/*    <div className={styles.logo}>*/}
{/*        <Link to="/">My Portfolio</Link>*/}
{/*    </div>*/}
{/*    <nav className={styles.nav}>*/}
{/*        <Link to="/projects">Projects</Link>*/}
{/*        {user ? (*/}
{/*            <>*/}
{
    /*                <Link to="/profile">Profile</Link>*/
}
{
    /*                {hasPermission(Permission.MANAGE_USERS) && <Link to="/admin/users">Admin</Link>}*/
}
{
    /*                <button onClick={logout} className={styles.logoutButton}>Logout</button>*/
}
{/*            </>*/}
{/*        ) : (*/}
{/*            <>*/}
{/*                <Link to="/login">Login</Link>*/}
{/*                <Link to="/register">Register</Link>*/}
{/*            </>*/}
{/*        )}*/}
{/*    </nav>*/}
{/*</header>*/}