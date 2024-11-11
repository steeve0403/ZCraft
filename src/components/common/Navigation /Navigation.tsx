// src/components/Navigation/Navigation.tsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

const Navigation: React.FC = () => {
    return (
        <nav className={styles.navigation}>
            <ul>
                <li>
                    <NavLink to="/home" className={({ isActive }) => isActive ? 'text-accent' : 'text-white'}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'text-accent' : 'text-white'}>
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-accent' : 'text-white'}>
                        Contact
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
