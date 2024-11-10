import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
    return (
        <aside className={styles.sidebar}>
            <ul className={styles.sidebar__list}>
                <li className={styles.sidebar__item}>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className={styles.sidebar__item}>
                    <Link to="/projects">Projects</Link>
                </li>
                <li className={styles.sidebar__item}>
                    <Link to="/settings">Settings</Link>
                </li>
                {/* Ajoutez d'autres liens selon les besoins */}
            </ul>
        </aside>
    );
};

export default Sidebar;
