import React from 'react';
import NavItem from '../../common/NavItem/NavItem';
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.logo}>
                    <NavLink to="/">Z-Craft</NavLink>
                </div>
                <nav className={styles.navigation} aria-label="Global Navigation">
                    <ul>
                        <NavItem to="/" label="Home" />
                        <NavItem to="/whats" label="What's?" />
                        <NavItem to="/contact" label="Contact" />
                        {/* Add more global links as needed */}
                    </ul>
                </nav>
                <div className={styles.actions}>
                    <ThemeToggle />
                    {/* Include user account links or icons here if needed */}
                </div>
            </div>
        </header>
    );
};

export default Header;