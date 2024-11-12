import React from 'react';
import NavItem from '../../common/NavItem/NavItem';
import styles from './Sidebar.module.scss';
import { User } from 'lucide-react';

const Sidebar: React.FC = () => {
    return (
        <nav className={styles.sidebar} aria-label="App Navigation">
            <ul>
                <NavItem to="/profile/info" label="Info" icon={<User />} />
                <NavItem to="/profile/experience" label="Experience" />
                <NavItem to="/profile/education" label="Education" />
                {/*<NavItem to="/profile/skills" label="Skills" subLinks={[*/}
                {/*    { to: '/profile/settings', label: 'Settings', icon: <FaUser /> },*/}
                {/*    { to: '/profile/logout', label: 'Logout' },*/}
                {/*]}/>*/}
                {/* Add more app-specific links as needed */}
            </ul>
        </nav>
    );
};

export default Sidebar;
