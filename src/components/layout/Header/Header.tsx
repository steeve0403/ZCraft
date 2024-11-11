import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={`${styles.header__container} container`}>
                <div className={styles.header__logo}>
                    MonLogo
                </div>
                <nav className={styles.header__nav}>
                    <ul>
                        <li>
                            <NavLink to="/">
                                Accueil
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">
                                À Propos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
