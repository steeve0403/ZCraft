import React from 'react';
import './Header.module.scss';
import { useTheme } from '@/context/UseTheme';
const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="header">
            <div className="logo">MyApp</div>
            <nav>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </nav>
            <button className="theme-toggle" onClick={toggleTheme}>
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
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
{/*                <Link to="/profile">Profile</Link>*/}
{/*                {hasPermission(Permission.MANAGE_USERS) && <Link to="/admin/users">Admin</Link>}*/}
{/*                <button onClick={logout} className={styles.logoutButton}>Logout</button>*/}
{/*            </>*/}
{/*        ) : (*/}
{/*            <>*/}
{/*                <Link to="/login">Login</Link>*/}
{/*                <Link to="/register">Register</Link>*/}
{/*            </>*/}
{/*        )}*/}
{/*    </nav>*/}
{/*</header>*/}