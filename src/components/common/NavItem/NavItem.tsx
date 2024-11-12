import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.scss';

// Interface for sub-links with an optional icon
interface SubLink {
    to: string;
    label: string;
    icon?: React.ReactNode; // Optional icon for each sub-link
}

// Interface for the main NavItem component props with an optional icon
interface NavItemProps {
    to: string;
    label: string;
    icon?: React.ReactNode; // Optional icon for the main link
    subLinks?: SubLink[];
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon, subLinks }) => {
    // Utility function to apply the active class to links
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive ? `${styles.active}` : undefined;

    return (
        <li className={styles.navItem}>
            <NavLink to={to} className={getNavLinkClass}>
                {icon && <span className={styles.icon}>{icon}</span>}
                <span className={styles.label}>{label}</span>
            </NavLink>
            {subLinks && subLinks.length > 0 && (
                <ul className={styles.subLinks}>
                    {subLinks.map((subLink) => (
                        <li key={subLink.to} className={styles.subLinkItem}>
                            <NavLink
                                to={subLink.to}
                                className={getNavLinkClass}
                            >
                                {subLink.icon && (
                                    <span className={styles.icon}>{subLink.icon}</span>
                                )}
                                <span className={styles.label}>{subLink.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default NavItem;
